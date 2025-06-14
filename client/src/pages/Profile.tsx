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
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';
import { 
  Loader2, Award, Medal, Trophy, Lightbulb, BookOpen, Calendar, ArrowLeft,
  Phone, MapPin, Globe, Mail, Pencil, Plus, School, Languages,
  Linkedin, Github, MessageCircle, Phone as PhoneIcon, Share2, Edit
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
import type { User, UserStats, Achievement, UserBadge, ApiResponse, Skill, Education, Language, Project, NewSkill, NewEducation, NewLanguage, NewProject } from '@/types';
import { useLocation } from 'wouter';
import SkillCard from '@/components/profile/SkillCard';
import SkillForm from '@/components/profile/SkillForm';
import EducationCard from '@/components/profile/EducationCard';
import EducationForm from '@/components/profile/EducationForm';
import LanguageCard from '@/components/profile/LanguageCard';
import LanguageForm from '@/components/profile/LanguageForm';
import ProjectCard from '@/components/profile/ProjectCard';
import ProjectForm from '@/components/profile/ProjectForm';
import { IconBrandLinkedin, IconBrandGithub, IconBrandTelegram, IconBrandWhatsapp } from '@tabler/icons-react';
import { useAuthContext } from '@/contexts/AuthContext';
import ProfileStats from '@/components/profile/ProfileStats';
import ProfileAchievements from '@/components/profile/ProfileAchievements';
import { useLanguage } from "@/hooks/useLanguage";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";

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

const languageFormSchema = z.object({
  name: z.string().min(1, 'Language name is required'),
  level: z.enum(['basic', 'intermediate', 'advanced', 'native']),
  certificate: z.string().optional(),
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
  const { user: authUser } = useAuth();
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

  // Use authenticated user's ID if no userId prop is provided
  const currentUserId = userId || authUser?.id;

  // Queries
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user', currentUserId],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${currentUserId}`);
      if (!response.ok) {
        throw new Error(getTranslation('errors.userNotFound', language));
      }
      return response.json();
    },
    enabled: !!currentUserId, // Only run query if we have a user ID
  });

  const { data: skills = [], isLoading: isLoadingSkills } = useQuery({
    queryKey: ['skills', currentUserId],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${currentUserId}/skills`);
      if (!response.ok) throw new Error('Failed to fetch skills');
      return response.json();
    },
    enabled: !!currentUserId,
  });

  const { data: education = [], isLoading: isLoadingEducation } = useQuery({
    queryKey: ['education', currentUserId],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${currentUserId}/education`);
      if (!response.ok) throw new Error('Failed to fetch education');
      return response.json();
    },
    enabled: !!currentUserId,
  });

  const { data: languages = [], isLoading: isLoadingLanguages } = useQuery({
    queryKey: ['languages', currentUserId],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${currentUserId}/languages`);
      if (!response.ok) throw new Error('Failed to fetch languages');
      return response.json();
    },
    enabled: !!currentUserId,
  });

  const { data: projects = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ['projects', currentUserId],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${currentUserId}/projects`);
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
      const response = await fetch(`/api/profile/${currentUserId}/stats`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    },
    enabled: !!currentUserId,
  });

  const { data: achievements = [], isLoading: isLoadingAchievements } = useQuery({
    queryKey: ['achievements', currentUserId],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${currentUserId}/achievements`);
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

  const isOwner = currentUserId === authUser?.id;

  if (isLoadingUser || isLoadingSkills || isLoadingEducation || isLoadingLanguages || 
      isLoadingProjects || isLoadingStats || isLoadingAchievements) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }
  
  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Alert>
            <AlertDescription>User not found</AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
            <p className="text-muted-foreground">
              {user.title} at {user.company}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            {isOwner && (
              <Button variant="outline" size="sm" onClick={() => setLocation('/settings')}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
        
        <Separator />

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Profile info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.firstName[0]}{user.lastName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{user.firstName} {user.lastName}</CardTitle>
                    <CardDescription>{user.title} at {user.company}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.bio && (
                  <p className="text-sm text-muted-foreground">{user.bio}</p>
                )}
                <div className="space-y-2">
                  {user.location && (
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      {user.location}
                    </div>
                  )}
                  {user.email && (
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2" />
                      <a href={`mailto:${user.email}`} className="hover:underline">{user.email}</a>
                    </div>
                  )}
                  {user.phone && (
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2" />
                      <a href={`tel:${user.phone}`} className="hover:underline">{user.phone}</a>
                    </div>
                  )}
                  {user.website && (
                    <div className="flex items-center text-sm">
                      <Globe className="h-4 w-4 mr-2" />
                      <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{user.website}</a>
                    </div>
                  )}
                </div>
                <div className="flex space-x-4">
                  {user.linkedin && (
                    <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                      <IconBrandLinkedin className="h-4 w-4" />
                    </a>
                  )}
                  {user.github && (
                    <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                      <IconBrandGithub className="h-4 w-4" />
                    </a>
                  )}
                  {user.telegram && (
                    <a href={user.telegram} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                      <IconBrandTelegram className="h-4 w-4" />
                    </a>
                  )}
                  {user.whatsapp && (
                    <a href={user.whatsapp} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600">
                      <IconBrandWhatsapp className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Stats Card */}
            <ProfileStats stats={stats} language={language} />
            
            {/* Achievements Card */}
            <ProfileAchievements achievements={achievements} language={language} />
            
            {/* Languages */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <Languages className="h-4 w-4 inline-block mr-2" />
                  Languages
                </CardTitle>
                {isOwner && (
                  <Button variant="ghost" size="sm" onClick={() => setIsAddLanguageOpen(true)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {languages.map((language: Language) => (
                  <LanguageCard
                    key={language.id!}
                    language={language}
                    onEdit={() => setEditingLanguage(language)}
                    onDelete={() => deleteLanguage.mutate(language.id!)}
                    isOwner={isOwner}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="md:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Skills overview */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle>Skills</CardTitle>
                      <CardDescription>Skills you've learned</CardDescription>
                    </div>
                    {isOwner && (
                      <Button variant="outline" size="sm" onClick={() => setIsAddSkillOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills.slice(0, 4).map((skill: Skill) => (
                      <SkillCard
                        key={skill.id!}
                        skill={skill}
                        onEdit={() => setEditingSkill(skill)}
                        onDelete={() => deleteSkill.mutate(skill.id!)}
                        isOwner={isOwner}
                      />
                    ))}
                    {skills.length > 4 && (
                      <Button 
                        variant="ghost" 
                        className="w-full h-full border-2 border-dashed"
                        onClick={() => setActiveTab('skills')}
                      >
                        View More
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Education overview */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle>Education</CardTitle>
                      <CardDescription>Educational background</CardDescription>
                    </div>
                    {isOwner && (
                      <Button variant="outline" size="sm" onClick={() => setIsAddEducationOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {education.slice(0, 2).map((edu: Education) => (
                      <EducationCard
                        key={edu.id!}
                        education={edu}
                        onEdit={() => setEditingEducation(edu)}
                        onDelete={() => deleteEducation.mutate(edu.id!)}
                        isOwner={isOwner}
                      />
                    ))}
                    {education.length > 2 && (
                      <Button 
                        variant="ghost" 
                        className="w-full border-2 border-dashed"
                        onClick={() => setActiveTab('education')}
                      >
                        View More
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Projects overview */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle>Projects</CardTitle>
                      <CardDescription>Projects you've worked on</CardDescription>
                    </div>
                    {isOwner && (
                      <Button variant="outline" size="sm" onClick={() => setIsAddProjectOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Project
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {projects.slice(0, 2).map((project: Project) => (
                      <ProjectCard
                        key={project.id!}
                        project={project}
                        onEdit={() => setEditingProject(project)}
                        onDelete={() => deleteProject.mutate(project.id!)}
                        isOwner={isOwner}
                      />
                    ))}
                    {projects.length > 2 && (
                      <Button 
                        variant="ghost" 
                        className="w-full border-2 border-dashed"
                        onClick={() => setActiveTab('projects')}
                      >
                        View More
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle>Education</CardTitle>
                      <CardDescription>Educational background</CardDescription>
                    </div>
                    <Button onClick={() => setIsAddEducationOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {education.map((edu: Education) => (
                      <EducationCard
                        key={edu.id!}
                        education={edu as Education}
                        onEdit={() => setEditingEducation(edu)}
                        onDelete={() => deleteEducation.mutate(edu.id!)}
                      />
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="skills" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle>Skills</CardTitle>
                      <CardDescription>Skills you've learned</CardDescription>
                    </div>
                    <Button onClick={() => setIsAddSkillOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Skill
                    </Button>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills.map((skill: Skill) => (
                      <SkillCard
                        key={skill.id!}
                        skill={skill as Skill}
                        onEdit={() => setEditingSkill(skill)}
                        onDelete={() => deleteSkill.mutate(skill.id!)}
                      />
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="projects" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle>Projects</CardTitle>
                      <CardDescription>Projects you've worked on</CardDescription>
                    </div>
                    <Button onClick={() => setIsAddProjectOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {projects.map((project: Project) => (
                      <ProjectCard
                        key={project.id!}
                        project={project as Project}
                        onEdit={() => setEditingProject(project)}
                        onDelete={() => deleteProject.mutate(project.id!)}
                      />
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={isAddSkillOpen} onOpenChange={setIsAddSkillOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Skill</DialogTitle>
            <DialogDescription>Add a new skill</DialogDescription>
          </DialogHeader>
          <SkillForm 
            open={isAddSkillOpen}
            onClose={() => setIsAddSkillOpen(false)}
            onSubmit={(data) => createSkill.mutate(data)}
            initialData={undefined}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(editingSkill)} onOpenChange={() => setEditingSkill(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Skill</DialogTitle>
          </DialogHeader>
          {editingSkill && (
            <SkillForm
              open={Boolean(editingSkill)}
              onClose={() => setEditingSkill(null)}
              onSubmit={(data) => updateSkill.mutate({ ...data, id: editingSkill.id })}
              initialData={editingSkill}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAddEducationOpen} onOpenChange={setIsAddEducationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Education</DialogTitle>
            <DialogDescription>Add a new educational experience</DialogDescription>
          </DialogHeader>
          <EducationForm
            open={isAddEducationOpen}
            onClose={() => setIsAddEducationOpen(false)}
            onSubmit={(data) => createEducation.mutate(data)}
            initialData={undefined}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(editingEducation)} onOpenChange={() => setEditingEducation(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Education</DialogTitle>
          </DialogHeader>
          {editingEducation && (
            <EducationForm
              open={Boolean(editingEducation)}
              onClose={() => setEditingEducation(null)}
              onSubmit={(data) => updateEducation.mutate({ ...data, id: editingEducation.id })}
              initialData={editingEducation}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAddLanguageOpen} onOpenChange={setIsAddLanguageOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Language</DialogTitle>
            <DialogDescription>Add a new language</DialogDescription>
          </DialogHeader>
          <LanguageForm
            open={isAddLanguageOpen}
            onClose={() => setIsAddLanguageOpen(false)}
            onSubmit={(data) => createLanguage.mutate(data)}
            initialData={undefined}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(editingLanguage)} onOpenChange={() => setEditingLanguage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Language</DialogTitle>
          </DialogHeader>
          {editingLanguage && (
            <LanguageForm
              open={Boolean(editingLanguage)}
              onClose={() => setEditingLanguage(null)}
              onSubmit={(data) => updateLanguage.mutate({ ...data, id: editingLanguage.id })}
              initialData={editingLanguage}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
            <DialogDescription>Add a new project</DialogDescription>
          </DialogHeader>
          <ProjectForm
            open={isAddProjectOpen}
            onClose={() => setIsAddProjectOpen(false)}
            onSubmit={(data) => createProject.mutate(data)}
            initialData={undefined}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(editingProject)} onOpenChange={() => setEditingProject(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          {editingProject && (
            <ProjectForm
              open={Boolean(editingProject)}
              onClose={() => setEditingProject(null)}
              onSubmit={(data) => updateProject.mutate({ ...data, id: editingProject.id })}
              initialData={editingProject}
            />
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}