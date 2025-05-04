import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { useLocation } from "wouter";
import { Search, Filter, Briefcase, MapPin, Clock, Calendar, ArrowRight, ExternalLink, BookmarkPlus, Building } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dummy internship opportunities data for presentation purposes
const dummyOpportunities = [
  {
    id: 1,
    title: "Software Development Intern",
    company: "TechCorp",
    logoUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    description: "Exciting opportunity to work with our development team on real-world projects. You'll gain hands-on experience with full-stack development, CI/CD pipelines, and Agile methodologies.",
    location: "Almaty, Kazakhstan",
    type: "internship",
    category: "Software Development",
    duration: "3 months",
    deadline: "2023-08-15",
    featured: true
  },
  {
    id: 2,
    title: "Marketing Assistant",
    company: "Growth Partners",
    logoUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    description: "Join our dynamic marketing team to assist with social media campaigns, content creation, and market research. Perfect opportunity for marketing students looking to apply their knowledge.",
    location: "Remote",
    type: "internship",
    category: "Marketing",
    duration: "6 months",
    deadline: "2023-07-30",
    featured: false
  },
  {
    id: 3,
    title: "UX/UI Design Intern",
    company: "Design Studio",
    logoUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    description: "Work with our creative team on designing user-centered interfaces for web and mobile applications. You'll gain experience with the entire design process, from research to prototyping.",
    location: "Nur-Sultan, Kazakhstan",
    type: "internship",
    category: "Design",
    duration: "4 months",
    deadline: "2023-08-05",
    featured: true
  },
  {
    id: 4,
    title: "Data Science Competition",
    company: "DataTech",
    logoUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    description: "Participate in our annual data science competition to solve real-world problems using machine learning and data analysis. Cash prizes for top performers and potential job offers!",
    location: "Online",
    type: "competition",
    category: "Data Science",
    duration: "2 weeks",
    deadline: "2023-09-01",
    featured: true
  },
  {
    id: 5,
    title: "Environmental Conservation Volunteer",
    company: "Green Earth",
    logoUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    description: "Join our team of volunteers working on local conservation projects. Gain hands-on experience in environmental sustainability while making a positive impact on the community.",
    location: "Shymkent, Kazakhstan",
    type: "volunteer",
    category: "Environmental",
    duration: "Flexible",
    deadline: null,
    featured: false
  },
  {
    id: 6,
    title: "Business Analyst Intern",
    company: "Finance Group",
    logoUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    description: "Work with our finance team to analyze business operations, create reports, and suggest process improvements. Excellent opportunity for business or finance students.",
    location: "Almaty, Kazakhstan",
    type: "internship",
    category: "Finance",
    duration: "6 months",
    deadline: "2023-07-25",
    featured: false
  }
];

