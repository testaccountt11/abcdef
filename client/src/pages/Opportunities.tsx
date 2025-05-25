import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import OpportunityCard from "@/components/dashboard/OpportunityCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Filter, GraduationCap, Briefcase, Calendar, 
  X, Search, Users, MapPin, RotateCcw, 
  ChevronLeft, ChevronRight, FolderX, Clock, ArrowRight,
  Building2
} from "lucide-react";
import { Label } from "@/components/ui/label";

// Define Opportunity type
interface Opportunity {
  id: number;
  title: string;
  company: string;
  description: string;
  location: string;
  locationType: 'remote' | 'onsite' | 'hybrid';
  type: string;
  logoUrl: string | null;
  duration: string | null;
  deadline: string | null;
  category?: string;
  skills?: string[];
  isPaid?: boolean;
  level?: string;
  // Add other fields as needed
}

export default function Opportunities() {
  const { toast } = useToast();
  const { language } = useTranslations();
  
  // Состояния для поиска и фильтров
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [skillFilter, setSkillFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  
  // Состояния для сортировки и пагинации
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const opportunitiesPerPage = 6;

  // Fetch opportunities
  const { data: opportunities, isLoading, isError, error } = useQuery<Opportunity[]>({
    queryKey: ['/api/opportunities'],
  });

  // Show error toast if there was an error
  if (isError && error instanceof Error) {
    toast({
      title: "Error",
      description: error.message || "Failed to load opportunities",
      variant: "destructive",
    });
  }

  // Apply filters
  const getFilteredOpportunities = () => {
    return (opportunities || []).filter((opportunity: Opportunity) => {
      // Поиск по тексту
    const matchesSearch = searchTerm === "" || 
        opportunity.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opportunity.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opportunity.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opportunity.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (opportunity.skills && opportunity.skills.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    
    // Type filter
    const matchesType = typeFilter === "all" || opportunity.type === typeFilter;
    
    // Location filter
    const matchesLocation = locationFilter === "all" || 
        (opportunity.locationType === locationFilter);
      
      // Category filter
      const matchesCategory = categoryFilter === "all" || 
        (opportunity.category === categoryFilter);
      
      // Duration filter
      let matchesDuration = true;
      if (durationFilter !== "all" && opportunity.duration) {
        const monthMatch = opportunity.duration.match(/(\d+)/);
        const months = monthMatch ? parseInt(monthMatch[0]) : 0;
        
        if (durationFilter === "short" && months > 3) matchesDuration = false;
        if (durationFilter === "medium" && (months < 3 || months > 6)) matchesDuration = false;
        if (durationFilter === "long" && months < 6) matchesDuration = false;
      }
      
      // Payment filter
      const matchesPayment = paymentFilter === "all" || 
        (paymentFilter === "paid" && opportunity.isPaid) || 
        (paymentFilter === "unpaid" && opportunity.isPaid === false);
      
      // Level filter
      const matchesLevel = levelFilter === "all" || 
        (opportunity.level && opportunity.level === levelFilter);
      
      // Company filter
      const matchesCompany = companyFilter === "all" || 
        opportunity.company === companyFilter;
      
      // Skill filter (упрощенно - проверяем совпадение хотя бы по одному навыку)
      const matchesSkill = skillFilter === "all" || 
        (opportunity.skills && opportunity.skills.includes(skillFilter));
      
      return matchesSearch && matchesType && matchesLocation && 
             matchesCategory && matchesDuration && matchesPayment && 
             matchesLevel && matchesCompany && matchesSkill;
    });
  };

  // Сортировка возможностей
  const getSortedOpportunities = (filteredItems: Opportunity[]) => {
    if (sortBy === "newest") {
      // Для демонстрации используем ID как показатель новизны
      return [...filteredItems].sort((a, b) => b.id - a.id);
    } else if (sortBy === "deadline") {
      // Сортировка по дедлайну (если есть)
      return [...filteredItems].sort((a, b) => {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });
    }
    return filteredItems;
  };

  // Получаем отфильтрованные и отсортированные возможности
  const filteredOpportunities = getFilteredOpportunities();
  const sortedOpportunities = getSortedOpportunities(filteredOpportunities);
  
  // Разбивка на страницы
  const indexOfLastOpportunity = currentPage * opportunitiesPerPage;
  const indexOfFirstOpportunity = indexOfLastOpportunity - opportunitiesPerPage;
  const currentOpportunities = sortedOpportunities.slice(indexOfFirstOpportunity, indexOfLastOpportunity);
  const totalPages = Math.ceil(sortedOpportunities.length / opportunitiesPerPage);
  
  // Сброс на первую страницу при изменении фильтров
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter, locationFilter, categoryFilter, durationFilter, paymentFilter, levelFilter, companyFilter, skillFilter]);

  // Получаем уникальные значения для фильтров
  const uniqueLocations = Array.from(new Set(opportunities?.map((o: Opportunity) => o.location) || [])).filter(Boolean);
  const uniqueCompanies = Array.from(new Set(opportunities?.map((o: Opportunity) => o.company) || [])).filter(Boolean);
  const uniqueCategories = Array.from(new Set(opportunities?.map((o: Opportunity) => o.category) || [])).filter(Boolean);
  const uniqueSkills = Array.from(
    new Set(opportunities?.flatMap(o => o.skills || []) || [])
  ).filter(Boolean);

  // Очистка всех фильтров
  const clearAllFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setLocationFilter("all");
    setCategoryFilter("all");
    setDurationFilter("all");
    setPaymentFilter("all");
    setLevelFilter("all");
    setCompanyFilter("all");
    setSkillFilter("all");
    setSortBy("newest");
    setCurrentPage(1);
  };

  return (
    <AppLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Opportunities</h1>
          <p className="text-gray-600">Find internships, volunteering positions, and competitions</p>
        </div>

        {/* Фильтры */}
        <div className="mb-8 bg-card/40 backdrop-blur-sm border border-border/20 rounded-xl p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={18} />
            <Input
                id="search"
                type="text"
                placeholder="Search by title, company or skills..."
                className="pl-10 py-6 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button 
              variant="outline"
              className="min-w-[180px] gap-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <Filter size={16} />
              Advanced Filters
              <motion.div
                animate={{ rotate: showAdvancedFilters ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* @ts-ignore */}
                <ArrowRight className="w-4 h-4 transform -rotate-90" />
              </motion.div>
            </Button>
          </div>
          
          {/* Расширенные фильтры с анимацией */}
          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-4 pt-4 border-t border-border/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Фильтр по категории */}
          <div>
                    <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Building2 size={14} />
                      Category
                    </Label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                        <SelectItem value="all">All categories</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Media">Media</SelectItem>
                        <SelectItem value="Management">Management</SelectItem>
              </SelectContent>
            </Select>
          </div>
                  
                  {/* Фильтр по типу локации */}
          <div>
                    <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                      <MapPin size={14} />
                      Location Type
                    </Label>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All locations</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="onsite">On-site</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Фильтр по длительности */}
                  <div>
                    <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Clock size={14} />
                      Duration
                    </Label>
                    <Select value={durationFilter} onValueChange={setDurationFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All durations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All durations</SelectItem>
                        <SelectItem value="short">Short (1-3 months)</SelectItem>
                        <SelectItem value="medium">Medium (3-6 months)</SelectItem>
                        <SelectItem value="long">Long (6+ months)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Фильтр по оплате */}
                  <div>
                    <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Briefcase size={14} />
                      Payment
                    </Label>
                    <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All payment types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All payment types</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Фильтр по уровню опыта */}
                  <div>
                    <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                      <GraduationCap size={14} />
                      Experience Level
                    </Label>
                    <Select value={levelFilter} onValueChange={setLevelFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All levels</SelectItem>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Фильтр по навыкам */}
                  <div>
                    <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                      <GraduationCap size={14} />
                      Skills
                    </Label>
                    <Select value={skillFilter} onValueChange={setSkillFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All skills" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All skills</SelectItem>
                        {uniqueSkills.map((skill, index) => (
                          <SelectItem key={index} value={String(skill)}>{String(skill)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearAllFilters}
                  >
                    <RotateCcw className="h-3.5 mr-2" />
                    Reset all filters
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Заголовок с количеством найденных возможностей и сортировкой */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-foreground/70">
            Opportunities found: <span className="font-semibold text-foreground">{sortedOpportunities.length}</span>
          </p>
          
          <div className="flex items-center gap-2">
            <p className="text-sm text-foreground/60">Sort by:</p>
            <Select 
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger className="h-8 pl-3 pr-7 py-0 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="internship">Internships</TabsTrigger>
            <TabsTrigger value="volunteer">Volunteering</TabsTrigger>
            <TabsTrigger value="competition">Competitions</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-6 w-3/4 mb-1" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <div className="p-4">
                      <Skeleton className="h-4 w-3/4 mb-3" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <div className="flex space-x-2">
                        <Skeleton className="h-10 flex-1 rounded-md" />
                        <Skeleton className="h-10 w-10 rounded-md" />
                      </div>
                    </div>
                  </div>
                ))
              ) : currentOpportunities && currentOpportunities.length > 0 ? (
                currentOpportunities.map((opportunity: Opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <FolderX className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No opportunities found</h3>
                  <p className="text-foreground/70 max-w-md mx-auto mb-6">
                    Try changing your search criteria or filters for better results.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={clearAllFilters}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
            
            {/* Пагинация */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {/* Номера страниц */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Показываем ограниченное количество страниц для лучшего UX
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 p-0 ${
                            currentPage === page ? "bg-primary text-white" : ""
                          }`}
                        >
                          {page}
                        </Button>
                      );
                    }
                    
                    // Показываем троеточие вместо большого количества страниц
                    if (
                      (page === currentPage - 2 && currentPage > 3) ||
                      (page === currentPage + 2 && currentPage < totalPages - 2)
                    ) {
                      return (
                        <Button
                          key={page}
                          variant="outline"
                          disabled
                          className="w-10 h-10 p-0"
                        >
                          ...
                        </Button>
                      );
                    }
                    
                    return null;
                  })}
                  
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {["internship", "volunteer", "competition"].map((type) => (
            <TabsContent key={type} value={type} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                      <div className="p-4 border-b border-gray-100">
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-6 w-3/4 mb-1" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                      <div className="p-4">
                        <Skeleton className="h-4 w-3/4 mb-3" />
                        <Skeleton className="h-4 w-full mb-4" />
                        <div className="flex space-x-2">
                          <Skeleton className="h-10 flex-1 rounded-md" />
                          <Skeleton className="h-10 w-10 rounded-md" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : sortedOpportunities && sortedOpportunities.filter((o: Opportunity) => o.type === type).length > 0 ? (
                  sortedOpportunities
                    .filter((o: Opportunity) => o.type === type)
                    .slice((currentPage - 1) * opportunitiesPerPage, currentPage * opportunitiesPerPage)
                    .map((opportunity: Opportunity) => (
                      <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                    ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <FolderX className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">No {type}s found</h3>
                    <p className="text-foreground/70 max-w-md mx-auto mb-6">
                      Try changing your search criteria or filters for better results.
                    </p>
                    <Button 
                      variant="outline"
                      onClick={clearAllFilters}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AppLayout>
  );
}
