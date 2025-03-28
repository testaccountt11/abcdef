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
  | 'dashboard.noArticles'
  | 'dashboard.inProgress'
  | 'dashboard.partnerCourse'
  | 'dashboard.available'
  | 'dashboard.enrollNow'
  | 'dashboard.viewDetails'
  | 'dashboard.announcement.title'
  | 'dashboard.announcement.details'
  | 'dashboard.announcement.newCourse'
  | 'dashboard.announcement.competition'
  | 'dashboard.announcement.scholarship'
  | 'dashboard.announcement.viewDetails'
  | 'profile.title'
  | 'profile.subtitle'
  | 'profile.notLoggedIn'
  | 'profile.displayedBadges'
  | 'profile.stats'
  | 'profile.overview'
  | 'profile.achievements'
  | 'profile.badges'
  | 'profile.summary'
  | 'profile.summaryDesc'
  | 'profile.achievementsCompleted'
  | 'profile.badgesEarned'
  | 'profile.recentAchievements'
  | 'profile.recentBadges'
  | 'profile.noAchievements'
  | 'profile.noBadges'
  | 'profile.allAchievements'
  | 'profile.achievementsDesc'
  | 'profile.allBadges'
  | 'profile.badgesDesc'
  | 'profile.completed'
  | 'achievement.completed'
  | 'achievement.progress';



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
    'dashboard.noArticles': 'No articles available',
    'dashboard.inProgress': 'In Progress',
    'dashboard.partnerCourse': 'Partner Course',
    'dashboard.available': 'Available',
    'dashboard.enrollNow': 'Enroll Now',
    'dashboard.viewDetails': 'View Details',
    'dashboard.announcement.title': 'Announcements',
    'dashboard.announcement.details': 'Click on any announcement to view details',
    'dashboard.announcement.newCourse': 'New course available: "Advanced Data Science". Enroll now to get early access!',
    'dashboard.announcement.competition': 'Upcoming competition: "AI Innovation Challenge". Registration opens next week.',
    'dashboard.announcement.scholarship': 'New scholarship opportunity available for top performing students.',
    'dashboard.announcement.viewDetails': 'View Details',

    // Profile page translations
    'profile.title': 'My Profile',
    'profile.subtitle': 'View and manage your achievements and badges',
    'profile.notLoggedIn': 'You need to be logged in to view your profile',
    'profile.displayedBadges': 'Displayed Badges',
    'profile.stats': 'Statistics',
    'profile.overview': 'Overview',
    'profile.achievements': 'Achievements',
    'profile.badges': 'Badges',
    'profile.summary': 'Summary',
    'profile.summaryDesc': 'Your educational journey at a glance',
    'profile.achievementsCompleted': 'Achievements Completed',
    'profile.badgesEarned': 'Badges Earned',
    'profile.recentAchievements': 'Recent Achievements',
    'profile.recentBadges': 'Recent Badges',
    'profile.noAchievements': 'No achievements yet. Start courses to earn achievements!',
    'profile.noBadges': 'No badges yet. Complete achievements to earn badges!',
    'profile.allAchievements': 'All Achievements',
    'profile.achievementsDesc': 'Track your progress on all achievements',
    'profile.allBadges': 'All Badges',
    'profile.badgesDesc': 'Special recognitions for your accomplishments',
    'profile.completed': 'Completed',

    // Achievement card translations
    'achievement.completed': 'Completed',
    'achievement.progress': 'Progress'
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
    'dashboard.noArticles': 'Нет доступных статей',
    'dashboard.inProgress': 'В процессе',
    'dashboard.partnerCourse': 'Партнерский курс',
    'dashboard.available': 'Доступно',
    'dashboard.enrollNow': 'Записаться',
    'dashboard.viewDetails': 'Подробнее',
    'dashboard.announcement.title': 'Объявления',
    'dashboard.announcement.details': 'Нажмите на любое объявление, чтобы увидеть подробности',
    'dashboard.announcement.newCourse': 'Доступен новый курс: "Продвинутая наука о данных". Запишитесь сейчас для получения раннего доступа!',
    'dashboard.announcement.competition': 'Предстоящий конкурс: "AI Innovation Challenge". Регистрация открывается на следующей неделе.',
    'dashboard.announcement.scholarship': 'Доступна новая возможность получения стипендии для лучших студентов.',
    'dashboard.announcement.viewDetails': 'Посмотреть детали',

    // Переводы для страницы профиля
    'profile.title': 'Мой профиль',
    'profile.subtitle': 'Просмотр и управление вашими достижениями и значками',
    'profile.notLoggedIn': 'Для просмотра профиля необходимо авторизоваться',
    'profile.displayedBadges': 'Отображаемые значки',
    'profile.stats': 'Статистика',
    'profile.overview': 'Обзор',
    'profile.achievements': 'Достижения',
    'profile.badges': 'Значки',
    'profile.summary': 'Сводка',
    'profile.summaryDesc': 'Ваш образовательный путь с первого взгляда',
    'profile.achievementsCompleted': 'Выполненные достижения',
    'profile.badgesEarned': 'Полученные значки',
    'profile.recentAchievements': 'Недавние достижения',
    'profile.recentBadges': 'Недавние значки',
    'profile.noAchievements': 'Пока нет достижений. Начните курсы, чтобы получить достижения!',
    'profile.noBadges': 'Пока нет значков. Выполните достижения, чтобы получить значки!',
    'profile.allAchievements': 'Все достижения',
    'profile.achievementsDesc': 'Отслеживайте свой прогресс по всем достижениям',
    'profile.allBadges': 'Все значки',
    'profile.badgesDesc': 'Особые признания ваших достижений',
    'profile.completed': 'Выполнено',

    // Переводы для карточки достижений
    'achievement.completed': 'Выполнено',
    'achievement.progress': 'Прогресс'
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
    'dashboard.noArticles': 'Қолжетімді мақалалар жоқ',
    'dashboard.inProgress': 'Оқу үстінде',
    'dashboard.partnerCourse': 'Серіктестік курс',
    'dashboard.available': 'Қолжетімді',
    'dashboard.enrollNow': 'Тіркелу',
    'dashboard.viewDetails': 'Толығырақ',
    'dashboard.announcement.title': 'Хабарландырулар',
    'dashboard.announcement.details': 'Толық мәліметтерді көру үшін кез келген хабарландыруды басыңыз',
    'dashboard.announcement.newCourse': 'Жаңа курс қолжетімді: "Деректер туралы ғылымның жоғары деңгейі". Ерте қол жеткізу үшін қазір тіркеліңіз!',
    'dashboard.announcement.competition': 'Алдағы байқау: "AI Innovation Challenge". Тіркеу келесі аптада басталады.',
    'dashboard.announcement.scholarship': 'Үздік студенттер үшін жаңа стипендия мүмкіндігі бар.',
    'dashboard.announcement.viewDetails': 'Толық ақпаратты көру',

    // Профиль беті үшін аудармалар
    'profile.title': 'Менің профилім',
    'profile.subtitle': 'Жетістіктеріңіз бен белгілеріңізді қарау және басқару',
    'profile.notLoggedIn': 'Профильді қарау үшін жүйеге кіру қажет',
    'profile.displayedBadges': 'Көрсетілген белгілер',
    'profile.stats': 'Статистика',
    'profile.overview': 'Жалпы шолу',
    'profile.achievements': 'Жетістіктер',
    'profile.badges': 'Белгілер',
    'profile.summary': 'Қорытынды',
    'profile.summaryDesc': 'Сіздің білім беру жолыңыз бір көзқараста',
    'profile.achievementsCompleted': 'Аяқталған жетістіктер',
    'profile.badgesEarned': 'Алынған белгілер',
    'profile.recentAchievements': 'Соңғы жетістіктер',
    'profile.recentBadges': 'Соңғы белгілер',
    'profile.noAchievements': 'Әзірге жетістіктер жоқ. Жетістіктерге қол жеткізу үшін курстарды бастаңыз!',
    'profile.noBadges': 'Әзірге белгілер жоқ. Белгілерді алу үшін жетістіктерді аяқтаңыз!',
    'profile.allAchievements': 'Барлық жетістіктер',
    'profile.achievementsDesc': 'Барлық жетістіктер бойынша прогресіңізді қадағалаңыз',
    'profile.allBadges': 'Барлық белгілер',
    'profile.badgesDesc': 'Жетістіктеріңізге арналған арнайы мойындаулар',
    'profile.completed': 'Аяқталды',

    // Жетістіктер картасы үшін аудармалар
    'achievement.completed': 'Аяқталды',
    'achievement.progress': 'Прогресс'
  }
};

export type Language = keyof typeof translations;

export const getTranslation = (key: string, language: Language = 'en'): string => {
  if (translations[language]?.[key as TranslationKey]) {
    return translations[language][key as TranslationKey];
  }
  
  // Return the key itself if it doesn't exist in our translations
  return key;
};