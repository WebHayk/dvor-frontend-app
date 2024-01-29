import {Dispatch, FC, memo, useEffect, useState} from "react";
import styles from "./ChatHeader.module.scss";
import DropdownButton from "@ui/Dropdown/DropdownButton";
import ChatDropdown from "./ChatDropdown";
import {chatProfileImageHelper} from "@common/utils/helpers";
import {apiService} from "@services/apiService";
import {CHAT_USERS_COUNT} from "@api/query/query";
import UserView from "@ui/Chat/UserView";
import {CurrentChatType} from "@typescript/interfaces";
import MessagesActionsNavbar from "./MessagesActionsNavbar";
import {useChatSelector} from "@store/selectors";
import useActions from "@hooks/useActions";
import {requestsService} from "@services/requestsService";
import WarningDialog from "@ui/Dialog/WarningDialog";

interface ChatHeader {
    currentChat: CurrentChatType
}

export const ChatHeader: FC<ChatHeader> = memo((
    {
        currentChat
    }
) => {

    let {selectedMessages} = useChatSelector();

    let {
        setSelectedMessagesAction,
        setChatContentScrollAction
    } = useActions();

    let [deletionWarningOpen, setDeletionWarningOpen] = useState<boolean>(false); // Диалог подтверждения удаления
    let [deletionSubmitted, setDeletionSubmitted] = useState<boolean>(false); // Состояние подтверждения удаления

    let [open, setOpen] = useState<boolean>(false);
    let [usersCount, setUsersCount] = useState<number | null>(null);

    let image = chatProfileImageHelper(currentChat.chat_type.key, currentChat.organization, currentChat.private_user);
    let chatName = currentChat.private_user && currentChat.chat_type.key != "task" ? `${currentChat.private_user.profile.name} ${currentChat.private_user.profile.last_name}` : currentChat.name;

    useEffect(() => {
        apiService.queryRequest(CHAT_USERS_COUNT, {
            chat_id: currentChat.id
        })
            .then(response => {
                let data = response.data.chat_users_aggregate.aggregate.count;
                setUsersCount(data);
            })
            .catch(err => console.log(err))
    }, [currentChat]);

    const handleCancel = () => setSelectedMessagesAction([]);

    const handleDeleteMessages = () => setDeletionWarningOpen(true);

    useEffect(() => {
        if (deletionSubmitted) {
            requestsService.deleteMessages(selectedMessages);
            setDeletionWarningOpen(false);
            setDeletionSubmitted(false);
            setChatContentScrollAction(false);
            setSelectedMessagesAction([]);
        }
    }, [deletionSubmitted]);

    return (
        <div className={styles.ChatHeader}>
            {configureChatHeaderView(
                selectedMessages,
                currentChat,
                usersCount,
                chatName,
                image,
                open,
                setOpen,
                handleDeleteMessages,
                handleCancel,
                deletionWarningOpen,
                setDeletionWarningOpen,
                setDeletionSubmitted
            )}
        </div>
    )
});

ChatHeader.displayName = "ChatHeader";

// configure dynamic view

function configureChatHeaderView(
    selectedMessages: number[],
    currentChat: CurrentChatType,
    usersCount: number | null,
    chatName: string,
    image: string,
    open: boolean,
    setOpen: Dispatch<boolean>,
    handleDeleteMessages: () => void,
    handleCancel: () => void,
    deletionWarningOpen: boolean,
    setDeletionWarningOpen: Dispatch<boolean>,
    setDeletionSubmitted: Dispatch<boolean>
) {
    if (!selectedMessages.length) {
        return (
            <>
                {
                    currentChat
                    &&
                    <UserView
                        chat_id={currentChat.id}
                        type_key={currentChat.chat_type.key}
                        private_user={currentChat.private_user}
                        usersCount={usersCount}
                        title={chatName}
                        type={currentChat.chat_type.name}
                        image={image}
                    />
                }
                <div className={styles.ChatHeader__right}>
                    <DropdownButton
                        setOpen={setOpen}
                        open={open}
                    />
                    <div className={styles.ChatHeader__dropdown}>
                        <ChatDropdown
                            open={open}
                            setOpen={setOpen}
                        />
                    </div>
                </div>
            </>
        )
    } else {

        let messagesCount = selectedMessages.length;

        return (
            <>
                <WarningDialog
                    open={deletionWarningOpen}
                    setOpen={setDeletionWarningOpen}
                    setIsSubmitted={setDeletionSubmitted}
                >
                    {
                        messagesCount == 1
                            ?
                            "Удалить выбранное сообщение?"
                            :
                            `Удалить ${messagesCount} сообщения?`
                    }
                </WarningDialog>
                <MessagesActionsNavbar
                    onDeleteMessages={handleDeleteMessages}
                    onCancel={handleCancel}
                    count={messagesCount}
                />
            </>
        )
    }
}