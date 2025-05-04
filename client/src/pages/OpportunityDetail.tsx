import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/hooks/use-translations";
import { Opportunity } from "@shared/schema";
import { ApiError, apiRequest } from "@/lib/queryClient";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowLeft, 
  Briefcase, 
  Share2, 
  BookmarkPlus,
  ExternalLink,
  Building,
  FileCheck
} from "lucide-react";

export default function OpportunityDetail() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { t } = useTranslations();

  // Fetch opportunity details
  const { data: opportunity, isLoading, error } = useQuery<Opportunity>({
    queryKey: [`/api/opportunities/${id}`],
    retry: 1
  });

  // Show error toast if query fails
  if (error) {
    toast({
      title: "Error",
      description: error instanceof ApiError ? error.message : "Failed to load opportunity details",
      variant: "destructive",
    });
  }

  // Handle application
  const handleApply = async () => {
    try {
      await apiRequest("POST", `/api/opportunities/${id}/apply`);
      
      toast({
        title: t('opportunity.applied'),
        description: t('opportunity.applicationSuccess'),
        variant: "default",
      });
    } catch (error) {
      toast({
        title: t('opportunity.applicationFailed'),
        description: error instanceof Error ? error.message : "Failed to submit application",
        variant: "destructive",
      });
    }
  };

  // Handle save for later
  const handleSave = async () => {
    try {
      await apiRequest("POST", `/api/opportunities/${id}/save`);
      
      toast({
        title: t('opportunity.saved'),
        description: t('opportunity.savedSuccess'),
      });
    } catch (error) {
      toast({
        title: t('opportunity.saveFailed'),
        description: error instanceof Error ? error.message : "Failed to save opportunity",
        variant: "destructive",
      });
    }
  };

  // Show loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <AppLayout>
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-48" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              
              <Skeleton className="h-8 w-48 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              
              <Skeleton className="h-8 w-48 mb-4 mt-6" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-32 w-full rounded-lg" />
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>
            </div>
            
            <div>
              <Skeleton className="h-64 w-full rounded-lg mb-6" />
              <Skeleton className="h-10 w-full rounded-md mb-4" />
              <Skeleton className="h-10 w-full rounded-md mb-6" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!opportunity) {
    return (
      <AppLayout>
        <div className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">{t('opportunity.notFound')}</h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">{t('opportunity.notFoundDesc')}</p>
          <Button onClick={() => navigate('/opportunities')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t('opportunity.backToOpportunities')}
          </Button>
        </div>
      </AppLayout>
    );
  }

  // Format deadline date if present
  const formattedDeadline = opportunity.deadline ? new Date(opportunity.deadline).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : null;

  return (
    <AppLayout>
      <div className="container mx-auto py-8 px-4">
        {/* Back button */}
        <Button 
          variant="ghost" 
          className="mb-6 hover:bg-transparent" 
          onClick={() => navigate('/opportunities')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> {t('opportunity.backToOpportunities')}
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Company logo and details */}
            <div className="flex items-center mb-6">
              {opportunity.logoUrl ? (
                <img 
                  src={opportunity.logoUrl} 
                  alt={opportunity.company} 
                  className="w-16 h-16 object-contain mr-4 rounded-lg border border-gray-200 dark:border-gray-700 p-2" 
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 mr-4">
                  <Building className="h-8 w-8" />
                </div>
              )}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {opportunity.company}
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">{opportunity.location}</div>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {opportunity.title}
            </h1>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="outline" className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                {opportunity.type}
              </Badge>
              
              {opportunity.duration && (
                <Badge variant="outline" className="px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                  {opportunity.duration}
                </Badge>
              )}
              
              {formattedDeadline && (
                <div className="flex items-center text-xs text-red-600 dark:text-red-400">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Deadline: {formattedDeadline}</span>
                </div>
              )}
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                {t('opportunity.description')}
              </h2>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                  {opportunity.description}
                </p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                {t('opportunity.requirements')}
              </h2>
              
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                {opportunity.type === "internship" && (
                  <>
                    <li>{t('opportunity.requirement1')}</li>
                    <li>{t('opportunity.requirement2')}</li>
                    <li>{t('opportunity.requirement3')}</li>
                    <li>{t('opportunity.requirement4')}</li>
                    <li>{t('opportunity.requirement5')}</li>
                  </>
                )}
                
                {opportunity.type === "volunteer" && (
                  <>
                    <li>{t('opportunity.volunteerReq1')}</li>
                    <li>{t('opportunity.volunteerReq2')}</li>
                    <li>{t('opportunity.volunteerReq3')}</li>
                    <li>{t('opportunity.volunteerReq4')}</li>
                  </>
                )}
                
                {opportunity.type === "competition" && (
                  <>
                    <li>{t('opportunity.competitionReq1')}</li>
                    <li>{t('opportunity.competitionReq2')}</li>
                    <li>{t('opportunity.competitionReq3')}</li>
                    <li>{t('opportunity.competitionReq4')}</li>
                    <li>{t('opportunity.competitionReq5')}</li>
                  </>
                )}
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                {t('opportunity.benefits')}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{t('opportunity.benefit1Title')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('opportunity.benefit1Desc')}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{t('opportunity.benefit2Title')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('opportunity.benefit2Desc')}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{t('opportunity.benefit3Title')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('opportunity.benefit3Desc')}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{t('opportunity.benefit4Title')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('opportunity.benefit4Desc')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6">
                {t('opportunity.applyNow')}
              </h3>
              
              <Button className="w-full mb-4" onClick={handleApply}>
                {t('opportunity.applyButton')}
              </Button>
              
              <Button variant="outline" className="w-full mb-6" onClick={handleSave}>
                <BookmarkPlus className="mr-2 h-4 w-4" />
                {t('opportunity.saveForLater')}
              </Button>
              
              <Button variant="ghost" className="w-full mb-6">
                <Share2 className="mr-2 h-4 w-4" />
                {t('opportunity.share')}
              </Button>
              
              {/* Opportunity info */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <Briefcase className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{t('opportunity.type')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{opportunity.type}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{t('opportunity.location')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{opportunity.location}</p>
                  </div>
                </div>
                
                {opportunity.duration && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{t('opportunity.duration')}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{opportunity.duration}</p>
                    </div>
                  </div>
                )}
                
                {formattedDeadline && (
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{t('opportunity.deadline')}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDeadline}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <FileCheck className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{t('opportunity.applicationProcess')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('opportunity.applicationProcessDesc')}</p>
                  </div>
                </div>
              </div>
              
              {/* Visit company site */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t('opportunity.visitCompanySite')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}