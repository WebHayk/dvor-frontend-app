import {FC, useState} from "react";
import styles from "./Event.module.scss";
import EventTop from "./EventTop/EventTop";
import EventContent from "./EventContent/EventContent";
import EventControl from "./EventControl/EventControl";
import EventComments from "./EventComments/EventComments";

const Event: FC = () => {

    let [commentsShow, setCommentsShow] = useState<boolean>(false);

    return (
        <div className={styles.Event}>
            <EventTop/>
            <EventContent />
            <EventControl
                commentsShow={commentsShow}
                setCommentsShow={setCommentsShow}
            />
            {
                commentsShow
                ?
                <EventComments/>
                : null
            }
        </div>
    )
}

export default Event