'use client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  CombinedGraphQLErrors,
} from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { ErrorLink } from '@apollo/client/link/error';
import Cookies from 'js-cookie';
import { ServerError } from '@apollo/client';

const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
// console.log({backUrl})
const back_httpLink = new HttpLink({
  uri: backUrl,
});

export const ApolloClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const token = Cookies.get('token');

  const backLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        authorization: token ? `Bearer ${token}` : '',
      },
    });
    return forward(operation);
  });

  const errorLink = new ErrorLink(({ error }) => {
    if (CombinedGraphQLErrors.is(error)) {
      error.errors.forEach(({ message, extensions }) => {
        console.log(`GraphQL error: ${message}`);
        
        // Verificar si es un error de autenticación
        if (extensions?.code === 'UNAUTHENTICATED') {
          Cookies.remove('token');
          window.location.href = '/login';
        }
      });
    } else if (ServerError.is(error)) {
      console.log(`Server error: ${error.message}`);
      
      // Verificar el statusCode del ServerError
      if (error.statusCode === 401) {
        Cookies.remove('token');
        window.location.href = '/login';
      }
    } else if (error) {
      console.log(`Other error: ${error.message}`);
    }
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, backLink, back_httpLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
