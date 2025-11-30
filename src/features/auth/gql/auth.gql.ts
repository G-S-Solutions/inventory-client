import { gql } from "@apollo/client";

export const AUTH_LOGIN = gql`
  mutation AuthLogin($loginInput: LoginInput!) {
    authLogin(loginInput: $loginInput) {
      token
    }
  }
`;
