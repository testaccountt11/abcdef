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
import { 
  Loader2, Award, Medal, Trophy, Lightbulb, BookOpen, Calendar, ArrowLeft,
  Phone, MapPin, Globe, Mail, Pencil, Plus, School, Languages,
  Linkedin, Github, MessageCircle, Phone as PhoneIcon
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

export default function Profile({ userId }: ProfileProps) {
  const { language } = useTheme();
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

  // Queries
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return response.json();
    },
  });

  const { data: skills = [], isLoading: isLoadingSkills } = useQuery({
    queryKey: ['skills', userId],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${userId}/skills`);
      if (!response.ok) throw new Error('Failed to fetch skills');
      return response.json();
    },
  });

  const { data: education = [], isLoading: isLoadingEducation } = useQuery({
    queryKey: ['education', userId],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${userId}/education`);
      if (!response.ok) throw new Error('Failed to fetch education');
      return response.json();
    },
  });

  const { data: languages = [], isLoading: isLoadingLanguages } = useQuery({
    queryKey: ['languages', userId],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${userId}/languages`);
      if (!response.ok) throw new Error('Failed to fetch languages');
      return response.json();
    },
  });

  const { data: projects = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ['projects', userId],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${userId}/projects`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      return response.json();
    },
  });

  // Mutations
  const createSkill = useMutation({
    mutationFn: (data: NewSkill) => 
      apiCall<Skill>('POST', `/api/profile/${userId}/skills`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills', userId] });
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
      queryClient.invalidateQueries({ queryKey: ['skills', userId] });
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
      queryClient.invalidateQueries({ queryKey: ['skills', userId] });
      toast({ title: 'Skill deleted successfully' });
    },
  });

  const createEducation = useMutation({
    mutationFn: (data: NewEducation) => 
      apiCall<Education>('POST', `/api/profile/${userId}/education`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['education', userId] });
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
      queryClient.invalidateQueries({ queryKey: ['education', userId] });
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
      queryClient.invalidateQueries({ queryKey: ['education', userId] });
      toast({ title: 'Education deleted successfully' });
    },
  });

  const createLanguage = useMutation({
    mutationFn: (data: NewLanguage) => 
      apiCall<Language>('POST', `/api/profile/${userId}/languages`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages', userId] });
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
      queryClient.invalidateQueries({ queryKey: ['languages', userId] });
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
      queryClient.invalidateQueries({ queryKey: ['languages', userId] });
      toast({ title: 'Language deleted successfully' });
    },
  });

  const createProject = useMutation({
    mutationFn: (data: NewProject) => 
      apiCall<Project>('POST', `/api/profile/${userId}/projects`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', userId] });
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
      queryClient.invalidateQueries({ queryKey: ['projects', userId] });
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
      queryClient.invalidateQueries({ queryKey: ['projects', userId] });
      toast({ title: 'Project deleted successfully' });
    },
  });

  if (isLoadingUser || isLoadingSkills || isLoadingEducation || isLoadingLanguages || isLoadingProjects) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert>
          <AlertDescription>User not found</AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - Profile info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.profileImage} />
                  <AvatarFallback>{user.firstName[0]}{user.lastName?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{user.firstName} {user.lastName}</CardTitle>
                  <CardDescription>{user.position} at {user.company}</CardDescription>
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
          
          {/* Languages */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <Languages className="h-4 w-4 inline-block mr-2" />
                {getTranslation('profile.languages', language)}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsAddLanguageOpen(true)}>
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {languages.map((language: Language) => (
                <LanguageCard
                  key={language.id!}
                  language={language as Language}
                  onEdit={() => setEditingLanguage(language)}
                  onDelete={() => deleteLanguage.mutate(language.id!)}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="md:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
                <TabsTrigger value="overview">{getTranslation('profile.overview', language)}</TabsTrigger>
              <TabsTrigger value="education">{getTranslation('profile.education', language)}</TabsTrigger>
              <TabsTrigger value="skills">{getTranslation('profile.skills', language)}</TabsTrigger>
              <TabsTrigger value="projects">{getTranslation('profile.projects', language)}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
              {/* Skills overview */}
                <Card>
                  <CardHeader>
                  <CardTitle>{getTranslation('profile.skills', language)}</CardTitle>
                  <CardDescription>{getTranslation('profile.skillsDesc', language)}</CardDescription>
                  </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.slice(0, 4).map((skill: Skill) => (
                    <SkillCard
                      key={skill.id!}
                      skill={skill as Skill}
                      onEdit={() => setEditingSkill(skill)}
                      onDelete={() => deleteSkill.mutate(skill.id!)}
                    />
                  ))}
                  </CardContent>
                </Card>
                
              {/* Education overview */}
                <Card>
                  <CardHeader>
                  <CardTitle>{getTranslation('profile.education', language)}</CardTitle>
                  <CardDescription>{getTranslation('profile.educationDesc', language)}</CardDescription>
                  </CardHeader>
                <CardContent className="space-y-4">
                  {education.slice(0, 2).map((edu: Education) => (
                    <EducationCard
                      key={edu.id!}
                      education={edu as Education}
                      onEdit={() => setEditingEducation(edu)}
                      onDelete={() => deleteEducation.mutate(edu.id!)}
                    />
                  ))}
                  </CardContent>
                </Card>
                
              {/* Projects overview */}
                <Card>
                  <CardHeader>
                  <CardTitle>{getTranslation('profile.projects', language)}</CardTitle>
                  <CardDescription>{getTranslation('profile.projectsDesc', language)}</CardDescription>
                  </CardHeader>
                <CardContent className="space-y-4">
                  {projects.slice(0, 2).map((project: Project) => (
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

            <TabsContent value="education" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle>{getTranslation('profile.education', language)}</CardTitle>
                    <CardDescription>{getTranslation('profile.educationDesc', language)}</CardDescription>
                      </div>
                  <Button onClick={() => setIsAddEducationOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    {getTranslation('profile.addEducation', language)}
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
                    <CardTitle>{getTranslation('profile.skills', language)}</CardTitle>
                    <CardDescription>{getTranslation('profile.skillsDesc', language)}</CardDescription>
                  </div>
                  <Button onClick={() => setIsAddSkillOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    {getTranslation('profile.addSkill', language)}
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
                    <CardTitle>{getTranslation('profile.projects', language)}</CardTitle>
                    <CardDescription>{getTranslation('profile.projectsDesc', language)}</CardDescription>
                  </div>
                  <Button onClick={() => setIsAddProjectOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    {getTranslation('profile.addProject', language)}
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

      {/* Dialogs */}
      <Dialog open={isAddSkillOpen} onOpenChange={setIsAddSkillOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{getTranslation('profile.addSkill', language)}</DialogTitle>
            <DialogDescription>{getTranslation('profile.addSkillDesc', language)}</DialogDescription>
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
            <DialogTitle>{getTranslation('profile.editSkill', language)}</DialogTitle>
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
            <DialogTitle>{getTranslation('profile.addEducation', language)}</DialogTitle>
            <DialogDescription>{getTranslation('profile.addEducationDesc', language)}</DialogDescription>
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
            <DialogTitle>{getTranslation('profile.editEducation', language)}</DialogTitle>
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
            <DialogTitle>{getTranslation('profile.addLanguage', language)}</DialogTitle>
            <DialogDescription>{getTranslation('profile.addLanguageDesc', language)}</DialogDescription>
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
            <DialogTitle>{getTranslation('profile.editLanguage', language)}</DialogTitle>
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
            <DialogTitle>{getTranslation('profile.addProject', language)}</DialogTitle>
            <DialogDescription>{getTranslation('profile.addProjectDesc', language)}</DialogDescription>
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
            <DialogTitle>{getTranslation('profile.editProject', language)}</DialogTitle>
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
    </div>
  );
}