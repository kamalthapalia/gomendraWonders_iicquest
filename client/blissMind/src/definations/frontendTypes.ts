export interface AuthContextProps {
  user: UserType;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface UserType {
    userId: string;
    fullName: string;
    email: string;
    type: string;
    description: string;
  }
  