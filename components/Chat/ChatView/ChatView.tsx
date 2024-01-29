import {FC, memo} from "react";
import styles from "./ChatView.module.scss";
import ChatHeader from "./ChatHeader";
import ChatControlComponent from "./ChatControl";
import ChatContent from "@ui/Chat/ChatContent";
import {CurrentChatType} from "@typescript/interfaces";
import cs from "classnames";

interface ChatView {
    currentChat: CurrentChatType,
    className?: string,
    task_status?: string
}

export const ChatView: FC<ChatView> = memo((
    {
        currentChat,
        className,
        task_status
    }
) => {
    return (
        <div className={cs({
            [styles.ChatView]: true,
            [className as string]: className
        })}>
            <ChatHeader currentChat={currentChat} />
            <ChatContent
                currentChat={currentChat}
            />
            {
                configureChatControlComponentView(task_status, currentChat)
            }
        </div>
    )
});

ChatView.displayName = "ChatView";

function chatControlComponentView(currentChat: CurrentChatType) {
    return (
        <div className={styles.ChatView__control}>
            <ChatControlComponent currentChat={currentChat}/>
        </div>
    )
}

function configureChatControlComponentView(task_status: string | undefined, currentChat: CurrentChatType) {
    if (task_status) {
        if (task_status != "canceled" && task_status != "closed_succesful") {
            return chatControlComponentView(currentChat);
        }
    } else {
        return chatControlComponentView(currentChat);
    }
}