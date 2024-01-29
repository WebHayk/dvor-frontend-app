import {FC} from "react";
import styles from "../TasksHeader.module.scss";
import SearchField from "@ui/SearchField";
import TasksFilter from "./TasksFilter";
import CreateTask from "./CreateTask";
import useActions from "@hooks/useActions";

export const TasksControl: FC = () => {

    let {setSearchTaskQueryAction} = useActions();

    return (
        <div className={styles.TasksControl}>
            <SearchField
                setAction={setSearchTaskQueryAction}
            />
            <TasksFilter />
            <CreateTask />
        </div>
    )
}