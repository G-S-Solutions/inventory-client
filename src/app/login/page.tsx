'use client';
import { LoginForm } from '@/features/auth/LoginForm';

const Login = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4 transition-colors'>
      <div className='w-full max-w-md'>
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6 transition-colors border border-gray-100 dark:border-gray-700'>
          <div className='text-center space-y-2'>
            <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>Bienvenido</h1>
            <p className='text-gray-600 dark:text-gray-400'>
              Ingresa tus credenciales para continuar
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;