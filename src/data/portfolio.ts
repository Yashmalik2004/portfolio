export const profile = {
  name: "Yash Malik",
  role: "Computer Science Engineer · Agentic AI & Machine Learning",
  intro:
    "I build multi-agent AI systems and the backends around them. Winner of the NIT Hamirpur Hackathon 2025, currently completing a B.Tech in Computer Science.",
  email: "yashmalik4832004two@gmail.com",
  github: "https://github.com/Yashmalik2004",
  linkedin: "https://linkedin.com/in/yash-malik-a03559322",
  resume: "/Yash_Malik_Resume.pdf",
  profiles: [
    { label: "LeetCode", href: "https://leetcode.com/YashMalik004" },
    { label: "GeeksForGeeks", href: "https://www.geeksforgeeks.org/user/YashMalik004" },
    { label: "Codeforces", href: "https://codeforces.com/profile/YashMalik004" },
  ],
};

export const stats = [
  { value: "1st", label: "NIT Hamirpur Hackathon 2025" },
  { value: "2", label: "Agentic AI projects shipped" },
  { value: "96.4%", label: "Accuracy, Liver Cirrhosis model" },
  { value: "8.46", label: "CGPA (out of 10)" },
];

export const skills = [
  { group: "Languages", items: ["C++", "Python", "JavaScript", "Java"] },
  { group: "AI / ML", items: ["LangChain", "LangGraph", "YOLO", "OpenCV", "Machine Learning"] },
  { group: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT"] },
  { group: "Frontend", items: ["React.js", "HTML5", "CSS3"] },
  { group: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase"] },
  { group: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "Google Cloud", "GitHub Actions"] },
  { group: "Tools", items: ["Git", "GitHub", "Postman", "VS Code", "Excel", "Power BI"] },
];

export const experience = [
  {
    company: "Unified Mentor",
    role: "Machine Learning Intern Trainee",
    period: "2025",
    place: "Remote",
    points: [
      "Developed 3 machine learning models with Scikit-learn, Pandas and NumPy for fraud detection, medical diagnosis and computer vision.",
      "Applied preprocessing, feature engineering, hyperparameter tuning and cross-validation, reaching 96.4% accuracy on the Liver Cirrhosis prediction model.",
      "Delivered 3 end-to-end solutions: Fraud Detection, Liver Cirrhosis Stage Prediction and ASL Detection.",
    ],
    tech: ["Scikit-learn", "Pandas", "NumPy"],
  },
];

export type Project = {
  id: "chef" | "voice" | "cropie";
  no: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  /** Single accent colour that drives the project's visual identity. */
  accent: string;
  summary: string;
  overview: string;
  problem: string;
  /** Figures taken directly from the project write-up — no invented metrics. */
  metrics: { value: string; label: string }[];
  architecture: { title: string; detail: string }[];
  implementation: string[];
  highlights: string[];
  stack: string[];
  /** Only fill these with real, verified URLs. Empty means the button is hidden. */
  links: { github?: string; demo?: string };
};

export const projects: Project[] = [
  {
    id: "chef",
    no: "01",
    name: "Chef",
    tagline: "AI Software Engineering Assistant",
    category: "Agentic AI / Multi-Agent Systems",
    year: "2026",
    accent: "#a855f7",
    summary:
      "An agentic software engineer that turns natural-language requirements into complete software projects. Three specialised agents (Planner, Architect and Coder) work together through a stateful LangGraph workflow.",
    overview:
      "Chef is an agentic AI software engineering assistant. Instead of answering a prompt with a single block of code, it runs a collaborative three-agent workflow: a Planner analyses the requirement and breaks it into actionable tasks, an Architect designs the structure and implementation approach, and a Coder generates and modifies the project files. Progress from every stage streams to an interactive interface in real time.",
    problem:
      "Going from an idea to a structured, working codebase takes requirement analysis, architecture design and a lot of repetitive implementation. A single chat-style LLM reply doesn't plan, design or manage a multi-file project, so Chef splits that work between specialised agents that share state.",
    metrics: [
      { value: "3", label: "Collaborating agents" },
      { value: "100+", label: "Project files managed" },
      { value: "Live", label: "Workflow streaming" },
    ],
    architecture: [
      { title: "Requirement intake", detail: "A natural-language requirement enters the LangGraph workflow as the initial shared state." },
      { title: "Planner Agent", detail: "Analyses the requirement, works out the problem and breaks the request into actionable tasks." },
      { title: "Architect Agent", detail: "Designs the software architecture, decides the project structure and defines the implementation approach." },
      { title: "Coder Agent", detail: "Generates and modifies project files through tool calling, working iteratively through the planned tasks." },
      { title: "Streaming state", detail: "Multi-agent state exposes planning, architecture and code-generation progress through an interactive interface in real time." },
    ],
    implementation: [
      "Collaborative three-agent architecture built with LangGraph",
      "Automated requirement analysis, architecture design, task decomposition and iterative code generation",
      "Groq LLMs integrated with LangChain and tool calling",
      "Stateful workflow orchestration across all three agents",
      "Real-time workflow streaming to the application interface",
    ],
    highlights: [
      "Planner → Architect → Coder pipeline orchestrated as a LangGraph state graph",
      "Autonomous creation, updating and management of 100+ project files",
      "Multi-agent state management exposes each stage's progress live",
      "Tool calling lets agents act on the file system instead of only generating text",
    ],
    stack: ["Python", "LangGraph", "LangChain", "Groq LLMs", "Agentic AI", "Tool Calling", "Stateful Workflow Orchestration"],
    links: { github: "https://github.com/Yashmalik2004/Chef" },
  },
  {
    id: "voice",
    no: "02",
    name: "Voice AI Agent",
    tagline: "Real-Time AI Voice Support",
    category: "Conversational AI / Voice AI / RAG",
    year: "2026",
    accent: "#60a5fa",
    summary:
      "A real-time voice support platform for e-commerce. Customers talk to it in the browser about orders, returns and products, and it replies through a streaming STT → LLM → TTS pipeline grounded in live data.",
    overview:
      "Voice AI Agent is a browser-based voice support platform built with LiveKit and Python. Customers hold natural spoken conversations about order tracking, returns and product questions. Speech streams through Deepgram, OpenAI and Cartesia. The LLM can call tools against order data and retrieve policy context with RAG, and a FastAPI backend handles sessions, auth and persistence.",
    problem:
      "E-commerce support questions such as \"where is my order?\", \"how do I return this?\" and \"what's the policy?\" are repetitive, but answering them by voice is hard. Replies must arrive fast enough to feel conversational, stay grounded in real order data and store policy, and cope with people interrupting mid-sentence.",
    metrics: [
      { value: "0.7s", label: "Endpointing" },
      { value: "4", label: "LLM function tools" },
      { value: "10 min", label: "LiveKit JWT lifetime" },
    ],
    architecture: [
      { title: "Browser ↔ LiveKit", detail: "Users join a LiveKit room from the browser using short-lived 10-minute JWTs." },
      { title: "Voice activity & turns", detail: "Silero VAD with turn detection and 0.7-second endpointing; barge-in lets users interrupt the agent mid-reply." },
      { title: "Speech-to-text", detail: "Deepgram transcribes the user's speech as a stream." },
      { title: "LLM + tools + RAG", detail: "OpenAI reasons over the conversation, calls four function tools and grounds answers with OpenAI embeddings in PostgreSQL pgvector." },
      { title: "Text-to-speech", detail: "Cartesia synthesises the response and streams it back into the room." },
      { title: "Backend & deployment", detail: "FastAPI with SQLAlchemy and PostgreSQL, API rate limiting, internal API auth, persistent voice sessions, Docker deployment." },
    ],
    implementation: [
      "Three-stage streaming STT–LLM–TTS pipeline integrating Deepgram, OpenAI and Cartesia",
      "Four LLM function-calling tools: order status retrieval, customer order lookup, return initiation and policy retrieval",
      "Retrieval-Augmented Generation with OpenAI embeddings and PostgreSQL pgvector",
      "FastAPI backend with SQLAlchemy and PostgreSQL",
      "10-minute LiveKit JWTs, API rate limiting and internal API authentication",
      "Persistent voice sessions and Docker-based deployment",
    ],
    highlights: [
      "Streaming STT → LLM → TTS pipeline: Deepgram, OpenAI and Cartesia",
      "Silero VAD turn detection with 0.7s endpointing and real-time barge-in",
      "Four function-calling tools plus pgvector RAG for grounded answers",
      "Production concerns built in: short-lived JWTs, rate limiting, internal auth, Docker",
    ],
    stack: ["Python", "LiveKit", "OpenAI", "Deepgram", "Silero VAD", "Cartesia", "FastAPI", "PostgreSQL", "SQLAlchemy", "pgvector", "Docker"],
    links: { github: "https://github.com/Yashmalik2004/Voice-Assistant" },
  },
  {
    id: "cropie",
    no: "03",
    name: "Cropie",
    tagline: "AI-Powered Crop Health Prediction & Monitoring",
    category: "AI / Geospatial Intelligence / Precision Agriculture",
    year: "2026",
    accent: "#34d399",
    summary:
      "A satellite-driven precision agriculture platform. Google Earth Engine and TensorFlow power NDVI analysis, crop-health monitoring, yield forecasting and agricultural risk assessment through an eight-stage geospatial ML pipeline.",
    overview:
      "Cropie monitors agricultural regions from orbit. It acquires satellite imagery through Google Earth Engine, computes NDVI and runs TensorFlow inference to sort land into healthy, moderate and stressed zones. It then forecasts yield and generates recommendations. Monitoring re-runs every two days, compares against history to detect change and raises alerts when crop health shifts significantly.",
    problem:
      "Spotting crop stress early across a whole agricultural region is hard to do on the ground. Cropie uses satellite data to watch fields continuously, show where crop health is varying and turn that into yield forecasts, risk signals and recommendations.",
    metrics: [
      { value: "8", label: "Pipeline stages" },
      { value: "99,540", label: "Valid pixels analysed" },
      { value: "2-day", label: "Reprocessing cycle" },
    ],
    architecture: [
      { title: "Satellite acquisition", detail: "Imagery for the agricultural region is retrieved through Google Earth Engine." },
      { title: "Image preprocessing", detail: "Imagery is prepared for analysis at 315 × 316 spatial resolution, with 99,540 valid pixels." },
      { title: "NDVI computation", detail: "The vegetation index is derived from the processed imagery." },
      { title: "ML inference", detail: "TensorFlow models run over the NDVI and imagery features." },
      { title: "Crop-health classification", detail: "The region is segmented into three zones: healthy, moderate and stressed." },
      { title: "Yield prediction", detail: "Yield is forecast from the classified crop-health data." },
      { title: "Visualisation", detail: "Interactive farm mapping with historical comparisons and change detection." },
      { title: "Recommendations", detail: "Recommendations are generated, with alerts for significant crop-health variations." },
    ],
    implementation: [
      "Satellite-driven agricultural monitoring platform built on Google Earth Engine and TensorFlow",
      "Eight-stage geospatial ML pipeline, from satellite acquisition to recommendation generation",
      "Automated crop monitoring with a two-day reprocessing cycle",
      "Historical comparisons and change detection",
      "Interactive farm mapping in a React front end with a Node.js and MongoDB back end",
      "Alert generation for significant crop-health variations",
    ],
    highlights: [
      "315 × 316 imagery with 99,540 valid pixels segmented into three health zones",
      "Eight-stage pipeline: acquisition → NDVI → ML inference → yield → recommendations",
      "Automated two-day reprocessing with historical change detection",
      "Alerts generated when crop health varies significantly",
    ],
    stack: ["Python", "TensorFlow", "Google Earth Engine", "React", "Node.js", "MongoDB"],
    links: { github: "https://github.com/Yashmalik2004/cropie" },
  },
];

export const achievements = [
  {
    title: "NIT Hackathon 2025 — 1st Position",
    meta: "NIT Hamirpur, Himachal Pradesh · 2025",
    text: "Built an AI violence-detection system with YOLO and OpenCV that monitors real-time CCTV feeds, with a 4-member team in 58 hours.",
  },
  {
    title: "Smart India Hackathon — Internal Finalist",
    meta: "K.R. Mangalam University · 2024",
    text: "Engineered Suraksha Yaatri, a tourist safety app with GPS tracking, emergency SOS and real-time alerts.",
  },
  { title: "NPTEL — Database Management Systems", meta: "Certification", text: "" },
  { title: "NPTEL — Machine Learning", meta: "Certification", text: "" },
];

export const education = {
  degree: "B.Tech in Computer Science and Engineering",
  school: "K.R. Mangalam University, Gurugram, Haryana",
  period: "Aug 2023 – Jul 2027 (expected)",
  cgpa: "CGPA 8.46 / 10",
  courses: ["Data Structures & Algorithms", "Operating Systems", "Computer Networks", "Database Management Systems", "Artificial Intelligence", "Machine Learning"],
};

export const nav = ["Home", "About", "Skills", "Experience", "Projects", "Achievements", "Contact"] as const;
