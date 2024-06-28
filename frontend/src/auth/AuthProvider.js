import React, { useState, useEffect } from "react";
import AuthContext from './AuthContext';
import axios from 'axios';

const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);

   useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
         // Fetch user details if token exists
         axios.get("/api/user/details", {
            headers: {
               Authorization: `Token ${token}`
            }
         }).then(response => {
            setUser(response.data);
         }).catch(error => {
            console.error('Error fetching user details:', error);
         });
      }
   }, []);

   const login = async (email, password) => {
      try {
         const response = await axios.post('https://quote-generator-backend.onrender.com/api/user/login', { email, password });
         const { token } = response.data;
         localStorage.setItem('token', token);

         const userResponse = await axios.get("https://quote-generator-backend.onrender.com/api/user/details", {
            headers: {
               Authorization: `Token ${token}`
            }
         });
         setUser(userResponse.data.username.providerData[0].email);
      } catch (error) {
         console.error('Login error:', error);
         // Handle error here, maybe show a notification to the user
      }
   };

   const logout = () => {
      localStorage.removeItem('token');
      setUser(null);
   };

   return (
      <AuthContext.Provider value={{ user, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
