import { useEffect, useRef, useState } from 'react'
import './VoiceAgent.css'

const VOICE_ENGINE_URL = 'https://automatemind-female-ai-voice-agent-live-sdk-engin.ai.studio'
const AGENT_ID = 'automatemind-default'
const BAR_COUNT = 28

// 1. Audio format conversion helpers
function floatTo16BitPCM(input) {
  const output = new Int16Array(input.length)
  for (let index = 0; index < input.length; index += 1) {
    const sample = Math.max(-1, Math.min(1, input[index]))
    output[index] = sample < 0 ? sample * 0x8000 : sample * 0x7fff
  }
  return output
}

function resampleTo16k(input, sampleRate) {
  if (sampleRate === 16000) return input
  const ratio = sampleRate / 16000
  const output = new Float32Array(Math.floor(input.length / ratio))
  for (let index = 0; index < output.length; index += 1) {
    const position = index * ratio
    const left = Math.floor(position)
    const right = Math.min(left + 1, input.length - 1)
    const weight = position - left
    output[index] = input[left] * (1 - weight) + input[right] * weight
  }
  return output
}

function arrayBufferToBase64(buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (let index = 0; index < bytes.length; index += 1) binary += String.fromCharCode(bytes[index])
  return btoa(binary)
}

function base64ToFloat32(base64) {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index)
  const samples = new Int16Array(bytes.buffer)
  const output = new Float32Array(samples.length)
  for (let index = 0; index < samples.length; index += 1) output[index] = samples[index] / (samples[index] < 0 ? 0x8000 : 0x7fff)
  return output
}

// 2. Real telephone sound synthesizer (dual-cadence ringing, line pickup click, and 3-pulse hangup tone)
class PhoneAudioEffects {
  constructor(audioCtx) {
    this.ctx = audioCtx || null
    this.isRinging = false
    this.ringInterval = null
    this.activeRingNodes = []
  }

  setContext(audioCtx) {
    this.ctx = audioCtx
  }

  startRingback(intervalMs = 2400) {
    if (this.isRinging) return
    if (!this.ctx || this.ctx.state === 'closed') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      this.ctx = new AudioCtx({ sampleRate: 24000 })
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
    this.isRinging = true

    const playPulse = () => {
      if (!this.isRinging || !this.ctx || this.ctx.state === 'closed') return
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {})
      }
      try {
        const osc1 = this.ctx.createOscillator()
        const osc2 = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        // Authentic dual frequencies for US telephone ring (440Hz + 480Hz)
        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(440, this.ctx.currentTime)
        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(480, this.ctx.currentTime)

        const now = this.ctx.currentTime
        gain.gain.setValueAtTime(0.001, now)
        gain.gain.linearRampToValueAtTime(0.12, now + 0.04)
        gain.gain.setValueAtTime(0.12, now + 1.2)
        gain.gain.linearRampToValueAtTime(0.001, now + 1.35)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(this.ctx.destination)

        osc1.start(now)
        osc2.start(now)
        osc1.stop(now + 1.4)
        osc2.stop(now + 1.4)

        this.activeRingNodes.push(gain)
      } catch (err) {}
    }

    playPulse()
    this.ringInterval = setInterval(playPulse, intervalMs)
  }

  stopRingback() {
    this.isRinging = false
    if (this.ringInterval) {
      clearInterval(this.ringInterval)
      this.ringInterval = null
    }
    for (const node of this.activeRingNodes) {
      try { node.disconnect() } catch (e) {}
    }
    this.activeRingNodes = []
  }

  playPickupClick() {
    try {
      if (!this.ctx || this.ctx.state === 'closed') return
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {})
      }
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(320, now)
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.06)

      gain.gain.setValueAtTime(0.12, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.08)
    } catch (e) {}
  }

  playHangupTone() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      const ctx = (this.ctx && this.ctx.state !== 'closed') ? this.ctx : new AudioCtx({ sampleRate: 24000 })
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {})
      }
      const now = ctx.currentTime
      // 3 fast pulses of standard telephone disconnect tone (480Hz + 620Hz)
      ;[0, 0.22, 0.44].forEach((offset) => {
        try {
          const osc1 = ctx.createOscillator()
          const osc2 = ctx.createOscillator()
          const gain = ctx.createGain()

          osc1.type = 'sine'
          osc1.frequency.setValueAtTime(480, now + offset)
          osc2.type = 'sine'
          osc2.frequency.setValueAtTime(620, now + offset)

          gain.gain.setValueAtTime(0.001, now + offset)
          gain.gain.linearRampToValueAtTime(0.12, now + offset + 0.02)
          gain.gain.setValueAtTime(0.12, now + offset + 0.12)
          gain.gain.linearRampToValueAtTime(0.001, now + offset + 0.14)

          osc1.connect(gain)
          osc2.connect(gain)
          gain.connect(ctx.destination)

          osc1.start(now + offset)
          osc2.start(now + offset)
          osc1.stop(now + offset + 0.16)
          osc2.stop(now + offset + 0.16)
        } catch (pe) {}
      })

      if (ctx !== this.ctx) {
        setTimeout(() => {
          try { ctx.close() } catch (e) {}
        }, 1200)
      }
    } catch (e) {}
  }
}

