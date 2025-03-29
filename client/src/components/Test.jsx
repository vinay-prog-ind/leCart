import React, { useEffect, useState } from "react";
import { testCookie } from "../utils/api";
import LoadingComponent from "./ui/LoadingComponent";
import { useUser } from "../context/users/useUser";

export default function Test() {
    const [isLoading, setIsLoading] = useState(false);
    const {user_id, username, email} = useUser();

    return (
        <>
            <div>
                <h1>{username}</h1>
                <h2>{email}</h2>
            </div>
        </>
    );
}
