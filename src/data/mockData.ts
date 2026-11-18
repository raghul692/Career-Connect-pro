import {
  Job,
  Company,
  Contest,
  InterviewQuestion,
  Article,
  Application,
  UserProfile,
  Organization,
  TeamMember,
  AuditLogEntry,
  Invoice,
  UsageMeter,
  ApiKey,
  WebhookEndpoint,
  IntegrationApp,
  CaseStudy,
  NotificationItem,
  CandidateImportBatch,
  ExportQueueJob,
  DomainVerificationRecord,
  IpAllowlistRule,
  DataRetentionPolicy,
  SuperAdminTenant,
  SystemBroadcastMessage,
  AiScreeningUsage,
  HiringWorkflow,
  WhiteLabelSettings,
  ProformaQuote
} from '../types'

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'tech-mahindra',
    name: 'Tech Mahindra',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&h=128&fit=crop&crop=faces',
    rating: 3.8,
    reviewCount: 48500,
    industry: 'IT Services & Consulting',
    type: 'Indian MNC',
    employeeCount: '150,000+',
    headquarters: 'Pune, Maharashtra',
    website: 'https://www.techmahindra.com',
    overview: 'Tech Mahindra provides innovative digital experiences and digital transformation services to global enterprise clients across 90+ countries.',
    openJobsCount: 42,
    benefits: ['Health Insurance', 'Hybrid Work', 'Gym & Recreation', 'Learning Subsidies', 'Performance Bonus'],
    ceoName: 'Mohit Joshi'
  },
  {
    id: 'persistent-systems',
    name: 'Persistent Systems',
    logo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=128&h=128&fit=crop&crop=faces',
    rating: 3.9,
    reviewCount: 5800,
    industry: 'Software Product Engineering',
    type: 'Indian MNC',
    employeeCount: '23,000+',
    headquarters: 'Pune, Maharashtra',
    website: 'https://www.persistent.com',
    overview: 'Persistent is a global leader in Digital Engineering and Enterprise Modernization, delivering mission-critical cloud native and data solutions.',
    openJobsCount: 28,
    benefits: ['ESOPs', 'Flexible Hours', 'Global Mobility', 'Parental Leave', 'Wellness Allowance'],
    ceoName: 'Sandeep Kalra'
  },
  {
    id: 'capgemini',
    name: 'Capgemini',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=128&h=128&fit=crop&crop=faces',
    rating: 3.7,
    reviewCount: 59900,
    industry: 'IT Consulting & Services',
    type: 'Foreign MNC',
    employeeCount: '350,000+',
    headquarters: 'Paris, France (India: Bengaluru, Mumbai)',
    website: 'https://www.capgemini.com',
    overview: 'Capgemini is a global leader in partnering with companies to transform and manage their business by harnessing the power of technology.',
    openJobsCount: 65,
    benefits: ['Comprehensive Medical', 'Cab Transport', 'Maternity/Paternity Care', 'Certification Sponsorship'],
    ceoName: 'Aiman Ezzat'
  },
  {
    id: 'infosys',
    name: 'Infosys',
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=128&h=128&fit=crop&crop=faces',
    rating: 3.6,
    reviewCount: 54200,
    industry: 'Next-Generation Digital Services',
    type: 'Indian MNC',
    employeeCount: '315,000+',
    headquarters: 'Bengaluru, Karnataka',
    website: 'https://www.infosys.com',
    overview: 'Infosys is a global leader in next-generation digital services and consulting. We enable clients in more than 56 countries to navigate their digital transformation.',
    openJobsCount: 88,
    benefits: ['Campus Facilities', 'Higher Education Sponsorship', 'Retirement Plans', 'Health Insurance'],
    ceoName: 'Salil Parekh'
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=128&h=128&fit=crop&crop=faces',
    rating: 4.3,
    reviewCount: 2400,
    industry: 'FinTech & Payments',
    type: 'Unicorn',
    employeeCount: '3,200+',
    headquarters: 'Bengaluru, Karnataka',
    website: 'https://razorpay.com',
    overview: 'Razorpay is the only payments solution in India that allows businesses to accept, process and disburse payments with its product suite.',
    openJobsCount: 19,
    benefits: ['Unlimited Sick Leave', 'Competitive ESOPs', 'WFH Setup Allowance', 'Mental Health Days'],
    ceoName: 'Harshil Mathur'
  },
  {
    id: 'zoho-corporation',
    name: 'Zoho Corporation',
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=128&h=128&fit=crop&crop=faces',
    rating: 4.4,
    reviewCount: 4200,
    industry: 'SaaS & Enterprise Cloud Software',
    type: 'Product',
    employeeCount: '15,000+',
    headquarters: 'Chennai, Tamil Nadu',
    website: 'https://www.zoho.com',
    overview: 'Zoho offers a uniquely comprehensive suite of business applications for enterprise CRM, mail, finance, HR, and collaboration.',
    openJobsCount: 34,
    benefits: ['Zero Micromanagement', 'Free Meals & Transport', 'Rural Tech Offices', 'Focus on Deep Craft'],
    ceoName: 'Sridhar Vembu'
  },
  {
    id: 'swiggy',
    name: 'Swiggy',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=128&h=128&fit=crop&crop=faces',
    rating: 4.1,
    reviewCount: 3800,
    industry: 'Consumer Tech & Quick Commerce',
    type: 'Unicorn',
    employeeCount: '6,000+',
    headquarters: 'Bengaluru, Karnataka',
    website: 'https://www.swiggy.com',
    overview: 'Swiggy is Indias premier on-demand convenience platform, connecting consumers to millions of restaurants, grocery stores, and local delivery.',
    openJobsCount: 24,
    benefits: ['Meal Credits', 'Pet-friendly policies', 'Hybrid Flexibility', 'Medical Insurance'],
    ceoName: 'Sriharsha Majety'
  },
  {
    id: 'google-india',
    name: 'Google India',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=128&h=128&fit=crop&crop=faces',
    rating: 4.6,
    reviewCount: 12400,
    industry: 'Internet & Cloud Technology',
    type: 'Foreign MNC',
    employeeCount: '180,000+',
    headquarters: 'Mountain View, CA (India: Bengaluru, Hyderabad)',
    website: 'https://careers.google.com',
    overview: 'Googles mission is to organize the worlds information and make it universally accessible and useful through search, YouTube, Android, and Cloud.',
    openJobsCount: 15,
    benefits: ['World-class Campus & Meals', 'Comprehensive Wellness', 'Stock Grants (GSUs)', 'Generous Leave'],
    ceoName: 'Sundar Pichai'
  }
]

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-101',
    title: 'Graduate Trainee Engineer (2025/2026 Batch)',
    company: 'Tech Mahindra',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&h=128&fit=crop&crop=faces',
    rating: 3.8,
    reviewCount: 48500,
    experience: '0-1 Yrs',
    minExp: 0,
    maxExp: 1,
    salary: '₹4.25 - ₹5.50 LPA',
    minSalaryLakhs: 4.25,
    maxSalaryLakhs: 5.5,
    location: 'Chennai, Bengaluru, Hyderabad, Pune',
    workMode: 'Hybrid',
    department: 'Software & QA',
    companyType: 'Indian MNC',
    postedDaysAgo: 1,
    description: 'We are hiring fresh engineering graduates for our Elite Digital Fast-Track program. You will be trained in cutting-edge Cloud native development, Java Spring Boot, React, and DevOps before working on global enterprise projects.',
    responsibilities: [
      'Undergo intensive 12-week training on full-stack web architectures and containerization.',
      'Collaborate with senior software architects to build microservices and REST APIs.',
      'Write clean, testable unit test suites using Jest, JUnit, and mock frameworks.',
      'Participate in agile daily stand-ups, code reviews, and sprint retrospectives.'
    ],
    mandatorySkills: ['Java or Python', 'Data Structures & Algorithms', 'Basic SQL', 'Object-Oriented Programming'],
    secondarySkills: ['Git', 'HTML/CSS', 'Linux fundamentals'],
    openings: 120,
    applicants: 420,
    education: 'B.Tech / B.E. in CS / IT / ECE (Minimum 65% aggregate)',
    urgentHiring: true,
    featured: true,
    verifiedRecruiter: true
  },
  {
    id: 'job-102',
    title: 'Frontend Developer - React & TypeScript',
    company: 'Razorpay',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=128&h=128&fit=crop&crop=faces',
    rating: 4.3,
    reviewCount: 2400,
    experience: '0-2 Yrs',
    minExp: 0,
    maxExp: 2,
    salary: '₹14.00 - ₹20.00 LPA',
    minSalaryLakhs: 14,
    maxSalaryLakhs: 20,
    location: 'Bengaluru (Koramangala)',
    workMode: 'Hybrid',
    department: 'Software & QA',
    companyType: 'Unicorn',
    postedDaysAgo: 2,
    description: 'Razorpay is searching for ambitious Frontend Engineers who care deeply about interface craft, performance optimization, and seamless payment checkout experiences used by millions of shoppers daily.',
    responsibilities: [
      'Architect and build fluid user interfaces with React, Next.js, and TypeScript.',
      'Optimize Core Web Vitals (LCP, INP, CLS) to achieve sub-second load times across low-bandwidth 4G networks.',
      'Build reusable, accessible UI component primitives following WCAG 2.2 AA accessibility standards.',
      'Instrument telemetry, error boundaries, and synthetic user journeys using PostHog and Datadog.'
    ],
    mandatorySkills: ['React.js', 'TypeScript', 'Tailwind CSS', 'State Management (Zustand/Redux)'],
    secondarySkills: ['Next.js', 'Web Performance Optimization', 'Testing Library'],
    openings: 4,
    applicants: 198,
    education: 'B.Tech / B.E. / BCA / MCA / BS in Computer Science',
    urgentHiring: true,
    featured: true,
    verifiedRecruiter: true
  },
  {
    id: 'job-103',
    title: 'Associate Cloud Support Engineer',
    company: 'Persistent Systems',
    companyLogo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=128&h=128&fit=crop&crop=faces',
    rating: 3.9,
    reviewCount: 5800,
    experience: '0-2 Yrs',
    minExp: 0,
    maxExp: 2,
    salary: '₹6.00 - ₹8.50 LPA',
    minSalaryLakhs: 6,
    maxSalaryLakhs: 8.5,
    location: 'Pune, Nagpur, Goa',
    workMode: 'Work from office',
    department: 'Hardware & Networks',
    companyType: 'Indian MNC',
    postedDaysAgo: 3,
    description: 'Join our Cloud & Infrastructure Center of Excellence. You will monitor, diagnose, and resolve multi-cloud infrastructure incidents across AWS, Microsoft Azure, and Kubernetes platforms.',
    responsibilities: [
      'Monitor production cloud clusters, VPC peering, and serverless architectures.',
      'Troubleshoot network latencies, DNS propagation, SSL handshakes, and firewall security groups.',
      'Automate common operational runbooks using Python, Bash, and Terraform.',
      'Collaborate with 24x7 global incident commanders to maintain 99.99% service availability.'
    ],
    mandatorySkills: ['AWS or Azure Fundamentals', 'Linux Command Line', 'Networking (DNS, TCP/IP, OSI)', 'Bash Scripting'],
    secondarySkills: ['Docker', 'Terraform', 'Prometheus / Grafana'],
    openings: 18,
    applicants: 145,
    education: 'B.E. / B.Tech (Any stream) or B.Sc IT',
    urgentHiring: false,
    featured: false,
    verifiedRecruiter: true
  },
  {
    id: 'job-104',
    title: 'Software Developer (Full Stack - Fresher)',
    company: 'Zoho Corporation',
    companyLogo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=128&h=128&fit=crop&crop=faces',
    rating: 4.4,
    reviewCount: 4200,
    experience: '0 Yrs (Freshers)',
    minExp: 0,
    maxExp: 0,
    salary: '₹6.50 - ₹10.00 LPA',
    minSalaryLakhs: 6.5,
    maxSalaryLakhs: 10,
    location: 'Chennai, Tenkasi, Salem, Coimbatore',
    workMode: 'Work from office',
    department: 'Software & QA',
    companyType: 'Product',
    postedDaysAgo: 1,
    description: 'Zoho is looking for passionate problem solvers and software engineers who love building core systems from the ground up without relying heavily on third-party frameworks. Deep curiosity about algorithms and system design is prized over marks.',
    responsibilities: [
      'Design and code backend modules in Java or C++ handling high-concurrency requests.',
      'Write optimized database queries and schema designs with PostgreSQL and distributed caches.',
      'Craft responsive browser interfaces using modern DOM APIs and custom web components.',
      'Contribute to in-house compilers, storage engines, and enterprise SaaS productivity tools.'
    ],
    mandatorySkills: ['Problem Solving', 'Data Structures (Trees, Graphs, HashMaps)', 'Java or C++ or Python'],
    secondarySkills: ['SQL', 'JavaScript / DOM', 'System Architecture'],
    openings: 50,
    applicants: 890,
    education: 'Any Degree / Self-taught developers welcome (No minimum percentage required)',
    urgentHiring: true,
    featured: true,
    verifiedRecruiter: true
  },
  {
    id: 'job-105',
    title: 'Remote Junior React / Node.js Developer',
    company: 'Swiggy',
    companyLogo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=128&h=128&fit=crop&crop=faces',
    rating: 4.1,
    reviewCount: 3800,
    experience: '1-3 Yrs',
    minExp: 1,
    maxExp: 3,
    salary: '₹12.00 - ₹18.00 LPA',
    minSalaryLakhs: 12,
    maxSalaryLakhs: 18,
    location: 'Remote (Anywhere in India)',
    workMode: 'Remote',
    department: 'Software & QA',
    companyType: 'Unicorn',
    postedDaysAgo: 4,
    description: 'Swiggy is expanding our merchant tools engineering team. In this fully remote position, you will build self-serve analytics, order tracking dashboards, and menu management portals for over 300,000 restaurant partners.',
    responsibilities: [
      'Build performant, reactive web applications with React, TypeScript, and Tailwind CSS.',
      'Implement GraphQL and RESTful microservices in Node.js / Express or NestJS.',
      'Integrate real-time WebSocket notifications for instant incoming order processing.',
      'Conduct automated end-to-end testing with Playwright and Jest.'
    ],
    mandatorySkills: ['React', 'Node.js', 'TypeScript', 'REST APIs', 'PostgreSQL / MongoDB'],
    secondarySkills: ['GraphQL', 'Redis', 'Docker', 'AWS'],
    openings: 6,
    applicants: 312,
    education: 'B.Tech / B.E. / BCA / MCA or equivalent practical experience',
    urgentHiring: false,
    featured: true,
    verifiedRecruiter: true
  },
  {
    id: 'job-106',
    title: 'Data Analyst - Business Intelligence',
    company: 'Capgemini',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=128&h=128&fit=crop&crop=faces',
    rating: 3.7,
    reviewCount: 59900,
    experience: '0-2 Yrs',
    minExp: 0,
    maxExp: 2,
    salary: '₹5.50 - ₹7.80 LPA',
    minSalaryLakhs: 5.5,
    maxSalaryLakhs: 7.8,
    location: 'Mumbai, Gurugram, Bengaluru, Kolkata',
    workMode: 'Hybrid',
    department: 'Analytics & Data Science',
    companyType: 'Foreign MNC',
    postedDaysAgo: 5,
    description: 'We are seeking curious, numbers-driven Data Analysts to translate raw corporate transaction feeds into actionable executive dashboards and predictive retention models.',
    responsibilities: [
      'Extract, transform, and clean large relational datasets using SQL and Python pandas.',
      'Develop interactive Power BI and Tableau dashboards with dynamic drill-downs.',
      'Perform exploratory statistical data analysis to identify customer drop-off patterns.',
      'Present findings in concise executive briefs to business leaders.'
    ],
    mandatorySkills: ['SQL (Window functions, joins)', 'Power BI or Tableau', 'Excel (Pivot, VLOOKUP, PowerQuery)'],
    secondarySkills: ['Python (Pandas, Matplotlib)', 'Statistics', 'Alteryx'],
    openings: 15,
    applicants: 230,
    education: 'B.Com / B.Sc Stats / B.Tech / BCA / MBA Analytics',
    urgentHiring: false,
    featured: false,
    verifiedRecruiter: true
  },
  {
    id: 'job-107',
    title: 'Associate Security Analyst (SOC Level 1)',
    company: 'Infosys',
    companyLogo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=128&h=128&fit=crop&crop=faces',
    rating: 3.6,
    reviewCount: 54200,
    experience: '0-2 Yrs',
    minExp: 0,
    maxExp: 2,
    salary: '₹5.00 - ₹7.20 LPA',
    minSalaryLakhs: 5,
    maxSalaryLakhs: 7.2,
    location: 'Mysore, Bengaluru, Pune',
    workMode: 'Work from office',
    department: 'IT & Information Security',
    companyType: 'Indian MNC',
    postedDaysAgo: 2,
    description: 'Infosys Cyber Security practice is looking for early-career cybersecurity defenders for our 24/7 Global Security Operations Center (SOC).',
    responsibilities: [
      'Monitor and triage real-time alerts from SIEM platforms (Splunk, Microsoft Sentinel).',
      'Analyze phishing attempts, suspicious binaries, and unauthorized port scan traffic.',
      'Follow standard incident response playbooks to isolate affected endpoints.',
      'Document security incident reports with root cause analysis and IOCs (Indicators of Compromise).'
    ],
    mandatorySkills: ['Networking Fundamentals', 'Cybersecurity Basics', 'SIEM Concepts', 'Windows & Linux Internals'],
    secondarySkills: ['Wireshark', 'Splunk', 'CompTIA Security+ / CEH'],
    openings: 22,
    applicants: 180,
    education: 'B.Tech / B.E. / B.Sc in Computer Science or Cyber Security',
    urgentHiring: true,
    featured: false,
    verifiedRecruiter: true
  },
  {
    id: 'job-108',
    title: 'Software Engineer - AI & Platform Tooling',
    company: 'Google India',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=128&h=128&fit=crop&crop=faces',
    rating: 4.6,
    reviewCount: 12400,
    experience: '1-3 Yrs',
    minExp: 1,
    maxExp: 3,
    salary: '₹28.00 - ₹42.00 LPA',
    minSalaryLakhs: 28,
    maxSalaryLakhs: 42,
    location: 'Bengaluru, Hyderabad',
    workMode: 'Hybrid',
    department: 'Software & QA',
    companyType: 'Foreign MNC',
    postedDaysAgo: 1,
    description: 'Join Googles Core Developer Platform engineering organization. You will build developer SDKs, compiler optimizations, and automated evaluation infrastructure for LLM-powered enterprise applications.',
    responsibilities: [
      'Write highly maintainable, testable software in Go, C++, or TypeScript.',
      'Design low-latency distributed APIs handling billions of queries per day.',
      'Partner with research scientists to productionize cutting-edge multimodal intelligence models.',
      'Participate in architecture reviews and mentor early-career engineering interns.'
    ],
    mandatorySkills: ['Data Structures & Algorithms', 'C++ or Go or Java', 'Distributed Systems Basics', 'System Design'],
    secondarySkills: ['Kubernetes', 'gRPC', 'Protobuf', 'GCP'],
    openings: 5,
    applicants: 740,
    education: 'Bachelor or Master of Science in Computer Science or equivalent',
    urgentHiring: false,
    featured: true,
    verifiedRecruiter: true
  }
]

