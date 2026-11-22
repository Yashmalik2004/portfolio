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

export const projects = [
  {
    name: "Procurement Intelligence Agent",
    short: "Four cooperating agents that automate the Source-to-Pay workflow.",
    problem: "Supplier scoring, approval routing and procurement analytics are slow, manual and hard to audit.",
    features: [
      "4-agent system for supplier scoring, approval routing, process discovery and analytics",
      "RAG-powered evaluation across 5 procurement dimensions, retrieving up to 10 chunks with ChromaDB and Sentence Transformers",
      "Policy-based approvals with GPT-OSS 120B; 11+ operational tables with audit and metrics tracking",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "ChromaDB", "React", "SQLite"],
  },
  {
    name: "Chef — AI Software Engineering Assistant",
    short: "Turns a plain-language prompt into a complete software project.",
    problem: "Going from an idea to a structured, working codebase takes planning, design and a lot of repetitive coding.",
    features: [
      "Planner, Architect and Coder agents orchestrated with LangGraph for planning, task decomposition and iterative code generation",
      "Groq LLMs, LangChain and tool calling generate and manage 100+ project files",
      "Real-time workflow streaming while the agents work",
    ],
    stack: ["Python", "LangGraph", "LangChain", "Groq LLMs"],
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
