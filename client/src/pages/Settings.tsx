import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useAuthContext } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslation } from '@/lib/translations';
import { apiRequest } from '@/lib/queryClient';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';

// Form validation schemas
const profileFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  profileImage: z.string().optional(),
});

type PasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function Settings() {
  const { user, login } = useAuthContext();
  const { toast } = useToast();
  const { language } = useTheme();
  const { t } = useTranslations();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(user?.profileImage || '');

  const passwordForm = useForm<PasswordFormValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
    resolver: (data, context, options) => {
      const errors: Record<string, { type: string; message: string }> = {};
      
      // Валидация currentPassword
      if (!data.currentPassword || data.currentPassword.length === 0) {
        errors.currentPassword = {
          type: 'required',
          message: "Current password is required"
        };
      }
      
      // Валидация newPassword
      if (data.newPassword.length < 8) {
        errors.newPassword = {
          type: 'minLength',
          message: getTranslation('auth.password.requirements.length', language)
        };
      } else if (!/[A-Z]/.test(data.newPassword)) {
        errors.newPassword = {
          type: 'pattern',
          message: getTranslation('auth.password.requirements.uppercase', language)
        };
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.newPassword)) {
        errors.newPassword = {
          type: 'pattern',
          message: getTranslation('auth.password.requirements.special', language)
        };
      }
      
      // Валидация confirmPassword
      if (data.newPassword !== data.confirmPassword) {
        errors.confirmPassword = {
          type: 'validate',
          message: getTranslation('auth.password.requirements.match', language)
        };
      }
      
      return {
        values: Object.keys(errors).length === 0 ? data : {},
        errors: Object.keys(errors).length === 0 ? {} : errors
      };
    }
  });

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      username: user?.username || '',
      profileImage: user?.profileImage || '',
    },
  });

  // Handle profile image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload-profile-picture', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to upload image');

      const data = await response.json();
      profileForm.setValue('profileImage', data.imageUrl);
      
      toast({
        title: 'Success',
        description: 'Profile picture updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to upload image',
        variant: 'destructive',
      });
    }
  };

  // Handle profile update
  const onProfileSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      const response = await apiRequest('PUT', '/api/user', data);
      const updatedUser = await response.json();
      login(updatedUser);
      
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password update
  const onPasswordSubmit = async (data: PasswordFormValues) => {
    setIsLoading(true);
    try {
      await apiRequest('PUT', '/api/user/password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      
      passwordForm.reset();
      
      toast({
        title: 'Success',
        description: 'Password updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update password',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <Alert className="my-8">
          <AlertDescription>
            {getTranslation('settings.notLoggedIn', language)}
          </AlertDescription>
        </Alert>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10">
        <div className="max-w-3xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">{getTranslation('settings.profile', language)}</TabsTrigger>
              <TabsTrigger value="security">{getTranslation('settings.security', language)}</TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
                    {getTranslation('settings.profileSettings', language)}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {getTranslation('settings.profileSettingsDesc', language)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                      {/* Profile Picture */}
                      <div className="flex flex-col items-center space-y-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={imagePreview} />
                          <AvatarFallback>
                            {user.firstName?.[0]}{user.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="profile-picture"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('profile-picture')?.click()}
                          >
                            {getTranslation('settings.changePicture', language)}
                          </Button>
                        </div>
                      </div>

                      {/* Profile Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={profileForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{getTranslation('settings.firstName', language)}</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{getTranslation('settings.lastName', language)}</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{getTranslation('settings.email', language)}</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{getTranslation('settings.username', language)}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {getTranslation('settings.saveChanges', language)}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
                    {getTranslation('settings.securitySettings', language)}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {getTranslation('settings.securitySettingsDesc', language)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{getTranslation('settings.currentPassword', language)}</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{getTranslation('settings.newPassword', language)}</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{getTranslation('settings.confirmPassword', language)}</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {getTranslation('settings.updatePassword', language)}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
} 