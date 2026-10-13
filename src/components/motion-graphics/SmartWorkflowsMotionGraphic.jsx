import workflowGraphicMarkup from './smart-workflows-motion.html?raw'

export function SmartWorkflowsMotionGraphic() {
  return (
    <iframe
      className="smart-workflows-motion-graphic"
      title="Smart Workflows automation diagram"
      srcDoc={workflowGraphicMarkup}
      loading="eager"
      aria-label="Animated Smart Workflows automation diagram"
    />
  )
}
