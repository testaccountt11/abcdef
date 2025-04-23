import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: {
    name: string;
    role: string;
    quote: string;
    rating: number;
    image: string;
  }[];
  t: (key: string) => string;
  language: string;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials, t, language }) => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          {t('testimonials.title')}
        </h2>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          {t('testimonials.subtitle')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6"
          >
            <div className="flex items-center mb-4">
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <h3 className="font-bold">{testimonial.name}</h3>
                <p className="text-sm text-foreground/70">{testimonial.role}</p>
              </div>
            </div>
            <div className="flex mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-foreground/70 italic">"{testimonial.quote}"</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection; 