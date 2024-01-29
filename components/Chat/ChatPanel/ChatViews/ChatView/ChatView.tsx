import {FC, memo} from "react";
import UserPanel from "@ui/Chat/UserPanel";
import {ChatsViewType} from "@typescript/interfaces";
import {useChatSelector} from "@store/selectors";
import useActions from "@hooks/useActions";
import {chatNameDetectorHelper, chatProfileImageHelper} from "@common/utils/helpers";
import {useRouter} from "next/router";

interface ChatView {
    view: ChatsViewType
}

export const ChatView: FC<ChatView> = memo((
    {
        view
    }
) => {

    let router = useRouter();

    let state = useChatSelector();
    let {
        setCurrentChatInfoAction
    } = useActions();

    let {
        organization,
        chat_type,
        id,
        name,
        created_at,
        private_user,
        draft
    } = view;

    let profileImage = chatProfileImageHelper(chat_type.key, organization, private_user);
    let chatName = chatNameDetectorHelper(private_user, name);

    let handleViewClick = () => {

        let query: any = {
            chat_id: id
        };

        if (state.currentChat) {
            query.drafted_chat_id = state.currentChat.id;
        }

        router.push({
            pathname: "/chat",
            query
        });

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

        if (state.currentChat) {
            if (chatInfo.id != state.currentChat.id) {
                setCurrentChatInfoAction(chatInfo);
            }
        } else {
            setCurrentChatInfoAction(chatInfo);
        }
    };

    return (
        <UserPanel
            chat_type={chat_type}
            lastMessage={view.chat_messages_view[0]}
            draft={draft?.content}
            unReadMessagesCount={view.unreaded_messages_count}
            onClick={handleViewClick}
            id={id}
            image={profileImage}
            private_user={view.private_user}
            title={chatName}
            creationDate={created_at}
            isActive={state.currentChat?.id == view.id}
        />
    )
});

ChatView.displayName = "ChatView";