import {FC, useState} from "react";
import styles from "./ExpensesItem.module.scss";
import ExpensesDialog from "@components/Bank/Statement/StatementContent/ExpensesContent/ExpensesList/ExpensesDialog";

interface ExpensesItem {
    icon: string,
    type: string,
    amount: number
}

export const ExpensesItem: FC<ExpensesItem> = (
    {
        icon,
        type,
        amount
    }
) => {

    let [open, setOpen] = useState<boolean>(false);

    const handleExpensesDialogOpen = () => setOpen(true);

    return (
        <>
            <ExpensesDialog
                icon={icon}
                type={type}
                amount={amount}
                open={open}
                setOpen={setOpen}
            />
            <div onClick={handleExpensesDialogOpen} className={styles.ExpensesItem}>
                <img
                    src={icon}
                    width={40}
                    height={40}
                    alt={"expense-icon"}
                    loading={"lazy"}
                />
                <div className={styles.ExpensesItem__right}>
                    <p className={styles.ExpensesItem__type}>{type}</p>
                    <p className={styles.ExpensesItem__amount}>-{amount} ₽</p>
                </div>
            </div>
        </>
    )
}