import {FC, ReactNode} from "react";
import styles from "./Badge.module.scss";
import cs from "classnames";

interface Badge {
    children: ReactNode,
    color: "blue",
    className?: string
}

export const Badge: FC<Badge> = (
    {
        children,
        color,
        className
    }
) => {
    return (
        <div className={cs({
            [styles.Badge]: true,
            [styles.Badge__blue]: color == "blue",
            [className as string]: className
        })}>
            {children}
        </div>
    )
}