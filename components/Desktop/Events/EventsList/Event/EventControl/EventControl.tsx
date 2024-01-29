import React, {FC} from "react";
import styles from "./EventControl.module.scss";
import ControlItem from "./ControlItem/ControlItem";

interface EventComments {
    setCommentsShow: React.Dispatch<boolean>,
    commentsShow: boolean
}

const EventControl: FC<EventComments> = (
    {
        setCommentsShow,
        commentsShow
    }
) => {

    const handleCommentsShow = () => setCommentsShow(!commentsShow);

    return (
        <div className={styles.Event__control}>
            <ControlItem
                onClick={() => console.log("Like handler!")}
                icon={"/images/like-icon.svg"}
                counter={"45"}
            />
            <ControlItem
                onClick={handleCommentsShow}
                icon={"/images/comments-icon.svg"}
                counter={"24"}
            />
            <ControlItem
                onClick={() => console.log("Share handler!")}
                icon={"/images/share-icon.svg"}
                counter={"12"}
            />
        </div>
    )
}

export default EventControl