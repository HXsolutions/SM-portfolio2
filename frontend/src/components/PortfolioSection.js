import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, TrendingUp, Users, Award } from 'lucide-react';
import { portfolio } from '../data/mockData';

const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate title first
          setTimeout(() => setVisibleItems(prev => new Set(prev).add('title')), 100);
          // Then animate filters
          setTimeout(() => setVisibleItems(prev => new Set(prev).add('filters')), 200);
          // Then animate projects with stagger
          filteredProjects.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => new Set(prev).add(`project-${index}`));
            }, 400 + index * 120);
          });
          // Finally animate CTA
          setTimeout(() => setVisibleItems(prev => new Set(prev).add('cta')), 800);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = ['All', 'E-commerce', 'Amazon', 'Development', 'Branding'];

  const filteredProjects = selectedCategory === 'All' 
    ? portfolio 
    : portfolio.filter(project => project.category === selectedCategory);

  const handleProjectView = (project) => {
    console.log(`Viewing project: ${project.title}`);
  };

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-500 ${
          visibleItems.has('title') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Portfolio
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real results from real projects. Here's how I've helped businesses achieve their goals.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transform transition-all duration-500 ${
          visibleItems.has('filters') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'hover:bg-muted'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className={`group relative overflow-hidden transition-all duration-400 cursor-pointer transform ${
                visibleItems.has(`project-${index}`) ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
              } ${
                hoveredProject === project.id 
                  ? 'scale-105 shadow-2xl' 
                  : 'hover:scale-102 hover:shadow-xl'
              }`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                    {project.category === 'E-commerce' ? '🛍️' : 
                     project.category === 'Amazon' ? '📦' : 
                     project.category === 'Development' ? '💻' : 
                     project.category === 'Branding' ? '🎨' : '📈'}
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-black">
                    {project.category}
                  </Badge>
                </div>

                {/* View Button */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => handleProjectView(project)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </CardTitle>
                <p className="text-muted-foreground">
                  {project.description}
                </p>
              </CardHeader>

              <CardContent>
                {/* Results */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                      Results Achieved
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(project.results).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-sm font-bold text-green-600 mb-1">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* 3D Chart Elements */}
              <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity duration-300">
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transform transition-all duration-500 ${
          visibleItems.has('cta') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to See Similar Results?</h3>
            <p className="text-muted-foreground mb-6">
              These are just a few examples of the success stories I've helped create. 
              Let's discuss how we can achieve similar results for your business.
            </p>
            <Button 
              size="lg"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Start Your Success Story
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;