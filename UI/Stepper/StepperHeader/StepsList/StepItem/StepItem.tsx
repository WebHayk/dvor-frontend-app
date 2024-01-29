import {FC} from "react";
import styles from "../../../Stepper.module.scss";

interface StepItemModel {
    index: number
}

export const StepItem: FC<StepItemModel> = (
    {
        index,
        
    }
) => {
    return (
        <div className={styles.StepItem}>
            <div className={styles.StepItem__count}>
                {index}
            </div>
            <p></p>
        </div>
    )
}