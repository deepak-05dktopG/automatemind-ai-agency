// src/VoiceAgent.jsx
import React, { useState } from 'react';

/**
 * AutomateMind Voice AI Agent - React Drop-in Component
 * 100% Frontend-only: You do NOT need any backend on your website!
 * Connects directly to your Google AI Studio Gemini Live agent.
 */
export default function VoiceAgent({
  agentUrl = "https://ais-pre-qrwhkshqnetylsfk647fu6-259839896514.asia-northeast1.run.app/?mode=widget&agent=automatemind-default",
  themeColor = "#C6A15B",
  buttonText = "Speak with AI Consultant",
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 2147483647,
        fontFamily: "'Manrope', system-ui, -apple-system, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      {/* Voice Assistant Modal */}
      {isOpen && (
        <div
          style={{
            width: '380px',
            height: '580px',
            maxHeight: 'calc(100vh - 100px)',
            maxWidth: 'calc(100vw - 32px)',
            marginBottom: '14px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.75)',
            border: '1px solid rgba(198, 161, 91, 0.35)',
            background: '#071522',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              padding: '10px 16px',
              background: '#0B1B2B',
              borderBottom: '1px solid rgba(198, 161, 91, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#F3F0E8',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 8px #22c55e',
                  display: 'inline-block',
                }}
              />
              <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px' }}>
                AUTOMATEMIND ASSISTANT LIVE VOICE
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close voice assistant"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#AAB5C3',
                cursor: 'pointer',
                fontSize: '18px',
                lineHeight: 1,
                padding: '4px',
              }}
            >
              ✕
            </button>
          </div>

          {/* Voice Assistant Live Frame */}
          <iframe
            src={agentUrl}
            allow="microphone"
            title="AutomateMind Assistant"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: '#071522',
            }}
          />
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close voice assistant' : buttonText}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 22px',
          borderRadius: '30px',
          background: '#071522',
          color: '#F3F0E8',
          border: '1.5px solid ' + themeColor,
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5), 0 0 15px rgba(198, 161, 91, 0.25)',
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
            background: themeColor,
            color: '#071522',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isOpen ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" x2="12" y1="19" y2="22"></line>
            </svg>
          )}
        </span>
        <span>{isOpen ? 'Close Voice Assistant' : buttonText}</span>
      </button>
    </div>
  );
}