import React, { useContext, useState } from "react";
import { UserContext } from "./userContext";
import { userLogin } from "../../utils/api";

export default function UserProvider({ children }) {
    const [user_id, setUser_id] = useState(
        sessionStorage.getItem("user_id") || null
    );
    const [username, setUsername] = useState(
        sessionStorage.getItem("username") || null
    );
    const [email, setEmail] = useState(sessionStorage.getItem("email") || null);
    const [token, setToken] = useState(sessionStorage.getItem("token") || null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (userData) => {
        setIsLoading(true);
        try {
            const data = await userLogin(userData);

            // localStorage.setItem("user_id", data.user.user_id);
            // localStorage.setItem("username", data.user.username);
            // localStorage.setItem("email", data.user.email);
            // localStorage.setItem("token", data.token);

            sessionStorage.setItem("user_id", data.user.user_id);
            sessionStorage.setItem("username", data.user.username);
            sessionStorage.setItem("email", data.user.email);
            sessionStorage.setItem("token", data.token);
            
            setUser_id(data.user.user_id);
            setUsername(data.user.username);
            setEmail(data.user.email);
            setToken(data.token);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    const register = async () => {
        
    }
    const logout = () => {
        sessionStorage.clear();
    };

    return (
        <UserContext.Provider
            value={{
                user_id,
                username,
                email,
                token,
                setToken,
                login,
                logout,
                isLoading,
                setIsLoading,
            }}>
            {children}
        </UserContext.Provider>
    );
}