export const INITIAL_CONTESTS: Contest[] = [
  {
    id: 'contest-1',
    title: 'Sigmoid Data & AI National Hiring Challenge 2026',
    organizer: 'Sigmoid Analytics',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&h=128&fit=crop&crop=faces',
    entryDeadline: '15 Nov 2026',
    prize: '₹3,50,000 + Direct FTE & Internship Job Offers',
    enrolledCount: 1240,
    tags: ['Data Science', 'Machine Learning', 'Python', 'SQL'],
    type: 'Hiring Challenge',
    eligibility: '2024, 2025, 2026 graduating batch (All streams)'
  },
  {
    id: 'contest-2',
    title: 'CodeConnect Hackathon: Next-Gen Web3 & AI',
    organizer: 'Career Connect Pro x AWS',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=128&h=128&fit=crop&crop=faces',
    entryDeadline: '22 Nov 2026',
    prize: '₹5,00,000 + Cloud Credits + Founder Mentorship',
    enrolledCount: 2850,
    tags: ['Full Stack', 'AI / GenAI', 'Cloud', 'React'],
    type: 'Hackathon',
    eligibility: 'Open to all college students & developers'
  },
  {
    id: 'contest-3',
    title: 'NCAT: National Career Aptitude & Coding Assessment',
    organizer: 'Naukri Campus Partner Network',
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=128&h=128&fit=crop&crop=faces',
    entryDeadline: '30 Nov 2026',
    prize: 'Top 500 Scores shared directly with 250+ Hiring Partners',
    enrolledCount: 8400,
    tags: ['Aptitude', 'Logical Reasoning', 'Verbal', 'DSA'],
    type: 'Aptitude Test',
    eligibility: 'All college students (B.Tech, B.Sc, BCA, MCA, MBA)'
  }
]

