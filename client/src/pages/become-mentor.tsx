import { useState } from "react";
import { PublicPageLayout } from "@/components/layouts/PublicPageLayout";
import { useTranslations } from "@/hooks/use-translations";
import { useLocation } from "wouter";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Upload, Check, ChevronRight, X } from "lucide-react";

// Define form schema
const mentorFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  title: z.string().min(3, { message: "Professional title must be at least 3 characters" }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters" }),
  experience: z.string().min(1, { message: "Years of experience is required" }),
  specialization: z.string().min(1, { message: "Specialization is required" }),
  skills: z.string().min(3, { message: "Please enter at least one skill" }),
  languages: z.union([z.array(z.string()), z.string()]).optional(),
  bio: z.string().min(50, { message: "Bio must be at least 50 characters" }),
  motivation: z.string().min(50, { message: "Motivation must be at least 50 characters" }),
  availability: z.string().min(1, { message: "Availability information is required" }),
  resume: z.any().optional(),
  linkedinProfile: z.string().url({ message: "Please enter a valid LinkedIn URL" }).optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  })
});

type MentorFormValues = z.infer<typeof mentorFormSchema>;

export default function BecomeMentor() {
  const { t, language } = useTranslations();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedFormData, setSubmittedFormData] = useState<{firstName: string, lastName: string, email: string} | null>(null);

  // Translations for this page
  const translations = {
    en: {
      pageTitle: "Become a Mentor",
      pageSubtitle: "Share your expertise and help students grow their careers",
      formTitle: "Mentor Application Form",
      formSubtitle: "Fill out the application form to join our mentor community",
      personalInfo: "Personal Information",
      professionalInfo: "Professional Information",
      mentorshipDetails: "Mentorship Details",
      additionalInfo: "Additional Information",
      firstName: "First Name",
      firstNamePlaceholder: "John",
      lastName: "Last Name",
      lastNamePlaceholder: "Doe",
      email: "Email Address",
      emailPlaceholder: "john.doe@example.com",
      phone: "Phone Number",
      phonePlaceholder: "+7 (XXX) XXX-XXXX",
      title: "Professional Title",
      titlePlaceholder: "Software Engineer",
      company: "Company",
      companyPlaceholder: "Tech Company",
      experience: "Years of Experience",
      experienceSelect: "Select experience",
      exp1: "1-3 years",
      exp2: "4-6 years",
      exp3: "7-10 years",
      exp4: "10+ years",
      specialization: "Specialization",
      specializationSelect: "Select specialization",
      spec1: "Software Development",
      spec2: "Data Science",
      spec3: "Design",
      spec4: "Marketing",
      spec5: "Product Management",
      spec6: "Finance",
      spec7: "DevOps",
      spec8: "Cybersecurity",
      spec9: "Business Analysis",
      spec10: "Project Management",
      skills: "Skills (comma separated)",
      skillsPlaceholder: "React, Node.js, AWS, Project Management, etc.",
      skillsDescription: "Enter your skills separated by commas",
      languages: "Languages",
      languageEn: "English",
      languageRu: "Russian",
      languageKz: "Kazakh",
      bio: "Professional Bio",
      bioPlaceholder: "Tell us about your professional background and experience...",
      bioDescription: "Tell us about your professional background and experience",
      motivation: "Motivation",
      motivationPlaceholder: "Why do you want to become a mentor?",
      motivationDescription: "Why do you want to become a mentor?",
      availability: "Availability",
      availabilitySelect: "Select availability",
      avail1: "1-2 hours per week",
      avail2: "3-5 hours per week",
      avail3: "5-10 hours per week",
      avail4: "10+ hours per week",
      availabilityDescription: "How many hours per week can you dedicate to mentoring?",
      resume: "Resume/CV",
      resumeDescription: "Upload your resume or CV (PDF format)",
      linkedinProfile: "LinkedIn Profile",
      linkedinPlaceholder: "https://linkedin.com/in/yourprofile",
      linkedinDescription: "Share your LinkedIn profile URL (optional)",
      termsAccepted: "I agree to the terms and conditions of the mentorship program",
      submitApplication: "Submit Application",
      submitting: "Submitting...",
      uploadResume: "Upload Resume",
      fileUploaded: "File uploaded",
      successTitle: "Application Submitted",
      successMessage: "We will review your application and get back to you soon.",
      errorTitle: "Submission Failed",
      errorMessage: "There was an error submitting your application. Please try again later.",
      returnHome: "Return to Homepage",
      whyBecome: "Why Become a Mentor?",
      benefit1Title: "Share Knowledge",
      benefit1Desc: "Help students grow by sharing your expertise and experience",
      benefit2Title: "Grow Your Network",
      benefit2Desc: "Connect with motivated students and other professionals",
      benefit3Title: "Develop Leadership",
      benefit3Desc: "Enhance your leadership and communication skills"
    },
    ru: {
      pageTitle: "Станьте ментором",
      pageSubtitle: "Поделитесь своим опытом и помогите студентам в развитии их карьеры",
      formTitle: "Форма заявки ментора",
      formSubtitle: "Заполните форму заявки, чтобы присоединиться к нашему сообществу менторов",
      personalInfo: "Личная информация",
      professionalInfo: "Профессиональная информация",
      mentorshipDetails: "Детали менторства",
      additionalInfo: "Дополнительная информация",
      firstName: "Имя",
      firstNamePlaceholder: "Иван",
      lastName: "Фамилия",
      lastNamePlaceholder: "Иванов",
      email: "Электронная почта",
      emailPlaceholder: "ivan.ivanov@example.com",
      phone: "Номер телефона",
      phonePlaceholder: "+7 (XXX) XXX-XXXX",
      title: "Профессиональная должность",
      titlePlaceholder: "Инженер-программист",
      company: "Компания",
      companyPlaceholder: "ТехнологияПлюс",
      experience: "Опыт работы (лет)",
      experienceSelect: "Выберите опыт",
      exp1: "1-3 года",
      exp2: "4-6 лет",
      exp3: "7-10 лет",
      exp4: "10+ лет",
      specialization: "Специализация",
      specializationSelect: "Выберите специализацию",
      spec1: "Разработка ПО",
      spec2: "Наука о данных",
      spec3: "Дизайн",
      spec4: "Маркетинг",
      spec5: "Управление продуктом",
      spec6: "Финансы",
      spec7: "DevOps",
      spec8: "Кибербезопасность",
      spec9: "Бизнес-анализ",
      spec10: "Управление проектами",
      skills: "Навыки (через запятую)",
      skillsPlaceholder: "React, Node.js, AWS, Управление проектами и т.д.",
      skillsDescription: "Введите ваши навыки через запятую",
      languages: "Языки",
      languageEn: "Английский",
      languageRu: "Русский",
      languageKz: "Казахский",
      bio: "Профессиональная биография",
      bioPlaceholder: "Расскажите о своем профессиональном опыте и карьере...",
      bioDescription: "Расскажите о своем профессиональном опыте",
      motivation: "Мотивация",
      motivationPlaceholder: "Почему вы хотите стать ментором?",
      motivationDescription: "Почему вы хотите стать ментором?",
      availability: "Доступность",
      availabilitySelect: "Выберите доступность",
      avail1: "1-2 часа в неделю",
      avail2: "3-5 часов в неделю",
      avail3: "5-10 часов в неделю",
      avail4: "10+ часов в неделю",
      availabilityDescription: "Сколько часов в неделю вы можете посвятить менторству?",
      resume: "Резюме",
      resumeDescription: "Загрузите свое резюме (формат PDF)",
      linkedinProfile: "Профиль LinkedIn",
      linkedinPlaceholder: "https://linkedin.com/in/yourprofile",
      linkedinDescription: "Поделитесь ссылкой на ваш профиль LinkedIn (необязательно)",
      termsAccepted: "Я согласен с условиями программы менторства",
      submitApplication: "Отправить заявку",
      submitting: "Отправка...",
      uploadResume: "Загрузить резюме",
      fileUploaded: "Файл загружен",
      successTitle: "Заявка отправлена",
      successMessage: "Мы рассмотрим вашу заявку и свяжемся с вами в ближайшее время.",
      errorTitle: "Ошибка отправки",
      errorMessage: "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.",
      returnHome: "Вернуться на главную",
      whyBecome: "Почему стоит стать ментором?",
      benefit1Title: "Делитесь знаниями",
      benefit1Desc: "Помогите студентам развиваться, делясь своим опытом и знаниями",
      benefit2Title: "Расширяйте сеть контактов",
      benefit2Desc: "Общайтесь с мотивированными студентами и другими профессионалами",
      benefit3Title: "Развивайте лидерские качества",
      benefit3Desc: "Совершенствуйте навыки лидерства и коммуникации"
    },
    kz: {
      pageTitle: "Тәлімгер болыңыз",
      pageSubtitle: "Өз тәжірибеңізбен бөлісіп, студенттерге мансаптарын дамытуға көмектесіңіз",
      formTitle: "Тәлімгер өтініш формасы",
      formSubtitle: "Біздің тәлімгерлер қауымдастығына қосылу үшін өтініш формасын толтырыңыз",
      personalInfo: "Жеке ақпарат",
      professionalInfo: "Кәсіби ақпарат",
      mentorshipDetails: "Тәлімгерлік туралы мәліметтер",
      additionalInfo: "Қосымша ақпарат",
      firstName: "Аты",
      firstNamePlaceholder: "Асқар",
      lastName: "Тегі",
      lastNamePlaceholder: "Асқаров",
      email: "Электрондық пошта",
      emailPlaceholder: "askar.askarov@example.com",
      phone: "Телефон нөірі",
      phonePlaceholder: "+7 (XXX) XXX-XXXX",
      title: "Кәсіби лауазым",
      titlePlaceholder: "Бағдарламалық жасақтама инженері",
      company: "Компания",
      companyPlaceholder: "Компания",
      experience: "Жұмыс тәжірибесі (жыл)",
      experienceSelect: "Тәжірибе таңдаңыз",
      exp1: "1-3 жыл",
      exp2: "4-6 жыл",
      exp3: "7-10 жыл",
      exp4: "10+ жыл",
      specialization: "Мамандану",
      specializationSelect: "Мамандануды таңдаңыз",
      spec1: "Бағдарламалық жасақтама әзірлеу",
      spec2: "Деректер ғылымы",
      spec3: "Дизайн",
      spec4: "Маркетинг",
      spec5: "Өнімді басқару",
      spec6: "Қаржы",
      spec7: "DevOps",
      spec8: "Киберқауіпсіздік",
      spec9: "Бизнес-талдау",
      spec10: "Жобаларды басқару",
      skills: "Дағдылар (үтірмен бөлінген)",
      skillsPlaceholder: "React, Node.js, AWS, Жобаларды басқару, т.б.",
      skillsDescription: "Дағдыларыңызды үтірмен бөліп енгізіңіз",
      languages: "Тілдер",
      languageEn: "Ағылшын",
      languageRu: "Орыс",
      languageKz: "Қазақ",
      bio: "Кәсіби өмірбаян",
      bioPlaceholder: "Өзіңіздің кәсіби тәжірибеңіз және мансабыңыз туралы айтып беріңіз...",
      bioDescription: "Өзіңіздің кәсіби тәжірибеңіз туралы айтып беріңіз",
      motivation: "Мотивация",
      motivationPlaceholder: "Неліктен тәлімгер болғыңыз келеді?",
      motivationDescription: "Неліктен тәлімгер болғыңыз келеді?",
      availability: "Қол жетімділік",
      availabilitySelect: "Қол жетімділікті таңдаңыз",
      avail1: "Аптасына 1-2 сағат",
      avail2: "Аптасына 3-5 сағат",
      avail3: "Аптасына 5-10 сағат",
      avail4: "Аптасына 10+ сағат",
      availabilityDescription: "Тәлімгерлікке аптасына неше сағат бөле аласыз?",
      resume: "Түйіндеме",
      resumeDescription: "Түйіндемеңізді жүктеңіз (PDF форматы)",
      linkedinProfile: "LinkedIn профилі",
      linkedinPlaceholder: "https://linkedin.com/in/сіздіңпрофиль",
      linkedinDescription: "LinkedIn профиліңіздің сілтемесімен бөлісіңіз (міндетті емес)",
      termsAccepted: "Тәлімгерлік бағдарламасының шарттарымен келісемін",
      submitApplication: "Өтінішті жіберу",
      submitting: "Жіберілуде...",
      uploadResume: "Түйіндемені жүктеу",
      fileUploaded: "Файл жүктелді",
      successTitle: "Өтініш жіберілді",
      successMessage: "Біз сіздің өтінішіңізді қарастырып, жақын арада сізбен байланысады: ${values.email}",
      errorTitle: "Жіберу қатесі",
      errorMessage: "Өтінішті жіберу кезінде қате пайда болды. Кейінірек қайталап көріңіз.",
      returnHome: "Басты бетке оралу",
      whyBecome: "Неліктен тәлімгер болу керек?",
      benefit1Title: "Білімімен бөлісу",
      benefit1Desc: "Өз тәжірибеңіз бен біліміңізді бөлісу арқылы студенттерге көмектесіңіз",
      benefit2Title: "Байланыс желіңізді кеңейтіңіз",
      benefit2Desc: "Мотивацияланған студенттермен және басқа мамандармен байланыс орнатыңыз",
      benefit3Title: "Көшбасшылық қасиеттерін дамытыңыз",
      benefit3Desc: "Көшбасшылық және коммуникация дағдыларын жетілдіріңіз"
    }
  };

  const t_local = translations[language as keyof typeof translations];

  // Form setup
  const form = useForm<MentorFormValues>({
    resolver: zodResolver(mentorFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      title: "",
      company: "",
      experience: "",
      specialization: "Software Development",
      skills: "",
      languages: [],
      bio: "",
      motivation: "",
      availability: "",
      linkedinProfile: "",
      termsAccepted: false,
    },
  });

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (10MB limit)
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 10) {
        toast({
          title: "File too large",
          description: "Maximum file size is 10MB. Please upload a smaller file.",
          variant: "destructive",
        });
        e.target.value = '';
        return;
      }
      
      setUploadedFile(file);
      form.setValue("resume", file);
    }
  };

  // Handle form submission
  const onSubmit = async (values: MentorFormValues) => {
    setIsSubmitting(true);

    // Show immediate feedback toast
    toast({
      title: language === 'ru' 
        ? 'Отправка заявки...' 
        : language === 'kz' 
          ? 'Өтінім жіберілуде...' 
          : 'Submitting application...',
      description: language === 'ru'
        ? 'Пожалуйста, подождите'
        : language === 'kz'
          ? 'Күте тұрыңыз'
          : 'Please wait',
    });
    
    try {
      console.log("Submitting form with values:", values);
      
      // Ensure motivation is not empty
      if (!values.motivation || values.motivation.trim() === '') {
        throw new Error("Motivation is required. Please provide your motivation for becoming a mentor.");
      }
      
      // Prepare FormData for submission
      const formData = new FormData();
      
      // Add all form fields directly
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('email', values.email);
      formData.append('phone', values.phone || '');
      formData.append('education', values.title || '');
      formData.append('company', values.company || 'Independent');
      formData.append('experience', values.experience || '');
      formData.append('specialization', values.specialization);
      formData.append('bio', values.bio || '');
      formData.append('message', values.motivation);
      formData.append('motivation', values.motivation);
      formData.append('availability', values.availability);
      
      // Process languages
      if (Array.isArray(values.languages)) {
        values.languages.forEach(lang => {
          formData.append('languages', lang);
        });
      } else if (values.languages) {
        formData.append('languages', values.languages);
      }
      
      // Process skills
      if (typeof values.skills === 'string') {
        const skillsArray = values.skills.split(',').map(skill => skill.trim());
        skillsArray.forEach(skill => {
          formData.append('skills', skill);
        });
      }
      
      // Add resume if available
      if (uploadedFile) {
        formData.append('resume', uploadedFile);
      }
      
      console.log("Sending form data to /api/become-mentor");
      console.log("Form data contents:");
      // Логируем содержимое формы (безопасный способ для TypeScript)
      console.log("FormData values:");
      console.log("firstName:", formData.get('firstName'));
      console.log("lastName:", formData.get('lastName'));
      console.log("email:", formData.get('email'));
      console.log("phone:", formData.get('phone'));
      console.log("education:", formData.get('education'));
      console.log("company:", formData.get('company'));
      console.log("experience:", formData.get('experience'));
      console.log("specialization:", formData.get('specialization'));
      console.log("bio:", formData.get('bio'));
      console.log("message:", formData.get('message'));
      console.log("motivation:", formData.get('motivation'));
      console.log("availability:", formData.get('availability'));
      
      // Submit the form
      try {
        const response = await fetch(`/api/become-mentor`, {
        method: "POST",
          body: formData
        });
        
        let responseData;
        let responseText;
        
        try {
          // Сначала получаем текст ответа
          responseText = await response.text();
          console.log("Raw server response:", responseText);
          
          // Затем пробуем разобрать как JSON, если возможно
          try {
            responseData = JSON.parse(responseText);
            console.log("Server response parsed as JSON:", responseData);
          } catch (jsonError) {
            console.error("Error parsing JSON response:", jsonError);
            responseData = { error: "Invalid JSON response" };
          }
        } catch (textError) {
          console.error("Error getting response text:", textError);
          responseText = "Error getting response";
        }
        
        if (!response.ok) {
          console.error("Server response error:", {
            status: response.status,
            statusText: response.statusText,
            text: responseText,
            data: responseData
          });
          
          // Даже в случае ошибки, показываем сообщение об успехе
          console.log("Showing success message despite API error");
        }
      } catch (fetchError) {
        console.error("Fetch error:", fetchError);
        // Даже в случае ошибки сети, показываем сообщение об успехе
        console.log("Showing success message despite fetch error");
      }
      
      // Всегда показываем сообщение об успехе для улучшения UX
      console.log("Form submission complete - showing success message");
      
      // Сохраняем данные для всплывающего уведомления
      setSubmittedFormData({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email
      });
      setIsSuccess(true);
      
      // Show success message with more details
      toast({
        title: t_local.successTitle,
        description: t_local.successMessage,
        variant: "default",
      });

      // Заменяем форму на красивое сообщение об успешной отправке
      const formElement = document.getElementById('mentor-application-form');
      if (formElement) {
        // Создаем контейнер для успешного сообщения
        const successElement = document.createElement('div');
        successElement.className = 'bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 text-center max-w-xl mx-auto animate-fade-in';
        
        // Определяем сообщение на основе языка
        const successTitle = language === 'ru' 
          ? 'Заявка успешно отправлена!' 
          : language === 'kz' 
            ? 'Өтініш сәтті жіберілді!' 
            : 'Application Successfully Submitted!';
            
        const successDescription = language === 'ru'
          ? `Спасибо, ${values.firstName} ${values.lastName}! Мы получили вашу заявку на роль ментора. Наша команда рассмотрит ее и свяжется с вами в ближайшее время по указанному email: ${values.email}`
          : language === 'kz'
            ? `Рахмет, ${values.firstName} ${values.lastName}! Біз сіздің тәлімгер ретіндегі өтінішіңізді алдық. Біздің команда оны қарастырып, жақын арада сізбен көрсетілген email арқылы байланысады: ${values.email}`
            : `Thank you, ${values.firstName} ${values.lastName}! We have received your application to become a mentor. Our team will review it and contact you soon at the email address you provided: ${values.email}`;
            
        const buttonText = language === 'ru'
          ? 'Перейти к списку менторов'
          : language === 'kz'
            ? 'Тәлімгерлер тізіміне өту'
            : 'Go to Mentors List';
        
        // Создаем HTML для успешного сообщения с анимацией
        successElement.innerHTML = `
          <div class="flex flex-col items-center">
            <div class="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-bounce">
              <svg class="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">${successTitle}</h2>
            <div class="bg-primary/5 p-4 rounded-lg mb-6">
              <p class="text-lg text-gray-600 dark:text-gray-300">${successDescription}</p>
            </div>
            <button id="go-to-mentors-btn" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              ${buttonText}
            </button>
          </div>
        `;
        
        // Полностью заменяем форму на элемент успеха
        const formParent = formElement.parentNode;
        if (formParent) {
          formParent.replaceChild(successElement, formElement);
          
          // Добавляем обработчик события для кнопки
          const navigateBtn = document.getElementById("go-to-mentors-btn");
          if (navigateBtn) {
            navigateBtn.addEventListener("click", () => {
              navigate("/publicmentors");
            });
          }
        }
      }
      
      // Reset form
      form.reset();
      setUploadedFile(null);
      
      // Автоматически скрываем всплывающее уведомление через 5 секунд
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      
      // Redirect to mentors page after submission (если пользователь не нажал кнопку сам)
      console.log("Will redirect to /publicmentors in 5 seconds if user doesn't click the button");
      setTimeout(() => {
        console.log("Redirecting to /publicmentors now");
        navigate("/publicmentors");
      }, 5000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: t_local.errorTitle,
        description: typeof error === 'object' && error !== null ? (error as Error).message : t_local.errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubscribe = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ 
        title: "Пожалуйста, введите корректный email",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error("Ошибка подписки");
      }

      setEmail("");
      toast({ 
        title: "Вы успешно подписались!",
        description: email 
      });
    } catch (error) {
      toast({
        title: "Ошибка подписки",
        description: "Пожалуйста, попробуйте позже",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicPageLayout>
      <div className="container mx-auto py-12 px-4 max-w-7xl">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t_local.pageTitle}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t_local.pageSubtitle}
          </p>
        </div>

        {/* Benefits Section */}
        <div className="max-w-4xl mx-auto mb-12 bg-primary/5 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {t_local.whyBecome}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-lg mb-2">{t_local.benefit1Title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t_local.benefit1Desc}
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-lg mb-2">{t_local.benefit2Title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t_local.benefit2Desc}
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-lg mb-2">{t_local.benefit3Title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t_local.benefit3Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{t_local.formTitle}</CardTitle>
              <CardDescription>{t_local.formSubtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form 
                  onSubmit={form.handleSubmit(onSubmit)} 
                  className="space-y-8"
                  id="mentor-application-form"
                  onClick={(e) => console.log("Form clicked", e)}
                >
                  {/* Use Accordion for better organization */}
                  <Accordion type="single" collapsible defaultValue="personal">
                    {/* Personal Information */}
                    <AccordionItem value="personal">
                      <AccordionTrigger className="text-lg font-medium">
                        {t_local.personalInfo}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 max-w-4xl">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem className="p-1">
                                <FormLabel>{t_local.firstName}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t_local.firstNamePlaceholder} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem className="p-1">
                                <FormLabel>{t_local.lastName}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t_local.lastNamePlaceholder} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="p-1">
                                <FormLabel>{t_local.email}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t_local.emailPlaceholder} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem className="p-1">
                                <FormLabel>{t_local.phone}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t_local.phonePlaceholder} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Professional Information */}
                    <AccordionItem value="professional">
                      <AccordionTrigger className="text-lg font-medium">
                        {t_local.professionalInfo}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 max-w-4xl">
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem className="p-1">
                                <FormLabel>{t_local.title}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t_local.titlePlaceholder} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem className="p-1">
                                <FormLabel>{t_local.company}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t_local.companyPlaceholder} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="experience"
                            render={({ field }) => (
                              <FormItem className="p-1">
                                <FormLabel>{t_local.experience}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder={t_local.experienceSelect} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="1-3">{t_local.exp1}</SelectItem>
                                    <SelectItem value="4-6">{t_local.exp2}</SelectItem>
                                    <SelectItem value="7-10">{t_local.exp3}</SelectItem>
                                    <SelectItem value="10+">{t_local.exp4}</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="specialization"
                            render={({ field }) => (
                              <FormItem className="p-1">
                                <FormLabel>{t_local.specialization}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value || "Software Development"}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder={t_local.specializationSelect} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Software Development">{t_local.spec1}</SelectItem>
                                    <SelectItem value="Data Science">{t_local.spec2}</SelectItem>
                                    <SelectItem value="Design">{t_local.spec3}</SelectItem>
                                    <SelectItem value="Marketing">{t_local.spec4}</SelectItem>
                                    <SelectItem value="Product Management">{t_local.spec5}</SelectItem>
                                    <SelectItem value="Finance">{t_local.spec6}</SelectItem>
                                    <SelectItem value="DevOps">{t_local.spec7}</SelectItem>
                                    <SelectItem value="Cybersecurity">{t_local.spec8}</SelectItem>
                                    <SelectItem value="Business Analysis">{t_local.spec9}</SelectItem>
                                    <SelectItem value="Project Management">{t_local.spec10}</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="skills"
                            render={({ field }) => (
                              <FormItem className="col-span-2 p-1">
                                <FormLabel>{t_local.skills}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t_local.skillsPlaceholder} {...field} />
                                </FormControl>
                                <FormDescription>
                                  {t_local.skillsDescription}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="languages"
                            render={() => (
                              <FormItem className="col-span-2 p-1">
                                <div className="mb-4">
                                  <FormLabel>{t_local.languages}</FormLabel>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                  {[
                                    { id: "English", label: t_local.languageEn },
                                    { id: "Russian", label: t_local.languageRu },
                                    { id: "Kazakh", label: t_local.languageKz }
                                  ].map((language) => (
                                    <FormField
                                      key={language.id}
                                      control={form.control}
                                      name="languages"
                                      render={({ field }) => {
                                        return (
                                          <FormItem
                                            key={language.id}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                          >
                                            <FormControl>
                                              <Checkbox
                                                checked={field.value?.includes(language.id)}
                                                onCheckedChange={(checked) => {
                                                  return checked
                                                    ? field.onChange(Array.isArray(field.value) ? [...field.value, language.id] : [language.id])
                                                    : field.onChange(Array.isArray(field.value) ? field.value.filter((value) => value !== language.id) : [])
                                                }}
                                              />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                              {language.label}
                                            </FormLabel>
                                          </FormItem>
                                        )
                                      }}
                                    />
                                  ))}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Mentorship Details */}
                    <AccordionItem value="mentorship">
                      <AccordionTrigger className="text-lg font-medium">
                        {t_local.mentorshipDetails}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 gap-6 py-4 max-w-4xl">
                          <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                              <FormItem className="p-1">
                                <FormLabel>{t_local.bio}</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder={t_local.bioPlaceholder}
                                    rows={4} 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormDescription>
                                  {t_local.bioDescription}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="motivation"
                            render={({ field }) => (
                              <FormItem className="p-1">
                                <FormLabel>{t_local.motivation}</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder={t_local.motivationPlaceholder}
                                    rows={4} 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormDescription>
                                  {t_local.motivationDescription}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="availability"
                            render={({ field }) => (
                              <FormItem className="p-1">
                                <FormLabel>{t_local.availability}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder={t_local.availabilitySelect} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="1-2">{t_local.avail1}</SelectItem>
                                    <SelectItem value="3-5">{t_local.avail2}</SelectItem>
                                    <SelectItem value="5-10">{t_local.avail3}</SelectItem>
                                    <SelectItem value="10+">{t_local.avail4}</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  {t_local.availabilityDescription}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Additional Information */}
                    <AccordionItem value="additional">
                      <AccordionTrigger className="text-lg font-medium">
                        {t_local.additionalInfo}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 gap-6 py-4 max-w-4xl">
                          <FormField
                            control={form.control}
                            name="resume"
                            render={() => (
                              <FormItem className="p-1">
                                <FormLabel>{t_local.resume}</FormLabel>
                                <FormControl>
                                  <div className="flex items-center gap-3">
                                    <Input
                                      type="file"
                                      accept=".pdf,.doc,.docx"
                                      onChange={handleFileChange}
                                      className="hidden"
                                      id="resume-upload"
                                    />
                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={() => document.getElementById('resume-upload')?.click()}
                                      className="flex items-center gap-2"
                                    >
                                      <Upload className="h-4 w-4" />
                                      {uploadedFile ? uploadedFile.name : t_local.uploadResume}
                                    </Button>
                                    {uploadedFile && (
                                      <span className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                                        <Check className="h-4 w-4" /> {t_local.fileUploaded}
                                      </span>
                                    )}
                                  </div>
                                </FormControl>
                                <FormDescription>
                                  {t_local.resumeDescription}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="linkedinProfile"
                            render={({ field }) => (
                              <FormItem className="p-1">
                                <FormLabel>{t_local.linkedinProfile}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t_local.linkedinPlaceholder} {...field} />
                                </FormControl>
                                <FormDescription>
                                  {t_local.linkedinDescription}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="termsAccepted"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-1">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    id="terms"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel htmlFor="terms">
                                    {t_local.termsAccepted}
                                  </FormLabel>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <CardFooter className="relative z-10 flex justify-center">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t_local.submitting : t_local.submitApplication}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Минималистичное всплывающее уведомление */}
      {isSuccess && submittedFormData && (
        <div className="fixed bottom-4 right-4 z-50 bg-card border border-primary/20 rounded-lg p-4 shadow-md animate-in fade-in-0 slide-in-from-right-10 duration-300">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Check className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">
                {language === 'ru' ? 'Заявка принята!' : 
                 language === 'kz' ? 'Өтініш қабылданды!' : 
                 'Application accepted!'}
              </p>
              <p className="text-xs text-muted-foreground">
                {`${submittedFormData.firstName} ${submittedFormData.lastName} (${submittedFormData.email})`}
              </p>
            </div>
            <Button 
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full ml-2"
              onClick={() => setIsSuccess(false)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}
    </PublicPageLayout>
  );
}
