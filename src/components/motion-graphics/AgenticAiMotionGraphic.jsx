import agenticGraphicMarkup from './agentic-ai-motion.html?raw'

export function AgenticAiMotionGraphic() {
  return (
    <iframe
      className="agentic-ai-motion-graphic"
      title="Agentic AI collaboration diagram"
      srcDoc={agenticGraphicMarkup}
      loading="eager"
      aria-label="Animated Agentic AI collaboration diagram"
    />
  )
}
