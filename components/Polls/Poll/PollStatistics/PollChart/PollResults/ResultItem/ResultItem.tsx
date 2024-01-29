import {FC} from "react";
import styles from "../../../PollStatistics.module.scss";

interface ResultItem {
    variant: string,
    value: number
}

export const ResultItem: FC<ResultItem> = (
    {
        variant,
        value
    }
) => {
    return (
        <div className={styles.ResultItem}>
            <p className={styles.ResultItem__label}>{variant}</p>
            <p className={styles.ResultItem__value}>{value}</p>
        </div>
    )
}