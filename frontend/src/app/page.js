import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

import HeroBanner from "./components/Home/HeroBanner";
import AboutSection from "./components/Home/About";
import PortfolioSection from "./components/Home/Portfolio";
import ServicesSection from "./components/Home/Services";
import ContactForm from "./components/Home/Contact";

export default function Home() {
  return (
    <div className="bg-[var(--bg)] text-[var(--text-color)]">
      {/* HEADER */}
      <Header />

      {/* HERO */}
      <section id="hero" className="pt-20">
        <HeroBanner />
      </section>

      {/* ABOUT */}
      <section id="about" className="pt-20">
        <AboutSection />
      </section>

      {/* PORTFOLIO */}
      <section id="project" className="pt-20">
        <PortfolioSection />
      </section>

      {/* SERVICES / LEARNING */}
      <section id="services" className="pt-20">
        <ServicesSection />
      </section>

      {/* CONTACT */}
      <section id="contact" className="pt-20">
        <ContactForm />
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
