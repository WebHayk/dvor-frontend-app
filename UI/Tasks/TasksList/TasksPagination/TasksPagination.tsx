import React, {FC, memo, useEffect, useState} from "react";
import Pagination from "@ui/Pagination";
import {useSubscription} from "@apollo/client";
import {GET_TASKS} from "@api/subscriptions/subscriptions";
import styles from "../../TasksContent/TasksContent.module.scss";
import {client} from "apollo-client";
import {useMainSelector} from "@store/selectors";

let PAGE_SIZE = 10;

interface TasksPagination {
    ownerId: number | null,
    setAction: any,
    status_key: string | null,
    created_at: string | null,
    array: any,
    urgently: boolean | null,
    pattern: string | null
}

export const TasksPagination: FC<TasksPagination> = memo((
    {
        ownerId,
        setAction,
        status_key,
        created_at,
        array,
        urgently,
        pattern
    }
) => {
    let mainState = useMainSelector();

    let [page, setPage] = useState<number>(0);

    let tasks = useSubscription(GET_TASKS, {
        shouldResubscribe: true,
        client,
        variables: {
            pattern,
            offset: page * PAGE_SIZE,
            limit: PAGE_SIZE,
            owner_id: ownerId,
            status_key,
            created_at,
            urgently
        }
    });

    useEffect(() => { // Задачи с сервера
        if (tasks.data) {
            let data = tasks.data.task_search;
            if (!data.length && page > 0) {
                setPage(prevState => prevState - 1);
            } else {
                setAction(data);
            }
        }
    }, [tasks, mainState.user?.apartment_user]);

    return (
        array.length
        ?
        <div className={styles.TasksPagination}>
            <Pagination
                limit={PAGE_SIZE}
                array={array}
                page={page}
                setPage={setPage}
            />
        </div>
        :
        null
    )
});

TasksPagination.displayName = "TasksPagination";