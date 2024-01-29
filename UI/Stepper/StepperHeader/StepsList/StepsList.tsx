import {FC} from "react";
import styles from "../../Stepper.module.scss";

interface StepsListModel {
    steps: string[]
}

export const StepsList: FC<StepsListModel> = (
    {
        steps
    }
) => {
    return (
        <div className={styles.StepsList}>
            {
                steps.map(step => {

                })
            }
        </div>
    )
}