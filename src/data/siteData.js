export const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Industries', path: '/industries' },
  { label: 'How We Work', path: '/how-we-work' },
  { label: 'About', path: '/about' },
  { label: 'Careers', path: '/careers' },
]

export const serviceData = [
  {
    number: '01',
    title: 'Agentic AI',
    summary: 'AI systems that can plan, decide, and act across routine business tasks without waiting for manual steps.',
    problem: 'Teams waste time coordinating decisions across disconnected tasks, approvals, and tools.',
    approach: 'We design agent workflows that understand context, trigger the right next step, and complete structured actions across systems.',
    benefit: 'Reduce decision delay, move work forward automatically, and free teams to focus on exceptions and high-value work.',
    useCases: ['Lead triage and routing', 'Internal service workflows', 'Operational coordination'],
  },
  {
    number: '02',
    title: 'AI Agents',
    summary: 'Task-focused AI assistants built around your business logic, priorities, and internal workflows.',
    problem: 'Generic AI tools are not built around your processes, handoffs, or approval logic.',
    approach: 'We build purpose-fit agents that connect to your systems, access the right information, and follow your operating rules.',
    benefit: 'Improve response speed, reduce manual effort, and give teams a more reliable way to work with AI.',
    useCases: ['Customer support assistant', 'Sales follow-up agent', 'Internal knowledge assistant'],
  },
  {
    number: '03',
    title: 'Business Automation',
    summary: 'Systems that eliminate repetitive operational work and keep information moving between the tools your teams already use.',
    problem: 'Manual updates, repeated tasks, and disconnected admin work create friction in daily operations.',
    approach: 'We map the process, automate the repetitive steps, and connect your core business systems into one operating flow.',
    benefit: 'Speed up operations, reduce errors, and give your team more time for customer and revenue work.',
    useCases: ['Deal handoff automation', 'Inventory updates', 'Operations task routing'],
  },
  {
    number: '04',
    title: 'Workflow Automation',
    summary: 'Automation designed around the exact sequence of work your teams perform every day.',
    problem: 'Business workflows break down when tasks rely on email, spreadsheets, forms, and manual follow-up.',
    approach: 'We design event-based workflows that trigger the right actions, track progress, and keep every handoff visible.',
    benefit: 'Create more predictable operations, fewer bottlenecks, and clearer accountability across teams.',
    useCases: ['Approval flows', 'Project intake', 'Service request handling'],
  },
  {
    number: '05',
    title: 'Intelligent Process Automation',
    summary: 'Automation that combines rules, AI, and process design to handle structured and semi-structured work.',
    problem: 'Businesses still depend on teams to process repetitive documents, data, forms, and exception-heavy tasks.',
    approach: 'We combine automation logic with AI for reading, classification, extraction, and decision support to handle the work intelligently.',
    benefit: 'Reduce operational drag, improve quality, and turn repetitive processing into a scalable system.',
    useCases: ['Document intake', 'Claims processing', 'Data standardization'],
  },
  {
    number: '06',
    title: 'AI Integration',
    summary: 'Connect AI into the tools and systems your business already depends on without disrupting the way teams work.',
    problem: 'AI has little value when it sits outside the actual operational workflow or is disconnected from key systems.',
    approach: 'We integrate AI into existing tools, apps, and process steps so it supports real work instead of becoming an isolated experiment.',
    benefit: 'Bring AI into day-to-day operations in a practical, useful way that employees can trust.',
    useCases: ['CRM AI summaries', 'Email drafting', 'Knowledge assistant for teams'],
  },
  {
    number: '07',
    title: 'Custom Intelligent Systems',
    summary: 'Tailored business systems designed around your operations, data, and decision-making patterns.',
    problem: 'Off-the-shelf tools rarely match how a real business actually works across departments and processes.',
    approach: 'We design custom systems around your workflows, integrations, rules, and business logic so the solution fits your reality.',
    benefit: 'Get a system that works the way your business works instead of forcing your team to adapt to software.',
    useCases: ['Commission workflows', 'Proposal automation', 'Operational dashboards'],
  },
  {
    number: '08',
    title: 'Custom Software Solutions',
    summary: 'Purpose-built software that helps teams operate faster, with cleaner data and fewer manual handoffs.',
    problem: 'Businesses often outgrow disconnected tools and need a practical route to better internal systems.',
    approach: 'We build business-focused software that fits your process, connects your data, and manages the logic behind everyday operations.',
    benefit: 'Create a more scalable operating model with better visibility, fewer bottlenecks, and more control.',
    useCases: ['Internal operations platform', 'Inventory and order workflows', 'Client onboarding system'],
  },
]

export const solutionData = [
  'Lead Management',
  'Sales Automation',
  'Customer Support',
  'Operations Automation',
  'Marketing Automation',
  'Document Processing',
  'Data Workflows',
  'Employee/Internal Operations',
  'AI Assistants',
  'AI Agents',
  'Business Intelligence',
  'Custom Solutions',
]

export const capabilityData = [
  {
    name: 'Agentic AI',
    description: 'AI that can coordinate steps, gather information, and advance the workflow without constant manual direction.',
  },
  {
    name: 'Business Automation',
    description: 'Automated operating flows that remove repetitive work and keep business processes moving.',
  },
  {
    name: 'Workflow Automation',
    description: 'Structured automation for approvals, handoffs, and process orchestration across teams and tools.',
  },
  {
    name: 'AI Integration',
    description: 'Connecting intelligence into the systems your people already rely on every day.',
  },
  {
    name: 'Intelligent Systems',
    description: 'Business systems that blend logic, AI, and data to support decisions and execution.',
  },
  {
    name: 'Custom Solutions',
    description: 'Solutions designed specifically for your process, team structure, and operational needs.',
  },
]

