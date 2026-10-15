import { HomeAvatarGuide } from '../HomeAvatarGuide'
import { PrimaryButton, SecondaryButton } from '../Buttons'
import { SolutionMotionPlaceholder } from './SolutionMotionPlaceholder'
import './SolutionsSections.css'

const solutionTypes = [
  'AI Agents',
  'Agentic AI',
  'AI Assistants',
  'Smart Workflows',
  'Process Automation',
  'Intelligent Tasks',
  'Business Systems',
  'Custom Platforms',
  'AI-Powered Apps',
]

const solutionSections = [
  {
    title: 'AI Agent Solutions',
    heading: 'AI that works alongside your team.',
    description: 'Practical AI agents that help businesses respond faster, find information, and handle routine requests with less manual effort.',
    solutions: [
      ['Customer Support Agent', 'Answer common customer questions using approved company information and help customers get support faster.', 'CONVERSATION FLOW'],
      ['Internal Knowledge Agent', 'Help employees find relevant information across company documents, policies, and internal knowledge resources.', 'KNOWLEDGE FLOW'],
      ['Appointment Agent', 'Handle routine booking enquiries, collect essential details, and help customers move toward scheduling an appointment.', 'SCHEDULING FLOW'],
      ['Sales Agent', 'Help prospects understand relevant offerings, get answers to common questions, and identify the appropriate next step.', 'ENQUIRY FLOW'],
      ['Follow-up Agent', 'Help teams keep routine follow-up requests organized and moving at the right time.', 'FOLLOW-UP FLOW'],
      ['Custom AI Agent', 'A focused AI agent shaped around your business need, working within the service area you choose.', 'CUSTOM BLUEPRINT'],
    ],
  },
  {
    title: 'Agentic AI Solutions',
    heading: 'Give complex work a clearer path.',
    description: 'Goal-oriented AI systems that can work through defined multi-step tasks while keeping people in control.',
    solutions: [
      ['Goal-Based Task Runner', 'Move a defined request through its required steps toward a clear outcome.', 'GOAL FLOW'],
      ['Multi-Step Planner', 'Turn a structured objective into an ordered sequence of manageable actions.', 'PLANNING FLOW'],
      ['Tool-Using Agent', 'Use approved tools in a controlled sequence to complete a defined piece of work.', 'TOOL FLOW'],
      ['Review and Approval Agent', 'Bring a person into the process when a decision or approval is needed.', 'REVIEW FLOW'],
      ['Exception-Aware Agent', 'Recognize when work falls outside the expected path and surface it for attention.', 'EXCEPTION FLOW'],
      ['Custom Agentic System', 'A goal-oriented system shaped around your business need within the Agentic AI service area.', 'CUSTOM BLUEPRINT'],
    ],
  },
  {
    title: 'AI Assistant Solutions',
    heading: 'Make useful knowledge easier to reach.',
    description: 'Practical assistants that help customers and teams ask questions, understand information, and move forward.',
    solutions: [
      ['Customer Question Assistant', 'Give customers a clearer way to ask routine questions and find relevant answers.', 'QUESTION FLOW'],
      ['Team Knowledge Assistant', 'Help employees locate useful internal information without searching through multiple sources.', 'KNOWLEDGE FLOW'],
      ['Document Assistant', 'Help people understand the contents of selected business documents more quickly.', 'DOCUMENT FLOW'],
      ['Onboarding Assistant', 'Guide people toward the information and next steps they need during onboarding.', 'ONBOARDING FLOW'],
      ['Service Information Assistant', 'Present helpful service information in a simple, conversational format.', 'SERVICE FLOW'],
      ['Custom AI Assistant', 'An assistant shaped around your business need within the AI Assistant service area.', 'CUSTOM BLUEPRINT'],
    ],
  },
  {
    title: 'Smart Workflow Solutions',
    heading: 'Connect the work between each step.',
    description: 'Structured workflows that help information move between people, systems, and the moments that matter.',
    solutions: [
      ['Lead Handoff Workflow', 'Move new opportunities from one team or stage to the next with clearer ownership.', 'HANDOFF FLOW'],
      ['Customer Request Workflow', 'Route incoming requests to the right place for a more consistent response.', 'REQUEST FLOW'],
      ['Approval Workflow', 'Organize review steps so work can move forward with the right checks.', 'APPROVAL FLOW'],
      ['Team Notification Workflow', 'Keep the right people informed when an important work event occurs.', 'NOTIFICATION FLOW'],
      ['Information Sync Workflow', 'Keep selected information aligned across the steps where it is used.', 'SYNC FLOW'],
      ['Custom Smart Workflow', 'A connected workflow shaped around your business need within the Smart Workflows service area.', 'CUSTOM BLUEPRINT'],
    ],
  },
  {
    title: 'Process Automation Solutions',
    heading: 'Make repeatable work more dependable.',
    description: 'Clear automation for recurring processes, helping teams spend less time repeating the same manual steps.',
    solutions: [
      ['Request Processing', 'Move routine requests through a consistent set of steps from start to finish.', 'PROCESS FLOW'],
      ['Data Update Process', 'Reduce repeated updates across a defined business process.', 'UPDATE FLOW'],
      ['Approval Process', 'Create a clearer path for routine reviews and decisions.', 'APPROVAL FLOW'],
      ['Follow-Up Process', 'Keep recurring follow-up work visible and organized.', 'FOLLOW-UP FLOW'],
      ['Status Tracking Process', 'Give teams a simpler view of where recurring work currently stands.', 'STATUS FLOW'],
      ['Custom Process Automation', 'A repeatable process shaped around your business need within the Process Automation service area.', 'CUSTOM BLUEPRINT'],
    ],
  },
  {
    title: 'Intelligent Task Solutions',
    heading: 'Give small tasks more useful momentum.',
    description: 'Focused AI support for defined tasks that take time, attention, and consistency across the working day.',
    solutions: [
      ['Information Extraction', 'Pull useful details from selected inputs into a clearer working format.', 'EXTRACTION FLOW'],
      ['Request Categorization', 'Sort incoming items into meaningful categories for the next step.', 'CATEGORY FLOW'],
      ['Document Summary', 'Turn selected documents into shorter, easier-to-review summaries.', 'SUMMARY FLOW'],
      ['Content Preparation', 'Help prepare structured starting points for common content tasks.', 'PREPARATION FLOW'],
      ['Task Classification', 'Identify the type of a defined task so it can be handled appropriately.', 'CLASSIFICATION FLOW'],
      ['Custom Intelligent Task', 'A focused task solution shaped around your business need within the Intelligent Tasks service area.', 'CUSTOM BLUEPRINT'],
    ],
  },
  {
    title: 'Business System Solutions',
    heading: 'Bring everyday operations into better view.',
    description: 'Connected internal systems that help teams organize information and work with greater clarity.',
    solutions: [
      ['Operations Workspace', 'Bring selected operational information into one practical working space.', 'WORKSPACE FLOW'],
      ['Team Activity View', 'Give teams a clearer view of the work moving through their area.', 'ACTIVITY FLOW'],
      ['Information Hub', 'Organize important business information so it is easier to work with.', 'INFORMATION FLOW'],
      ['Internal Request System', 'Create a structured place for teams to submit and follow internal requests.', 'REQUEST FLOW'],
      ['Operational Overview', 'Present useful operational details in a focused, understandable view.', 'OVERVIEW FLOW'],
      ['Custom Business System', 'An internal system shaped around your business need within the Business Systems service area.', 'CUSTOM BLUEPRINT'],
    ],
  },
  {
    title: 'Custom Platform Solutions',
    heading: 'Build the digital experience your work needs.',
    description: 'Purpose-built platforms that bring a specific customer, member, or operational experience together.',
    solutions: [
      ['Customer Portal', 'Give customers a focused place to access the experience your business provides.', 'PORTAL FLOW'],
      ['Service Platform', 'Bring a defined service journey into one clear digital experience.', 'SERVICE FLOW'],
      ['Member Platform', 'Support a membership or community experience with focused functionality.', 'MEMBER FLOW'],
      ['Booking Platform', 'Create a focused digital path around a booking-led experience.', 'BOOKING FLOW'],
      ['Management Platform', 'Give teams a structured place to manage a specific area of work.', 'MANAGEMENT FLOW'],
      ['Custom Platform', 'A purpose-built platform shaped around your business need within the Custom Platforms service area.', 'CUSTOM BLUEPRINT'],
    ],
  },
  {
    title: 'AI-Powered App Solutions',
    heading: 'Turn useful intelligence into usable products.',
    description: 'Applications that combine a clear experience with AI capabilities for a defined real-world need.',
    solutions: [
      ['Intelligent Search App', 'Help people find relevant information through a focused application experience.', 'SEARCH FLOW'],
      ['Recommendation App', 'Present useful options based on the information available within the experience.', 'RECOMMENDATION FLOW'],
      ['AI Content App', 'Support a defined content task through a simple, usable application.', 'CONTENT FLOW'],
      ['Insight App', 'Bring selected information together so people can understand it more easily.', 'INSIGHT FLOW'],
      ['AI Feature Layer', 'Add a focused intelligent capability to an existing application experience.', 'FEATURE FLOW'],
      ['Custom AI-Powered App', 'An application shaped around your business need within the AI-Powered Apps service area.', 'CUSTOM BLUEPRINT'],
    ],
  },
]

