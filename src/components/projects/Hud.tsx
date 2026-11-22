"use client";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { useInView } from "framer-motion";

/**
 * Glass instrument panel with corner brackets, a status bar and a cursor spotlight.
 * CSS animations inside are paused while the panel is off-screen.
 */
export function Panel({
  title, status, accent, children, className = "", label,
}: { title: string; status: string; accent: string; children: ReactNode; className?: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const live = useInView(ref, { margin: "100px" });
  return (
    <div
      ref={ref}
      aria-label={label}
      role={label ? "group" : undefined}
      style={{ "--acc": accent } as CSSProperties}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={`hud-frame spot relative overflow-hidden rounded-[3px] border border-white/[0.07] bg-panel/50 backdrop-blur-md ${live ? "" : "fx-paused"} ${className}`}
    >
      <div className="hud-dots pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-25 blur-3xl"
        style={{ background: accent }}
        aria-hidden
      />
      <div className="relative z-[3] flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
        <span className="flex items-center gap-2">
          <i className="fx-blink h-1.5 w-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} aria-hidden />
          {title}
        </span>
        <span style={{ color: accent }}>{status}</span>
      </div>
      <div className="relative z-[3]">{children}</div>
    </div>
  );
}

/** Animated dashed connector between two pipeline nodes. */
export function Flow({ vertical = false, className = "" }: { vertical?: boolean; className?: string }) {
  return vertical
    ? <span aria-hidden className={`fx-flow-y block w-px ${className}`} />
    : <span aria-hidden className={`fx-flow block h-px flex-1 ${className}`} />;
}

/** A pipeline node with a glow ring that lights up in sequence (delay drives the order). */
export function Node({
  label, sub, delay, accent, first = false,
}: { label: string; sub: string; delay: number; accent: string; first?: boolean }) {
  return (
    <div className="relative min-w-0 flex-1 rounded-[3px] border border-white/10 bg-ink/70 px-1 py-3 text-center sm:px-3">
      <span
        aria-hidden
        className={`fx-stage ${first ? "fx-first" : ""} pointer-events-none absolute -inset-px rounded-[3px] border`}
        style={{ borderColor: accent, boxShadow: `0 0 22px -4px ${accent}, inset 0 0 18px -8px ${accent}`, animationDelay: `${delay}s` }}
      />
      <div className="truncate font-mono text-[10px] font-medium tracking-[0.04em] text-white sm:text-xs sm:tracking-[0.12em]">{label}</div>
      <div className="mt-1 truncate font-mono text-[9px] tracking-tight sm:tracking-normal text-zinc-500 sm:text-[10px]">{sub}</div>
    </div>
  );
}
