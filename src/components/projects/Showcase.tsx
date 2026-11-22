"use client";
import { useCallback, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import Reveal from "../Reveal";
import { projects, type Project } from "@/data/portfolio";
import { ProjectVisual } from "./Visuals";
import CaseStudy from "./CaseStudy";

const ease = [0.22, 1, 0.36, 1] as const;

function ProjectRow({ p, index, onOpen }: { p: Project; index: number; onOpen: () => void }) {
  const flip = index % 2 === 1;
  return (
    <article
      id={`project-${p.id}`}
      aria-labelledby={`project-${p.id}-title`}
      style={{ "--acc": p.accent } as CSSProperties}
      className="relative grid items-start gap-10 lg:grid-cols-12 lg:gap-14"
    >
      <Reveal className={`lg:sticky lg:top-28 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <ProjectVisual project={p} />
      </Reveal>

      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="text-outline font-mono text-6xl font-medium leading-none sm:text-7xl" aria-hidden>{p.no}</span>
            <div className="min-w-0 border-l border-white/10 pl-4 font-mono text-[11px] uppercase leading-5 tracking-[0.16em]">
              <div style={{ color: p.accent }}>{p.category}</div>
              <div className="text-zinc-500">Project {p.no} · {p.year}</div>
            </div>
          </div>

          <h3 id={`project-${p.id}-title`} className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {p.name}
            <span className="mt-1 block text-lg font-normal text-zinc-400 sm:text-xl">{p.tagline}</span>
          </h3>
          <p className="mt-5 leading-relaxed text-zinc-300">{p.summary}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="mt-7 grid grid-cols-3 border-y border-white/[0.07]">
            {p.metrics.map((m, i) => (
              <div key={m.label} className={`flex flex-col-reverse py-4 ${i ? "border-l border-white/[0.07] pl-3 sm:pl-4" : ""}`}>
                <dt className="mt-1 text-[11px] leading-tight text-zinc-500 sm:text-xs">{m.label}</dt>
                <dd className="text-xl font-semibold text-white sm:text-2xl">{m.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 space-y-2.5">
            {p.highlights.slice(0, 3).map((t) => (
              <li key={t} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                <span className="mt-[2px] font-mono text-xs" style={{ color: p.accent }} aria-hidden>▸</span>{t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.16}>
          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={`${p.name} technology stack`}>
            {p.stack.map((s, i) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.035, ease }}
                className="cursor-default rounded-[3px] border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-300 transition-[border-color,color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[color:var(--acc)] hover:text-white hover:shadow-[0_6px_20px_-10px_var(--acc)]"
              >
                {s}
              </motion.li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button" onClick={onOpen}
            className="group inline-flex min-h-11 items-center gap-3 rounded-[3px] border px-5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderColor: `${p.accent}80`, background: `linear-gradient(90deg, ${p.accent}26, transparent)`, boxShadow: `0 0 30px -12px ${p.accent}` }}
          >
            Open case study
            <span className="sr-only">: {p.name}</span>
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: p.accent }} />
          </button>
          {p.links.github && (
            <a
              href={p.links.github} target="_blank" rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-white/10 px-4 text-sm text-zinc-300 transition-colors hover:border-[color:var(--acc)] hover:text-white"
            >
              <Github size={16} />Source<span className="sr-only"> code for {p.name} on GitHub</span>
            </a>
          )}
          {p.links.demo && (
            <a
              href={p.links.demo} target="_blank" rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-white/10 px-4 text-sm text-zinc-300 transition-colors hover:border-[color:var(--acc)] hover:text-white"
            >
              <ExternalLink size={16} />Live demo<span className="sr-only"> of {p.name}</span>
            </a>
          )}
          </div>
        </Reveal>
      </div>
    </article>
  );
}

export default function Projects() {
  const [sel, setSel] = useState<number | null>(null);
  const close = useCallback(() => setSel(null), []);
  const n = projects.length;

  return (
    <section id="projects" className="relative isolate overflow-hidden px-6 py-24 sm:py-32">
      {/* technical backdrop: masked grid + two static ambient lights */}
      <div aria-hidden className="hud-grid pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-violet/10 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-sky/10 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            <span className="h-px w-8 bg-violet" aria-hidden />Projects · selected systems
          </p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-4xl font-semibold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl">
              Engineered<br /><span className="grad-text">Intelligence</span>
            </h2>
            <p className="max-w-sm text-zinc-400">
              Building intelligent systems that turn complex problems into autonomous solutions.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ol className="mt-12 grid grid-cols-3 border-y border-white/[0.07] font-mono text-[11px] uppercase tracking-[0.14em]" aria-label="Project index">
            {projects.map((p, i) => (
              <li key={p.id} className={i ? "border-l border-white/[0.07]" : ""}>
                <a href={`#project-${p.id}`} className="group flex min-h-11 flex-col justify-center gap-1 px-3 py-3 transition-colors hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-start sm:gap-3 sm:px-4">
                  <span style={{ color: p.accent }}>{p.no}</span>
                  <span className="truncate text-zinc-400 transition-colors group-hover:text-white">{p.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-20 space-y-28 sm:mt-24 sm:space-y-36">
          {projects.map((p, i) => <ProjectRow key={p.id} p={p} index={i} onOpen={() => setSel(i)} />)}
        </div>
      </div>

      <AnimatePresence>
        {sel !== null && (
          <CaseStudy
            key="case-study"
            project={projects[sel]}
            onClose={close}
            onPrev={() => setSel((s) => ((s ?? 0) - 1 + n) % n)}
            onNext={() => setSel((s) => ((s ?? 0) + 1) % n)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
