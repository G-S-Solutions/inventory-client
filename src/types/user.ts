export interface IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
}

export interface Iloged {
  data: {
    authValidateToken: boolean | null;
  };
}
