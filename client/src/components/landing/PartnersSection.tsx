import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface PartnersSectionProps {
  partners: string[];
  t: (key: string) => string;
  language: string;
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ partners, t, language }) => {
  return (
    <section className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('partners.title')}
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            {t('partners.subtitle')}
          </p>
        </motion.div>

        <div className="overflow-hidden">
          {/* First row - scroll left */}
          <motion.div 
            className="flex space-x-8 mb-8"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ 
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              }
            }}
          >
            {partners.map((partner, i) => (
              <div 
                key={i} 
                className="flex-shrink-0 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg px-6 py-4 text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {partner}
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {partners.map((partner, i) => (
              <div 
                key={`dup-${i}`} 
                className="flex-shrink-0 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg px-6 py-4 text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {partner}
              </div>
            ))}
          </motion.div>

          {/* Second row - scroll right */}
          <motion.div 
            className="flex space-x-8"
            initial={{ x: "-50%" }}
            animate={{ x: 0 }}
            transition={{ 
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              }
            }}
          >
            {partners.slice().reverse().map((partner, i) => (
              <div 
                key={i} 
                className="flex-shrink-0 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg px-6 py-4 text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {partner}
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {partners.slice().reverse().map((partner, i) => (
              <div 
                key={`dup-${i}`} 
                className="flex-shrink-0 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg px-6 py-4 text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {partner}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {language === 'en' ? 'Become a Partner' : 
             language === 'ru' ? 'Стать партнером' : 
             'Серіктес болу'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection; 