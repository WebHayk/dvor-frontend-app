import React, {FC} from "react";
import styles from "../Main.module.scss";
import TasksList from "./Tasks";

export const MainBottom: FC = () => {
    return (
        <div className={styles.Main__bottom}>
            <TasksList />
        </div>
    )
}