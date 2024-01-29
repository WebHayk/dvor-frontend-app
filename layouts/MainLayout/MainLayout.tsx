import React, {FC, memo} from 'react';
import styles from "./MainLayout.module.scss";
import Sidebar from "@components/Sidebar";
import Header from "@components/Header";

export const MainLayout: FC = memo(({children}) => {
    return (
        <div className={styles.MainLayout}>
            <Sidebar />
            <div className={styles.MainLayout__content}>
                <Header />
                <div className={styles.MainLayout__info}>
                    {children}
                </div>
            </div>
        </div>
    );
});

MainLayout.displayName = "MainLayout";