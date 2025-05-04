import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useAuthContext } from "@/contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslations } from "@/hooks/use-translations";
import { useCallback, useMemo } from "react";

export default function Register() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { login } = useAuthContext();
  const { t, language } = useTranslations();
  
  // Определяем типы без использования Zod и схем на этом этапе
  type RegisterFormValues = {
    username: string;
    email: string;
    firstName: string;
    lastName?: string;
    password: string;
    confirmPassword: string;
  };
  
  // Используем обычный валидатор вместо zodResolver
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    resolver: (values) => {
      const errors: Record<string, { type: string; message: string }> = {};
      
      // Проверка username
      if (values.username.length < 3) {
        errors.username = {
          type: "minLength",
          message: "Username must be at least 3 characters"
        };
      }
      
      // Проверка email
      if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = {
          type: "pattern",
          message: "Please enter a valid email address"
        };
      }
      
      // Проверка firstName
      if (values.firstName.length < 2) {
        errors.firstName = {
          type: "minLength",
          message: "First name is required"
        };
      }
      
      // Проверка password
      if (values.password.length < 8) {
        errors.password = {
          type: "minLength",
          message: t('auth.password.requirements.length')
        };
      } else if (!/[A-Z]/.test(values.password)) {
        errors.password = {
          type: "pattern",
          message: t('auth.password.requirements.uppercase')
        };
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
        errors.password = {
          type: "pattern",
          message: t('auth.password.requirements.special')
        };
      }
      
      // Проверка confirmPassword
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = {
          type: "validate",
          message: t('auth.password.requirements.match')
        };
      }
      
      return {
        values,
        errors: Object.keys(errors).length > 0 ? errors : {}
      };
    }
  });

  const handleGoogleSignUp = async () => {
    toast({
      title: "Google Sign-Up Unavailable",
      description: "Please use email/password registration for now. Google Sign-Up will be available soon.",
      variant: "destructive",
    });
  };

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      // Remove confirmPassword from the data
      const { confirmPassword, ...userData } = values;
      
      console.log("Attempting to register with email:", userData.email);
      
      // Register directly with our backend
      const response = await apiRequest('POST', '/api/register/direct', {
        email: userData.email,
        username: userData.username,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName || null
      });
      
      const data = await response.json();
      
      if (data.user) {
        login(data.user);
        toast({
          title: "Success",
          description: "Account created successfully",
        });
        setLocation('/dashboard');
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      
      // Show detailed error message
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
      
      // Handle known error messages
      if (error.message?.includes("Email already registered")) {
        toast({
          title: "Email In Use",
          description: "This email is already associated with an account. Try signing in instead.",
          variant: "destructive",
        });
      } else if (error.message?.includes("Username already taken")) {
        toast({
          title: "Username Taken",
          description: "This username is already taken. Please choose another one.",
          variant: "destructive",
        });
      }
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
            <div 
              className="flex items-center justify-center mb-2 cursor-pointer"
              onClick={() => setLocation('/')}
            >
              <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M16 6H3v12h13V6z" />
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <path d="M8 12h4" />
                  <rect x="16" y="6" width="5" height="5" />
                  <rect x="16" y="16" width="5" height="2" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-foreground ml-2">Portfol.IO</span>
            </div>
            <CardTitle className="text-xl text-center">{t('auth.register')}</CardTitle>
            <CardDescription className="text-center">
              {t('auth.register.desc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('auth.firstName')}</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
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
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.username')}</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe" {...field} />
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
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
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
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.confirmPassword')}</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {t('auth.register.button')}
                </Button>
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">{t('auth.register.alternative')}</span>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleGoogleSignUp}
                >
                  <FcGoogle className="mr-2 h-4 w-4" />
                  {t('auth.register.google')}
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
              >
                {t('auth.signin')}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      {/* Back Button снизу */}
      <div className="flex justify-center pt-6 pb-8">
        <button
          className="w-11 h-11 flex items-center justify-center rounded-full bg-background shadow-md border border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
          onClick={() => setLocation('/')}
          aria-label="Назад на главную"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
