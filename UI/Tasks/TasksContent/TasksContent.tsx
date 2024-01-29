import React, {FC, memo} from "react";
import TabList from "@ui/Tabs";
import Tab from "@ui/Tabs/Tab";
import styles from "./TasksContent.module.scss";
import TabPanel from "@ui/Tabs/TabPanel";
import {TaskType} from "@typescript/interfaces";
import TasksPagination from "@ui/Tasks/TasksList/TasksPagination";
import TasksList from "@ui/Tasks/TasksList";

interface TasksContent {
    control: boolean,
    myTasks: {
        count?: number,
        data: TaskType[],
        ownerId: number | null,
        paginationAction: any
    },
    tasks: {
        count?: number,
        data: TaskType[],
        ownerId: number | null,
        paginationAction: any
    },
    status_key: string | null,
    created_at: string | null,
    currentTab?: number,
    setCurrentTab?: React.Dispatch<number>,
    urgently: boolean | null,
    pattern: string | null
}

export const TasksContent: FC<TasksContent> = memo((
    {
        control,
        myTasks,
        tasks,
        status_key,
        created_at,
        currentTab,
        setCurrentTab,
        urgently,
        pattern
    }
) => {
    return (
        <TabList
            currentTabProp={currentTab}
            setCurrentTabProp={setCurrentTab}
        >
            <div className={styles.TasksContent__top}>
                <Tab
                    count={myTasks.count}
                    label={"Мои задачи"}
                    index={1}
                />
                <Tab
                    count={tasks.count}
                    label={"Задачи по дому"}
                    index={2}
                />
            </div>
            <TabPanel index={1}>
                <div className={styles.TasksContent__table}>
                    <TasksList
                        control={control}
                        array={myTasks.data}
                    />
                    <TasksPagination
                        pattern={pattern}
                        urgently={urgently}
                        array={myTasks.data}
                        created_at={created_at}
                        status_key={status_key}
                        ownerId={myTasks.ownerId}
                        setAction={myTasks.paginationAction}
                    />
                </div>
            </TabPanel>
            <TabPanel index={2}>
                <div className={styles.TasksContent__table}>
                    <TasksList
                        control={control}
                        array={tasks.data}
                    />
                    <TasksPagination
                        pattern={pattern}
                        urgently={urgently}
                        array={tasks.data}
                        created_at={created_at}
                        status_key={status_key}
                        ownerId={tasks.ownerId}
                        setAction={tasks.paginationAction}
                    />
                </div>
            </TabPanel>
        </TabList>
    )
});

TasksContent.displayName = "TasksContent";