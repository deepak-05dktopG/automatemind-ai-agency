// File: src/VoiceAgent.jsx
// AutomateMind Female Voice Receptionist (Aoede)
// 100% Self-Contained React + Vite Component (Zero External Script Dependencies)

import React, { useEffect, useState, useRef } from 'react';
import './VoiceAgent.css';

// Configure your backend API Base URL:
// • For local development with your Vite app (e.g. localhost:5173): use "http://localhost:3000"
// • For production: use your published Cloud Run URL
const VOICE_ENGINE_URL = "https://automatemind-female-ai-voice-agent-live-sdk-engin.ai.studio";
const AGENT_ID = "automatemind-default";

// Audio helper: Float32 to 16-bit PCM for mic input to Gemini Live
function floatTo16BitPCM(input) {
  const output = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return output;
}

function resampleTo16k(input, sampleRate) {
  if (sampleRate === 16000) return input;
  const ratio = sampleRate / 16000;
  const outputLength = Math.floor(input.length / ratio);
  const output = new Float32Array(outputLength);
  for (let i = 0; i < outputLength; i += 1) {
    const position = i * ratio;
    const left = Math.floor(position);
    const right = Math.min(left + 1, input.length - 1);
    const weight = position - left;
    output[i] = input[left] * (1 - weight) + input[right] * weight;
  }
  return output;
}

// Audio helper: ArrayBuffer to base64
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Audio helper: Base64 24kHz PCM from Gemini to Float32 for Web Audio playback
function base64ToFloat32(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const int16 = new Int16Array(bytes.buffer);
  const float32 = new Float32Array(int16.length);
  for (let i = 0; i < int16.length; i++) {
    float32[i] = int16[i] / (int16[i] < 0 ? 0x8000 : 0x7fff);
  }
  return float32;
}

