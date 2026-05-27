import CTASection from "@/components/modules/Home/CTASection";
import DoctorsSection from "@/components/modules/Home/DoctorsSection";
import HeroSection from "@/components/modules/Home/HeroSection";
import HowItWorksSection from "@/components/modules/Home/HowItWork";
import SpecialtiesSection from "@/components/modules/Home/SpecialtiesSection";
import TestimonialsSection from "@/components/modules/Home/Testimonials";
import WhyMediHaven from "@/components/modules/Home/WhyMediHaven";

const HomePage = async() => {
  return (
    <div>
      <HeroSection/>
      <SpecialtiesSection/>
      <DoctorsSection/>
      <WhyMediHaven/>
      <HowItWorksSection/>
      <TestimonialsSection/>
      <CTASection/>
    </div>
  );
};

export default HomePage;