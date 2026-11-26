"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { profile, projects, skills, titles, contact } from "./data";
import CodeRain from "./CodeRain";
import Bubbles from "./Bubbles";
import Typewriter from "./Typewriter";

const ease = [0.22, 1, 0.36, 1];
const ACCENTS = [["Ice", "#8ec5e6"], ["Mint", "#8fd6b8"], ["Lilac", "#b5a6ee"], ["Peach", "#f2b69a"], ["Silver", "#c9d0d8"]];
const DEFAULTS = { theme: "dark", accent: "#8fd6b8", rgb: true, speed: 10, spotlight: true, rain: true, bubbles: true };

const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease, delay }}>{children}</motion.div>
);
const Heading = ({ n, children }) => (
  <Reveal className="mb-10">
    <p className="font-mono text-sm tracking-widest text-accent-ink">{"// 0"}{n}</p>
    <h2 className="font-display text-3xl md:text-4xl font-semibold mt-1">{children}</h2>
  </Reveal>
);
const TermBar = ({ label }) => (
  <div className="mb-5 flex items-center gap-2 font-mono text-xs text-muted">
    <span className="h-2.5 w-2.5 rounded-full bg-line" /><span className="h-2.5 w-2.5 rounded-full bg-line" /><span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
    <span className="ml-2">{label}</span>
  </div>
);
const glow = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--cx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--cy", `${e.clientY - r.top}px`);
};

function Toggle({ label, on, onChange }) {
  return (
    <button role="switch" aria-checked={on} onClick={() => onChange(!on)} className="flex w-full items-center justify-between text-sm">
      <span>{label}</span>
      <span className={`h-6 w-11 rounded-full p-0.5 transition-colors ${on ? "bg-accent" : "bg-line"}`}>
        <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className="block h-5 w-5 rounded-full bg-white shadow" style={{ marginLeft: on ? "auto" : 0 }} />
      </span>
    </button>
  );
}

