import React from 'react';
import { motion } from 'framer-motion';

interface FeatureSectionProps {
  features: {
    icon: React.ReactNode;
    title: string;
    desc: string;
  }[];
  t: (key: string) => string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ features, t }) => {
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
          {t('features.title')}
        </h2>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          {t('features.subtitle')}
        </p>
      </motion.div>

      <motion.div
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            variants={{
              offscreen: {
                y: 30,
                opacity: 0
              },
              onscreen: (i) => ({
                y: 0,
                opacity: 1,
                transition: {
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.5,
                  delay: i * 0.05
                }
              })
            }}
            custom={i}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-foreground/70">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeatureSection; 