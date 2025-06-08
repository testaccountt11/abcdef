import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/hooks/use-translations";
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
  FileCheck,
  ChevronLeft
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
      title: t('opportunity.error'),
      description: error instanceof ApiError ? error.message : t('opportunity.fetchError'),
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
      });
    } catch (error) {
      toast({
        title: t('opportunity.applicationFailed'),
        description: error instanceof Error ? error.message : t('opportunity.applicationError'),
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
        description: error instanceof Error ? error.message : t('opportunity.saveError'),
        variant: "destructive",
      });
    }
  };

  // Show loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto p-6 space-y-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="gap-2" disabled>
              <ChevronLeft size={16} />
              {t('opportunity.back')}
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Skeleton className="h-4 w-48" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                  <div>
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-24 rounded-full" />
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-48" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <Skeleton className="h-10 w-full rounded-md" />
                  <Skeleton className="h-10 w-full rounded-md" />
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!opportunity) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">{t('opportunity.notFound')}</h1>
          <p className="text-muted-foreground mb-8">{t('opportunity.notFoundDesc')}</p>
          <Button onClick={() => navigate('/opportunities')} variant="outline" className="gap-2">
            <ChevronLeft size={16} />
            {t('opportunity.backToOpportunities')}
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Format deadline date if present
  const formattedDeadline = opportunity.deadline ? new Date(opportunity.deadline).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : null;

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-8">
        {/* Back button and breadcrumb */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="gap-2"
            onClick={() => navigate('/opportunities')}
          >
            <ChevronLeft size={16} />
            {t('opportunity.back')}
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <p className="text-muted-foreground">
            {t('opportunity.viewing')} <span className="font-medium text-foreground">{opportunity.title}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader className="space-y-6">
                {/* Company info */}
                <div className="flex items-start gap-4">
                  {opportunity.logoUrl ? (
                    <img 
                      src={opportunity.logoUrl} 
                      alt={opportunity.company} 
                      className="w-16 h-16 object-contain rounded-lg border border-border bg-background p-2" 
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg border border-border bg-background flex items-center justify-center">
                      <Building className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-medium">{opportunity.company}</h3>
                    <p className="text-muted-foreground">{opportunity.location}</p>
                  </div>
                </div>

                {/* Title and badges */}
                <div>
                  <h1 className="text-2xl font-bold mb-4">{opportunity.title}</h1>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="gap-1">
                      <Briefcase size={14} />
                      {opportunity.type}
                    </Badge>
                    {opportunity.duration && (
                      <Badge variant="secondary" className="gap-1">
                        <Clock size={14} />
                        {opportunity.duration}
                      </Badge>
                    )}
                    <Badge variant="secondary" className="gap-1">
                      <MapPin size={14} />
                      {opportunity.locationType}
                    </Badge>
                    {formattedDeadline && (
                      <Badge variant="destructive" className="gap-1">
                        <Calendar size={14} />
                        {t('opportunity.deadline')}: {formattedDeadline}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Description */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">{t('opportunity.description')}</h2>
                  <div className="text-muted-foreground whitespace-pre-line">
                    {opportunity.description}
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">{t('opportunity.requirements')}</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {opportunity.type === "internship" && (
                      <>
                        <li>{t('opportunity.requirement1')}</li>
                        <li>{t('opportunity.requirement2')}</li>
                        <li>{t('opportunity.requirement3')}</li>
                        <li>{t('opportunity.requirement4')}</li>
                      </>
                    )}
                    
                    {opportunity.type === "volunteer" && (
                      <>
                        <li>{t('opportunity.volunteerReq1')}</li>
                        <li>{t('opportunity.volunteerReq2')}</li>
                        <li>{t('opportunity.volunteerReq3')}</li>
                      </>
                    )}
                    
                    {opportunity.type === "competition" && (
                      <>
                        <li>{t('opportunity.competitionReq1')}</li>
                        <li>{t('opportunity.competitionReq2')}</li>
                        <li>{t('opportunity.competitionReq3')}</li>
                        <li>{t('opportunity.competitionReq4')}</li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Skills */}
                {opportunity.skills && opportunity.skills.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">{t('opportunity.requiredSkills')}</h2>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <h3 className="text-lg font-medium">
                  {t('opportunity.applyNow')}
                </h3>

                <Button className="w-full" onClick={handleApply}>
                  {t('opportunity.applyButton')}
                </Button>

                <Button variant="outline" className="w-full gap-2" onClick={handleSave}>
                  <BookmarkPlus size={16} />
                  {t('opportunity.saveForLater')}
                </Button>

                <Button variant="outline" className="w-full gap-2">
                  <Share2 size={16} />
                  {t('opportunity.share')}
                </Button>

                <Separator />

                {/* Opportunity details */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{t('opportunity.type')}</p>
                      <p className="text-muted-foreground">{opportunity.type}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{t('opportunity.location')}</p>
                      <p className="text-muted-foreground">{opportunity.location}</p>
                    </div>
                  </div>

                  {opportunity.duration && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">{t('opportunity.duration')}</p>
                        <p className="text-muted-foreground">{opportunity.duration}</p>
                      </div>
                    </div>
                  )}

                  {formattedDeadline && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">{t('opportunity.deadline')}</p>
                        <p className="text-muted-foreground">{formattedDeadline}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <FileCheck className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{t('opportunity.applicationProcess')}</p>
                      <p className="text-muted-foreground">{t('opportunity.applicationProcessDesc')}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Company website */}
                <Button variant="outline" className="w-full gap-2">
                  <ExternalLink size={16} />
                  {t('opportunity.visitCompanySite')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}