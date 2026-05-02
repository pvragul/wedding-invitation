import Hero from "@/components/Hero";
import Details from "@/components/Details";
import RsvpForm from "@/components/RsvpForm";
import LanguageToggle from "@/components/LanguageToggle";
import ActivityTracker from "@/components/ActivityTracker";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <ActivityTracker />
      <LanguageToggle />
      <Hero />
      <Details />
      <RsvpForm />
    </main>
  );
}
