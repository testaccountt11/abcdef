import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { useLocation } from "wouter";
import { Search, Filter, GraduationCap, Award, Clock, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PublicPageLayout } from "@/components/layouts/PublicPageLayout";

// Dummy course data for presentation purposes
const dummyCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Learn the basics of HTML, CSS, and JavaScript to build responsive websites from scratch.",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "8 weeks",
    level: "Beginner",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    students: 1245,
    rating: 4.8,
    featured: true
  },
  {
    id: 2,
    title: "Data Science & Machine Learning",
    description: "Master data analysis, visualization and machine learning algorithms for real-world applications.",
    category: "Data Science",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "12 weeks",
    level: "Intermediate",
    provider: "Tech Academy",
    isPartnerCourse: true,
    students: 890,
    rating: 4.9,
    featured: true
  },
  {
    id: 3,
    title: "UX/UI Design Essentials",
    description: "Learn user experience and interface design principles to create beautiful, user-friendly products.",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "10 weeks",
    level: "Beginner",
    provider: "Design School",
    isPartnerCourse: true,
    students: 1120,
    rating: 4.7,
    featured: false
  },
  {
    id: 4,
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile applications using React Native and JavaScript.",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "10 weeks",
    level: "Intermediate",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    students: 756,
    rating: 4.6,
    featured: false
  },
  {
    id: 5,
    title: "Digital Marketing Fundamentals",
    description: "Learn SEO, social media marketing, email campaigns, and analytics to grow your online presence.",
    category: "Marketing",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "6 weeks",
    level: "Beginner",
    provider: "Marketing Masters",
    isPartnerCourse: true,
    students: 1340,
    rating: 4.5,
    featured: true
  },
  {
    id: 6,
    title: "Cloud Computing with AWS",
    description: "Master Amazon Web Services and learn to deploy, scale, and maintain applications in the cloud.",
    category: "Cloud Computing",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "9 weeks",
    level: "Advanced",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    students: 672,
    rating: 4.8,
    featured: false
  }
];

export default function PublicCourses() {
  const { t } = useTranslations();
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Filter courses based on search query and category
  const filteredCourses = dummyCourses.filter(course => {
    const matchesSearch = searchQuery === "" || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Extract unique categories for the filter
  const categories = ["all", ...Array.from(new Set(dummyCourses.map(course => course.category)))];
  
  return (
    <PublicPageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {t('courses.title')}
            </h1>
            <p className="text-xl text-foreground/80 mb-10 leading-relaxed">
              {t('courses.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/register')}
              >
                {t('courses.startLearning')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  const coursesSection = document.getElementById('courses-section');
                  if (coursesSection) {
                    coursesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t('courses.exploreCourses')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">{t('courses.whyChoose.title')}</h2>
            <p className="text-lg text-foreground/80">
              {t('courses.whyChoose.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl shadow-sm p-8 border border-border text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t('courses.whyChoose.expert.title')}</h3>
              <p className="text-foreground/80">
                {t('courses.whyChoose.expert.description')}
              </p>
            </div>
            
            <div className="bg-background rounded-xl shadow-sm p-8 border border-border text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t('courses.whyChoose.certificates.title')}</h3>
              <p className="text-foreground/80">
                {t('courses.whyChoose.certificates.description')}
              </p>
            </div>
            
            <div className="bg-background rounded-xl shadow-sm p-8 border border-border text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t('courses.whyChoose.community.title')}</h3>
              <p className="text-foreground/80">
                {t('courses.whyChoose.community.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses-section" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold mb-6">{t('courses.exploreTitle')}</h2>
            <p className="text-lg text-foreground/80">
              {t('courses.exploreDescription')}
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={18} />
                <Input
                  placeholder={t('courses.searchPlaceholder')}
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
                        {category === "all" ? t('courses.allCategories') : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Course Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">{t('courses.allCourses')}</TabsTrigger>
                <TabsTrigger value="featured">{t('courses.featuredCourses')}</TabsTrigger>
                <TabsTrigger value="partner">{t('courses.partnerCourses')}</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} onRegisterClick={() => navigate('/register')} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-16">
                    <p className="text-foreground/60">{t('courses.noCoursesFound')}</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="featured">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.filter(course => course.featured).length > 0 ? (
                  filteredCourses
                    .filter(course => course.featured)
                    .map((course) => (
                      <CourseCard key={course.id} course={course} onRegisterClick={() => navigate('/register')} />
                    ))
                ) : (
                  <div className="col-span-3 text-center py-16">
                    <p className="text-foreground/60">{t('courses.noCoursesFound')}</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="partner">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.filter(course => course.isPartnerCourse).length > 0 ? (
                  filteredCourses
                    .filter(course => course.isPartnerCourse)
                    .map((course) => (
                      <CourseCard key={course.id} course={course} onRegisterClick={() => navigate('/register')} />
                    ))
                ) : (
                  <div className="col-span-3 text-center py-16">
                    <p className="text-foreground/60">{t('courses.noCoursesFound')}</p>
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
            <h2 className="text-3xl font-bold mb-6">{t('courses.cta.title')}</h2>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              {t('courses.cta.description')}
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/register')}
            >
              {t('courses.cta.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </PublicPageLayout>
  );
}

// Course Card Component
interface CourseCardProps {
  course: {
    id: number;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    duration: string;
    level: string;
    provider: string;
    isPartnerCourse: boolean;
    students: number;
    rating: number;
  };
  onRegisterClick: () => void;
}

function CourseCard({ course, onRegisterClick }: CourseCardProps) {
  const { t } = useTranslations();
  
  return (
    <div className="bg-background rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48">
        <img 
          src={course.imageUrl} 
          alt={course.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-3 left-3 flex gap-2">
          <Badge className={`${course.isPartnerCourse ? 'bg-secondary/90' : 'bg-primary/90'}`}>
            {course.isPartnerCourse ? t('courses.partnerBadge') : t('courses.portfolioBadge')}
          </Badge>
          <Badge variant="outline" className="bg-black/30 text-white border-white/20">
            {course.level}
          </Badge>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-xl">{course.title}</h3>
          </div>
          
          <div className="flex items-center text-sm text-foreground/60 mb-3">
            <span>{course.provider}</span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {course.duration}
            </span>
          </div>
          
          <p className="text-sm text-foreground/80 mb-4 line-clamp-2">{course.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {course.students.toLocaleString()}
            </div>
            <div className="flex items-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    className={`h-4 w-4 ${star <= Math.floor(course.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="ml-1">{course.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-auto">
          <ul className="mb-4 space-y-1">
            <li className="flex items-center text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
              {t('courses.features.certificate')}
            </li>
            <li className="flex items-center text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
              {t('courses.features.exercises')}
            </li>
            <li className="flex items-center text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
              {t('courses.features.community')}
            </li>
          </ul>
          
          <Button className="w-full" onClick={onRegisterClick}>
            {t('courses.registerToEnroll')}
          </Button>
        </div>
      </div>
    </div>
  );
} 