"use client";
import { useId, useState } from "react";
import type { Project } from "@/data/portfolio";
import { Flow, Node, Panel } from "./Hud";

/* ── 01 · Chef: agent orchestration graph ─────────────────────────── */
export function ChefVisual({ accent }: { accent: string }) {
  return (
    <Panel title="agent.graph" status="orchestrating" accent={accent} label="Chef three-agent workflow: Planner, Architect and Coder sharing LangGraph state">
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-2 rounded-[3px] border border-white/[0.08] bg-ink/60 px-3 py-2 font-mono text-[11px] text-zinc-400 sm:text-xs">
          <span style={{ color: accent }}>›</span>
          <span className="truncate">natural-language requirement</span>
          <span className="fx-blink ml-0.5 inline-block h-3.5 w-[7px]" style={{ background: accent }} aria-hidden />
        </div>
        <div className="flex justify-start pl-[16%]"><Flow vertical className="h-6" /></div>

        <div className="flex items-center gap-1 sm:gap-2.5">
          <Node label="PLANNER" sub="analyse · tasks" delay={0} accent={accent} first />
          <Flow className="min-w-2 max-w-10" />
          <Node label="ARCHITECT" sub="structure · design" delay={1.5} accent={accent} />
          <Flow className="min-w-2 max-w-10" />
          <Node label="CODER" sub="generate · edit" delay={3} accent={accent} />
        </div>

        {/* state bus: each agent reads and writes the shared graph state */}
        <div className="relative mt-0 grid grid-cols-3" aria-hidden>
          {[0, 1, 2].map((i) => <div key={i} className="flex justify-center"><Flow vertical className="h-6 opacity-60" /></div>)}
        </div>
        <div className="flex items-center gap-3 rounded-[3px] border border-dashed px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 sm:text-[11px]" style={{ borderColor: `${accent}55` }}>
          <span style={{ color: accent }}>◆</span> shared graph state <span className="ml-auto hidden text-zinc-600 sm:inline">LangGraph</span>
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div aria-hidden className="grid flex-1 grid-cols-[repeat(16,minmax(0,1fr))] gap-1 sm:grid-cols-[repeat(24,minmax(0,1fr))]">
            {Array.from({ length: 48 }, (_, i) => (
              <span
                key={i}
                className={`fx-fill aspect-square rounded-[1px] ${i >= 32 ? "hidden sm:block" : ""}`}
                style={{ background: i % 7 === 3 ? accent : `${accent}66`, animationDelay: `${(i * 0.09).toFixed(2)}s` }}
              />
            ))}
          </div>
          <div className="shrink-0 text-right font-mono text-[10px] leading-4 text-zinc-500 sm:text-[11px]">
            <div className="text-white">100+</div>project files
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ── 02 · Voice AI: streaming speech pipeline ─────────────────────── */
// Round generated geometry so server (Node) and browser render identical strings;
// Math.sin can differ in the last digits between engines and break hydration.
const r2 = (n: number) => Math.round(n * 100) / 100;

const BARS = Array.from({ length: 56 }, (_, i) => {
  const env = Math.sin((i / 55) * Math.PI); // louder in the middle, like a phrase
  const h = 0.25 + 0.75 * env * (0.55 + 0.45 * Math.abs(Math.sin(i * 1.7)));
  return { h, d: (0.9 + ((i * 7) % 5) * 0.12).toFixed(2), o: (-((i * 0.137) % 1.2)).toFixed(2) };
});

export function VoiceVisual({ accent }: { accent: string }) {
  const gid = `vw${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <Panel title="livekit.room" status="● live" accent={accent} label="Voice AI streaming pipeline: speech to text, language model with tools and retrieval, text to speech">
      <div className="p-4 sm:p-6">
        <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
          <span>user audio · VAD</span><span>endpoint 0.7s</span>
        </div>
        <svg viewBox="0 0 560 96" className="h-20 w-full sm:h-24" aria-hidden preserveAspectRatio="none">
          <defs>
            <linearGradient id={gid} x1="0" x2="1">
              <stop offset="0" stopColor={accent} stopOpacity=".35" />
              <stop offset=".5" stopColor={accent} />
              <stop offset="1" stopColor="#a855f7" stopOpacity=".6" />
            </linearGradient>
          </defs>
          <line x1="0" x2="560" y1="48" y2="48" stroke="rgba(255,255,255,.08)" />
          {BARS.map((b, i) => (
            <rect
              key={i} className="fx-eq" x={i * 10 + 2} width="5" rx="2.5"
              y={r2(48 - 44 * b.h)} height={r2(88 * b.h)} fill={`url(#${gid})`}
              style={{ animationDuration: `${b.d}s`, animationDelay: `${b.o}s` }}
            />
          ))}
        </svg>

        <div className="mt-5 flex items-center gap-1 sm:gap-2.5">
          <Node label="STT" sub="Deepgram" delay={0} accent={accent} first />
          <Flow className="min-w-2 max-w-10" />
          <Node label="LLM" sub="OpenAI" delay={1.5} accent={accent} />
          <Flow className="min-w-2 max-w-10" />
          <Node label="TTS" sub="Cartesia" delay={3} accent={accent} />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-1.5">
            {["order status", "order lookup", "start return", "policy"].map((t) => (
              <span key={t} className="rounded-[3px] border border-white/10 bg-ink/60 px-2 py-1 font-mono text-[10px] text-zinc-400">
                <span style={{ color: accent }}>ƒ</span> {t}
              </span>
            ))}
          </div>
          <div className="flex gap-1.5 font-mono text-[10px]">
            <span className="rounded-[3px] border px-2 py-1 text-zinc-300" style={{ borderColor: `${accent}55` }}>RAG · pgvector</span>
            <span className="rounded-[3px] border px-2 py-1 text-zinc-300" style={{ borderColor: `${accent}55` }}>barge-in</span>
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ── 03 · Cropie: NDVI field map ──────────────────────────────────── */
const ZONES = [
  { key: "healthy", label: "Healthy", color: "#4ade80" },
  { key: "moderate", label: "Moderate", color: "#facc15" },
  { key: "stressed", label: "Stressed", color: "#f87171" },
] as const;
type Zone = (typeof ZONES)[number]["key"];

const COLS = 28, ROWS = 15, CELL = 20;
// Deterministic pseudo-NDVI field (illustrative, not project data) so SSR and client match.
const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const x = i % COLS, y = Math.floor(i / COLS);
  const v = Math.sin(x * 0.42) * 0.6 + Math.cos(y * 0.55 + x * 0.12) * 0.5 + Math.sin((x + y) * 0.9) * 0.18;
  const zone: Zone = v > 0.2 ? "healthy" : v > -0.35 ? "moderate" : "stressed";
  return { x, y, zone, o: r2(0.16 + 0.3 * Math.abs(Math.sin(x * 3.1 + y * 1.7))) };
});
const STAGES = ["acquire", "preprocess", "ndvi", "inference", "classify", "yield", "visualise", "recommend"];