export function SolutionsHeroSection() {
  return (
    <section className="solutions-page-hero">
      <div className="container solutions-page-hero__inner">
        <div className="solutions-page-hero__content">
          <HomeAvatarGuide side="right" animation="searching">
            <span className="eyebrow">SOLUTIONS</span>
          </HomeAvatarGuide>
          <h1>Make the hard parts of work feel simple.</h1>
          <p>
            Practical automation blueprints for the work your business does every day.
            Start with the area that needs a clearer, more capable way forward.
          </p>
          <div className="solutions-page-hero__actions">
            <PrimaryButton to="#solution-types">Explore Solution Areas</PrimaryButton>
            <SecondaryButton to="/contact">Start a Conversation</SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SolutionsGridSection() {
  return (
    <section id="solution-types" className="solutions-page-types">
      <div className="container">
        <div className="solutions-page-types__intro">
          <div>
            <span className="eyebrow">SOLUTION AREAS</span>
            <h2>Choose the kind of work you want to make clearer.</h2>
          </div>
          <p>
            Explore the areas where we build focused automation systems. The detailed
            solution blueprints will be added here as each service is defined.
          </p>
        </div>

        <div className="solutions-page-types__grid">
          {solutionTypes.map((service, index) => (
            <a className="solution-type-card" href={`#solution-${index + 1}`} key={service}>
              <span className="solution-type-card__number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{service}</h3>
                <span className="solution-type-card__link">See {service} solutions <b aria-hidden="true">↘</b></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SolutionsBlueprintSections() {
  return (
    <div className="solutions-blueprints">
      {solutionSections.map((section, sectionIndex) => (
        <section id={`solution-${sectionIndex + 1}`} className="solutions-blueprint-section solutions-blueprint-section--ai-agents" key={section.title}>
          <div className="container">
            <div className="solutions-blueprint-section__head">
              <span className="solutions-blueprint-section__number">{String(sectionIndex + 1).padStart(2, '0')}</span>
              <div>
                <span className="eyebrow">{section.title.toUpperCase()}</span>
                <h2>{section.heading}</h2>
                <p>{section.description}</p>
              </div>
            </div>
            <div className="solutions-blueprint-section--ai-agents__cards solutions-blueprint-section__cards">
              {section.solutions.map(([title, description, marker], index) => (
                <article className={`solution-blueprint-card solution-blueprint-card--${index + 1}`} key={title}>
                  <SolutionMotionPlaceholder label={marker} aspectRatio="16 / 9" />
                  <div className="solution-blueprint-card__content">
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
