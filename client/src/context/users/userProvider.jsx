import React, { useContext, useState } from "react";
import { UserContext } from "./userContext";
import { AdminLogin, api } from "../../utils/api";

export default function UserProvider({ children }) {
    const [user_id, setUser_id] = useState(
        sessionStorage.getItem("user_id") || null
    );
    const [username, setUsername] = useState(
        sessionStorage.getItem("username") || null
    );
    const [email, setEmail] = useState(sessionStorage.getItem("email") || null);
    const [token, setToken] = useState(sessionStorage.getItem("token") || null);
    const [role, setRole] = useState(sessionStorage.getItem("role") || null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (userData) => {
        try {
            const res = await api.post("/user/login", userData);

            sessionStorage.setItem("user_id", res.data.user.user_id);
            sessionStorage.setItem("username", res.data.user.username);
            sessionStorage.setItem("email", res.data.user.email);
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("role", "user");

            setUser_id(res.data.user.user_id);
            setUsername(res.data.user.username);
            setEmail(res.data.user.email);
            setToken(res.data.token);
            setRole("user");
        } catch (error) {
            throw new error();
        }
    };
    const Adminlogin = async (userData) => {
        setIsLoading(true);
        try {
            const data = await AdminLogin(userData);

            sessionStorage.setItem("user_id", data.user.user_id);
            sessionStorage.setItem("username", data.user.username);
            sessionStorage.setItem("email", data.user.email);
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("role", data.user.role);

            setUser_id(data.user.user_id);
            setUsername(data.user.username);
            setEmail(data.user.email);
            setToken(data.token);
            setIsLoading(false);
            setRole(data.user.role);
        } catch (error) {
            console.log(error);
        }
    };
    const register = async () => {};
    const logout = () => {
        sessionStorage.clear();
    };

    return (
        <UserContext.Provider
            value={{
                user_id,
                username,
                email,
                role,
                token,
                setToken,
                login,
                logout,
                Adminlogin,
                isLoading,
                setIsLoading,
            }}>
            {children}
        </UserContext.Provider>
    );
}
