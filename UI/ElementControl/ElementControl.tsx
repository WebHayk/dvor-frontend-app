import {FC} from "react";
import styles from "./ElementControl.module.scss";
import Button from "@ui/Button";

interface ElementControl {
    handleEdit: () => void,
    handleDelete: () => void
}

export const ElementControl: FC<ElementControl> = (
    {
        handleDelete,
        handleEdit
    }
) => {
    return (
        <div className={styles.ElementControl}>
            <Button
                icon={"/images/edit-white-icon.svg"}
                type={"button"}
                onClick={handleEdit}
                color={"blue"}
            />
            <Button
                icon={"/images/delete-icon.svg"}
                type={"button"}
                onClick={handleDelete}
                color={"white"}
            />
        </div>
    )
}