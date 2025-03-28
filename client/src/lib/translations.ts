export type TranslationKey = 
  | 'nav.about'
  | 'nav.courses'
  | 'nav.internships'
  | 'nav.mentors'
  | 'nav.login'
  | 'hero.title'
  | 'hero.subtitle'
  | 'hero.start'
  | 'hero.learnMore'
  | 'features.personalPath.title'
  | 'features.personalPath.desc'
  | 'features.topCourses.title'
  | 'features.topCourses.desc'
  | 'features.competitions.title'
  | 'features.competitions.desc'
  | 'features.mentorship.title'
  | 'features.mentorship.desc'
  | 'about.title'
  | 'about.subtitle'
  | 'about.mission'
  | 'about.vision'
  | 'partners.title'
  | 'partners.subtitle'
  | 'testimonials.title'
  | 'testimonials.subtitle'
  | 'contact.title'
  | 'contact.subtitle'
  | 'contact.email'
  | 'contact.message'
  | 'contact.send'
  | 'newsletter.title'
  | 'newsletter.subtitle'
  | 'newsletter.placeholder'
  | 'newsletter.subscribe'
  | 'footer.rights';

export const translations: Record<string, Record<TranslationKey, string>> = {
  en: {
    'nav.about': 'About Us',
    'nav.courses': 'Courses',
    'nav.internships': 'Internships',
    'nav.mentors': 'Mentors',
    'nav.login': 'Login',
    'hero.title': 'Build Your Future with Portfol.IO',
    'hero.subtitle': 'Next generation platform for your career development. Courses, internships and mentorship in one place.',
    'hero.start': 'Start for Free',
    'hero.learnMore': 'Learn More',
    'features.personalPath.title': 'Personal Path',
    'features.personalPath.desc': 'AI creates an individual development plan',
    'features.topCourses.title': 'Top Courses',
    'features.topCourses.desc': 'Best opportunities for your portfolio',
    'features.competitions.title': 'Competitions',
    'features.competitions.desc': 'Participate and win scholarships',
    'features.mentorship.title': 'Mentorship',
    'features.mentorship.desc': 'Support from professionals',
    'about.title': 'About Portfol.IO',
    'about.subtitle': 'We help students build their future',
    'about.mission': 'Our mission is to empower students with the tools and opportunities they need to showcase their talents and achievements in a professional portfolio.',
    'about.vision': 'We envision a world where every student has equal access to educational resources and career opportunities.',
    'partners.title': 'Our Partners',
    'partners.subtitle': 'Working with leading educational institutions',
    'testimonials.title': 'Success Stories',
    'testimonials.subtitle': 'What our users say about us',
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Have questions? Contact us!',
    'contact.email': 'Your Email',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'newsletter.title': 'Stay Updated',
    'newsletter.subtitle': 'Subscribe to our newsletter for the latest opportunities',
    'newsletter.placeholder': 'Your email address',
    'newsletter.subscribe': 'Subscribe',
    'footer.rights': 'All rights reserved'
  },
  ru: {
    'nav.about': 'О нас',
    'nav.courses': 'Курсы',
    'nav.internships': 'Стажировки',
    'nav.mentors': 'Менторы',
    'nav.login': 'Войти',
    'hero.title': 'Построй свое будущее с Portfol.IO',
    'hero.subtitle': 'Платформа нового поколения для развития твоей карьеры. Курсы, стажировки и менторство в одном месте.',
    'hero.start': 'Начать бесплатно',
    'hero.learnMore': 'Узнать больше',
    'features.personalPath.title': 'Личный путь',
    'features.personalPath.desc': 'AI создаст индивидуальный план развития',
    'features.topCourses.title': 'Топ курсы',
    'features.topCourses.desc': 'Лучшие возможности для портфолио',
    'features.competitions.title': 'Олимпиады',
    'features.competitions.desc': 'Участвуй и выигрывай стипендии',
    'features.mentorship.title': 'Менторство',
    'features.mentorship.desc': 'Поддержка от профессионалов',
    'about.title': 'О Portfol.IO',
    'about.subtitle': 'Мы помогаем студентам строить их будущее',
    'about.mission': 'Наша миссия — предоставить студентам инструменты и возможности, необходимые для демонстрации их талантов и достижений в профессиональном портфолио.',
    'about.vision': 'Мы представляем мир, где каждый студент имеет равный доступ к образовательным ресурсам и карьерным возможностям.',
    'partners.title': 'Наши партнеры',
    'partners.subtitle': 'Работаем с ведущими образовательными учреждениями',
    'testimonials.title': 'Истории успеха',
    'testimonials.subtitle': 'Что говорят о нас наши пользователи',
    'contact.title': 'Связаться с нами',
    'contact.subtitle': 'Есть вопросы? Свяжитесь с нами!',
    'contact.email': 'Ваш Email',
    'contact.message': 'Ваше сообщение',
    'contact.send': 'Отправить',
    'newsletter.title': 'Будьте в курсе',
    'newsletter.subtitle': 'Подпишитесь на нашу рассылку для получения последних возможностей',
    'newsletter.placeholder': 'Ваш email адрес',
    'newsletter.subscribe': 'Подписаться',
    'footer.rights': 'Все права защищены'
  },
  kz: {
    'nav.about': 'Біз туралы',
    'nav.courses': 'Курстар',
    'nav.internships': 'Тәжірибеден өту',
    'nav.mentors': 'Менторлар',
    'nav.login': 'Кіру',
    'hero.title': 'Portfol.IO-мен болашағыңды құр',
    'hero.subtitle': 'Мансабыңды дамытуға арналған жаңа буын платформасы. Курстар, тәжірибеден өту және тәлімгерлік бір жерде.',
    'hero.start': 'Тегін бастау',
    'hero.learnMore': 'Көбірек білу',
    'features.personalPath.title': 'Жеке жол',
    'features.personalPath.desc': 'AI жеке даму жоспарын жасайды',
    'features.topCourses.title': 'Үздік курстар',
    'features.topCourses.desc': 'Портфолио үшін үздік мүмкіндіктер',
    'features.competitions.title': 'Олимпиадалар',
    'features.competitions.desc': 'Қатысып, стипендияларды ұтып ал',
    'features.mentorship.title': 'Тәлімгерлік',
    'features.mentorship.desc': 'Кәсіпқойлардан қолдау',
    'about.title': 'Portfol.IO туралы',
    'about.subtitle': 'Біз студенттерге болашақтарын құруға көмектесеміз',
    'about.mission': 'Біздің миссиямыз - студенттерге өз таланттары мен жетістіктерін кәсіби портфолиода көрсету үшін қажетті құралдар мен мүмкіндіктер беру.',
    'about.vision': 'Біз әрбір студенттің білім беру ресурстары мен мансаптық мүмкіндіктерге тең қол жеткізетін әлемді елестетеміз.',
    'partners.title': 'Біздің серіктестер',
    'partners.subtitle': 'Жетекші білім беру мекемелерімен жұмыс жасаймыз',
    'testimonials.title': 'Табыс хикаялары',
    'testimonials.subtitle': 'Пайдаланушыларымыз біз туралы не айтады',
    'contact.title': 'Бізбен байланысу',
    'contact.subtitle': 'Сұрақтарыңыз бар ма? Бізбен байланысыңыз!',
    'contact.email': 'Сіздің Email',
    'contact.message': 'Сіздің хабарламаңыз',
    'contact.send': 'Хабарлама жіберу',
    'newsletter.title': 'Жаңалықтарды қадағалаңыз',
    'newsletter.subtitle': 'Соңғы мүмкіндіктер туралы хабардар болу үшін жаңалықтар таратылымына жазылыңыз',
    'newsletter.placeholder': 'Сіздің email адресіңіз',
    'newsletter.subscribe': 'Жазылу',
    'footer.rights': 'Барлық құқықтар қорғалған'
  }
};

export type Language = keyof typeof translations;

export const getTranslation = (key: TranslationKey, language: Language = 'en'): string => {
  return translations[language][key] || key;
};