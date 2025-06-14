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
import { Separator } from "@/components/ui/separator";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslations } from "@/hooks/use-translations";
import { useAuthContext } from "@/contexts/AuthContext";
import { Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";

const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const Login: React.FC = () => {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { t } = useTranslations();
  const { login } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/login/direct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      login(data.user);
      setLocation('/dashboard');
      
      toast({
        title: t('auth.success'),
        description: data.message || t('auth.welcomeBack'),
        variant: 'default',
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: t('auth.error'),
        description: error instanceof Error ? error.message : t('auth.invalidCredentials'),
        variant: 'destructive',
      });
      
      // Clear password field on error
      form.setValue('password', '');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex justify-end p-4 gap-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">{t('auth.signin')}</CardTitle>
            <CardDescription className="text-center text-base">
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
                          autoComplete="email"
                          className="bg-background"
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
                        <div className="relative">
                        <Input 
                            type={showPassword ? "text" : "password"}
                          placeholder="••••••••" 
                          {...field} 
                          disabled={isLoading}
                            autoComplete="current-password"
                            className="bg-background pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={togglePasswordVisibility}
                            disabled={isLoading}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
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
              </form>
            </Form>
            
            <div className="mt-4 text-center">
              <span className="text-sm text-muted-foreground">
                {t('auth.noAccount')}{' '}
                <Button 
                  variant="link" 
                  className="p-0 h-auto" 
                  onClick={() => setLocation('/register')}
                >
                  {t('auth.register')}
                </Button>
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Separator className="my-2" />
            <Button
              variant="outline"
              className="w-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              onClick={() => setLocation('/')}
              disabled={isLoading}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('common.back')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login; 