import CTASection from "@/components/modules/Home/CTASection";
import DoctorsSection from "@/components/modules/Home/DoctorsSection";
import HeroSection from "@/components/modules/Home/HeroSection";
import SpecialtiesSection from "@/components/modules/Home/SpecialtiesSection";
import TestimonialsSection from "@/components/modules/Home/Testimonials";
import WhyMediHaven from "@/components/modules/Home/WhyMediHaven";

const HomePage = async() => {

  return (
    <div>
      <HeroSection/>
      <SpecialtiesSection/>
      <WhyMediHaven/>
      <DoctorsSection/>
      <TestimonialsSection/>
      <CTASection/>
    </div>
  );
};

export default HomePage;