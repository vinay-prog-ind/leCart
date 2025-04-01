import React, { useContext, useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/users/useUser";
import LoadingComponent from "../components/ui/LoadingComponent";

export default function AdminLogin() {
    const { Adminlogin, isLoading } = useUser();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    
    const handleOnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await Adminlogin(user);
        navigate("/");
    };
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/register");
    };
    return (
        <div className="login-div">
            <div className="login-div-inner">
                {!isLoading ? (
                    <>
                        <h1>Welcome back</h1>
                        <h3>Admin login</h3>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <Input
                                label="Email address"
                                name="email"
                                onChange={handleOnChange}
                                type={"email"}
                                value={user.email}
                                ofType={"login"}
                            />
                            <Input
                                label="Password"
                                name="password"
                                onChange={handleOnChange}
                                type={"password"}
                                value={user.password}
                                ofType={"login"}
                            />

                            <Button
                                text={"Login"}
                                onClick={handleSubmit}
                                type={"login"}
                            />
                        </form>
                    </>
                ) : (
                    <LoadingComponent />
                )}
            </div>
        </div>
    );
}
