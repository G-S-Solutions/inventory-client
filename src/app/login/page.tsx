'use client';
import { AUTH_LOGIN } from '@/graphql/auth/auth.gql';
import { useMutation } from '@apollo/client/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Cookies from 'js-cookie';
import { useState } from 'react';
import * as Yup from 'yup';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [authLogin] = useMutation<{ authLogin: { token: string } }>(
    AUTH_LOGIN,
    {
      // onError(error) {
      //   if (error.networkError) {
      //     toast.error('Ocurrió un error');
      //   } else {
      //     toast.error('Usuario o contraseña incorrectos');
      //   }
      // },
    }
  );

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string().required('El campo es obligatorio'),
          password: Yup.string().required('El campo es obligatorio'),
        })}
        onSubmit={async (values, { resetForm }) => {
          setLoading(true);
          try {
            const response = await authLogin({
              variables: {
                loginInput: {
                  email: values.email,
                  password: values.password,
                },
              },
            });
            console.log(response);
            if (response && response.data) {
              console.log(response.data);
              const { token } = response.data.authLogin;
              setLoading(false);
              // resetForm();
              Cookies.set('token', token);
              // window.location.href = '/dashboard';
            } else {
              setLoading(false);
            }
          } catch {
            setLoading(false);
          }
        }}
      >
        <Form autoComplete='off'>
          <div className='label-input'>
            <label htmlFor='email'>
              Usuario<span>*</span>
            </label>
            <Field
              id='email'
              name='email'
              type='text'
              autoComplete='off'
              placeholder='example@mail.com'
            />
            <ErrorMessage
              name='email'
              component='p'
              className='input---error'
            />
          </div>

          <div className='label-input'>
            <label htmlFor='password'>
              Contraseña<span>*</span>
            </label>
            <Field
              id='password'
              name='password'
              type='password'
              autoComplete='off'
              placeholder='******'
            />
            <ErrorMessage
              name='password'
              component='p'
              className='input---error'
            />
          </div>

          {/* <div className="forgot-password">
                  <button type="button" onClick={() => setCurrentForm('reset-password')}>
                    ¿Olvidaste tu contraseña?
                  </button>
                </div> */}

          <button type='submit' disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
