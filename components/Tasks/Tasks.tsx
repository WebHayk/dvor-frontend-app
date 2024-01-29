import {FC, useEffect, useState, memo} from "react";
import styles from "./Tasks.module.scss";
import {
    useMainSelector,
    useTasksSelector
} from "@store/selectors";
import useActions from "@hooks/useActions";
import dynamic from "next/dynamic";
import {TASKS_COUNT, ORGANIZATION_OPERATORS} from "@api/subscriptions/subscriptions";
import {client} from "apollo-client";
import {useSubscription} from "@apollo/client";
import TasksContent from "@ui/Tasks/TasksContent";
import {OrganizationOperatorType} from "@typescript/interfaces";

const TasksHeader = dynamic(() => import("./TasksHeader"), {ssr: false});

export const TasksComponent: FC = memo(() => {

    const mainState = useMainSelector();
    const tasksState = useTasksSelector();

    let [currentTab, setCurrentTab] = useState(1);
    let [operators, setOperators] = useState<OrganizationOperatorType[]>([]);

    const {
        setMyTasksListAction,
        setTasksListAction,
        setTasksCountAction
    } = useActions();

    let filters = tasksState.tasks.filters;

    let variables = {
        pattern: filters.query,
        status_key: filters.status,
        urgently: filters.urgently,
        created_at: filters.creationDate
    };

    let tasksCountSubscription = useSubscription(TASKS_COUNT, {
        shouldResubscribe: true,
        client,
        variables: {
            owner_id: null,
            ...variables
        }
    });

    let localTasksCountSubscription = useSubscription(TASKS_COUNT, {
        shouldResubscribe: true,
        client,
        variables: {
            owner_id: mainState.user?.user_id,
            ...variables
        }
    });

    let organizationOperatorsQuery = useSubscription(ORGANIZATION_OPERATORS, {
        variables: {
            organization_id: mainState.user?.apartment_user.apartment.apartment_house.organization_id
        }
    });

    const props = {
        myTasks: {
            count: tasksState.tasks.local.count,
            data: tasksState.tasks.local.data,
            ownerId: mainState.user?.user_id,
            paginationAction: setMyTasksListAction
        },
        tasks: {
            count: tasksState.tasks.all.count,
            data: tasksState.tasks.all.data,
            ownerId: null,
            paginationAction: setTasksListAction
        }
    };

    useEffect(() => {
        if (tasksCountSubscription.data) {
            let data = tasksCountSubscription.data.task_search_aggregate.aggregate.count;
            setTasksCountAction(data, "all");
        }
    }, [tasksCountSubscription.data, mainState.user?.apartment_user]);

    useEffect(() => {
        if (localTasksCountSubscription.data) {
            let data = localTasksCountSubscription.data.task_search_aggregate.aggregate.count;
            setTasksCountAction(data, "local");
        }
    }, [localTasksCountSubscription.data, mainState.user?.apartment_user]);

    useEffect(() => {
        if (organizationOperatorsQuery.data) {
            let data = organizationOperatorsQuery.data.worker_users;
            setOperators(data);
        }
    }, [organizationOperatorsQuery]);

    return (
        <div className={styles.Tasks}>
            <TasksHeader
                operators={operators}
            />
            <TasksContent
                pattern={filters.query}
                urgently={filters.urgently}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                created_at={filters.creationDate}
                status_key={filters.status}
                control={true}
                myTasks={props.myTasks}
                tasks={props.tasks}
            />
        </div>
    )
});

TasksComponent.displayName = "TasksComponent";