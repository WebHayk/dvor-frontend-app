import {FC} from "react";
import styles from "./Paper.module.scss";
import cs from "classnames";

interface Paper {
    className?: any
}

export const Paper: FC<Paper> = (
    {
        children,
        className
    }
) => {
    return (
        <div className={cs({
            [styles.Paper]: true,
            [className]: className
        })}>
            {children}
        </div>
    )
}