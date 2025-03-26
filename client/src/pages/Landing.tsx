import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

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

  const features = [
    { icon: "📝", title: "Персональные планы", desc: "AI поможет создать стратегию обучения и развития" },
    { icon: "🎓", title: "Лучшие курсы", desc: "Подобранные возможности для портфолио" },
    { icon: "🏆", title: "Олимпиады", desc: "Участвуй и выигрывай стипендии" },
    { icon: "👨‍🏫", title: "Менторы", desc: "Получай советы от лучших преподавателей" }
  ];

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 glass-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="text-3xl font-bold text-gradient"
              whileHover={{ scale: 1.05 }}
            >
              Portfol.IO
            </motion.div>
            <div className="flex items-center gap-6">
              <Button variant="ghost" className="text-white/80 hover:text-white">О нас</Button>
              <Button variant="ghost" className="text-white/80 hover:text-white">Курсы</Button>
              <Button variant="ghost" className="text-white/80 hover:text-white">Менторы</Button>
              <Button 
                onClick={() => setLocation("/login")}
                className="glow bg-white/10 hover:bg-white/20"
              >
                Войти
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 px-6">
        <motion.section 
          className="container mx-auto text-center"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-gradient"
            variants={fadeIn}
          >
            Создай своё успешное будущее
          </motion.h1>
          <motion.p 
            className="text-xl text-white/60 mb-12 max-w-2xl mx-auto"
            variants={fadeIn}
          >
            Платформа для студентов, помогающая найти курсы, стажировки и менторов для поступления в лучшие вузы
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            variants={fadeIn}
          >
            <Button 
              className="glow bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-lg py-6 px-8"
              onClick={() => setLocation("/register")}
            >
              Попробовать бесплатно
            </Button>
            <Button 
              variant="outline" 
              className="border-white/10 hover:bg-white/5 text-lg py-6 px-8"
            >
              Узнать больше
            </Button>
          </motion.div>
        </motion.section>

        <motion.section 
          className="container mx-auto py-32"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="glass-card rounded-2xl p-8 hover:bg-white/5 transition-colors"
                variants={fadeIn}
                whileHover={{ y: -10 }}
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-gradient">
                  {feature.title}
                </h3>
                <p className="text-white/60">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}