import React, { createContext, useState, useEffect } from 'react';
import axios, { isAxiosError } from 'axios';
import { AuthContextProps, UserType } from '../definations/frontendTypes';

// serverApi
export const serverApi = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true
})

const AuthContext = createContext<AuthContextProps>({
  user: {} as UserType,
  login: async () => { },
  logout: async () => { }
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>(()=> {
    const savedUser = localStorage.getItem('user');
    console.log(savedUser)
    return savedUser ? JSON.parse(savedUser): {}
  });

  useEffect(() => {
    const checkUser = async () => {
      try {
          const response = await serverApi.get('/auth', { withCredentials: true });
          console.log(response);
          setUser(response.data.data);
      } catch (error) {
        console.log(error)
        localStorage.removeItem('user')
        setUser({} as UserType)
        console.error('User not authenticated');
      }
    };

    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await serverApi.post('/auth/login', { email, password });
      // store to local storage
      const userDetails = JSON.stringify(res.data.data);
      localStorage.setItem('user', userDetails)
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
      localStorage.removeItem('user')
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.message);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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