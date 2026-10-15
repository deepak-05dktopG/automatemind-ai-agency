// src/VoiceAgent.jsx
import React from 'react';

export default function VoiceAgent({
  agentUrl = "https://ais-pre-qrwhkshqnetylsfk647fu6-259839896514.asia-northeast1.run.app/?mode=widget",
  themeColor = "#C6A15B",
  buttonText = "Speak with AI Consultant",
}) {
  const handleOpenAgent = () => {
    // Opens a sleek, dedicated assistant window
    const width = 420;
    const height = 680;
    const left = window.screen.width ? window.screen.width - width - 24 : 100;
    const top = 60;

    window.open(
      agentUrl,
      'AutomateMindVoiceAgent',
      `width=${width},height=${height},top=${top},left=${left},status=no,menubar=no,toolbar=no,location=no,resizable=yes`
    );
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 2147483647,
        fontFamily: "'Manrope', system-ui, -apple-system, sans-serif",
      }}
    >
      <button
        type="button"
        onClick={handleOpenAgent}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 24px',
          borderRadius: '30px',
          background: '#071522',
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
            background: themeColor,
            color: '#071522',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" x2="12" y1="19" y2="22"></line>
          </svg>
        </span>
        <span>{buttonText}</span>
      </button>
    </div>
  );
}