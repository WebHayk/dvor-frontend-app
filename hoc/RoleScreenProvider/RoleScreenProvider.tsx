import React from "react";
import {useMainSelector} from "@store/selectors";

export const RoleScreenProvider = ({children, roles, isProfileVerified}: any) => {

    let state = useMainSelector();
    let userRole: string = state.user?.role.key;

    if (typeof window != "undefined") {
        if (userRole) {
            if (!roles.includes(userRole)) {
                return null;
            }
        } else {
            return null;
        }
    }

    return children;

}