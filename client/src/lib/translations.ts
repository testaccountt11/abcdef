export type TranslationKey = 
  | 'nav.about'
  | 'nav.courses'
  | 'nav.internships'
  | 'nav.mentors'
  | 'nav.studyAdvice'
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
  | 'auth.register'
  | 'auth.register.desc'
  | 'auth.register.button'
  | 'auth.register.alternative'
  | 'auth.register.google'
  | 'auth.haveAccount'
  | 'auth.email'
  | 'auth.username'
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
  | 'settings.updatePassword'
  | 'profile.title'
  | 'profile.subtitle'
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
  | 'profile.completed'
  | 'profile.noAchievements'
  | 'profile.recentBadges'
  | 'profile.noBadges'
  | 'profile.allAchievements'
  | 'profile.achievementsDesc'
  | 'profile.allBadges'
  | 'profile.badgesDesc'
  | 'profile.skills'
  | 'profile.skillsDesc'
  | 'profile.portfolio'
  | 'profile.portfolioDesc'
  | 'profile.contact'
  | 'profile.contactDesc'
  | 'profile.editProfile'
  | 'profile.level'
  | 'profile.experience'
  | 'profile.projects'
  | 'profile.addSkill'
  | 'profile.addProject'
  | 'profile.projectTitle'
  | 'profile.projectDesc'
  | 'profile.projectUrl'
  | 'profile.projectTech'
  | 'profile.projectImage'
  | 'profile.phone'
  | 'profile.location'
  | 'profile.website'
  | 'profile.linkedin'
  | 'profile.github'
  | 'profile.telegram'
  | 'profile.whatsapp'
  | 'profile.socialLinks'
  | 'profile.education'
  | 'profile.educationDesc'
  | 'profile.addEducation'
  | 'profile.institution'
  | 'profile.degree'
  | 'profile.fieldOfStudy'
  | 'profile.startDate'
  | 'profile.endDate'
  | 'profile.present'
  | 'profile.gpa'
  | 'profile.activities'
  | 'profile.languages'
  | 'profile.languagesDesc'
  | 'profile.addLanguage'
  | 'profile.languageName'
  | 'profile.languageLevel'
  | 'profile.basic'
  | 'profile.intermediate'
  | 'profile.advanced'
  | 'profile.native'
  | 'errors.userNotFound'
  | 'achievement.completed'
  | 'achievement.progress'
  | 'features.title'
  | 'features.subtitle'
  | 'auth.noAccount'
  | 'auth.accountNotFound'
  | 'aboutUs.title'
  | 'aboutUs.subtitle'
  | 'aboutUs.mission.title'
  | 'aboutUs.mission.description1'
  | 'aboutUs.mission.description2'
  | 'aboutUs.mission.joinButton'
  | 'aboutUs.mission.exploreButton'
  | 'aboutUs.values.title'
  | 'aboutUs.values.subtitle'
  | 'aboutUs.values.community.title'
  | 'aboutUs.values.community.description'
  | 'aboutUs.values.innovation.title'
  | 'aboutUs.values.innovation.description'
  | 'aboutUs.values.inclusivity.title'
  | 'aboutUs.values.inclusivity.description'
  | 'aboutUs.values.excellence.title'
  | 'aboutUs.values.excellence.description'
  | 'aboutUs.values.growth.title'
  | 'aboutUs.values.growth.description'
  | 'aboutUs.team.title'
  | 'aboutUs.team.subtitle'
  | 'aboutUs.team.member1.name'
  | 'aboutUs.team.member1.role'
  | 'aboutUs.team.member1.bio'
  | 'aboutUs.team.member2.name'
  | 'aboutUs.team.member2.role'
  | 'aboutUs.team.member2.bio'
  | 'aboutUs.team.member3.name'
  | 'aboutUs.team.member3.role'
  | 'aboutUs.team.member3.bio'
  | 'aboutUs.team.member4.name'
  | 'aboutUs.team.member4.role'
  | 'aboutUs.team.member4.bio'
  | 'aboutUs.cta.title'
  | 'aboutUs.cta.description'
  | 'aboutUs.cta.button'
  | 'footer.links.aboutUs'
  | 'aboutUs.mission.imageCaption'
  | 'aboutUs.team.connectButton'
  | 'aboutUs.cta.primaryButton'
  | 'aboutUs.cta.secondaryButton'
  | 'aboutUs.cta.stat1'
  | 'aboutUs.cta.stat2'
  | 'aboutUs.cta.stat3'
  | 'aboutUs.values.description'
  | 'faq.title'
  | 'faq.subtitle'
  | 'auth.password'
  | 'auth.confirmPassword'
  | 'auth.password.requirements.length'
  | 'auth.password.requirements.uppercase'
  | 'auth.password.requirements.special'
  | 'auth.password.requirements.match'
  | 'profile.editSkill'
  | 'profile.skillName'
  | 'profile.skillCategory'
  | 'profile.skillLevel'
  | 'profile.selectLevel'
  | 'profile.yearsOfExperience'
  | 'profile.editEducation'
  | 'profile.description'
  | 'common.add'
  | 'profile.certificate'
  | 'profile.editProject'
  | 'profile.editLanguage'
  | 'profile.stats.title'
  | 'profile.stats.courses'
  | 'profile.stats.coursesDesc'
  | 'profile.stats.certificates'
  | 'profile.stats.certificatesDesc'
  | 'profile.stats.mentoring'
  | 'profile.stats.mentoringDesc'
  | 'profile.stats.opportunities'
  | 'profile.stats.opportunitiesDesc'
  | 'profile.achievements.title'
  | 'profile.achievements.unlockedAt'
  | 'profile.achievements.progress'
  | 'profile.achievements.pioneer'
  | 'profile.achievements.pioneerDesc'
  | 'profile.achievements.skillMaster'
  | 'profile.achievements.skillMasterDesc'
  | 'profile.achievements.polyglot'
  | 'profile.achievements.polyglotDesc'
  | 'profile.viewMore'
  | 'profile.share'
  | 'profile.edit';

