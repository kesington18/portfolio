"use client";
import { useEffect, useRef } from "react";

// Backend-flavoured tokens that "rain" down the screen, one character at a time
const TOKENS = ["GET /api/users", "POST /login", "200 OK", "404", "SELECT * FROM", "JOIN", "WHERE id =", "async def", "await db.commit()", "FastAPI", "JWT", "Redis", "INSERT INTO", "def main():", "return {…}", "docker compose up", "alembic upgrade head", "SQLModel", "celery.delay()", "{ }", "01101", "git push", "pytest ✓", "UPDATE", "CREATE TABLE", "uvicorn", "NULL", "401", "PATCH /rooms/{id}"];
const hex = (h) => { h = h.trim().replace("#", ""); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) || 0); };

export default function CodeRain() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = ref.current, ctx = c.getContext("2d");
    const LH = 18, CW = 17;
    let cols = [], w = 0, h = 0, id, last = 0;
    const tok = () => TOKENS[(Math.random() * TOKENS.length) | 0] + " ";
    const resize = () => {
      w = c.width = innerWidth; h = c.height = innerHeight;
      ctx.font = "14px ui-monospace, Menlo, Consolas, monospace";
      cols = Array.from({ length: Math.ceil(w / CW) }, () => ({ y: -Math.random() * 60 | 0, s: tok(), i: 0, skip: Math.random() * 3 }));
    };
    const frame = (now) => {
      id = requestAnimationFrame(frame);
      if (document.hidden || now - last < 55) return; // idle when the tab is hidden; ~18fps otherwise
      last = now;
      const cs = getComputedStyle(document.documentElement);
      const [br, bg, bb] = hex(cs.getPropertyValue("--c-base"));
      ctx.fillStyle = `rgba(${br},${bg},${bb},0.12)`; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = cs.getPropertyValue("--c-accent").trim();
      cols.forEach((col, k) => {
        if (col.skip > 0) { col.skip -= 0.25; return; }
        ctx.fillText(col.s[col.i], k * CW, col.y * LH);
        col.y++; col.i++;
        if (col.i >= col.s.length) { col.s = tok(); col.i = 0; }
        if (col.y * LH > h + Math.random() * 400) { col.y = 0; col.skip = Math.random() * 12; }
      });
    };
    resize(); addEventListener("resize", resize); id = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(id); removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-30" />;
}
