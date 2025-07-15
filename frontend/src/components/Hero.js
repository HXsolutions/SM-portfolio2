import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ChevronDown, Mail, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/mockData';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const text = personalInfo.tagline;
    let currentIndex = 0;
    
    const typeText = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeText, 50);
      } else {
        setIsTypingComplete(true);
      }
    };

    const timer = setTimeout(typeText, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToPortfolio = () => {
    const portfolioSection = document.querySelector('#portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30"></div>
      
      {/* Floating 3D Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-pink-500/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-yellow-500/20 rounded-full animate-bounce"></div>
        
        {/* Floating E-commerce Icons */}
        <div className="absolute top-1/4 left-1/4 text-6xl opacity-10 animate-bounce">🛍️</div>
        <div className="absolute top-1/3 right-1/3 text-5xl opacity-10 animate-pulse">📦</div>
        <div className="absolute bottom-1/3 left-1/3 text-4xl opacity-10 animate-bounce">💰</div>
        <div className="absolute bottom-1/4 right-1/4 text-7xl opacity-10 animate-pulse">📈</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
            {personalInfo.name}
          </h1>
          
          <div className="min-h-[60px] flex items-center justify-center">
            <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-light">
              {displayText}
              {!isTypingComplete && (
                <span className="inline-block w-0.5 h-8 bg-blue-500 ml-1 animate-pulse"></span>
              )}
            </p>
          </div>
        </div>

        <div className="mb-12">
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {personalInfo.bio}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="lg"
            onClick={handleScrollToPortfolio}
            className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            View Portfolio
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={handleScrollToContact}
            className="px-8 py-6 text-lg font-semibold border-2 hover:bg-primary hover:text-primary-foreground transform hover:scale-105 transition-all duration-300"
          >
            <Mail className="mr-2 h-5 w-5" />
            Contact Me
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
              ${(personalInfo.stats.totalSales / 1000000).toFixed(1)}M+
            </div>
            <div className="text-sm text-muted-foreground">Total Sales</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">
              {personalInfo.stats.clientsServed}+
            </div>
            <div className="text-sm text-muted-foreground">Clients Served</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-pink-600 mb-2">
              {personalInfo.stats.yearsExperience}+
            </div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-yellow-600 mb-2">
              {personalInfo.stats.projectsCompleted}+
            </div>
            <div className="text-sm text-muted-foreground">Projects Completed</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;