export const INITIAL_INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'q-1',
    company: 'Amazon',
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=128&h=128&fit=crop&crop=faces',
    role: 'Software Development Engineer 1 (SDE 1)',
    difficulty: 'Medium',
    category: 'Coding',
    question: 'Given an array of integers representing stock prices, find the maximum profit you can make with at most two transactions.',
    answerSnippet: 'We can solve this using dynamic programming with state variables tracking buy and sell states for transaction 1 and transaction 2 in O(N) time and O(1) space.',
    votes: 428,
    timesAsked: 194
  },
  {
    id: 'q-2',
    company: 'Tech Mahindra',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&h=128&fit=crop&crop=faces',
    role: 'Graduate Trainee / Java Developer',
    difficulty: 'Easy',
    category: 'Coding',
    question: 'Explain the difference between HashMap and ConcurrentHashMap in Java. What happens during rehashing?',
    answerSnippet: 'HashMap is unsynchronized and allows one null key. ConcurrentHashMap uses lock striping / synchronized blocks at the bucket level (Java 8 CAS + synchronized) to allow concurrent reads and writes safely.',
    votes: 312,
    timesAsked: 340
  },
  {
    id: 'q-3',
    company: 'Google',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=128&h=128&fit=crop&crop=faces',
    role: 'Frontend Software Engineer',
    difficulty: 'Hard',
    category: 'Coding',
    question: 'How does React 19 Fiber reconciliation work, and how does the browser event loop coordinate microtasks vs macrotasks during UI repaints?',
    answerSnippet: 'Fiber breaks rendering work into incremental chunks that can be yielded via MessageChannel / scheduler.yield. Promise resolutions run in microtasks before the next macrotask, allowing React to flush high-priority updates before frame render.',
    votes: 589,
    timesAsked: 160
  },
  {
    id: 'q-4',
    company: 'Infosys',
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=128&h=128&fit=crop&crop=faces',
    role: 'Systems Engineer',
    difficulty: 'Easy',
    category: 'HR / Behavioral',
    question: 'Tell me about a challenging project in your college curriculum where requirements changed unexpectedly. How did you handle it?',
    answerSnippet: 'Structure your response using the STAR method (Situation, Task, Action, Result). Highlight communication with your project guide, team task re-allocation, and on-time delivery.',
    votes: 245,
    timesAsked: 520
  }
]

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'How to Crack Campus Placements in 2026: The Complete 6-Month Roadmap',
    category: 'Placement Strategy',
    readTime: '6 min read',
    publishedDate: '28 Oct 2026',
    summary: 'A step-by-step master plan covering aptitude tests, core data structures, portfolio project building, and HR round etiquette for college students.',
    author: 'Priya Sharma',
    authorRole: 'Head of Campus Relations @ Career Connect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces',
    tags: ['Campus Placement', 'Freshers', 'Resume Tips', 'Roadmap'],
    content: [
      'Campus placement season is one of the most defining milestones in a student journey. With tech companies focusing heavily on problem-solving ability over pure rote learning, preparation needs to be targeted and systematic.',
      'Phase 1 (Months 1-2): Master one programming language (Java, C++, or Python) deeply. Solve at least 150 LeetCode problems focusing on Arrays, Strings, HashMaps, and Two-Pointers.',
      'Phase 2 (Months 3-4): Build two production-grade vertical slice projects. Avoid simple clones — build applications that feature authentication, database persistence, and deployed live links.',
      'Phase 3 (Months 5-6): Daily aptitude practice (Speed Math, Syllogisms, Reading Comprehension) alongside mock behavioral interviews using the STAR framework.'
    ]
  },
  {
    id: 'art-2',
    title: 'Top 10 Resume Mistakes That Get Rejected by Company ATS Parsers',
    category: 'Resume & Career',
    readTime: '5 min read',
    publishedDate: '15 Oct 2026',
    summary: 'Learn why multi-column tables, fancy infographics, and missing keyword density cause 70% of resumes to never reach a human recruiters desk.',
    author: 'Arun Natarajan',
    authorRole: 'Senior Technical Recruiter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=faces',
    tags: ['ATS Resume', 'Job Search', 'Career Growth'],
    content: [
      'Applicant Tracking Systems (ATS) read resumes linearly from top to bottom. Fancy double-column Canva templates frequently scramble your education with your project details.',
      'Rule 1: Always submit in single-column PDF format with standard headings (Experience, Education, Skills, Projects).',
      'Rule 2: Quantify results using metrics: instead of "Developed frontend", write "Engineered responsive dashboard using React and Tailwind, reducing page load latency by 35% across 10k monthly users".',
      'Rule 3: Ensure exact skill keyword matches found directly in the job description.'
    ]
  },
  {
    id: 'art-3',
    title: 'Understanding Salary Compensation in India: CTC vs In-Hand Salary Explained',
    category: 'Salary & Compensation',
    readTime: '7 min read',
    publishedDate: '02 Oct 2026',
    summary: 'Demystifying Basic Salary, HRA, Provident Fund (PF), Gratuity, Performance Bonuses, and ESOP vesting schedules for first-time job offer recipients.',
    author: 'Vikram Sethi',
    authorRole: 'Compensation & Benefits Consultant',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=faces',
    tags: ['CTC', 'Salary Calculator', 'Freshers Guide'],
    content: [
      'When you receive a campus placement offer stating ₹8 LPA CTC, your monthly bank credit will not be ₹8,00,000 divided by 12. Understanding deductions is essential.',
      'CTC (Cost to Company) includes both employer and employee contributions to Provident Fund (12% of basic), professional tax, annual performance bonuses, and group insurance premiums.',
      'Always calculate your net monthly in-hand take-home pay before committing to relocation and accommodation plans.'
    ]
  }
]

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Karthik Subramanian',
  email: 'karthik.subramanian@college.edu',
  phone: '+91 98765 43210',
  location: 'Chennai, Tamil Nadu, India',
  headline: 'Aspiring Full Stack Engineer | React, TypeScript & Node.js | Class of 2026',
  bio: 'Computer Science undergraduate passionate about building accessible, high-performance web applications. Open to full-time Graduate Trainee roles and software internships.',
  experienceLevel: 'Fresher',
  skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Git & GitHub', 'REST APIs', 'Java Basics'],
  education: [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      college: 'Anna University Campus, Chennai',
      year: '2022 - 2026 (Final Year)',
      grade: '8.7 CGPA'
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      college: 'Kendriya Vidyalaya, Chennai',
      year: '2022',
      grade: '94.2%'
    }
  ],
  projects: [
    {
      title: 'DevPulse — Developer Performance & GitHub Insights Platform',
      description: 'Built a full-stack developer analytics platform that tracks commit velocities, pull request reviews, and automated code health metrics.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'GitHub REST API'],
      githubUrl: 'https://github.com/karthik/devpulse',
      liveUrl: 'https://devpulse.preview.app'
    },
    {
      title: 'CampusCart — College Student Marketplace & Peer Sharing',
      description: 'Engineered an on-campus marketplace for buying, selling, and renting engineering textbooks, calculators, and lab equipment.',
      techStack: ['React', 'Vite', 'Firebase Auth', 'Cloud Firestore', 'Tailwind'],
      githubUrl: 'https://github.com/karthik/campuscart'
    }
  ],
  resumeName: 'Karthik_Subramanian_Resume_2026.pdf',
  profileCompletion: 85
}

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    jobId: 'job-101',
    jobTitle: 'Graduate Trainee Engineer (2025/2026 Batch)',
    company: 'Tech Mahindra',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&h=128&fit=crop&crop=faces',
    appliedDate: '28 Oct 2026',
    status: 'Shortlisted',
    location: 'Chennai, Bengaluru',
    salary: '₹4.25 - ₹5.50 LPA'
  },
  {
    id: 'app-2',
    jobId: 'job-102',
    jobTitle: 'Frontend Developer - React & TypeScript',
    company: 'Razorpay',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=128&h=128&fit=crop&crop=faces',
    appliedDate: '30 Oct 2026',
    status: 'Reviewing',
    location: 'Bengaluru (Koramangala)',
    salary: '₹14.00 - ₹20.00 LPA'
  },
  {
    id: 'app-3',
    jobId: 'job-104',
    jobTitle: 'Software Developer (Full Stack - Fresher)',
    company: 'Zoho Corporation',
    companyLogo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=128&h=128&fit=crop&crop=faces',
    appliedDate: '31 Oct 2026',
    status: 'Applied',
    location: 'Chennai, Tenkasi',
    salary: '₹6.50 - ₹10.00 LPA'
  }
]

