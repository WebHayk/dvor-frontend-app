import React, {FC, memo} from "react";
import {ChatUserType} from "@typescript/interfaces";
import ChatUser from "./ChatUser";

interface ChatUsersList {
    chatUsers: ChatUserType[],
    setOpen: React.Dispatch<boolean>,
    type_key: string
}

export const ChatUsersList: FC<ChatUsersList> = memo((
    {
        chatUsers,
        setOpen,
        type_key
    }
) => {
    return (
        <>
            {
                chatUsers.length
                ?
                chatUsers.map(user => {
                    return (
                        <ChatUser
                            type_key={type_key}
                            setOpen={setOpen}
                            key={user.user.id}
                            user={user}
                        />
                    )
                })
                :
                null
            }
        </>
    )
});

ChatUsersList.displayName = "ChatUsersList";