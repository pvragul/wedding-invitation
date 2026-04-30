"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function EmojiShower({
  type,
}: {
  type: "yes" | "no" | "maybe";
}) {
  const [particles, setParticles] = useState<
    { id: number; x: number; delay: number; emoji: string }[]
  >([]);

  useEffect(() => {
    let emojis: string[] = [];
    if (type === "yes") emojis = ["🥰", "🥳", "🎉", "❤️", "✨"];
    if (type === "no") emojis = ["💔", "😞", "🥺", "😿", "🥀"];
    if (type === "maybe") emojis = ["🤔", "🤞", "✨", "👀", "🤗"];

    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // random start x position (vw)
      delay: Math.random() * 0.5, // staggered start
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));

    setParticles(newParticles);
  }, [type]);

  if (!type || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-100 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: "100vh", x: `${p.x}vw`, scale: 0.5 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: ["100vh", "60vh", "20vh", "-10vh"],
            x: [
              `${p.x}vw`,
              `${p.x + (Math.random() * 10 - 5)}vw`,
              `${p.x + (Math.random() * 20 - 10)}vw`,
              `${p.x + (Math.random() * 30 - 15)}vw`,
            ],
            scale: [0.5, 1.5, 1.2, 0.8],
            rotate: [0, Math.random() * 180 - 90, Math.random() * 360 - 180],
          }}
          transition={{
            duration: Math.random() * 2 + 2.5,
            delay: p.delay,
            ease: "easeOut",
          }}
          className="absolute text-3xl md:text-5xl drop-shadow-md"
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}
