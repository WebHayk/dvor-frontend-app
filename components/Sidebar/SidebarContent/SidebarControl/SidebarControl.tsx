import React, {FC} from 'react';
import styles from "../SidebarContent.module.scss";
import useActions from "@hooks/useActions";
import {useMainSelector} from "@store/selectors";

export const SidebarControl: FC = () => {

    const {setSidebarShowAction} = useActions();
    const state = useMainSelector();

    const handleClick = () => setSidebarShowAction();

    return (
        <div
            onClick={handleClick}
            className={styles.Sidebar__control}
        >
                <img
                    loading={"lazy"}
                    className={!state.show.sidebar ? styles.Rotate : ""}
                    src={"/images/hide-icon.svg"}
                    alt={"hide-icon"}
                    width={"40"}
                    height={"40"}
                />
        </div>
    );
};