import axios from 'axios';

const API_URL = 'http://localhost:3000/users';
const API_AUTH_URL = 'http://localhost:3000';
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const getUsers = async () => {
  const res = await axios.get(API_URL, authHeader());
  return res.data;
};

export const createUser = async (user: { name: string; email: string; password: string }) => {
  const res = await axios.post(API_URL, user, authHeader());
  return res.data;
};

export const updateUser = async (id: string, user: { name: string; email: string }) => {
  const res = await axios.put(`${API_URL}/${id}`, user, authHeader());
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`, authHeader());
  return res.data;
};


export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(`${API_AUTH_URL}/auth/login`, { email, password });
  return res.data;
};

export const signupUser = async (name: string, email: string, password: string) => {
  const res = await axios.post(`${API_AUTH_URL}/auth/signup`, { name, email, password });
  return res.data;
};