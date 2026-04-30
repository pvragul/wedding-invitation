"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import Countdown from "./Countdown";

export default function Hero() {
  const { t, lang } = useLanguage();
  // Wedding Date: May 29, 2026 7:00 AM IST
  const weddingDate = new Date("2026-05-29T07:00:00+05:30");

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/tamil-hero-bg.png"
          alt="Wedding Background"
          fill
          priority
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-stone-900/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white flex flex-col items-center px-4 mt-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-sm md:text-base mb-6 font-light"
        >
          {t("hero_subtitle")}
        </motion.p>

        <div className="flex flex-col md:flex-row -gap-2 md:gap-4 items-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, type: "spring" }}
            className={`mb-4 md:mb-8 tracking-wide drop-shadow-md text-stone-50 ${
              lang === "ta"
                ? "font-bamini-51 text-6xl md:text-8xl lg:text-9xl"
                : "font-script text-7xl md:text-8xl lg:text-9xl"
            }`}
          >
            {t("names_groom")}
          </motion.h1>
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, type: "spring" }}
            className={`mb-4 md:mb-8 tracking-wide drop-shadow-md text-stone-50 ${"text-2xl md:text-6xl lg:text-7xl"}`}
          >
            &
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, type: "spring" }}
            className={`mb-4 md:mb-8 tracking-wide drop-shadow-md text-stone-50 ${
              lang === "ta"
                ? "font-bamini-51 text-6xl md:text-8xl lg:text-9xl"
                : "font-script text-7xl md:text-8xl lg:text-9xl"
            }`}
          >
            {t("names_bride")}
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="w-px h-8 md:h-12 bg-white/50 mb-6 md:mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-xl md:text-2xl font-light tracking-wider"
        >
          {t("date")}
        </motion.p>

        <Countdown targetDate={weddingDate} />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-white/70 text-[10px] uppercase tracking-[0.2em] mb-3">
          {/* {t("scroll")} */}
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-4 md:h-12 bg-white/70"
        />
      </motion.div>
    </section>
  );
}
