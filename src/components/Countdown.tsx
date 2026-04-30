"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Countdown({ targetDate }: { targetDate: Date }) {
  const { t, lang } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ragul+and+Yamuna+Wedding&dates=20260529T013000Z/20260529T053000Z&details=Join+us+for+our+wedding+celebration!&location=Manickam+Mahal,+Salai+Nagar,+Thamaleri+Muthur,+Tiruppathur,+Tamil+Nadu`;

  return (
    <div className="flex flex-col items-center mt-6 w-full md:px-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="flex gap-6 md:gap-10 text-white mb-8"
      >
        <TimeUnit value={timeLeft.days} label={t("days")} lang={lang} />
        <TimeUnit value={timeLeft.hours} label={t("hours")} lang={lang} />
        <TimeUnit value={timeLeft.minutes} label={t("mins")} lang={lang} />
        <TimeUnit value={timeLeft.seconds} label={t("secs")} lang={lang} />
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4 items-center w-full px-4 mx-auto">
        <motion.a
          href={googleCalendarUrl}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex grow w-full md:w-1/2 items-center justify-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white rounded-full transition-all shadow-sm font-medium"
        >
          <CalendarPlus className="w-5 h-5 shrink-0" />
          <span className={lang === "ta" ? "text-sm tracking-wide" : "text-sm tracking-widest uppercase truncate"}>
            {t("save_calendar")}
          </span>
        </motion.a>

        <motion.a
          href="/tamil-hero-bg.png"
          download="Ragul_Yamuna_Invitation.png"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex grow w-full md:w-1/2 items-center justify-center gap-2 px-6 py-3 bg-primary/80 hover:bg-primary backdrop-blur-sm border border-primary/50 text-white rounded-full transition-all shadow-sm font-medium"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span className={lang === "ta" ? "text-sm tracking-wide" : "text-sm tracking-widest uppercase truncate"}>
            {t("download_invitation")}
          </span>
        </motion.a>
      </div>
    </div>
  );
}

function TimeUnit({ value, label, lang }: { value: number; label: string; lang: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl md:text-5xl font-sans mb-1 drop-shadow-md">
        {value.toString().padStart(2, "0")}
      </span>
      <span className={`text-[10px] md:text-xs uppercase opacity-90 ${lang === "ta" ? "tracking-wide" : "tracking-[0.2em]"}`}>
        {label}
      </span>
    </div>
  );
}
