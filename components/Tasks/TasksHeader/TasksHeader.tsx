import React, {FC} from "react";
import styles from "./TasksHeader.module.scss";
import TasksControl from "./TasksControl";
import TasksFilters from "./TasksFilters";
import {OrganizationOperatorType} from "@typescript/interfaces";
import OrganizationWorkersBar from "./OrganizationWorkersBar";
import {useMainSelector} from "@store/selectors";

interface TasksHeader {
    operators: OrganizationOperatorType[]
}

export const TasksHeader: FC<TasksHeader> = ({operators}) => {

    let state = useMainSelector();
    let apartmentOrganizationWorkSchedule = state.user.apartment_user.apartment.apartment_house.organization.work_schedule;

    return (
        <div className={styles.TasksHeader}>
            <div className={styles.TasksHeader__content}>
                <div className={styles.TasksHeader__left}>
                    <p className={styles.TasksHeader__title}>Задачи</p>
                </div>
                <TasksControl />
            </div>
            <TasksFilters />
            {
                apartmentOrganizationWorkSchedule
                &&
                <OrganizationWorkersBar operators={operators}/>
            }
        </div>
    )
}