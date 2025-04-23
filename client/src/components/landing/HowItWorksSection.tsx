import React from 'react';
import { motion } from 'framer-motion';

interface HowItWorksSectionProps {
  steps: {
    number: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  language: string;
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ steps, language }) => {
  return (
    <section className="py-24 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'en' ? 'How It Works' : 
             language === 'ru' ? 'Как это работает' : 
             'Қалай жұмыс істейді'}
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            {language === 'en' ? 'Three simple steps to start your journey' : 
             language === 'ru' ? 'Три простых шага, чтобы начать свой путь' : 
             'Жолыңызды бастау үшін үш қарапайым қадам'}
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 -translate-y-1/2 hidden md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="relative z-10 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  {step.icon}
                </div>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-foreground/70">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 