export const industryList = [
  { name: 'Healthcare', challenges: ['Patient intake delays', 'Manual admin work', 'Scheduling and follow-ups'], opportunities: ['Appointment automation', 'Claims support', 'Clinical admin workflows'], ai: ['Document review', 'Patient communications', 'Operational insights'] },
  { name: 'Education', challenges: ['Admissions follow-up', 'Manual communication', 'Student operations'], opportunities: ['Enrollment workflows', 'Lead nurturing', 'Academic admin automation'], ai: ['Student support assistants', 'Content summarization', 'Retention insights'] },
  { name: 'Real Estate', challenges: ['Lead follow-ups', 'Document tracking', 'Property admin work'], opportunities: ['Lead routing', 'Offer workflows', 'CRM automation'], ai: ['Property matching', 'Listing summaries', 'Buyer communication'] },
  { name: 'Finance', challenges: ['Slow onboarding', 'Repetitive document checks', 'Manual reporting'], opportunities: ['Client onboarding automation', 'Compliance workflows', 'Data handling'], ai: ['Document extraction', 'Risk summaries', 'Workflow triage'] },
  { name: 'Retail & E-commerce', challenges: ['Order processing', 'Customer support volume', 'Inventory coordination'], opportunities: ['Order automation', 'Support workflows', 'Marketing follow-up'], ai: ['Product recommendations', 'Intent analysis', 'Support routing'] },
  { name: 'Professional Services', challenges: ['Proposal work', 'Client response delays', 'Admin overhead'], opportunities: ['Pipeline automation', 'Client onboarding', 'Delivery tracking'], ai: ['Draft responses', 'Document creation', 'Insight generation'] },
  { name: 'Manufacturing', challenges: ['Procurement delays', 'Inventory coordination', 'Quality checks'], opportunities: ['Vendor workflows', 'Inventory operations', 'Maintenance tracking'], ai: ['Quality analysis', 'Exception routing', 'Demand forecasting'] },
  { name: 'Logistics', challenges: ['Manual dispatch', 'Tracking updates', 'Operational handoffs'], opportunities: ['Dispatch automation', 'Status notifications', 'Warehouse coordination'], ai: ['Route optimization', 'Exception handling', 'Demand insights'] },
  { name: 'Hospitality', challenges: ['Guest inquiries', 'Booking admin', 'Service coordination'], opportunities: ['Guest communication', 'Reservation workflows', 'Operations support'], ai: ['Response drafting', 'Guest service assistants', 'Booking summaries'] },
  { name: 'Legal', challenges: ['Document review', 'Client intake', 'Workflow tracking'], opportunities: ['Intake automation', 'Matter coordination', 'Document prep'], ai: ['Summary drafting', 'Case review support', 'Knowledge search'] },
  { name: 'Marketing & Agencies', challenges: ['Manual reporting', 'Campaign ops', 'Client delivery'], opportunities: ['Campaign automation', 'Reporting workflows', 'Lead nurture ops'], ai: ['Content support', 'Customer insights', 'Performance summaries'] },
  { name: 'Small & Medium Businesses', challenges: ['Limited capacity', 'Disconnected tasks', 'Operational drag'], opportunities: ['Process automation', 'Internal support', 'AI-powered tools'], ai: ['Team assistants', 'Communication support', 'Operational analytics'] },
]

export const outcomeItems = [
  'Less Manual Work',
  'Faster Operations',
  'Better Customer Experience',
  'Connected Processes',
  'Smarter Decisions',
  'Scalable Workflows',
]

export const howItWorks = [
  { step: '01', title: 'Understand', description: 'We review the work, the bottlenecks, and the business goals.' },
  { step: '02', title: 'Design', description: 'We map the process, define the rules, and shape the architecture.' },
  { step: '03', title: 'Build', description: 'We implement the automation, connect the tools, and validate the flow.' },
  { step: '04', title: 'Improve', description: 'We monitor the system, refine the logic, and scale what works.' },
]

export const whyList = [
  'Business-first approach',
  'Custom solutions',
  'Practical AI',
  'Integration with existing tools',
  'Scalable architecture',
  'Human-centered workflows',
]

export const principles = [
  'Business First',
  'Practical Over Hype',
  'Build With Purpose',
  'Keep Systems Simple',
  'Design for Scale',
  'Measure Real Outcomes',
]

export const roleOptions = [
  'AI Engineer',
  'Automation Engineer',
  'Software Engineer',
  'AI/ML Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Business Automation Specialist',
  'Product/UX Designer',
]

export const industryOptions = [
  'Healthcare',
  'Education',
  'Real Estate',
  'Finance',
  'Retail / E-commerce',
  'Manufacturing',
  'Logistics',
  'Hospitality',
  'Professional Services',
  'Legal',
  'Marketing / Agency',
  'Technology',
  'Other',
]

export const needOptions = [
  'AI Automation',
  'Agentic AI',
  'AI Agent',
  'Workflow Automation',
  'Business Process Automation',
  'AI Integration',
  'Custom Software',
  'Other',
]
