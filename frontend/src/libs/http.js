import axios from "axios";
import { auth } from "../config/firebase.js";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",  
  timeout: 10000,
});

http.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  
  if (user) {
    // Automatically get the token and add it to headers
    const token = await user.getIdToken();
    //console.log(user.getIdToken());
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export { http };
