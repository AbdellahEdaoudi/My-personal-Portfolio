import { Inter, Prompt } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
const prompt = Prompt({ subsets: ["latin"], weight: '500' });


export const metadata = {
  title: "Abdellah Edaoudi",
  description: "portfolio of Abdellah Edaoudi, a Digital Developer specializing in MERN-Stack.Explore my projects, skills, and experiences in building responsive websites and applications using Next.js (React.js), Tailwind CSS, and Node.js.",
  keywords: "Abdellah Edaoudi, MERN Stack Developer, Portfolio, Web Development, React, React.js, Node.js, MongoDB, Express.js, JavaScript, Frontend Developer, Backend Developer, Software Engineer, Web Applications, Tailwind CSS, Next.js, Digital Developer, Responsive Design, Full-Stack Development, API Integration, UI/UX Design, SEO Optimization, HTML, CSS, JavaScript, TypeScript, Python, Django, Flask, Ruby on Rails, PHP, Laravel, Symfony, SQL, MySQL, PostgreSQL, SQLite, NoSQL, Redis, MongoDB, Cassandra, CouchDB, Firebase, AWS, Amazon Web Services, Azure, Google Cloud Platform, GCP, Cloud Computing, DevOps, Kubernetes, Docker, CI/CD, Jenkins, Travis CI, CircleCI, Git, GitHub, GitLab, Bitbucket, Version Control, Agile, Scrum, Kanban, Project Management, JIRA, Trello, Asana, Confluence, Slack, ChatOps, Virtual Machines, VM, Vagrant, VirtualBox, VMware, Hyper-V, Networking, TCP/IP, HTTP, HTTPS, REST, GraphQL, API, Microservices, Service-Oriented Architecture, SOA, Event-Driven Architecture, EDA, Serverless, Lambda, Azure Functions, Cloudflare, CDN, Content Delivery Network, Load Balancing, Reverse Proxy, Nginx, Apache, IIS, Web Server, SSL, TLS, Encryption, Security, Cybersecurity, Ethical Hacking, Penetration Testing, OWASP, SAST, DAST, RASP, Static Analysis, Dynamic Analysis, Runtime Analysis, Code Review, Secure Coding, Cryptography, Blockchain, Bitcoin, Ethereum, Smart Contracts, Solidity, Web3, Decentralized Applications, dApps, NFTs, Non-Fungible Tokens, ICO, Initial Coin Offering, Cryptocurrency, Digital Currency, FinTech, Financial Technology, Banking, Payments, Stripe, PayPal, Square, Mobile Payments, Apple Pay, Google Pay, Samsung Pay, E-Commerce, Online Shopping, WooCommerce, Shopify, Magento, BigCommerce, OpenCart, PrestaShop, Marketing, Digital Marketing, SEO, Search Engine Optimization, SEM, Search Engine Marketing, PPC, Pay-Per-Click, Google Ads, Facebook Ads, Social Media Marketing, SMM, Content Marketing, Email Marketing, Automation, HubSpot, Mailchimp, ConvertKit, ActiveCampaign, Customer Relationship Management, CRM, Salesforce, Zoho, HubSpot CRM, Pipedrive, Lead Generation, Lead Nurturing, Customer Retention, Customer Acquisition, Analytics, Google Analytics, Mixpanel, Segment, Amplitude, Data Science, Machine Learning, Artificial Intelligence, AI, ML, Deep Learning, Neural Networks, Natural Language Processing, NLP, Computer Vision, CV, Image Processing, OpenCV, TensorFlow, Keras, PyTorch, Scikit-Learn, Pandas, Numpy, SciPy, Matplotlib, Seaborn, Data Visualization, Big Data, Hadoop, Spark, Kafka, Data Lakes, Data Warehousing, ETL, Extract Transform Load, Data Pipelines, Business Intelligence, BI, Tableau, Power BI, Looker, Domo, Qlik, Reporting, Data Analysis, Data Mining, Statistics, Statistical Analysis, A/B Testing, Hypothesis Testing, R, SAS, SPSS, MATLAB, Simulink, Engineering, Electrical Engineering, Mechanical Engineering, Civil Engineering, Chemical Engineering, Aerospace Engineering, Automotive Engineering, Manufacturing, 3D Printing, CAD, AutoCAD, SolidWorks, CATIA, CNC, Robotics, Automation, IoT, Internet of Things, Smart Devices, Smart Home, Wearables, AR, VR, Augmented Reality, Virtual Reality, Mixed Reality, MR, XR, Extended Reality, Unity, Unreal Engine, Game Development, Game Design, Mobile Development, iOS Development, Android Development, Swift, Objective-C, Kotlin, Java, Flutter, Dart, React Native, Xamarin, Ionic, PhoneGap, Cordova, PWA, Progressive Web Apps, Responsive Design, Mobile-First Design, Cross-Platform Development, Hybrid Apps, Native Apps, Accessibility, WCAG, ARIA, Screen Readers, Inclusive Design, Usability, User Experience, UX, User Interface, UI, Interaction Design, Human-Computer Interaction, HCI, Information Architecture, Wireframing, Prototyping, Figma, Sketch, Adobe XD, InVision, Axure, Balsamiq, Design Systems, Pattern Libraries, Style Guides, Design Tokens, Atomic Design, Frontend Frameworks, Angular, Vue.js, Svelte, Backbone.js, Ember.js, Meteor.js, Web Components, Stencil.js, LitElement, Polymer, CSS Frameworks, Bootstrap, Foundation, Bulma, Materialize, Semantic UI, UIkit, Tailwind CSS, PostCSS, SASS, LESS, Stylus, CSS-in-JS, Emotion, Styled Components, JSS, Animation, GreenSock, GSAP, Framer Motion, Anime.js, Lottie, Three.js, WebGL, Canvas, SVG, Chart.js, D3.js, Plotly, Highcharts, DataTables, Handsontable, Ag-Grid, Web Performance, Lighthouse, Web Vitals, PageSpeed Insights, Core Web Vitals, FID, LCP, CLS, TTFB, Server-Side Rendering, SSR, Static Site Generation, SSG, JAMstack, Headless CMS, Contentful, Strapi, Sanity, Ghost, Netlify CMS, Forestry, Markdown, MDX, Blogging, WordPress, Drupal, Joomla, Sitecore, Webflow, Wix, Squarespace, Gatsby, Hugo, Jekyll, Eleventy, Next.js, Nuxt.js, Gridsome, Sapper, Scully, Astro, Blazor, Razor, .NET, ASP.NET, MVC, Web API, Entity Framework, EF Core, Blazor, Xamarin, C#, F#, Visual Basic, VB.NET, Windows Forms, WPF, UWP, WinUI, Electron, Tauri, Rust, Go, Golang, C, C++, Qt, Unreal Engine, Unity, Game Development, VR Development, AR Development, XR Development, Simulation, Real-Time Rendering, High Performance Computing, HPC, GPU, CUDA, OpenCL, Vulkan, DirectX, Metal, Ray Tracing, Path Tracing, Cloud Gaming, Game Streaming, Remote Desktop, VDI, Virtual Desktop Infrastructure, Citrix, VMware Horizon, Microsoft RDS, Amazon WorkSpaces, Azure Virtual Desktop, Thin Clients, Zero Clients, Edge Computing, Fog Computing, Cloud-Native, Microservices, Containers, Kubernetes, Service Mesh, Istio, Linkerd, Envoy, API Gateway, Kong, Apigee, AWS Lambda, Azure Functions, Google Cloud Functions, Serverless Framework, OpenFaaS, Knative, Event-Driven, Event Sourcing, CQRS, Command Query Responsibility Segregation, Saga Pattern, Orchestration, Choreography, Monitoring, Observability, Logging, Tracing, Metrics, Prometheus, Grafana, ELK Stack, ElasticSearch, Logstash, Kibana, Fluentd, Fluent Bit, OpenTelemetry, Jaeger, Zipkin, Splunk, DataDog, New Relic, Dynatrace, AppDynamics, Sentry, Bug Tracking, Error Monitoring, Exception Handling, Incident Management, On-Call, PagerDuty, VictorOps, OpsGenie, Uptime Monitoring, Status Pages, Health Checks, Chaos Engineering, Gremlin, Chaos Monkey, Resilience, Reliability, Scalability, High Availability, Fault Tolerance, Disaster Recovery, Backup, Restore, RTO, RPO, DRaaS, Backup as a Service, BaaS, Immutable Backups, Air-Gapped Backups, Encryption, Key Management, HSM, Hardware Security Module, PKI, Public Key Infrastructure, SSL/TLS, Certificates, Certificate Authority, CA, OpenSSL, Let's Encrypt, DNSSEC, DNS Security, Security Audits, Penetration Testing, Vulnerability Scanning, OWASP, Security Training, Secure Coding, Security Best Practices, Authentication, Authorization, OAuth, OAuth2, OpenID Connect, SAML, Single Sign-On, SSO, Multi-Factor Authentication, MFA, 2FA, Biometrics, Fingerprint, Face Recognition, Voice Recognition, Behavioral Biometrics, Risk-Based Authentication, RBA, Zero Trust, Identity and Access Management, IAM, Role-Based Access Control, RBAC, Attribute-Based Access Control, ABAC, Policy-Based Access Control, PBAC, Least Privilege, Principle of Least Privilege, Segregation of Duties, SoD, Identity Governance, Identity Lifecycle, User Provisioning, User Deprovisioning, Self-Service, Password Management, Passwordless Authentication, API Security, Web Security, Application Security, Mobile Security, Endpoint Security, Network Security, Infrastructure Security, Cloud Security, Security Operations, SOC, Security Information and Event Management, SIEM, Security Orchestration, Automation and Response, SOAR, Threat Intelligence, Threat Hunting, Incident Response, Forensics, Malware Analysis, Ransomware, Phishing, Social Engineering, Security Awareness, Insider Threats, Cyber Threat Intelligence, CTI, Cyber Defense, Cyber Attack, Cyber Warfare, Cyber Espionage, Cyber Operations, Cyber Resilience, Cyber Hygiene",
  openGraph: {
    title: "Abdellah Edaoudi",
    description: "Welcome to the official portfolio of Abdellah Edaoudi, a Digital Developer specializing in MERN-Stack. Explore my projects, skills, and experiences in building responsive websites and applications using Next.js (React.js), Tailwind CSS, and Node.js.",
    type: 'website',
    url: 'https://ed-portfolioo.vercel.app',
    images: [
      {
        url: 'https://ed-portfolioo.vercel.app/profile-pic.png',
        width: 800,
        height: 600,
        alt: 'Abdellah Edaoudi Profile Picture',
      }
    ],
    locale: 'en_US',
    site_name: 'Abdellah Edaoudi Portfolio'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Edaoudi_abde',
    creator: '@Edaoudi_abde',
    title: "Abdellah Edaoudi - MERN Stack Developer | Portfolio",
    description: "Welcome to the official portfolio of Abdellah Edaoudi, a Digital Developer specializing in MERN-Stack. Explore my projects, skills, and experiences in building responsive websites and applications using Next.js (React.js), Tailwind CSS, and Node.js.",
    image: 'https://ed-portfolioo.vercel.app/profile-pic.png',
  },
  instagram: {
    site: '@edaoudi_abdellah'
  },
  robots: 'index, follow',
  google: {
    name: 'Abdellah Edaoudi - MERN Stack Developer | Portfolio',
    description: 'Welcome to the official portfolio of Abdellah Edaoudi, a Digital Developer specializing in MERN-Stack. Explore my projects, skills, and experiences in building responsive websites and applications using Next.js (React.js), Tailwind CSS, and Node.js.'
  },
  author: 'Abdellah Edaoudi',
  canonical: 'https://ed-portfolioo.vercel.app',
  additionalMetaTags: [
    {
      name: 'application-name',
      content: 'Abdellah Edaoudi Portfolio'
    },
    {
      name: 'msapplication-TileColor',
      content: '#ffffff'
    },
    {
      name: 'msapplication-TileImage',
      content: 'https://ed-portfolioo.vercel.app/profile-pic.png'
    },
    {
      name: 'theme-color',
      content: '#ffffff'
    },
    {
      name: 'keywords',
      content: 'Abdellah Edaoudi, Abdellah, Edaoudi, MERN Stack Developer, Portfolio, Web Development, React, Node.js, MongoDB, Express.js, JavaScript, Frontend Developer, Backend Developer, Software Engineer, Web Applications, Tailwind CSS, Next.js, Digital Developer, UI/UX Design, API Integration, Responsive Design'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    }
  ]
};


export default function RootLayout({ children }) {
  return (
    <html className="scroll-smooth" lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </head>
      <body className={prompt.className}>
        {children}
      </body>
    </html>
  );
}
