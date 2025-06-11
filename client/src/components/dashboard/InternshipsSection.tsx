import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Building2, Globe, Clock, Calendar, Users, ArrowRight } from 'lucide-react';

interface Internship {
  id: number;
  title: string;
  company: string;
  description: string;
  category: string;
  companyLogo: string;
  location: string;
  locationType: string;
  duration: string;
  deadline: string;
  skills: string[];
  isPaid: boolean;
  applicantsCount: number;
  isRecommended?: boolean;
}

export default function InternshipsSection() {
  const [, setLocation] = useLocation();
  const [viewMode, setViewMode] = useState<'portfolioio' | 'headhunter'>('portfolioio');
  const [language, setLanguage] = useState<'ru' | 'kz' | 'en'>('ru');

  const formatShortDate = (date: string, lang: string) => {
    const dateObj = new Date(date);
    
    const monthsShortKz = [
      'қаң.', 'ақп.', 'нау.', 'сәу.', 'мам.', 'мау.',
      'шіл.', 'там.', 'қыр.', 'қаз.', 'қар.', 'жел.'
    ];
    
    const monthsShortRu = [
      'янв.', 'фев.', 'мар.', 'апр.', 'мая', 'июн.',
      'июл.', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'
    ];

    const day = dateObj.getDate();
    const month = dateObj.getMonth();

    switch (lang) {
      case 'kz':
        return `${day} ${monthsShortKz[month]}`;
      case 'ru':
        return `${day} ${monthsShortRu[month]}`;
      default:
        return dateObj.toLocaleDateString('en-US', { 
          day: 'numeric',
          month: 'short'
        });
    }
  };

  // Mock data for demonstration
  const internships: Internship[] = [
    {
      id: 1,
      title: 'UX зерттеулері бойынша тәлімгер',
      company: 'User Experience Lab',
      description: 'Өнім тәжірибесі мен интерфейс дизайнын жақсарту үшін пайдаланушыларды зерттеу және пайдалану ыңғайлылығын тестілеу жүргізіңіз.',
      category: 'Дизайн',
      companyLogo: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      location: 'Гибридті',
      locationType: 'hybrid',
      duration: '4 ай',
      deadline: '15 февр.',
      skills: ['Пайдаланушыларды зерттеу', 'Ыңғайлылықты тестілеу', 'Figma'],
      isPaid: true,
      applicantsCount: 47
    },
    {
      id: 2,
      title: 'Блокчейн әзірлеу бойынша тәлімгер',
      company: 'Crypto Innovations',
      description: 'Таратылған технологиялар туралы білім ала отырып, блокчейн жобалары мен смарт-шарттармен жұмыс істеңіз.',
      category: 'Технологиялар',
      companyLogo: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      location: 'Қашықтан',
      locationType: 'remote',
      duration: '6 ай',
      deadline: '10 февр.',
      skills: ['Solidity', 'Web3.js', 'Ethereum'],
      isPaid: true,
      applicantsCount: 55,
      isRecommended: true
    },
    {
      id: 3,
      title: 'Маркетинг зерттеулері бойынша тәлімгер',
      company: 'Digital Marketing Pro',
      description: 'Нарықты талдау және маркетингтік стратегияларды әзірлеу бойынша тәжірибе алыңыз.',
      category: 'Маркетинг',
      companyLogo: 'https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      location: 'Офис',
      locationType: 'office',
      duration: '3 ай',
      deadline: '20 февр.',
      skills: ['Нарықты талдау', 'Google Analytics', 'Social Media'],
      isPaid: true,
      applicantsCount: 32
    },
    {
      id: 4,
      title: 'Data Science тәлімгері',
      company: 'AI Solutions',
      description: 'Машиналық оқыту модельдерін құру және деректерді талдау бойынша тәжірибе жинаңыз.',
      category: 'Технологиялар',
      companyLogo: 'https://images.unsplash.com/photo-1489389944381-3471b5b30f04?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      location: 'Қашықтан',
      locationType: 'remote',
      duration: '6 ай',
      deadline: '25 февр.',
      skills: ['Python', 'Machine Learning', 'SQL'],
      isPaid: true,
      applicantsCount: 78,
      isRecommended: true
    }
  ];

  const handleInternshipClick = (internshipId: number) => {
    setLocation(`/opportunities/${internshipId}`);
  };

  const handleViewModeChange = (mode: 'portfolioio' | 'headhunter') => {
    setViewMode(mode);
    if (mode === 'headhunter') {
      window.open('https://hh.kz/search/vacancy?area=160&search_field=name&search_field=company_name&search_field=description&text=стажировка', '_blank');
    }
  };

  return (
    <div>
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm bg-muted p-1">
          <Button 
            className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${
              viewMode === 'portfolioio' ? 'bg-background text-primary shadow-sm' : 'text-foreground/70 hover:text-foreground'
            }`}
            onClick={() => handleViewModeChange('portfolioio')}
          >
            <Building2 className="w-4 h-4" />
            Portfol.IO тағылымдамалары
          </Button>
          <Button 
            variant="ghost" 
            className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${
              viewMode === 'headhunter' ? 'bg-background text-primary shadow-sm' : 'text-foreground/70 hover:text-foreground'
            }`}
            onClick={() => handleViewModeChange('headhunter')}
          >
            <Globe className="w-4 h-4" />
            HeadHunter вакансиялары
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.map((internship) => (
          <div 
            key={internship.id} 
            className="bg-white dark:bg-white border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md group hover:shadow-lg flex flex-col h-[550px] cursor-pointer"
            onClick={() => handleInternshipClick(internship.id)}
          >
            <div className="h-64 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
              <img src={internship.companyLogo} alt={internship.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 absolute top-4 left-4 z-20 bg-primary text-white border-none">
                {internship.category}
              </div>
              <div className="absolute bottom-4 left-4 z-20 text-white text-sm font-medium">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-black/70 text-white border-white/30">
                  {internship.company}
                </div>
              </div>
              {internship.isRecommended && (
                <div className="absolute top-4 right-4 z-20">
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-yellow-500 text-white border-none">
                    Ұсынылған
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="h-14 mb-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-2">
                  {internship.title}
                </h3>
              </div>
              <div className="h-14 mb-3">
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  {internship.description}
                </p>
              </div>
              <div className="h-8 mb-5 flex flex-wrap gap-2">
                {internship.skills.map((skill, index) => (
                  <div key={index} className="inline-flex items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 text-xs font-normal bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-none">
                    {skill}
                  </div>
                ))}
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-xs border-blue-400 dark:border-blue-500 text-blue-600 dark:text-blue-400">
                  +1
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-6 text-center text-xs text-gray-600 dark:text-gray-400 h-16">
                <div className="flex flex-col items-center justify-center">
                  <Clock className="w-4 h-4 mb-1 text-blue-600 dark:text-blue-400" />
                  <span>{internship.duration}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Building2 className="w-4 h-4 mb-1 text-blue-600 dark:text-blue-400" />
                  <span>{internship.location}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {language === 'ru' ? 'Срок подачи до: ' :
                     language === 'kz' ? 'Өтінім мерзімі: ' :
                     'Application deadline: '}
                    {formatShortDate(internship.deadline, language)}
                  </span>
                </div>
              </div>
              <div className="mt-auto">
                <div className="flex items-center justify-between mb-4 h-6">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{internship.applicantsCount} өтінімдер</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-xs border-green-400 dark:border-green-500 text-green-600 dark:text-green-400">
                      {internship.isPaid ? 'Ақылы' : 'Ақысыз'}
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLocation(`/opportunities/${internship.id}/apply`);
                  }}
                >
                  {language === 'ru' ? 'Подать заявку' :
                   language === 'kz' ? 'Өтінім беру' :
                   'Apply Now'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 