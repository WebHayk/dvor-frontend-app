import {FC, useState} from "react";
import styles from "./TasksFilter.module.scss";
import Button from "@ui/Button";
import TasksFilterDialog from "./TasksFilterDialog";

export const TasksFilter: FC = () => {

    let [open, setOpen] = useState<boolean>(false);

    const handleFilterShow = () => setOpen(!open);

    return (
        <div className={styles.TasksFilter}>
            <Button
                type={"button"}
                onClick={handleFilterShow}
                color={"white"}
                label={"Фильтр"}
            />
            <TasksFilterDialog
                open={open}
                setOpen={setOpen}
            />
        </div>
    )
}