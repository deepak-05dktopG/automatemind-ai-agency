import assistantsGraphicMarkup from './ai-assistants-motion.html?raw'

export function AiAssistantsMotionGraphic() {
  return (
    <iframe
      className="ai-assistants-motion-graphic"
      title="AI Assistants workflow diagram"
      srcDoc={assistantsGraphicMarkup}
      loading="eager"
      aria-label="Animated AI Assistants workflow diagram"
    />
  )
}
