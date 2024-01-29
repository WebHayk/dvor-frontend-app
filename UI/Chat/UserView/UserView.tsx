import {FC, memo, useEffect, useState} from "react";
import styles from "./UserView.module.scss";
import ChatInfoDialog from "@components/Chat/ChatView/ChatHeader/ChatInfoDialog";
import {useChatSelector} from "@store/selectors";
import Avatar from "@ui/Avatar";
import {ChatProfileType, ChatsViewType} from "@typescript/interfaces";
import {lastSeenHelper} from "@common/utils/helpers";
import {UserProfileBar} from "../../UserProfileBar/UserProfileBar";

interface UserView {
    title: string,
    type: string,
    type_key: string,
    image: string,
    usersCount: number | null,
    private_user: ChatProfileType | null,
    chat_id: number
}

export const UserView: FC<UserView> = memo((
    {
        title,
        type,
        type_key,
        image,
        usersCount,
        private_user,
        chat_id
    }
) => {

    let state = useChatSelector();
    let chatId = state.currentChat?.id;

    let [isInfoShow, setIsInfoShow] = useState<boolean>(false);

    let [lastSeen, setLastSeen] = useState<string>("");
    let [isOnline, setIsOnline] = useState<boolean>(false);

    let userInfo: ChatsViewType = state.chatsView.find((view: ChatsViewType) => view.id == chatId);
    let isVerifiedCondition = private_user ? private_user.user.is_verified : null;

    const handleShowInfo = () => setIsInfoShow(true);

    useEffect(() => {
        if (userInfo) {
            if (type_key != "task") {
                if (userInfo.chat_type.key == "private") {
                    let last_seen = userInfo.private_user.user.last_seen;
                    lastSeenHelper(last_seen, setLastSeen);
                    setIsOnline(userInfo.private_user.user.is_online);
                }
            }
        }
    }, [userInfo]);

    return (
        <>
            <ChatInfoDialog
                type_key={type_key}
                id={chat_id}
                count={usersCount as number}
                chatName={title}
                logo={image}
                open={isInfoShow}
                setOpen={setIsInfoShow}
            />
            <div className={styles.UserView}>
                <div className={styles.UserView__content}>
                    <Avatar
                        is_online={isOnline}
                        image={image}
                        size={"medium"}
                    />
                    <div className={styles.UserView__right}>
                        <UserProfileBar
                            name={title}
                            isVerifiedCondition={isVerifiedCondition}
                        />
                        {
                            configureChatInfoView(
                                private_user,
                                type,
                                handleShowInfo,
                                usersCount,
                                isOnline,
                                lastSeen
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
});

UserView.displayName = "UserView";

function configureChatInfoView(
    private_user: ChatProfileType | null,
    type: string,
    handleShowInfo: () => void,
    usersCount: number | null,
    isOnline: boolean,
    lastSeen: string
) {
    if (!private_user) {

        let usersCondition = usersCount ? `(${usersCount} участникa)` : null;

        return (
            <p className={styles.UserView__type}>
                {type}
                <span onClick={handleShowInfo}>{usersCondition}</span>
            </p>
        )
    } else {
        return (
            <p className={styles.UserView__status}>
                {
                    isOnline
                        ?
                        <span className={styles.UserView__online}>Онлайн</span>
                        :
                        lastSeen
                }
            </p>
        )
    }
}