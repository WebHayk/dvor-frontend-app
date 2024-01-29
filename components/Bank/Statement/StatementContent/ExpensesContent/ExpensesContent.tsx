import {FC} from "react";
import styles from "./ExpensesContent.module.scss";
import ExpensesChart from "./ExpensesChart";
import ExpensesList from "./ExpensesList";

export const ExpensesContent: FC = () => {
    return (
        <div className={styles.ExpensesContent}>
            <ExpensesChart />
            <div className={styles.ExpensesContent__right}>
                <ExpensesList />
            </div>
        </div>
    )
}