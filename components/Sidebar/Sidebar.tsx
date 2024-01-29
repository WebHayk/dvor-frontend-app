import React, {FC} from 'react';
import styles from "./Sidebar.module.scss";
import SidebarTop from "./SidebarTop";
import {useMainSelector} from "@store/selectors";
import dynamic from "next/dynamic";

const SidebarContent = dynamic(() => import("./SidebarContent"), {
    ssr: true
});

export const Sidebar: FC = () => {

    const state = useMainSelector();

    return (
        <div className={`${styles.Sidebar} ${!state.show.sidebar ? styles.Sidebar__hide : ""}`}>
            <SidebarTop />
            <SidebarContent />
        </div>
    );
};