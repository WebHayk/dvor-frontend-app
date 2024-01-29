import {FC, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useMainSelector} from "@store/selectors";

interface RoleElementProvider {
    children: any,
    roles: string[]
}

export const RoleElementProvider: FC<RoleElementProvider> = ({children, roles}) => {

    let state = useMainSelector();
    let [userRole, setUserRole] = useState<string>(state.user?.role.key);

    useEffect(() => {
        setUserRole(state.user?.role.key);
    }, [state.user]);

    if (userRole || userRole !== "") {
        if (!roles.includes(userRole)) {
            return null;
        } else {
            return children;
        }
    }
}