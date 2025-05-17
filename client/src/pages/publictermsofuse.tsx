import { useTranslations } from "@/hooks/use-translations";
import { PublicPageLayout } from "@/components/layouts/PublicPageLayout";
import { Link } from "wouter";
import { 
  ChevronRight, 
  Scale, 
  CheckCircle2, 
  User, 
  Landmark,
  FileText, 
  XCircle, 
  ShieldAlert, 
  RefreshCcw, 
  Mail
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/contexts/ThemeContext";

export default function PublicTermsOfUse() {
  const { language } = useTranslations();
  const { theme } = useTheme();

  const pageContent = {
    en: {
      title: "Terms of Use",
      lastUpdated: "Last Updated: June 15, 2023",
      introduction: "Welcome to Portfol.IO. These Terms of Use govern your use of the Portfol.IO website and services. By accessing or using our website and services, you agree to be bound by these Terms of Use.",
      sections: [
        {
          title: "Acceptance of Terms",
          content: "By accessing or using Portfol.IO, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.",
          icon: <CheckCircle2 className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Use of Services",
          content: "You may use our services only for lawful purposes and in accordance with these Terms of Use. You agree not to use our services in any way that violates any applicable local, state, national, or international law or regulation, or to engage in any activity that is harmful, fraudulent, deceptive, threatening, harassing, defamatory, obscene, or otherwise objectionable.",
          icon: <FileText className="w-10 h-10 text-primary/80" />
        },
        {
          title: "User Accounts",
          content: "When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password that you use to access our services and for any activities or actions under your password. You agree not to disclose your password to any third party.",
          icon: <User className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Intellectual Property",
          content: "The Portfol.IO website and its original content, features, and functionality are owned by Portfol.IO and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.",
          icon: <Landmark className="w-10 h-10 text-primary/80" />
        },
        {
          title: "User Content",
          content: "You retain ownership of any content that you submit, post, or display on or through our services. By submitting, posting, or displaying content on or through our services, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such content.",
          icon: <FileText className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Termination",
          content: "We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Use. Upon termination, your right to use our services will immediately cease.",
          icon: <XCircle className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Limitation of Liability",
          content: "In no event shall Portfol.IO, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.",
          icon: <ShieldAlert className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Changes to Terms",
          content: "We reserve the right, at our sole discretion, to modify or replace these Terms of Use at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.",
          icon: <RefreshCcw className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Contact Us",
          content: "If you have any questions about these Terms of Use, please contact us at terms@portfol.io.",
          icon: <Mail className="w-10 h-10 text-primary/80" />
        }
      ]
    },
    ru: {
      title: "Условия использования",
      lastUpdated: "Последнее обновление: 15 июня 2023 г.",
      introduction: "Добро пожаловать на Portfol.IO. Эти Условия использования регулируют ваше использование веб-сайта и услуг Portfol.IO. Получая доступ к нашему веб-сайту и услугам или используя их, вы соглашаетесь соблюдать эти Условия использования.",
      sections: [
        {
          title: "Принятие условий",
          content: "Получая доступ к Portfol.IO или используя его, вы соглашаетесь соблюдать эти Условия использования и все применимые законы и правила. Если вы не согласны с любым из этих условий, вам запрещено использовать или получать доступ к этому сайту.",
          icon: <CheckCircle2 className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Использование услуг",
          content: "Вы можете использовать наши услуги только в законных целях и в соответствии с настоящими Условиями использования. Вы соглашаетесь не использовать наши услуги каким-либо образом, который нарушает любой применимый местный, государственный, национальный или международный закон или постановление, или участвовать в любой деятельности, которая является вредной, мошеннической, обманчивой, угрожающей, оскорбительной, клеветнической, непристойной или иным образом неприемлемой.",
          icon: <FileText className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Учетные записи пользователей",
          content: "Когда вы создаете учетную запись у нас, вы должны предоставить точную, полную и актуальную информацию. Вы несете ответственность за защиту пароля, который вы используете для доступа к нашим услугам, и за любые действия, совершаемые под вашим паролем. Вы соглашаетесь не раскрывать свой пароль третьим лицам.",
          icon: <User className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Интеллектуальная собственность",
          content: "Веб-сайт Portfol.IO и его оригинальный контент, функции и функциональность принадлежат Portfol.IO и защищены международными законами об авторском праве, товарных знаках, патентах, коммерческой тайне и других правах интеллектуальной собственности или проприетарных правах.",
          icon: <Landmark className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Пользовательский контент",
          content: "Вы сохраняете право собственности на любой контент, который вы отправляете, публикуете или отображаете на наших услугах или через них. Отправляя, публикуя или отображая контент на наших услугах или через них, вы предоставляете нам всемирную, неисключительную, безвозмездную лицензию на использование, копирование, воспроизведение, обработку, адаптацию, изменение, публикацию, передачу, отображение и распространение такого контента.",
          icon: <FileText className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Прекращение",
          content: "Мы можем немедленно прекратить или приостановить действие вашей учетной записи без предварительного уведомления или ответственности по любой причине, включая, без ограничений, если вы нарушите настоящие Условия использования. После прекращения ваше право на использование наших услуг немедленно прекращается.",
          icon: <XCircle className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Ограничение ответственности",
          content: "Ни при каких обстоятельствах Portfol.IO, его директора, сотрудники, партнеры, агенты, поставщики или аффилированные лица не несут ответственности за какие-либо косвенные, случайные, особые, косвенные или штрафные убытки, включая, без ограничений, потерю прибыли, данных, использования, гудвила или других нематериальных потерь, возникающих в результате вашего доступа к услугам или их использования или невозможности доступа к ним или их использования.",
          icon: <ShieldAlert className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Изменения в условиях",
          content: "Мы оставляем за собой право по своему усмотрению изменять или заменять эти Условия использования в любое время. Если изменение является существенным, мы постараемся уведомить об этом не менее чем за 30 дней до вступления в силу любых новых условий. Что представляет собой существенное изменение, будет определяться по нашему усмотрению.",
          icon: <RefreshCcw className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Свяжитесь с нами",
          content: "Если у вас есть какие-либо вопросы об этих Условиях использования, пожалуйста, свяжитесь с нами по адресу terms@portfol.io.",
          icon: <Mail className="w-10 h-10 text-primary/80" />
        }
      ]
    },
    kz: {
      title: "Қолдану шарттары",
      lastUpdated: "Соңғы жаңарту: 15 маусым 2023 ж.",
      introduction: "Portfol.IO-ға қош келдіңіз. Бұл Қолдану шарттары сіздің Portfol.IO веб-сайты мен қызметтерін пайдалануыңызды реттейді. Біздің веб-сайт пен қызметтерге кіру немесе пайдалану арқылы сіз осы Пайдалану шарттарын сақтауға келісесіз.",
      sections: [
        {
          title: "Шарттарды қабылдау",
          content: "Portfol.IO-ға кіру немесе пайдалану арқылы сіз осы Пайдалану шарттарын және барлық қолданылатын заңдар мен ережелерді сақтауға келісесіз. Егер сіз осы шарттардың кез келгенімен келіспесеңіз, сізге бұл сайтты пайдалануға немесе кіруге тыйым салынады.",
          icon: <CheckCircle2 className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Қызметтерді пайдалану",
          content: "Сіз біздің қызметтерімізді тек заңды мақсаттарда және осы Пайдалану шарттарына сәйкес пайдалана аласыз. Сіз біздің қызметтерімізді кез келген қолданылатын жергілікті, мемлекеттік, ұлттық немесе халықаралық заңды немесе ережені бұзатын кез келген жолмен пайдаланбауға немесе зиянды, алаяқтық, алдамшы, қорқытатын, қорлайтын, жала жабатын, әдепсіз немесе басқаша қолайсыз болып табылатын кез келген әрекетке қатыспауға келісесіз.",
          icon: <FileText className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Пайдаланушы тіркелгілері",
          content: "Бізде тіркелгі жасаған кезде, сіз дәл, толық және ағымдағы ақпаратты беруіңіз керек. Сіз біздің қызметтерімізге кіру үшін пайдаланатын құпия сөзді және құпия сөзіңіз бойынша кез келген әрекеттерді немесе іс-әрекеттерді қорғауға жауаптысыз. Сіз құпия сөзіңізді үшінші тарапқа ашпауға келісесіз.",
          icon: <User className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Зияткерлік меншік",
          content: "Portfol.IO веб-сайты және оның бастапқы мазмұны, мүмкіндіктері мен функционалдығы Portfol.IO-ға тиесілі және халықаралық авторлық құқық, сауда белгісі, патент, коммерциялық құпия және басқа зияткерлік меншік немесе меншік құқықтары туралы заңдармен қорғалған.",
          icon: <Landmark className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Пайдаланушы мазмұны",
          content: "Сіз біздің қызметтерімізге немесе олар арқылы жіберген, жариялаған немесе көрсететін кез келген мазмұнға меншік құқығын сақтайсыз. Біздің қызметтерімізге немесе олар арқылы мазмұнды жіберу, жариялау немесе көрсету арқылы сіз бізге осындай мазмұнды пайдалану, көшіру, көбейту, өңдеу, бейімдеу, өзгерту, жариялау, тарату, көрсету және тарату үшін дүниежүзілік, ерекше емес, роялтисіз лицензия беріңіз.",
          icon: <FileText className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Тоқтату",
          content: "Біз сіздің тіркелгіңізді дереу, алдын ала ескертусіз немесе жауапкершіліксіз, кез келген себеппен, соның ішінде шектеусіз, егер сіз осы Пайдалану шарттарын бұзсаңыз, тоқтатуға немесе тоқтата тұруға құқылымыз. Тоқтатылғаннан кейін біздің қызметтерімізді пайдалану құқығыңыз дереу тоқтатылады.",
          icon: <XCircle className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Жауапкершілікті шектеу",
          content: "Ешқандай жағдайда Portfol.IO, оның директорлары, қызметкерлері, серіктестері, агенттері, жеткізушілері немесе аффилиирленген тұлғалары жанама, кездейсоқ, арнайы, салдарлы немесе жазалау залалы үшін, соның ішінде шектеусіз, пайдадан, деректерден, пайдаланудан, гудвилден немесе басқа материалдық емес шығындардан, қызметтерге қол жеткізуіңізден немесе пайдалануыңыздан немесе қол жеткізе алмауыңыздан немесе пайдалана алмауыңыздан туындаған жауапты болмайды.",
          icon: <ShieldAlert className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Шарттардағы өзгерістер",
          content: "Біз осы Пайдалану шарттарын кез келген уақытта өз қалауымыз бойынша өзгерту немесе ауыстыру құқығын өзімізге қалдырамыз. Егер өзгеріс маңызды болса, біз кез келген жаңа шарттар күшіне енгенге дейін кем дегенде 30 күн бұрын хабарлауға тырысамыз. Маңызды өзгеріс нені құрайтыны біздің жеке қалауымыз бойынша анықталады.",
          icon: <RefreshCcw className="w-10 h-10 text-primary/80" />
        },
        {
          title: "Бізбен байланысыңыз",
          content: "Егер сізде осы Пайдалану шарттары туралы қандай да бір сұрақтарыңыз болса, бізбен terms@portfol.io мекенжайы бойынша байланысыңыз.",
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
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-20 left-20 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
        
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
                <Scale className="w-44 h-44 text-primary/80" />
              </motion.div>
            </div>
          </div>
          
          {/* Legal Notice Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 bg-card/50 backdrop-blur-sm border border-border/20 rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-primary/10 text-primary border-none px-3 py-1">
                {language === 'en' ? 'Important' : 
                 language === 'ru' ? 'Важно' : 
                 'Маңызды'}
              </Badge>
              <p className="text-sm text-foreground/80">
                {language === 'en' ? 'Please read these terms carefully before using our platform.' : 
                 language === 'ru' ? 'Пожалуйста, внимательно прочитайте эти условия перед использованием нашей платформы.' : 
                 'Платформамызды пайдаланбас бұрын осы шарттарды мұқият оқып шығыңыз.'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Terms Content */}
      <div className="container px-4 py-16 ml-0">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 max-w-5xl"
        >
          {content.sections.map((section, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden border-border/30 hover:shadow-md transition-all duration-300">
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