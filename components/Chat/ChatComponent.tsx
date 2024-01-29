import {FC, memo, useEffect} from "react";
import styles from "./ChatComponent.module.scss";
import ChatPanel from "./ChatPanel";
import ChatView from "./ChatView";
import {useChatSelector} from "@store/selectors";
import {useRouter} from "next/router";
import {ChatProfileType, ChatsViewType, CurrentChatType} from "@typescript/interfaces";
import {chatNameDetectorHelper} from "@common/utils/helpers";
import useActions from "@hooks/useActions";

export const ChatComponent: FC = memo(() => {

    let state = useChatSelector();
    let router = useRouter();
    let {query} = router;

    let {setCurrentChatInfoAction} = useActions();

    useEffect(() => {
        if (query && query.chat_id && !state.currentChat) {
            let {chat_id} = query;

            if (state.chatsView.length) {
                let currentChat = state.chatsView.find((chat: ChatsViewType) => chat.id == +chat_id);

                if (currentChat) {

                    router.push({
                        pathname: "/chat",
                        query: {
                            chat_id,
                            drafted_chat_id: chat_id
                        }
                    });

                    let {
                        name,
                        private_user,
                        id,
                        chat_type,
                        organization,
                        draft
                    }: CurrentChatType = currentChat;

                    let chatName = chatNameDetectorHelper(private_user as ChatProfileType, name);

                    let chatInfo = {
                        id,
                        chat_type: {
                            key: chat_type.key,
                            name: chat_type.name
                        },
                        name: chatName,
                        organization,
                        private_user,
                        draft: draft ? {
                            content: draft.content
                        } : null
                    };

                    setCurrentChatInfoAction(chatInfo);
                }

            }
        }
    }, [state.chatsView]);

    return (
        <div className={styles.ChatComponent}>
            <div className={styles.ChatComponent__content}>
                <ChatPanel/>
                {
                    state.currentChat
                    &&
                    <ChatView
                        currentChat={state.currentChat}
                    />
                }
            </div>
        </div>
    )
});

ChatComponent.displayName = "ChatComponent";