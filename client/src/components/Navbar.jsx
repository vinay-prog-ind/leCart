import React from "react";
import Button from "./ui/Button";
import { useUser } from "../context/users/useUser";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate()
    const {logout} = useUser();

    const handleLogout = () => {
        try {
            logout();
            navigate('/login');
            console.log("logout");
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <nav className="main-nav">
            <h2>Logo</h2>
            <input type="text" placeholder="search item" />
            <div>
                <span>Profile</span>
            </div>
            <Button text={"logout"} onClick={handleLogout} type={"tertiary"} />
        </nav>
    );
}
