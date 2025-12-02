import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import WhyUsSection from '../components/WhyUsSection';
import CaseStudiesSection from '../components/CaseStudiesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ResourcesSection from '../components/ResourcesSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import TrustedPartnersSlider from '../components/TrustedPartnersSlider';
import Projects from '../components/Projects';
import DetailedProjects from '../components/DetailedProjects';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <HeroSection />
      <br/>
      <ServicesSection />
      <WhyUsSection />
      {/* <Projects/> */}
      <DetailedProjects/>
      <TrustedPartnersSlider/>
      <CaseStudiesSection />

      <TestimonialsSection />
      <ResourcesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}