// ==========================================
// ENTERPRISE SAAS MOCK DATA
// ==========================================

export const INITIAL_ORGANIZATIONS: Organization[] = [
  {
    id: 'org-techm',
    name: 'Tech Mahindra Campus Group',
    slug: 'tech-mahindra-campus',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&h=128&fit=crop&crop=faces',
    domain: 'techmahindra.com',
    plan: 'Enterprise',
    seatsUsed: 14,
    seatsMax: 50,
    createdAt: 'Jan 2025',
    verified: true
  },
  {
    id: 'org-razorpay',
    name: 'Razorpay Engineering & Talent',
    slug: 'razorpay-engineering',
    logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=128&h=128&fit=crop&crop=faces',
    domain: 'razorpay.com',
    plan: 'Pro',
    seatsUsed: 8,
    seatsMax: 20,
    createdAt: 'Mar 2025',
    verified: true
  }
]

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Priya Narayanan',
    email: 'priya.narayanan@techmahindra.com',
    role: 'Owner',
    twoFactorEnabled: true,
    lastActive: '5 mins ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=faces',
    status: 'active'
  },
  {
    id: 'tm-2',
    name: 'Vikram Joshi',
    email: 'vikram.j@techmahindra.com',
    role: 'Admin',
    twoFactorEnabled: true,
    lastActive: '1 hour ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=faces',
    status: 'active'
  },
  {
    id: 'tm-3',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@techmahindra.com',
    role: 'Recruiter',
    twoFactorEnabled: true,
    lastActive: '3 hours ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=faces',
    status: 'active'
  },
  {
    id: 'tm-4',
    name: 'Rohan Mehra',
    email: 'rohan.mehra@techmahindra.com',
    role: 'Hiring Manager',
    twoFactorEnabled: false,
    lastActive: '1 day ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=faces',
    status: 'active'
  },
  {
    id: 'tm-5',
    name: 'Divya Krishnan',
    email: 'divya.k@techmahindra.com',
    role: 'Billing Viewer',
    twoFactorEnabled: true,
    lastActive: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=128&h=128&fit=crop&crop=faces',
    status: 'active'
  },
  {
    id: 'tm-6',
    name: 'Arjun Verma',
    email: 'arjun.verma@techmahindra.com',
    role: 'Recruiter',
    twoFactorEnabled: false,
    lastActive: 'Invite Sent',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=128&h=128&fit=crop&crop=faces',
    status: 'invited'
  }
]

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-1',
    timestamp: '2026-11-01 19:45:12',
    actorName: 'Priya Narayanan',
    actorEmail: 'priya.narayanan@techmahindra.com',
    action: 'role.permission_changed',
    ipAddress: '103.21.244.18',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    severity: 'medium',
    details: 'Changed Hiring Manager role permissions: granted candidates.export capability'
  },
  {
    id: 'aud-2',
    timestamp: '2026-11-01 17:12:05',
    actorName: 'Vikram Joshi',
    actorEmail: 'vikram.j@techmahindra.com',
    action: 'api_key.created',
    ipAddress: '49.207.185.92',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    severity: 'high',
    details: 'Generated new live secret key "Greenhouse ATS Webhook Sync" (prefix: sk_live_7x...)'
  },
  {
    id: 'aud-3',
    timestamp: '2026-11-01 14:02:44',
    actorName: 'Ananya Sharma',
    actorEmail: 'ananya.sharma@techmahindra.com',
    action: 'candidate.status_updated',
    ipAddress: '103.21.244.18',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    severity: 'low',
    details: 'Moved candidate Karthik Subramanian from Applied to Shortlisted for Graduate Trainee Engineer'
  },
  {
    id: 'aud-4',
    timestamp: '2026-10-31 11:28:30',
    actorName: 'Vikram Joshi',
    actorEmail: 'vikram.j@techmahindra.com',
    action: 'user.invited',
    ipAddress: '49.207.185.92',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    severity: 'low',
    details: 'Sent organization invite token to arjun.verma@techmahindra.com with role Recruiter'
  },
  {
    id: 'aud-5',
    timestamp: '2026-10-30 09:15:10',
    actorName: 'System Security Guard',
    actorEmail: 'security@careerconnectpro.com',
    action: 'auth.mfa_enforced',
    ipAddress: '127.0.0.1',
    userAgent: 'Cloudflare Worker / SecOps Engine',
    severity: 'critical',
    details: 'Enforced organization-wide mandatory 2FA enrollment policy for all 14 team accounts'
  }
]

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-1004',
    invoiceNumber: 'CCP-2026-1004',
    date: '01 Nov 2026',
    amount: '₹49,999',
    currency: 'INR',
    status: 'Paid',
    planName: 'Enterprise Campus Suite (Annual)',
    pdfUrl: '#'
  },
  {
    id: 'inv-1003',
    invoiceNumber: 'CCP-2026-1003',
    date: '01 Oct 2026',
    amount: '₹49,999',
    currency: 'INR',
    status: 'Paid',
    planName: 'Enterprise Campus Suite (Annual)',
    pdfUrl: '#'
  },
  {
    id: 'inv-1002',
    invoiceNumber: 'CCP-2026-1002',
    date: '01 Sep 2026',
    amount: '₹4,999',
    currency: 'INR',
    status: 'Paid',
    planName: 'Pro Recruiter Tier',
    pdfUrl: '#'
  }
]

