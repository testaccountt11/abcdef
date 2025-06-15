import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getTranslation } from '@/lib/translations';
import { useTheme } from '@/contexts/ThemeContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AppLayout from '@/components/layout/AppLayout';
import { Separator } from '@/components/ui/separator';
import { 
  Loader2, Award, Medal, Trophy, Lightbulb, BookOpen, Calendar, ArrowLeft,
  Phone, MapPin, Globe, Mail, Pencil, Plus, School, Languages,
  Linkedin, Github, MessageCircle, Phone as PhoneIcon, Share2, Edit,
  Briefcase, GraduationCap, User2, Link as LinkIcon
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import UIBadge from '@/components/badges/UIBadge';
import AchievementCard from '@/components/achievements/AchievementCard';
import type { 
  User, 
  UserStats, 
  Achievement, 
  UserBadge, 
  ApiResponse, 
  Skill, 
  Education, 
  Language, 
  Project, 
  NewSkill, 
  NewEducation, 
  NewLanguage, 
  NewProject 
} from '@/types';
import { useLocation } from 'wouter';
import SkillCard from '@/components/profile/SkillCard';
import SkillForm from '@/components/profile/SkillForm';
import EducationCard from '@/components/profile/EducationCard';
import EducationForm from '@/components/profile/EducationForm';
import LanguageCard from '@/components/profile/LanguageCard';
import LanguageForm from '@/components/profile/LanguageForm';
import ProjectCard from '@/components/profile/ProjectCard';
import { ProjectForm } from "@/components/profile/ProjectForm";
import { IconBrandLinkedin, IconBrandGithub, IconBrandTelegram, IconBrandWhatsapp } from '@tabler/icons-react';
import { useAuthContext } from '@/contexts/AuthContext.tsx';
import ProfileStats from '@/components/profile/ProfileStats';
import ProfileAchievements from '@/components/profile/ProfileAchievements';
import { useLanguage } from "@/hooks/useLanguage";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import ProfileSkills from '@/components/profile/ProfileSkills';
import { languageLevels } from '@shared/schema';
import { languageFormSchema, type LanguageFormData } from '@/components/profile/LanguageForm';
import { useTranslations } from '@/hooks/use-translations';



// Form schemas
const skillFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  level: z.number().min(1).max(5),
  yearsOfExperience: z.number().optional(),
});

const educationFormSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  fieldOfStudy: z.string().min(1, 'Field of study is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isPresent: z.boolean().default(false),
  gpa: z.string().optional(),
  activities: z.string().optional(),
  description: z.string().optional(),
});

const projectFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().optional(),
  projectUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  technologies: z.array(z.string()),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isPresent: z.boolean().default(false),
});

type SkillFormData = z.infer<typeof skillFormSchema>;
type EducationFormData = z.infer<typeof educationFormSchema>;
type ProjectFormData = z.infer<typeof projectFormSchema>;

interface ProfileProps {
  userId?: string;
}

async function apiCall<T>(method: string, endpoint: string, data?: any): Promise<T> {
  const response = await fetch(endpoint, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined,
  });
  if (!response.ok) throw new Error('API call failed');
  return response.json();
}

