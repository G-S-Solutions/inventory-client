'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { AUTH_GET_USER_INFO } from '@/features/auth/gql/auth.gql';
import { useLazyQuery } from '@apollo/client/react';
import { useDarkMode } from '@/hooks/useDarkMode';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  // Agrega más campos según tu estructura de usuario
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

interface DecodedToken {
  sub: string;
  name: string;
  email: string;
  role: string;
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const {} = useDarkMode();

  const [getUserInfo, { data: userData, loading: loadingUserInfo, error }] =
    useLazyQuery(AUTH_GET_USER_INFO, {
      fetchPolicy: 'no-cache',
    });

  useEffect(() => {
    // Cargar usuario desde el token al montar
    const token = Cookies.get('token');

    // console.log({ token, pathname });
    if (token) {
      const loadUser = async () => {
        try {
          const response = await getUserInfo();
          console.log('----get response------');
          console.log(response);
        } catch (error) {
          console.error('Error fetching user info:', error);
          logout();
        } finally {
          setLoading(false);
        }
      };

      loadUser();
    }
  }, []);

  const login = (token: string) => {
    Cookies.set('token', token, { expires: 7 }); // Expira en 7 días
    
    try {
      // const decoded = jwtDecode<DecodedToken>(token);
      // setUser({
      //   id: decoded.sub,
      //   name: decoded.name,
      //   email: decoded.email,
      //   role: decoded.role,
      // });
      router.push('/');
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    router.push('/login');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