export const INITIAL_USAGE_METERS: UsageMeter[] = [
  {
    id: 'meter-jobs',
    name: 'Active Enterprise Job Slots',
    current: 7,
    max: 10,
    unit: 'openings live',
    warningThreshold: 80
  },
  {
    id: 'meter-resumes',
    name: 'Monthly Resume Unlock Credits',
    current: 840,
    max: 1000,
    unit: 'candidates contacted',
    warningThreshold: 85
  },
  {
    id: 'meter-ats',
    name: 'AI ATS Automated Diagnostic Scans',
    current: 42,
    max: 50,
    unit: 'batch scans',
    warningThreshold: 75
  },
  {
    id: 'meter-api',
    name: 'Developer API Requests (This Month)',
    current: 48200,
    max: 100000,
    unit: 'calls executed',
    warningThreshold: 90
  }
]

export const INITIAL_API_KEYS: ApiKey[] = [
  {
    id: 'key-1',
    name: 'Production Greenhouse ATS Webhook Sync',
    prefix: 'sk_live_7x9...',
    maskedKey: 'sk_live_7x94********************89ef',
    createdAt: '12 Oct 2026',
    lastUsed: '4 mins ago',
    scope: 'Full Access',
    status: 'active'
  },
  {
    id: 'key-2',
    name: 'Campus Placement Drive Testing (Staging)',
    prefix: 'sk_test_3b2...',
    maskedKey: 'sk_test_3b21********************44c1',
    createdAt: '24 Oct 2026',
    lastUsed: '1 hour ago',
    scope: 'Jobs & Candidates',
    status: 'active'
  }
]

export const INITIAL_WEBHOOKS: WebhookEndpoint[] = [
  {
    id: 'wh-1',
    url: 'https://api.techmahindra.com/webhooks/campus-hires',
    events: ['candidate.applied', 'candidate.shortlisted', 'ncat.test_completed'],
    status: 'Active',
    signingSecret: 'whsec_99a8b7c6d5e4f3a2b1c0d9e8f7',
    lastDeliveryStatus: 200,
    lastDeliveryTime: '2 mins ago'
  },
  {
    id: 'wh-2',
    url: 'https://hooks.slack.com/services/T00/B00/X99Z',
    events: ['job.published', 'application.status_changed'],
    status: 'Active',
    signingSecret: 'whsec_slack_channel_notifications_key',
    lastDeliveryStatus: 200,
    lastDeliveryTime: '15 mins ago'
  }
]

export const INITIAL_INTEGRATIONS: IntegrationApp[] = [
  {
    id: 'int-slack',
    name: 'Slack',
    slug: 'slack',
    category: 'Communication',
    description: 'Instant candidate alerts, hiring team mentions, and scorecard notifications in your Slack channels.',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&h=128&fit=crop',
    connected: true,
    featured: true,
    rating: 4.8,
    reviewsCount: 420
  },
  {
    id: 'int-github',
    name: 'GitHub',
    slug: 'github',
    category: 'Sourcing',
    description: 'Inspect engineer code commits, popular open-source repositories, and verified pull request velocity.',
    logo: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=128&h=128&fit=crop',
    connected: true,
    featured: true,
    rating: 4.9,
    reviewsCount: 880
  },
  {
    id: 'int-workday',
    name: 'Workday HRIS',
    slug: 'workday',
    category: 'HRIS',
    description: 'Bi-directional employee record sync and automated job requisition posting to Workday HCM.',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=128&h=128&fit=crop',
    connected: false,
    featured: true,
    rating: 4.6,
    reviewsCount: 230
  },
  {
    id: 'int-greenhouse',
    name: 'Greenhouse ATS',
    slug: 'greenhouse',
    category: 'ATS',
    description: 'Sync campus candidate resumes, interview stages, and recruiter feedback into Greenhouse.',
    logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=128&h=128&fit=crop',
    connected: true,
    featured: true,
    rating: 4.7,
    reviewsCount: 310
  },
  {
    id: 'int-stripe',
    name: 'Stripe Billing',
    slug: 'stripe',
    category: 'Productivity',
    description: 'Automate subscription invoices, tax receipts, and enterprise purchasing cards securely.',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=128&h=128&fit=crop',
    connected: true,
    rating: 4.9,
    reviewsCount: 950
  },
  {
    id: 'int-zoom',
    name: 'Zoom Interviews',
    slug: 'zoom',
    category: 'Communication',
    description: 'Schedule automated video interview rooms with candidate calendar invites and waiting room locks.',
    logo: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=128&h=128&fit=crop',
    connected: false,
    rating: 4.5,
    reviewsCount: 190
  }
]

