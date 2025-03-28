import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import { Badge as UIBadge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRightIcon, Award, Medal, TrophyIcon } from "lucide-react";
import { apiRequest, getQueryFn } from "@/lib/queryClient";
import type { UserAchievement, Achievement, UserBadge, Badge } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/contexts/AuthContext";
import { useState } from "react";

// Define types for our API responses
type UserAchievementResponse = (UserAchievement & { achievement: Achievement })[];
type AchievementResponse = Achievement[];
type UserBadgeResponse = (UserBadge & { badge: Badge })[];

export default function Achievements() {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("achievements");

  // Fetch user achievements
  const { 
    data: userAchievements = [], 
    isLoading: isLoadingAchievements
  } = useQuery<UserAchievementResponse>({
    queryKey: ['/api/achievements'],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  // Fetch all achievements for progress comparison
  const { 
    data: allAchievements = [], 
    isLoading: isLoadingAllAchievements
  } = useQuery<AchievementResponse>({
    queryKey: ['/api/achievements/all'],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  // Fetch user badges
  const { 
    data: userBadges = [], 
    isLoading: isLoadingBadges,
    refetch: refetchBadges
  } = useQuery<UserBadgeResponse>({
    queryKey: ['/api/badges'],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  // Function to toggle badge display on profile
  const toggleBadgeDisplay = async (badgeId: number, displayOnProfile: boolean) => {
    try {
      const response = await fetch(`/api/badges/${badgeId}/display`, {
        method: 'PATCH',
        body: JSON.stringify({ displayOnProfile }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error("Failed to update badge display settings");
      }
      
      toast({
        title: displayOnProfile ? "Badge displayed" : "Badge hidden",
        description: displayOnProfile 
          ? "Badge will now be visible on your profile" 
          : "Badge is now hidden from your profile",
        variant: "default",
      });
      
      refetchBadges();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update badge display settings",
        variant: "destructive",
      });
    }
  };

  // Calculate total achievement points
  const totalPoints = userAchievements?.reduce((total, achievement) => {
    if (achievement.isComplete) {
      return total + (achievement.achievement.points || 0);
    }
    return total;
  }, 0) || 0;

  // Get next badge to unlock
  const getNextBadgeToUnlock = () => {
    if (!userBadges || userBadges.length === 0) return null;
    
    const badgeLevels = userBadges.map(badge => badge.badge.level || 0);
    const currentHighestLevel = Math.max(...badgeLevels);
    
    // Find the next level badge by looking at all badges not yet earned
    const nextLevelBadges = userBadges
      .filter(badge => !badge.badge.isRare && (badge.badge.level || 0) > currentHighestLevel)
      .sort((a, b) => (a.badge.requiredPoints || 0) - (b.badge.requiredPoints || 0));
    
    return nextLevelBadges.length > 0 ? nextLevelBadges[0] : null;
  };

  const nextBadge = getNextBadgeToUnlock();

  return (
    <AppLayout>
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Your Achievements & Badges
          </h1>
          <p className="text-gray-600">Track your progress and showcase your accomplishments</p>
        </div>

        {/* Summary Card */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center p-4 bg-primary-50 rounded-lg">
                <div className="text-primary-700 mb-2">
                  <TrophyIcon size={48} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {isLoadingAchievements 
                    ? <Skeleton className="h-6 w-16 inline-block" /> 
                    : userAchievements?.filter(a => a.isComplete).length || 0}
                </h3>
                <p className="text-sm text-gray-600">Achievements Earned</p>
              </div>
              
              <div className="flex flex-col items-center justify-center p-4 bg-secondary-50 rounded-lg">
                <div className="text-secondary-700 mb-2">
                  <Medal size={48} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {isLoadingBadges 
                    ? <Skeleton className="h-6 w-16 inline-block" /> 
                    : userBadges?.length || 0}
                </h3>
                <p className="text-sm text-gray-600">Badges Unlocked</p>
              </div>
              
              <div className="flex flex-col items-center justify-center p-4 bg-accent-50 rounded-lg">
                <div className="text-accent-700 mb-2">
                  <Award size={48} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {isLoadingAchievements 
                    ? <Skeleton className="h-6 w-16 inline-block" /> 
                    : totalPoints}
                </h3>
                <p className="text-sm text-gray-600">Total Points</p>
              </div>
            </div>
            
            {nextBadge && (
              <div className="mt-6 bg-muted p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-sm">Next Badge: {nextBadge.badge.name}</h4>
                  <span className="text-sm text-gray-600">{totalPoints} / {nextBadge.badge.requiredPoints} points</span>
                </div>
                <Progress 
                  value={(totalPoints / (nextBadge.badge.requiredPoints || 1)) * 100} 
                  className="h-2"
                />
                <p className="mt-2 text-xs text-gray-600">
                  {nextBadge.badge.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs for Achievements and Badges */}
        <Tabs defaultValue="achievements" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>
          
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {isLoadingAchievements || isLoadingAllAchievements ? (
                Array(6).fill(0).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <Skeleton className="h-10 w-10 rounded-md mr-3" />
                        <div>
                          <Skeleton className="h-5 w-32 mb-1" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <Skeleton className="h-4 w-full mb-3" />
                      <Skeleton className="h-2 w-full mb-1" />
                      <Skeleton className="h-8 w-16 mt-3" />
                    </CardContent>
                  </Card>
                ))
              ) : userAchievements && allAchievements ? (
                allAchievements.map(achievement => {
                  const userAchievement = userAchievements.find(
                    ua => ua.achievementId === achievement.id
                  );
                  
                  const progress = userAchievement?.progress || 0;
                  const requiredValue = achievement.requiredValue || 1;
                  const progressPercentage = (progress / requiredValue) * 100;
                  
                  return (
                    <Card key={achievement.id} className={
                      userAchievement?.isComplete 
                        ? "border-success border-2" 
                        : "border-gray-200"
                    }>
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <div 
                            className={`w-10 h-10 rounded-md mr-3 flex items-center justify-center bg-opacity-10 ${
                              userAchievement?.isComplete ? 'bg-success text-success-900' : 'bg-gray-200 text-gray-500'
                            }`}
                          >
                            <img 
                              src={achievement.iconUrl} 
                              alt={achievement.name} 
                              className="w-6 h-6" 
                            />
                          </div>
                          <div>
                            <CardTitle className="text-base">
                              {achievement.name}
                            </CardTitle>
                            <CardDescription>
                              {achievement.category} • {achievement.points} points
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm text-gray-600 mb-3">
                          {achievement.description}
                        </p>
                        
                        {!userAchievement?.isComplete && (
                          <>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress: {progress} / {requiredValue}</span>
                              <span>{Math.min(100, Math.round(progressPercentage))}%</span>
                            </div>
                            <Progress value={progressPercentage} className="h-1" />
                          </>
                        )}
                        
                        {userAchievement?.isComplete && (
                          <UIBadge variant="outline" className="mt-2 text-green-800 bg-green-100">
                            Completed {userAchievement.earnedAt ? new Date(userAchievement.earnedAt).toLocaleDateString() : 'recently'}
                          </UIBadge>
                        )}
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="col-span-3 text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No achievements found</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="badges">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {isLoadingBadges ? (
                Array(6).fill(0).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <Skeleton className="h-12 w-12 rounded-full mr-3" />
                        <div>
                          <Skeleton className="h-5 w-32 mb-1" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-6 w-12 ml-auto" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <Skeleton className="h-4 w-full mb-3" />
                      <Skeleton className="h-8 w-16 mt-3" />
                    </CardContent>
                  </Card>
                ))
              ) : userBadges && userBadges.length > 0 ? (
                userBadges.map(userBadge => (
                  <Card key={userBadge.id} className={
                    userBadge.badge.isRare 
                      ? "border-warning border-2" 
                      : "border-gray-200"
                  }>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <div 
                          className={`w-12 h-12 rounded-full mr-3 flex items-center justify-center ${
                            userBadge.badge.isRare 
                              ? 'bg-warning bg-opacity-10 text-warning-900' 
                              : 'bg-primary bg-opacity-10 text-primary-900'
                          }`}
                        >
                          <img 
                            src={userBadge.badge.iconUrl} 
                            alt={userBadge.badge.name} 
                            className="w-8 h-8" 
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base flex items-center">
                            {userBadge.badge.name}
                            {userBadge.badge.isRare && (
                              <UIBadge variant="outline" className="ml-2 text-xs text-amber-800 bg-amber-100">Rare</UIBadge>
                            )}
                          </CardTitle>
                          <CardDescription>
                            Level {userBadge.badge.level || 1} • {userBadge.badge.category}
                          </CardDescription>
                        </div>
                        
                        <div className="ml-2">
                          <Switch 
                            checked={userBadge.displayOnProfile === true}
                            onCheckedChange={(checked) => toggleBadgeDisplay(userBadge.badgeId, checked)}
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <p className="text-sm text-gray-600 mb-3">
                        {userBadge.badge.description}
                      </p>
                      
                      <UIBadge variant="outline" className="text-xs">
                        Earned {userBadge.earnedAt ? new Date(userBadge.earnedAt).toLocaleDateString() : 'recently'}
                      </UIBadge>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">
                    No badges earned yet. Complete achievements to earn badges!
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}