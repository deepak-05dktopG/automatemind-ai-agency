// src/VoiceAgent.jsx
import React, { useState, useEffect, useRef } from 'react';

/**
 * AutomateMind Voice AI Agent - 100% In-Page React Component
 * - Runs directly INSIDE your website (NO new tabs, NO popup windows, NO iframes).
 * - Connects directly to your Google AI Studio Gemini Live backend via secure WebSockets.
 * - Zero extra npm packages required (uses pure React, inline SVGs, and Web Audio API).
 */
export default function VoiceAgent({
  backendUrl = "https://ais-pre-qrwhkshqnetylsfk647fu6-259839896514.asia-northeast1.run.app",
  agentName = "AutomateMind Assistant",
  role = "AI Solutions Consultant",
  themeColor = "#C6A15B",
  buttonLabel = "Speak with AI Consultant",
  welcomeMessage = "Hi! Welcome to AutomateMind. Tell me a little about your business and the challenge you'd like to solve. I'll help you explore where AI and automation might make a difference.",
  position = "bottom-right",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | requesting_mic | connecting | listening | speaking | error
  const [statusText, setStatusText] = useState('Ready to consult');
  const [isMuted, setIsMuted] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const [showTranscripts, setShowTranscripts] = useState(false);
  const [textInput, setTextInput] = useState('');

  const wsRef = useRef(null);
  const micStreamRef = useRef(null);
  const micCtxRef = useRef(null);
  const processorRef = useRef(null);
  const audioOutCtxRef = useRef(null);
  const nextPlayTimeRef = useRef(0);
  const isMutedRef = useRef(false);

  isMutedRef.current = isMuted;

  useEffect(() => {
    return () => {
      endCall();
    };
  }, []);

  const playPCM24kChunk = (base64Data) => {
    try {
      if (!audioOutCtxRef.current || audioOutCtxRef.current.state === 'closed') {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioOutCtxRef.current = new AudioCtx({ sampleRate: 24000 });
      }
      const ctx = audioOutCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const binary = atob(base64Data);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

      const int16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 32768.0;

      const buffer = ctx.createBuffer(1, float32.length, 24000);
      buffer.getChannelData(0).set(float32);

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);

      const now = ctx.currentTime;
      const startTime = Math.max(now, nextPlayTimeRef.current);
      source.start(startTime);
      nextPlayTimeRef.current = startTime + buffer.duration;

      setStatus('speaking');
      setStatusText('AI Consultant speaking...');

      source.onended = () => {
        if (ctx.currentTime >= nextPlayTimeRef.current - 0.05) {
          setStatus('listening');
          setStatusText('Active • Listening to your voice');
        }
      };
    } catch (e) {
      console.error('[AutomateMind] Audio playback error:', e);
    }
  };

  const startCall = async () => {
    try {
      setStatus('requesting_mic');
      setStatusText('Requesting microphone access...');

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { sampleRate: 16000, channelCount: 1, echoCancellation: true, noiseSuppression: true },
      });
      micStreamRef.current = stream;

      setStatus('connecting');
      setStatusText('Connecting to Gemini Live...');

      const host = backendUrl.replace(/^https?:\/\//, '');
      const isSecure = backendUrl.startsWith('https');
      const wsUrl = `${isSecure ? 'wss://' : 'ws://'}${host}/api/live`;

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            type: 'init',
            config: {
              voiceName: 'Zephyr',
              systemInstruction:
                'You are the AutomateMind AI Solutions Assistant. Speak concise, professional business guidance.',
            },
          })
        );
      };

      ws.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data);
          if (msg.type === 'status') {
            if (msg.status === 'listening' || msg.status === 'ready') {
              setStatus('listening');
              setStatusText('Active • Listening to your voice');
            }
          }
          if (msg.type === 'audio' && msg.audio) {
            playPCM24kChunk(msg.audio);
          }
          if (msg.type === 'transcript' && msg.text) {
            setTranscripts((prev) => [
              ...prev,
              { id: Date.now() + Math.random(), role: msg.role || 'model', text: msg.text },
            ]);
          }
          if (msg.type === 'interrupted') {
            nextPlayTimeRef.current = 0;
            setStatus('listening');
            setStatusText('Interrupted • Listening');
          }
        } catch (err) {
          console.error('[AutomateMind] WS parse error:', err);
        }
      };

      ws.onerror = (err) => {
        console.error('[AutomateMind] WebSocket error:', err);
        setStatus('error');
        setStatusText('Connection error. Please check server URL.');
      };

      ws.onclose = () => {
        endCall();
      };

      // Mic capture at 16kHz PCM
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const inputCtx = new AudioCtx({ sampleRate: 16000 });
      micCtxRef.current = inputCtx;
      const source = inputCtx.createMediaStreamSource(stream);
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (evt) => {
        if (isMutedRef.current) return;
        const inputData = evt.inputBuffer.getChannelData(0);
        const int16 = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
        }
        const uint8 = new Uint8Array(int16.buffer);
        let binary = '';
        for (let i = 0; i < uint8.byteLength; i++) binary += String.fromCharCode(uint8[i]);

        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ type: 'audio', audio: btoa(binary) }));
        }
      };

      source.connect(processor);
      processor.connect(inputCtx.destination);
    } catch (err) {
      console.error('[AutomateMind] Start call error:', err);
      setStatus('error');
      setStatusText('Microphone permission required');
    }
  };

  const endCall = () => {
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (micCtxRef.current && micCtxRef.current.state !== 'closed') {
      micCtxRef.current.close().catch(() => {});
      micCtxRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    nextPlayTimeRef.current = 0;
    setStatus('idle');
    setStatusText('Call ended');
  };

  const handleSendText = async (e) => {
    e.preventDefault();
    const val = textInput.trim();
    if (!val) return;
    setTextInput('');
    setTranscripts((prev) => [...prev, { id: Date.now(), role: 'user', text: val }]);

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'text', text: val }));
    } else {
      try {
        setStatusText('Consulting AI...');
        const res = await fetch(`${backendUrl}/api/agent/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: val }),
        });
        const data = await res.json();
        if (data && data.reply) {
          setTranscripts((prev) => [...prev, { id: Date.now(), role: 'model', text: data.reply }]);
          setStatusText('Ready to consult');
        }
      } catch (err) {
        setStatusText('Ready to consult');
      }
    }
  };

  const isCallActive = status === 'listening' || status === 'speaking' || status === 'connecting';
  const isLeft = position.includes('left');

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        [isLeft ? 'left' : 'right']: '24px',
        zIndex: 2147483647,
        fontFamily: "'Manrope', system-ui, -apple-system, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: isLeft ? 'flex-start' : 'flex-end',
      }}
    >
      {/* In-Page Voice Agent Card (NO IFRAME, NO NEW TAB) */}
      {isOpen && (
        <div
          style={{
            width: '380px',
            maxWidth: 'calc(100vw - 32px)',
            height: '560px',
            maxHeight: 'calc(100vh - 100px)',
            backgroundColor: '#0b1928',
            border: '1px solid rgba(198, 161, 91, 0.4)',
            borderRadius: '20px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75), 0 0 25px rgba(198, 161, 91, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            marginBottom: '14px',
            color: '#F3F0E8',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '14px 18px',
              backgroundColor: '#06111c',
              borderBottom: '1px solid rgba(198, 161, 91, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${themeColor} 0%, #D8B66A 100%)`,
                  color: '#071522',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '13px',
                }}
              >
                AM
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: themeColor }}>{agentName}</div>
                <div style={{ fontSize: '11px', color: '#8fa0b5' }}>{role}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                type="button"
                onClick={() => setShowTranscripts(!showTranscripts)}
                style={{
                  background: 'rgba(198, 161, 91, 0.1)',
                  border: '1px solid rgba(198, 161, 91, 0.3)',
                  color: '#F3F0E8',
                  borderRadius: '14px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>Transcripts</span>
                <span
                  style={{
                    background: themeColor,
                    color: '#071522',
                    borderRadius: '10px',
                    padding: '1px 5px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  {transcripts.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#8fa0b5',
                  cursor: 'pointer',
                  padding: '4px',
                  fontSize: '18px',
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body View */}
          {!showTranscripts ? (
            <div
              style={{
                flex: 1,
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflowY: 'auto',
              }}
            >
              {/* Status Badge */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    backgroundColor: '#06111c',
                    border: '1px solid rgba(198, 161, 91, 0.25)',
                    fontSize: '12px',
                    color: '#AAB5C3',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor:
                        status === 'listening' ? '#10b981' : status === 'speaking' ? themeColor : '#64748b',
                    }}
                  />
                  <span>{statusText}</span>
                </div>
              </div>

              {/* Glowing Orb */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '15px 0',
                }}
              >
                <div
                  onClick={isCallActive ? endCall : startCall}
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: isCallActive
                      ? `radial-gradient(circle, ${themeColor} 0%, #071522 80%)`
                      : 'radial-gradient(circle, rgba(198, 161, 91, 0.25) 0%, #0b1928 75%)',
                    border: '2px solid rgba(198, 161, 91, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: isCallActive
                      ? '0 0 35px rgba(198, 161, 91, 0.5)'
                      : '0 0 20px rgba(198, 161, 91, 0.2)',
                  }}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isCallActive ? '#071522' : themeColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" x2="12" y1="19" y2="22"></line>
                  </svg>
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#8fa0b5',
                    marginTop: '12px',
                    textAlign: 'center',
                    maxWidth: '280px',
                    minHeight: '36px',
                    lineHeight: '1.4',
                  }}
                >
                  {transcripts.length > 0 && transcripts[transcripts.length - 1].role === 'model'
                    ? transcripts[transcripts.length - 1].text
                    : welcomeMessage}
                </div>
              </div>

              {/* Call Controls */}
              <div>
                {!isCallActive ? (
                  <button
                    type="button"
                    onClick={startCall}
                    style={{
                      width: '100%',
                      padding: '13px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${themeColor} 0%, #D8B66A 100%)`,
                      color: '#071522',
                      border: 'none',
                      fontWeight: 'bold',
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 15px rgba(198, 161, 91, 0.35)',
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>Start Voice Conversation</span>
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      style={{
                        flex: 1,
                        padding: '11px',
                        borderRadius: '10px',
                        background: isMuted ? '#dc2626' : '#06111c',
                        color: '#F3F0E8',
                        border: '1px solid rgba(198, 161, 91, 0.3)',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}
                    >
                      {isMuted ? 'Unmute' : 'Mute'}
                    </button>
                    <button
                      type="button"
                      onClick={endCall}
                      style={{
                        flex: 1,
                        padding: '11px',
                        borderRadius: '10px',
                        background: '#dc2626',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      End Call
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Transcripts Drawer */
            <div
              style={{
                flex: 1,
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: themeColor,
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>Live Conversation Transcript</span>
                <span
                  onClick={() => setShowTranscripts(false)}
                  style={{ color: '#8fa0b5', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Back to call
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  paddingRight: '4px',
                }}
              >
                {transcripts.length === 0 ? (
                  <div style={{ fontSize: '11.5px', color: '#8fa0b5', textAlign: 'center', margin: 'auto' }}>
                    No voice messages yet. Start speaking to see live transcripts.
                  </div>
                ) : (
                  transcripts.map((t) => (
                    <div
                      key={t.id}
                      style={{
                        alignSelf: t.role === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '85%',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        backgroundColor: t.role === 'user' ? 'rgba(198, 161, 91, 0.25)' : '#06111c',
                        border: '1px solid rgba(198, 161, 91, 0.2)',
                        fontSize: '12px',
                        lineHeight: '1.45',
                      }}
                    >
                      <strong style={{ color: t.role === 'user' ? '#D8B66A' : themeColor }}>
                        {t.role === 'user' ? 'You: ' : `${agentName}: `}
                      </strong>
                      <span style={{ color: '#F3F0E8' }}>{t.text}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Quick Text Fallback Input */}
          <form
            onSubmit={handleSendText}
            style={{
              padding: '10px 14px',
              backgroundColor: '#06111c',
              borderTop: '1px solid rgba(198, 161, 91, 0.2)',
              display: 'flex',
              gap: '6px',
            }}
          >
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type a message or question..."
              style={{
                flex: 1,
                backgroundColor: '#0b1928',
                border: '1px solid rgba(198, 161, 91, 0.25)',
                borderRadius: '8px',
                padding: '7px 12px',
                color: '#F3F0E8',
                fontSize: '12px',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: themeColor,
                color: '#071522',
                border: 'none',
                borderRadius: '8px',
                padding: '7px 14px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button (Always visible on website) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={buttonLabel}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 24px',
          borderRadius: '30px',
          backgroundColor: '#071522',
          color: '#F3F0E8',
          border: '1.5px solid ' + themeColor,
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5), 0 0 15px rgba(198, 161, 91, 0.3)',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 600,
          outline: 'none',
          transition: 'all 0.2s ease',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: themeColor,
            color: '#071522',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" x2="12" y1="19" y2="22"></line>
          </svg>
        </span>
        <span>{buttonLabel}</span>
      </button>
    </div>
  );
}