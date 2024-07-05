export type signUpType = {
  email: string,
  password: string,
  fullName: string,
  gender: string,
  age: string,
  type: string
}

export interface AuthContextProps {
  user: UserType;
  login: (email: string, password: string) => Promise<void>;
  signUp: (formData: signUpType) => Promise<void>;
  logout: () => Promise<void>;
}

export interface UserType {
    userId: string;
    fullName: string;
    email: string;
    type: "student" | "professional";
    description: string;
  }
  