export function CropieVisual({ accent }: { accent: string }) {
  const [focus, setFocus] = useState<Zone | null>(null);
  const colorOf = (z: Zone) => ZONES.find((k) => k.key === z)!.color;
  return (
    <Panel title="ndvi.scan" status="2-day cycle" accent={accent} label="Cropie illustrative NDVI crop-health map with healthy, moderate and stressed zones">
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        <svg viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`} className="block h-auto w-full" role="img" aria-label="Illustrative crop-health heatmap">
          <rect width="100%" height="100%" fill="#06100c" />
          {CELLS.map((c) => (
            <rect
              key={`${c.x}-${c.y}`} x={c.x * CELL + 1} y={c.y * CELL + 1} width={CELL - 2} height={CELL - 2}
              fill={colorOf(c.zone)}
              style={{ opacity: focus && focus !== c.zone ? 0.06 : c.o, transition: "opacity .35s" }}
            />
          ))}
          {/* field parcels */}
          <g fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.2">
            <path d="M40 40h180v100H40z" /><path d="M260 20h140v140H260z" /><path d="M420 60h120v200H420z" /><path d="M60 180h200v100H60z" />
          </g>
          {/* geospatial grid overlay */}
          <g stroke="rgba(255,255,255,.12)" strokeDasharray="2 4">
            {[1, 2, 3, 4, 5, 6].map((i) => <line key={`v${i}`} x1={i * 80} x2={i * 80} y1="0" y2={ROWS * CELL} />)}
            {[1, 2, 3].map((i) => <line key={`h${i}`} y1={i * 80} y2={i * 80} x1="0" x2={COLS * CELL} />)}
          </g>
          {/* reticle */}
          <g stroke={accent} fill="none" strokeWidth="1.2">
            <circle cx="330" cy="90" r="18" /><circle cx="330" cy="90" r="2" fill={accent} />
            <path d="M330 62v14M330 104v14M302 90h14M344 90h14" />
          </g>
        </svg>
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="fx-scan absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 80%, ${accent}22 98%, ${accent} 100%)` }} />
        </div>
        <div className="pointer-events-none absolute left-2 top-2 rounded-[2px] bg-ink/80 px-2 py-1 font-mono text-[10px] text-zinc-300 backdrop-blur">315 × 316 px</div>
        <div className="pointer-events-none absolute bottom-2 right-2 rounded-[2px] bg-ink/80 px-2 py-1 font-mono text-[10px] text-zinc-300 backdrop-blur">99,540 valid px</div>
      </div>

      <div className="p-4 sm:px-6">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Highlight a crop-health zone">
          {ZONES.map((z) => (
            <button
              key={z.key} type="button" aria-pressed={focus === z.key}
              onMouseEnter={() => setFocus(z.key)} onMouseLeave={() => setFocus(null)}
              onFocus={() => setFocus(z.key)} onBlur={() => setFocus(null)}
              onClick={() => setFocus(focus === z.key ? null : z.key)}
              className="flex min-h-8 items-center gap-2 rounded-[3px] border border-white/10 bg-ink/60 px-2.5 font-mono text-[11px] text-zinc-300 transition-colors hover:border-white/30"
            >
              <i className="h-2 w-2 rounded-[1px]" style={{ background: z.color }} aria-hidden />{z.label}
            </button>
          ))}
        </div>
        <div className="mt-4" aria-hidden>
          <div className="grid grid-cols-8 gap-1">
            {STAGES.map((s, i) => (
              <div key={s} className="relative h-1 rounded-full bg-white/10">
                <span className={`fx-step ${i === 0 ? "fx-first" : ""} absolute inset-0 rounded-full`} style={{ background: accent, boxShadow: `0 0 8px ${accent}`, animationDelay: `${i}s` }} />
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-500 sm:text-[10px]">
            <span>acquire</span><span>ndvi</span><span className="hidden sm:inline">inference</span><span>yield</span><span>recommend</span>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export function ProjectVisual({ project }: { project: Project }) {
  if (project.id === "chef") return <ChefVisual accent={project.accent} />;
  if (project.id === "voice") return <VoiceVisual accent={project.accent} />;
  return <CropieVisual accent={project.accent} />;
}
