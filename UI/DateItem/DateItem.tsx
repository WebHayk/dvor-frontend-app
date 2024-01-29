import {FC} from "react";
import styles from "./DateItem.module.scss";

interface DateItem {
    date: string
}

export const DateItem: FC<DateItem> = (
    {
        date
    }
) => {
    return (
        <div className={styles.DateItem}>
            {date}
        </div>
    )
}