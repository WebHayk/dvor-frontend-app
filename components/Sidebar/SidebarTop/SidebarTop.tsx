import React, {FC} from 'react';
import styles from "../Sidebar.module.scss";
import {useMainSelector} from "@store/selectors";
import {useRouter} from "next/router";

export const SidebarTop: FC = () => {

    const state = useMainSelector();
    const router = useRouter();

    const handleMainRedirect = () => {
        if (state.isAuth) {
            router.push("/desktop");
        } else {
            router.push("/");
        }
    };

    return (
        <div onClick={handleMainRedirect} className={styles.Sidebar__top}>
            <img
                loading={"lazy"}
                src={"/images/logo.svg"}
                width={36}
                height={36}
                alt={"logo"}
            />
            <div className={!state.show.sidebar ? styles.Sidebar__hideContent : ""}>
                <p className={styles.Sidebar__title}>ДВОР</p>
                <p className={styles.Sidebar__description}>Веб-приложение</p>
            </div>
        </div>
    );
};