import { Cookie } from "next/font/google";
import HeroSection from "./components/HeroSection";
import ProductsDetails from "./components/ProductsDetails";
import TestimonialCards from "./components/TestimonialCards";
import WhyChooseUs from "./components/WhyChooseUs";
import Cookies from "./components/Cookies";
import Instructors from "./components/Instructors";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <HeroSection />
      <ProductsDetails/>
      <WhyChooseUs/>
      <TestimonialCards/>
      <Cookies/>
      <Instructors/>
      <Footer/>
    </main>
  );
}
