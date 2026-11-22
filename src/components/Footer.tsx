import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";

const icon = "grid h-11 w-11 place-items-center rounded-full border border-line text-zinc-400 transition-all hover:-translate-y-1 hover:border-violet hover:text-violet";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-medium text-white">{profile.name}</p>
          <p className="text-sm text-zinc-500">{profile.role}</p>
        </div>
        <div className="flex gap-3">
          <a className={icon} href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
          <a className={icon} href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a className={icon} href={`mailto:${profile.email}`} aria-label="Email"><Mail size={18} /></a>
        </div>
        <p className="text-sm text-zinc-600">© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  );
}
