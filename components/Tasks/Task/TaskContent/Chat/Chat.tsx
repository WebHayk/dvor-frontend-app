import React, {FC, memo} from "react";
import {useTasksSelector} from "@store/selectors";
import ChatView from "@components/Chat/ChatView";

export const Chat: FC = memo(() => {

    let state = useTasksSelector();

    let task_status = state.task.data.task_status.key;
    let user_operator_chat = state.task.data.operator_user_chat;
    let user_worker_chat = state.task.data.worker_user_chat;

    return (
        <>
            {
                user_worker_chat
                &&
                <ChatView
                    task_status={task_status}
                    className={"mt-20"}
                    currentChat={user_worker_chat}
                />
            }
            {
                user_operator_chat
                &&
                <ChatView
                    task_status={task_status}
                    currentChat={user_operator_chat}
                />
            }
        </>
    )
});

Chat.displayName = "Chat";