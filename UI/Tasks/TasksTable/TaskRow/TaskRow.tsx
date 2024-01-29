import {FC} from "react";
import styles from "./TaskRow.module.scss";
import TableRow from "@ui/Table/TableRow";
import TableCell from "@ui/Table/TableCell";
import {TaskType} from "@typescript/interfaces";
import {dateFormatterHelper} from "@common/utils/helpers";
import {useRouter} from "next/router";
import TaskStatus from "@ui/Tasks/TaskStatus";
import RowControl from "@ui/Table/TableRow/RowControl";
import {useMainSelector} from "@store/selectors";

interface TaskRow extends TaskType {
    handleEdit?: () => void,
    control: boolean,
    isAvailableForView: boolean
}

export const TaskRow: FC<TaskRow> = (
    {
        task_status,
        tags,
        theme,
        created_at,
        id,
        apartment_house,
        handleEdit,
        control,
        owner_id,
        urgently,
        isAvailableForView
    }
) => {

    let state = useMainSelector();
    let date = dateFormatterHelper(created_at);
    let router = useRouter();
    let tagsList = tags.map(tag => tag.tag.name).join(", ");

    let rowClassesCondition = [control ? styles.TaskRow : "", isAvailableForView ? styles.TaskRow__hover : ""];

    const handleClick = () => {
        if (control && isAvailableForView) {
            router.push(`/tasks/${id}`);
        }
    }

    return (
        <TableRow
            classes={rowClassesCondition}
        >
            <TableCell
                onClick={handleClick}
                type={"td"}
            >
                {
                    isAvailableForView
                    &&
                    <p className={styles.TaskRow__label}>{id}</p>
                }
            </TableCell>
            <TableCell
                onClick={handleClick}
                type={"td"}
            >
                <p className={styles.TaskRow__title}>{theme}</p>
                {
                    tagsList.length
                        ?
                        <p className={styles.TaskRow__tags}>{tagsList}</p>
                        :
                        null
                }
            </TableCell>
            <TableCell
                type={"td"}
                onClick={handleClick}
            >
                <TaskStatus
                    task_status={task_status}
                    urgently={urgently}
                />
            </TableCell>
            <TableCell
                onClick={handleClick}
                type={"td"}
            >
                {
                    isAvailableForView
                    ?
                    apartment_house
                    ?
                    `${apartment_house.thoroughfare_name} ${apartment_house.premise_number}`
                    :
                    null
                    :
                    null
                }
            </TableCell>
            <TableCell
                onClick={handleClick}
                align={"right"}
                type={"td"}
            >
                {date}
            </TableCell>
            <TableCell type={"td"}>
                {
                    isAvailableForView
                    ?
                    handleEdit && owner_id == state.user?.user_id
                    ?
                    <RowControl
                        taskStatus={task_status.key}
                        handleEdit={handleEdit}
                    />
                    :
                    null
                    :
                    null
                }
            </TableCell>
        </TableRow>
    )
}