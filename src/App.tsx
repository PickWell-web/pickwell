import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomizedExperience from './components/CustomizedExperience';
import HealthySection from './components/HealthySection';
import DesignSection from './components/DesignSection';
import TravelBox from './components/TravelBox';
import HowItWorks from './components/HowItWorks';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <HealthySection />
        <DesignSection />
        <CustomizedExperience />
        <TravelBox />
        <HowItWorks />
        <ContactForm />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