function Customizer({ cfg, set, reset }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 14, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.25, ease }} className="mb-3 w-72 space-y-5 rounded-2xl border border-line bg-surface/90 p-5 shadow-2xl backdrop-blur-xl">
            <p className="font-display font-semibold">Customize</p>
            <div>
              <p className="mb-2 text-xs uppercase tracking-wider text-muted">Theme</p>
              <div className="grid grid-cols-2 gap-2">
                {["dark", "light"].map((t) => (
                  <button key={t} onClick={() => set({ theme: t })}
                    className={`rounded-lg border px-3 py-2 text-sm capitalize transition-colors ${cfg.theme === t ? "border-accent bg-raised" : "border-line hover:border-muted"}`}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs uppercase tracking-wider text-muted">Accent</p>
              <div className="flex gap-3">
                {ACCENTS.map(([n, c]) => (
                  <button key={c} title={n} aria-label={n} onClick={() => set({ accent: c })} style={{ background: c }}
                    className={`h-7 w-7 rounded-full transition-transform hover:scale-110 ${cfg.accent === c ? "ring-2 ring-ink ring-offset-2 ring-offset-surface" : ""}`} />
                ))}
              </div>
            </div>
            <Toggle label="Glow effect" on={cfg.rgb} onChange={(v) => set({ rgb: v })} />
            <label className="block text-sm">
              <span className="text-muted">Glow speed</span>
              <input type="range" min="2" max="14" value={cfg.speed} onChange={(e) => set({ speed: +e.target.value })} className="mt-2 w-full accent-[var(--c-accent)]" />
            </label>
            <Toggle label="Cursor spotlight" on={cfg.spotlight} onChange={(v) => set({ spotlight: v })} />
            <Toggle label="Code rain" on={cfg.rain} onChange={(v) => set({ rain: v })} />
            <Toggle label="Bubbles" on={cfg.bubbles} onChange={(v) => set({ bubbles: v })} />
            <button onClick={reset} className="text-xs text-muted transition-colors hover:text-ink">Reset to defaults</button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button onClick={() => setOpen(!open)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} aria-label="Customize"
        className="ml-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-xl text-on-accent shadow-lg">
        <motion.span animate={{ rotate: open ? 90 : 0 }}>⚙</motion.span>
      </motion.button>
    </div>
  );
}

const q = (v) => `"${v}"`;
const list = (a) => `[${a.map(q).join(", ")}]`;
const Key = ({ k }) => <span className="text-accent-ink">{q(k)}</span>;
const Punc = ({ children }) => <span className="text-muted">{children}</span>;

function AboutCard({ a }) {
  return (
    <div onMouseMove={glow} className="card max-w-4xl rounded-2xl border border-line bg-surface/70 p-6 font-mono text-sm leading-7 backdrop-blur md:p-8">
      <TermBar label="about.config.py" />
      <p className="text-muted"># who I am</p>
      <p className="text-ink">{'"""'}{a.intro}{'"""'}</p>
      <p className="mt-4"><span className="text-ink">me</span><Punc> = {"{"}</Punc></p>
      <p className="break-words pl-6"><Key k="studying" /><Punc>: </Punc><span className="text-ink">{q(a.studying)}</span><Punc>,</Punc></p>
      <p className="break-words pl-6"><Key k="builds" /><Punc>: </Punc><span className="text-ink">{list(a.builds)}</span><Punc>,</Punc></p>
      <p className="pl-6"><Key k="shipped" /><Punc>: {"{"}</Punc></p>
      {a.built.map((b) => (
        <p key={b.name} className="break-words pl-12"><Key k={b.name} /><Punc>: </Punc><span className="text-ink">{q(b.line)}</span><Punc>,</Punc></p>
      ))}
      <p className="pl-6"><Punc>{"},"}</Punc></p>
      <p className="break-words pl-6"><Key k="outside_the_editor" /><Punc>: </Punc><span className="text-ink">{list(a.hobbies)}</span><Punc>,</Punc></p>
      <p className="break-words pl-6"><Key k="teamwork" /><Punc>: </Punc><span className="text-ink">{q(a.team)}</span><Punc>,</Punc></p>
      <p><Punc>{"}"}</Punc></p>
      <p className="mt-3 text-muted">{">>> "}<span className="caret inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-accent" /></p>
    </div>
  );
}

export default function Portfolio() {
  const [cfg, setCfg] = useState(DEFAULTS);
  const [ready, setReady] = useState(false);
  const spot = useRef(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const set = (p) => setCfg((c) => ({ ...c, ...p }));

  useEffect(() => {
    try { const s = JSON.parse(localStorage.getItem("pf-cfg")); if (s) setCfg({ ...DEFAULTS, ...s }); } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    const r = document.documentElement;
    r.dataset.theme = cfg.theme; r.dataset.rgb = cfg.rgb ? "on" : "off";
    r.style.setProperty("--c-accent", cfg.accent);
    r.style.setProperty("--rgb-speed", `${16 - cfg.speed}s`);
    try { localStorage.setItem("pf-cfg", JSON.stringify(cfg)); } catch {}
  }, [cfg, ready]);
  useEffect(() => {
    const move = (e) => { if (spot.current) { spot.current.style.setProperty("--mx", `${e.clientX}px`); spot.current.style.setProperty("--my", `${e.clientY}px`); } };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <main className="relative overflow-x-clip">
      <motion.div style={{ scaleX: progress }} className="rgb-bar fixed left-0 right-0 top-0 z-50 h-0.5 origin-left" />
      {cfg.rain && <CodeRain />}
      {cfg.bubbles && <Bubbles />}
      {cfg.spotlight && <div ref={spot} aria-hidden className="spot pointer-events-none fixed inset-0 z-0" />}

      <nav className="fixed left-1/2 top-4 z-40 flex -translate-x-1/2 items-center gap-5 rounded-full border border-line/70 bg-surface/70 px-5 py-2 text-sm text-muted backdrop-blur-xl">
        {["about", "projects", "skills", "contact"].map((s) => (
          <a key={s} href={`#${s}`} className="capitalize transition-colors hover:text-accent-ink">{s}</a>
        ))}
        <button onClick={() => set({ theme: cfg.theme === "dark" ? "light" : "dark" })} aria-label="Toggle theme" className="transition-transform hover:rotate-12 hover:text-accent-ink">
          {cfg.theme === "dark" ? "☀" : "☾"}
        </button>
      </nav>

      <section className="relative flex min-h-screen items-center px-6">
        <div className="relative z-10 mx-auto w-full max-w-5xl pb-16 pt-28">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="mb-6 font-mono text-lg md:text-xl"><span className="text-accent-ink">$ </span>hello, world. I’m</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.3 }}
            className="font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">{profile.name}</motion.h1>
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-4 min-h-[1.4em] font-display text-2xl font-medium md:text-4xl">
            <Typewriter phrases={titles} prompt={false} textClass="rgb-text" />
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.9 }} className="mt-6 max-w-2xl text-lg text-muted">{profile.tagline}</motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8, ease }} className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#projects" className="rounded-full bg-accent px-6 py-3 font-medium text-on-accent transition-transform hover:scale-105">View my work</a>
            <a href="#contact" className="rounded-full border border-line px-6 py-3 transition-colors hover:border-accent hover:text-accent-ink">Get in touch</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="font-mono text-sm text-muted transition-colors hover:text-accent-ink">GitHub ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="font-mono text-sm text-muted transition-colors hover:text-accent-ink">LinkedIn ↗</a>
          </motion.div>
        </div>
      </section>

      <section id="about" className="relative z-10 px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <Heading n={1}>About</Heading>
          <Reveal><AboutCard a={profile.about} /></Reveal>
        </div>
      </section>

      <section id="projects" className="relative z-10 bg-surface/50 px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <Heading n={2}>Selected projects</Heading>
          <div className="grid gap-8">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <motion.article onMouseMove={glow} whileHover={{ y: -6 }} transition={{ duration: 0.35, ease }} className="card rounded-2xl border border-line bg-raised/70 p-8">
                  <TermBar label={`~/projects/${p.name.toLowerCase().replace(/\W+/g, "-")}.py`} />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
                    <span className="text-sm text-accent-ink">{p.role}</span>
                  </div>
                  <p className="mt-3 text-muted">{p.blurb}</p>
                  {p.image && (
                    <a href={p.links[0].href} target="_blank" rel="noreferrer" className="group mt-6 block overflow-hidden rounded-xl border border-line">
                      <div className="truncate border-b border-line bg-base/60 px-4 py-2 font-mono text-xs text-muted">{p.links[0].href.replace("https://", "")}</div>
                      <div className="overflow-hidden">
                        <img src={p.image} alt={`${p.name} preview`} loading="lazy" className="w-full transition-transform duration-700 group-hover:scale-[1.03]" />
                      </div>
                    </a>
                  )}
                  <ul className="mt-5 space-y-2">
                    {p.points.map((pt) => (<li key={pt} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{pt}</li>))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((s) => <span key={s} className="rounded-md border border-line bg-base/60 px-3 py-1 font-mono text-xs text-muted">{s}</span>)}
                  </div>
                  <div className="mt-6 flex gap-5">
                    {p.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-accent-ink transition-opacity hover:opacity-70">{l.label} ↗</a>)}
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="relative z-10 px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <Heading n={3}>Skills & tools</Heading>
          <div className="grid gap-6 sm:grid-cols-2">
            {Object.entries(skills).map(([group, items], i) => (
              <Reveal key={group} delay={i * 0.08} className="h-full">
                <div onMouseMove={glow} className="card h-full rounded-2xl border border-line bg-surface/70 p-6">
                  <TermBar label={`skills/${group.toLowerCase().replace(/\W+/g, "_")}.json`} />
                  <h3 className="mb-4 font-display text-lg text-accent-ink">{group}</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((s) => (<motion.span key={s} whileHover={{ scale: 1.08, y: -2 }} className="cursor-default rounded-md bg-raised px-3 py-1.5 font-mono text-sm">{s}</motion.span>))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 bg-surface/50 px-6 py-28 text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold md:text-5xl">Let’s build something <span className="rgb-text">useful</span></h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{contact.line}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {contact.open.map((o) => (<span key={o} className="rounded-md border border-line bg-surface/60 px-3 py-1.5 font-mono text-sm text-accent-ink">{o}</span>))}
          </div>
          <a href={`mailto:${profile.email}`} className="mt-8 inline-block rounded-full bg-accent px-8 py-3 font-medium text-on-accent transition-transform hover:scale-105">{profile.email}</a>
          <div className="mt-6 flex justify-center gap-6 text-muted">
            <a href={profile.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent-ink">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent-ink">LinkedIn</a>
          </div>
        </Reveal>
        <p className="mt-20 text-xs text-muted/70">© {new Date().getFullYear()} {profile.name}</p>
      </section>

      <Customizer cfg={cfg} set={set} reset={() => setCfg(DEFAULTS)} />
    </main>
  );
}
