import { type Project } from "./types";


export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Nexus Cloud Dashboard',
    slug: 'nexus-cloud-dashboard',
    category: 'Full-Stack',
    shortDescription: 'Enterprise cloud management platform with real-time analytics and microservices orchestration visualizer.',
    fullDescription: `### Nexus Cloud Dashboard

Nexus Cloud Dashboard is an enterprise-grade web application built to monitor, manage, and scale serverless infrastructure in real time.

#### Key Features:
- **Live Infrastructure Monitoring**: Real-time metrics via WebSockets.
- **Resource Allocation**: Granular control over Kubernetes clusters.
- **Role-Based Access Control**: Enterprise SSO integration with SAML 2.0 and OAuth2.
- **Automated Billing Alerts**: Predictive cost estimation driven by machine learning.`,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    liveUrl: 'https://nexus-cloud.example.com',
    githubClientUrl: 'https://github.com/example/nexus-cloud-frontend',
    githubServerUrl: 'https://github.com/example/nexus-cloud-backend',
    featured: true,
    order: 1,
    createdAt: '2026-08-01',
  },
  {
    id: 'proj-2',
    title: 'Aura AI Design Studio',
    slug: 'aura-ai-design-studio',
    category: 'Frontend',
    shortDescription: 'Next-gen browser image generation and UI mockup builder powered by WebGPU and generative diffusion models.',
    fullDescription: `### Aura AI Design Studio

A generative UI workspace that empowers designers and developers to create pixel-perfect UI mockups using prompt engineering.

#### Key Features:
- **Canvas-based Rendering**: Canvas & WebGL hardware acceleration.
- **Prompt to Component**: Instant JSX generation from text prompts.
- **Export Formats**: React Code, Figma SVG, and PNG.`,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'WebGPU', 'Zustand'],
    liveUrl: 'https://aura-design.example.com',
    githubClientUrl: 'https://github.com/example/aura-ai-studio',
    featured: true,
    order: 2,
    createdAt: '2026-07-20',
  },
  {
    id: 'proj-3',
    title: 'Pulse Microservice Engine',
    slug: 'pulse-microservice-engine',
    category: 'Backend',
    shortDescription: 'High-throughput event streaming middleware written in Go with Redis caching and Kafka pipeline queues.',
    fullDescription: `### Pulse Microservice Engine

A resilient asynchronous message router handling over 50,000 requests per second with ultra-low sub-millisecond latency.

#### Key Features:
- **Event-Driven Broker**: Kafka-backed message queue system.
- **Rate-Limiting & Circuit Breaking**: Built-in fault tolerance.
- **gRPC Interface**: High efficiency binary data interchange.`,
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
    techStack: ['Go', 'Redis', 'Kafka', 'gRPC', 'Prometheus'],
    githubServerUrl: 'https://github.com/example/pulse-engine',
    featured: false,
    order: 3,
    createdAt: '2026-06-15',
  },
  {
    id: 'proj-4',
    title: 'DevOps Workflow Automation',
    slug: 'devops-workflow-automation',
    category: 'Automation',
    shortDescription: 'Custom CI/CD runner and automated deployment pipeline script suite for AWS multi-region infrastructure.',
    fullDescription: `### DevOps Workflow Automation

Automation suite that streamlines staging and production deployments across distributed Kubernetes clusters on AWS & GCP.

#### Key Features:
- **Zero-Downtime Blue-Green Deployments**
- **Automated Security Audit & SAST Scans**
- **Slack Bot Notification Webhooks**`,
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=800&auto=format&fit=crop',
    techStack: ['Python', 'Terraform', 'GitHub Actions', 'AWS', 'Bash'],
    githubServerUrl: 'https://github.com/example/devops-automation-toolkit',
    featured: true,
    order: 4,
    createdAt: '2026-05-30',
  },
  {
    id: 'proj-5',
    title: 'Cypher Crypto Portfolio Analytics',
    slug: 'cypher-crypto-portfolio',
    category: 'Full-Stack',
    shortDescription: 'DeFi portfolio management tool with live token price tracking, DEX liquidity pool insights, and tax reports.',
    fullDescription: `### Cypher Crypto Portfolio Analytics

All-in-one decentralised asset tracker monitoring multi-chain wallet balances and yield farming performance.

#### Key Features:
- **Multi-Chain Aggregation**: Ethereum, Polygon, Arbitrum, and Solana.
- **Real-Time Price Tickers**: WebSocket data streams.
- **Automated Profit/Loss Calculations**`,
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop',
    techStack: ['Next.js', 'Ethers.js', 'GraphQL', 'Tailwind CSS', 'Prisma'],
    liveUrl: 'https://cypher-analytics.example.com',
    githubClientUrl: 'https://github.com/example/cypher-web-app',
    featured: false,
    order: 5,
    createdAt: '2026-04-12',
  },
  {
    id: 'proj-6',
    title: 'HyperSpeed Asset Optimizer',
    slug: 'hyperspeed-asset-optimizer',
    category: 'Automation',
    shortDescription: 'CLI tool and API microservice for automated WebP image compression, asset CDN delivery, and cache purging.',
    fullDescription: `### HyperSpeed Asset Optimizer

Smart asset processing daemon that dynamically resizes and converts media uploads into next-gen web formats on the fly.

#### Key Features:
- **Lossless Compression Pipeline**
- **Edge CDN Auto-Purging API**
- **WebP & AVIF Format Transcoding**`,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    techStack: ['Node.js', 'Sharp', 'Express', 'Cloudflare Workers', 'Jest'],
    githubServerUrl: 'https://github.com/example/hyperspeed-optimizer',
    featured: false,
    order: 6,
    createdAt: '2026-03-01',
  },
];
