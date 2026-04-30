"use client";

import { motion } from "framer-motion";
import { CalendarDays, MapPin, Clock, Navigation } from "lucide-react";
import QRCode from "react-qr-code";
import { useLanguage } from "@/lib/LanguageContext";

export default function Details() {
  const { t, lang } = useLanguage();
  const mapLink = "https://maps.app.goo.gl/C8tSWRJ8pvcevp2p8";

  return (
    <section className="py-24 md:py-32 bg-stone-50 text-stone-800">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className={`text-4xl md:text-5xl text-primary mb-6 ${lang === "ta" ? "font-bamini-34" : "font-serif"}`}>
            {t("details_title")}
          </h2>
          <p className="max-w-2xl mx-auto text-stone-600 leading-relaxed text-lg">
            {t("details_subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-16">
          <DetailCard 
            icon={<CalendarDays className="w-8 h-8 text-primary" />}
            title={t("when_reception")}
            line1={t("when_reception_date")}
            line2={t("when_reception_time")}
            delay={0.1}
            lang={lang}
          />
          <DetailCard 
            icon={<Clock className="w-8 h-8 text-primary" />}
            title={t("when_wedding")}
            line1={t("when_wedding_date")}
            line2={t("when_wedding_time")}
            delay={0.3}
            lang={lang}
          />
          <DetailCard 
            icon={<MapPin className="w-8 h-8 text-primary" />}
            title={t("where")}
            line1={t("venue_name")}
            line2={t("venue_address")}
            delay={0.5}
            lang={lang}
          />
        </div>

        {/* Location & QR Code Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col items-center justify-center p-8 bg-white border border-stone-100 rounded-lg shadow-sm"
        >
          <h3 className={`text-2xl mb-6 text-stone-800 ${lang === "ta" ? "font-bamini-34" : "font-serif"}`}>
            {t("navigate")}
          </h3>
          <div className="bg-white p-4 border border-stone-100 rounded-xl shadow-sm mb-6">
            <QRCode value={mapLink} size={150} fgColor="#292524" />
          </div>
          <a 
            href={mapLink} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors shadow-sm font-medium"
          >
            <Navigation className="w-4 h-4" />
            {t("navigate")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function DetailCard({ icon, title, line1, line2, delay, lang }: { icon: React.ReactNode, title: string, line1: string, line2: string, delay: number, lang: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center text-center p-8 bg-white border border-stone-100 rounded-lg shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)] transition-all duration-300"
    >
      <div className="mb-6 p-4 rounded-full bg-stone-50 border border-stone-100 text-primary">
        {icon}
      </div>
      <h3 className={`mb-4 text-stone-800 ${lang === "ta" ? "font-bamini-34 text-4xl" : "font-serif text-2xl"}`}>
        {title}
      </h3>
      <p className="text-stone-600 mb-1">{line1}</p>
      <p className="text-stone-600 font-light">{line2}</p>
    </motion.div>
  );
}
