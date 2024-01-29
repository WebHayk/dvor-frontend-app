import React, {FC, useEffect, useState} from "react";
import styles from "./TasksFilterDialog.module.scss";
import Select from "@ui/Select";
import {useTasksSelector} from "@store/selectors";
import {useQuery} from "@apollo/client";
import {GET_TASK_STATUSES} from "@api/query/query";
import useActions from "@hooks/useActions";
import DateField from "@ui/DateField";
import {dateToFormattedHelper} from "@common/utils/helpers";
import FilterDialog from "@ui/Dialog/FilterDialog";
import {URGENTLY_LIST} from "@common/utils/options";

interface TasksFilterDialog {
    open: boolean,
    setOpen: React.Dispatch<boolean>
}

export const TasksFilterDialog: FC<TasksFilterDialog> = (
    {
        open,
        setOpen
    }
) => {

    let {data} = useQuery(GET_TASK_STATUSES);
    let taskState = useTasksSelector();

    let {
        setSearchTaskStatusAction,
        setSearchTaskDateAction,
        setSearchTaskUrgentlyAction
    } = useActions();

    let [urgently, setUrgently] = useState<string>("");
    let [status, setStatus] = useState<string>("");
    let [creationDate, setCreationDate] = useState<string>("");

    let filters = taskState.tasks.filters;

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => setStatus(event.target.value);
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => setCreationDate(event.target.value);
    const handleUrgentlyChange = (event: React.ChangeEvent<HTMLSelectElement>) => setUrgently(event.target.value);

    const handleSubmit = () => {

        let urgentlyValue = urgently != "" ? urgently : null;

        if (creationDate !== "") {
            let date = dateToFormattedHelper(creationDate, "yyyy/mm/dd");
            setSearchTaskDateAction(date);
        }

        setSearchTaskUrgentlyAction(urgentlyValue);
        setSearchTaskStatusAction(status);
        setOpen(false);
    }

    useEffect(() => {
        if (filters.creationDate == null) {
            setCreationDate("");
        } else {
            setCreationDate(filters.creationDate);
        }

        if (filters.status == null) {
            setStatus("");
        } else {
            setStatus(filters.urgently);
        }

        if (filters.urgently == null) {
            setUrgently("");
        } else {
            setStatus(filters.urgently);
        }
    }, [filters.creationDate, filters.status, filters.urgently])

    return (
        open
            ?
            <FilterDialog
                open={open}
                setOpen={setOpen}
                handleSubmit={handleSubmit}
                title={"Фильтр"}
                className={styles.TasksFilterDialog}
            >
                <div className={styles.TasksFilterDialog__content}>
                    <div className={styles.TasksFilterDialog__row}>
                        <Select
                            optionKey={"key"}
                            optionName={"name"}
                            label={"Статус"}
                            options={data.task_status}
                            value={status}
                            onChange={handleStatusChange}
                        />
                    </div>
                    <div className={styles.TasksFilterDialog__row}>
                        <Select
                            optionKey={"key"}
                            optionName={"name"}
                            label={"Критичность"}
                            options={URGENTLY_LIST}
                            value={urgently}
                            onChange={handleUrgentlyChange}
                        />
                    </div>
                    <div className={styles.TasksFilterDialog__date}>
                        <p className={styles.TasksFilterDialog__label}>Дата подачи заявки</p>
                        <DateField
                            value={creationDate}
                            onChange={handleDateChange}
                            name={"task-creation-date"}
                        />
                    </div>
                </div>
            </FilterDialog>
            :
            null
    )
}