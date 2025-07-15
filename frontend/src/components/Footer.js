import React, { useState, useEffect, useRef } from 'react';
import { personalInfo } from '../data/mockData';
import { Mail, Phone, MapPin, Linkedin, ExternalLink, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [visibleItems, setVisibleItems] = useState(new Set());
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisibleItems(prev => new Set(prev).add('content')), 100);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand & Contact */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SM
                </span>
                <div>
                  <div className="font-bold text-lg">{personalInfo.name}</div>
                  <div className="text-sm text-muted-foreground">E-commerce Expert</div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Helping businesses scale from startup to 6-figures through proven e-commerce strategies.
              </p>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span className="text-muted-foreground">{personalInfo.contact.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-purple-600" />
                  <span className="text-muted-foreground">{personalInfo.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-pink-600" />
                  <span className="text-muted-foreground">{personalInfo.contact.location}</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleNavClick('#home')}
                    className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavClick('#about')}
                    className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavClick('#services')}
                    className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavClick('#portfolio')}
                    className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                  >
                    Portfolio
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavClick('#contact')}
                    className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-sm text-muted-foreground">Business Consulting</span>
                </li>
                <li>
                  <span className="text-sm text-muted-foreground">Shopify Development</span>
                </li>
                <li>
                  <span className="text-sm text-muted-foreground">Amazon Setup</span>
                </li>
                <li>
                  <span className="text-sm text-muted-foreground">Brand Design</span>
                </li>
              </ul>
            </div>

            {/* Professional Links */}
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-3">
                <a 
                  href={personalInfo.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a 
                  href={personalInfo.contact.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-green-600 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Upwork Profile</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Stats */}
              <div className="mt-6 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                <div className="text-sm font-medium mb-1">Quick Stats</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="font-bold text-blue-600">$4M+</div>
                    <div className="text-muted-foreground">Sales</div>
                  </div>
                  <div>
                    <div className="font-bold text-purple-600">500+</div>
                    <div className="text-muted-foreground">Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span>for your success</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;