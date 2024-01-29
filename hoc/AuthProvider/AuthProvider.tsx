import React from "react";
import {useRouter} from "next/router";

export const AuthProvider = ({children}: any) => {

    let router = useRouter();

    if (typeof window != "undefined") {
        if (!localStorage.getItem("token")) {
             router.push("/");
        }
    }

    return children;
}