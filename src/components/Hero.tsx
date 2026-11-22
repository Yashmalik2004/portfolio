"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Download, Github, Linkedin } from "lucide-react";
import { profile, skills } from "@/data/portfolio";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const btn = "inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5";
const ease = [0.22, 1, 0.36, 1] as const;
const up = (d: number) => ({
  initial: { opacity: 0, y: 30, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.8, delay: d, ease },
});

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(124,58,237,0.28),transparent)]" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-3/5 opacity-70 md:block" aria-hidden>
        <Scene />
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.p {...up(0.1)} className="text-lg text-zinc-400">Hi, I&apos;m</motion.p>
          <motion.h1 {...up(0.2)} className="grad-text text-6xl font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
            {profile.name}
          </motion.h1>
          <motion.p {...up(0.35)} className="mt-5 text-xl text-zinc-200 sm:text-2xl">{profile.role}</motion.p>
          <motion.p {...up(0.5)} className="mt-4 max-w-xl text-zinc-400">{profile.intro}</motion.p>
          <motion.div {...up(0.65)} className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className={`${btn} bg-violet text-white shadow-[0_0_30px_-6px_#a855f7] hover:bg-purple-500`}>View projects</a>
            <a href={profile.resume} download className={`${btn} border border-line text-zinc-200 hover:border-violet`}><Download size={16} />Download resume</a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={`${btn} border border-line px-3.5 text-zinc-300 hover:border-violet`}><Github size={18} /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={`${btn} border border-line px-3.5 text-zinc-300 hover:border-violet`}><Linkedin size={18} /></a>
          </motion.div>
        </div>
        <motion.div {...up(0.8)} className="hidden rounded-2xl border border-line bg-panel/80 p-5 font-mono text-[13px] leading-6 backdrop-blur lg:block">
          <div className="mb-3 flex items-center gap-2" aria-hidden>
            <i className="h-3 w-3 rounded-full bg-red-500" /><i className="h-3 w-3 rounded-full bg-yellow-500" /><i className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-2 text-zinc-500">engineer.ts</span>
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap text-zinc-300">{`const yash = {
  role: "AI Engineer",
  focus: "Agentic AI & Intelligent Systems",
  specialties: [
    "Multi-Agent Systems",
    "Real-Time Voice AI",
    "Geospatial Intelligence"
  ],
  stack: [
    "Python",
    "LangGraph",
    "LangChain",
    "LiveKit"
  ],
  architecture: ["RAG", "Tool Calling", "Stateful Workflows"],
  achievement: "1st Place — NIT Hamirpur Hackathon 2025",
  graduating: "B.Tech CSE · 2027",
};`}</pre>
        </motion.div>
      </div>
    </section>
  );
}
