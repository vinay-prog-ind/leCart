import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../utils/api";
import { toast, ToastContainer } from "react-toastify";
import { useUser } from "../context/users/useUser";

export default function Register() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });
    const { login, logout, isLoading, setIsLoading } = useUser();
    const [confirmPass, setConfirmPass] = useState("");
    const [passValid, setPassValid] = useState(false);

    const handleConfirmPass = (e) => {
        setConfirmPass(e.target.value);
    };

    const handleOnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (user.password !== confirmPass) {
                toast("Password Didnt match", {
                    autoClose: 5000,
                    theme: "dark",
                });
                return setPassValid(true);
            } else {
                setPassValid(false);
            }
            setIsLoading(true);
            // const data = await userRegister();
            console.log(user);
        } catch (err) {
            console.log(err.message);
        }
    };

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/login");
    };

    return (
        <div className="login-div">
            <ToastContainer />
            <div className="login-div-inner">
                <h1>Create Account</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <Input
                        label={"Enter username"}
                        name="username"
                        onChange={handleOnChange}
                        type={"text"}
                        ofType={"login"}
                    />
                    <Input
                        label={"Email address"}
                        name="email"
                        onChange={handleOnChange}
                        type={"email"}
                        ofType={"login"}
                    />
                    <Input
                        label={"Password"}
                        name="password"
                        onChange={handleOnChange}
                        type={"password"}
                        ofType={"login"}
                    />
                    <Input
                        label={"Confirm password"}
                        name="Confirm password"
                        onChange={handleConfirmPass}
                        type={"password"}
                        ofType={"login"}
                        isError={passValid}
                    />
                    <Button
                        text={"Register"}
                        onClick={handleSubmit}
                        type={"login"}
                    />
                </form>
                <div className="form-dotted-div">
                    <p> OR </p>
                </div>
                <p>
                    <span id="text-dim">Already have an account?</span>{" "}
                    <span onClick={handleNavigate} id="text-highlight">
                        {" "}
                        Login.{" "}
                    </span>
                </p>
            </div>
        </div>
    );
}
