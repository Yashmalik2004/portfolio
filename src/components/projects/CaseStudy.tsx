"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Github, X } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { ProjectVisual } from "./Visuals";

const SECTIONS = [
  ["overview", "Overview"],
  ["problem", "Problem"],
  ["architecture", "Architecture"],
  ["implementation", "Implementation"],
  ["stack", "Stack"],
  ["highlights", "Highlights"],
] as const;

const h = "mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500";

/** Full-screen case-study overlay with focus trap, Esc to close and prev/next navigation. */
export default function CaseStudy({
  project: p, onClose, onPrev, onNext,
}: { project: Project; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const titleId = `cs-${p.id}-title`;

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; prevFocus?.focus?.(); };
  }, []);

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
    box.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
  }, [p.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key !== "Tab" || !box.current) return;
      const f = box.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const jump = (id: string) => {
    const el = box.current?.querySelector<HTMLElement>(`#cs-${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[60] bg-ink/85 backdrop-blur-md"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <div ref={scroller} className="h-full overflow-y-auto overscroll-contain px-4 py-6 sm:px-6 sm:py-10">
        <motion.div
          ref={box}
          role="dialog" aria-modal="true" aria-labelledby={titleId}
          style={{ "--acc": p.accent } as CSSProperties}
          className="relative mx-auto max-w-6xl rounded-[4px] border border-white/[0.08] bg-[#0b0814] shadow-[0_40px_120px_-40px_rgba(0,0,0,.9)]"
          initial={{ opacity: 0, y: 40, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)` }} />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-20" style={{ background: `radial-gradient(60% 100% at 50% 0%, ${p.accent}, transparent)` }} />

          {/* header */}
          <header className="relative flex items-start justify-between gap-4 border-b border-white/[0.06] p-5 sm:p-8">
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: p.accent }}>
                Case study {p.no} <span className="text-zinc-600">/ 03</span> · {p.year}
              </p>
              <h3 id={titleId} className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">{p.name}</h3>
              <p className="mt-2 text-lg text-zinc-300 sm:text-xl">{p.tagline}</p>
              <p className="mt-3 font-mono text-xs text-zinc-500">{p.category}</p>
            </div>
            <button
              data-autofocus type="button" onClick={onClose} aria-label="Close case study"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-[3px] border border-white/10 text-zinc-300 transition-colors hover:border-[color:var(--acc)] hover:text-white"
            >
              <X size={18} />
            </button>
          </header>

          <div className="relative grid gap-10 p-5 sm:p-8 lg:grid-cols-[180px_1fr]">
            {/* section index */}
            <nav aria-label="Case study sections" className="hidden lg:block">
              <ol className="sticky top-6 space-y-1 border-l border-white/[0.08] font-mono text-xs">
                {SECTIONS.map(([id, label], i) => (
                  <li key={id}>
                    <button type="button" onClick={() => jump(id)} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-left text-zinc-500 transition-colors hover:border-[color:var(--acc)] hover:text-white">
                      <span className="mr-2 text-zinc-700">{String(i + 1).padStart(2, "0")}</span>{label}
                    </button>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="min-w-0 space-y-14">
              <ProjectVisual project={p} />

              <section id="cs-overview" className="scroll-mt-6">
                <h4 className={h}><span style={{ color: p.accent }}>01</span> Overview</h4>
                <p className="max-w-3xl text-lg leading-relaxed text-zinc-200">{p.overview}</p>
                <dl className="mt-8 grid grid-cols-3 border-y border-white/[0.06]">
                  {p.metrics.map((m, i) => (
                    <div key={m.label} className={`flex flex-col-reverse py-5 ${i ? "border-l border-white/[0.06] pl-4 sm:pl-6" : ""}`}>
                      <dt className="mt-1 text-xs text-zinc-500 sm:text-sm">{m.label}</dt>
                      <dd className="text-2xl font-semibold text-white sm:text-3xl">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section id="cs-problem" className="scroll-mt-6">
                <h4 className={h}><span style={{ color: p.accent }}>02</span> Problem</h4>
                <p className="max-w-3xl border-l-2 pl-5 leading-relaxed text-zinc-300" style={{ borderColor: p.accent }}>{p.problem}</p>
              </section>

              <section id="cs-architecture" className="scroll-mt-6">
                <h4 className={h}><span style={{ color: p.accent }}>03</span> Technical architecture</h4>
                <ol className="relative grid gap-3 sm:grid-cols-2">
                  {p.architecture.map((s, i) => (
                    <li key={s.title} className="group relative rounded-[3px] border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-[color:var(--acc)]">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs" style={{ color: p.accent }}>{String(i + 1).padStart(2, "0")}</span>
                        <span className="font-medium text-white">{s.title}</span>
                      </div>
                      <p className="mt-2 pl-8 text-sm leading-relaxed text-zinc-400">{s.detail}</p>
                    </li>
                  ))}
                </ol>
              </section>

              <section id="cs-implementation" className="scroll-mt-6">
                <h4 className={h}><span style={{ color: p.accent }}>04</span> Core implementation</h4>
                <ul className="max-w-3xl space-y-3">
                  {p.implementation.map((t) => (
                    <li key={t} className="flex gap-3 text-zinc-300"><span className="mt-[3px] font-mono text-xs" style={{ color: p.accent }}>▸</span>{t}</li>
                  ))}
                </ul>
              </section>

              <section id="cs-stack" className="scroll-mt-6">
                <h4 className={h}><span style={{ color: p.accent }}>05</span> Technology stack</h4>
                <ul className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li key={s} className="rounded-[3px] border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-zinc-200">{s}</li>
                  ))}
                </ul>
              </section>

              <section id="cs-highlights" className="scroll-mt-6">
                <h4 className={h}><span style={{ color: p.accent }}>06</span> Engineering highlights</h4>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {p.highlights.map((t, i) => (
                    <li key={t} className="rounded-[3px] border-t border-white/[0.08] pt-4 text-zinc-300">
                      <span className="mb-2 block font-mono text-xs text-zinc-600">H{i + 1}</span>{t}
                    </li>
                  ))}
                </ul>
              </section>

              {(p.links.github || p.links.demo) && (
                <div className="flex flex-wrap gap-3">
                  {p.links.github && (
                    <a href={p.links.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-[3px] px-5 text-sm font-medium text-white" style={{ background: p.accent }}>
                      <Github size={16} />Source code
                    </a>
                  )}
                  {p.links.demo && (
                    <a href={p.links.demo} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-white/15 px-5 text-sm font-medium text-white hover:border-[color:var(--acc)]">
                      <ExternalLink size={16} />Live demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <footer className="flex items-center justify-between gap-3 border-t border-white/[0.06] p-4 sm:px-8">
            <button type="button" onClick={onPrev} className="inline-flex min-h-11 items-center gap-2 rounded-[3px] px-3 font-mono text-xs uppercase tracking-[0.14em] text-zinc-400 transition-colors hover:text-white">
              <ArrowLeft size={16} />Previous
            </button>
            <button type="button" onClick={onNext} className="inline-flex min-h-11 items-center gap-2 rounded-[3px] px-3 font-mono text-xs uppercase tracking-[0.14em] text-zinc-400 transition-colors hover:text-white">
              Next<ArrowRight size={16} />
            </button>
          </footer>
        </motion.div>
      </div>
    </motion.div>,
    document.body
  );
}
