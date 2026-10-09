// Central source of truth for the entire docs tree.
// Sidebar, homepage progress cards, the roadmap timeline, and the search.
// index are all derived from this file — edit here to add a new topic.
// status: "done" | "learning" | "todo"
// slug pieces map directly to content/docs/<section>/<slug>.md

export const NAV = [

  // Software Engingineering 
  {
    section: "software-engineering-fundamentals",
    title: "Software Engineering Fundamentals",
    number: "01",
    topics: [
      { slug: "software-engineering", title: "Software Engineering", status: "done" },
      { slug: "software-engineering-glossary", title: "Software Engineering Glossary", status: "todo" },
    ],
  },

  // Cloud Computing
  {
    section: "cloud-computing",
    title: "Cloud Computing",
    number: "02",
    topics: [
      { slug: "fundamentals-of-cloud-computing", title: "Fundamentals of cloud computing", status: "done" },
      { slug: "networking-and-virtualization-basics", title: "Networking and Virtualization", status: "todo" },
      { slug: "cloud-service-and-deployment-models", title: "Cloud service and deployment models", status: "todo" },
      { slug: "storage-and-data-management", title: "Storage and Data Management", status: "todo" },
      { slug: "modern-cloud-computing-technologies", title: "Modern cloud computing technologies", status: "todo" },
      { slug: "cloud-security-and-identity-management", title: "Cloud security and identity management", status: "todo" },
    ],
  },

  // HTML | CSS | JavaScript
  {
    section: "html-css-and-JS",
    title: "HTML, CSS & JavaScript",
    number: "03",
    topics: [
      { slug: "html", title: "HTML Fundamentals", status: "todo" },
      { slug: "css", title: "Cascading Style Sheets", status: "todo" },
      { slug: "javascript", title: "JS Fundamentals", status: "todo" },
    ],
  },

  // ReactJS
  {
    section: "reactJS",
    title: "ReactJS",
    number: "04",
    topics: [
      { slug: "react-basics", title: "Introduction to React and Class Components", status: "todo" },
      { slug: "function-components-with-array-and-dom", title: "Function Components with Array and DOM Manipulation", status: "todo" },
      { slug: "advanced-react-functionality", title: "Advanced React Functionality", status: "todo" },
    ],
  },

  // NodeJS & ExpressJS
  {
    section: "nodejs-and-express",
    title: "Node.js and Express",
    number: "05",
    topics: [
      { slug: "server-side-js", title: "Server-Side JavaScript", status: "todo" },
      { slug: "asynch-with-callback-programming", title: "Asynchronous I/O with callback programming", status: "todo" },
      { slug: "express-framework", title: "Express Web Application Framework", status: "todo" },
      { slug: "node-and-express-interview", title: "Glossary", status: "todo" },
    ],
  },

  // API & Authentication
  {
    section: "apis-and-authentication",
    title: "APIs & Authentication",
    number: "06",
    topics: [
      { slug: "api-and-authentication", title: "APIs", status: "todo" },
    ],
  },

  // Python for Data Science
  {
    section: "python-for-data-science",
    title: "Python for Data Science, AI & Development",
    number: "07",
    topics: [
      { slug: "python-basics", title: "Python Basics", status: "done" },
      { slug: "lists-tuples-set-dictionaries", title: "Lists, Tuples, Dictionaries", status: "done" },
      { slug: "python-fundamentals", title: "Python Programming Fundamentals", status: "done" },
      { slug: "oop-in-python", title: "OOP in Python", status: "done" },
      { slug: "file-handling", title: "File Handling", status: "done" },
      { slug: "numpy-and-pandas", title: "NumPy & Pandas", status: "done" },
      { slug: "apis-and-data-collection", title: "APIs and Data Collection", status: "done" },
      { slug: "ai-fundamentals", title: "AI Fundamentals", status: "done" },
    ],
  },

  // Python and Flask
  {
    section: "python-and-flask",
    title: "Python and Flask",
    number: "08",
    topics: [
      { slug: "python-packaging-concepts", title: "Python Packaging Concepts", status: "done" },
      { slug: "web-app-using-flask", title: "Web App Deployment using Flask", status: "done" },
    ],
  },

  // Git and GitHub
  {
    section: "git-and-gitHub",
    title: "Git & GitHub",
    number: "09",
    topics: [
      { slug: "git-and-github-fundamentals", title: "Git and GitHub Fundamentals", status: "" },
      { slug: "git-commands", title: "Git Commands and Managing GitHub Projects", status: "" }
    ],
  },

  // Django App with SQL Database
  {
    section: "django-sql-database",
    title: "Django App with SQL Database",
    number: "10",
    topics: [
      { slug: "sql-relational-db", title: "SQL & Relational Databases", status: "" },
      { slug: "orm", title: "ORM", status: "" },
      { slug: "full-stack-django-development-and-deployment", title: "Full-stack Django Development", status: "" },
    ],
  },

  // Containers w/ Docker, Kubernetes & OpenShift
  {
    section: "containers",
    title: "Containers w/ Docker, Kubernetes & OpenShift",
    number: "11",
    topics: [
      { slug: "containers-and-containerization", title: "Containers and Containerization", status: "" },
      { slug: "kubernetes-and-its-ecosystem", title: "The Kubernetes & its ecosystem", status: "" },
      { slug: "managing-app-with-kubernetes", title: "Managing Applications with Kubernetes", status: "" },
      { slug: "openshift-basics", title: "OpenShift Basics", status: "" },
    ],
  },

  // Application Development using Microservices and Serverless
  {
    section: "app-dev-using-microservices",
    title: "Application Development using Microservices and Serverless",
    number: "12",
    topics: [
      { slug: "intro-to-microservices", title: "Introduction to Microservices", status: "" },
      { slug: "restapi-and-graphql", title: "Web API Essentials: REST API and GraphQL", status: "" },
      { slug: "serverless-overview", title: "Serverless Overview", status: "" },
      { slug: "deployment-in-microservices", title: "Create and Deploy Microservices using Serverless", status: "" },
    ],
  },

  // Generative AI
  {
    section: "generative-ai",
    title: "Generative AI",
    number: "12",
    topics: [
      { slug: "gen-ai-basic-software-development", title: "Gen AI basic for software development", status: "" },
      { slug: "gen-ai-for-software-architecture-and-code-generation", title: "Gen AI for Software Architecture and Code Generation", status: "" },
      { slug: "gen-ai-for-software-development-and-its-considerations", title: "Gen AI for Software Development Workflows and Its Considerations", status: "" },
      { slug: "agentic-ai-and-vibe-coding", title: "Agentic AI & Vibe Coding", status: "" },
    ],
  },

  // Operating System
  {
    section: "operating-system",
    title: "Operating System",
    number: "13",
    topics: [
      {slug: "operating-system", title: "Operating Systems"}
    ]
  },

  // Computer organization and architecture
  {
    section: "computer-organization-and-architecture",
    title: "Computer Organization & Architecture",
    number: "14",
    topics: [
      {slug: "computer-organization-and-architecture", title: "Computer Organization & Architecture"}
    ]
  },
  

  // 
  {
    section: "interview",
    title: "Interview Questions",
    number: "15",
    topics: [
      { slug: "interview-questions", title: "Interview Questions", status: "" },
    ],
  },
];

// Returns every topic in a section, regardless of whether that section uses
// flat `topics` or nested `modules` (each module has its own `topics`).
export function getSectionTopics(section) {
  if (section.modules) {
    return section.modules.flatMap((m) => m.topics);
  }
  return section.topics || [];
}

export function getAllTopicsFlat() {
  return NAV.flatMap((s) =>
    getSectionTopics(s).map((t) => ({ ...t, section: s.section, sectionTitle: s.title }))
  );
}

export function findAdjacentTopics(section, slug) {
  const flat = getAllTopicsFlat();
  const idx = flat.findIndex((t) => t.section === section && t.slug === slug);
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}