import { useTranslations } from "@/hooks/use-translations";
import { PublicPageLayout } from "@/components/layouts/PublicPageLayout";
import { Link } from "wouter";
import { 
  ChevronRight, 
  Shield, 
  Info, 
  FileText, 
  Share2, 
  Lock, 
  UserCog, 
  Bell, 
  Mail
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";

export default function PublicPrivacyPolicy() {
  const { language } = useTranslations();
  const { theme } = useTheme();

  const pageContent = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: June 15, 2023",
      introduction: "This Privacy Policy describes how Portfol.IO ('we', 'our', or 'us') collects, uses, and shares your personal information when you use our website and services.",
      sections: [
        {
          title: "Information We Collect",
          content: "We collect information that you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This may include your name, email address, educational background, and any other information you choose to provide. We also automatically collect certain information about your device and how you interact with our website, including your IP address, browser type, referring/exit pages, and operating system.",
          icon: <FileText className="w-10 h-10 text-primary/80" />
        },
        {
          title: "How We Use Your Information",
          content: "We use the information we collect to provide, maintain, and improve our services, to process your requests and transactions, to communicate with you about our services, to personalize your experience, and to protect our services and users.",
          icon: <Info className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Sharing of Information",
          content: "We may share your information with third-party service providers who perform services on our behalf, such as hosting, data analysis, payment processing, and customer service. We may also share information if required by law or if we believe that such action is necessary to comply with the law or legal process, to protect our rights or property, or to protect the personal safety of our users or the public.",
          icon: <Share2 className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Data Security",
          content: "We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.",
          icon: <Lock className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Your Rights",
          content: "Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your personal information, or to object to or restrict certain processing of your personal information.",
          icon: <UserCog className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Changes to This Privacy Policy",
          content: "We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email or by posting a notice on our website prior to the change becoming effective.",
          icon: <Bell className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Contact Us",
          content: "If you have any questions about this Privacy Policy, please contact us at privacy@portfol.io.",
          icon: <Mail className="w-10 h-10 text-primary/80" />
        }
      ]
    },
    ru: {
      title: "Политика конфиденциальности",
      lastUpdated: "Последнее обновление: 15 июня 2023 г.",
      introduction: "Эта Политика конфиденциальности описывает, как Portfol.IO ('мы', 'наш' или 'нас') собирает, использует и делится вашей личной информацией при использовании нашего сайта и услуг.",
      sections: [
        {
          title: "Информация, которую мы собираем",
          content: "Мы собираем информацию, которую вы предоставляете нам напрямую, например, при создании учетной записи, заполнении формы или общении с нами. Это может включать ваше имя, адрес электронной почты, образовательный опыт и любую другую информацию, которую вы решите предоставить. Мы также автоматически собираем определенную информацию о вашем устройстве и о том, как вы взаимодействуете с нашим сайтом, включая ваш IP-адрес, тип браузера, страницы перехода/выхода и операционную систему.",
          icon: <FileText className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Как мы используем вашу информацию",
          content: "Мы используем собранную информацию для предоставления, поддержки и улучшения наших услуг, для обработки ваших запросов и транзакций, для общения с вами о наших услугах, для персонализации вашего опыта и для защиты наших услуг и пользователей.",
          icon: <Info className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Обмен информацией",
          content: "Мы можем делиться вашей информацией с сторонними поставщиками услуг, которые выполняют услуги от нашего имени, такие как хостинг, анализ данных, обработка платежей и обслуживание клиентов. Мы также можем делиться информацией, если это требуется по закону или если мы считаем, что такое действие необходимо для соблюдения закона или юридического процесса, для защиты наших прав или собственности, или для защиты личной безопасности наших пользователей или общественности.",
          icon: <Share2 className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Безопасность данных",
          content: "Мы принимаем разумные меры для защиты вашей личной информации от потери, кражи, неправильного использования, несанкционированного доступа, раскрытия, изменения и уничтожения.",
          icon: <Lock className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Ваши права",
          content: "В зависимости от вашего местоположения, у вас могут быть определенные права в отношении вашей личной информации, такие как право доступа, исправления или удаления вашей личной информации, или право возражать против или ограничивать определенную обработку вашей личной информации.",
          icon: <UserCog className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Изменения в этой Политике конфиденциальности",
          content: "Мы можем время от времени обновлять эту Политику конфиденциальности. Если мы внесем существенные изменения, мы уведомим вас по электронной почте или путем размещения уведомления на нашем сайте до того, как изменение вступит в силу.",
          icon: <Bell className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Свяжитесь с нами",
          content: "Если у вас есть какие-либо вопросы об этой Политике конфиденциальности, пожалуйста, свяжитесь с нами по адресу privacy@portfol.io.",
          icon: <Mail className="w-10 h-10 text-primary/80" />
        }
      ]
    },
    kz: {
      title: "Құпиялылық саясаты",
      lastUpdated: "Соңғы жаңарту: 15 маусым 2023 ж.",
      introduction: "Бұл Құпиялылық саясаты Portfol.IO ('біз', 'біздің' немесе 'бізді') біздің веб-сайтымыз бен қызметтерімізді пайдаланған кезде жеке ақпаратыңызды қалай жинайтынын, пайдаланатынын және бөлісетінін сипаттайды.",
      sections: [
        {
          title: "Біз жинайтын ақпарат",
          content: "Біз тікелей бізге берген ақпаратты жинаймыз, мысалы, тіркелгі жасағанда, нысанды толтырғанда немесе бізбен байланысқанда. Бұл сіздің атыңызды, электрондық пошта мекенжайыңызды, білім деңгейіңізді және сіз беруді таңдаған кез келген басқа ақпаратты қамтуы мүмкін. Біз сонымен қатар сіздің құрылғыңыз туралы және сіздің біздің веб-сайтпен қалай өзара әрекеттесетініңіз туралы белгілі бір ақпаратты автоматты түрде жинаймыз, оның ішінде сіздің IP мекенжайыңыз, браузер түрі, бағыттаушы/шығу беттері және операциялық жүйе.",
          icon: <FileText className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Біз сіздің ақпаратыңызды қалай пайдаланамыз",
          content: "Біз жинаған ақпаратты біздің қызметтерімізді ұсыну, қолдау және жақсарту, сіздің сұраныстарыңыз бен транзакцияларыңызды өңдеу, біздің қызметтеріміз туралы сізбен байланысу, сіздің тәжірибеңізді дербестендіру және біздің қызметтеріміз бен пайдаланушыларымызды қорғау үшін пайдаланамыз.",
          icon: <Info className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Ақпаратпен бөлісу",
          content: "Біз сіздің ақпаратыңызды біздің атымыздан қызмет көрсететін үшінші тарап қызмет провайдерлерімен бөлісе аламыз, мысалы, хостинг, деректерді талдау, төлемдерді өңдеу және тұтынушыларға қызмет көрсету. Біз сондай-ақ заң бойынша талап етілсе немесе егер біз мұндай әрекет заңды немесе заңды процесті сақтау, біздің құқықтарымызды немесе меншігімізді қорғау немесе біздің пайдаланушыларымыздың немесе жұртшылықтың жеке қауіпсіздігін қорғау үшін қажет деп санасақ, ақпаратпен бөлісе аламыз.",
          icon: <Share2 className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Деректер қауіпсіздігі",
          content: "Біз сіздің жеке ақпаратыңызды жоғалтудан, ұрлаудан, дұрыс пайдаланбаудан, рұқсатсыз қол жеткізуден, ашудан, өзгертуден және жоюдан қорғауға көмектесу үшін ақылға қонымды шаралар қабылдаймыз.",
          icon: <Lock className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Сіздің құқықтарыңыз",
          content: "Сіздің орналасқан жеріңізге байланысты, сіздің жеке ақпаратыңызға қатысты белгілі бір құқықтарыңыз болуы мүмкін, мысалы, жеке ақпаратыңызға қол жеткізу, түзету немесе жою құқығы, немесе жеке ақпаратыңызды белгілі бір өңдеуге қарсы болу немесе шектеу құқығы.",
          icon: <UserCog className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Бұл Құпиялылық саясатындағы өзгерістер",
          content: "Біз бұл Құпиялылық саясатын уақыт өте келе жаңартуымыз мүмкін. Егер біз маңызды өзгерістер енгізсек, біз сізге өзгеріс күшіне енгенге дейін электрондық пошта арқылы немесе біздің веб-сайтымызда хабарландыру жариялау арқылы хабарлаймыз.",
          icon: <Bell className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Бізбен байланысыңыз",
          content: "Егер сізде бұл Құпиялылық саясаты туралы қандай да бір сұрақтарыңыз болса, бізбен privacy@portfol.io мекенжайы бойынша байланысыңыз.",
          icon: <Mail className="w-10 h-10 text-primary/80" />
        }
      ]
    }
  };

  const content = pageContent[language as keyof typeof pageContent] || pageContent.en;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <PublicPageLayout>
      {/* Hero Section */}
      <div className={`relative overflow-hidden min-h-screen flex items-center ${theme === 'dark' ? 'bg-gradient-to-b from-primary/15 to-background' : 'bg-gradient-to-b from-primary/5 to-background'}`}>
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-16 max-w-7xl relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-foreground/60 mb-8">
            <Link href="/" className="hover:text-primary transition-colors">
              {language === 'en' ? 'Home' : language === 'ru' ? 'Главная' : 'Басты бет'}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-foreground/80">{content.title}</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 pb-2"
              >
                {content.title}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-foreground/60 mb-4"
              >
                {content.lastUpdated}
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-foreground/80"
              >
                {content.introduction}
              </motion.p>
            </div>
            
            <div className="md:w-1/3 flex justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
                <Shield className="w-44 h-44 text-primary/80" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Policy Content */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 w-full"
        >
          {content.sections.map((section, index) => (
            <motion.div key={index} variants={itemVariants} className="w-full">
              <Card className="overflow-hidden border-border/30 hover:shadow-md transition-all duration-300 w-full">
                <CardHeader className="bg-primary/5 pb-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-card rounded-md p-2 shadow-sm">
                      {section.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-semibold text-primary/90 pb-1">
                        {section.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-foreground/80 leading-relaxed">{section.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Footer Space */}
        <div className="h-16"></div>
      </div>
    </PublicPageLayout>
  );
} 