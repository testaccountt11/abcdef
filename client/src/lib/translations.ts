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
  | 'footer.rights'
  | 'auth.signin'
  | 'auth.signin.desc'
  | 'auth.signin.button'
  | 'auth.signin.alternative'
  | 'auth.signin.google'
  | 'auth.register'
  | 'auth.register.desc'
  | 'auth.register.button'
  | 'auth.register.alternative'
  | 'auth.register.google'
  | 'auth.email'
  | 'auth.password'
  | 'auth.confirmPassword'
  | 'auth.firstName'
  | 'auth.lastName'
  | 'auth.username'
  | 'auth.haveAccount'
  | 'auth.noAccount'
  | 'dashboard.home'
  | 'dashboard.courses'
  | 'dashboard.opportunities'
  | 'dashboard.mentors'
  | 'dashboard.advice'
  | 'dashboard.achievements'
  | 'dashboard.certificates'
  | 'dashboard.settings'
  | 'dashboard.theme'
  | 'dashboard.language'
  | 'dashboard.welcomeBack'
  | 'dashboard.profile'
  | 'dashboard.logout'
  | 'dashboard.welcome'
  | 'dashboard.portfolioDesc'
  | 'dashboard.coursesInProgress'
  | 'dashboard.certificatesEarned'
  | 'dashboard.mentorSessions'
  | 'dashboard.opportunitiesSaved'
  | 'dashboard.continueLearning'
  | 'dashboard.viewAllCourses'
  | 'dashboard.noCourses'
  | 'dashboard.recommendedOpportunities'
  | 'dashboard.viewAllOpportunities'
  | 'dashboard.noOpportunities'
  | 'dashboard.featuredMentors'
  | 'dashboard.viewAllMentors'
  | 'dashboard.noMentors'
  | 'dashboard.recentAdvice'
  | 'dashboard.viewAllArticles'
  | 'dashboard.noArticles';

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
    'footer.rights': 'All rights reserved',
    'auth.signin': 'Sign In',
    'auth.signin.desc': 'Enter your credentials to access your portfolio',
    'auth.signin.button': 'Sign In with Email',
    'auth.signin.alternative': 'Or continue with',
    'auth.signin.google': 'Sign In with Google',
    'auth.register': 'Create an Account',
    'auth.register.desc': 'Sign up to start building your educational portfolio',
    'auth.register.button': 'Create Account with Email',
    'auth.register.alternative': 'Or continue with',
    'auth.register.google': 'Sign Up with Google',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.firstName': 'First Name',
    'auth.lastName': 'Last Name',
    'auth.username': 'Username',
    'auth.haveAccount': 'Already have an account?',
    'auth.noAccount': 'Don\'t have an account?',
    'dashboard.home': 'Home',
    'dashboard.courses': 'My Courses',
    'dashboard.opportunities': 'Opportunities',
    'dashboard.mentors': 'Mentors',
    'dashboard.advice': 'Advice',
    'dashboard.achievements': 'Achievements',
    'dashboard.certificates': 'My Certificates',
    'dashboard.settings': 'Settings',
    'dashboard.theme': 'Theme',
    'dashboard.language': 'Language',
    'dashboard.welcomeBack': 'Welcome back',
    'dashboard.profile': 'Profile',
    'dashboard.logout': 'Logout',
    'dashboard.welcome': 'Welcome',
    'dashboard.portfolioDesc': 'Build your educational portfolio and unlock new opportunities',
    'dashboard.coursesInProgress': 'Courses in progress',
    'dashboard.certificatesEarned': 'Certificates earned',
    'dashboard.mentorSessions': 'Mentor sessions',
    'dashboard.opportunitiesSaved': 'Opportunities saved',
    'dashboard.continueLearning': 'Continue Learning',
    'dashboard.viewAllCourses': 'View all courses',
    'dashboard.noCourses': 'No courses in progress',
    'dashboard.recommendedOpportunities': 'Recommended Opportunities',
    'dashboard.viewAllOpportunities': 'View all opportunities',
    'dashboard.noOpportunities': 'No opportunities available',
    'dashboard.featuredMentors': 'Featured Mentors',
    'dashboard.viewAllMentors': 'View all mentors',
    'dashboard.noMentors': 'No mentors available',
    'dashboard.recentAdvice': 'Recent Advice',
    'dashboard.viewAllArticles': 'View all articles',
    'dashboard.noArticles': 'No articles available'
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
    'footer.rights': 'Все права защищены',
    'auth.signin': 'Вход',
    'auth.signin.desc': 'Введите данные для доступа к вашему портфолио',
    'auth.signin.button': 'Войти с Email',
    'auth.signin.alternative': 'Или продолжить с',
    'auth.signin.google': 'Войти через Google',
    'auth.register': 'Создать аккаунт',
    'auth.register.desc': 'Зарегистрируйтесь, чтобы начать создавать ваше образовательное портфолио',
    'auth.register.button': 'Создать аккаунт с Email',
    'auth.register.alternative': 'Или продолжить с',
    'auth.register.google': 'Зарегистрироваться через Google',
    'auth.email': 'Email',
    'auth.password': 'Пароль',
    'auth.confirmPassword': 'Подтвердите пароль',
    'auth.firstName': 'Имя',
    'auth.lastName': 'Фамилия',
    'auth.username': 'Имя пользователя',
    'auth.haveAccount': 'Уже есть аккаунт?',
    'auth.noAccount': 'Нет аккаунта?',
    'dashboard.home': 'Главная',
    'dashboard.courses': 'Мои курсы',
    'dashboard.opportunities': 'Возможности',
    'dashboard.mentors': 'Менторы',
    'dashboard.advice': 'Советы',
    'dashboard.achievements': 'Достижения',
    'dashboard.certificates': 'Мои сертификаты',
    'dashboard.settings': 'Настройки',
    'dashboard.theme': 'Тема',
    'dashboard.language': 'Язык',
    'dashboard.welcomeBack': 'С возвращением',
    'dashboard.profile': 'Профиль',
    'dashboard.logout': 'Выйти',
    'dashboard.welcome': 'Добро пожаловать',
    'dashboard.portfolioDesc': 'Создайте своё образовательное портфолио и откройте новые возможности',
    'dashboard.coursesInProgress': 'Курсы в процессе',
    'dashboard.certificatesEarned': 'Полученные сертификаты',
    'dashboard.mentorSessions': 'Сессии с менторами',
    'dashboard.opportunitiesSaved': 'Сохраненные возможности',
    'dashboard.continueLearning': 'Продолжить обучение',
    'dashboard.viewAllCourses': 'Посмотреть все курсы',
    'dashboard.noCourses': 'Нет курсов в процессе',
    'dashboard.recommendedOpportunities': 'Рекомендуемые возможности',
    'dashboard.viewAllOpportunities': 'Посмотреть все возможности',
    'dashboard.noOpportunities': 'Нет доступных возможностей',
    'dashboard.featuredMentors': 'Рекомендуемые менторы',
    'dashboard.viewAllMentors': 'Посмотреть всех менторов',
    'dashboard.noMentors': 'Нет доступных менторов',
    'dashboard.recentAdvice': 'Последние советы',
    'dashboard.viewAllArticles': 'Посмотреть все статьи',
    'dashboard.noArticles': 'Нет доступных статей'
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
    'footer.rights': 'Барлық құқықтар қорғалған',
    'auth.signin': 'Кіру',
    'auth.signin.desc': 'Портфолиоңызға кіру үшін деректеріңізді енгізіңіз',
    'auth.signin.button': 'Email арқылы кіру',
    'auth.signin.alternative': 'Немесе жалғастыру',
    'auth.signin.google': 'Google арқылы кіру',
    'auth.register': 'Аккаунт құру',
    'auth.register.desc': 'Білім портфолиоңызды жасауды бастау үшін тіркеліңіз',
    'auth.register.button': 'Email арқылы аккаунт жасау',
    'auth.register.alternative': 'Немесе жалғастыру',
    'auth.register.google': 'Google арқылы тіркелу',
    'auth.email': 'Email',
    'auth.password': 'Құпия сөз',
    'auth.confirmPassword': 'Құпия сөзді растау',
    'auth.firstName': 'Аты',
    'auth.lastName': 'Тегі',
    'auth.username': 'Пайдаланушы аты',
    'auth.haveAccount': 'Аккаунтыңыз бар ма?',
    'auth.noAccount': 'Аккаунтыңыз жоқ па?',
    'dashboard.home': 'Басты бет',
    'dashboard.courses': 'Менің курстарым',
    'dashboard.opportunities': 'Мүмкіндіктер',
    'dashboard.mentors': 'Менторлар',
    'dashboard.advice': 'Кеңестер',
    'dashboard.achievements': 'Жетістіктер',
    'dashboard.certificates': 'Менің сертификаттарым',
    'dashboard.settings': 'Параметрлер',
    'dashboard.theme': 'Тақырып',
    'dashboard.language': 'Тіл',
    'dashboard.welcomeBack': 'Қайта оралуыңызбен',
    'dashboard.profile': 'Профиль',
    'dashboard.logout': 'Шығу',
    'dashboard.welcome': 'Қош келдіңіз',
    'dashboard.portfolioDesc': 'Өзіңіздің білім портфолиоңызды құрыңыз және жаңа мүмкіндіктерді ашыңыз',
    'dashboard.coursesInProgress': 'Оқу үстіндегі курстар',
    'dashboard.certificatesEarned': 'Алынған сертификаттар',
    'dashboard.mentorSessions': 'Ментор сессиялары',
    'dashboard.opportunitiesSaved': 'Сақталған мүмкіндіктер',
    'dashboard.continueLearning': 'Оқуды жалғастыру',
    'dashboard.viewAllCourses': 'Барлық курстарды көру',
    'dashboard.noCourses': 'Оқу үстіндегі курстар жоқ',
    'dashboard.recommendedOpportunities': 'Ұсынылған мүмкіндіктер',
    'dashboard.viewAllOpportunities': 'Барлық мүмкіндіктерді көру',
    'dashboard.noOpportunities': 'Қолжетімді мүмкіндіктер жоқ',
    'dashboard.featuredMentors': 'Ұсынылған менторлар',
    'dashboard.viewAllMentors': 'Барлық менторларды көру',
    'dashboard.noMentors': 'Қолжетімді менторлар жоқ',
    'dashboard.recentAdvice': 'Соңғы кеңестер',
    'dashboard.viewAllArticles': 'Барлық мақалаларды көру',
    'dashboard.noArticles': 'Қолжетімді мақалалар жоқ'
  }
};

export type Language = keyof typeof translations;

export const getTranslation = (key: TranslationKey, language: Language = 'en'): string => {
  return translations[language][key] || key;
};