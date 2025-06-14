import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const LoginButton = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleAuth = async () => {
    try {
      if (user) {
        await logout();
      } else {
        // Navigate to login page instead of using Google sign-in
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        title: 'Error',
        description: 'An error occurred during authentication',
        variant: 'destructive',
      });
    }
  };

  return (
    <button 
      onClick={handleAuth}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      {user ? 'Sign Out' : 'Sign In'}
    </button>
  );
}; 