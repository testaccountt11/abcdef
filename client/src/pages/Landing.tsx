
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { useTranslations } from "@/hooks/use-translations";
import { TargetIcon, GraduationCapIcon, TrophyIcon, Users2Icon } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Landing() {
  const [, setLocation] = useLocation();
  const { t } = useTranslations();

  const features = [
    { 
      icon: <TargetIcon className="w-10 h-10 text-primary" />, 
      title: t('features.personalPath.title'), 
      desc: t('features.personalPath.desc')
    },
    { 
      icon: <GraduationCapIcon className="w-10 h-10 text-primary" />, 
      title: t('features.topCourses.title'), 
      desc: t('features.topCourses.desc') 
    },
    { 
      icon: <TrophyIcon className="w-10 h-10 text-primary" />, 
      title: t('features.competitions.title'), 
      desc: t('features.competitions.desc') 
    },
    { 
      icon: <Users2Icon className="w-10 h-10 text-primary" />, 
      title: t('features.mentorship.title'), 
      desc: t('features.mentorship.desc') 
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 px-6">
        <motion.section 
          className="max-w-7xl mx-auto text-center"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-gradient leading-tight"
            variants={fadeIn}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p 
            className="text-xl mb-12 max-w-2xl mx-auto text-foreground/70"
            variants={fadeIn}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-20"
            variants={fadeIn}
          >
            <Button 
              className="glow bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-lg py-6 px-8"
              onClick={() => setLocation("/register")}
            >
              {t('hero.start')}
            </Button>
            <Button 
              className="glow glass text-lg py-6 px-8"
              variant="outline"
            >
              {t('hero.learnMore')}
            </Button>
          </motion.div>

          <motion.div 
            className="hero-grid"
            variants={fadeIn}
          >
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                className="glass p-6 text-center animate-float flex flex-col items-center"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/60">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}
