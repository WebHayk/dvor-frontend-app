import React, {FC} from "react";
import styles from "./FileRectangleButton.module.scss";

export const FileRectangleButton: FC = () => {
    return (
        <span className={styles.FileRectangleButton}>
            <img
                loading={"lazy"}
                src={"/images/file-add-icon.svg"}
                alt={"file-icon"}
                width={24}
                height={24}
            />
        </span>
    )
}