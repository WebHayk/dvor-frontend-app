import {FC} from "react";
import styles from "../ExpensesDialog.module.scss";

interface ExpensesDialogHeader {
    icon: string,
    type: string,
    time: string,
    amount: number
}

export const ExpensesDialogHeader: FC<ExpensesDialogHeader> = (
    {
        icon,
        type,
        time,
        amount
    }
) => {
    return (
        <div className={styles.ExpensesDialogHeader}>
            <img
                loading={"lazy"}
                src={icon}
                width={40}
                height={40}
                alt={"expense-icon"}
            />
            <div className={styles.ExpensesDialogHeader__right}>
                <p className={styles.ExpensesDialogHeader__type}>{type}</p>
                <p className={styles.ExpensesDialogHeader__description}>{time}: <span>{amount} ₽</span></p>
            </div>
        </div>
    )
}