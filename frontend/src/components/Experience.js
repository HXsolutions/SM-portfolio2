import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, MapPin, Award } from 'lucide-react';
import { experience } from '../data/mockData';

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setVisibleItems(prev => new Set(prev).add(index));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '10px 0px' }
    );

    // Use a timeout to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach(item => {
        if (item) {
          observer.observe(item);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="experience" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A journey of continuous growth and proven success in the e-commerce industry
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {experience.map((item, index) => (
              <div
                key={item.id}
                className={`timeline-item relative ${
                  index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                } flex flex-col lg:flex-row lg:items-center`}
                data-index={index}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-background z-10">
                  {/* Rotating gear effect */}
                  <div className={`absolute inset-0 rounded-full border-2 border-blue-400 ${
                    visibleItems.has(index) ? 'animate-spin' : ''
                  }`} style={{ animationDuration: '3s' }}></div>
                </div>

                {/* Content */}
                <div className={`lg:w-1/2 ${
                  index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'
                } ml-12 lg:ml-0`}>
                  <Card className={`transform transition-all duration-500 ${
                    visibleItems.has(index) 
                      ? 'translate-y-0 opacity-100 scale-100' 
                      : 'translate-y-8 opacity-0 scale-95'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {item.position}
                          </h3>
                          <div className="flex items-center space-x-2 text-blue-600 font-semibold mb-2">
                            <MapPin className="h-4 w-4" />
                            <span>{item.company}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>{item.duration}</span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="ml-4">
                          {item.duration.split(' - ')[0]}
                        </Badge>
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">Key Achievements</span>
                        </div>
                        <ul className="space-y-2">
                          {item.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-muted-foreground">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for alignment */}
                <div className="hidden lg:block lg:w-1/2"></div>
              </div>
            ))}
          </div>

          {/* Timeline End */}
          <div className="absolute left-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 bottom-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-background flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">8+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4</div>
            <div className="text-sm text-muted-foreground">Companies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600 mb-2">15+</div>
            <div className="text-sm text-muted-foreground">Major Projects</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;