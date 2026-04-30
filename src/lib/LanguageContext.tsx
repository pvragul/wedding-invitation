"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ta";

const translations = {
  en: {
    names_groom: "Ragul",
    names_bride: "Yamuna",
    date: "May 29, 2026",
    hero_subtitle: "We are getting married",
    scroll: "Scroll",
    details_title: "The Details",
    details_subtitle: "We can't wait to celebrate our special day with you. Here's everything you need to know about our wedding.",
    when_wedding: "Wedding",
    when_wedding_date: "Friday, May 29th, 2026",
    when_wedding_time: "Ceremony begins at 7:00 AM",
    when_reception: "Reception",
    when_reception_date: "Thursday, May 28th, 2026",
    when_reception_time: "Celebration begins at 7:00 PM",
    where: "Where",
    venue_name: "Manickam Mahal",
    venue_address: "Salai Nagar, Thamaleri Muthur, Tiruppathur, Tamil Nadu",
    navigate: "Navigate to Venue",
    rsvp_title: "RSVP",
    rsvp_subtitle: "Please respond in your desired time.",
    guest_names: "Guest Name(s) *",
    guest_names_ph: "John & Jane Doe",
    email: "Email Address",
    phone: "Phone Number *",
    attending: "Please confirm your attendance *",
    yes: "Yes",
    no: "No",
    maybe: "Maybe",
    guests_count: "Number of Guests *",
    dietary: "Dietary Requirements",
    dietary_ph: "e.g. Vegetarian, Gluten-free",
    accessibility: "Accessibility Needs",
    song: "Wedding Wish / Message",
    submit: "Send RSVP",
    submitting: "Submitting...",
    success_title: "Thank You!",
    success_msg: "We have received your response. We can't wait to see you there!",
    errors_name: "Name must be at least 2 characters",
    errors_email: "Please enter a valid email address",
    errors_phone: "Please enter a valid phone number",
    errors_attending: "Please let us know if you can make it",
    errors_guests: "Please enter a valid number of guests",
    days: "Days",
    hours: "Hours",
    mins: "Mins",
    secs: "Secs",
    save_calendar: "Save to Calendar",
  },
  ta: {
    names_groom: "uhFy;",
    names_bride: "aKdh",
    date: "மே 29, 2026",
    hero_subtitle: "நாங்கள் திருமணம் செய்து கொள்கிறோம்",
    scroll: "கீழே செல்லவும்",
    details_title: "tptuq;fs;",
    details_subtitle: "எங்கள் திருமண நன்னாளில் உங்களை அன்புடன் அழைக்கிறோம்.",
    when_wedding: "jpUkzk;",
    when_wedding_date: "வெள்ளிக்கிழமை, மே 29, 2026",
    when_wedding_time: "காலை 7:00 மணி முதல்",
    when_reception: "tuNtw;G",
    when_reception_date: "வியாழக்கிழமை, மே 28, 2026",
    when_reception_time: "மாலை 7:00 மணி முதல்",
    where: ",lk;",
    venue_name: "மாணிக்கம் மஹால்",
    venue_address: "சாலை நகர், தாமலேரிமுத்தூர், திருப்பத்தூர், தமிழ்நாடு",
    navigate: "வரைபடத்தில் பார்க்க",
    rsvp_title: "பதிலளிக்கவும்",
    rsvp_subtitle: "தாங்கள் விரும்பும் நேரத்தில் பதிலளிக்கவும்",
    guest_names: "விருந்தினர் பெயர்(கள்) *",
    guest_names_ph: "பெயரை உள்ளிடவும்",
    email: "மின்னஞ்சல்",
    phone: "தொலைபேசி எண் *",
    attending: "தங்கள் வருகையை உறுதிப்படுத்தவும் *",
    yes: "ஆம்",
    no: "இல்லை",
    maybe: "ஒருவேளை",
    guests_count: "விருந்தினர்கள் எண்ணிக்கை *",
    dietary: "உணவு விருப்பங்கள்",
    dietary_ph: "சைவம்",
    accessibility: "சிறப்பு தேவைகள்",
    song: "வாழ்த்துச் செய்தி",
    submit: "அனுப்புக",
    submitting: "அனுப்பப்படுகிறது...",
    success_title: "நன்றி!",
    success_msg: "உங்கள் பதிவு பெறப்பட்டது. உங்களை சந்திக்க ஆவலுடன் காத்திருக்கிறோம்!",
    errors_name: "குறைந்தபட்சம் 2 எழுத்துக்கள் தேவை",
    errors_email: "சரியான மின்னஞ்சலை உள்ளிடவும்",
    errors_phone: "சரியான தொலைபேசி எண்ணை உள்ளிடவும்",
    errors_attending: "உங்கள் வருகையை உறுதிப்படுத்தவும்",
    errors_guests: "சரியான எண்ணிக்கையை உள்ளிடவும்",
    days: "நாட்கள்",
    hours: "மணி",
    mins: "நிமிடம்",
    secs: "வினாடி",
    save_calendar: "நாள்காட்டியில் சேமி",
  }
};

type LanguageContextType = {
  lang: Language;
  toggleLang: () => void;
  t: (key: keyof typeof translations.en) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("wedding_lang") as Language;
    if (saved && (saved === "en" || saved === "ta")) {
      setLang(saved);
    }
  }, []);

  const toggleLang = () => {
    setLang(prev => {
      const newLang = prev === "en" ? "ta" : "en";
      localStorage.setItem("wedding_lang", newLang);
      return newLang;
    });
  };

  const t = (key: keyof typeof translations.en) => {
    return translations[lang][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
