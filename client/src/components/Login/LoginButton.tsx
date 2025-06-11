import { useAuth } from '@/hooks/useAuth';

export const LoginButton = () => {
  const { user, signInWithGoogle, signOut } = useAuth();

  const handleAuth = async () => {
    try {
      if (user) {
        await signOut();
      } else {
        await signInWithGoogle();
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <button 
      onClick={handleAuth}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      {user ? 'Sign Out' : 'Sign in with Google'}
    </button>
  );
}; 