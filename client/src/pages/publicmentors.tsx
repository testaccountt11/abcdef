import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { useLocation } from "wouter";
import { Search, Filter, Star, ArrowRight, MessageCircle, Calendar, Award, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dummy mentor data for presentation purposes
const dummyMentors = [
  {
    id: 1,
    name: "Arman Bekov",
    title: "Senior Software Engineer",
    company: "TechCorp",
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Experienced software engineer with 10+ years in full-stack development. I specialize in React, Node.js, and cloud architecture. I enjoy mentoring junior developers and helping them grow their skills.",
    category: "Software Development",
    skills: ["React", "Node.js", "AWS", "System Design", "Career Guidance"],
    languages: ["English", "Russian", "Kazakh"],
    rating: 4.9,
    reviewCount: 47,
    featured: true
  },
  {
    id: 2,
    name: "Aizhan Nurmagambetova",
    title: "Data Scientist",
    company: "Analytics Co",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Data scientist with expertise in machine learning, statistical analysis, and data visualization. I love helping students make sense of data and build compelling portfolios.",
    category: "Data Science",
    skills: ["Python", "Machine Learning", "Statistics", "Data Visualization", "SQL"],
    languages: ["English", "Russian"],
    rating: 4.8,
    reviewCount: 32,
    featured: true
  },
  {
    id: 3,
    name: "Daulet Kenesbek",
    title: "UX/UI Designer",
    company: "Design Studio",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Passionate designer with a focus on creating intuitive user experiences. I believe in design thinking and user-centered approaches to product development.",
    category: "Design",
    skills: ["UX Design", "UI Design", "Figma", "Design Systems", "Prototyping"],
    languages: ["English", "Kazakh"],
    rating: 4.7,
    reviewCount: 23,
    featured: false
  },
  {
    id: 4,
    name: "Zarina Iskakova",
    title: "Product Manager",
    company: "Product Heroes",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Product manager with experience in leading cross-functional teams and launching successful products. I coach aspiring product managers on strategy, execution, and leadership.",
    category: "Product Management",
    skills: ["Product Strategy", "Agile", "Product Analytics", "User Research", "Roadmapping"],
    languages: ["English", "Russian", "Kazakh"],
    rating: 4.9,
    reviewCount: 38,
    featured: true
  },
  {
    id: 5,
    name: "Ruslan Saduakassov",
    title: "Marketing Director",
    company: "Growth Partners",
    profileImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Marketing professional with expertise in digital marketing, brand strategy, and growth marketing. I help students and early-career professionals develop effective marketing strategies.",
    category: "Marketing",
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Social Media", "Analytics"],
    languages: ["English", "Russian"],
    rating: 4.6,
    reviewCount: 19,
    featured: false
  },
  {
    id: 6,
    name: "Aliya Nurmukhambetova",
    title: "Financial Analyst",
    company: "Finance Group",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Finance professional with experience in investment analysis, financial modeling, and strategic planning. I provide guidance on finance careers and skill development.",
    category: "Finance",
    skills: ["Financial Modeling", "Valuation", "Excel", "Investment Analysis", "Financial Planning"],
    languages: ["English", "Kazakh"],
    rating: 4.8,
    reviewCount: 21,
    featured: false
  }
];

export default function PublicMentors() {
  const { t } = useTranslations();
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Filter mentors based on search query and category
  const filteredMentors = dummyMentors.filter(mentor => {
    const mentorText = `${mentor.name} ${mentor.title} ${mentor.company} ${mentor.bio} ${mentor.skills.join(' ')}`.toLowerCase();
    
    const matchesSearch = searchQuery === "" || mentorText.includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || mentor.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Extract unique categories for filter
  const categories = ["all", ...Array.from(new Set(dummyMentors.map(mentor => mentor.category)))];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {t('mentors.title')}
            </h1>
            <p className="text-xl text-foreground/80 mb-10 leading-relaxed">
              {t('mentors.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/register')}
              >
                {t('mentors.findMentor')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  const mentorsSection = document.getElementById('mentors-section');
                  if (mentorsSection) {
                    mentorsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t('mentors.exploreMentors')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of Mentorship Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">{t('mentors.benefits.title')}</h2>
            <p className="text-lg text-foreground/80">
              {t('mentors.benefits.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl shadow-sm p-8 border border-border text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Compass className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t('mentors.benefits.guidance.title')}</h3>
              <p className="text-foreground/80">
                {t('mentors.benefits.guidance.description')}
              </p>
            </div>
            
            <div className="bg-background rounded-xl shadow-sm p-8 border border-border text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t('mentors.benefits.network.title')}</h3>
              <p className="text-foreground/80">
                {t('mentors.benefits.network.description')}
              </p>
            </div>
            
            <div className="bg-background rounded-xl shadow-sm p-8 border border-border text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t('mentors.benefits.skills.title')}</h3>
              <p className="text-foreground/80">
                {t('mentors.benefits.skills.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section id="mentors-section" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold mb-6">{t('mentors.exploreTitle')}</h2>
            <p className="text-lg text-foreground/80">
              {t('mentors.exploreDescription')}
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={18} />
                <Input
                  placeholder={t('mentors.searchPlaceholder')}
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="w-full md:w-48">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={18} />
                  <select
                    className="w-full h-10 pl-10 pr-4 py-2 appearance-none bg-background border border-input rounded-md text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? t('mentors.allCategories') : category}
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
                <TabsTrigger value="all">{t('mentors.allMentors')}</TabsTrigger>
                <TabsTrigger value="featured">{t('mentors.featuredMentors')}</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMentors.length > 0 ? (
                  filteredMentors.map((mentor) => (
                    <MentorCard key={mentor.id} mentor={mentor} onConnectClick={() => navigate('/register')} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-16">
                    <p className="text-foreground/60">{t('mentors.noMentorsFound')}</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="featured">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMentors.filter(mentor => mentor.featured).length > 0 ? (
                  filteredMentors
                    .filter(mentor => mentor.featured)
                    .map((mentor) => (
                      <MentorCard key={mentor.id} mentor={mentor} onConnectClick={() => navigate('/register')} />
                    ))
                ) : (
                  <div className="col-span-3 text-center py-16">
                    <p className="text-foreground/60">{t('mentors.noMentorsFound')}</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">{t('mentors.testimonials.title')}</h2>
            <p className="text-lg text-foreground/80">
              {t('mentors.testimonials.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl shadow-sm p-8 border border-border">
              <div className="flex justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&h=120&q=80" 
                      alt="Testimonial" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{t('mentors.testimonials.person1.name')}</h4>
                    <p className="text-sm text-foreground/60">{t('mentors.testimonials.person1.role')}</p>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-foreground/80">
                {t('mentors.testimonials.person1.quote')}
              </p>
            </div>
            
            <div className="bg-background rounded-xl shadow-sm p-8 border border-border">
              <div className="flex justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&h=120&q=80" 
                      alt="Testimonial" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{t('mentors.testimonials.person2.name')}</h4>
                    <p className="text-sm text-foreground/60">{t('mentors.testimonials.person2.role')}</p>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-foreground/80">
                {t('mentors.testimonials.person2.quote')}
              </p>
            </div>
            
            <div className="bg-background rounded-xl shadow-sm p-8 border border-border">
              <div className="flex justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&h=120&q=80" 
                      alt="Testimonial" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{t('mentors.testimonials.person3.name')}</h4>
                    <p className="text-sm text-foreground/60">{t('mentors.testimonials.person3.role')}</p>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <p className="text-foreground/80">
                {t('mentors.testimonials.person3.quote')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{t('mentors.cta.title')}</h2>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              {t('mentors.cta.description')}
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/register')}
            >
              {t('mentors.cta.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

// Helper Components 
interface SvgProps extends React.SVGProps<SVGSVGElement> {
  // Any additional props specific to SVG components
}

function Compass(props: SvgProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"></circle>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
    </svg>
  );
}

function Users(props: SvgProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );
}

function Target(props: SvgProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>
  );
}

// Mentor Card Component
interface MentorCardProps {
  mentor: {
    id: number;
    name: string;
    title: string;
    company: string;
    profileImage: string;
    bio: string;
    category: string;
    skills: string[];
    languages: string[];
    rating: number;
    reviewCount: number;
    featured: boolean;
  };
  onConnectClick: () => void;
}

function MentorCard({ mentor, onConnectClick }: MentorCardProps) {
  const { t } = useTranslations();
  
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-primary/10">
                <img 
                  src={mentor.profileImage} 
                  alt={mentor.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">{mentor.name}</h3>
                <p className="text-foreground/60 text-sm">{mentor.title} {mentor.company && `at ${mentor.company}`}</p>
              </div>
            </div>
            
            {mentor.featured && (
              <Badge className="bg-primary/10 text-primary border-primary/20 flex items-center">
                <Award className="w-3 h-3 mr-1" />
                {t('mentors.featured')}
              </Badge>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center text-sm">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-4 h-4 ${star <= Math.floor(mentor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="ml-2 text-foreground/60">
                {mentor.rating.toFixed(1)} ({mentor.reviewCount} {t('mentors.reviews')})
              </span>
            </div>
            
            <p className="text-foreground/80 line-clamp-3">{mentor.bio}</p>
            
            <div>
              <h4 className="font-medium mb-2">{t('mentors.expertise')}</h4>
              <div className="flex flex-wrap gap-2">
                {mentor.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="font-normal">
                    {skill}
                  </Badge>
                ))}
                {mentor.skills.length > 3 && (
                  <Badge variant="outline" className="font-normal">
                    +{mentor.skills.length - 3}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center text-sm text-foreground/60">
              <Globe className="w-4 h-4 mr-1" />
              {mentor.languages.join(', ')}
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border flex gap-2">
          <Button className="flex-1" onClick={onConnectClick}>
            {t('mentors.connect')}
          </Button>
          <Button variant="outline" className="flex items-center" onClick={onConnectClick}>
            <MessageCircle className="w-4 h-4 mr-1" />
            {t('mentors.message')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 