export const INITIAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-techm',
    company: 'Tech Mahindra',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&h=128&fit=crop&crop=faces',
    headline: 'How Tech Mahindra hired 1,200+ fresh engineers in 60 days using Career Connect Pro NCAT Assessments',
    metrics: [
      { stat: '68%', label: 'Reduction in Time-to-Offer' },
      { stat: '1,240', label: 'Verified Campus Engineers Hired' },
      { stat: '4.2x', label: 'Higher Interview Attendance Rate' }
    ],
    quote: 'Career Connect Pro completely overhauled our college campus hiring. The NCAT aptitude scores gave our technical interviewers high signal before meeting candidates, eliminating 4 rounds of preliminary aptitude filtering.',
    authorName: 'Sanjay Deshmukh',
    authorTitle: 'VP of Global Campus Talent Acquisition',
    industry: 'Information Technology & Consulting'
  },
  {
    id: 'cs-razorpay',
    company: 'Razorpay',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=128&h=128&fit=crop&crop=faces',
    headline: 'Razorpay scaled its frontend engineering team with zero recruiting agency fees',
    metrics: [
      { stat: '₹42 Lakhs', label: 'Saved in Agency Recruiter Fees' },
      { stat: '14 Days', label: 'Average Time to SDE-1 Offer' },
      { stat: '98.5%', label: 'Candidate Offer Acceptance' }
    ],
    quote: 'The caliber of pre-vetted React and TypeScript candidates on Career Connect Pro is exceptional. The direct developer API integrations allowed us to sync applicants straight into Greenhouse in real time.',
    authorName: 'Deepa Roy',
    authorTitle: 'Lead Technical Recruiter',
    industry: 'FinTech & Payments'
  }
]

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Candidate Applied',
    message: 'Karthik Subramanian applied for Graduate Trainee Engineer (2025/2026 Batch)',
    timestamp: '10 mins ago',
    read: false,
    category: 'application',
    link: '/app'
  },
  {
    id: 'notif-2',
    title: 'Security Advisory',
    message: 'Mandatory 2FA has been successfully verified on your owner account.',
    timestamp: '2 hours ago',
    read: false,
    category: 'system',
    link: '/account/sessions'
  },
  {
    id: 'notif-3',
    title: 'Usage Meter Alert',
    message: 'Your organization has utilized 84% of monthly candidate resume unlock credits.',
    timestamp: '1 day ago',
    read: true,
    category: 'billing',
    link: '/billing/usage'
  },
  {
    id: 'notif-4',
    title: 'Team Mention',
    message: 'Vikram Joshi mentioned you in candidate review notes for Razorpay SDE-1.',
    timestamp: '2 days ago',
    read: true,
    category: 'mention',
    link: '/admin/team'
  }
]



// ==========================================
// ENTERPRISE SAAS PHASE 2 MOCK DATA
// ==========================================

export const INITIAL_IMPORT_BATCH: CandidateImportBatch = {
  id: 'batch-2026-10-campus',
  fileName: 'IIT_NIT_Campus_Drive_Candidates_2026.csv',
  fileSize: '4.8 MB',
  uploadedAt: 'Today at 09:30 AM',
  totalRows: 1420,
  validRows: 1398,
  errorRows: 22,
  status: 'Ready to Map',
  mappings: [
    { csvHeader: 'Student Full Name', targetField: 'name', sampleValue: 'Aarav Sundaram', required: true, confidence: 98 },
    { csvHeader: 'Institute Email ID', targetField: 'email', sampleValue: 'aarav.sundaram@iitb.ac.in', required: true, confidence: 100 },
    { csvHeader: 'Mobile Number', targetField: 'phone', sampleValue: '+91 98765 43210', required: true, confidence: 96 },
    { csvHeader: 'CGPA Score', targetField: 'cgpa', sampleValue: '8.84', required: true, confidence: 95 },
    { csvHeader: 'Key Technical Skills', targetField: 'skills', sampleValue: 'React, TypeScript, Go, PostgreSQL', required: true, confidence: 92 },
    { csvHeader: 'Current CTC (LPA)', targetField: 'currentCtc', sampleValue: 'N/A (Fresher)', required: false, confidence: 88 },
    { csvHeader: 'Expected CTC (LPA)', targetField: 'expectedCtc', sampleValue: '18.5', required: false, confidence: 91 },
    { csvHeader: 'Notice Period Days', targetField: 'noticePeriod', sampleValue: 'Immediate', required: false, confidence: 85 }
  ],
  previewRows: [
    { 'Student Full Name': 'Aarav Sundaram', 'Institute Email ID': 'aarav.sundaram@iitb.ac.in', 'Mobile Number': '+91 98765 43210', 'CGPA Score': '8.84', 'Key Technical Skills': 'React, TypeScript, Go', 'Graduation Year': '2026' },
    { 'Student Full Name': 'Pooja Venkatesh', 'Institute Email ID': 'pooja.v@nitt.edu', 'Mobile Number': '+91 98111 22334', 'CGPA Score': '9.12', 'Key Technical Skills': 'Python, PyTorch, SQL', 'Graduation Year': '2026' },
    { 'Student Full Name': 'Rohan Kulkarni', 'Institute Email ID': 'rohan.k@iiit.ac.in', 'Mobile Number': '+91 97222 33445', 'CGPA Score': '8.45', 'Key Technical Skills': 'Java, Spring Boot, AWS', 'Graduation Year': '2026' },
    { 'Student Full Name': 'Ananya Deshmukh', 'Institute Email ID': 'ananya.d@bits-pilani.ac.in', 'Mobile Number': '+91 99444 55667', 'CGPA Score': '8.92', 'Key Technical Skills': 'Next.js, Node.js, GraphQL', 'Graduation Year': '2026' }
  ]
}

export const INITIAL_EXPORT_JOBS: ExportQueueJob[] = [
  {
    id: 'exp-101',
    title: 'Batch 2026 Shortlisted Candidates (IIT/NIT)',
    type: 'candidate_resumes_zip',
    status: 'processing',
    progress: 74,
    totalRecords: 1420,
    processedRecords: 1050,
    createdAt: '12 mins ago',
    expiresAt: 'In 7 days',
    requestedBy: 'Ananya Sharma (Talent Lead)'
  },
  {
    id: 'exp-102',
    title: 'Q3 Enterprise Hiring Funnel & ATS Metrics',
    type: 'applicant_metrics_csv',
    status: 'completed',
    progress: 100,
    totalRecords: 8540,
    processedRecords: 8540,
    fileSize: '14.2 MB',
    downloadUrl: '#download-q3-metrics',
    createdAt: '2 hours ago',
    expiresAt: 'In 5 days',
    requestedBy: 'Priya Mehta (VP of HR)'
  },
  {
    id: 'exp-103',
    title: 'SOC 2 & DPDP User Access Audit Trail',
    type: 'compliance_audit_json',
    status: 'completed',
    progress: 100,
    totalRecords: 42100,
    processedRecords: 42100,
    fileSize: '48.6 MB',
    downloadUrl: '#download-audit-trail',
    createdAt: 'Yesterday',
    expiresAt: 'In 4 days',
    requestedBy: 'Vikram Joshi (SecOps Lead)'
  },
  {
    id: 'exp-104',
    title: 'Karnataka State Campus Pool Test Scores',
    type: 'campus_results_xlsx',
    status: 'queued',
    progress: 0,
    totalRecords: 3500,
    processedRecords: 0,
    createdAt: 'Just now',
    expiresAt: 'In 7 days',
    requestedBy: 'Rajesh K (University Relations)'
  }
]

