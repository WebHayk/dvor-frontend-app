import cs from "classnames";
import styles from "../TabSwitch.module.scss";
import {FC, ReactNode} from "react";

interface TabHeader {
    className?: any,
    children: ReactNode
}

export const TabHeader: FC<TabHeader> = (
    {
        className,
        children
    }
) => {
    return (
        <div className={cs({
            [styles.TabHeader]: true,
            [className]: className
        })}>
            {children}
        </div>
    )
}