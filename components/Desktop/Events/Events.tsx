import {FC} from "react";
import EventsTop from "./EventsTop/EventsTop";
import styles from "./Events.module.scss";

export const Events: FC = () => {
    return (
        <div className={styles.Events}>
            <EventsTop/>
        </div>
    )
}