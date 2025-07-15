import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Experience from './Experience';
import PortfolioSection from './PortfolioSection';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Footer from './Footer';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Experience />
      <PortfolioSection />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Portfolio;