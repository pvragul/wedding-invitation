"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Languages } from "lucide-react";
import { motion } from "framer-motion";
import { trackEvent } from "./ActivityTracker";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      onClick={() => {
        toggleLang();
        trackEvent("button_click", { buttonId: `lang_toggle_to_${lang === "en" ? "ta" : "en"}` });
      }}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-stone-200/50 rounded-full shadow-sm hover:shadow-md transition-all text-stone-700"
      aria-label="Toggle language"
    >
      <Languages className="w-4 h-4" />
      <span className="text-sm font-medium uppercase tracking-widest">
        {lang === "en" ? "தமிழ்" : "English"}
      </span>
    </motion.button>
  );
}
