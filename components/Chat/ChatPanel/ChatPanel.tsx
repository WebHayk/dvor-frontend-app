import {FC} from "react";
import styles from "./ChatPanel.module.scss";
import ChatViews from "./ChatViews";

export const ChatPanel: FC = () => {
    return (
        <div className={styles.ChatPanel}>
            <ChatViews />
        </div>
    )
}