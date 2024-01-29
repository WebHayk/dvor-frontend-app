import React, {FC, Suspense} from "react";
import styles from "../Task.module.scss";
import {useTasksSelector} from "@store/selectors";
import Chat from "./Chat";
import dynamic from "next/dynamic";

interface TaskContent {
    currentIndex: number
}

const Application = dynamic(() => import("./Application"), {
    suspense: true
});

const HistoryChanges = dynamic(() => import("./HistoryChanges"), {
    suspense: true
});

export const TaskContent: FC<TaskContent> = (
    {
        currentIndex
    }
) => {

    let state = useTasksSelector();

    return (
            state.task
            ?
            currentIndex == 1
            ?
            <Suspense fallback={"Загрузка.."}>
                <div className={styles.TaskComponent__section}>
                    <Application />
                </div>
            </Suspense>
            :
            currentIndex == 2
            ?
            <div className={styles.TaskComponent__chat}>
                <Chat />
            </div>
            :
            <Suspense fallback={"Загрузка.."}>
                <div className={styles.TaskComponent__section}>
                    <HistoryChanges />
                </div>
            </Suspense>
            :
            null
    )
}