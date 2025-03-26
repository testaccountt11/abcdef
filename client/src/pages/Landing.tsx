
import { useState } from "react";
import { useLocation } from "@/hooks/use-location";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Landing() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
      {/* Navbar */}
      <nav className="py-4 px-6 flex justify-between items-center backdrop-blur-sm bg-white/30">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-md bg-primary-600 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="M16 6H3v12h13V6z" />
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <path d="M8 12h4" />
              <rect x="16" y="6" width="5" height="5" />
              <rect x="16" y="16" width="5" height="2" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-gray-900 ml-2">Portfol.IO</span>
        </div>
        <div className="space-x-4">
          <Button variant="ghost" onClick={() => setLocation("/login")}>Войти</Button>
          <Button onClick={() => setLocation("/register")}>Регистрация</Button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 py-20 text-center"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Построй своё успешное будущее с Portfol.IO!
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Portfol.IO - это платформа для студентов и молодых специалистов, где вы можете отслеживать свое обучение, получать сертификаты, находить стажировки и подключаться к менторам - всё в одном месте.
        </p>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex justify-center space-x-4"
        >
          <Button size="lg" className="text-lg px-8 py-6" onClick={() => setLocation("/register")}>
            Начать бесплатно
          </Button>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-6 backdrop-blur-lg bg-white/40 rounded-xl shadow-lg"
          >
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Курсы</h3>
            <p className="text-gray-600">От нас и от ведущих партнёров</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-6 backdrop-blur-lg bg-white/40 rounded-xl shadow-lg"
          >
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Стажировки</h3>
            <p className="text-gray-600">Реальный опыт работы</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-6 backdrop-blur-lg bg-white/40 rounded-xl shadow-lg"
          >
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Олимпиады</h3>
            <p className="text-gray-600">Соревнуйтесь и побеждайте</p>
          </motion.div>
        </div>

        {/* Partners Section */}
        <div className="mt-20 py-10 backdrop-blur-lg bg-white/20 rounded-xl">
          <h2 className="text-2xl font-bold mb-8">Наши партнёры</h2>
          <div className="flex justify-center items-center space-x-8 opacity-70">
            <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
            <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
            <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">Отзывы студентов</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-6 backdrop-blur-lg bg-white/30 rounded-xl shadow-lg"
            >
              <p className="text-gray-600 mb-4">"Благодаря Portfol.IO я нашел свою первую стажировку!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div className="ml-3">
                  <p className="font-semibold">Александр П.</p>
                  <p className="text-sm text-gray-500">Студент, 3 курс</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-6 backdrop-blur-lg bg-white/30 rounded-xl shadow-lg"
            >
              <p className="text-gray-600 mb-4">"Удобная платформа для отслеживания своего прогресса"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div className="ml-3">
                  <p className="font-semibold">Мария С.</p>
                  <p className="text-sm text-gray-500">Выпускница</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
