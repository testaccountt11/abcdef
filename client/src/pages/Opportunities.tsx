import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import OpportunityCard from "@/components/dashboard/OpportunityCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Filter, GraduationCap, Briefcase, Calendar, 
  X, Search, Users, MapPin, RotateCcw, 
  ChevronLeft, ChevronRight, FolderX, Clock, ArrowRight,
  Building2
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
}

export default function Opportunities() {
  const { toast } = useToast();
  const { t } = useTranslations();
  
  // States for search and filters
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
  const [currentTab, setCurrentTab] = useState("all");
  
  // States for sorting and pagination
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const opportunitiesPerPage = 6;

  // Fetch opportunities
  const { data: opportunities = [], isLoading, isError } = useQuery<Opportunity[]>({
    queryKey: ['/api/opportunities'],
  });

  // Show error toast if there was an error
  if (isError) {
    toast({
      title: t('opportunities.error'),
      description: t('opportunities.fetchError'),
      variant: "destructive",
    });
  }

  // Filter opportunities
  const filteredOpportunities = opportunities.filter(opportunity => {
    // Text search
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
    const matchesLocation = locationFilter === "all" || opportunity.locationType === locationFilter;
    
    // Category filter
    const matchesCategory = categoryFilter === "all" || opportunity.category === categoryFilter;
    
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
      (paymentFilter === "unpaid" && !opportunity.isPaid);
    
    // Level filter
    const matchesLevel = levelFilter === "all" || opportunity.level === levelFilter;
    
    // Company filter
    const matchesCompany = companyFilter === "all" || opportunity.company === companyFilter;
    
    // Skill filter
    const matchesSkill = skillFilter === "all" || 
      (opportunity.skills && opportunity.skills.includes(skillFilter));
    
    // Tab filter
    const matchesTab = currentTab === "all" || opportunity.type.toLowerCase() === currentTab;
    
    return matchesSearch && matchesType && matchesLocation && 
           matchesCategory && matchesDuration && matchesPayment && 
           matchesLevel && matchesCompany && matchesSkill && matchesTab;
  });

  // Sort opportunities
  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    switch (sortBy) {
      case "deadline":
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case "newest":
      default:
        return b.id - a.id;
    }
  });

  // Pagination
  const indexOfLastOpportunity = currentPage * opportunitiesPerPage;
  const indexOfFirstOpportunity = indexOfLastOpportunity - opportunitiesPerPage;
  const currentOpportunities = sortedOpportunities.slice(indexOfFirstOpportunity, indexOfLastOpportunity);
  const totalPages = Math.ceil(sortedOpportunities.length / opportunitiesPerPage);

  // Clear all filters
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
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('opportunities.title')}</h1>
            <p className="text-muted-foreground">{t('opportunities.description')}</p>
          </div>
          <Button className="w-full md:w-auto" onClick={() => window.location.href = '/opportunities/new'}>
            {t('opportunities.create')}
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder={t('opportunities.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                variant="outline"
                className="gap-2"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <Filter size={16} />
                {t('opportunities.advancedFilters')}
              </Button>
            </div>

            {showAdvancedFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Type Filter */}
                  <div className="space-y-2">
                    <Label>{t('opportunities.type')}</Label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('opportunities.allTypes')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('opportunities.allTypes')}</SelectItem>
                        <SelectItem value="internship">{t('opportunities.internship')}</SelectItem>
                        <SelectItem value="volunteer">{t('opportunities.volunteer')}</SelectItem>
                        <SelectItem value="competition">{t('opportunities.competition')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location Type Filter */}
                  <div className="space-y-2">
                    <Label>{t('opportunities.locationType')}</Label>
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('opportunities.allLocations')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('opportunities.allLocations')}</SelectItem>
                        <SelectItem value="remote">{t('opportunities.remote')}</SelectItem>
                        <SelectItem value="onsite">{t('opportunities.onsite')}</SelectItem>
                        <SelectItem value="hybrid">{t('opportunities.hybrid')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Duration Filter */}
                  <div className="space-y-2">
                    <Label>{t('opportunities.duration')}</Label>
                    <Select value={durationFilter} onValueChange={setDurationFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('opportunities.allDurations')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('opportunities.allDurations')}</SelectItem>
                        <SelectItem value="short">{t('opportunities.shortTerm')}</SelectItem>
                        <SelectItem value="medium">{t('opportunities.mediumTerm')}</SelectItem>
                        <SelectItem value="long">{t('opportunities.longTerm')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearAllFilters}
                    className="gap-2"
                  >
                    <RotateCcw size={14} />
                    {t('opportunities.clearFilters')}
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Tabs and Content */}
        <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList>
            <TabsTrigger value="all">{t('opportunities.all')}</TabsTrigger>
            <TabsTrigger value="internship">{t('opportunities.internships')}</TabsTrigger>
            <TabsTrigger value="volunteer">{t('opportunities.volunteering')}</TabsTrigger>
            <TabsTrigger value="competition">{t('opportunities.competitions')}</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            {/* Results count and sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
                {t('opportunities.showing')} <strong>{sortedOpportunities.length}</strong> {t('opportunities.results')}
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('opportunities.sortBy')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t('opportunities.newest')}</SelectItem>
                  <SelectItem value="deadline">{t('opportunities.deadline')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Opportunities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                Array(6).fill(0).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="p-0">
                      <Skeleton className="h-48 rounded-none" />
                    </CardHeader>
                    <CardContent className="p-6">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-3/4 mb-1" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : currentOpportunities.length > 0 ? (
                currentOpportunities.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <FolderX className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{t('opportunities.noResults')}</h3>
                  <p className="text-muted-foreground mb-6">{t('opportunities.tryAdjusting')}</p>
                  <Button 
                    variant="outline"
                    onClick={clearAllFilters}
                    className="gap-2"
                  >
                    <RotateCcw size={14} />
                    {t('opportunities.clearFilters')}
                  </Button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
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
                          className="w-10"
                        >
                          {page}
                        </Button>
                      );
                    }
                    if (
                      (page === currentPage - 2 && currentPage > 3) ||
                      (page === currentPage + 2 && currentPage < totalPages - 2)
                    ) {
                      return (
                        <Button
                          key={page}
                          variant="outline"
                          disabled
                          className="w-10"
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
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}