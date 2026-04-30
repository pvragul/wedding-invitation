import Hero from "@/components/Hero";
import Details from "@/components/Details";
import RsvpForm from "@/components/RsvpForm";
import LanguageToggle from "@/components/LanguageToggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <LanguageToggle />
      <Hero />
      <Details />
      <RsvpForm />
    </main>
  );
}
