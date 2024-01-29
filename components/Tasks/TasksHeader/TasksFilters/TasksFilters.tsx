import {FC} from "react";
import styles from "./TasksFilters.module.scss";
import {useTasksSelector} from "@store/selectors";
import Chip from "@ui/Chip";
import useActions from "@hooks/useActions";
import {taskStatusFormatterHelper} from "@common/utils/helpers";
import FiltersList from "@ui/FiltersList";

export const TasksFilters: FC = () => {

    let tasksState = useTasksSelector();
    let {
        setSearchTaskQueryAction,
        setSearchTaskStatusAction,
        setSearchTaskDateAction,
        setSearchTaskUrgentlyAction
    } = useActions();

    const handleQueryDelete = () => setSearchTaskQueryAction(null);
    const handleStatusDelete = () => setSearchTaskStatusAction(null);
    const handleDateDelete = () => setSearchTaskDateAction("");
    const handleUrgentlyDelete = () => setSearchTaskUrgentlyAction(null);

    let filters = tasksState.tasks.filters;

    let {
        query,
        creationDate,
        urgently
    } = filters;

    let status = taskStatusFormatterHelper(filters.status);

    const removeAllFiltersHandler = () => {
        handleDateDelete();
        handleStatusDelete();
        handleQueryDelete();
        handleUrgentlyDelete();
    }

    return (
        filters.status || query || creationDate || urgently != null
        ?
        <FiltersList
            className={styles.TasksFilters}
            removeAllFiltersHandler={removeAllFiltersHandler}
        >
            {
                query
                &&
                <Chip
                    className={styles.TasksFilters__item}
                    label={`Поиск - ${query}`}
                    onDelete={handleQueryDelete}
                    active={true}
                />
            }
            {
                status
                &&
                <Chip
                    className={styles.TasksFilters__item}
                    label={`По статусу - ${status}`}
                    onDelete={handleStatusDelete}
                    active={true}
                />
            }
            {
                creationDate
                &&
                <Chip
                    label={`По дате подачи - ${creationDate}`}
                    onDelete={handleDateDelete}
                    active={true}
                />
            }
            {
                urgently != null
                &&
                <Chip
                    label={`По критичности - ${urgently ? "Срочная" : "Обычная"}`}
                    onDelete={handleUrgentlyDelete}
                    active={true}
                />
            }
        </FiltersList>
        :
        null
    )
}