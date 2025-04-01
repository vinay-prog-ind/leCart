import React from "react";
import Button from "./ui/Button";
import { useUser } from "../context/users/useUser";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate()
    const {username, logout} = useUser();

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
            <h2>leCart</h2>
            <input className="navbar-searchbar" type="text" placeholder="search item" />
            <div>
                <p className="avatar">{username.slice(0, 1).toUpperCase()}</p>
            </div>
            <Button text={"logout"} onClick={handleLogout} type={"tertiary"} />
        </nav>
    );
}