function VoiceAgent() {
  const [isCalling, setIsCalling] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [status, setStatus] = useState('Idle')
  const [hasMic, setHasMic] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [inputLevel, setInputLevel] = useState(0)
  const [outputLevel, setOutputLevel] = useState(0)
  const [showTooltip, setShowTooltip] = useState(() => {
    try {
      return sessionStorage.getItem('automatemind-voice-tooltip-dismissed') !== 'true'
    } catch {
      return true
    }
  })

  const socketRef = useRef(null)
  const mediaStreamRef = useRef(null)
  const inputContextRef = useRef(null)
  const outputContextRef = useRef(null)
  const processorRef = useRef(null)
  const inputAnalyserRef = useRef(null)
  const outputAnalyserRef = useRef(null)
  const activeSourcesRef = useRef([])
  const scheduledTimeRef = useRef(0)
  const frameRef = useRef(null)
  const endingRef = useRef(false)
  const phoneAudioRef = useRef(null)
  const speechRecognizerRef = useRef(null)
  const ringTimeoutRef = useRef(null)

  const stopPlayback = () => {
    activeSourcesRef.current.forEach((source) => {
      try {
        source.stop()
        source.disconnect()
      } catch {}
    })
    activeSourcesRef.current = []
    if (outputContextRef.current) scheduledTimeRef.current = outputContextRef.current.currentTime
  }

  const playAudio = (base64Audio) => {
    const context = outputContextRef.current
    if (!context || context.state === 'closed') return
    try {
      const samples = base64ToFloat32(base64Audio)
      if (!samples.length) return
      const buffer = context.createBuffer(1, samples.length, 24000)
      buffer.getChannelData(0).set(samples)
      const source = context.createBufferSource()
      source.buffer = buffer
      const analyser = outputAnalyserRef.current
      source.connect(analyser || context.destination)
      if (scheduledTimeRef.current < context.currentTime) scheduledTimeRef.current = context.currentTime + 0.02
      source.start(scheduledTimeRef.current)
      scheduledTimeRef.current += buffer.duration
      activeSourcesRef.current.push(source)
      setStatus('Speaking')
      source.onended = () => {
        activeSourcesRef.current = activeSourcesRef.current.filter((item) => item !== source)
        if (!activeSourcesRef.current.length && !endingRef.current) setStatus('Listening')
      }
    } catch (error) {
      console.error('Voice playback decode failed:', error)
    }
  }

  // Client speech recognizer for immediate auto-cut when speaking "cut the call", "cut", "hang up", etc.
  const startVoiceKeywordSpotter = () => {
    const SpeechRecognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null
    if (!SpeechRecognition) return

    try {
      const recognizer = new SpeechRecognition()
      recognizer.continuous = true
      recognizer.interimResults = true
      recognizer.lang = 'en-US'

      const cutPhrases = [
        'cut the call',
        'cut call',
        'cut it',
        'cut the phone',
        'cut',
        'hang up',
        'hangup',
        'hang the call',
        'end the call',
        'end call',
        'close call',
        'disconnect the call',
        'disconnect call',
        'disconnect',
        'bye bye',
        'goodbye',
        'stop the call',
        'please cut the call',
        'please end the call'
      ]

      recognizer.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = (event.results[i][0]?.transcript || '').toLowerCase().trim()
          const matched = cutPhrases.some((phrase) => {
            if (phrase === 'cut') return /\bcut\b/.test(transcript)
            return transcript.includes(phrase)
          })
          if (matched) {
            console.log('[VoiceAgent] Voice command to cut call detected:', transcript)
            endCall('Voice command cut call: ' + transcript)
            break
          }
        }
      }

      recognizer.onerror = () => {}
      recognizer.onend = () => {
        if (!endingRef.current && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          try { recognizer.start() } catch (e) {}
        }
      }

      recognizer.start()
      speechRecognizerRef.current = recognizer
    } catch (e) {}
  }

  const endCall = (reason = 'Call ended') => {
    if (endingRef.current) return
    endingRef.current = true

    if (ringTimeoutRef.current) {
      clearTimeout(ringTimeoutRef.current)
      ringTimeoutRef.current = null
    }

    if (speechRecognizerRef.current) {
      try { speechRecognizerRef.current.abort() } catch (e) {}
      speechRecognizerRef.current = null
    }

    // Play authentic 3-pulse telephone disconnect tone!
    if (phoneAudioRef.current) {
      phoneAudioRef.current.stopRingback()
      phoneAudioRef.current.playHangupTone()
    }

    stopPlayback()

    if (processorRef.current) {
      try { processorRef.current.disconnect() } catch {}
      processorRef.current = null
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop())
      mediaStreamRef.current = null
    }
    if (inputContextRef.current) {
      inputContextRef.current.close().catch(() => {})
      inputContextRef.current = null
    }

    const currentOut = outputContextRef.current
    setTimeout(() => {
      if (currentOut && currentOut.state !== 'closed') {
        currentOut.close().catch(() => {})
      }
    }, 1200)
    outputContextRef.current = null

    inputAnalyserRef.current = null
    outputAnalyserRef.current = null

    if (socketRef.current) {
      if (socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ type: 'end' }))
        socketRef.current.close()
      }
      socketRef.current = null
    }

    setIsCalling(false)
    setIsMuted(false)
    setStatus('Idle')
    setInputLevel(0)
    setOutputLevel(0)
    endingRef.current = false
  }

  const startCall = async () => {
    if (isCalling) return
    setErrorMessage('')
    setIsCalling(true)
    endingRef.current = false
    setStatus('Ringing')

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (!AudioContextClass) throw new Error('This browser does not support voice calls.')

      // 1. Immediately create and resume AudioContext SYNCHRONOUSLY on click
      const outputContext = new AudioContextClass({ sampleRate: 24000 })
      if (outputContext.state === 'suspended') {
        await outputContext.resume()
      }
      outputContextRef.current = outputContext

      const outputAnalyser = outputContext.createAnalyser()
      outputAnalyser.fftSize = 256
      outputAnalyser.smoothingTimeConstant = 0.8
      outputAnalyser.connect(outputContext.destination)
      outputAnalyserRef.current = outputAnalyser
      scheduledTimeRef.current = outputContext.currentTime

      // 2. Start telephone ringing tone immediately (0ms delay!)
      const phoneAudio = new PhoneAudioEffects(outputContext)
      phoneAudioRef.current = phoneAudio
      phoneAudio.startRingback()

      const callStartTime = Date.now()
      const minRingDuration = 2000 // Ring for at least 2.0s for authentic phone feel

      // 3. Request microphone permission
      let stream = null
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        })
      } catch {
        setHasMic(false)
      }
      mediaStreamRef.current = stream
      setHasMic(Boolean(stream))

      // 4. Request session ticket from backend
      const base = VOICE_ENGINE_URL.replace(/\/$/, '')
      const response = await fetch(`${base}/api/agents/${encodeURIComponent(AGENT_ID)}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId: AGENT_ID }),
      })
      if (!response.ok) throw new Error(`Unable to create voice session (HTTP ${response.status}).`)
      const { ticket } = await response.json()
      if (!ticket) throw new Error('The voice service did not return a session ticket.')

      // 5. Connect WebSocket
      const protocol = base.startsWith('https') ? 'wss:' : 'ws:'
      const host = base.replace(/^https?:\/\//, '')
      const socket = new WebSocket(`${protocol}//${host}/live?ticket=${encodeURIComponent(ticket)}&agentId=${encodeURIComponent(AGENT_ID)}`)
      socketRef.current = socket

      // 6. Connect microphone input stream
      if (stream) {
        const inputContext = new AudioContextClass({ sampleRate: 16000 })
        if (inputContext.state === 'suspended') await inputContext.resume()
        inputContextRef.current = inputContext

        const source = inputContext.createMediaStreamSource(stream)
        const inputAnalyser = inputContext.createAnalyser()
        inputAnalyser.fftSize = 256
        inputAnalyser.smoothingTimeConstant = 0.8
        source.connect(inputAnalyser)
        inputAnalyserRef.current = inputAnalyser

        const sendAudio = (samples) => {
          if (isMuted || socket.readyState !== WebSocket.OPEN) return
          const pcm = floatTo16BitPCM(resampleTo16k(samples, inputContext.sampleRate))
          socket.send(JSON.stringify({ type: 'audio', audio: arrayBufferToBase64(pcm.buffer), mimeType: 'audio/pcm;rate=16000' }))
        }

        if (inputContext.audioWorklet) {
          const module = `data:application/javascript;charset=utf-8,${encodeURIComponent('class Capture extends AudioWorkletProcessor{process(inputs){if(inputs[0]?.[0])this.port.postMessage(inputs[0][0]);return true}}registerProcessor("capture",Capture)')}`
          await inputContext.audioWorklet.addModule(module)
          const node = new AudioWorkletNode(inputContext, 'capture')
          node.port.onmessage = (event) => sendAudio(event.data)
          const silent = inputContext.createGain()
          silent.gain.value = 0
          node.connect(silent).connect(inputContext.destination)
          source.connect(node)
          processorRef.current = node
        } else {
          const processor = inputContext.createScriptProcessor(2048, 1, 1)
          processor.onaudioprocess = (event) => sendAudio(event.inputBuffer.getChannelData(0))
          const silent = inputContext.createGain()
          silent.gain.value = 0
          processor.connect(silent).connect(inputContext.destination)
          source.connect(processor)
          processorRef.current = processor
        }
      }

      socket.onopen = () => {
        const elapsed = Date.now() - callStartTime
        const remainingRing = Math.max(0, minRingDuration - elapsed)

        ringTimeoutRef.current = setTimeout(() => {
          // Stop ringing with authentic receiver pickup click sound
          if (phoneAudioRef.current) {
            phoneAudioRef.current.stopRingback()
            phoneAudioRef.current.playPickupClick()
          }

          setStatus('Connected')
          // Assistant speaks first immediately with greeting!
          socket.send(JSON.stringify({ type: 'start' }))

          // Start continuous voice keyword spotter for automatic call cutting
          startVoiceKeywordSpotter()
        }, remainingRing)
      }

      socket.onmessage = (event) => {
        try {
          if (event.data instanceof ArrayBuffer) {
            playAudio(arrayBufferToBase64(event.data))
            return
          }
          const message = JSON.parse(event.data)
          if (message.type === 'audio' && message.audio) {
            playAudio(message.audio)
          } else if (message.type === 'ready') {
            setStatus('Listening')
          } else if (message.type === 'interrupted') {
            stopPlayback()
            setStatus('Listening')
          } else if (message.type === 'call_ended') {
            // CRITICAL: Handle Gemini Live backend end_call tool trigger
            console.log('[VoiceAgent] Call ended by voice command / model:', message.reason)
            endCall('Voice command cut call: ' + (message.message || 'Cut requested'))
          } else if (message.type === 'ended') {
            endCall('Server closed connection')
          } else if (message.type === 'error') {
            setErrorMessage(message.message || 'The voice service returned an error.')
            endCall()
          }
        } catch (error) {
          console.error('Invalid voice service message:', error)
        }
      }

      socket.onerror = () => {
        setErrorMessage('The voice connection could not be established. Please try again.')
        endCall()
      }

      socket.onclose = () => {
        if (!endingRef.current) endCall()
      }
    } catch (error) {
      console.error('Voice call failed:', error)
      setErrorMessage(error instanceof Error ? error.message : 'The voice call could not start.')
      endCall()
    }
  }

  const toggleMute = () => {
    if (!hasMic || status === 'Ringing') return
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    mediaStreamRef.current?.getAudioTracks().forEach((track) => { track.enabled = !nextMuted })
    if (socketRef.current?.readyState === WebSocket.OPEN) socketRef.current.send(JSON.stringify({ type: nextMuted ? 'mute' : 'unmute' }))
  }

  useEffect(() => {
    if (!isCalling) return undefined
    const inputData = new Uint8Array(128)
    const outputData = new Uint8Array(128)
    const measure = () => {
      if (inputAnalyserRef.current) {
        inputAnalyserRef.current.getByteTimeDomainData(inputData)
        setInputLevel(Math.min(1, inputData.reduce((sum, value) => sum + Math.abs(value - 128), 0) / inputData.length / 30))
      }
      if (outputAnalyserRef.current) {
        outputAnalyserRef.current.getByteTimeDomainData(outputData)
        setOutputLevel(Math.min(1, outputData.reduce((sum, value) => sum + Math.abs(value - 128), 0) / outputData.length / 30))
      }
      frameRef.current = requestAnimationFrame(measure)
    }
    frameRef.current = requestAnimationFrame(measure)
    return () => frameRef.current && cancelAnimationFrame(frameRef.current)
  }, [isCalling])

  useEffect(() => () => endCall(), [])

  const dismissTooltip = () => {
    setShowTooltip(false)
    try { sessionStorage.setItem('automatemind-voice-tooltip-dismissed', 'true') } catch {}
  }

  const level = status === 'Speaking' ? outputLevel : inputLevel
  const bars = Array.from({ length: BAR_COUNT }, (_, index) => 4 + ((index * 5) % 8) + Math.round(level * (index % 4 + 5)))

  return (
    <div className={`voice-agent ${isCalling ? 'voice-agent--active' : ''}`}>
      {!isCalling && showTooltip && (
        <div className="voice-agent__tooltip">
          <button type="button" onClick={dismissTooltip} aria-label="Dismiss voice assistant introduction">×</button>
          Need a hand? Let&apos;s talk.
        </div>
      )}
      {!isCalling ? (
        <button type="button" onClick={startCall} className="voice-agent__pill voice-agent__pill--collapsed" aria-label="Start a voice call with AutomateMind" title="Start a voice call">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.6 4.3 6.9 6a2 2 0 0 0-.3 2.5 16.2 16.2 0 0 0 8.9 8.9 2 2 0 0 0 2.5-.3l1.7-1.7a1.5 1.5 0 0 0 .1-2l-1.8-2.2a1.5 1.5 0 0 0-2-.2l-1.4 1.1a12 12 0 0 1-3.8-3.8l1.1-1.4a1.5 1.5 0 0 0-.2-2L10.6 4.2a1.5 1.5 0 0 0-2-.1Z" /></svg>
        </button>
      ) : (
        <div className="voice-agent__pill voice-agent__pill--active" role="group" aria-label={`Voice call: ${status}`}>
          <button type="button" onClick={toggleMute} disabled={!hasMic || status === 'Ringing'} className={`voice-agent__control voice-agent__mute ${isMuted ? 'voice-agent__control--muted' : ''}`} aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'} title={isMuted ? 'Unmute microphone' : 'Mute microphone'}>
            {isMuted ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 5a3 3 0 0 1 6 0v6a3 3 0 0 1-6 0V5ZM5 11a7 7 0 0 0 14 0M12 18v3M8 21h8" />
                <path d="m4 4 16 16" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 5a3 3 0 0 1 6 0v6a3 3 0 0 1-6 0V5ZM5 11a7 7 0 0 0 14 0M12 18v3M8 21h8" />
              </svg>
            )}
          </button>
          <div className={`voice-agent__waveform ${status === 'Ringing' ? 'voice-agent__waveform--connecting' : ''}`} aria-label={`${status}, audio level ${Math.round(level * 100)} percent`}>
            {bars.map((height, index) => <i key={index} style={{ height: `${height}px` }} />)}
          </div>
          <button type="button" onClick={() => endCall('User clicked Hang Up')} className="voice-agent__control voice-agent__hangup" aria-label="End voice call" title="End voice call">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.8 14.2c3.9-2.5 8.5-2.5 12.4 0l1.1 1a1.5 1.5 0 0 1 .1 2.1l-1.3 1.4a1.5 1.5 0 0 1-2 .2l-2.5-2a1.5 1.5 0 0 0-1.9 0l-1.4 1.1a1.5 1.5 0 0 1-1.9 0l-3.5-2.7a1.5 1.5 0 0 1-.1-2.3l1-0.8Z" transform="rotate(135 12 12)" /></svg>
          </button>
        </div>
      )}
      {!isCalling && errorMessage && <div className="voice-agent__error" role="alert">{errorMessage}<button type="button" onClick={startCall}>Retry</button></div>}
    </div>
  )
}

export default VoiceAgent