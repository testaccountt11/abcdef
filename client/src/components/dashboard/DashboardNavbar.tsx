import type { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings, User as UserIcon, LogOut } from "lucide-react";

interface DashboardNavbarProps {
  user: User;
}

export function DashboardNavbar({ user }: DashboardNavbarProps) {
  const { logout } = useAuthContext();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
              2
            </span>
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <LanguageSwitcher />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.profilePicture} alt={user.firstName} />
                  <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.location.href = '/profile'}>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Профиль</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = '/settings'}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Баптаулар</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600 focus:bg-red-50 focus:text-red-600"
                onClick={() => logout()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Шығу</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
} 