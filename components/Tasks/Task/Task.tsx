import {FC, useState, useEffect, memo} from "react";
import styles from "./Task.module.scss";
import TaskTop from "./TaskTop";
import TaskTab from "./TaskTab";
import {useMainSelector, useTasksSelector} from "@store/selectors";
import useActions from "@hooks/useActions";
import {useSubscription} from "@apollo/client";
import {GET_TASK_ONE} from "@api/subscriptions/subscriptions";
import {client} from "../../../apollo-client";
import {useRouter} from "next/router";
import TaskContent from "@components/Tasks/Task/TaskContent";

export const TaskComponent: FC = memo(() => {

    let state = useTasksSelector();
    let mainState = useMainSelector();
    let userId = mainState.user?.user_id;
    let router = useRouter();
    let {setTaskAction} = useActions();

    let [currentIndex, setCurrentIndex] = useState<number>(1);
    let localApartmentId = mainState.user?.apartment_user.apartment.id;

    let id = parseInt(router.query.id as string);

    let taskQuery = useSubscription(GET_TASK_ONE, {
        variables: {
            id
        },
        client,
        shouldResubscribe: true
    });

    useEffect(() => {
        if (id) {
            if (taskQuery.data) {
                let data = taskQuery.data.tasks_by_pk;
                let {apartment_id, owner_id} = data;

                if (apartment_id == localApartmentId || owner_id == userId) {
                    setTaskAction(data);
                } else {
                    router.push("/tasks");
                }
            }
        }
    }, [taskQuery.data]);

    return (
        state.task.data
        ?
        <div className={styles.TaskComponent}>
            <TaskTop
                setCurrentIndex={setCurrentIndex}
            />
            <div className={styles.TaskComponent__content}>
                <TaskTab
                    setCurrentIndex={setCurrentIndex}
                    currentIndex={currentIndex}
                />
                <TaskContent currentIndex={currentIndex}
                />
            </div>
        </div>
        :
        null
    )
});

TaskComponent.displayName = "TaskComponent";