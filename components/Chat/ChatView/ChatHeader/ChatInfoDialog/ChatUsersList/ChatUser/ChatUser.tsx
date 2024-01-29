import React, {FC, memo, useEffect, useState} from "react";
import styles from "./ChatUser.module.scss";
import {ChatsViewType, ChatUserType} from "@typescript/interfaces";
import {ASSETS_BASE_URL} from "@common/utils/options";
import useActions from "@hooks/useActions";
import {requestsService} from "@services/requestsService";
import {useChatSelector, useMainSelector} from "@store/selectors";
import {lastSeenHelper} from "@common/utils/helpers";
import Avatar from "@ui/Avatar";
import UserProfileBar from "@ui/UserProfileBar";

interface ChatUser {
    user: ChatUserType,
    setOpen: React.Dispatch<boolean>,
    type_key: string
}

export const ChatUser: FC<ChatUser> = memo((
    {
        user,
        setOpen,
        type_key
    }
) => {

    let mainState = useMainSelector();
    let {chatsView} = useChatSelector();
    let userId = mainState.user?.user_id;
    let {setCurrentChatInfoAction} = useActions();

    let {
        profile,
        is_online,
        last_seen,
        is_verified
    } = user.user;

    let [lastSeen, setLastSeen] = useState<string>("");

    let avatarCondition = profile.avatar ? ASSETS_BASE_URL + profile.avatar : "/images/profile-empty-icon.svg";

    const userChatHandler = async () => {
        let response = await requestsService.insertPrivateChat(user.user.id);

        if (response) {
            let id = response.data.chat_private_insert.id;
            let profile = response.data.chat_private_insert.private_user;
            let chatView = chatsView.find((view: ChatsViewType) => view.id == id);

            let currentChat = {
                id,
                chat_type: {
                    key: "private",
                    name: "Приватный чат"
                },
                name: "private",
                organization: null,
                private_user: profile,
                draft: chatView.draft
            };

            setCurrentChatInfoAction(currentChat);
            setOpen(false);
        }
    }

    useEffect(() => {
        lastSeenHelper(last_seen, setLastSeen);
    }, [user]);

    return (
        <div className={styles.ChatUser}>
            <div className={styles.ChatUser__left}>
                <Avatar
                    image={avatarCondition}
                    is_online={is_online}
                    size={"medium"}
                />
                <div className={styles.ChatUser__right}>
                    <UserProfileBar
                        name={`${profile.name} ${profile.last_name}`}
                        isVerifiedCondition={is_verified}
                    />
                    <p className={styles.UserView__status}>{
                        is_online
                            ?
                            <span className={styles.UserView__online}>Онлайн</span>
                            :
                            lastSeen
                    }</p>
                </div>
            </div>
            {
                user.user.id != userId && mainState.profile?.user.is_verified && user.user.is_verified && type_key != "task"
                ?
                <div className={styles.ChatUser__right}>
                    <button onClick={userChatHandler}>
                        <img
                            loading={"lazy"}
                            src={"/images/chat-icon.svg"}
                            alt={"chat-icon"}
                            width={21}
                            height={21}
                        />
                    </button>
                </div>
                :
                null
            }
        </div>
    )
});

ChatUser.displayName = "ChatUser";