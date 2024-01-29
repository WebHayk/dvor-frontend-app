import {FC} from "react";
import styles from "./PollsDate.module.scss";
import cs from "classnames";

interface PollsDate {
    startDate: string,
    endDate: string,
    className?: any
}

export const PollsDate: FC<PollsDate> = (
    {
        startDate,
        endDate,
        className
    }
) => {

    let endDateValue = Intl.DateTimeFormat("ru").format(new Date(endDate));
    let startDateValue = Intl.DateTimeFormat("ru").format(new Date(startDate));

    return (
        <div className={cs({
            [styles.PollsDate]: true,
            [className]: className
        })}>
            <div className={styles.PollsDate__item}>
                <p className={styles.PollsDate__label}>Дата начала</p>
                <p className={styles.PollsDate__value}>{startDateValue}</p>
            </div>
            <div className={styles.PollsDate__item}>
                <p className={styles.PollsDate__label}>Дата окончания</p>
                <p className={styles.PollsDate__value}>{endDateValue}</p>
            </div>
        </div>
    )
}