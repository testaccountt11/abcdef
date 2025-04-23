import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getTranslation } from '@/lib/translations';
import { useTheme } from '@/contexts/ThemeContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Award, Medal, Trophy, Lightbulb, BookOpen, Calendar, ArrowLeft } from 'lucide-react';
import UIBadge from '@/components/badges/UIBadge';
import AchievementCard from '@/components/achievements/AchievementCard';
import { User, UserStats, Achievement, UserBadge, ApiResponse } from '@/types';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export default function Profile() {
  const { language } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [, setLocation] = useLocation();
  
  // Fetch user data
  const { data: userData, isLoading: userLoading } = useQuery<ApiResponse<User>>({
    queryKey: ['/api/user'],
    retry: false,
  });
  
  // Fetch user achievements
  const { data: achievements, isLoading: achievementsLoading } = useQuery<Achievement[]>({
    queryKey: ['/api/achievements/user'],
    enabled: !!userData?.user?.id,
    retry: false,
  });
  
  // Fetch user badges
  const { data: badges, isLoading: badgesLoading } = useQuery<UserBadge[]>({
    queryKey: ['/api/badges/user'],
    enabled: !!userData?.user?.id,
    retry: false,
  });
  
  // Fetch user stats
  const { data: stats, isLoading: statsLoading } = useQuery<UserStats>({
    queryKey: ['/api/stats'],
    enabled: !!userData?.user?.id,
    retry: false,
  });
  
  const isLoading = userLoading || achievementsLoading || badgesLoading || statsLoading;
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!userData?.user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive">
          <AlertDescription>
            {getTranslation('errors.userNotFound', language)}
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  const user = userData.user;
  const fullName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : user.username;
  
  const userStats = stats || {
    coursesInProgress: 0,
    certificatesEarned: 0,
    mentorSessions: 0,
    opportunitiesSaved: 0
  };
  
  const userAchievements = achievements || [];
  const userBadges = badges || [];
  
  // Get displayed badges (badges with displayOnProfile = true)
  const displayedBadges = userBadges
    .filter((badge: UserBadge) => badge.displayOnProfile)
    .map((badge: UserBadge) => badge.badge);
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => setLocation('/dashboard')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {getTranslation('common.back', language)}
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>{getTranslation('profile.title', language)}</CardTitle>
              <CardDescription>{getTranslation('profile.subtitle', language)}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.profilePicture || ''} alt={fullName} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {user.firstName?.[0]}{user.lastName?.[0] || user.username?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-lg font-bold">{fullName}</h3>
                  <p className="text-muted-foreground text-sm">@{user.username}</p>
                  {user.email && <p className="text-sm mt-1">{user.email}</p>}
                </div>
                
                {/* Display Badges */}
                {displayedBadges.length > 0 && (
                  <div className="w-full mt-4">
                    <h4 className="text-sm font-semibold mb-2">{getTranslation('profile.displayedBadges', language)}</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {displayedBadges.map((badge) => (
                        <UIBadge 
                          key={badge.id} 
                          name={badge.name} 
                          description={badge.description}
                          type={badge.type} 
                          size="md"
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Stats */}
                <div className="w-full mt-2 space-y-3">
                  <h4 className="text-sm font-semibold">{getTranslation('profile.stats', language)}</h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 opacity-70" />
                      <span className="text-sm">{getTranslation('dashboard.coursesInProgress', language)}</span>
                    </div>
                    <Badge variant="outline">{userStats.coursesInProgress || 0}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2 opacity-70" />
                      <span className="text-sm">{getTranslation('dashboard.certificatesEarned', language)}</span>
                    </div>
                    <Badge variant="outline">{userStats.certificatesEarned || 0}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 opacity-70" />
                      <span className="text-sm">{getTranslation('dashboard.mentorSessions', language)}</span>
                    </div>
                    <Badge variant="outline">{userStats.mentorSessions || 0}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Lightbulb className="h-4 w-4 mr-2 opacity-70" />
                      <span className="text-sm">{getTranslation('dashboard.opportunitiesSaved', language)}</span>
                    </div>
                    <Badge variant="outline">{userStats.opportunitiesSaved || 0}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Main Content Area */}
          <div className="col-span-1 md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="overview">{getTranslation('profile.overview', language)}</TabsTrigger>
                <TabsTrigger value="achievements">{getTranslation('profile.achievements', language)}</TabsTrigger>
                <TabsTrigger value="badges">{getTranslation('profile.badges', language)}</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{getTranslation('profile.summary', language)}</CardTitle>
                    <CardDescription>{getTranslation('profile.summaryDesc', language)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress Overview */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <Trophy className="h-4 w-4 mr-2 text-primary" />
                            <span>{getTranslation('profile.achievementsCompleted', language)}</span>
                          </div>
                          <span>
                            {userAchievements.filter(a => a.isCompleted).length}/{userAchievements.length}
                          </span>
                        </div>
                        <Progress 
                          value={userAchievements.length ? 
                            (userAchievements.filter(a => a.isCompleted).length / userAchievements.length) * 100 
                            : 0
                          } 
                          className="h-2"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <Medal className="h-4 w-4 mr-2 text-primary" />
                            <span>{getTranslation('profile.badgesEarned', language)}</span>
                          </div>
                          <span>{userBadges.length}</span>
                        </div>
                        <Progress 
                          // This is a placeholder. You might want to adjust the logic based on your requirements
                          value={userBadges.length ? 50 : 0} 
                          className="h-2"
                        />
                      </div>
                      
                      {/* Recent Activity or Next Goals could go here */}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Recent Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle>{getTranslation('profile.recentAchievements', language)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userAchievements.length > 0 ? (
                      <div className="space-y-4">
                        {userAchievements
                          .sort((a, b) => {
                            // Sort by completion status first, then by progress
                            if (a.isCompleted && !b.isCompleted) return -1;
                            if (!a.isCompleted && b.isCompleted) return 1;
                            return b.progress - a.progress;
                          })
                          .slice(0, 3)
                          .map(achievement => (
                            <div 
                              key={achievement.achievementId} 
                              className="flex items-center justify-between border-b pb-3 last:border-0"
                            >
                              <div className="flex items-center space-x-2">
                                <Award className={`h-5 w-5 ${achievement.isCompleted ? 'text-primary' : 'text-muted-foreground'}`} />
                                <div>
                                  <h4 className="text-sm font-medium">{achievement.achievement.name}</h4>
                                  <p className="text-xs text-muted-foreground">{achievement.achievement.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                {achievement.isCompleted ? (
                                  <Badge variant="default" className="text-xs">
                                    {getTranslation('profile.completed', language)}
                                  </Badge>
                                ) : (
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm">{achievement.progress}%</span>
                                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-primary"
                                        style={{ width: `${achievement.progress}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-4">
                        {getTranslation('profile.noAchievements', language)}
                      </p>
                    )}
                  </CardContent>
                </Card>
                
                {/* Recent Badges */}
                <Card>
                  <CardHeader>
                    <CardTitle>{getTranslation('profile.recentBadges', language)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userBadges.length > 0 ? (
                      <div className="flex flex-wrap gap-3 justify-center">
                        {userBadges.slice(0, 6).map((userBadge) => (
                          <UIBadge 
                            key={userBadge.id}
                            name={userBadge.badge.name}
                            description={userBadge.badge.description}
                            type={userBadge.badge.type}
                            size="md"
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-4">
                        {getTranslation('profile.noBadges', language)}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Achievements Tab */}
              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle>{getTranslation('profile.allAchievements', language)}</CardTitle>
                    <CardDescription>
                      {getTranslation('profile.achievementsDesc', language)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userAchievements.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userAchievements.map(achievement => (
                          <AchievementCard 
                            key={achievement.achievementId}
                            achievement={achievement.achievement}
                            progress={achievement.progress}
                            isCompleted={achievement.isCompleted}
                            completedAt={achievement.completedAt}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">
                        {getTranslation('profile.noAchievements', language)}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Badges Tab */}
              <TabsContent value="badges">
                <Card>
                  <CardHeader>
                    <CardTitle>{getTranslation('profile.allBadges', language)}</CardTitle>
                    <CardDescription>
                      {getTranslation('profile.badgesDesc', language)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userBadges.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {userBadges.map((userBadge) => (
                          <div key={userBadge.id} className="flex flex-col items-center">
                            <UIBadge 
                              name={userBadge.badge.name}
                              description={userBadge.badge.description}
                              type={userBadge.badge.type}
                              size="lg"
                            />
                            <div className="mt-2 text-center">
                              <h4 className="text-sm font-medium">{userBadge.badge.name}</h4>
                              <p className="text-xs text-muted-foreground">{userBadge.badge.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">
                        {getTranslation('profile.noBadges', language)}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}