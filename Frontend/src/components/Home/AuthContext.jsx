import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    
    useEffect (() => {
        if(token) {
            //Lay thong tin user tu token
            const fetchUserInfo = async () => {
                try {
                    const response = await axios.get('http://localhost:5164/api/Auth/user', {
                        headers: {
                            'Authorization' : `Bearer ${token}`
                        }
                    });
                    setCurrentUser(response.data);
                } catch(error) {
                    console.error('Bị lỗi thông tin user: ', error);
                    logout(); // Lỗi xảy ra khi lấy thông tin, đăng xuất
                }
            };
            fetchUserInfo()
        }
    },  [token]);
    
    const login = async (email, password) => {
        try {
            const respone = await axios.post('http://localhost:5164/api/Auth/login',{
                email, 
                password
            }) ;
            const {jwtToken, refreshToken} = response.data;
            localStorage.setItem('token', jwtToken);
            localStorage.setItem('refreshToken', refreshToken);
            setToken(jwtToken);
        } catch (e) {
            throw error;
        }
    };
    
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setToken(null);
        setCurrentUser(null);
    }

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);