"use client";
import { useEffect, useState } from "react";

export default function Typewriter({ phrases }) {
  const [text, setText] = useState("");
  useEffect(() => {
    let i = 0, j = 0, del = false, id;
    const tick = () => {
      const p = phrases[i];
      j += del ? -1 : 1; setText(p.slice(0, j));
      let d = del ? 28 : 65;
      if (!del && j === p.length) { del = true; d = 1700; }
      else if (del && j === 0) { del = false; i = (i + 1) % phrases.length; d = 400; }
      id = setTimeout(tick, d);
    };
    id = setTimeout(tick, 700);
    return () => clearTimeout(id);
  }, [phrases]);
  return (
    <span className="font-mono">
      <span className="text-accent-ink">$ </span>{text}<span className="caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-accent" />
    </span>
  );
}
