import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { useTranslations } from "@/hooks/use-translations";
import { 
  TargetIcon, GraduationCapIcon, TrophyIcon, Users2Icon, 
  BrainIcon, BookOpenIcon, AwardIcon, BadgeIcon, 
  ArrowRight, UserPlusIcon, Compass, Medal, Star
} from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link"; // Added Link component


// Animation variants
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

const featureCardVariants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
      delay: i * 0.1
    }
  })
};

export default function Landing() {
  const [, setLocation] = useLocation();
  const { t, language } = useTranslations();
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: featuresProgress } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"]
  });

  const featureOpacity = useTransform(featuresProgress, [0, 0.5], [0.5, 1]);
  const featureScale = useTransform(featuresProgress, [0, 0.5], [0.95, 1]);

  // All features with translations
  const features = [
    { 
      icon: <BrainIcon className="w-12 h-12 text-primary" />, 
      title: t('features.personalPath.title'), 
      desc: t('features.personalPath.desc')
    },
    { 
      icon: <GraduationCapIcon className="w-12 h-12 text-primary" />, 
      title: t('features.topCourses.title'), 
      desc: t('features.topCourses.desc')
    },
    { 
      icon: <TrophyIcon className="w-12 h-12 text-primary" />, 
      title: t('features.competitions.title'), 
      desc: t('features.competitions.desc')
    },
    { 
      icon: <Users2Icon className="w-12 h-12 text-primary" />, 
      title: t('features.mentorship.title'), 
      desc: t('features.mentorship.desc')
    }
  ];

  // Steps with translations for each language
  const stepsTranslations = {
    en: [
      {
        number: "01",
        title: "Registration",
        description: "Create an account and specify your goals, interests and skills",
        icon: <UserPlusIcon className="w-10 h-10" />
      },
      {
        number: "02",
        title: "Choose Your Path",
        description: "Courses, internships, mentors – all in one place for your development!",
        icon: <Compass className="w-10 h-10" />
      },
      {
        number: "03",
        title: "Portfolio Development",
        description: "Complete courses, collect certificates and achieve success!",
        icon: <Medal className="w-10 h-10" />
      }
    ],
    ru: [
      {
        number: "01",
        title: "Регистрация",
        description: "Создай аккаунт и укажи свои цели, интересы и навыки",
        icon: <UserPlusIcon className="w-10 h-10" />
      },
      {
        number: "02",
        title: "Выбор пути",
        description: "Курсы, стажировки, менторы – всё в одном месте для твоего развития!",
        icon: <Compass className="w-10 h-10" />
      },
      {
        number: "03",
        title: "Развитие портфолио",
        description: "Проходи обучение, собирай сертификаты и добивайся успеха!",
        icon: <Medal className="w-10 h-10" />
      }
    ],
    kz: [
      {
        number: "01",
        title: "Тіркелу",
        description: "Аккаунт жасап, мақсаттарыңызды, қызығушылықтарыңызды және дағдыларыңызды көрсетіңіз",
        icon: <UserPlusIcon className="w-10 h-10" />
      },
      {
        number: "02",
        title: "Жолыңызды таңдаңыз",
        description: "Курстар, тәжірибелер, менторлар – бәрі бір жерде сіздің дамуыңыз үшін!",
        icon: <Compass className="w-10 h-10" />
      },
      {
        number: "03",
        title: "Портфолионы дамыту",
        description: "Оқытудан өтіңіз, сертификаттар жинаңыз және табысқа жетіңіз!",
        icon: <Medal className="w-10 h-10" />
      }
    ]
  };

  // Testimonials with translations for each language
  const testimonialTranslations = {
    en: [
      {
        name: "Assel K.",
        role: "School Graduate",
        quote: "Thanks to Portfol.IO, I was able to prepare a competitive portfolio and get into a top university with a scholarship!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "Daniyar M.",
        role: "2nd Year Student",
        quote: "I found my dream internship and improved my skills by following a personalized development plan.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "Kamila T.",
        role: "High School Student",
        quote: "The mentors on the platform helped me understand which direction I want to develop in and how to achieve my goals.",
        rating: 4,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      }
    ],
    ru: [
      {
        name: "Асель К.",
        role: "Выпускница школы",
        quote: "Благодаря Portfol.IO я смогла подготовить конкурентное портфолио и поступить в топовый университет на бюджет!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "Данияр М.",
        role: "Студент 2 курса",
        quote: "Нашел стажировку своей мечты и улучшил свои навыки, следуя персональному плану развития.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "Камила Т.",
        role: "Старшеклассница",
        quote: "Менторы на платформе помогли мне понять, в каком направлении я хочу развиваться и как достичь цели.",
        rating: 4,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      }
    ],
    kz: [
      {
        name: "Әсел Қ.",
        role: "Мектеп түлегі",
        quote: "Portfol.IO арқасында мен бәсекеге қабілетті портфолио дайындап, үздік университетке грантпен түстім!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "Данияр М.",
        role: "2-ші курс студенті",
        quote: "Мен арман тәжірибемді тауып, жеке даму жоспарын орындай отырып, өз дағдыларымды жақсарттым.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "Кәмила Т.",
        role: "Жоғары сынып оқушысы",
        quote: "Платформадағы менторлар маған қай бағытта дамығым келетінін және мақсаттарыма қалай жетуді түсінуге көмектесті.",
        rating: 4,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      }
    ]
  };

  // Partner names with translations for each language
  const partnerTranslations = {
    en: [
      "KIMEP University",
      "Kazakh-British University",
      "NIS",
      "Nazarbayev University",
      "IITU",
      "Kaspi.kz",
      "Kolesa Group",
      "Yandex"
    ],
    ru: [
      "Университет КИМЭП",
      "Казахстанско-Британский университет",
      "НИШ",
      "Назарбаев Университет",
      "МУИТ",
      "Kaspi.kz",
      "Kolesa Group",
      "Яндекс"
    ],
    kz: [
      "КИМЭП Университеті",
      "Қазақстан-Британ университеті",
      "НЗМ",
      "Назарбаев Университеті",
      "ХАТУ",
      "Kaspi.kz",
      "Kolesa Group",
      "Яндекс"
    ]
  };

  // Get localized content based on current language
  const steps = stepsTranslations[language as keyof typeof stepsTranslations] || stepsTranslations.en;
  const testimonials = testimonialTranslations[language as keyof typeof testimonialTranslations] || testimonialTranslations.en;
  const partners = partnerTranslations[language as keyof typeof partnerTranslations] || partnerTranslations.en;

  const handleScrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <main className="pt-32 px-6 relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-20 left-[10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute top-40 right-[15%] w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-[5%] transform -translate-y-1/2 -z-10">
          <div className="text-primary/10 rotate-[20deg]">
            <GraduationCapIcon className="w-36 h-36 md:w-48 md:h-48" />
          </div>
        </div>
        <div className="absolute top-1/3 right-[5%] transform -translate-y-1/2 -z-10">
          <div className="text-primary/10 -rotate-[15deg]">
            <TrophyIcon className="w-28 h-28 md:w-40 md:h-40" />
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div 
          className="absolute top-40 left-[20%] text-primary/20 -z-10"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <BrainIcon className="w-14 h-14" />
        </motion.div>

        <motion.div 
          className="absolute bottom-20 right-[25%] text-primary/20 -z-10"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <AwardIcon className="w-16 h-16" />
        </motion.div>

        <motion.div 
          className="absolute top-1/2 right-[15%] text-blue-400/20 -z-10"
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ 
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <BadgeIcon className="w-10 h-10" />
        </motion.div>

        <motion.div 
          className="absolute bottom-32 left-[30%] text-blue-400/20 -z-10"
          animate={{ 
            y: [0, -12, 0],
            rotate: [0, 8, 0]
          }}
          transition={{ 
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
        >
          <BookOpenIcon className="w-12 h-12" />
        </motion.div>

        {/* Dots grid */}
        <div className="absolute inset-0 -z-20 opacity-20">
          <div className="absolute left-0 right-0 top-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)]"></div>
        </div>

        {/* Decorative lines */}
        <div className="absolute left-0 top-1/3 w-[30%] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="absolute right-0 top-2/3 w-[30%] h-[1px] bg-gradient-to-l from-transparent via-primary/30 to-transparent"></div>

        {/* Additional floating elements */}
        <motion.div 
          className="absolute top-64 left-[40%] transform -translate-x-1/2 -z-10"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-32 h-32 rounded-full border border-primary/20 opacity-40"></div>
        </motion.div>

        <motion.div 
          className="absolute bottom-40 right-[35%] transform -translate-x-1/2 -z-10"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <div className="w-24 h-24 rounded-full border border-blue-400/20 opacity-30"></div>
        </motion.div>

        <motion.section 
          className="max-w-7xl mx-auto text-center relative z-10 pt-8"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-10 text-gradient leading-tight md:leading-tight lg:leading-tight"
            variants={fadeIn}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p 
            className="text-xl mb-14 max-w-2xl mx-auto text-foreground/70 px-4"
            variants={fadeIn}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-20"
            variants={fadeIn}
          >
            <Button 
              className="relative overflow-hidden group bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-lg py-6 px-10 shadow-lg border-0"
              onClick={() => setLocation("/register")}
            >
              <span className="relative z-10 flex items-center font-medium">
                {t('hero.start')}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </Button>
            <Link href="/catalog" className="relative overflow-hidden group text-lg py-6 px-10 border-primary/30 bg-transparent hover:bg-transparent"> {/* Added Link to Course Catalog */}
              <span className="relative z-10 flex items-center">
                {t('hero.courses')} {/* Changed text to 'View Courses' */}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </Link>
          </motion.div>

          {/* Stats Counter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{language === 'en' ? '100+' : '100+'}</p>
              <p className="text-sm text-foreground/70">
                {language === 'en' ? 'Courses' : 
                 language === 'ru' ? 'Курсов' : 
                 'Курстар'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{language === 'en' ? '50+' : '50+'}</p>
              <p className="text-sm text-foreground/70">
                {language === 'en' ? 'Mentors' : 
                 language === 'ru' ? 'Менторов' : 
                 'Менторлар'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{language === 'en' ? '200+' : '200+'}</p>
              <p className="text-sm text-foreground/70">
                {language === 'en' ? 'Opportunities' : 
                 language === 'ru' ? 'Возможностей' : 
                 'Мүмкіндіктер'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{language === 'en' ? '1000+' : '1000+'}</p>
              <p className="text-sm text-foreground/70">
                {language === 'en' ? 'Students' : 
                 language === 'ru' ? 'Студентов' : 
                 'Студенттер'}
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Feature Cards */}
        <motion.section 
          ref={featuresRef}
          className="py-24 max-w-7xl mx-auto"
          style={{ opacity: featureOpacity, scale: featureScale }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.title')}</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                className="bg-card/50 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-border/50 hover:border-primary/30 h-full flex flex-col items-center justify-center"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                variants={featureCardVariants}
                custom={i}
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-foreground/70 text-center">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section 
          ref={howItWorksRef}
          className="py-24 bg-primary/5 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'en' ? 'How It Works' : 
                 language === 'ru' ? 'Как это работает?' : 
                 'Қалай жұмыс істейді?'}
              </h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                {language === 'en' ? 'Just three simple steps to start your educational journey' : 
                 language === 'ru' ? 'Всего три простых шага для начала вашего образовательного пути' : 
                 'Білім жолыңызды бастау үшін үш қарапайым қадам'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step: { number: string; title: string; description: string; icon: React.ReactNode }, index: number) => (
                <motion.div 
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/50 h-full">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                      {step.icon}
                    </div>
                    <span className="text-5xl font-bold text-primary/20 absolute top-4 right-6">
                      {step.number}
                    </span>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-foreground/70">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-primary/50" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section 
          ref={testimonialsRef}
          className="py-24 max-w-7xl mx-auto px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('testimonials.title')}</h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-lg text-foreground/70">
              <span className="font-bold">4.8/5</span> 
              {language === 'en' ? ' based on ' : 
               language === 'ru' ? ' на основе ' : 
               ' негізінде '}
              <span className="font-bold">10,000+</span> 
              {language === 'en' ? ' student reviews' : 
               language === 'ru' ? ' отзывов студентов' : 
               ' студенттердің пікірлері'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial: { name: string; role: string; quote: string; rating: number; image: string }, index: number) => (
              <motion.div 
                key={index}
                className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-foreground/70">{testimonial.role}</p>
                    </div>
                    <div className="flex">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg mt-2 mb-3">
                  <blockquote className="text-foreground/80 italic relative">
                    <span className="text-3xl absolute -top-4 -left-1 text-primary/40">"</span>
                    <p className="pl-3 pr-3">{testimonial.quote}</p>
                    <span className="text-3xl absolute -bottom-6 -right-1 text-primary/40">"</span>
                  </blockquote>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Partners */}
        <motion.section 
          className="py-20 bg-card/30 backdrop-blur-lg overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('partners.title')}</h2>
              <p className="text-xl text-foreground/70">
                {language === 'en' ? 'Portfol.IO is already supported by 20+ universities and 50+ companies!' : 
                 language === 'ru' ? 'Portfol.IO уже поддерживают 20+ университетов и 50+ компаний!' : 
                 'Portfol.IO-ды 20+ университеттер мен 50+ компаниялар қолдайды!'}
              </p>
            </div>

            {/* Universities Carousel - First row */}
            <div className="mb-10 relative">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-20 h-full pointer-events-none z-10 bg-gradient-to-r from-card/30 to-transparent"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-20 h-full pointer-events-none z-10 bg-gradient-to-l from-card/30 to-transparent"></div>

              <div className="flex overflow-hidden">
                <motion.div 
                  className="flex space-x-8 animate-scroll-left"
                  initial={{ x: 0 }}
                  animate={{ x: "-50%" }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "loop", 
                    duration: 30,
                    ease: "linear"
                  }}
                >
                  {/* First set of partners - doubled for seamless loop */}
                  {[...partners, ...partners].map((partner: string, index: number) => (
                    <div 
                      key={`uni1-${index}`}
                      className="bg-background/50 backdrop-blur-md rounded-lg p-4 flex items-center justify-center h-20 min-w-[200px] border border-border/50 shadow-md partner-logo"
                    >
                      <p className="font-semibold text-foreground/80">{partner}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Companies Carousel - Second row (opposite direction) */}
            <div className="mb-12 relative">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-20 h-full pointer-events-none z-10 bg-gradient-to-r from-card/30 to-transparent"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-20 h-full pointer-events-none z-10 bg-gradient-to-l from-card/30 to-transparent"></div>

              <div className="flex overflow-hidden">
                <motion.div 
                  className="flex space-x-8 animate-scroll-right"
                  initial={{ x: "-50%" }}
                  animate={{ x: 0 }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "loop", 
                    duration: 25,
                    ease: "linear"
                  }}
                >
                  {/* Second set of partners (reversed) - doubled for seamless loop */}
                  {[...partners.slice().reverse(), ...partners.slice().reverse()].map((partner: string, index: number) => (
                    <div 
                      key={`company-${index}`}
                      className="bg-background/50 backdrop-blur-md rounded-lg p-4 flex items-center justify-center h-20 min-w-[200px] border border-border/50 shadow-md partner-logo"
                    >
                      <p className="font-semibold text-foreground/80">{partner}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="text-center">
              <Button 
                variant="outline" 
                className="border-primary/50 text-primary hover:bg-primary/10"
              >
                {language === 'en' ? 'Become a Partner' : 
                 language === 'ru' ? 'Стать партнёром' : 
                 'Серіктес болу'}
              </Button>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section 
          className="py-24 max-w-5xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="bg-gradient-to-br from-primary/10 to-primary/30 backdrop-blur-xl rounded-2xl p-10 shadow-xl border border-primary/20 text-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {language === 'en' ? 'Ready to start? Register for free and build your career!' : 
               language === 'ru' ? 'Готов начать? Зарегистрируйся бесплатно и построй свою карьеру!' : 
               'Бастауға дайынсыз ба? Тегін тіркеліп, мансабыңызды құрыңыз!'}
            </h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              {language === 'en' ? 'Join thousands of students who are already using Portfol.IO to achieve their goals' : 
               language === 'ru' ? 'Присоединяйся к тысячам студентов, которые уже используют Portfol.IO для достижения своих целей' : 
               'Мақсаттарына жету үшін Portfol.IO-ты қолданып жатқан мыңдаған студенттерге қосылыңыз'}
            </p>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white text-lg py-6 px-12 rounded-xl"
              onClick={() => setLocation("/register")}
            >
              {t('hero.start')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <footer className="bg-card/50 backdrop-blur-lg border-t border-border/50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-2xl font-bold mb-4">Portfol.IO</h3>
                <p className="text-foreground/70 mb-6 max-w-md">
                  {language === 'en' ? 'Innovative educational platform for building a successful future through a personal portfolio and skills development' : 
                   language === 'ru' ? 'Инновационная образовательная платформа для построения успешного будущего через персональное портфолио и развитие навыков' : 
                   'Жеке портфолио мен дағдыларды дамыту арқылы табысты болашақ құруға арналған инновациялық білім беру платформасы'}
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4">
                  {language === 'en' ? 'Quick Links' : 
                   language === 'ru' ? 'Быстрые ссылки' : 
                   'Жылдам сілтемелер'}
                </h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-foreground/70 hover:text-primary">
                    {language === 'en' ? 'Home' : 
                     language === 'ru' ? 'Главная' : 
                     'Басты бет'}
                  </a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-primary">
                    {t('nav.about')}
                  </a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-primary">
                    {t('nav.courses')}
                  </a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-primary">
                    {t('nav.internships')}
                  </a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-primary">
                    {t('nav.mentors')}
                  </a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4">
                  {language === 'en' ? 'Support' : 
                   language === 'ru' ? 'Поддержка' : 
                   'Қолдау'}
                </h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-foreground/70 hover:text-primary">
                    {language === 'en' ? 'Contact Us' : 
                     language === 'ru' ? 'Контакты' : 
                     'Байланыс'}
                  </a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-primary">FAQ</a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-primary">
                    {language === 'en' ? 'Privacy Policy' : 
                     language === 'ru' ? 'Политика конфиденциальности' : 
                     'Құпиялылық саясаты'}
                  </a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-primary">
                    {language === 'en' ? 'Terms of Use' : 
                     language === 'ru' ? 'Условия использования' : 
                     'Қолдану шарттары'}
                  </a></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-border/50 text-center text-foreground/60">
              © 2025 Portfol.IO – 
              {language === 'en' ? 'All rights reserved.' : 
               language === 'ru' ? 'Все права защищены.' : 
               'Барлық құқықтар қорғалған.'}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}