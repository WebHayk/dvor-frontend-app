import {FC, Suspense} from "react";
import styles from "./PollStatistics.module.scss";
import PollResults from "./PollChart/PollResults";
import PollUsersVotedResults from "./PollUsersVotedChart/PollUsersVotedResults";
import dynamic from "next/dynamic";

const PollChart = dynamic(() => import("./PollChart"), {
    suspense: true
});
const PollUsersVotedChart = dynamic(() => import("./PollUsersVotedChart"), {
    suspense: true
});

export const PollStatistics: FC = () => {
    return (
        <div className={styles.PollStatistics}>
            <p className={styles.PollStatistics__title}>Статистика голосования</p>
            <div className={styles.PollStatistics__chart}>
                <Suspense fallback={"Загрузка.."}>
                    <PollChart/>
                </Suspense>
                <PollResults/>
            </div>
            <div className={styles.PollStatistics__chart}>
                <Suspense fallback={"Загрузка.."}>
                    <PollUsersVotedChart/>
                </Suspense>
                <PollUsersVotedResults/>
            </div>
        </div>
    )
}