export const INITIAL_DOMAIN_RECORDS: DomainVerificationRecord[] = [
  {
    id: 'dom-1',
    domain: 'razorpay.com',
    status: 'verified',
    verificationType: 'DNS TXT',
    txtRecordName: '_ccp-challenge.razorpay.com',
    txtRecordValue: 'ccp-site-verification=razorpay_sec_994821a830f1e',
    autoEnforceSso: true,
    lastChecked: '10 mins ago',
    claimedByOrg: 'Razorpay Technologies Ltd.',
    orgLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=64&h=64&fit=crop'
  },
  {
    id: 'dom-2',
    domain: 'careers.razorpay.in',
    status: 'verified',
    verificationType: 'CNAME',
    txtRecordName: 'careers.razorpay.in',
    txtRecordValue: 'custom-domains.careerconnectpro.com',
    autoEnforceSso: false,
    lastChecked: '1 hour ago',
    claimedByOrg: 'Razorpay Technologies Ltd.',
    orgLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=64&h=64&fit=crop'
  },
  {
    id: 'dom-3',
    domain: 'razorpaylabs.dev',
    status: 'pending',
    verificationType: 'DNS TXT',
    txtRecordName: '_ccp-challenge.razorpaylabs.dev',
    txtRecordValue: 'ccp-site-verification=razorpaylabs_9148b81cf',
    autoEnforceSso: false,
    lastChecked: 'Awaiting DNS propagation (checked 4m ago)',
    claimedByOrg: 'Razorpay Technologies Ltd.',
    orgLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=64&h=64&fit=crop'
  }
]

export const INITIAL_IP_RULES: IpAllowlistRule[] = [
  {
    id: 'ip-1',
    label: 'Bengaluru HQ Office - Primary Leased Line',
    cidr: '103.24.120.0/24',
    scope: 'All Portals',
    status: 'active',
    createdAt: '2026-08-15',
    createdBy: 'Vikram Joshi (SecOps)',
    lastActive: '5 mins ago',
    description: 'Corporate gateway covering floors 4, 5 and 6 at Koramangala HQ'
  },
  {
    id: 'ip-2',
    label: 'Global Corporate WireGuard VPN Pool',
    cidr: '10.240.0.0/16',
    scope: 'Recruiter Dashboard',
    status: 'active',
    createdAt: '2026-09-01',
    createdBy: 'Vikram Joshi (SecOps)',
    lastActive: '12 mins ago',
    description: 'Enforces VPN connectivity for talent acquisition teams working remotely'
  },
  {
    id: 'ip-3',
    label: 'Mumbai AWS Production ATS Sync Worker',
    cidr: '13.127.44.18/32',
    scope: 'Developer API',
    status: 'active',
    createdAt: '2026-10-10',
    createdBy: 'Ananya Sharma (Eng Lead)',
    lastActive: '1 min ago',
    description: 'Static NAT IP for Workday & Greenhouse bi-directional sync engine'
  }
]

export const INITIAL_RETENTION_POLICIES: DataRetentionPolicy[] = [
  {
    id: 'ret-1',
    category: 'Rejected Candidates',
    retentionPeriodMonths: 6,
    autoPurgeEnabled: true,
    purgeAction: 'Hard Delete',
    recordsEligible: 2180,
    lastPurgedAt: '2026-10-01 (1,840 records purged)',
    nextScheduledPurge: '2026-11-05 (2,180 records scheduled)',
    dpdpRegulationRef: 'DPDP Act 2023 §8(7) — Purpose Limitation and Data Erasure'
  },
  {
    id: 'ret-2',
    category: 'Talent Pool Leads',
    retentionPeriodMonths: 12,
    autoPurgeEnabled: true,
    purgeAction: 'Anonymize PII',
    recordsEligible: 4320,
    lastPurgedAt: '2026-09-15 (3,100 records anonymized)',
    nextScheduledPurge: '2026-11-15 (4,320 records scheduled)',
    dpdpRegulationRef: 'GDPR Art. 5(1)(e) — Storage Limitation Principle'
  },
  {
    id: 'ret-3',
    category: 'Interview Video Recordings',
    retentionPeriodMonths: 3,
    autoPurgeEnabled: true,
    purgeAction: 'Hard Delete',
    recordsEligible: 310,
    lastPurgedAt: '2026-10-15 (280 recordings deleted)',
    nextScheduledPurge: '2026-11-15 (310 recordings scheduled)',
    dpdpRegulationRef: 'ISO 27001 Annex A.8.10 — Information Deletion'
  },
  {
    id: 'ret-4',
    category: 'Audit Access Logs',
    retentionPeriodMonths: 36,
    autoPurgeEnabled: false,
    purgeAction: 'Archive & Notify DPO',
    recordsEligible: 0,
    lastPurgedAt: 'Never (SOC 2 Type II statutory requirement: 3 years)',
    nextScheduledPurge: 'Manual DPO Approval Required',
    dpdpRegulationRef: 'SOC 2 Trust Services Criteria CC6.4 / CC7.2'
  }
]

export const INITIAL_SUPERADMIN_TENANTS: SuperAdminTenant[] = [
  {
    id: 'org-razorpay',
    name: 'Razorpay Technologies',
    slug: 'razorpay',
    domain: 'razorpay.com',
    logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=128&h=128&fit=crop',
    plan: 'Enterprise',
    mrr: 185000,
    seatsUsed: 18,
    seatsMax: 25,
    jobsCount: 34,
    candidatesCount: 14850,
    joinedDate: '2025-04-12',
    healthStatus: 'healthy',
    supportTier: 'Dedicated Slack + TAM',
    primaryAdmin: {
      name: 'Ananya Sharma',
      email: 'ananya.s@razorpay.com',
      phone: '+91 98450 11223'
    }
  },
  {
    id: 'org-swiggy',
    name: 'Swiggy Bundl Technologies',
    slug: 'swiggy',
    domain: 'swiggy.in',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=128&h=128&fit=crop',
    plan: 'Enterprise',
    mrr: 240000,
    seatsUsed: 38,
    seatsMax: 50,
    jobsCount: 62,
    candidatesCount: 32400,
    joinedDate: '2025-02-18',
    healthStatus: 'healthy',
    supportTier: 'Dedicated Slack + TAM',
    primaryAdmin: {
      name: 'Karthik Raja',
      email: 'karthik.r@swiggy.in',
      phone: '+91 99001 88776'
    }
  },
  {
    id: 'org-zerodha',
    name: 'Zerodha Broking Ltd.',
    slug: 'zerodha',
    domain: 'zerodha.com',
    logo: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=128&h=128&fit=crop',
    plan: 'Pro',
    mrr: 45000,
    seatsUsed: 5,
    seatsMax: 10,
    jobsCount: 12,
    candidatesCount: 5120,
    joinedDate: '2025-08-01',
    healthStatus: 'healthy',
    supportTier: '24/7 Priority Email',
    primaryAdmin: {
      name: 'Nithin Bhat',
      email: 'nithin.bhat@zerodha.com',
      phone: '+91 97400 33221'
    }
  },
  {
    id: 'org-cred',
    name: 'Dreamplug Technologies (CRED)',
    slug: 'cred',
    domain: 'cred.club',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=128&h=128&fit=crop',
    plan: 'Enterprise',
    mrr: 160000,
    seatsUsed: 14,
    seatsMax: 20,
    jobsCount: 21,
    candidatesCount: 9800,
    joinedDate: '2025-09-14',
    healthStatus: 'trial',
    supportTier: 'Dedicated Slack + TAM',
    primaryAdmin: {
      name: 'Aditi Varma',
      email: 'aditi.v@cred.club',
      phone: '+91 98888 12345'
    }
  }
]

export const INITIAL_BROADCAST_MESSAGE: SystemBroadcastMessage = {
  id: 'broad-1',
  title: 'Scheduled AWS Mumbai Database Maintenance',
  message: 'Career Connect Pro will undergo planned read-replica database optimization on Sunday, Nov 8 between 02:00 AM – 03:30 AM IST. Candidate submissions will queue safely without data loss.',
  severity: 'maintenance',
  active: true,
  audience: 'all',
  startsAt: '2026-11-08 02:00 IST',
  endsAt: '2026-11-08 03:30 IST',
  ctaText: 'View Status Dashboard',
  ctaLink: '/status'
}

