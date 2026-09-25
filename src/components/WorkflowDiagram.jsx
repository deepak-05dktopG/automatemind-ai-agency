export function WorkflowDiagram() {
  return (
    <div className="workflow-visual" aria-label="Business input to automated outcome flow">
      <div className="flow-core">
        <div className="flow-node flow-node--start">
          <span>Business Input</span>
        </div>
        <div className="flow-connector" aria-hidden="true" />
        <div className="flow-node flow-node--middle">
          <span>AI Intelligence</span>
        </div>
        <div className="flow-connector" aria-hidden="true" />
        <div className="flow-node flow-node--middle">
          <span>Automation</span>
        </div>
        <div className="flow-connector" aria-hidden="true" />
        <div className="flow-node flow-node--end">
          <span>Business Outcome</span>
        </div>
      </div>
    </div>
  )
}
