import React, {FC, memo, useEffect, useState} from "react";
import {CurrentChatMessageType} from "@typescript/interfaces";
import {ContextMenu} from "@ui/ContextMenu/ContextMenu";
import ContextMenuItem from "@ui/ContextMenu/ContextMenuItem";
import {requestsService} from "@services/requestsService";
import useActions from "@hooks/useActions";
import {useRouter} from "next/router";
import {useMainSelector} from "@store/selectors";
import Message from "@ui/Chat/Message";

interface MessagesList {
    messages: any
}

export const MessagesList: FC<MessagesList> = memo((
    {
        messages
    }
) => {

    let mainState = useMainSelector();
    let userId = mainState.user?.user_id;
    let removeMessageClassTimeout: ReturnType<typeof setTimeout>;

    let router = useRouter();
    let {query} = router;

    let {setChatContentScrollAction} = useActions();

    let [chatContentElement, setChatContentElement] = useState<HTMLDivElement | null>(null);
    let [deletionIds, setDeletionIds] = useState<number[]>([]);
    let [position, setPosition] = useState({
        x: 0,
        y: 0
    });
    let [isShow, setIsShow] = useState<boolean>(false);

    let [update, setUpdate] = useState<boolean>(false);

    const handleDelete = () => {
       requestsService.deleteMessages(deletionIds);

       if (chatContentElement) {
           chatContentElement.classList.remove("hidden");
       }

       setDeletionIds([]);
       setChatContentScrollAction(false);
       setIsShow(false);
    }

    useEffect(() => {
        if (query && query.message_id) {
            let {message_id} = query;
            let messageElement = document.getElementById(message_id as string);

            if (messageElement) {
                messageElement.classList.add("highlight");
                setUpdate(true);
                messageElement.scrollIntoView({
                    block: "center"
                });

                removeMessageClassTimeout = setTimeout(() => {
                    (messageElement as HTMLDivElement).classList.remove("highlight")
                }, 1000);
            }
        }

        return () => {
            if (removeMessageClassTimeout) clearTimeout(removeMessageClassTimeout)
        };
    }, [update, query, messages]);

    return (
        <>
            <ContextMenu position={position} isShow={isShow}>
                <ContextMenuItem
                    onClick={handleDelete}
                >
                    Удалить
                </ContextMenuItem>
            </ContextMenu>
            {
                messages.length
                    ?
                    messages.map((message: CurrentChatMessageType) => {
                        let {id} = message;
                        return (
                            <Message
                                key={id}
                                setPosition={setPosition}
                                localUserId={userId}
                                chatContentElement={chatContentElement}
                                setChatContentElement={setChatContentElement}
                                setDeletionIds={setDeletionIds}
                                setIsShow={setIsShow}
                                isShow={isShow}
                                message={message}
                            />
                        )
                    })
                    :
                    null
            }
        </>
    )
});

MessagesList.displayName = "MessagesList";