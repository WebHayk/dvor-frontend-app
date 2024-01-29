import {FC} from "react";
import styles from "../TabList.module.scss";
import cs from "classnames";

interface TabHeader {
    className?: any
}

export const TabHeader: FC<TabHeader> = (
    {
        children,
        className
    }
) => {
    return (
        <div className={cs({
            [styles.TabList__header]: true,
            [className]: className
        })}>
            {children}
        </div>
    )
}