export default function PublicInternships() {
  const { t } = useTranslations();
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Filter opportunities based on search query, type, and category
  const filteredOpportunities = dummyOpportunities.filter(opportunity => {
    const matchesSearch = searchQuery === "" || 
      opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === "all" || opportunity.type === typeFilter;
    const matchesCategory = categoryFilter === "all" || opportunity.category === categoryFilter;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  // Extract unique types and categories for filters
  const types = ["all", ...Array.from(new Set(dummyOpportunities.map(opp => opp.type)))];
  const categories = ["all", ...Array.from(new Set(dummyOpportunities.map(opp => opp.category)))];
  
  // Format date from ISO string
  const formatDate = (dateString: string | null): string | null => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {t('opportunities.title')}
            </h1>
            <p className="text-xl text-foreground/80 mb-10 leading-relaxed">
              {t('opportunities.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/register')}
              >
                {t('opportunities.getStarted')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  const opportunitiesSection = document.getElementById('opportunities-section');
                  if (opportunitiesSection) {
                    opportunitiesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t('opportunities.exploreOpportunities')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Opportunities Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">{t('opportunities.types.title')}</h2>
            <p className="text-lg text-foreground/80">
              {t('opportunities.types.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Internships */}
            <div className="bg-background rounded-xl shadow-sm p-8 border border-border">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t('opportunities.types.internships.title')}</h3>
              <p className="text-foreground/80 mb-4">
                {t('opportunities.types.internships.description')}
              </p>
              <ul className="text-sm space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="text-primary mr-2">•</div>
                  <div>{t('opportunities.types.internships.benefit1')}</div>
                </li>
                <li className="flex items-start">
                  <div className="text-primary mr-2">•</div>
                  <div>{t('opportunities.types.internships.benefit2')}</div>
                </li>
                <li className="flex items-start">
                  <div className="text-primary mr-2">•</div>
                  <div>{t('opportunities.types.internships.benefit3')}</div>
                </li>
              </ul>
            </div>
            
            {/* Competitions */}
            <div className="bg-background rounded-xl shadow-sm p-8 border border-border">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg flex items-center justify-center mb-6">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t('opportunities.types.competitions.title')}</h3>
              <p className="text-foreground/80 mb-4">
                {t('opportunities.types.competitions.description')}
              </p>
              <ul className="text-sm space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="text-primary mr-2">•</div>
                  <div>{t('opportunities.types.competitions.benefit1')}</div>
                </li>
                <li className="flex items-start">
                  <div className="text-primary mr-2">•</div>
                  <div>{t('opportunities.types.competitions.benefit2')}</div>
                </li>
                <li className="flex items-start">
                  <div className="text-primary mr-2">•</div>
                  <div>{t('opportunities.types.competitions.benefit3')}</div>
                </li>
              </ul>
            </div>
            
            {/* Volunteer */}
            <div className="bg-background rounded-xl shadow-sm p-8 border border-border">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg flex items-center justify-center mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t('opportunities.types.volunteer.title')}</h3>
              <p className="text-foreground/80 mb-4">
                {t('opportunities.types.volunteer.description')}
              </p>
              <ul className="text-sm space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="text-primary mr-2">•</div>
                  <div>{t('opportunities.types.volunteer.benefit1')}</div>
                </li>
                <li className="flex items-start">
                  <div className="text-primary mr-2">•</div>
                  <div>{t('opportunities.types.volunteer.benefit2')}</div>
                </li>
                <li className="flex items-start">
                  <div className="text-primary mr-2">•</div>
                  <div>{t('opportunities.types.volunteer.benefit3')}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section id="opportunities-section" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold mb-6">{t('opportunities.exploreTitle')}</h2>
            <p className="text-lg text-foreground/80">
              {t('opportunities.exploreDescription')}
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={18} />
                  <Input
                    placeholder={t('opportunities.searchPlaceholder')}
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={18} />
                  <select
                    className="w-full h-10 pl-10 pr-4 py-2 appearance-none bg-background border border-input rounded-md text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type === "all" ? t('opportunities.allTypes') : 
                          type === "internship" ? t('opportunities.typeInternship') :
                          type === "competition" ? t('opportunities.typeCompetition') :
                          t('opportunities.typeVolunteer')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={18} />
                  <select
                    className="w-full h-10 pl-10 pr-4 py-2 appearance-none bg-background border border-input rounded-md text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? t('opportunities.allCategories') : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">{t('opportunities.allOpportunities')}</TabsTrigger>
                <TabsTrigger value="featured">{t('opportunities.featuredOpportunities')}</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredOpportunities.length > 0 ? (
                  filteredOpportunities.map((opportunity) => (
                    <OpportunityCard 
                      key={opportunity.id} 
                      opportunity={opportunity} 
                      formatDate={formatDate}
                      onApplyClick={() => navigate('/register')}
                    />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-16">
                    <p className="text-foreground/60">{t('opportunities.noOpportunitiesFound')}</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="featured">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredOpportunities.filter(opp => opp.featured).length > 0 ? (
                  filteredOpportunities
                    .filter(opp => opp.featured)
                    .map((opportunity) => (
                      <OpportunityCard 
                        key={opportunity.id} 
                        opportunity={opportunity} 
                        formatDate={formatDate}
                        onApplyClick={() => navigate('/register')}
                      />
                    ))
                ) : (
                  <div className="col-span-2 text-center py-16">
                    <p className="text-foreground/60">{t('opportunities.noOpportunitiesFound')}</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{t('opportunities.cta.title')}</h2>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              {t('opportunities.cta.description')}
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/register')}
            >
              {t('opportunities.cta.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

// Helper components
interface SvgProps extends React.SVGProps<SVGSVGElement> {
  // Any additional props specific to SVG components
}

function Trophy(props: SvgProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
    </svg>
  );
}

function Heart(props: SvgProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
    </svg>
  );
}

// Opportunity Card Component
interface OpportunityProps {
  opportunity: {
    id: number;
    title: string;
    company: string;
    logoUrl: string;
    description: string;
    location: string;
    type: string;
    category: string;
    duration: string;
    deadline: string | null;
    featured: boolean;
  };
  formatDate: (date: string | null) => string | null;
  onApplyClick: () => void;
}

function OpportunityCard({ opportunity, formatDate, onApplyClick }: OpportunityProps) {
  const { t } = useTranslations();
  const { title, company, logoUrl, description, location, type, category, duration, deadline } = opportunity;
  
  // Get badge color based on opportunity type
  const getTypeBadgeStyles = (type: string) => {
    switch (type) {
      case 'internship':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'competition':
        return 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'volunteer':
        return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800';
    }
  };
  
  return (
    <Card className="group hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-700">
              {logoUrl ? (
                <img src={logoUrl} alt={company} className="w-full h-full object-contain p-2" />
              ) : (
                <Building className="h-6 w-6 text-gray-400" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold leading-tight mb-1 text-foreground">{title}</h3>
              <p className="text-sm text-foreground/60 mb-2">{company}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className={getTypeBadgeStyles(type)}>
                  {type === 'internship' ? t('opportunities.typeInternship') :
                   type === 'competition' ? t('opportunities.typeCompetition') :
                   t('opportunities.typeVolunteer')}
                </Badge>
                
                <Badge variant="outline" className="bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800">
                  {category}
                </Badge>
              </div>
              
              <p className="text-sm text-foreground/80 mb-4 line-clamp-2">{description}</p>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-foreground/60">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {location}
                </div>
                
                {duration && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {duration}
                  </div>
                )}
                
                {deadline && (
                  <div className="flex items-center text-red-600 dark:text-red-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    {t('opportunities.deadline')}: {formatDate(deadline)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-muted/30 flex flex-wrap gap-3 justify-between items-center border-t border-border">
          <Button variant="default" size="sm" onClick={onApplyClick}>
            {t('opportunities.apply')}
          </Button>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <ExternalLink className="mr-1 h-4 w-4" />
              {t('opportunities.learnMore')}
            </Button>
            
            <Button variant="ghost" size="sm">
              <BookmarkPlus className="mr-1 h-4 w-4" />
              {t('opportunities.save')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 