import HeroSection from "./components/HeroSection";
import Cakes from "./components/Cakes";
import Cookies from "./components/Cookies"; 
import ReviewCard from "./components/ReviewCard";
import OurSpecialties from "./components/OurSpecialties";
import Footer from "./components/Footer";
import Instructors from "./components/Instructors";
import WelcomeBanner from "./components/WelcomeBanner";
import StatsSection from "./components/StatsSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <WelcomeBanner />
      <HeroSection />
      <StatsSection />
      <Cakes />
      <Cookies />
      <OurSpecialties/>
      <ReviewCard/>
      <Instructors/>
    </main>
  );
}
