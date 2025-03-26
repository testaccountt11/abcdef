
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

  const steps = [
    { number: 1, title: "Регистрация", desc: "Создай аккаунт и укажи цели" },
    { number: 2, title: "Выбор пути", desc: "Курсы, стажировки, менторы – всё в одном месте!" },
    { number: 3, title: "Развитие", desc: "Проходи обучение, собирай сертификаты и добивайся успеха!" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
              whileHover={{ scale: 1.05 }}
            >
              Portfol.IO
            </motion.div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:text-blue-400">О нас</Button>
              <Button variant="ghost" className="text-white hover:text-blue-400">Курсы</Button>
              <Button variant="ghost" className="text-white hover:text-blue-400">Менторы</Button>
              <Button 
                onClick={() => setLocation("/login")}
                className="bg-white/10 hover:bg-white/20 text-white"
              >
                Войти
              </Button>
              <Button 
                onClick={() => setLocation("/register")}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                Регистрация
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-20 px-6 relative"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto text-center relative">
          <motion.h1 
            className="text-4xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
            variants={fadeIn}
          >
            Создай своё успешное будущее
          </motion.h1>
          <motion.p 
            className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto"
            variants={fadeIn}
          >
            Платформа нового поколения для развития твоего потенциала через курсы, стажировки и менторство
          </motion.p>
          <motion.div 
            className="flex justify-center gap-4"
            variants={fadeIn}
          >
            <Button 
              onClick={() => setLocation("/register")}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-6 text-lg"
            >
              Начать бесплатно
            </Button>
            <Button 
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-400/10 px-8 py-6 text-lg"
            >
              Узнать больше
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section 
        className="py-20 px-6"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all"
                variants={fadeIn}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  {feature.title}
                </h3>
                <p className="text-blue-200">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How it works */}
      <motion.section 
        className="py-20 px-6 relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Как это работает?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-blue-200">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
