import {FC, memo} from "react";
import styles from "../PollStatistics.module.scss";
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {usePollsSelector} from "@store/selectors";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip);

let options: any = {
    plugins: {
        datalabels: {
            formatter: (value: number, ctx: any) => {
                let datasets = ctx.chart.data.datasets;

                if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                    let sum = datasets[0].data.reduce((a: number, b: number) => a + b, 0);
                    return Math.round((value / sum) * 100) + "%";
                }
            },
            color: "white",
            font: {
                weight: "bold",
                size: 14,
            }
        }
    }
};

export const PollUsersVotedChart: FC = memo(() => {

    let state = usePollsSelector();

    let users_count = state.polls.poll.apartment_house.users_count;
    let voted_count = state.polls.poll.votes.length;
    let not_voted_count = users_count - voted_count;

    const data = {
        labels: ["Проголосовало", "Не проголосовали"],
        datasets: [
            {
                label: "",
                data: [voted_count, not_voted_count],
                backgroundColor: [
                    "#03BD5B",
                    "#C4C4C4",
                ]
            },
        ]
    };

    return (
        <div className={styles.PollUsersVotedChart}>
            <Pie
                plugins={[ChartDataLabels]}
                options={options}
                data={data}
            />
        </div>
    )
});

PollUsersVotedChart.displayName = "PollUsersVotedChart";