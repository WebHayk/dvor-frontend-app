import {FC} from "react";
import styles from "./RowItem.module.scss";
import cs from "classnames";

interface RowItem {
    title: string,
    text: string,
    className?: any
}

export const RowItem: FC<RowItem> = (
    {
        title,
        text,
        className
    }
) => {
    return (
        <div className={cs({
            [styles.RowItem]: true,
            [className]: className
        })}>
            <p className={styles.RowItem__title}>{title}</p>
            <p className={styles.RowItem__text}>{text}</p>
        </div>
    )
}