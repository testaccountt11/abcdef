
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100 overflow-x-hidden">
      <nav className="py-4 px-6 backdrop-blur-sm bg-white/30 fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-md bg-primary-600 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path d="M16 6H3v12h13V6z" />
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <path d="M8 12h4" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900 ml-2">Portfol.IO</span>
          </div>
          <div className="space-x-4">
            <Button variant="ghost" onClick={() => setLocation("/login")}>Войти</Button>
            <Button onClick={() => setLocation("/register")}>Начать</Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-32">
        <motion.div initial="initial" animate="animate" variants={staggerChildren} className="text-center mb-32">
          <motion.h1 variants={fadeIn} className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Построй своё успешное будущее с Portfol.IO!
          </motion.h1>
          <motion.p variants={fadeIn} className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Платформа для студентов и молодых специалистов, где вы можете отслеживать свое обучение, 
            находить стажировки и выстраивать свою карьеру.
          </motion.p>
          <motion.div variants={fadeIn} className="flex justify-center gap-4">
            <Button size="lg" onClick={() => setLocation("/register")} className="text-lg px-8 py-6">
              Начать бесплатно
            </Button>
            <Button size="lg" variant="outline" onClick={() => setLocation("/courses")} className="text-lg px-8 py-6">
              Смотреть курсы
            </Button>
          </motion.div>
        </motion.div>

        <motion.div variants={staggerChildren} initial="initial" animate="animate" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { icon: "🎓", title: "Курсы", desc: "Доступ к качественным курсам от нас и партнеров" },
            { icon: "💼", title: "Стажировки", desc: "Возможности для практики и карьерного роста" },
            { icon: "🏆", title: "Олимпиады", desc: "Участвуйте в конкурсах и олимпиадах" },
            { icon: "🧑‍🏫", title: "Менторство", desc: "Поддержка от опытных специалистов" },
            { icon: "📚", title: "Подготовка", desc: "Советы по экзаменам и поступлению" },
            { icon: "🌟", title: "Портфолио", desc: "Создайте впечатляющее цифровое портфолио" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              className="p-6 backdrop-blur-md bg-white/30 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeIn} initial="initial" animate="animate" className="text-center mb-32">
          <h2 className="text-3xl font-bold mb-12">Наши партнеры</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <div className="text-gray-400">Логотип {i}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
