import {FC, memo} from "react";
import styles from "./CommonInfo.module.scss";
import Paper from "@ui/Paper";
import {useTasksSelector} from "@store/selectors";
import {dateFormatterHelper} from "@common/utils/helpers";
import ColumnBar from "@ui/ColumnBar";

export const CommonInfo: FC = memo(() => {

    let state = useTasksSelector();

    let creationDate = dateFormatterHelper(state.task.data.created_at);
    let task = state.task.data;

    return (
        <div className={styles.CommonInfo}>
            <Paper>
                <p className={styles.CommonInfo__title}>Общая информация</p>
                <ColumnBar
                    titles={[
                        "Номер задачи",
                        "Дата открытия",
                        "МКД",
                        "Тип заявки",
                        "Назначена",
                        "Этаж",
                        "Подъезд"
                    ]}
                    values={[
                        task.id,
                        creationDate,
                        `${task.apartment_house.thoroughfare_name} ${task.apartment_house.premise_number}`,
                        task.task_type ? task.task_type.name : "-",
                        task.worker ? task.worker.name :  "-",
                        task.floor_number || "-",
                        task.entrance_number || "-"
                    ]}
                />
            </Paper>
        </div>
    )
});

CommonInfo.displayName = "CommonInfo";