'use client';
import { useMutation } from '@apollo/client/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Cookies from 'js-cookie';
import { useState } from 'react';
import * as Yup from 'yup';
import { AUTH_LOGIN } from './gql/auth.gql';

const loginSchema = Yup.object({
  email: Yup.string().required('El campo es obligatorio'),
  password: Yup.string().required('El campo es obligatorio'),
});

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [authLogin] = useMutation<{ authLogin: { token: string } }>(AUTH_LOGIN);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={async (values) => {
        setLoading(true);
        try {
          const response = await authLogin({
            variables: { loginInput: values },
          });

          if (response?.data) {
            const { token } = response.data.authLogin;
            Cookies.set('token', token);
            window.location.href = '/dashboard';
          }
        } catch (error) {
          console.error('Login error:', error);
        } finally {
          setLoading(false);
        }
      }}
    >
      <Form autoComplete='off' className='space-y-5'>
        <div className='space-y-2'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Usuario<span className='text-red-500 ml-1'>*</span>
          </label>
          <Field
            id='email'
            name='email'
            type='text'
            placeholder='example@mail.com'
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none'
          />
          <ErrorMessage
            name='email'
            component='p'
            className='text-red-500 text-sm mt-1'
          />
        </div>

        <div className='space-y-2'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            Contraseña<span className='text-red-500 ml-1'>*</span>
          </label>
          <Field
            id='password'
            name='password'
            type='password'
            placeholder='••••••••'
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none'
          />
          <ErrorMessage
            name='password'
            component='p'
            className='text-red-500 text-sm mt-1'
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:cursor-pointer'
        >
          {loading ? (
            <span className='flex items-center justify-center gap-2'>
              <svg
                className='animate-spin h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              Cargando...
            </span>
          ) : (
            'Iniciar sesión'
          )}
        </button>
      </Form>
    </Formik>
  );
};
