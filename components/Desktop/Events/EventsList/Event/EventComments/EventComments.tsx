import {FC} from "react";
import styles from "./EventComments.module.scss";
import Comment from "./Comment/Comment";
import AddComment from "./AddComment/AddComment";

const EventComments: FC = () => {
    return (
        <div className={styles.Event__comments}>
            <Comment />
            <Comment />
            <AddComment />
        </div>
    )
}

export default EventComments