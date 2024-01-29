import {FC} from "react";
import styles from "../PollsHeader.module.scss";
import PollsFilter from "./PollsFilter";

export const PollsControl: FC = () => {
    return (
        <div className={styles.PollsControl}>
            {/*<PollsSearch />*/}
            <PollsFilter />
        </div>
    )
}