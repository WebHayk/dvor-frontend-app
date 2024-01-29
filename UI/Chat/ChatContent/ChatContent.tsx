import {FC, memo, useEffect, useRef, useState} from "react";
import styles from "./ChatContent.module.scss";
import MessagesList from "./MessagesList";
import {CurrentChatMessageType, CurrentChatType} from "@typescript/interfaces";
import {CHAT_MESSAGES} from "@api/subscriptions/subscriptions";
import Button from "@ui/Button";
import {useMutation, useSubscription} from "@apollo/client";
import {READ_ALL_MESSAGES} from "@api/mutations/mutations";
import {client} from "apollo-client";
import useActions from "@hooks/useActions";
import {useChatSelector} from "@store/selectors";

interface ChatContent {
    currentChat: CurrentChatType
}

export const ChatContent: FC<ChatContent> = memo((
    {
        currentChat
    }
) => {

    let {isChatContentScroll, replyMessage} = useChatSelector();

    let {
        setSelectedMessagesAction,
        setChatContentScrollAction,
        setChatReplyMessageAction
    } = useActions();

    let [readChatAllMessages] = useMutation(READ_ALL_MESSAGES);

    let [messages, setMessages] = useState<CurrentChatMessageType[]>([]);
    let [offset, setOffset] = useState<number>(0);

    let [isShow, setIsShow] = useState<boolean>(true); // Кнопка загрузить еще

    let chatContentRef = useRef<HTMLDivElement | null>(null);

    let chatMessages = useSubscription(CHAT_MESSAGES, {
        client,
        shouldResubscribe: true,
        variables: {
            chat_id: currentChat?.id,
            offset
        }
    });

    useEffect(() => {
        setOffset(0);
        setChatContentScrollAction(true);
        setIsShow(false);
        setSelectedMessagesAction([]);

        if (replyMessage) {
            setChatReplyMessageAction(null);
        }
    }, [currentChat.id]);

    useEffect(() => {
        if (chatMessages.data) {
            readChatAllMessages({
                variables: {
                    readed_chat_id: currentChat.id
                }
            })
                .then(() => {
                    console.log("readed");
                })
                .catch(err => console.log(err))

            let data = chatMessages.data.chat_get_older_messages;

            if (data.length != 0) {
                if (offset == 0) {
                    setMessages(data);
                }

                if (offset > 0) {
                    setMessages((prevState: CurrentChatMessageType[]) => [...data, ...prevState]);
                }

                if (data.length < 50) {
                    setIsShow(false);
                } else {
                    setIsShow(true);
                }
            } else {
                setMessages([]);
                setIsShow(false);
            }
        }
    }, [chatMessages.data]);

    useEffect(() => {
        if (isChatContentScroll) {
            let chatContentTarget: HTMLDivElement | null = chatContentRef.current;
            if (chatContentTarget) chatContentTarget.scrollTop = chatContentTarget.scrollHeight;
        }
    }, [isChatContentScroll, messages]);

    const loadMoreHandler = () => {
        setOffset(prevState => prevState + 50);
        setChatContentScrollAction(false);
    };

    return (
        <div ref={chatContentRef} data-content={"chat"} className={styles.ChatContent}>
            <div className={styles.ChatContent__more}>
                {
                    isShow
                        ?
                        <Button
                            type={"button"}
                            onClick={loadMoreHandler}
                            color={"white"}
                            label={"Загрузить еще"}
                        />
                        :
                        null
                }
            </div>
            {
                messages.length
                ?
                <MessagesList
                    messages={messages}
                />
                :
                null
            }
        </div>
    )
});

ChatContent.displayName = "ChatContent";