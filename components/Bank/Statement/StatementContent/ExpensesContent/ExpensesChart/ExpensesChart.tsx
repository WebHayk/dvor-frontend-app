import {ArcElement, Chart as ChartJS, Tooltip} from "chart.js";
import styles from "../ExpensesContent.module.scss";
import {FC} from "react";
import { Doughnut } from 'react-chartjs-2';
import {EXPENSES_COLORS, EXPENSES_DATA, EXPENSES_LABELS} from "@common/utils/options";

ChartJS.register(ArcElement, Tooltip);

const expensesChart = {
    labels: EXPENSES_LABELS,
    datasets: [
        {
            data: EXPENSES_DATA,
            backgroundColor: EXPENSES_COLORS
        },
    ],
};

export const ExpensesChart: FC = () => {
    return (
        <div className={styles.ExpensesChart}>
            <Doughnut data={expensesChart} />
        </div>
    )
}