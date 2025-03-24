import React, { useContext, useState } from "react";
import { UserContext } from "./userContext";

export default function useUsers({ children }) {
    const [user, setUser] = useState({
        user: "",
        userId: "",
        email: "",
    });

    const [token, setToken] = useState("");

    const login = () => {};
    const logout = () => {};

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
