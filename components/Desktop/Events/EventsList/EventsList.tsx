import {FC} from "react";
import styles from "../Events.module.scss";
import Event from "./Event/Event";

const EventsList: FC = () => {
    return (
        <div className={styles.Events__list}>
            <Event />
        </div>
    )
}

export default EventsList