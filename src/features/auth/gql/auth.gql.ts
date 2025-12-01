import { gql } from '@apollo/client';

export const AUTH_LOGIN = gql`
  mutation AuthLogin($loginInput: LoginInput!) {
    authLogin(loginInput: $loginInput) {
      token
    }
  }
`;

export const AUTH_GET_USER_INFO = gql`
  query AuthUserInfo {
    authUserInfo {
      id
      email
      firstName
      lastName
      isActive
      company {
        id
        name
      }
      role {
        id
        name
        slug
        canCreate
        canRead
        canUpdate
        canDelete
      }
      menus {
        id
        name
        code
        path
        type
        position
        order
        icon
        description
        subMenu {
          id
          name
          code
          type
          position
          path
          order
          icon
          description
          subMenu {
            id
            name
            code
            path
            type
            position
            order
            icon
            description
          }
        }
      }
    }
  }
`;
