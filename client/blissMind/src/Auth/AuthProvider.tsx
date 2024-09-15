import React, { createContext, useEffect } from 'react';
import axios, { isAxiosError } from 'axios';
import { AuthContextProps, signUpType, UserType } from '../definations/frontendTypes';
import useUserStorage from '../Hooks/useUserStorage.ts';

// serverApi
export const serverApi = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true
})

const AuthContext = createContext<AuthContextProps>({
  user: {} as UserType,
  signUp: async () => { },
  login: async () => { },
  logout: async () => { }
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useUserStorage();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await serverApi.get('/auth', { withCredentials: true });
        setUser(response.data.data);

      } catch (error) {
        // console.log(error)
        setUser({} as UserType)
        console.error('User not authenticated');
      }
    };

    checkUser();
  }, []);

  const signUp = async (formData: signUpType) => {
    try {
      const res = await serverApi.post("/auth/signup", formData);
      console.log('Form data submitted:', formData);
      setUser(res.data.data)

    } catch (error) {
      console.error('Error during sign up:', error);
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const res = await serverApi.post('/auth/login', { email, password });
      setUser(res.data.data);
    } catch (error) {
      console.log(error)
      throw new Error("Invalid Credentials Provided!")
    }
  };

  const logout = async () => {
    try {
      await serverApi.get('/auth/logout', { withCredentials: true });
      setUser({} as UserType);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.message);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;