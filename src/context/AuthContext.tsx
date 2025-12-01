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
import { ContextUser } from '@/types/user';

interface AuthContextType {
  user: ContextUser | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  updateUser: (user: ContextUser) => void;
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
  const [user, setUser] = useState<ContextUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const {} = useDarkMode();

  const [getUserInfo, { data: userData, loading: loadingUserInfo, error }] =
    useLazyQuery<{ authUserInfo: ContextUser }>(AUTH_GET_USER_INFO, {
      fetchPolicy: 'no-cache',
    });

    console.log(user)

  useEffect(() => {
    // Cargar usuario desde el token al montar
    const token = Cookies.get('token');

    // console.log({ token, pathname });
    if (token) {
      const loadUser = async () => {
        try {
          const response = await getUserInfo();
          // console.log('----get response------');
          // console.log(response);
          if(response && response.data && response.data.authUserInfo) {
            // console.log(response.data)
            // const { authUserInfo } = response.data;
            setUser(response.data.authUserInfo);
          }
          // setUser(response.data.authValidateToken as ContextUser);
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
      window.location.href = '/';
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    router.push('/login');
  };

  const updateUser = (updatedUser: ContextUser) => {
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
