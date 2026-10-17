import { useEffect, useRef, useState } from 'react'
import './VoiceAgent.css'

const VOICE_ENGINE_URL = 'https://automatemind-female-ai-voice-agent-live-sdk-engin.ai.studio'
const AGENT_ID = 'automatemind-default'
const BAR_COUNT = 28

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

  const stopPlayback = () => {
    activeSourcesRef.current.forEach((source) => {
      try {
        source.stop()
        source.disconnect()
      } catch {
        // The source may already have ended.
      }
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

  const endCall = () => {
    endingRef.current = true
    stopPlayback()
    if (processorRef.current) {
      try { processorRef.current.disconnect() } catch { /* Already disconnected. */ }
      processorRef.current = null
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop())
      mediaStreamRef.current = null
    }
    if (inputContextRef.current) inputContextRef.current.close().catch(() => {})
    if (outputContextRef.current) outputContextRef.current.close().catch(() => {})
    inputContextRef.current = null
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
    setStatus('Connecting')
    setIsCalling(true)
    endingRef.current = false

    try {
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

      const base = VOICE_ENGINE_URL.replace(/\/$/, '')
      const response = await fetch(`${base}/api/agents/${encodeURIComponent(AGENT_ID)}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId: AGENT_ID }),
      })
      if (!response.ok) throw new Error(`Unable to create voice session (HTTP ${response.status}).`)
      const { ticket } = await response.json()
      if (!ticket) throw new Error('The voice service did not return a session ticket.')

      const protocol = base.startsWith('https') ? 'wss:' : 'ws:'
      const host = base.replace(/^https?:\/\//, '')
      const socket = new WebSocket(`${protocol}//${host}/live?ticket=${encodeURIComponent(ticket)}&agentId=${encodeURIComponent(AGENT_ID)}`)
      socketRef.current = socket
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (!AudioContextClass) throw new Error('This browser does not support voice calls.')

      const outputContext = new AudioContextClass({ sampleRate: 24000 })
      await outputContext.resume()
      outputContextRef.current = outputContext
      const outputAnalyser = outputContext.createAnalyser()
      outputAnalyser.fftSize = 256
      outputAnalyser.smoothingTimeConstant = 0.8
      outputAnalyser.connect(outputContext.destination)
      outputAnalyserRef.current = outputAnalyser
      scheduledTimeRef.current = outputContext.currentTime

      if (stream) {
        const inputContext = new AudioContextClass({ sampleRate: 16000 })
        await inputContext.resume()
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
        setStatus('Listening')
        socket.send(JSON.stringify({ type: 'start' }))
      }
      socket.onmessage = (event) => {
        try {
          if (event.data instanceof ArrayBuffer) {
            playAudio(arrayBufferToBase64(event.data))
            return
          }
          const message = JSON.parse(event.data)
          if (message.type === 'audio' && message.audio) playAudio(message.audio)
          else if (message.type === 'ready') setStatus('Listening')
          else if (message.type === 'interrupted') {
            stopPlayback()
            setStatus('Listening')
          } else if (message.type === 'error') {
            setErrorMessage(message.message || 'The voice service returned an error.')
            endCall()
          } else if (message.type === 'ended') endCall()
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
    if (!hasMic || status === 'Connecting') return
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
    try { sessionStorage.setItem('automatemind-voice-tooltip-dismissed', 'true') } catch { /* Optional persistence. */ }
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
          <button type="button" onClick={toggleMute} disabled={!hasMic || status === 'Connecting'} className={`voice-agent__control voice-agent__mute ${isMuted ? 'voice-agent__control--muted' : ''}`} aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'} title={isMuted ? 'Unmute microphone' : 'Mute microphone'}>
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
          <div className={`voice-agent__waveform ${status === 'Connecting' ? 'voice-agent__waveform--connecting' : ''}`} aria-label={`${status}, audio level ${Math.round(level * 100)} percent`}>
            {bars.map((height, index) => <i key={index} style={{ height: `${height}px` }} />)}
          </div>
          <button type="button" onClick={endCall} className="voice-agent__control voice-agent__hangup" aria-label="End voice call" title="End voice call">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.8 14.2c3.9-2.5 8.5-2.5 12.4 0l1.1 1a1.5 1.5 0 0 1 .1 2.1l-1.3 1.4a1.5 1.5 0 0 1-2 .2l-2.5-2a1.5 1.5 0 0 0-1.9 0l-1.4 1.1a1.5 1.5 0 0 1-1.9 0l-3.5-2.7a1.5 1.5 0 0 1-.1-2.3l1-0.8Z" transform="rotate(135 12 12)" /></svg>
          </button>
        </div>
      )}
      {!isCalling && errorMessage && <div className="voice-agent__error" role="alert">{errorMessage}<button type="button" onClick={startCall}>Retry</button></div>}
    </div>
  )
}

export default VoiceAgent
