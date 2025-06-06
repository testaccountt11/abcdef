import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslations } from "@/hooks/use-translations";
import { useAuthContext } from "@/contexts/AuthContext";
import { useFirebaseAuth } from "@/hooks/use-firebase-auth";
import { Loader2 } from "lucide-react";

const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const Login: React.FC = () => {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { t } = useTranslations();
  const { login } = useAuthContext();
  const { signIn, signInWithGoogle } = useFirebaseAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
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
        description: t('auth.welcomeBack'),
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

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const user = await signIn(values.email, values.password);
      
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
        description: t('auth.welcomeBack'),
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: t('auth.error'),
        description: error instanceof Error ? error.message : t('auth.invalidCredentials'),
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
            <CardTitle className="text-xl text-center">{t('auth.signin')}</CardTitle>
            <CardDescription className="text-center">
              {t('auth.signin.desc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <div className="flex justify-end">
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-sm" 
                    onClick={() => setLocation('/forgot-password')}
                    type="button"
                    disabled={isLoading}
                  >
                    {t('auth.forgotPassword')}
                  </Button>
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('auth.signingIn')}
                    </>
                  ) : (
                    t('auth.signin.button')
                  )}
                </Button>
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      {t('auth.signin.alternative')}
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
              {t('auth.noAccount')}{" "}
              <Button 
                variant="link"
                className="p-0 h-auto font-medium" 
                onClick={() => setLocation('/register')}
                disabled={isLoading}
              >
                {t('auth.register')}
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

export default Login; 