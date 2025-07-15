import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { personalInfo, skills } from '../data/mockData';

const About = () => {
  const [animatedStats, setAnimatedStats] = useState({
    totalSales: 0,
    clientsServed: 0,
    yearsExperience: 0,
    projectsCompleted: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const animateCounter = (key, target, duration = 2000) => {
        let start = 0;
        const step = target / (duration / 16);
        
        const animate = () => {
          start += step;
          if (start < target) {
            setAnimatedStats(prev => ({
              ...prev,
              [key]: Math.floor(start)
            }));
            requestAnimationFrame(animate);
          } else {
            setAnimatedStats(prev => ({
              ...prev,
              [key]: target
            }));
          }
        };
        
        animate();
      };

      // Animate all stats
      Object.entries(personalInfo.stats).forEach(([key, value]) => {
        animateCounter(key, value);
      });
    }
  }, [isVisible]);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate entrepreneur with a proven track record of building and scaling successful e-commerce businesses
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - About Content */}
          <div className="space-y-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                With over <strong className="text-blue-600">{personalInfo.stats.yearsExperience} years</strong> in the e-commerce industry, 
                I've helped countless businesses transform their ideas into profitable ventures. My expertise spans across 
                multiple platforms and technologies, with a focus on delivering measurable results.
              </p>
              
              <p className="text-lg leading-relaxed">
                As a <strong className="text-purple-600">Top Rated Plus</strong> freelancer on Upwork, I've maintained a 
                99% client satisfaction rate while scaling businesses from startup to multi-million dollar operations. 
                My approach combines technical excellence with strategic business insight.
              </p>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-0 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ${(animatedStats.totalSales / 1000000).toFixed(1)}M+
                  </div>
                  <div className="text-sm text-muted-foreground">Total Sales Generated</div>
                </CardContent>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
                <CardContent className="p-0 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {animatedStats.clientsServed}+
                  </div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </CardContent>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200 dark:border-pink-800">
                <CardContent className="p-0 text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-2">
                    {animatedStats.yearsExperience}+
                  </div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </CardContent>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800">
                <CardContent className="p-0 text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {animatedStats.projectsCompleted}+
                  </div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Side - Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Core Expertise</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <Badge variant="secondary">{skill.level}%</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 100}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications/Badges */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
              <h4 className="font-semibold mb-3">Professional Highlights</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-600 hover:bg-blue-700">Top Rated Plus</Badge>
                <Badge className="bg-purple-600 hover:bg-purple-700">99% Success Rate</Badge>
                <Badge className="bg-pink-600 hover:bg-pink-700">6-Figure Expert</Badge>
                <Badge className="bg-yellow-600 hover:bg-yellow-700">E-commerce Specialist</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;