export function VoiceAgent() {
  const [isCalling, setIsCalling] = useState(false);
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [statusText, setStatusText] = useState('Idle');
  const [hasMic, setHasMic] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [callDuration, setCallDuration] = useState(0);

  const wsRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const inCtxRef = useRef(null);
  const outCtxRef = useRef(null);
  const processorRef = useRef(null);
  const activeSourcesRef = useRef([]);
  const scheduledTimeRef = useRef(0);
  const callStartedAtRef = useRef(0);

  useEffect(() => {
    if (!isCalling) return undefined;
    const timer = window.setInterval(() => {
      setCallDuration(Math.floor((Date.now() - callStartedAtRef.current) / 1000));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isCalling]);

  const stopAudioPlayback = () => {
    for (const source of activeSourcesRef.current) {
      try {
        source.stop();
        source.disconnect();
      } catch (e) {}
    }
    activeSourcesRef.current = [];
    if (outCtxRef.current) {
      scheduledTimeRef.current = outCtxRef.current.currentTime;
    }
    setAgentSpeaking(false);
  };

  const playAudioChunk = (base64Audio) => {
    const outCtx = outCtxRef.current;
    if (!outCtx || outCtx.state === 'closed') return;

    try {
      const float32 = base64ToFloat32(base64Audio);
      if (float32.length === 0) return;

      const buffer = outCtx.createBuffer(1, float32.length, 24000);
      buffer.getChannelData(0).set(float32);

      const source = outCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(outCtx.destination);

      const now = outCtx.currentTime;
      if (scheduledTimeRef.current < now) {
        scheduledTimeRef.current = now + 0.02;
      }

      source.start(scheduledTimeRef.current);
      scheduledTimeRef.current += buffer.duration;
      activeSourcesRef.current.push(source);

      setAgentSpeaking(true);
      setStatusText('Receptionist Speaking...');

      source.onended = () => {
        const idx = activeSourcesRef.current.indexOf(source);
        if (idx !== -1) activeSourcesRef.current.splice(idx, 1);
        if (activeSourcesRef.current.length === 0) {
          setAgentSpeaking(false);
          setStatusText(hasMic ? 'Listening to You...' : 'Agent Listening...');
        }
      };
    } catch (e) {
      console.error('Playback decode error:', e);
    }
  };

  const startCall = async () => {
    setErrorMessage(null);
    setIsOpen(true);
    setIsMinimized(false);
    setShowTranscript(false);
    setTranscript([]);
    callStartedAtRef.current = Date.now();
    setCallDuration(0);
    setStatusText('Connecting...');
    setIsCalling(true);

    try {
      // 1. Acquire mic (with resilient fallback if denied)
      let stream = null;
      let micGranted = false;
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
            });
            micGranted = true;
          } catch (e1) {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            micGranted = true;
          }
        }
      } catch (e2) {
        console.warn('Microphone permission not granted; running in spoken-output mode:', e2);
        micGranted = false;
      }

      setHasMic(micGranted);
      mediaStreamRef.current = stream;

      // 2. Request session ticket from Cloud Run API
      const cleanBase = VOICE_ENGINE_URL.replace(/\/$/, '');
      const res = await fetch(`${cleanBase}/api/agents/${encodeURIComponent(AGENT_ID)}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId: AGENT_ID })
      });

      if (!res.ok) {
        if (res.status === 302 || res.headers.get('content-type')?.includes('text/html')) {
          throw new Error('AI Studio preview cookie gate detected. For local dev use http://localhost:3000, or deploy via the Publish button in AI Studio.');
        }
        throw new Error(`Failed to create session: HTTP ${res.status}`);
      }

      const { ticket } = await res.json();

      // 3. Connect to WebSocket
      const protocol = cleanBase.startsWith('https') ? 'wss:' : 'ws:';
      const host = cleanBase.replace(/^https?:\/\//, '');
      const wsUrl = `${protocol}//${host}/live?ticket=${encodeURIComponent(ticket)}&agentId=${encodeURIComponent(AGENT_ID)}`;

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const outCtx = new AudioCtx({ sampleRate: 24000 });
      if (outCtx.state === 'suspended') await outCtx.resume();
      outCtxRef.current = outCtx;
      scheduledTimeRef.current = outCtx.currentTime;

      // 4. Setup microphone streaming with modern AudioWorkletNode
      if (stream) {
        const inCtx = new AudioCtx({ sampleRate: 16000 });
        if (inCtx.state === 'suspended') await inCtx.resume();
        inCtxRef.current = inCtx;

        const source = inCtx.createMediaStreamSource(stream);

        const handlePCMData = (channelData) => {
          if (isMuted || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
          const pcm16 = floatTo16BitPCM(resampleTo16k(channelData, inCtx.sampleRate));
          const base64 = arrayBufferToBase64(pcm16.buffer);
          wsRef.current.send(JSON.stringify({ type: 'audio', audio: base64, mimeType: 'audio/pcm;rate=16000' }));
        };

        let workletReady = false;
        if (inCtx.audioWorklet) {
          try {
            const dataUri = 'data:application/javascript;charset=utf-8,' + encodeURIComponent('class AudioCaptureProcessor extends AudioWorkletProcessor{process(inputs){const input=inputs[0];if(input&&input[0]){this.port.postMessage(input[0]);}return true;}}registerProcessor("audio-capture-processor",AudioCaptureProcessor);');
            await inCtx.audioWorklet.addModule(dataUri);
            workletReady = true;
          } catch (e) {
            console.warn('AudioWorklet module fallback');
          }
        }

        if (workletReady) {
          const workletNode = new AudioWorkletNode(inCtx, 'audio-capture-processor');
          workletNode.port.onmessage = (e) => handlePCMData(e.data);
          processorRef.current = workletNode;
          source.connect(workletNode);
          const silentGain = inCtx.createGain();
          silentGain.gain.value = 0;
          workletNode.connect(silentGain);
          silentGain.connect(inCtx.destination);
        } else {
          const processor = inCtx.createScriptProcessor(2048, 1, 1);
          processorRef.current = processor;
          processor.onaudioprocess = (e) => handlePCMData(e.inputBuffer.getChannelData(0));
          source.connect(processor);
          const silentGain = inCtx.createGain();
          silentGain.gain.value = 0;
          processor.connect(silentGain);
          silentGain.connect(inCtx.destination);
        }
      }

      ws.onopen = () => {
        setStatusText('Connected');
        ws.send(JSON.stringify({ type: 'start' }));
      };

      ws.onmessage = (event) => {
        try {
          if (event.data instanceof ArrayBuffer) {
            const binaryAudio = arrayBufferToBase64(event.data);
            playAudioChunk(binaryAudio);
            return;
          }
          const msg = JSON.parse(event.data);
          if (msg.type === 'audio' && msg.audio) {
            playAudioChunk(msg.audio);
          } else if (msg.type === 'ready') {
            setStatusText('Listening');
            if (msg.greeting) {
              setTranscript([{ role: 'assistant', text: msg.greeting }]);
            }
          } else if (msg.type === 'transcript' || msg.type === 'text') {
            const text = msg.text || msg.transcript || msg.content;
            if (text) {
              setTranscript((current) => [...current, {
                role: msg.role === 'user' ? 'user' : 'assistant',
                text,
              }].slice(-8));
            }
          } else if (msg.type === 'interrupted') {
            stopAudioPlayback();
            setStatusText('Listening to You...');
          } else if (msg.type === 'ended') {
            endCall();
          } else if (msg.type === 'error') {
            setErrorMessage(msg.message || 'The voice service returned an error.');
            setStatusText('Connection error');
          }
        } catch (e) {
          console.error('Invalid voice service message:', e);
        }
      };

      ws.onerror = () => {
        setErrorMessage('Voice WebSocket connection failed.');
        endCall();
      };

      ws.onclose = () => {
        setIsCalling(false);
        setStatusText('Idle');
      };
    } catch (err) {
      console.error('Call failed:', err);
      setErrorMessage(err.message || 'Call failed');
      setIsCalling(false);
      setStatusText('Idle');
      endCall();
    }
  };

  const endCall = () => {
    stopAudioPlayback();
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (processorRef.current) {
      try { processorRef.current.disconnect(); } catch (e) {}
      processorRef.current = null;
    }
    if (inCtxRef.current) {
      try { inCtxRef.current.close(); } catch (e) {}
      inCtxRef.current = null;
    }
    if (outCtxRef.current) {
      try { outCtxRef.current.close(); } catch (e) {}
      outCtxRef.current = null;
    }
    if (wsRef.current) {
      if (wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'end' }));
        wsRef.current.close();
      }
      wsRef.current = null;
    }
    setIsCalling(false);
    setAgentSpeaking(false);
    setStatusText('Idle');
    setCallDuration(0);
    setIsMinimized(false);
  };

  const closeExperience = () => {
    if (isCalling) endCall();
    setIsOpen(false);
  };

  const formatDuration = (seconds) => {
    const elapsed = Math.max(0, Math.floor(seconds));
    return `${String(Math.floor(elapsed / 60)).padStart(2, '0')}:${String(elapsed % 60).padStart(2, '0')}`;
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: next ? 'mute' : 'unmute' }));
    }
  };

  return (
    <div className={`voice-agent ${isOpen ? 'voice-agent--open' : ''}`}>
      {!isOpen ? (
        <button onClick={startCall} className="voice-agent__launcher" aria-label="Start a voice conversation with AutomateMind">
          <span className="voice-agent__launcher-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M8.6 4.3 6.9 6a2 2 0 0 0-.3 2.5 16.2 16.2 0 0 0 8.9 8.9 2 2 0 0 0 2.5-.3l1.7-1.7a1.5 1.5 0 0 0 .1-2l-1.8-2.2a1.5 1.5 0 0 0-2-.2l-1.4 1.1a12 12 0 0 1-3.8-3.8l1.1-1.4a1.5 1.5 0 0 0-.2-2L10.6 4.2a1.5 1.5 0 0 0-2-.1Z" /></svg>
          </span>
          <span><small>AUTOMATEMIND VOICE</small><strong>Start a conversation</strong></span>
          <b aria-hidden="true">↗</b>
        </button>
      ) : (
        <div className={`voice-agent__experience ${isMinimized ? 'voice-agent__experience--minimized' : ''}`} role="dialog" aria-modal="true" aria-label="AutomateMind Voice">
          <div className="voice-agent__experience-shell">
            <header className="voice-agent__experience-header">
              <div className="voice-agent__wordmark"><span>AM</span> AUTOMATEMIND</div>
              <div className="voice-agent__header-actions">
                <button type="button" onClick={() => setIsMinimized(!isMinimized)} className="voice-agent__utility-button" aria-label={isMinimized ? 'Expand voice experience' : 'Minimize voice experience'}>{isMinimized ? '+' : '−'}</button>
                <button type="button" onClick={closeExperience} className="voice-agent__utility-button" aria-label="Close voice experience">×</button>
              </div>
            </header>
            {!isMinimized && (
              <div className="voice-agent__experience-body">
                <small className="voice-agent__experience-kicker">PRIVATE VOICE LINE</small>
                <h2>AutomateMind <em>Voice</em></h2>
                <p className="voice-agent__experience-intro">A direct line to intelligent, thoughtful assistance.</p>
                <div className={`voice-agent__visualizer ${agentSpeaking ? 'voice-agent__visualizer--speaking' : ''}`} aria-label={agentSpeaking ? 'AutomateMind is speaking' : statusText}>
                  <span className="voice-agent__visualizer-ring" />
                  <span className="voice-agent__visualizer-core">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.6 4.3 6.9 6a2 2 0 0 0-.3 2.5 16.2 16.2 0 0 0 8.9 8.9 2 2 0 0 0 2.5-.3l1.7-1.7a1.5 1.5 0 0 0 .1-2l-1.8-2.2a1.5 1.5 0 0 0-2-.2l-1.4 1.1a12 12 0 0 1-3.8-3.8l1.1-1.4a1.5 1.5 0 0 0-.2-2L10.6 4.2a1.5 1.5 0 0 0-2-.1Z" /></svg>
                  </span>
                </div>
                <div className="voice-agent__state"><span className={isCalling ? 'voice-agent__state-dot' : ''} />{statusText}<time>{isCalling ? formatDuration(callDuration) : ''}</time></div>
                {showTranscript && transcript.length > 0 && <div className="voice-agent__transcript" aria-live="polite">{transcript.map((line, index) => <p key={`${line.role}-${index}`}><b>{line.role === 'user' ? 'You' : 'AutomateMind'}</b>{line.text}</p>)}</div>}
                {errorMessage && <p className="voice-agent__experience-error" role="alert">{errorMessage}</p>}
                <div className="voice-agent__experience-controls">
                  <button type="button" onClick={() => setShowTranscript(!showTranscript)} className="voice-agent__text-button">{showTranscript ? 'Hide transcript' : 'Live transcript'}</button>
                  <div className="voice-agent__primary-controls">
                    {isCalling && hasMic && <button type="button" onClick={toggleMute} className={`voice-agent__round-control ${isMuted ? 'voice-agent__round-control--muted' : ''}`} aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}>{isMuted ? '×' : '♩'}</button>}
                    {!isCalling ? <button type="button" onClick={startCall} className="voice-agent__start-button">Start call</button> : <button type="button" onClick={endCall} className="voice-agent__end-call">End call</button>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {!isOpen && errorMessage && <div className="voice-agent__error" role="alert">{errorMessage}</div>}
    </div>
  );
}

// Guaranteed default export for Vite import
export default VoiceAgent;
