import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Error() {
    useEffect(() => {
        toast("Something went wrong", {
            autoClose: 5000,
            theme: "dark",
            position: "top-center"
        })
    },[])
    const navigate = useNavigate();
    return (
        <div className="error-page">
            <ToastContainer />
            <h1>Something went wrong.</h1>
            <h2>Try again sometimes later</h2>
            {/* <h2 onClick={() => navigate("/login")} id="error-page-return">Return to login page?</h2> */}
        </div>
    );
}
