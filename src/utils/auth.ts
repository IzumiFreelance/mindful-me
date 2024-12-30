import { User } from '../types';
import { getItem, setItem } from './storage';

export const getCurrentUser = (): User | null => {
  return getItem<User>('currentUser');
};

export const login = (email: string, password: string): User | null => {
  const users = getItem<User[]>('users') || [];
  const user = users.find(u => u.email === email);
  if (user) {
    setItem('currentUser', user);
    return user;
  }
  return null;
};

export const register = (username: string, email: string, password: string): User => {
  const users = getItem<User[]>('users') || [];
  const newUser: User = {
    id: Date.now().toString(),
    username,
    email
  };
  users.push(newUser);
  setItem('users', users);
  setItem('currentUser', newUser);
  return newUser;
};

export const logout = (): void => {
  removeItem('currentUser');
};