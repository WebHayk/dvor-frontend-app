import {FC} from "react";
import cs from "classnames";
import styles from "./TaskStatus.module.scss";

interface TaskStatus {
    task_status: {
        key: string,
        name: string
    },
    urgently: boolean | string
}

export const TaskStatus: FC<TaskStatus> = (
    {
        task_status,
        urgently
    }
) => {
    return (
        <p className={cs({
            [styles.TaskStatus]: true,
            [styles.TaskStatus__canceled]: task_status.key == "canceled",
            [styles.TaskStatus__closed]: task_status.key == "closed_succesful",
            [styles.TaskStatus__open]: task_status.key == "open" || task_status.key == "re_moderation" || task_status.key == "in_progress",
            [styles.TaskStatus__new]: task_status.key == "new",
            [styles.TaskStatus__postponed]: task_status.key == "postponed",
        })}>
            {task_status.name}
            {
                urgently
                ?
                <span className={styles.TaskStatus__urgently}>Срочная</span>
                :
                null
            }
        </p>
    )
}