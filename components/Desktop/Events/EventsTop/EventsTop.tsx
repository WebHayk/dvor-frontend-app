import {FC} from "react";
import styles from "./EventsTop.module.scss";
import CreateEvent from "../CreateEvent/CreateEvent";
import EventsTab from "../EventsTab/EventsTab";

const EventsTop: FC = () => {
    return (
        <div className={styles.Events__header}>
            <div className={styles.Events__top}>
                <p className={styles.Events__title}>Лента событий</p>
                <CreateEvent />
            </div>
            <EventsTab />
        </div>
    )
}

export default EventsTop