import React, {FC, memo} from "react";
import styles from "./TaskAlert.module.scss";
import cs from "classnames";
import {dateFormatterHelper} from "@common/utils/helpers";
import Select from "@ui/Select";

interface TaskAlert {
    id: number,
    date: string,
    status: {
        key: string,
        name: string
    },
    urgently: string,
    className?: any
}

export const TaskAlert: FC<TaskAlert> = memo((
    {
        id,
        date,
        status,
        urgently,
        className
    }
) => {

    let creationDate = dateFormatterHelper(date);

    return (
        <div className={cs({
            [styles.TaskAlert]: true,
            [styles.TaskAlert__closed]: status.key == "closed_succesful",
            [styles.TaskAlert__moderation]: status.key == "open" || status.key == "re_moderation" || status.key == "in_progress",
            [styles.TaskAlert__new]: status.key == "new",
            [styles.TaskAlert__postponed]: status.key == "postponed",
            [styles.TaskAlert__canceled]: status.key == "canceled",
            [className]: className,
        })}>
            <div className={styles.TaskAlert__left}>
                <p className={styles.TaskAlert__title}>Заявка {id}</p>
                <p className={styles.TaskAlert__date}>от {creationDate}</p>
            </div>
            <div className={styles.TaskAlert__right}>
                <div className={styles.TaskAlert__column}>
                    <p className={styles.TaskAlert__label}>Текущий статус, стадия</p>
                    <p className={styles.TaskAlert__value}>{status.name}</p>
                </div>
                {
                    status.key != "closed_succesful" && status.key != "canceled"
                    &&
                    <div className={styles.TaskAlert__column}>
                        <p className={styles.TaskAlert__label}>Критичность</p>
                        <p className={styles.TaskAlert__value}>{urgently}</p>
                    </div>
                }
            </div>
        </div>
    )
});

TaskAlert.displayName = "TaskAlert";