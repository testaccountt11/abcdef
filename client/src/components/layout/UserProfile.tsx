import { useAuthContext } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { ApiRequestError, apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { Settings, LogOut, User } from "lucide-react";

export default function UserProfile() {
  const { user, logout } = useAuthContext();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  if (!user) return null;

  const handleLogout = async () => {
    try {
      await apiRequest('POST', '/api/logout', {});
      logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      setLocation('/login');
    } catch (error) {
      const apiError = error as ApiRequestError;
      toast({
        title: "Error",
        description: apiError.message || "Failed to log out",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="border-t border-gray-200 p-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none w-full">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.username} className="h-full w-full object-cover" />
              ) : (
                <User className="h-4 w-4 text-gray-500" />
              )}
            </div>
            <div className="ml-3 text-left">
              <p className="text-sm font-medium text-gray-700">
                {user.firstName} {user.lastName || ''}
              </p>
              <p className="text-xs font-medium text-gray-500">{user.email}</p>
            </div>
            <button className="ml-auto text-gray-400 hover:text-gray-500">
              <i className="ri-settings-3-line"></i>
            </button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem className="cursor-pointer" onClick={() => setLocation('/profile')}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => setLocation('/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
