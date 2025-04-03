import React, { useContext, useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/users/useUser";
import LoadingComponent from "../components/ui/LoadingComponent";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
    const { login, logout, isLoading, setIsLoading } = useUser();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleOnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await login(user);
            navigate("/");
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            toast(
                err.response?.data?.message ||
                    "Invalid credentials. Please try again.",
                {
                    autoClose: 5000,
                    theme: "dark",
                    position: "top-center",
                }
            );
            setUser({
                email: "",
                password: "",
            });
        }
    };
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/register");
    };
    return (
        <div className="login-div">
            <ToastContainer
            />
            <div className="login-div-inner">
                {!isLoading ? (
                    <>
                        <h1>Welcome back</h1>
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
                        <div className="form-dotted-div">
                            <p> OR </p>
                        </div>
                        <p>
                            <span id="text-dim">Don't have an account?</span>{" "}
                            <span onClick={handleNavigate} id="text-highlight">
                                Register.
                            </span>
                        </p>
                    </>
                ) : (
                    <LoadingComponent />
                )}
            </div>
        </div>
    );
}
