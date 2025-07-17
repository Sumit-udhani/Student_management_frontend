// src/utils/axiosInterceptor.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9090',
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>{
  if (error.response && error.response.status === 401) {
    localStorage.removeItem("token"); 
    localStorage.removeItem("userId"); 

    window.location.href = "/login";
  }
  return Promise.reject(error);
 }
)

export default axiosInstance;

