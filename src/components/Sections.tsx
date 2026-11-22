"use client";
import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Award, Github, Mail, X } from "lucide-react";
import Reveal from "./Reveal";
import { achievements, education, experience, profile, projects, skills, stats } from "@/data/portfolio";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal><h2 className="mb-12 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h2></Reveal>
        {children}
      </div>
    </section>
  );
}

const chip = "rounded-full border border-line bg-white/[0.03] px-3 py-1 font-mono text-xs text-zinc-300";

export function About() {
  return (
    <Section id="about" title="About me">
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="max-w-prose text-lg leading-relaxed text-zinc-300">
            I&apos;m a B.Tech student in Computer Science and Engineering at {education.school.split(",")[0]}. I focus on agentic AI:
            systems where specialised LLM agents plan, decide and build together, backed by FastAPI, Node.js and React.
          </p>
          <p className="mt-4 max-w-prose text-zinc-400">
            I also work in machine learning and computer vision, and I practise problem solving on LeetCode, GeeksForGeeks and Codeforces.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.profiles.map((p) => (
              <a key={p.label} href={p.href} target="_blank" rel="noreferrer" className={`${chip} hover:border-violet`}>{p.label}</a>
            ))}
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-line bg-panel/60 p-5 transition-colors hover:border-violet/60">
                <div className="grad-text text-4xl font-bold">{s.value}</div>
                <div className="mt-2 text-sm text-zinc-400">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal className="mt-14">
        <div className="rounded-2xl border border-line bg-panel/60 p-6">
          <h3 className="text-lg font-medium text-white">{education.degree}</h3>
          <p className="mt-1 text-zinc-400">{education.school} · {education.period} · {education.cgpa}</p>
          <div className="mt-4 flex flex-wrap gap-2">{education.courses.map((c) => <span key={c} className={chip}>{c}</span>)}</div>
        </div>
      </Reveal>
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={(i % 3) * 0.08}>
            <div className="group h-full rounded-2xl border border-line bg-panel/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet/60 hover:shadow-[0_10px_40px_-15px_#a855f7]">
              <h3 className="mb-4 font-medium text-white">{g.group}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => <span key={s} className={`${chip} transition-colors group-hover:border-violet/40`}>{s}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="relative ml-3 border-l border-line">
        {experience.map((e) => (
          <li key={e.company} className="relative pb-4 pl-8">
            <span className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full bg-violet shadow-[0_0_14px_#a855f7]" aria-hidden />
            <Reveal>
              <h3 className="text-xl font-medium text-white">{e.role} <span className="text-zinc-400">at {e.company}</span></h3>
              <p className="mt-1 font-mono text-sm text-zinc-500">{e.place} · {e.period}</p>
              <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-zinc-300 marker:text-violet">
                {e.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">{e.tech.map((t) => <span key={t} className={chip}>{t}</span>)}</div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Tilt({ children, onClick, label }: { children: React.ReactNode; onClick: () => void; label: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 150, damping: 20 };
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), spring);
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), spring);
  return (
    <motion.button
      type="button" onClick={onClick} aria-label={label}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="group relative h-full w-full rounded-2xl border border-line bg-panel/70 p-7 text-left transition-colors hover:border-violet/70"
    >
      {children}
    </motion.button>
  );
}

export function Projects() {
  const [sel, setSel] = useState<number | null>(null);
  const p = sel === null ? null : projects[sel];
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((pr, i) => (
          <Reveal key={pr.name} delay={i * 0.1}>
            <Tilt onClick={() => setSel(i)} label={`Open details for ${pr.name}`}>
              <ArrowUpRight className="absolute right-6 top-6 text-zinc-600 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-violet" size={22} />
              <h3 className="max-w-[85%] text-2xl font-semibold text-white">{pr.name}</h3>
              <p className="mt-3 text-zinc-400">{pr.short}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {pr.stack.map((s) => <span key={s} className={`${chip} transition-transform group-hover:-translate-y-0.5`}>{s}</span>)}
              </div>
              <span className="mt-6 inline-block text-sm text-violet opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">View details</span>
            </Tilt>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {p && (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSel(null)}
            onKeyDown={(e) => e.key === "Escape" && setSel(null)}
          >
            <motion.div
              role="dialog" aria-modal="true" aria-label={p.name}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-panel p-7"
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-semibold text-white">{p.name}</h3>
                <button autoFocus onClick={() => setSel(null)} aria-label="Close" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-zinc-300"><X size={18} /></button>
              </div>
              <p className="mt-4 text-zinc-300"><span className="text-white">Problem: </span>{p.problem}</p>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-zinc-300 marker:text-violet">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <div className="mt-6 flex flex-wrap gap-2">{p.stack.map((s) => <span key={s} className={chip}>{s}</span>)}</div>
              <a href={profile.github} target="_blank" rel="noreferrer" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-violet px-5 text-sm font-medium text-white"><Github size={16} />View on GitHub</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

export function Achievements() {
  return (
    <Section id="achievements" title="Achievements">
      <div className="grid gap-4 md:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={(i % 2) * 0.08}>
            <div className="h-full rounded-2xl border border-line bg-panel/60 p-6 transition-all hover:-translate-y-1 hover:border-violet/60">
              <Award className="mb-4 text-violet" size={22} />
              <h3 className="font-medium text-white">{a.title}</h3>
              <p className="mt-1 font-mono text-xs text-zinc-500">{a.meta}</p>
              {a.text && <p className="mt-3 text-sm text-zinc-400">{a.text}</p>}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const field = "mt-1.5 w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-white placeholder:text-zinc-600 focus:border-violet";

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const err: Record<string, string> = {};
    if (!d.name?.trim()) err.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(d.email ?? "")) err.email = "Enter a valid email address.";
    if ((d.message ?? "").trim().length < 10) err.message = "Write at least 10 characters.";
    setErrors(err);
    if (Object.keys(err).length) return;
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    if (!endpoint) {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio message from ${d.name}`)}&body=${encodeURIComponent(`${d.message}\n\n${d.name} (${d.email})`)}`;
      return;
    }
    setStatus("sending");
    try {
      const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) });
      if (!r.ok) throw new Error();
      setStatus("sent");
      e.currentTarget.reset();
    } catch { setStatus("error"); }
  }

  return (
    <Section id="contact" title="Get in touch">
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="max-w-md text-lg text-zinc-300">Open to internships and projects in AI, machine learning and backend engineering.</p>
          <div className="mt-6 space-y-3">
            <a href={`mailto:${profile.email}`} className="link-u flex w-fit items-center gap-3 text-zinc-200"><Mail size={18} className="text-violet" />{profile.email}</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="link-u flex w-fit items-center gap-3 text-zinc-200"><Github size={18} className="text-violet" />github.com/Yashmalik2004</a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form onSubmit={submit} noValidate className="space-y-5">
            {(["name", "email"] as const).map((n) => (
              <div key={n}>
                <label htmlFor={n} className="text-sm text-zinc-400">{n === "name" ? "Name" : "Email"}</label>
                <input id={n} name={n} type={n === "email" ? "email" : "text"} autoComplete={n} className={field} aria-invalid={!!errors[n]} aria-describedby={errors[n] ? `${n}-e` : undefined} />
                {errors[n] && <p id={`${n}-e`} className="mt-1 text-sm text-red-400">{errors[n]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="message" className="text-sm text-zinc-400">Message</label>
              <textarea id="message" name="message" rows={5} className={field} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-e" : undefined} />
              {errors.message && <p id="message-e" className="mt-1 text-sm text-red-400">{errors.message}</p>}
            </div>
            <button disabled={status === "sending"} className="min-h-11 rounded-full bg-violet px-6 text-sm font-medium text-white transition-all hover:-translate-y-0.5 disabled:opacity-60">
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            <p role="status" className="text-sm text-zinc-400">
              {status === "sent" && "Message sent. I'll reply by email."}
              {status === "error" && `Couldn't send the message. Email ${profile.email} instead.`}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
