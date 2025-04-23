import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  t: (key: string) => string;
  language: string;
  setLocation: (location: string) => void;
}

const CTASection: React.FC<CTASectionProps> = ({ t, language, setLocation }) => {
  return (
    <section className="py-24 bg-primary/5 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'en' ? 'Ready to Start Your Journey?' : 
             language === 'ru' ? 'Готовы начать свой путь?' : 
             'Жолыңызды бастауға дайынсыз ба?'}
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            {language === 'en' ? 'Join thousands of students who have already discovered their path with Portfol.IO' : 
             language === 'ru' ? 'Присоединяйтесь к тысячам студентов, которые уже нашли свой путь с Portfol.IO' : 
             'Portfol.IO арқылы өз жолын тапқан мыңдаған студенттерге қосылыңыз'}
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => setLocation('register')}
          >
            {language === 'en' ? 'Get Started Now' : 
             language === 'ru' ? 'Начать сейчас' : 
             'Қазір бастаңыз'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection; 