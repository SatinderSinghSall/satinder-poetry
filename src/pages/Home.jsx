import Hero from "../components/home/Hero";
import FeaturedPoems from "../components/home/FeaturedPoems";
import About from "../components/home/About";
import Testimonial from "../components/home/Testimonial";
import CTA from "../components/home/CTA";
import SocialLinks from "../components/home/SocialLinks";
import NewsletterSignup from "./NewsletterSignup";
import StoriesSection from "../components/home/StoriesSection";

export default function Home() {
  return (
    <div className="bg-slate-50 text-slate-800">
      <Hero />
      <StoriesSection />
      <FeaturedPoems />
      <About />
      <Testimonial />
      <CTA />
      <NewsletterSignup />
      <SocialLinks />
    </div>
  );
}