export default function Profile() {
  const { userId } = useParams();
  const { language } = useLanguage();
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [isAddEducationOpen, setIsAddEducationOpen] = useState(false);
  const [isAddLanguageOpen, setIsAddLanguageOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { theme } = useTheme();
  const { t } = useTranslations();

  // Use authenticated user's ID if no userId prop is provided
  const currentUserId = userId || user?.id;

  // Queries
  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user', currentUserId],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${currentUserId}`, {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error(getTranslation('errors.userNotFound', language));
      }
      return response.json();
    },
    enabled: !!currentUserId,
  });

  const { data: skills = [], isLoading: isLoadingSkills } = useQuery({
    queryKey: ['skills', currentUserId],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${currentUserId}/skills`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch skills');
      return response.json();
    },
    enabled: !!currentUserId,
  });

  const { data: education = [], isLoading: isLoadingEducation } = useQuery({
    queryKey: ['education', currentUserId],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${currentUserId}/education`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch education');
      return response.json();
    },
    enabled: !!currentUserId,
  });

  const { data: languages = [], isLoading: isLoadingLanguages } = useQuery({
    queryKey: ['languages', currentUserId],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${currentUserId}/languages`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch languages');
      return response.json();
    },
    enabled: !!currentUserId,
  });

  const { data: projects = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ['projects', currentUserId],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${currentUserId}/projects`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch projects');
      return response.json();
    },
    enabled: !!currentUserId,
  });

  // Add new queries for stats and achievements
  const { data: stats = { coursesInProgress: 0, certificatesEarned: 0, mentorSessions: 0, opportunitiesSaved: 0 }, 
    isLoading: isLoadingStats 
  } = useQuery({
    queryKey: ['stats', currentUserId],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${currentUserId}/stats`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    },
    enabled: !!currentUserId,
  });

  const { data: achievements = [], isLoading: isLoadingAchievements } = useQuery({
    queryKey: ['achievements', currentUserId],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${currentUserId}/achievements`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch achievements');
      return response.json();
    },
    enabled: !!currentUserId,
  });

  // Mutations
  const createSkill = useMutation({
    mutationFn: (data: NewSkill) => 
      apiCall<Skill>('POST', `/api/profile/${currentUserId}/skills`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills', currentUserId] });
      setIsAddSkillOpen(false);
    },
  });

  const updateSkill = useMutation({
    mutationFn: async ({ id, ...skill }: Skill) => {
      const response = await fetch(`/api/profile/skills/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skill),
      });
      if (!response.ok) throw new Error('Failed to update skill');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills', currentUserId] });
      setEditingSkill(null);
      toast({ title: 'Skill updated successfully' });
    },
  });

  const deleteSkill = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/profile/skills/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete skill');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills', currentUserId] });
      toast({ title: 'Skill deleted successfully' });
    },
  });

  const createEducation = useMutation({
    mutationFn: (data: NewEducation) => 
      apiCall<Education>('POST', `/api/profile/${currentUserId}/education`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['education', currentUserId] });
      setIsAddEducationOpen(false);
    },
  });

  const updateEducation = useMutation({
    mutationFn: async ({ id, ...education }: Education) => {
      const response = await fetch(`/api/profile/education/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(education),
      });
      if (!response.ok) throw new Error('Failed to update education');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['education', currentUserId] });
      setEditingEducation(null);
      toast({ title: 'Education updated successfully' });
    },
  });

  const deleteEducation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/profile/education/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete education');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['education', currentUserId] });
      toast({ title: 'Education deleted successfully' });
    },
  });

  const createLanguage = useMutation({
    mutationFn: (data: NewLanguage) => 
      apiCall<Language>('POST', `/api/profile/${currentUserId}/languages`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages', currentUserId] });
      setIsAddLanguageOpen(false);
    },
  });

  const updateLanguage = useMutation({
    mutationFn: async ({ id, ...language }: Language) => {
      const response = await fetch(`/api/profile/languages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(language),
      });
      if (!response.ok) throw new Error('Failed to update language');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages', currentUserId] });
      setEditingLanguage(null);
      toast({ title: 'Language updated successfully' });
    },
  });

  const deleteLanguage = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/profile/languages/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete language');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages', currentUserId] });
      toast({ title: 'Language deleted successfully' });
    },
  });

  const createProject = useMutation({
    mutationFn: (data: NewProject) => 
      apiCall<Project>('POST', `/api/profile/${currentUserId}/projects`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', currentUserId] });
      setIsAddProjectOpen(false);
    },
  });

  const updateProject = useMutation({
    mutationFn: async ({ id, ...project }: Project) => {
      const response = await fetch(`/api/profile/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      if (!response.ok) throw new Error('Failed to update project');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', currentUserId] });
      setEditingProject(null);
      toast({ title: 'Project updated successfully' });
    },
  });

  const deleteProject = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/profile/projects/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete project');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', currentUserId] });
      toast({ title: 'Project deleted successfully' });
    },
  });

  const isOwner = currentUserId === user?.id;

  const handleAddSkill = (data: z.infer<typeof skillFormSchema>) => {
    if (!user?.id) return;
    const newSkill: NewSkill = {
      ...data,
      userId: user.id
    };
    createSkill.mutate(newSkill);
  };

  const handleUpdateSkill = (data: z.infer<typeof skillFormSchema>, skillId: number) => {
    if (!user?.id) return;
    const updatedSkill: Skill = {
      ...data,
      id: skillId,
      userId: user.id
    };
    updateSkill.mutate(updatedSkill);
  };

  const handleAddEducation = (data: z.infer<typeof educationFormSchema>) => {
    if (!user?.id) return;
    const newEducation: NewEducation = {
      ...data,
      userId: user.id
    };
    createEducation.mutate(newEducation);
  };

  const handleUpdateEducation = (data: z.infer<typeof educationFormSchema>, educationId: number) => {
    if (!user?.id) return;
    const updatedEducation: Education = {
      ...data,
      id: educationId,
      userId: user.id
    };
    updateEducation.mutate(updatedEducation);
  };

  const handleAddLanguage = (data: LanguageFormData) => {
    if (!currentUserId) return;
    
    createLanguage.mutate({
      name: data.name,
      level: data.level,
      certificate: data.certificate,
      userId: Number(currentUserId)
    });
  };

  const handleUpdateLanguage = (data: LanguageFormData, languageId: number) => {
    if (!currentUserId) return;
    
    updateLanguage.mutate({
      id: languageId,
      name: data.name as string,
      level: data.level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Native",
      certificate: data.certificate as string | undefined,
      userId: Number(currentUserId)
    });
  };

  const handleAddProject = (data: z.infer<typeof projectFormSchema>) => {
    if (!user?.id) return;
    const newProject: NewProject = {
      ...data,
      userId: user.id
    };
    createProject.mutate(newProject);
  };

  const handleUpdateProject = (data: z.infer<typeof projectFormSchema>, projectId: number) => {
    if (!user?.id) return;
    const updatedProject: Project = {
      ...data,
      id: projectId,
      userId: user.id
    };
    updateProject.mutate(updatedProject);
  };

  if (isLoadingUser || isLoadingSkills || isLoadingEducation || isLoadingLanguages || 
      isLoadingProjects || isLoadingStats || isLoadingAchievements) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AppLayout>
    );
  }
  
  if (!userData) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Alert>
            <AlertDescription>{getTranslation('errors.userNotFound', language)}</AlertDescription>
          </Alert>
        </div>
      </AppLayout>
    );
  }
  
  return (
    <AppLayout>
      {/* Gradient background */}
      <div className={`fixed inset-0 overflow-hidden pointer-events-none -z-50 ${theme === 'dark' ? 'bg-gradient-background' : ''}`}>
        <div className="absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-br from-primary/5 via-transparent to-indigo-400/5 dark:from-primary/10 dark:via-transparent dark:to-indigo-400/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-tr from-blue-400/5 via-transparent to-primary/5 dark:from-blue-500/10 dark:via-transparent dark:to-primary/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback>
                  <User2 className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">{userData.name}</h1>
                    {userData.title && (
                      <p className="text-muted-foreground">{userData.title}</p>
                    )}
                  </div>
                  {isOwner && (
                    <Button variant="default" size="sm" className="gap-2">
                      <Edit className="w-4 h-4" />
                      {t('profile.edit')} {/* Өңдеу */}
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userData.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{userData.location}</span>
                    </div>
                  )}
                  {userData.email && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${userData.email}`} className="hover:text-primary">{userData.email}</a>
                    </div>
                  )}
                  {userData.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${userData.phone}`} className="hover:text-primary">{userData.phone}</a>
                    </div>
                  )}
                  {userData.website && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Globe className="w-4 h-4" />
                      <a href={userData.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        {userData.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                {(userData.linkedin || userData.github) && (
                  <div className="flex gap-4 mt-4">
                    {userData.linkedin && (
                      <a href={userData.linkedin} target="_blank" rel="noopener noreferrer" 
                         className="text-muted-foreground hover:text-primary">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {userData.github && (
                      <a href={userData.github} target="_blank" rel="noopener noreferrer"
                         className="text-muted-foreground hover:text-primary">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* About */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>{t('profile.about')}</CardTitle> {/* Өзім туралы */}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {userData.bio || t('profile.noBio')} {/* Өзіңіз туралы ақпарат қосылмаған */}
                </p>
              </CardContent>
            </Card>

            {/* Skills */}
            <ProfileSkills skills={skills} />

            {/* Education */}
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  {t('profile.education')} {/* Білім */}
                </CardTitle>
                {isOwner && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsAddEducationOpen(true)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {userData.education && userData.education.length > 0 ? (
                  userData.education.map((edu: any, index: number) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{edu.institution}</h4>
                          <p className="text-sm text-muted-foreground">{edu.degree}</p>
                          <p className="text-sm text-muted-foreground">
                            {edu.startDate} - {edu.endDate || t('profile.present')} {/* Қазіргі уақытта */}
                          </p>
                        </div>
                        {isOwner && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setEditingEducation(edu)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      {edu.description && (
                        <p className="text-sm mt-2 text-muted-foreground">{edu.description}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">{t('profile.noEducation')}</p>
                )}
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  {t('profile.experience')}
                </CardTitle>
                {isOwner && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsAddProjectOpen(true)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {userData.experience && userData.experience.length > 0 ? (
                  userData.experience.map((exp: any, index: number) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{exp.title}</h4>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">
                            {exp.startDate} - {exp.endDate || t('profile.present')}
                          </p>
                        </div>
                        {isOwner && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setEditingProject(exp)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      {exp.description && (
                        <p className="text-sm mt-2 text-muted-foreground">{exp.description}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">{t('profile.noExperience')}</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Card */}
            <ProfileStats stats={stats} />
            
            {/* Achievements Card */}
            <ProfileAchievements achievements={achievements} />

            {/* Projects and Certificates */}
            <Card className="glass-card">
              <Tabs defaultValue="projects" className="w-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{t('profile.portfolio')}</CardTitle> {/* Портфолио */}
                  <TabsList>
                    <TabsTrigger value="projects">{t('profile.projects')}</TabsTrigger> {/* Жобалар */}
                    <TabsTrigger value="certificates">{t('profile.certificates')}</TabsTrigger> {/* Сертификаттар */}
                  </TabsList>
                  {isOwner && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setIsAddProjectOpen(true)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <TabsContent value="projects">
                    {userData.projects && userData.projects.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userData.projects.map((project: any, index: number) => (
                          <Card key={index} className="bg-card/50">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium">{project.title}</h4>
                                {isOwner && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => setEditingProject(project)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {project.technologies.map((tech: string, techIndex: number) => (
                                  <Badge key={techIndex} variant="secondary">{tech}</Badge>
                                ))}
                              </div>
                              {project.url && (
                                <a href={project.url} target="_blank" rel="noopener noreferrer" 
                                   className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                                  <LinkIcon className="w-4 h-4" />
                                  {t('profile.viewProject')}
                                </a>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">{t('profile.noProjects')}</p>
                    )}
                  </TabsContent>
                  <TabsContent value="certificates">
                    {userData.certificates && userData.certificates.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userData.certificates.map((cert: any, index: number) => (
                          <Card key={index} className="bg-card/50">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium">{cert.title}</h4>
                                {isOwner && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => setEditingProject(cert)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                              <p className="text-sm text-muted-foreground">{cert.issueDate}</p>
                              {cert.url && (
                                <a href={cert.url} target="_blank" rel="noopener noreferrer" 
                                   className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-2">
                                  <LinkIcon className="w-4 h-4" />
                                  {t('profile.viewCertificate')}
                                </a>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">{t('profile.noCertificates')}</p>
                    )}
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>

        {/* Dialogs */}
        <Dialog open={isAddSkillOpen} onOpenChange={setIsAddSkillOpen}>
          <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[425px]">
            <DialogHeader className="sticky top-0 bg-background z-10 pb-4">
              <DialogTitle>{t('profile.addSkill')}</DialogTitle> {/* Дағды қосу */}
              <DialogDescription>{t('profile.skillsDesc')}</DialogDescription>
            </DialogHeader>
            <div className="pr-1">
              <SkillForm
                open={isAddSkillOpen}
                onClose={() => setIsAddSkillOpen(false)}
                onSubmit={handleAddSkill}
                initialData={undefined}
              />
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={Boolean(editingSkill)} onOpenChange={() => setEditingSkill(null)}>
          <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[425px]">
            <DialogHeader className="sticky top-0 bg-background z-10 pb-4">
              <DialogTitle>{t('profile.editSkill')}</DialogTitle>
            </DialogHeader>
            <div className="pr-1">
              {editingSkill && (
                <SkillForm
                  open={Boolean(editingSkill)}
                  onClose={() => setEditingSkill(null)}
                  onSubmit={(data) => handleUpdateSkill(data, editingSkill.id)}
                  initialData={editingSkill}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isAddEducationOpen} onOpenChange={setIsAddEducationOpen}>
          <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[425px]">
            <DialogHeader className="sticky top-0 bg-background z-10 pb-4">
              <DialogTitle>{t('profile.addEducation')}</DialogTitle>
              <DialogDescription>{t('profile.educationDesc')}</DialogDescription>
            </DialogHeader>
            <div className="pr-1">
              <EducationForm
                open={isAddEducationOpen}
                onClose={() => setIsAddEducationOpen(false)}
                onSubmit={handleAddEducation}
                initialData={undefined}
              />
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={Boolean(editingEducation)} onOpenChange={() => setEditingEducation(null)}>
          <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[425px]">
            <DialogHeader className="sticky top-0 bg-background z-10 pb-4">
              <DialogTitle>{t('profile.editEducation')}</DialogTitle>
            </DialogHeader>
            <div className="pr-1">
              {editingEducation && (
                <EducationForm
                  open={Boolean(editingEducation)}
                  onClose={() => setEditingEducation(null)}
                  onSubmit={(data) => handleUpdateEducation(data, editingEducation.id)}
                  initialData={editingEducation}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isAddLanguageOpen} onOpenChange={setIsAddLanguageOpen}>
          <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[425px]">
            <DialogHeader className="sticky top-0 bg-background z-10 pb-4">
              <DialogTitle>{t('profile.addLanguage')}</DialogTitle>
              <DialogDescription>{t('profile.languagesDesc')}</DialogDescription>
            </DialogHeader>
            <div className="pr-1">
              <LanguageForm
                onSubmit={handleAddLanguage}
                onClose={() => setIsAddLanguageOpen(false)}
                open={isAddLanguageOpen}
              />
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={Boolean(editingLanguage)} onOpenChange={() => setEditingLanguage(null)}>
          <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[425px]">
            <DialogHeader className="sticky top-0 bg-background z-10 pb-4">
              <DialogTitle>{t('profile.editLanguage')}</DialogTitle>
            </DialogHeader>
            <div className="pr-1">
              {editingLanguage && (
                <LanguageForm
                  onSubmit={(data) => handleUpdateLanguage(data, editingLanguage.id)}
                  onClose={() => setEditingLanguage(null)}
                  initialData={editingLanguage}
                  open={!!editingLanguage}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
          <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[425px]">
            <DialogHeader className="sticky top-0 bg-background z-10 pb-4">
              <DialogTitle>{t('profile.addProject')}</DialogTitle>
              <DialogDescription>{t('profile.projectDesc')}</DialogDescription>
            </DialogHeader>
            <div className="pr-1">
              <ProjectForm
                open={isAddProjectOpen}
                onClose={() => setIsAddProjectOpen(false)}
                onSubmit={handleAddProject}
                initialData={undefined}
              />
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={Boolean(editingProject)} onOpenChange={() => setEditingProject(null)}>
          <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[425px]">
            <DialogHeader className="sticky top-0 bg-background z-10 pb-4">
              <DialogTitle>{t('profile.editProject')}</DialogTitle>
            </DialogHeader>
            <div className="pr-1">
              {editingProject && (
                <ProjectForm
                  open={Boolean(editingProject)}
                  onClose={() => setEditingProject(null)}
                  onSubmit={(data: { title: string; description: string; technologies: string[]; startDate: string; isPresent: boolean; endDate?: string | undefined; projectUrl?: string | undefined; githubUrl?: string | undefined; imageUrl?: string | undefined; }) => handleUpdateProject(data, editingProject.id)}
                  initialData={editingProject}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}