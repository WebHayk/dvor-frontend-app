import React, {FC, useEffect, useState} from 'react';
import styles from "./SidebarContent.module.scss";
import SidebarControl from "./SidebarControl";
import {useMainSelector} from "@store/selectors";
import {links} from "@common/utils/links";
import SidebarLink from "@components/Sidebar/SidebarContent/SidebarLink";

export const SidebarContent: FC = () => {

    const state = useMainSelector();
    let role = state.user?.role.key;
    let isProfileVerified = state.profile?.user.is_verified;
    let [userRole, setUserRole] = useState<string>(state.user?.role.key);

    useEffect(() => {
        setUserRole(state.user?.role.key);
    }, [state.user?.role]);

    return (
        <div className={styles.Sidebar__content}>
            <ul>
                {
                    links.all.map((link, index) => {
                        return (
                            <SidebarLink
                                href={link.href}
                                icon={link.icon}
                                label={link.label}
                                key={index}
                            />
                        )
                    })
                }
                {
                    state.isAuth && role != "user"
                        ?
                        isProfileVerified
                            ?
                            links.is_verified.map((link, index) => {
                                return (
                                    link.roles.includes(userRole)
                                    &&
                                    <SidebarLink
                                        href={link.href}
                                        icon={link.icon}
                                        label={link.label}
                                        key={index}
                                    />
                                )
                            })
                            :
                            links.not_verified.map((link, index) => {
                                return (
                                    <SidebarLink
                                        href={link.href}
                                        icon={link.icon}
                                        label={link.label}
                                        key={index}
                                    />
                                )
                            })
                        :
                        null
                }
            </ul>
            <SidebarControl/>
        </div>
    );
};
