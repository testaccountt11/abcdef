import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Briefcase,
  Users,
  MessageSquare,
  Award,
  Settings,
  LogOut
} from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";
import { useAuthContext } from "@/contexts/AuthContext";

const menuItems = [
  {
    title: "Басты бет",
    icon: LayoutDashboard,
    href: "/dashboard"
  },
  {
    title: "Менің курстарым",
    icon: GraduationCap,
    href: "/courses"
  },
  {
    title: "Курс каталогы",
    icon: BookOpen,
    href: "/catalog"
  },
  {
    title: "Тағылымдамалар",
    icon: Briefcase,
    href: "/dashboard/opportunities"
  },
  {
    title: "Тәлімгерлер",
    icon: Users,
    href: "/mentors"
  },
  {
    title: "Кеңес алу",
    icon: MessageSquare,
    href: "/advice"
  },
  {
    title: "Жетістіктер",
    icon: Award,
    href: "/achievements"
  }
];

export function Sidebar() {
  const [location] = useLocation();
  const { t } = useTranslations();
  const { logout } = useAuthContext();

  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4 fixed min-h-screen bg-card border-r w-64">
        <div className="px-3 py-2">
          <div className="mb-8 px-2">
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-8"
            />
          </div>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.href}
                variant={location === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  location === item.href && "bg-primary/10"
                )}
                onClick={() => window.location.href = item.href}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Button>
            ))}
          </div>
        </div>
        <div className="px-3 py-2 absolute bottom-0 w-full">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => window.location.href = '/settings'}
            >
              <Settings className="h-4 w-4" />
              Баптаулар
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4" />
              Шығу
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 