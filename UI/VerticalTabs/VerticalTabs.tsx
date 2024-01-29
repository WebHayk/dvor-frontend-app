import React, {FC} from "react";
import styles from "./VerticalTabs.module.scss";
import {VerticalTabContext} from "@context/context";

interface VerticalTabs {
    setCurrentIndex: React.Dispatch<number>,
    currentIndex: number
}

export const VerticalTabs: FC<VerticalTabs> = (
    {
        children,
        setCurrentIndex,
        currentIndex
    }
) => {
    return (
        <VerticalTabContext.Provider value={{
            setCurrentIndex,
            currentIndex
        }}>
            <ul className={styles.VerticalTabs}>
                {children}
            </ul>
        </VerticalTabContext.Provider>
    )
}