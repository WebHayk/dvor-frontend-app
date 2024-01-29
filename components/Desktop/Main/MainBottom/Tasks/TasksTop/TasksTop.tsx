import {FC} from "react";
import styles from "./TasksTop.module.scss";
import Button from "@ui/Button";
import {useRouter} from "next/router";

export const TasksTop: FC = () => {

    let router = useRouter();

    const handleRedirect = () => router.push("/tasks");

    return (
        <div className={styles.TasksList__top}>
            <p className={styles.TasksList__title}>Задачи</p>
            <div className={styles.TasksList__right}>
                <Button
                    type={"button"}
                    onClick={handleRedirect}
                    label={"К задачам"}
                    color={"white"}
                />
            </div>
        </div>
    )
}