import { Iloged } from '@/types/user';

export const isLoged = async (token: string): Promise<Iloged> => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);

  const graphql = JSON.stringify({
    query: `
    query Query {
      authValidateToken
    }`,
  });
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
  };
  try {
    const data = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL || '',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => result);
    return data;
  } catch (error: any) {
    console.log(error);
    return {
      data: {
        authValidateToken: null,
      },
    };
  }
};

export const verifyRestorePasswordJWT = async (token: string) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  // myHeaders.append("Authorization", token);

  const graphql = JSON.stringify({
    query: `mutation VerifyRestoreJWT($token: String!) {
      verifyRestoreJWT(token: $token) {
        id
        email
        token
        createdAt
        status
      }
    }`,
    variables: { token: token },
  });
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
  };
  try {
    const data = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_AUTH_URL || '',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => result);

    return data;
  } catch (error: any) {
    return {
      data: {
        getUserById: null,
      },
    };
  }
};

export const userGetInfo = async (token: string) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);

  const graphql = JSON.stringify({
    query: `
    query UserGetInfo {
      userGetInfo(idModule: 15) {
        idUser
        Menu {
          url
        }
      }
    }`,
  });
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
  };
  try {
    const data = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL || '',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => result);

    return data;
  } catch (error: any) {
    console.log(error);
    console.log(' error:', error);
    return {
      data: {
        authGetInfo: null,
      },
    };
  }
};
