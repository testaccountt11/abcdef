import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import { FcGoogle } from 'react-icons/fc';
import { Separator } from '@/components/ui/separator';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslations } from '@/hooks/use-translations';
import { useAuthContext } from '@/contexts/AuthContext';
import { useFirebaseAuth } from '@/hooks/use-firebase-auth';
import { Loader2 } from 'lucide-react';

const registerFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

const Register: React.FC = () => {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { t } = useTranslations();
  const { login } = useAuthContext();
  const { signUp, signInWithGoogle } = useFirebaseAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const user = await signInWithGoogle();
      
      // Convert Firebase user to your app's user format
      const appUser = {
        id: user.uid,
        email: user.email!,
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
        profileImage: user.photoURL,
      };
      
      login(appUser);
      setLocation('/dashboard');
      
      toast({
        title: t('auth.success'),
        description: t('auth.accountCreated'),
      });
    } catch (error) {
      console.error('Google Sign-In error:', error);
      toast({
        title: t('auth.error'),
        description: error instanceof Error ? error.message : t('auth.googleSignInError'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const user = await signUp(values.email, values.password);
      
      // Convert Firebase user to your app's user format
      const appUser = {
        id: user.uid,
        email: user.email!,
        firstName: values.firstName,
        lastName: values.lastName,
        profileImage: null,
      };
      
      login(appUser);
      setLocation('/dashboard');
      
      toast({
        title: t('auth.success'),
        description: t('auth.accountCreated'),
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: t('auth.error'),
        description: error instanceof Error ? error.message : t('auth.registrationError'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Theme and Language Switchers */}
      <div className="flex justify-end p-4 gap-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">{t('auth.register')}</CardTitle>
            <CardDescription className="text-center">
              {t('auth.register.desc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.firstName')}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.lastName')}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Doe" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.email')}</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="john.doe@example.com" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.password')}</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('auth.registering')}
                    </>
                  ) : (
                    t('auth.register.button')
                  )}
                </Button>
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      {t('auth.register.alternative')}
                    </span>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <FcGoogle className="mr-2 h-4 w-4" />
                  )}
                  {t('auth.signin.google')}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              {t('auth.haveAccount')}{" "}
              <Button 
                variant="link"
                className="p-0 h-auto font-medium" 
                onClick={() => setLocation('/login')}
                disabled={isLoading}
              >
                {t('auth.signin')}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      {/* Back Button */}
      <div className="flex justify-center pt-6 pb-8">
        <button
          className="w-11 h-11 flex items-center justify-center rounded-full bg-background shadow-md border border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
          onClick={() => setLocation('/')}
          aria-label="Back to home"
          disabled={isLoading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Register;
