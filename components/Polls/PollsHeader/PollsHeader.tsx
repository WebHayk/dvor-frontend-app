import {FC} from "react";
import styles from "./PollsHeader.module.scss";
import PollsControl from "./PollsControl";

export const PollsHeader: FC = () => {
    return (
        <div className={styles.PollsHeader}>
            <p className={styles.PollsHeader__title}>Голосования</p>
            <PollsControl />
        </div>
    )
}