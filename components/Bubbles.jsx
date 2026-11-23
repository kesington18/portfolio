"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function Bubbles() {
  const [b, setB] = useState([]);
  useEffect(() => {
    setB(Array.from({ length: 16 }, (_, i) => ({
      id: i, size: 18 + Math.random() * 84, left: Math.random() * 100,
      dur: 14 + Math.random() * 16, delay: Math.random() * 12, sway: 12 + Math.random() * 32,
    })));
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {b.map((o) => (
        <motion.span key={o.id}
          initial={{ y: "0vh", x: 0, opacity: 0 }}
          animate={{ y: "-125vh", x: [0, o.sway, -o.sway, 0], opacity: [0, 1, 1, 0] }}
          transition={{
            y: { duration: o.dur, delay: o.delay, repeat: Infinity, ease: "linear" },
            opacity: { duration: o.dur, delay: o.delay, repeat: Infinity, ease: "linear", times: [0, 0.1, 0.85, 1] },
            x: { duration: o.dur / 2, delay: o.delay, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            position: "absolute", bottom: -120, left: `${o.left}%`, width: o.size, height: o.size, borderRadius: "50%",
            border: "1px solid color-mix(in srgb, var(--c-accent) 40%, transparent)",
            background: "radial-gradient(circle at 30% 28%, color-mix(in srgb, var(--c-accent) 30%, transparent), transparent 62%)",
            boxShadow: "inset 0 0 14px color-mix(in srgb, var(--c-accent) 18%, transparent)",
          }} />
      ))}
    </div>
  );
}
