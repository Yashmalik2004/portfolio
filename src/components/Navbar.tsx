"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav } from "@/data/portfolio";

const id = (n: string) => n.toLowerCase();

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    nav.forEach((n) => { const el = document.getElementById(id(n)); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav aria-label="Primary" className="flex w-full max-w-3xl items-center justify-between rounded-full border border-line bg-ink/70 px-3 py-2 backdrop-blur-md">
        <a href="#home" className="px-3 font-mono text-sm font-medium text-violet">YM.</a>
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <li key={n}>
              <a
                href={`#${id(n)}`}
                aria-current={active === id(n) ? "true" : undefined}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${active === id(n) ? "bg-violet/15 text-violet" : "text-zinc-400 hover:text-white"}`}
              >
                {n}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="grid h-11 w-11 place-items-center rounded-full text-zinc-300 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            className="fixed inset-x-4 top-20 rounded-2xl border border-line bg-panel/95 p-3 backdrop-blur-lg md:hidden"
          >
            {nav.map((n) => (
              <a key={n} href={`#${id(n)}`} onClick={() => setOpen(false)} className={`block rounded-xl px-4 py-3 text-base ${active === id(n) ? "bg-violet/15 text-violet" : "text-zinc-300"}`}>
                {n}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
