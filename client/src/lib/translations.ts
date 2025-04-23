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
  | 'auth.forgotPassword'
  | 'auth.resetPassword'
  | 'auth.resetPassword.desc'
  | 'auth.resetPassword.button'
  | 'auth.verifyEmail'
  | 'auth.verifyEmail.desc'
  | 'auth.verifyEmail.button'
  | 'auth.resendVerification'
  | 'auth.logout'
  | 'common.back'
  | 'common.loading'
  | 'common.error'
  | 'common.success'
  | 'common.save'
  | 'common.cancel'
  | 'common.edit'
  | 'common.delete'
  | 'common.view'
  | 'common.search'
  | 'common.filter'
  | 'common.sort'
  | 'common.more'
  | 'common.less'
  | 'common.all'
  | 'common.none'
  | 'common.yes'
  | 'common.no'
  | 'common.or'
  | 'common.and'
  | 'common.required'
  | 'common.optional'
  | 'common.invalid'
  | 'common.valid'
  | 'common.unknown'
  | 'common.unknownError'
  | 'common.tryAgain'
  | 'common.refresh'
  | 'common.close'
  | 'common.open'
  | 'common.next'
  | 'common.previous'
  | 'common.first'
  | 'common.last'
  | 'common.skip'
  | 'common.continue'
  | 'common.finish'
  | 'common.start'
  | 'common.end'
  | 'common.today'
  | 'common.yesterday'
  | 'common.tomorrow'
  | 'common.now'
  | 'common.ago'
  | 'common.fromNow'
  | 'common.until'
  | 'common.since'
  | 'common.between'
  | 'common.not'
  | 'common.is'
  | 'common.are'
  | 'common.was'
  | 'common.were'
  | 'common.will'
  | 'common.would'
  | 'common.could'
  | 'common.should'
  | 'common.must'
  | 'common.may'
  | 'common.might'
  | 'common.can'
  | 'common.cannot'
  | 'common.dashboard'
  | 'dashboard.welcome'
  | 'dashboard.overview'
  | 'dashboard.courses'
  | 'dashboard.internships'
  | 'dashboard.mentors'
  | 'dashboard.profile'
  | 'dashboard.settings'
  | 'dashboard.logout'
  | 'dashboard.notifications'
  | 'dashboard.messages'
  | 'dashboard.tasks'
  | 'dashboard.calendar'
  | 'dashboard.help'
  | 'dashboard.support'
  | 'dashboard.feedback'
  | 'dashboard.report'
  | 'dashboard.about'
  | 'dashboard.contact'
  | 'dashboard.terms'
  | 'dashboard.privacy'
  | 'dashboard.cookies'
  | 'dashboard.accessibility'
  | 'dashboard.language'
  | 'dashboard.theme'
  | 'dashboard.darkMode'
  | 'dashboard.lightMode'
  | 'dashboard.systemMode'
  | 'dashboard.home'
  | 'dashboard.opportunities'
  | 'dashboard.advice'
  | 'dashboard.achievements'
  | 'dashboard.certificates'
  | 'dashboard.title'
  | 'dashboard.changeLanguage'
  | 'dashboard.portfolioDesc'
  | 'dashboard.announcement.title'
  | 'dashboard.announcement.details'
  | 'dashboard.announcement.newCourse'
  | 'dashboard.announcement.viewDetails'
  | 'dashboard.announcement.competition'
  | 'dashboard.announcement.scholarship'
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
  | 'settings.notLoggedIn'
  | 'settings.title'
  | 'settings.description'
  | 'settings.profile'
  | 'settings.security'
  | 'settings.profileSettings'
  | 'settings.profileSettingsDesc'
  | 'settings.securitySettings'
  | 'settings.securitySettingsDesc'
  | 'settings.firstName'
  | 'settings.lastName'
  | 'settings.email'
  | 'settings.username'
  | 'settings.currentPassword'
  | 'settings.newPassword'
  | 'settings.confirmPassword'
  | 'settings.changePicture'
  | 'settings.saveChanges'
  | 'settings.updatePassword';



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
    'auth.forgotPassword': 'Forgot Password',
    'auth.resetPassword': 'Reset Password',
    'auth.resetPassword.desc': 'Enter your email to reset your password',
    'auth.resetPassword.button': 'Reset Password',
    'auth.verifyEmail': 'Verify Email',
    'auth.verifyEmail.desc': 'Check your email for the verification link',
    'auth.verifyEmail.button': 'Verify Email',
    'auth.resendVerification': 'Resend Verification Email',
    'auth.logout': 'Logout',
    'common.back': 'Back',
    'common.loading': 'Loading',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.more': 'More',
    'common.less': 'Less',
    'common.all': 'All',
    'common.none': 'None',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.or': 'Or',
    'common.and': 'And',
    'common.required': 'Required',
    'common.optional': 'Optional',
    'common.invalid': 'Invalid',
    'common.valid': 'Valid',
    'common.unknown': 'Unknown',
    'common.unknownError': 'Unknown Error',
    'common.tryAgain': 'Try Again',
    'common.refresh': 'Refresh',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.first': 'First',
    'common.last': 'Last',
    'common.skip': 'Skip',
    'common.continue': 'Continue',
    'common.finish': 'Finish',
    'common.start': 'Start',
    'common.end': 'End',
    'common.today': 'Today',
    'common.yesterday': 'Yesterday',
    'common.tomorrow': 'Tomorrow',
    'common.now': 'Now',
    'common.ago': 'Ago',
    'common.fromNow': 'From Now',
    'common.until': 'Until',
    'common.since': 'Since',
    'common.between': 'Between',
    'common.not': 'Not',
    'common.is': 'Is',
    'common.are': 'Are',
    'common.was': 'Was',
    'common.were': 'Were',
    'common.will': 'Will',
    'common.would': 'Would',
    'common.could': 'Could',
    'common.should': 'Should',
    'common.must': 'Must',
    'common.may': 'May',
    'common.might': 'Might',
    'common.can': 'Can',
    'common.cannot': 'Cannot',
    'common.dashboard': 'Dashboard',
    'dashboard.welcome': 'Welcome, {name}!',
    'dashboard.overview': 'Overview',
    'dashboard.courses': 'My Courses',
    'dashboard.internships': 'Opportunities',
    'dashboard.mentors': 'Mentors',
    'dashboard.profile': 'Profile',
    'dashboard.settings': 'Settings',
    'dashboard.logout': 'Logout',
    'dashboard.notifications': 'Notifications',
    'dashboard.messages': 'Messages',
    'dashboard.tasks': 'Tasks',
    'dashboard.calendar': 'Calendar',
    'dashboard.help': 'Help',
    'dashboard.support': 'Support',
    'dashboard.feedback': 'Feedback',
    'dashboard.report': 'Report',
    'dashboard.about': 'About',
    'dashboard.contact': 'Contact',
    'dashboard.terms': 'Terms',
    'dashboard.privacy': 'Privacy',
    'dashboard.cookies': 'Cookies',
    'dashboard.accessibility': 'Accessibility',
    'dashboard.language': 'Language',
    'dashboard.theme': 'Theme',
    'dashboard.darkMode': 'Dark Mode',
    'dashboard.lightMode': 'Light Mode',
    'dashboard.systemMode': 'System Mode',
    'dashboard.home': 'My Courses',
    'dashboard.opportunities': 'Mentors',
    'dashboard.advice': 'Advice',
    'dashboard.achievements': 'Achievements',
    'dashboard.certificates': 'Certificates',
    'dashboard.title': 'Title',
    'dashboard.changeLanguage': 'Change Language',
    'dashboard.portfolioDesc': 'Track your learning progress and achievements',
    'dashboard.announcement.title': 'Announcements',
    'dashboard.announcement.details': 'View details',
    'dashboard.announcement.newCourse': 'New course available',
    'dashboard.announcement.viewDetails': 'View details',
    'dashboard.announcement.competition': 'New competition',
    'dashboard.announcement.scholarship': 'New scholarship opportunity',
    'dashboard.coursesInProgress': 'Courses in Progress',
    'dashboard.certificatesEarned': 'Certificates Earned',
    'dashboard.mentorSessions': 'Mentor Sessions',
    'dashboard.opportunitiesSaved': 'Opportunities Saved',
    'dashboard.continueLearning': 'Continue Learning',
    'dashboard.viewAllCourses': 'View All Courses',
    'dashboard.noCourses': 'No courses in progress',
    'dashboard.recommendedOpportunities': 'Recommended Opportunities',
    'dashboard.viewAllOpportunities': 'View All Opportunities',
    'dashboard.noOpportunities': 'No opportunities available',
    'dashboard.featuredMentors': 'Featured Mentors',
    'dashboard.viewAllMentors': 'View All Mentors',
    'dashboard.noMentors': 'No mentors available',
    'dashboard.recentAdvice': 'Recent Advice',
    'dashboard.viewAllArticles': 'View All Articles',
    'dashboard.noArticles': 'No articles available',
    'settings.notLoggedIn': "You must be logged in to access settings",
    'settings.title': "Settings",
    'settings.description': "Manage your account settings and preferences",
    'settings.profile': "Profile",
    'settings.security': "Security",
    'settings.profileSettings': "Profile Settings",
    'settings.profileSettingsDesc': "Update your personal information and profile picture",
    'settings.securitySettings': "Security Settings",
    'settings.securitySettingsDesc': "Manage your password and security preferences",
    'settings.firstName': "First Name",
    'settings.lastName': "Last Name",
    'settings.email': "Email",
    'settings.username': "Username",
    'settings.currentPassword': "Current Password",
    'settings.newPassword': "New Password",
    'settings.confirmPassword': "Confirm New Password",
    'settings.changePicture': "Change Picture",
    'settings.saveChanges': "Save Changes",
    'settings.updatePassword': "Update Password",
  },
  ru: {
    'nav.about': 'О нас',
    'nav.courses': 'Курсы',
    'nav.internships': 'Стажировки',
    'nav.mentors': 'Менторы',
    'nav.login': 'Войти',
    'hero.title': 'Создайте свое будущее с Portfol.IO',
    'hero.subtitle': 'Платформа нового поколения для развития вашей карьеры. Курсы, стажировки и менторство в одном месте.',
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
    'auth.forgotPassword': 'Забыли пароль',
    'auth.resetPassword': 'Сбросить пароль',
    'auth.resetPassword.desc': 'Введите ваш email для получения ссылки для сброса пароля',
    'auth.resetPassword.button': 'Сбросить пароль',
    'auth.verifyEmail': 'Подтвердить email',
    'auth.verifyEmail.desc': 'Проверьте ваш email на наличие ссылки для подтверждения',
    'auth.verifyEmail.button': 'Подтвердить email',
    'auth.resendVerification': 'Отправить повторное подтверждение email',
    'auth.logout': 'Выйти',
    'common.back': 'Назад',
    'common.loading': 'Загрузка',
    'common.error': 'Ошибка',
    'common.success': 'Успех',
    'common.save': 'Сохранить',
    'common.cancel': 'Отменить',
    'common.edit': 'Редактировать',
    'common.delete': 'Удалить',
    'common.view': 'Просмотр',
    'common.search': 'Поиск',
    'common.filter': 'Фильтр',
    'common.sort': 'Сортировать',
    'common.more': 'Больше',
    'common.less': 'Меньше',
    'common.all': 'Все',
    'common.none': 'Ни один',
    'common.yes': 'Да',
    'common.no': 'Нет',
    'common.or': 'Или',
    'common.and': 'И',
    'common.required': 'Требуется',
    'common.optional': 'Необязательно',
    'common.invalid': 'Недействительный',
    'common.valid': 'Действительный',
    'common.unknown': 'Неизвестный',
    'common.unknownError': 'Неизвестная ошибка',
    'common.tryAgain': 'Попробуйте еще раз',
    'common.refresh': 'Обновить',
    'common.close': 'Закрыть',
    'common.open': 'Открыть',
    'common.next': 'Следующий',
    'common.previous': 'Предыдущий',
    'common.first': 'Первый',
    'common.last': 'Последний',
    'common.skip': 'Пропустить',
    'common.continue': 'Продолжить',
    'common.finish': 'Завершить',
    'common.start': 'Начать',
    'common.end': 'Завершить',
    'common.today': 'Сегодня',
    'common.yesterday': 'Вчера',
    'common.tomorrow': 'Завтра',
    'common.now': 'Теперь',
    'common.ago': 'Назад',
    'common.fromNow': 'Сейчас',
    'common.until': 'До',
    'common.since': 'С',
    'common.between': 'Между',
    'common.not': 'Не',
    'common.is': 'Это',
    'common.are': 'Это',
    'common.was': 'Было',
    'common.were': 'Было',
    'common.will': 'Будет',
    'common.would': 'Бы',
    'common.could': 'Мог',
    'common.should': 'Должен',
    'common.must': 'Должен',
    'common.may': 'Может',
    'common.might': 'Мог',
    'common.can': 'Может',
    'common.cannot': 'Не может',
    'common.dashboard': 'Панель',
    'dashboard.welcome': 'Добро пожаловать, {name}!',
    'dashboard.overview': 'Обзор',
    'dashboard.courses': 'Курсы',
    'dashboard.internships': 'Стажировки',
    'dashboard.mentors': 'Менторы',
    'dashboard.profile': 'Профиль',
    'dashboard.settings': 'Настройки',
    'dashboard.logout': 'Выйти',
    'dashboard.notifications': 'Уведомления',
    'dashboard.messages': 'Сообщения',
    'dashboard.tasks': 'Задачи',
    'dashboard.calendar': 'Календарь',
    'dashboard.help': 'Помощь',
    'dashboard.support': 'Поддержка',
    'dashboard.feedback': 'Отзывы',
    'dashboard.report': 'Отчет',
    'dashboard.about': 'О нас',
    'dashboard.contact': 'Контакты',
    'dashboard.terms': 'Условия',
    'dashboard.privacy': 'Конфиденциальность',
    'dashboard.cookies': 'Cookies',
    'dashboard.accessibility': 'Доступность',
    'dashboard.language': 'Язык',
    'dashboard.theme': 'Тема',
    'dashboard.darkMode': 'Темный режим',
    'dashboard.lightMode': 'Светлый режим',
    'dashboard.systemMode': 'Системный режим',
    'dashboard.home': 'Мои курсы',
    'dashboard.opportunities': 'Менторы',
    'dashboard.advice': 'Советы',
    'dashboard.achievements': 'Достижения',
    'dashboard.certificates': 'Сертификаты',
    'dashboard.title': 'Заголовок',
    'dashboard.changeLanguage': 'Изменить язык',
    'dashboard.portfolioDesc': 'Отслеживайте свой прогресс в обучении и достижения',
    'dashboard.announcement.title': 'Объявления',
    'dashboard.announcement.details': 'Подробнее',
    'dashboard.announcement.newCourse': 'Новый курс доступен',
    'dashboard.announcement.viewDetails': 'Подробнее',
    'dashboard.announcement.competition': 'Новый конкурс',
    'dashboard.announcement.scholarship': 'Возможность получения стипендии',
    'dashboard.coursesInProgress': 'Курсы в процессе',
    'dashboard.certificatesEarned': 'Полученные сертификаты',
    'dashboard.mentorSessions': 'Сессии с ментором',
    'dashboard.opportunitiesSaved': 'Сохраненные возможности',
    'dashboard.continueLearning': 'Продолжить обучение',
    'dashboard.viewAllCourses': 'Все курсы',
    'dashboard.noCourses': 'Нет доступных курсов',
    'dashboard.recommendedOpportunities': 'Рекомендуемые возможности',
    'dashboard.viewAllOpportunities': 'Все возможности',
    'dashboard.noOpportunities': 'Нет доступных возможностей',
    'dashboard.featuredMentors': 'Рекомендуемые менторы',
    'dashboard.viewAllMentors': 'Все менторы',
    'dashboard.noMentors': 'Нет доступных менторов',
    'dashboard.recentAdvice': 'Последние советы',
    'dashboard.viewAllArticles': 'Просмотреть все статьи',
    'dashboard.noArticles': 'Нет доступных статей',
    'settings.notLoggedIn': "Вы должны войти в систему для доступа к настройкам",
    'settings.title': "Настройки",
    'settings.description': "Управляйте настройками и предпочтениями вашей учетной записи",
    'settings.profile': "Профиль",
    'settings.security': "Безопасность",
    'settings.profileSettings': "Настройки профиля",
    'settings.profileSettingsDesc': "Обновите свою личную информацию и фотографию профиля",
    'settings.securitySettings': "Настройки безопасности",
    'settings.securitySettingsDesc': "Управляйте своим паролем и настройками безопасности",
    'settings.firstName': "Имя",
    'settings.lastName': "Фамилия",
    'settings.email': "Email",
    'settings.username': "Имя пользователя",
    'settings.currentPassword': "Текущий пароль",
    'settings.newPassword': "Новый пароль",
    'settings.confirmPassword': "Подтвердите новый пароль",
    'settings.changePicture': "Изменить фото",
    'settings.saveChanges': "Сохранить изменения",
    'settings.updatePassword': "Обновить пароль"
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
    'auth.forgotPassword': 'Құпия сөзді ұмыттым',
    'auth.resetPassword': 'Құпия сөзді қалпына келтіру',
    'auth.resetPassword.desc': 'Құпия сөзді қалпына келтіру үшін электрондық поштаңызды енгізіңіз',
    'auth.resetPassword.button': 'Құпия сөзді қалпына келтіру',
    'auth.verifyEmail': 'Электрондық поштадан растау',
    'auth.verifyEmail.desc': 'Электрондық поштаңызды тексеріңіз',
    'auth.verifyEmail.button': 'Электрондық поштадан растау',
    'auth.resendVerification': 'Растау электрондық поштасын қайта жіберу',
    'auth.logout': 'Шығу',
    'common.back': 'Артқа',
    'common.loading': 'Жүктелу',
    'common.error': 'Қате',
    'common.success': 'Сәтті',
    'common.save': 'Сақтау',
    'common.cancel': 'Болдырмау',
    'common.edit': 'Өзгерту',
    'common.delete': 'Жою',
    'common.view': 'Көру',
    'common.search': 'Іздеу',
    'common.filter': 'Фильтр',
    'common.sort': 'Сорттау',
    'common.more': 'Көбірек',
    'common.less': 'Кемірек',
    'common.all': 'Барлығы',
    'common.none': 'Біреуі жоқ',
    'common.yes': 'Иә',
    'common.no': 'Жоқ',
    'common.or': 'Немесе',
    'common.and': 'Және',
    'common.required': 'Қажет',
    'common.optional': 'Необязательный',
    'common.invalid': 'Недействительный',
    'common.valid': 'Действительный',
    'common.unknown': 'Белгісіз',
    'common.unknownError': 'Белгісіз қате',
    'common.tryAgain': 'Бірнеше рет көпіртеу',
    'common.refresh': 'Жаңарту',
    'common.close': 'Жабу',
    'common.open': 'Ашу',
    'common.next': 'Келесі',
    'common.previous': 'Алдыңғы',
    'common.first': 'Бірінші',
    'common.last': 'Соңғы',
    'common.skip': 'Жағынан өту',
    'common.continue': 'Жалғастыру',
    'common.finish': 'Аяқтау',
    'common.start': 'Бастау',
    'common.end': 'Аяқтау',
    'common.today': 'Бүгін',
    'common.yesterday': 'Кеше',
    'common.tomorrow': 'Ертең',
    'common.now': 'Қазір',
    'common.ago': 'Аралық',
    'common.fromNow': 'Соңынан',
    'common.until': 'Қашан',
    'common.since': 'Сонынан',
    'common.between': 'Арасында',
    'common.not': 'Емес',
    'common.is': 'Бар',
    'common.are': 'Бар',
    'common.was': 'Была',
    'common.were': 'Была',
    'common.will': 'Бол',
    'common.would': 'Бы',
    'common.could': 'Мог',
    'common.should': 'Дол',
    'common.must': 'Дол',
    'common.may': 'Может',
    'common.might': 'Мог',
    'common.can': 'Может',
    'common.cannot': 'Мог',
    'common.dashboard': 'Панель',
    'dashboard.welcome': 'Қош келдіңіз, {name}!',
    'dashboard.overview': 'Шолу',
    'dashboard.courses': 'Курстар',
    'dashboard.internships': 'Тәжірибеден өту',
    'dashboard.mentors': 'Менторлар',
    'dashboard.profile': 'Профиль',
    'dashboard.settings': 'Параметрлер',
    'dashboard.logout': 'Шығу',
    'dashboard.notifications': 'Хабарландырулар',
    'dashboard.messages': 'Хабарламалар',
    'dashboard.tasks': 'Тапсырмалар',
    'dashboard.calendar': 'Күнтізбе',
    'dashboard.help': 'Көмек',
    'dashboard.support': 'Қолдау',
    'dashboard.feedback': 'Пікірлер',
    'dashboard.report': 'Есеп',
    'dashboard.about': 'Біз туралы',
    'dashboard.contact': 'Байланыс',
    'dashboard.terms': 'Шарттар',
    'dashboard.privacy': 'Құпиялылық',
    'dashboard.cookies': 'Cookies',
    'dashboard.accessibility': 'Қолжетімділік',
    'dashboard.language': 'Тіл',
    'dashboard.theme': 'Режим',
    'dashboard.darkMode': 'Қара режим',
    'dashboard.lightMode': 'Жарық режим',
    'dashboard.systemMode': 'Жүйелік режим',
    'dashboard.home': 'Менің курстарым',
    'dashboard.opportunities': 'Менторлар',
    'dashboard.advice': 'Кеңес',
    'dashboard.achievements': 'Жетістіктер',
    'dashboard.certificates': 'Сертификаттар',
    'dashboard.title': 'Тақырып',
    'dashboard.changeLanguage': 'Тілді өзгерту',
    'dashboard.portfolioDesc': 'Оқу процесіңіз мен жетістіктеріңізді бақылаңыз',
    'dashboard.announcement.title': 'Хабарландырулар',
    'dashboard.announcement.details': 'Толығырақ',
    'dashboard.announcement.newCourse': 'Жаңа курс қолжетімді',
    'dashboard.announcement.viewDetails': 'Толығырақ',
    'dashboard.announcement.competition': 'Жаңа байқау',
    'dashboard.announcement.scholarship': 'Шәкіртақы мүмкіндігі',
    'dashboard.coursesInProgress': 'Оқып жатқан курстар',
    'dashboard.certificatesEarned': 'Алынған сертификаттар',
    'dashboard.mentorSessions': 'Ментор сессиялары',
    'dashboard.opportunitiesSaved': 'Сақталған мүмкіндіктер',
    'dashboard.continueLearning': 'Оқуды жалғастыру',
    'dashboard.viewAllCourses': 'Барлық курстар',
    'dashboard.noCourses': 'Қолжетімді курстар жоқ',
    'dashboard.recommendedOpportunities': 'Ұсынылған мүмкіндіктер',
    'dashboard.viewAllOpportunities': 'Барлық мүмкіндіктер',
    'dashboard.noOpportunities': 'Қолжетімді мүмкіндіктер жоқ',
    'dashboard.featuredMentors': 'Ұсынылған менторлар',
    'dashboard.viewAllMentors': 'Барлық менторлар',
    'dashboard.noMentors': 'Қолжетімді менторлар жоқ',
    'dashboard.recentAdvice': 'Соңғы кеңестер',
    'dashboard.viewAllArticles': 'Барлық мақалаларды қарау',
    'dashboard.noArticles': 'Қол жетімді мақалалар жоқ',
    'settings.notLoggedIn': "Параметрлерге қол жеткізу үшін жүйеге кіруіңіз керек",
    'settings.title': "Параметрлер",
    'settings.description': "Тіркелгі параметрлері мен теңшеліктерін басқарыңыз",
    'settings.profile': "Профиль",
    'settings.security': "Қауіпсіздік",
    'settings.profileSettings': "Профиль параметрлері",
    'settings.profileSettingsDesc': "Жеке ақпаратыңыз бен профиль суретін жаңартыңыз",
    'settings.securitySettings': "Қауіпсіздік параметрлері",
    'settings.securitySettingsDesc': "Құпия сөзіңіз бен қауіпсіздік параметрлерін басқарыңыз",
    'settings.firstName': "Аты",
    'settings.lastName': "Тегі",
    'settings.email': "Email",
    'settings.username': "Пайдаланушы аты",
    'settings.currentPassword': "Ағымдағы құпия сөз",
    'settings.newPassword': "Жаңа құпия сөз",
    'settings.confirmPassword': "Жаңа құпия сөзді растаңыз",
    'settings.changePicture': "Суретті өзгерту",
    'settings.saveChanges': "Өзгерістерді сақтау",
    'settings.updatePassword': "Құпия сөзді жаңарту"
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