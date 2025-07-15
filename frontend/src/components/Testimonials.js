import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '../data/mockData';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate title first
          setTimeout(() => setVisibleItems(prev => new Set(prev).add('title')), 100);
          // Then animate main testimonial
          setTimeout(() => setVisibleItems(prev => new Set(prev).add('main')), 200);
          // Then animate controls
          setTimeout(() => setVisibleItems(prev => new Set(prev).add('controls')), 400);
          // Finally animate preview cards
          setTimeout(() => setVisibleItems(prev => new Set(prev).add('preview')), 600);
          // And CTA
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

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-500 ${
          visibleItems.has('title') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Client Testimonials
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take my word for it. Here's what my clients say about working with me.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Display */}
          <Card className={`relative overflow-hidden transform transition-all duration-500 ${
            visibleItems.has('main') ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}>
            {/* Floating 3D Quote Icons */}
            <div className="absolute top-8 left-8 text-6xl opacity-10">
              <Quote className="h-16 w-16 text-blue-500" />
            </div>
            <div className="absolute bottom-8 right-8 text-6xl opacity-10 rotate-180">
              <Quote className="h-16 w-16 text-purple-500" />
            </div>

            <CardContent className="p-8 sm:p-12">
              <div className="text-center">
                {/* Avatar */}
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg sm:text-xl text-foreground leading-relaxed mb-6 italic">
                  "{testimonials[currentTestimonial].testimonial}"
                </blockquote>

                {/* Client Info */}
                <div className="space-y-2">
                  <div className="font-semibold text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-muted-foreground">
                    {testimonials[currentTestimonial].position}
                  </div>
                  <div className="text-blue-600 font-medium">
                    {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Controls */}
          <div className={`flex items-center justify-center mt-8 space-x-4 transform transition-all duration-500 ${
            visibleItems.has('controls') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-blue-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${((currentTestimonial + 1) / testimonials.length) * 100}%` }}
            />
          </div>
        </div>

        {/* All Testimonials Preview */}
        <div className={`mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transform transition-all duration-500 ${
          visibleItems.has('preview') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={`cursor-pointer transition-all duration-300 ${
                index === currentTestimonial
                  ? 'scale-105 shadow-lg ring-2 ring-blue-600'
                  : 'hover:scale-102 hover:shadow-md'
              }`}
              onClick={() => goToTestimonial(index)}
            >
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="text-sm font-medium mb-1">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                  <div className="flex justify-center mt-2">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transform transition-all duration-500 ${
          visibleItems.has('cta') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Join My Success Stories</h3>
            <p className="text-muted-foreground mb-6">
              Ready to be the next success story? Let's work together to achieve your business goals.
            </p>
            <Button 
              size="lg"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;