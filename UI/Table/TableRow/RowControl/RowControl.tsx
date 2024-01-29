import {FC} from "react";
import styles from "./RowControl.module.scss";

interface RowControl {
    handleEdit: () => void,
    handleDelete?: () => void,
    taskStatus?: string
}

export const RowControl: FC<RowControl> = (
    {
        handleDelete,
        handleEdit,
        taskStatus
    }
) => {
    return (
        <div className={styles.RowControl}>
            {
                taskStatus != "closed_succesful" && taskStatus != "canceled" &&
                <button className={styles.RowControl__edit} onClick={handleEdit}>
                    <img
                        src={"/images/edit-grey-icon.svg"}
                        alt={"grey-icon"}
                        width={24}
                        height={24}
                    />
                </button>
            }
            {
                !taskStatus
                &&
                <button onClick={handleDelete}>
                    <img
                        src={"/images/delete-icon.svg"}
                        alt={"delete-icon"}
                        width={24}
                        height={24}
                    />
                </button>
            }
        </div>
    )
}