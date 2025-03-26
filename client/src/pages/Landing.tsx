
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 transition-all duration-300">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">P.IO</span>
            </div>
            <span className="text-xl font-bold">Portfol.IO</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Button variant="ghost">О нас</Button>
            <Button variant="ghost">Курсы</Button>
            <Button variant="ghost">Стажировки</Button>
            <Button variant="ghost">Менторы</Button>
            <Button onClick={() => setLocation("/login")}>Войти</Button>
            <Button variant="default" onClick={() => setLocation("/register")}>Регистрация</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-20 px-6"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            variants={fadeIn}
          >
            Создай своё успешное будущее с Portfol.IO!
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            variants={fadeIn}
          >
            Платформа для студентов, помогающая найти курсы, стажировки и менторов для поступления в лучшие вузы.
          </motion.p>
          <motion.div className="space-x-4" variants={fadeIn}>
            <Button size="lg" onClick={() => setLocation("/register")}>
              Попробовать бесплатно
            </Button>
            <Button size="lg" variant="outline">
              Узнать больше
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section 
        className="py-20 px-6 bg-blue-50"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Почему Portfol.IO?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-all"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How it works */}
      <motion.section 
        className="py-20 px-6"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Как это работает?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="relative"
                variants={fadeIn}
              >
                <div className="text-6xl font-bold text-blue-100 absolute -top-8 left-0">
                  {step.number}
                </div>
                <div className="bg-white rounded-xl p-6 relative z-10">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">Portfol.IO</h3>
            <p className="text-gray-400">Построй своё успешное будущее с нами</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Ссылки</h4>
            <ul className="space-y-2 text-gray-400">
              <li>О нас</li>
              <li>Курсы</li>
              <li>Стажировки</li>
              <li>Менторы</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Контакты</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@portfol.io</li>
              <li>Telegram: @portfolio</li>
              <li>Instagram: @portfol.io</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Правовая информация</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Условия использования</li>
              <li>Политика конфиденциальности</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          © 2024 Portfol.IO – Все права защищены.
        </div>
      </footer>
    </div>
  );
}
