/* ==========================================================================
   NOAH - DATA MODULE
   Portfolio Content, Projects, Skills, and Testimonials
   ========================================================================== */

const PORTFOLIO_DATA = {
  profile: {
    name: "Noah",
    role: "Full-Stack Web Developer",
    tagline: "Crafting visually captivating, lightning-fast digital experiences with modern web technologies.",
    email: "hello@noahdev.design",
    location: "San Francisco, CA & Remote Worldwide",
    availability: "Available for new projects & full-time roles"
  },

  skills: [
    {
      id: "html5",
      name: "HTML5 & Semantic Web",
      category: "frontend",
      level: "Master",
      percent: 98,
      icon: "assets/icons/html5.svg",
      desc: "Pixel-perfect semantic structure, accessible WCAG 2.1 AA compliance, and SEO optimization."
    },
    {
      id: "css3",
      name: "CSS3 & Modern Animations",
      category: "frontend",
      level: "Master",
      percent: 96,
      icon: "assets/icons/css3.svg",
      desc: "Fluid responsive layouts, complex keyframe physics, glassmorphism, and hardware-accelerated 3D transforms."
    },
    {
      id: "javascript",
      name: "JavaScript (ESNext)",
      category: "frontend",
      level: "Expert",
      percent: 94,
      icon: "assets/icons/javascript.svg",
      desc: "Modern asynchronous architecture, state management, Web APIs, and high-performance DOM manipulation."
    },
    {
      id: "react",
      name: "React & Next.js",
      category: "frontend",
      level: "Expert",
      percent: 92,
      icon: "assets/icons/react.svg",
      desc: "Component architecture, Server Components, suspense workflows, hooks, and seamless UI orchestration."
    },
    {
      id: "nodejs",
      name: "Node.js & Express",
      category: "backend",
      level: "Advanced",
      percent: 88,
      icon: "assets/icons/nodejs.svg",
      desc: "RESTful microservices, WebSocket live sync, authentication, and performant backend APIs."
    },
    {
      id: "figma",
      name: "Figma & UI/UX Systems",
      category: "design",
      level: "Expert",
      percent: 90,
      icon: "assets/icons/figma.svg",
      desc: "Design tokens, auto-layout systems, interactive prototyping, and seamless developer handoff."
    }
  ],

  projects: [
    {
      id: "finora-bank",
      title: "Finora — Digital Banking Dashboard",
      category: "Fintech Product",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
      desc: "A sleek financial analytics dashboard with spending insights, smart forecasting, and secure account workflows for modern digital banking users.",
      tags: ["React", "Charts", "UX", "Finance", "Dashboard"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: "luma-travel",
      title: "Luma Travel — Immersive Trip Planner",
      category: "Travel Platform",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      desc: "A visually rich destination planner that combines itinerary creation, local recommendations, and booking flows into one elegant travel experience.",
      tags: ["Next.js", "Maps", "Booking", "UI Design", "Travel"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: "northstar-crm",
      title: "Northstar CRM — Sales Command Center",
      category: "B2B SaaS",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      desc: "A performance-driven CRM workspace designed for sales teams, featuring live pipeline tracking, automation, and collaborative deal management.",
      tags: ["SaaS", "CRM", "Analytics", "Automation", "React"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ],

  testimonials: [
    {
      quote: "Noah transformed our vision into an unforgettable digital platform. Our conversion rates increased by 42% within two weeks of launch.",
      author: "Carolina Abott",
      role: "Business Owner",
      avatar: "assets/images/carolina_avatar.jpg",
      rating: 5
    },
    {
      quote: "Working with Noah was effortlessly smooth. His aesthetic taste and engineering discipline are rare to find in one developer.",
      author: "Marcus Vance",
      role: "VP of Product at ScaleLabs",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
      rating: 5
    },
    {
      quote: "The animations, micro-interactions, and speed Noah delivered blew our board away. An exceptional engineer and designer.",
      author: "Elena Rostova",
      role: "Founder at Nexus Capital",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80",
      rating: 5
    }
  ]
};
