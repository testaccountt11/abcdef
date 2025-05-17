import { useState } from "react";
import { Mail, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/hooks/use-translations";

export function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const { language } = useTranslations();

  // Multi-language support
  const translations = {
    en: {
      title: "Subscribe to Updates",
      subtitle: "Get fresh materials in your inbox",
      placeholder: "Your email",
      button: "Subscribe",
      disclaimer: "No spam, we send twice a month",
      successToast: "Successfully subscribed!",
      errorToast: "Subscription failed. Please try again.",
      invalidEmail: "Please enter a valid email address"
    },
    ru: {
      title: "Подпишитесь на обновления",
      subtitle: "Получайте свежие материалы на почту",
      placeholder: "Ваш email",
      button: "Подписаться",
      disclaimer: "Без спама, отправляем дважды в месяц",
      successToast: "Вы успешно подписались!",
      errorToast: "Ошибка подписки. Пожалуйста, попробуйте еще раз.",
      invalidEmail: "Пожалуйста, введите корректный email"
    },
    kz: {
      title: "Жаңартуларға жазылыңыз",
      subtitle: "Жаңа материалдарды поштаңызға алыңыз",
      placeholder: "Сіздің email",
      button: "Жазылу",
      disclaimer: "Спамсыз, айына екі рет жібереміз",
      successToast: "Сіз сәтті жазылдыңыз!",
      errorToast: "Жазылу қатесі. Қайталап көріңіз.",
      invalidEmail: "Жарамды email енгізіңіз"
    }
  };

  const t = translations[language as keyof typeof translations];

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = async () => {
    // Validate email
    if (!validateEmail(email)) {
      toast({
        title: t.invalidEmail,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Send subscription request to the server
      const response = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      // Show success state
      setIsSuccess(true);
      setEmail("");
      toast({
        title: t.successToast,
        description: email,
      });

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      toast({
        title: t.errorToast,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-card rounded-lg shadow-sm border">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Mail className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{t.title}</h3>
          <p className="text-sm text-foreground/70">{t.subtitle}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          className="bg-background/80"
          disabled={isSubmitting || isSuccess}
        />
        
        <Button 
          className="w-full"
          onClick={handleSubscribe}
          disabled={isSubmitting || isSuccess}
        >
          {isSuccess ? (
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              {t.button}
            </span>
          ) : isSubmitting ? (
            <span className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              {t.button}
            </span>
          ) : (
            t.button
          )}
        </Button>
        
        <p className="text-xs text-center text-foreground/60">
          {t.disclaimer}
        </p>
      </div>
    </div>
  );
} 