export const INITIAL_AI_SCREENING_USAGE: AiScreeningUsage = {
  monthlyQuota: 25000,
  usedCredits: 14200,
  costPerScanInr: 1.5,
  hardBudgetCapInr: 40000,
  autoShutoffEnabled: true,
  departments: [
    { name: 'Campus Hiring 2026 Pool', used: 9230, allocated: 15000, percentage: 65 },
    { name: 'Lateral Software Engineering', used: 3550, allocated: 6000, percentage: 25 },
    { name: 'Product, Design & Analytics', used: 1420, allocated: 4000, percentage: 10 }
  ],
  recentEvaluations: [
    { id: 'eval-1', candidateName: 'Aarav Sundaram (IIT Bombay)', jobRole: 'Full Stack Engineer (SDE-1)', matchScore: 94, tokensUsed: 1240, evaluatedAt: '5 mins ago' },
    { id: 'eval-2', candidateName: 'Pooja Venkatesh (NIT Trichy)', jobRole: 'AI/ML Systems Associate', matchScore: 91, tokensUsed: 1180, evaluatedAt: '12 mins ago' },
    { id: 'eval-3', candidateName: 'Sanjay Reddy (BITS Pilani)', jobRole: 'Backend Developer (Go/PostgreSQL)', matchScore: 88, tokensUsed: 1310, evaluatedAt: '28 mins ago' },
    { id: 'eval-4', candidateName: 'Neha Kapoor (DTU Delhi)', jobRole: 'Frontend Architect (React)', matchScore: 85, tokensUsed: 1100, evaluatedAt: '45 mins ago' }
  ]
}

export const INITIAL_HIRING_WORKFLOWS: HiringWorkflow[] = [
  {
    id: 'wf-1',
    title: 'IIT/NIT Campus Fast-Track Pipeline',
    description: 'Automatically shortlists top 10% students with CGPA > 8.5 and dispatches HackerEarth screening test.',
    active: true,
    triggerEvent: 'Candidate submits application from Verified College',
    conditionsCount: 2,
    actionsCount: 3,
    totalRuns: 1420,
    lastRunAt: '12 mins ago',
    nodes: [
      { id: 'n1', type: 'trigger', title: 'New Application Received', description: 'Triggers when a college candidate applies to campus job slots', config: { source: 'Campus Portal' } },
      { id: 'n2', type: 'condition', title: 'Verify CGPA >= 8.5 & NCAT >= 80%', description: 'Evaluates verified university transcript and online score', config: { minCgpa: 8.5, minNcat: 80 } },
      { id: 'n3', type: 'action', title: 'Send HackerEarth Coding Invite', description: 'Triggers automated webhook to HackerEarth with 90min test link', config: { testId: 'HE-TEST-SDE1-2026' } },
      { id: 'n4', type: 'action', title: 'Assign to Campus Recruiter', description: 'Tags candidate in ATS and notifies Priya Mehta via Slack', config: { assignee: 'Priya Mehta' } }
    ]
  },
  {
    id: 'wf-2',
    title: 'Automatic Resume Rejection with Skill Feedback',
    description: 'Sends constructive feedback email when candidate experience or core tech stack fails mandatory thresholds.',
    active: true,
    triggerEvent: 'AI Screening Match Score < 40%',
    conditionsCount: 1,
    actionsCount: 2,
    totalRuns: 890,
    lastRunAt: '1 hour ago',
    nodes: [
      { id: 'n21', type: 'trigger', title: 'AI Screening Evaluated', description: 'Fires when Gemini API completes resume scoring', config: {} },
      { id: 'n22', type: 'condition', title: 'Match Score < 40%', description: 'Candidate lacks mandatory technical stack requirements', config: { threshold: 40 } },
      { id: 'n23', type: 'action', title: 'Send Polite Feedback Email', description: 'Delivers rejection letter with suggested areas for skill improvement', config: { delayHours: 24 } }
    ]
  },
  {
    id: 'wf-3',
    title: 'Offer Acceptance Onboarding Trigger',
    description: 'When candidate signs digital offer letter, triggers IT asset provisioning and HR document collection.',
    active: false,
    triggerEvent: 'Digital Offer Signed by Candidate',
    conditionsCount: 1,
    actionsCount: 2,
    totalRuns: 64,
    lastRunAt: '2 days ago',
    nodes: [
      { id: 'n31', type: 'trigger', title: 'Candidate Accepts Offer', description: 'DocuSign / Aadhaar eSign webhook received', config: {} },
      { id: 'n32', type: 'action', title: 'Provision IT Hardware in Jira', description: 'Creates ticket for MacBook Pro M3 + YubiKey shipment', config: {} },
      { id: 'n33', type: 'action', title: 'Notify HR Ops Team', description: 'Sends Welcome Pack details to Bangalore onboarding team', config: {} }
    ]
  }
]

export const INITIAL_WHITELABEL_CONFIG: WhiteLabelSettings = {
  brandName: 'Razorpay Careers',
  portalTitle: 'Join India’s Financial Backbone — Razorpay Careers',
  logoUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=256&h=64&fit=crop',
  faviconUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=32&h=32&fit=crop',
  primaryColor: '#0c2340', // Razorpay Navy
  customDomain: 'careers.razorpay.com',
  sslStatus: 'active',
  customFields: [
    { id: 'cf-1', label: 'Current Fixed CTC (INR Lakhs)', fieldType: 'number', required: true, placeholder: 'e.g. 18.5', appliesTo: 'candidate_apply' },
    { id: 'cf-2', label: 'Notice Period Duration', fieldType: 'select', required: true, options: ['Immediate / Serving Notice', '15 Days or Less', '30 Days', '60 Days', '90 Days'], appliesTo: 'candidate_apply' },
    { id: 'cf-3', label: 'GitHub / GitLab Profile URL', fieldType: 'text', required: true, placeholder: 'https://github.com/username', appliesTo: 'candidate_apply' },
    { id: 'cf-4', label: 'College Registration / Roll No.', fieldType: 'text', required: false, placeholder: 'e.g. 22BCE1042', appliesTo: 'candidate_apply' },
    { id: 'cf-5', label: 'Workday Job Requisition ID', fieldType: 'text', required: true, placeholder: 'e.g. REQ-2026-9941', appliesTo: 'job_post' }
  ]
}

export const INITIAL_PROFORMA_QUOTE: ProformaQuote = {
  quoteNumber: 'CCP-QT-2026-0842',
  date: '2026-11-01',
  validUntil: '2026-11-30',
  clientName: 'Swiggy Bundl Technologies Pvt. Ltd.',
  clientGst: '29AABCS1429B1Z4',
  billingAddress: 'Tower D, 9th Floor, IBC Knowledge Park, Bannerghatta Road, Bengaluru, Karnataka 560029',
  contactPerson: 'Karthik Raja (Director of Talent Acquisition)',
  contactEmail: 'karthik.r@swiggy.in',
  planName: 'Enterprise SaaS Annual Agreement (Growth Tier)',
  items: [
    { id: 'item-1', description: 'Career Connect Pro — Enterprise Recruiter Platform (Annual Platform Fee)', unitPrice: 120000, quantity: 1, amount: 120000 },
    { id: 'item-2', description: 'Dedicated Recruiter Seats (Full RBAC + Candidate Sourcing)', unitPrice: 3000, quantity: 20, amount: 60000 },
    { id: 'item-3', description: 'AI Resume Screening & Auto-Ranking Copilot (Annual 50,000 Scans Pack)', unitPrice: 45000, quantity: 1, amount: 45000 },
    { id: 'item-4', description: 'White-Label Custom Career Portal (careers.swiggy.in + Dedicated SSL)', unitPrice: 25000, quantity: 1, amount: 25000 }
  ],
  subtotal: 250000,
  gstRate: 0.18,
  cgst: 22500, // 9% for Karnataka
  sgst: 22500, // 9% for Karnataka
  igst: 0,
  totalAmount: 295000,
  currency: 'INR',
  status: 'Sent'
}
