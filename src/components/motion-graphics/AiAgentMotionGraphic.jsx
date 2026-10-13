import agentGraphicMarkup from './ai-agent-motion-graphic.html?raw'

export function AiAgentMotionGraphic() {
  return (
    <iframe
      className="ai-agent-motion-graphic"
      title="AI agent workflow diagram"
      srcDoc={agentGraphicMarkup}
      loading="eager"
      aria-label="Animated AI agent workflow diagram"
    />
  )
}
