
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import CourseCard from "@/components/dashboard/CourseCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/hooks/use-translations";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CourseCatalog() {
  const { toast } = useToast();
  const { t } = useTranslations();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [formatFilter, setFormatFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  const { data: courses, isLoading } = useQuery({
    queryKey: ['/api/courses'],
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to load courses",
        variant: "destructive",
      });
    },
  });

  const filteredCourses = courses?.filter(course => {
    const matchesSearch = searchTerm === "" || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = priceFilter === "all" || 
      (priceFilter === "free" && course.price === 0) ||
      (priceFilter === "paid" && course.price > 0);
    
    const matchesFormat = formatFilter === "all" || course.format === formatFilter;
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    
    return matchesSearch && matchesPrice && matchesFormat && matchesLevel;
  });

  const platformCourses = filteredCourses?.filter(course => !course.isPartnerCourse) || [];
  const partnerCourses = filteredCourses?.filter(course => course.isPartnerCourse) || [];

  return (
    <AppLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{t('courses.catalog')}</h1>
          <p className="text-gray-600">{t('courses.catalogDesc')}</p>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Input
            placeholder={t('courses.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          
          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger>
              <SelectValue placeholder={t('courses.priceFilter')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('courses.allPrices')}</SelectItem>
              <SelectItem value="free">{t('courses.free')}</SelectItem>
              <SelectItem value="paid">{t('courses.paid')}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={formatFilter} onValueChange={setFormatFilter}>
            <SelectTrigger>
              <SelectValue placeholder={t('courses.formatFilter')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('courses.allFormats')}</SelectItem>
              <SelectItem value="online">{t('courses.online')}</SelectItem>
              <SelectItem value="offline">{t('courses.offline')}</SelectItem>
              <SelectItem value="hybrid">{t('courses.hybrid')}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger>
              <SelectValue placeholder={t('courses.levelFilter')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('courses.allLevels')}</SelectItem>
              <SelectItem value="beginner">{t('courses.beginner')}</SelectItem>
              <SelectItem value="intermediate">{t('courses.intermediate')}</SelectItem>
              <SelectItem value="advanced">{t('courses.advanced')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">{t('courses.allCourses')}</TabsTrigger>
            <TabsTrigger value="platform">{t('courses.platformCourses')}</TabsTrigger>
            <TabsTrigger value="partner">{t('courses.partnerCourses')}</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-card rounded-lg overflow-hidden">
                    <Skeleton className="h-40 w-full" />
                    <div className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-3" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                ))
              ) : filteredCourses?.length ? (
                filteredCourses.map((course) => (
                  <CourseCard 
                    key={course.id} 
                    course={course}
                    showEnrollButton
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-500">{t('courses.noCourses')}</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="platform" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platformCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course}
                  showEnrollButton
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="partner" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnerCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course}
                  showEnrollButton
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