export const translations: Record<string, Record<TranslationKey, string>> = {
  en: {
    'auth.haveAccount': 'Have an account?',
    'nav.about': 'About Us',
    'nav.courses': 'Courses',
    'nav.internships': 'Internships',
    'nav.mentors': 'Mentors',
    'nav.studyAdvice': 'Study Tips',
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
    'auth.register': 'Create an Account',
    'auth.register.desc': 'Sign up to start building your educational portfolio',
    'auth.register.button': 'Create Account with Email',
    'auth.register.alternative': 'Or continue with',
    'auth.register.google': 'Sign Up with Google',
    'auth.email': 'Email',
    'auth.username': 'Username',
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
    'dashboard.opportunities': 'Оpportunities',
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
    'profile.title': 'Profile',
    'profile.subtitle': 'Manage your profile and settings',
    'profile.displayedBadges': 'Displayed Badges',
    'profile.stats': 'Stats',
    'profile.overview': 'Overview',
    'profile.achievements': 'Achievements',
    'profile.badges': 'Badges',
    'profile.summary': 'Summary',
    'profile.summaryDesc': 'General information about your progress',
    'profile.achievementsCompleted': 'Achievements Completed',
    'profile.badgesEarned': 'Badges Earned',
    'profile.recentAchievements': 'Recent Achievements',
    'profile.completed': 'Completed',
    'profile.noAchievements': 'No Achievements',
    'profile.recentBadges': 'Recent Badges',
    'profile.noBadges': 'No Badges',
    'profile.allAchievements': 'All Achievements',
    'profile.achievementsDesc': 'View all your achievements',
    'profile.allBadges': 'All Badges',
    'profile.badgesDesc': 'View all your badges',
    'errors.userNotFound': 'User not found',
    'achievement.completed': 'Completed',
    'achievement.progress': 'Progress',
    'features.title': 'Platform Features',
    'features.subtitle': 'Discover what makes us unique',
    'auth.noAccount': 'No account?',
    'auth.accountNotFound': 'Account not found',
    'aboutUs.title': 'About Us',
    'aboutUs.subtitle': 'Learn more about our company, mission, and team behind Portfol.IO',
    'aboutUs.mission.title': 'Our Mission',
    'aboutUs.mission.description1': 'At Portfol.IO, we aim to democratize access to quality education and career opportunities for students around the world, regardless of their background or circumstances.',
    'aboutUs.mission.description2': 'We create a platform that connects students with the best educational resources, internships, and mentors, helping them build a successful future in their chosen field.',
    'aboutUs.mission.joinButton': 'Join Now',
    'aboutUs.mission.exploreButton': 'Explore Courses',
    'aboutUs.values.title': 'Our Values',
    'aboutUs.values.subtitle': 'The fundamental principles that define our work and interaction with the community',
    'aboutUs.values.community.title': 'Community',
    'aboutUs.values.community.description': 'We believe in the power of community and collaborative learning to create a richer educational experience.',
    'aboutUs.values.innovation.title': 'Innovation',
    'aboutUs.values.innovation.description': 'We constantly explore new technologies and learning methods to create more effective educational solutions.',
    'aboutUs.values.inclusivity.title': 'Inclusivity',
    'aboutUs.values.inclusivity.description': 'We strive to create a platform accessible to all, regardless of geography, language, or socio-economic position.',
    'aboutUs.values.excellence.title': 'Excellence',
    'aboutUs.values.excellence.description': 'We strive for the highest quality in everything we do, from course content to technical infrastructure.',
    'aboutUs.values.growth.title': 'Growth',
    'aboutUs.values.growth.description': 'We encourage continuous growth and development for both our users and our team.',
    'aboutUs.team.title': 'Our Team',
    'aboutUs.team.subtitle': 'Meet the people who make Portfol.IO possible',
    'aboutUs.team.member1.name': 'Alexey Petrov',
    'aboutUs.team.member1.role': 'Founder and CEO',
    'aboutUs.team.member1.bio': 'Former lecturer with 10 years of experience, passionate about educational technologies and innovations.',
    'aboutUs.team.member2.name': 'Ekaterina Sergeeva',
    'aboutUs.team.member2.role': 'Technical Director',
    'aboutUs.team.member2.bio': 'Experienced software engineer with experience working in leading technology companies and deep understanding of educational platforms.',
    'aboutUs.team.member3.name': 'Ivan Smirnov',
    'aboutUs.team.member3.role': 'Education Director',
    'aboutUs.team.member3.bio': 'Former dean with extensive experience in developing educational programs and assessing educational quality.',
    'aboutUs.team.member4.name': 'Maria Kuznetsova',
    'aboutUs.team.member4.role': 'Marketing Director',
    'aboutUs.team.member4.bio': 'Experienced marketer with experience working in EdTech and deep understanding of student needs.',
    'aboutUs.cta.title': 'Join Us Today',
    'aboutUs.cta.description': 'Become part of the growing community of students, teachers, and professionals building future education.',
    'aboutUs.cta.button': 'Sign Up',
    'footer.links.aboutUs': 'About Us',
    'aboutUs.mission.imageCaption': 'Building a better future through education',
    'aboutUs.team.connectButton': 'Connect',
    'aboutUs.cta.primaryButton': 'Join Now',
    'aboutUs.cta.secondaryButton': 'Explore Courses',
    'aboutUs.cta.stat1': 'Active Users',
    'aboutUs.cta.stat2': 'Learning Partners',
    'aboutUs.cta.stat3': 'Satisfaction Rate',
    'aboutUs.values.description': 'These core values guide everything we do - from product development to community engagement.',
    'faq.title': "Frequently Asked Questions",
    'faq.subtitle': "Find answers to common questions about our platform and services.",
    'auth.password.requirements.length': 'Password must be at least 8 characters',
    'auth.password.requirements.uppercase': 'Password must contain at least one uppercase letter',
    'auth.password.requirements.special': 'Password must contain at least one special character',
    'auth.password.requirements.match': 'Passwords don\'t match',
    'profile.skills': 'Skills',
    'profile.skillsDesc': 'Technical and soft skills',
    'profile.portfolio': 'Portfolio',
    'profile.portfolioDesc': 'Projects and work samples',
    'profile.contact': 'Contact Information',
    'profile.contactDesc': 'How to reach me',
    'profile.editProfile': 'Edit Profile',
    'profile.level': 'Level',
    'profile.experience': 'Experience',
    'profile.projects': 'Projects',
    'profile.addSkill': 'Add Skill',
    'profile.addProject': 'Add Project',
    'profile.projectTitle': 'Project Title',
    'profile.projectDesc': 'Project Description',
    'profile.projectUrl': 'Project URL',
    'profile.projectTech': 'Technologies Used',
    'profile.projectImage': 'Project Image',
    'profile.phone': 'Phone',
    'profile.location': 'Location',
    'profile.website': 'Website',
    'profile.linkedin': 'LinkedIn',
    'profile.github': 'GitHub',
    'profile.telegram': 'Telegram',
    'profile.whatsapp': 'WhatsApp',
    'profile.socialLinks': 'Social Links',
    'profile.education': 'Education',
    'profile.educationDesc': 'Academic background',
    'profile.addEducation': 'Add Education',
    'profile.institution': 'Institution',
    'profile.degree': 'Degree',
    'profile.fieldOfStudy': 'Field of Study',
    'profile.startDate': 'Start Date',
    'profile.endDate': 'End Date',
    'profile.present': 'Present',
    'profile.gpa': 'GPA',
    'profile.activities': 'Activities',
    'profile.languages': 'Languages',
    'profile.languagesDesc': 'Language proficiency',
    'profile.addLanguage': 'Add Language',
    'profile.languageName': 'Language',
    'profile.languageLevel': 'Proficiency Level',
    'profile.basic': 'Basic',
    'profile.intermediate': 'Intermediate',
    'profile.advanced': 'Advanced',
    'profile.native': 'Native',
    'profile.editSkill': 'Edit Skill',
    'profile.skillName': 'Skill Name',
    'profile.skillCategory': 'Category',
    'profile.skillLevel': 'Skill Level',
    'profile.selectLevel': 'Select Level',
    'profile.yearsOfExperience': 'Years of Experience',
    'profile.editEducation': 'Edit Education',
    'profile.description': 'Description',
    'common.add': 'Add',
    'profile.certificate': 'Certificate',
    'profile.editProject': 'Edit Project',
    'profile.editLanguage': 'Edit Language',
    'profile.stats.title': 'Statistics',
    'profile.stats.courses': 'Active Courses',
    'profile.stats.coursesDesc': 'courses in progress',
    'profile.stats.certificates': 'Certificates',
    'profile.stats.certificatesDesc': 'certificates earned',
    'profile.stats.mentoring': 'Mentoring',
    'profile.stats.mentoringDesc': 'sessions completed',
    'profile.stats.opportunities': 'Opportunities',
    'profile.stats.opportunitiesDesc': 'opportunities saved',
    'profile.achievements.title': 'Achievements',
    'profile.achievements.unlockedAt': 'Unlocked',
    'profile.achievements.progress': 'Progress',
    'profile.achievements.pioneer': 'Profile Pioneer',
    'profile.achievements.pioneerDesc': 'Complete your profile information',
    'profile.achievements.skillMaster': 'Skill Master',
    'profile.achievements.skillMasterDesc': 'Add your professional skills',
    'profile.achievements.polyglot': 'Language Enthusiast',
    'profile.achievements.polyglotDesc': 'Add your language proficiencies',
    'profile.viewMore': 'View More',
    'profile.share': 'Share Profile',
    'profile.edit': 'Edit Profile'
  },
  ru: {
    'auth.haveAccount': 'Уже есть аккаунт?',
    'nav.about': 'О нас',
    'nav.courses': 'Курсы',
    'nav.internships': 'Стажировки',
    'nav.mentors': 'Менторы',
    'nav.studyAdvice': 'Советы по учебе',
    'nav.login': 'Войти',
    'hero.title': 'Создайте своё будущее с Portfol.IO',
    'hero.subtitle': 'Платформа нового поколения для вашего карьерного развития. Курсы, стажировки и наставничество в одном месте.',
    'hero.start': 'Начать бесплатно',
    'hero.learnMore': 'Узнать больше',
    'features.personalPath.title': 'Персональный путь',
    'features.personalPath.desc': 'ИИ создаёт индивидуальный план развития',
    'features.topCourses.title': 'Лучшие курсы',
    'features.topCourses.desc': 'Отличные возможности для вашего портфолио',
    'features.competitions.title': 'Соревнования',
    'features.competitions.desc': 'Участвуйте и выигрывайте стипендии',
    'features.mentorship.title': 'Наставничество',
    'features.mentorship.desc': 'Поддержка от профессионалов',
    'about.title': 'О Portfol.IO',
    'about.subtitle': 'Наша миссия - дать студентам возможность строить своё будущее',
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
    'auth.register': 'Создать аккаунт',
    'auth.register.desc': 'Зарегистрируйтесь, чтобы начать создавать ваше образовательное портфолио',
    'auth.register.button': 'Создать аккаунт с Email',
    'auth.register.alternative': 'Или продолжить с',
    'auth.register.google': 'Зарегистрироваться через Google',
    'auth.email': 'Email',
    'auth.username': 'Имя пользователя',
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
    'dashboard.mentors': 'Наставники',
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
    'dashboard.opportunities': 'Возможности',
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
    'dashboard.coursesInProgress': 'Обучающиеся курсы',
    'dashboard.certificatesEarned': 'Полученные сертификаты',
    'dashboard.mentorSessions': 'Сессии с наставником',
    'dashboard.opportunitiesSaved': 'Сохраненные возможности',
    'dashboard.continueLearning': 'Продолжить обучение',
    'dashboard.viewAllCourses': 'Все курсы',
    'dashboard.noCourses': 'Нет обучающих курсов',
    'dashboard.recommendedOpportunities': 'Рекомендуемые возможности',
    'dashboard.viewAllOpportunities': 'Все возможности',
    'dashboard.noOpportunities': 'Нет доступных возможностей',
    'dashboard.featuredMentors': 'Рекомендуемые наставники',
    'dashboard.viewAllMentors': 'Все наставники',
    'dashboard.noMentors': 'Нет доступных наставников',
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
    'settings.updatePassword': "Обновить пароль",
    'profile.title': 'Профиль',
    'profile.subtitle': 'Профиліңіз бен параметрлерді басқару',
    'profile.displayedBadges': 'Көрсетілген белгілер',
    'profile.stats': 'Статистика',
    'profile.overview': 'Шолу',
    'profile.achievements': 'Жетістіктер',
    'profile.badges': 'Белгілер',
    'profile.summary': 'Қорытынды',
    'profile.summaryDesc': 'Сіздің прогресіңіз туралы жалпы ақпарат',
    'profile.achievementsCompleted': 'Аяқталған жетістіктер',
    'profile.badgesEarned': 'Алынған белгілер',
    'profile.recentAchievements': 'Соңғы жетістіктер',
    'profile.completed': 'Аяқталды',
    'profile.noAchievements': 'Жетістіктер жоқ',
    'profile.recentBadges': 'Соңғы белгілер',
    'profile.noBadges': 'Белгілер жоқ',
    'profile.allAchievements': 'Барлық жетістіктер',
    'profile.achievementsDesc': 'Барлық жетістіктеріңізді қарау',
    'profile.allBadges': 'Барлық белгілер',
    'profile.badgesDesc': 'Барлық белгілеріңізді қарау',
    'errors.userNotFound': 'Пайдаланушы табылмады',
    'achievement.completed': 'Аяқталды',
    'achievement.progress': 'Прогресс',
    'features.title': 'Возможности платформы',
    'features.subtitle': 'Узнайте, что делает нас уникальными',
    'auth.noAccount': 'Аккаунтыңыз жоқ па?',
    'auth.accountNotFound': 'Аккаунт табылмады',
    'aboutUs.title': 'Біз туралы',
    'aboutUs.subtitle': 'Portfol.IO артындағы біздің компания, миссиямыз және командамыз туралы көбірек біліңіз',
    'aboutUs.mission.title': 'Біздің миссиямыз',
    'aboutUs.mission.description1': 'Portfol.IO-да біз студенттердің шығу тегі мен жағдайларына қарамастан, әлемнің барлық студенттері үшін сапалы білім мен мансаптық мүмкіндіктерге қол жетімділікті демократияландыруға тырысамыз.',
    'aboutUs.mission.description2': 'Біз студенттерді үздік білім беру ресурстарымен, тәжірибеден өтумен және тәлімгерлермен байланыстыратын платформа жасап, оларға таңдаған салада табысты болашақ құруға көмектесеміз.',
    'aboutUs.mission.joinButton': 'Қазір қосылу',
    'aboutUs.mission.exploreButton': 'Курстарды зерттеу',
    'aboutUs.values.title': 'Біздің құндылықтарымыз',
    'aboutUs.values.subtitle': 'Біздің жұмысымыз бен қоғаммен өзара әрекеттесуімізді анықтайтын негізгі принциптер',
    'aboutUs.values.community.title': 'Қауымдастық',
    'aboutUs.values.community.description': 'Біз байырақ білім беру тәжірибесін құру үшін қоғамдастық пен бірлескен оқытудың күшіне сенеміз.',
    'aboutUs.values.innovation.title': 'Инновация',
    'aboutUs.values.innovation.description': 'Біз тиімді білім беру шешімдерін жасау үшін жаңа технологиялар мен оқыту әдістерін үнемі зерттейміз.',
    'aboutUs.values.inclusivity.title': 'Инклюзивтілік',
    'aboutUs.values.inclusivity.description': 'Біз географиялық орналасуына, тіліне немесе әлеуметтік-экономикалық жағдайына қарамастан, барлығына қол жетімді платформа құруға тырысамыз.',
    'aboutUs.values.excellence.title': 'Үздіктік',
    'aboutUs.values.excellence.description': 'Біз курс мазмұнынан бастап техникалық инфрақұрылымға дейін барлық жұмысымызда ең жоғары сапаға ұмтыламыз.',
    'aboutUs.values.growth.title': 'Өсу',
    'aboutUs.values.growth.description': 'Біз пайдаланушыларымыз бен командамыз үшін үздіксіз өсу мен дамуды қолдаймыз.',
    'aboutUs.team.title': 'Біздің команда',
    'aboutUs.team.subtitle': 'Portfol.IO мүмкін ететін адамдармен танысыңыз',
    'aboutUs.team.member1.name': 'Алексей Петров',
    'aboutUs.team.member1.role': 'Негізін қалаушы және CEO',
    'aboutUs.team.member1.bio': 'Білім беру технологиялары мен инновацияларға құштар 10 жылдық тәжірибесі бар бұрынғы оқытушы.',
    'aboutUs.team.member2.name': 'Екатерина Сергеева',
    'aboutUs.team.member2.role': 'Техникалық директор',
    'aboutUs.team.member2.bio': 'Жетекші технологиялық компанияларда жұмыс істеу тәжірибесі бар және білім беру платформаларын терең түсінетін тәжірибелі бағдарламалық инженер.',
    'aboutUs.team.member3.name': 'Иван Смирнов',
    'aboutUs.team.member3.role': 'Білім беру директоры',
    'aboutUs.team.member3.bio': 'Білім беру бағдарламаларын әзірлеу және білім беру сапасын бағалау саласында үлкен тәжірибесі бар бұрынғы декан.',
    'aboutUs.team.member4.name': 'Мария Кузнецова',
    'aboutUs.team.member4.role': 'Маркетинг жөніндегі директор',
    'aboutUs.team.member4.bio': 'EdTech саласында жұмыс істеу тәжірибесі бар және студенттердің қажеттіліктерін терең түсінетін тәжірибелі маркетолог.',
    'aboutUs.cta.title': 'Бүгін бізге қосылыңыз',
    'aboutUs.cta.description': 'Болашақ білім беруді құратын студенттердің, оқытушылардың және кәсіпқойлардың өсіп келе жатқан қауымдастығының бір бөлігі болыңыз.',
    'aboutUs.cta.button': 'Тіркелу',
    'footer.links.aboutUs': 'Біз туралы',
    'aboutUs.mission.imageCaption': 'Строим лучшее будущее через образование',
    'aboutUs.team.connectButton': 'Байланысу',
    'aboutUs.cta.primaryButton': 'Қазір қосылу',
    'aboutUs.cta.secondaryButton': 'Курстарды зерттеу',
    'aboutUs.cta.stat1': 'Белсенді қолданушылар',
    'aboutUs.cta.stat2': 'Білім беру серіктестері',
    'aboutUs.cta.stat3': 'Қанағаттану деңгейі',
    'aboutUs.values.description': 'Бұл негізгі құндылықтар біздің барлық іс-әрекеттерімізді анықтайды - өнімді дамытудан бастап қоғаммен қарым-қатынасқа дейін.',
    'faq.title': "Часто задаваемые вопросы",
    'faq.subtitle': "Найдите ответы на распространенные вопросы о нашей платформе и услугах.",
    'auth.password.requirements.length': 'Пароль должен содержать не менее 8 символов',
    'auth.password.requirements.uppercase': 'Пароль должен содержать как минимум одну заглавную букву',
    'auth.password.requirements.special': 'Пароль должен содержать как минимум один специальный символ',
    'auth.password.requirements.match': 'Пароли не совпадают',
    'profile.skills': 'Навыки',
    'profile.skillsDesc': 'Технические и личные навыки',
    'profile.portfolio': 'Портфолио',
    'profile.portfolioDesc': 'Проекты и примеры работ',
    'profile.contact': 'Контактная информация',
    'profile.contactDesc': 'Как со мной связаться',
    'profile.editProfile': 'Редактировать профиль',
    'profile.level': 'Уровень',
    'profile.experience': 'Опыт',
    'profile.projects': 'Проекты',
    'profile.addSkill': 'Добавить навык',
    'profile.addProject': 'Добавить проект',
    'profile.projectTitle': 'Название проекта',
    'profile.projectDesc': 'Описание проекта',
    'profile.projectUrl': 'URL проекта',
    'profile.projectTech': 'Использованные технологии',
    'profile.projectImage': 'Изображение проекта',
    'profile.phone': 'Телефон',
    'profile.location': 'Местоположение',
    'profile.website': 'Веб-сайт',
    'profile.linkedin': 'LinkedIn',
    'profile.github': 'GitHub',
    'profile.telegram': 'Telegram',
    'profile.whatsapp': 'WhatsApp',
    'profile.socialLinks': 'Социальные сети',
    'profile.education': 'Образование',
    'profile.educationDesc': 'Академическая подготовка',
    'profile.addEducation': 'Добавить образование',
    'profile.institution': 'Учебное заведение',
    'profile.degree': 'Степень',
    'profile.fieldOfStudy': 'Направление обучения',
    'profile.startDate': 'Дата начала',
    'profile.endDate': 'Дата окончания',
    'profile.present': 'По настоящее время',
    'profile.gpa': 'Средний балл',
    'profile.activities': 'Деятельность',
    'profile.languages': 'Языки',
    'profile.languagesDesc': 'Владение языками',
    'profile.addLanguage': 'Добавить язык',
    'profile.languageName': 'Язык',
    'profile.languageLevel': 'Уровень владения',
    'profile.basic': 'Базовый',
    'profile.intermediate': 'Средний',
    'profile.advanced': 'Продвинутый',
    'profile.native': 'Родной',
    'profile.editSkill': 'Редактировать навык',
    'profile.skillName': 'Название навыка',
    'profile.skillCategory': 'Категория',
    'profile.skillLevel': 'Уровень навыка',
    'profile.selectLevel': 'Выберите уровень',
    'profile.yearsOfExperience': 'Опыт работы (лет)',
    'profile.editEducation': 'Редактировать образование',
    'profile.description': 'Описание',
    'common.add': 'Добавить',
    'profile.certificate': 'Сертификат',
    'profile.editProject': 'Редактировать проект',
    'profile.editLanguage': 'Редактировать язык',
    'profile.stats.title': 'Статистика',
    'profile.stats.courses': 'Активные курсы',
    'profile.stats.coursesDesc': 'курсов в процессе',
    'profile.stats.certificates': 'Сертификаты',
    'profile.stats.certificatesDesc': 'получено сертификатов',
    'profile.stats.mentoring': 'Менторство',
    'profile.stats.mentoringDesc': 'сессий завершено',
    'profile.stats.opportunities': 'Возможности',
    'profile.stats.opportunitiesDesc': 'сохранено возможностей',
    'profile.achievements.title': 'Достижения',
    'profile.achievements.unlockedAt': 'Получено',
    'profile.achievements.progress': 'Прогресс',
    'profile.achievements.pioneer': 'Пионер профиля',
    'profile.achievements.pioneerDesc': 'Complete your profile information',
    'profile.achievements.skillMaster': 'Skill Master',
    'profile.achievements.skillMasterDesc': 'Add your professional skills',
    'profile.achievements.polyglot': 'Language Enthusiast',
    'profile.achievements.polyglotDesc': 'Add your language proficiencies',
    'profile.viewMore': 'View More',
    'profile.share': 'Share Profile',
    'profile.edit': 'Edit Profile'
  },
  kz: {
    'nav.about': 'Біз туралы',
    'nav.courses': 'Курстар',
    'nav.internships': 'Тәжірибе',
    'nav.mentors': 'Менторлар',
    'nav.studyAdvice': 'Оқу кеңестері',
    'nav.login': 'Кіру',
    'hero.title': 'Portfol.IO-мен болашағыңды құр',
    'hero.subtitle': 'Мансабыңды дамытуға арналған жаң буын платформасы. Курстар, тәжірибеден өту және тәлімгерлік бір жерде.',
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
    'testimonials.title': 'Табыс жолдары',
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
    'auth.register': 'Аккаунт құру',
    'auth.register.desc': 'Білім портфолиоңызды жасауды бастау үшін тіркеліңіз',
    'auth.register.button': 'Email арқылы аккаунт жасау',
    'auth.register.alternative': 'Немесе жалғастыру',
    'auth.register.google': 'Google арқылы тіркелу',
    'auth.email': 'Email',
    'auth.username': 'Пайдаланушы аты',
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
    'common.optional': 'Міндетті емес',
    'common.invalid': 'Жарамсыз',
    'common.valid': 'Жарамды',
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
    'common.was': 'Болған',
    'common.were': 'Болған',
    'common.will': 'Будет',
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
    'dashboard.opportunities': 'Мүмкіндіктер',
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
    'dashboard.viewAllMentors': 'Все менторлар',
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
    'settings.updatePassword': "Құпия сөзді жаңарту",
    'profile.title': 'Профиль',
    'profile.subtitle': 'Профиліңіз бен параметрлерді басқару',
    'profile.displayedBadges': 'Көрсетілген белгілер',
    'profile.stats': 'Статистика',
    'profile.overview': 'Шолу',
    'profile.achievements': 'Жетістіктер',
    'profile.badges': 'Белгілер',
    'profile.summary': 'Қорытынды',
    'profile.summaryDesc': 'Сіздің прогресіңіз туралы жалпы ақпарат',
    'profile.achievementsCompleted': 'Аяқталған жетістіктер',
    'profile.badgesEarned': 'Алынған белгілер',
    'profile.recentAchievements': 'Соңғы жетістіктер',
    'profile.completed': 'Аяқталды',
    'profile.noAchievements': 'Жетістіктер жоқ',
    'profile.recentBadges': 'Соңғы белгілер',
    'profile.noBadges': 'Белгілер жоқ',
    'profile.allAchievements': 'Барлық жетістіктер',
    'profile.achievementsDesc': 'Барлық жетістіктеріңізді қарау',
    'profile.allBadges': 'Барлық белгілер',
    'profile.badgesDesc': 'Барлық белгілеріңізді қарау',
    'errors.userNotFound': 'Пайдаланушы табылмады',
    'achievement.completed': 'Аяқталды',
    'achievement.progress': 'Прогресс',
    'features.title': 'Платформаның мүмкіндіктері',
    'features.subtitle': 'Біздің ерекшеліктерімізді біліңіз',
    'auth.noAccount': 'Аккаунтыңыз жоқ па?',
    'auth.accountNotFound': 'Аккаунт табылмады',
    'auth.haveAccount': 'Аккаунтыңыз бар ма?',
    'aboutUs.title': 'Біз туралы',
    'aboutUs.subtitle': 'Portfol.IO артындағы біздің компания, миссиямыз және командамыз туралы көбірек біліңіз',
    'aboutUs.mission.title': 'Біздің миссиямыз',
    'aboutUs.mission.description1': 'Portfol.IO-да біз студенттердің шығу тегі мен жағдайларына қарамастан, әлемнің барлық студенттері үшін сапалы білім мен мансаптық мүмкіндіктерге қол жетімділікті демократияландыруға тырысамыз.',
    'aboutUs.mission.description2': 'Біз студенттерді үздік білім беру ресурстарымен, тәжірибеден өтумен және тәлімгерлермен байланыстыратын платформа жасап, оларға таңдаған салада табысты болашақ құруға көмектесеміз.',
    'aboutUs.mission.joinButton': 'Қазір қосылу',
    'aboutUs.mission.exploreButton': 'Курстарды зерттеу',
    'aboutUs.values.title': 'Біздің құндылықтарымыз',
    'aboutUs.values.subtitle': 'Біздің жұмысымыз бен қоғаммен өзара әрекеттесуімізді анықтайтын негізгі принциптер',
    'aboutUs.values.community.title': 'Қауымдастық',
    'aboutUs.values.community.description': 'Біз байырақ білім беру тәжірибесін құру үшін қоғамдастық пен бірлескен оқытудың күшіне сенеміз.',
    'aboutUs.values.innovation.title': 'Инновация',
    'aboutUs.values.innovation.description': 'Біз тиімді білім беру шешімдерін жасау үшін жаңа технологиялар мен оқыту әдістерін үнемі зерттейміз.',
    'aboutUs.values.inclusivity.title': 'Инклюзивтілік',
    'aboutUs.values.inclusivity.description': 'Біз географиялық орналасуына, тіліне немесе әлеуметтік-экономикалық жағдайына қарамастан, барлығына қол жетімді платформа құруға тырысамыз.',
    'aboutUs.values.excellence.title': 'Үздіктік',
    'aboutUs.values.excellence.description': 'Біз курс мазмұнынан бастап техникалық инфрақұрылымға дейін барлық жұмысымызда ең жоғары сапаға ұмтыламыз.',
    'aboutUs.values.growth.title': 'Өсу',
    'aboutUs.values.growth.description': 'Біз пайдаланушыларымыз бен командамыз үшін үздіксіз өсу мен дамуды қолдаймыз.',
    'aboutUs.team.title': 'Біздің команда',
    'aboutUs.team.subtitle': 'Portfol.IO мүмкін ететін адамдармен танысыңыз',
    'aboutUs.team.member1.name': 'Алексей Петров',
    'aboutUs.team.member1.role': 'Негізін қалаушы және CEO',
    'aboutUs.team.member1.bio': 'Білім беру технологиялары мен инновацияларға құштар 10 жылдық тәжірибесі бар бұрынғы оқытушы.',
    'aboutUs.team.member2.name': 'Екатерина Сергеева',
    'aboutUs.team.member2.role': 'Техникалық директор',
    'aboutUs.team.member2.bio': 'Жетекші технологиялық компанияларда жұмыс істеу тәжірибесі бар және білім беру платформаларын терең түсінетін тәжірибелі бағдарламалық инженер.',
    'aboutUs.team.member3.name': 'Иван Смирнов',
    'aboutUs.team.member3.role': 'Білім беру директоры',
    'aboutUs.team.member3.bio': 'Білім беру бағдарламаларын әзірлеу және білім беру сапасын бағалау саласында үлкен тәжірибесі бар бұрынғы декан.',
    'aboutUs.team.member4.name': 'Мария Кузнецова',
    'aboutUs.team.member4.role': 'Маркетинг жөніндегі директор',
    'aboutUs.team.member4.bio': 'EdTech саласында жұмыс істеу тәжірибесі бар және студенттердің қажеттіліктерін терең түсінетін тәжірибелі маркетолог.',
    'aboutUs.cta.title': 'Бүгін бізге қосылыңыз',
    'aboutUs.cta.description': 'Болашақ білім беруді құратын студенттердің, оқытушылардың және кәсіпқойлардың өсіп келе жатқан қауымдастығының бір бөлігі болыңыз.',
    'aboutUs.cta.button': 'Тіркелу',
    'footer.links.aboutUs': 'Біз туралы',
    'aboutUs.mission.imageCaption': 'Білім арқылы жақсы болашақ құру',
    'aboutUs.team.connectButton': 'Байланысу',
    'aboutUs.cta.primaryButton': 'Қазір қосылу',
    'aboutUs.cta.secondaryButton': 'Курстарды зерттеу',
    'aboutUs.cta.stat1': 'Белсенді қолданушылар',
    'aboutUs.cta.stat2': 'Білім беру серіктестері',
    'aboutUs.cta.stat3': 'Қанағаттану деңгейі',
    'aboutUs.values.description': 'Бұл негізгі құндылықтар біздің барлық іс-әрекеттерімізді анықтайды - өнімді дамытудан бастап қоғаммен қарым-қатынасқа дейін.',
    'faq.title': "Жиі қойылатын сұрақтар",
    'faq.subtitle': "Біздің платформа мен қызметтеріміз туралы жиі қойылатын сұрақтарға жауаптар табыңыз.",
    'auth.password.requirements.length': 'Құпия сөз кемінде 8 таңбадан тұруы керек',
    'auth.password.requirements.uppercase': 'Құпия сөзде кемінде бір бас әріп болуы керек',
    'auth.password.requirements.special': 'Құпия сөзде кемінде бір арнайы таңба болуы керек',
    'auth.password.requirements.match': 'Құпия сөздер сәйкес келмейді',
    'profile.skills': 'Дағдылар',
    'profile.skillsDesc': 'Техникалық және жеке дағдылар',
    'profile.portfolio': 'Портфолио',
    'profile.portfolioDesc': 'Жобалар мен жұмыс үлгілері',
    'profile.contact': 'Байланыс ақпараты',
    'profile.contactDesc': 'Менімен байланысу',
    'profile.editProfile': 'Профильді өңдеу',
    'profile.level': 'Деңгей',
    'profile.experience': 'Тәжірибе',
    'profile.projects': 'Жобалар',
    'profile.addSkill': 'Дағды қосу',
    'profile.addProject': 'Жоба қосу',
    'profile.projectTitle': 'Жоба атауы',
    'profile.projectDesc': 'Жоба сипаттамасы',
    'profile.projectUrl': 'Жоба URL',
    'profile.projectTech': 'Қолданылған технологиялар',
    'profile.projectImage': 'Жоба суреті',
    'profile.phone': 'Телефон',
    'profile.location': 'Орналасқан жері',
    'profile.website': 'Веб-сайт',
    'profile.linkedin': 'LinkedIn',
    'profile.github': 'GitHub',
    'profile.telegram': 'Telegram',
    'profile.whatsapp': 'WhatsApp',
    'profile.socialLinks': 'Әлеуметтік желілер',
    'profile.education': 'Білім',
    'profile.educationDesc': 'Академиялық дайындық',
    'profile.addEducation': 'Білім қосу',
    'profile.institution': 'Оқу орны',
    'profile.degree': 'Дәреже',
    'profile.fieldOfStudy': 'Оқу бағыты',
    'profile.startDate': 'Басталу күні',
    'profile.endDate': 'Аяқталу күні',
    'profile.present': 'Қазіргі уақытта',
    'profile.gpa': 'Орташа балл',
    'profile.activities': 'Қызмет',
    'profile.languages': 'Тілдер',
    'profile.languagesDesc': 'Тіл білу деңгейі',
    'profile.addLanguage': 'Тіл қосу',
    'profile.languageName': 'Тіл',
    'profile.languageLevel': 'Білу деңгейі',
    'profile.basic': 'Бастапқы',
    'profile.intermediate': 'Орта',
    'profile.advanced': 'Жоғары',
    'profile.native': 'Ана тілі',
    'profile.editSkill': 'Дағдыны өңдеу',
    'profile.skillName': 'Дағды атауы',
    'profile.skillCategory': 'Санат',
    'profile.skillLevel': 'Дағды деңгейі',
    'profile.selectLevel': 'Деңгейді таңдаңыз',
    'profile.yearsOfExperience': 'Жұмыс тәжірибесі (жыл)',
    'profile.editEducation': 'Білімді өңдеу',
    'profile.description': 'Сипаттама',
    'common.add': 'Қосу',
    'profile.certificate': 'Сертификат',
    'profile.editProject': 'Жобаны өңдеу',
    'profile.editLanguage': 'Тілді өңдеу',
    'profile.stats.title': 'Статистика',
    'profile.stats.courses': 'Активные курсы',
    'profile.stats.coursesDesc': 'курсов в процессе',
    'profile.stats.certificates': 'Сертификаты',
    'profile.stats.certificatesDesc': 'получено сертификатов',
    'profile.stats.mentoring': 'Менторство',
    'profile.stats.mentoringDesc': 'сессий завершено',
    'profile.stats.opportunities': 'Возможности',
    'profile.stats.opportunitiesDesc': 'сохранено возможностей',
    'profile.achievements.title': 'Достижения',
    'profile.achievements.unlockedAt': 'Получено',
    'profile.achievements.progress': 'Прогресс',
    'profile.achievements.pioneer': 'Пионер профиля',
    'profile.achievements.pioneerDesc': 'Complete your profile information',
    'profile.achievements.skillMaster': 'Skill Master',
    'profile.achievements.skillMasterDesc': 'Add your professional skills',
    'profile.achievements.polyglot': 'Language Enthusiast',
    'profile.achievements.polyglotDesc': 'Add your language proficiencies',
    'profile.viewMore': 'Показать больше',
    'profile.share': 'Поделиться профилем',
    'profile.edit': 'Редактировать профиль'
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