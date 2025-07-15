// Mock data for portfolio website
export const personalInfo = {
  name: "Sohaib Mushtaq",
  tagline: "Entrepreneur / 6-Figure Shopify & Amazon Seller / E-commerce Trainer",
  bio: "With over $4M+ in sales generated across multiple platforms, I help brands and startups build profitable e-commerce businesses. As a Top Rated Plus freelancer on Upwork, I've guided countless businesses from concept to 6-figure success stories.",
  stats: {
    totalSales: 4000000,
    clientsServed: 500,
    yearsExperience: 8,
    projectsCompleted: 750
  },
  contact: {
    email: "sohaib@example.com",
    phone: "+1 (555) 123-4567",
    location: "Remote Worldwide",
    linkedin: "https://linkedin.com/in/sohaibmushtaq",
    upwork: "https://upwork.com/freelancers/sohaibmushtaq"
  }
};

export const services = [
  {
    id: 1,
    title: "Business Consulting",
    description: "Strategic guidance for scaling your e-commerce business from startup to 6-figures",
    icon: "💼",
    features: ["Market Analysis", "Business Strategy", "Growth Planning", "Revenue Optimization"],
    price: "Starting at $150/hour"
  },
  {
    id: 2,
    title: "Shopify Store Development",
    description: "Custom Shopify stores designed to convert visitors into customers",
    icon: "🛍️",
    features: ["Custom Design", "App Integration", "Performance Optimization", "Mobile Responsive"],
    price: "Starting at $2,500"
  },
  {
    id: 3,
    title: "Amazon Store Setup",
    description: "Complete Amazon seller account setup and optimization for maximum visibility",
    icon: "📦",
    features: ["Account Setup", "Product Listing", "SEO Optimization", "PPC Management"],
    price: "Starting at $1,200"
  },
  {
    id: 4,
    title: "Brand Design",
    description: "Professional brand identity design that resonates with your target audience",
    icon: "🎨",
    features: ["Logo Design", "Brand Guidelines", "Marketing Materials", "Social Media Assets"],
    price: "Starting at $800"
  },

];

export const experience = [
  {
    id: 1,
    company: "Amazon Solutions Pro",
    position: "Senior E-commerce Consultant",
    duration: "2021 - Present",
    description: "Leading e-commerce strategy for enterprise clients, generating $2M+ in additional revenue",
    achievements: ["Increased client revenue by 150% on average", "Managed 50+ Amazon seller accounts", "Developed automated inventory management systems"]
  },
  {
    id: 2,
    company: "Extreme Commerce",
    position: "Lead Shopify Developer",
    duration: "2019 - 2021",
    description: "Specialized in high-converting Shopify store development for scaling businesses",
    achievements: ["Built 100+ Shopify stores", "Average conversion rate improvement of 35%", "Trained 20+ junior developers"]
  },
  {
    id: 3,
    company: "TEVTA (Technical Education)",
    position: "E-commerce Trainer",
    duration: "2018 - 2019",
    description: "Conducted training programs for aspiring e-commerce entrepreneurs",
    achievements: ["Trained 500+ students", "95% student satisfaction rate", "Developed comprehensive curriculum"]
  },
  {
    id: 4,
    company: "Freelance Consultant",
    position: "Independent E-commerce Consultant",
    duration: "2016 - 2018",
    description: "Provided consulting services to small and medium businesses",
    achievements: ["Served 100+ clients", "Achieved Top Rated Plus status on Upwork", "Generated $1M+ in client revenue"]
  }
];

export const portfolio = [
  {
    id: 1,
    title: "Fashion Brand Scale-up",
    category: "E-commerce",
    description: "Scaled a fashion startup from $50K to $500K annual revenue",
    results: {
      revenue: "900% increase",
      conversion: "45% improvement",
      traffic: "300% growth"
    },
    technologies: ["Shopify", "Facebook Ads", "Google Analytics", "Klaviyo"],
    image: "/images/portfolio-1.jpg"
  },
  {
    id: 2,
    title: "Amazon FBA Optimization",
    category: "Amazon",
    description: "Optimized product listings and PPC campaigns for electronics brand",
    results: {
      sales: "250% increase",
      ranking: "Top 3 in category",
      roi: "400% ROAS"
    },
    technologies: ["Amazon Seller Central", "Helium 10", "PPC Management", "A/B Testing"],
    image: "/images/portfolio-2.jpg"
  },
  {
    id: 3,
    title: "SaaS Mobile App",
    category: "Development",
    description: "Developed cross-platform mobile app for productivity SaaS company",
    results: {
      downloads: "50K+ downloads",
      rating: "4.8 star rating",
      retention: "85% user retention"
    },
    technologies: ["React Native", "Node.js", "MongoDB", "Firebase"],
    image: "/images/portfolio-3.jpg"
  },
  {
    id: 4,
    title: "Health & Wellness Brand",
    category: "Branding",
    description: "Complete brand identity and digital presence for wellness startup",
    results: {
      engagement: "200% increase",
      followers: "25K+ followers",
      sales: "150% boost"
    },
    technologies: ["Adobe Creative Suite", "Figma", "WordPress", "Social Media"],
    image: "/images/portfolio-4.jpg"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO, Fashion Forward",
    company: "Fashion Forward",
    testimonial: "Sohaib transformed our struggling online store into a 6-figure business. His expertise in Shopify and marketing strategy is unmatched.",
    avatar: "/images/testimonial-1.jpg",
    rating: 5
  },
  {
    id: 2,
    name: "Mike Chen",
    position: "Founder, TechGadgets Pro",
    company: "TechGadgets Pro",
    testimonial: "Working with Sohaib on our Amazon optimization was the best decision we made. Our sales tripled in just 6 months.",
    avatar: "/images/testimonial-2.jpg",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    position: "Marketing Director, WellnessHub",
    company: "WellnessHub",
    testimonial: "The mobile app Sohaib developed for us exceeded all expectations. The user experience is incredible and our customers love it.",
    avatar: "/images/testimonial-3.jpg",
    rating: 5
  },
  {
    id: 4,
    name: "David Thompson",
    position: "Owner, Home Decor Plus",
    company: "Home Decor Plus",
    testimonial: "Sohaib's SEO and digital marketing strategies helped us dominate our niche. We're now the #1 result for our main keywords.",
    avatar: "/images/testimonial-4.jpg",
    rating: 5
  }
];

export const skills = [
  { name: "E-commerce Strategy", level: 95 },
  { name: "Shopify Development", level: 90 },
  { name: "Amazon FBA", level: 88 },
  { name: "Digital Marketing", level: 85 },
  { name: "Brand Development", level: 80 },
  { name: "Mobile App Development", level: 75 },
  { name: "SEO Optimization", level: 92 },
  { name: "Business Consulting", level: 93 }
];