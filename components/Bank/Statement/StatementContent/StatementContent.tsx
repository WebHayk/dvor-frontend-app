import {FC} from "react";
import StatementTab from "./StatementTab";
import styles from "../Statement.module.scss";

export const StatementContent: FC = () => {
    return (
        <div className={styles.StatementContent}>
            <StatementTab />
        </div>
    )
}