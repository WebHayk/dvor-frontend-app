import {FC, memo, useEffect, useState} from "react";
import styles from "./UserPanel.module.scss";
import cs from "classnames";
import {dateFormatterHelper, replaceAllWithRegexp} from "@common/utils/helpers";
import Badge from "@ui/Badge";
import {ChatProfileType, MessageViewType} from "@typescript/interfaces";
import Avatar from "@ui/Avatar";
import {UserProfileBar} from "../../UserProfileBar/UserProfileBar";

interface UserPanel {
    onClick: (id: number) => void,
    image: string,
    private_user: ChatProfileType,
    title: string,
    lastMessage: MessageViewType,
    creationDate: string,
    isActive: boolean,
    id: number,
    unReadMessagesCount: number,
    chat_type: {
        key: string,
        name: string
    },
    draft: string | null
}

export const UserPanel: FC<UserPanel> = memo((
    {
        onClick,
        image,
        private_user,
        title,
        chat_type,
        id,
        creationDate,
        lastMessage,
        isActive,
        unReadMessagesCount,
        draft
    }
) => {

    let date = lastMessage ? dateFormatterHelper(lastMessage.created_at) : dateFormatterHelper(creationDate);
    let isReadCondition = lastMessage ? lastMessage.is_readed ? "/images/readed-icon.svg" : "/images/unread-icon.svg" : null;
    let [description, setDescription] = useState<string>("");

    useEffect(() => {
        if (lastMessage && !draft) {
            if (lastMessage.content.includes("<br />")) {
                const replacedValue = replaceAllWithRegexp(lastMessage.content, "<br />", " ");
                setDescription(replacedValue);
            } else {
                setDescription(lastMessage.content);
            }
        } else {
            setDescription(draft as string);
        }
    }, [lastMessage, draft]);

    return (
        <div onClick={() => onClick(id)} className={cs({
            [styles.UserPanel]: true,
            [styles.UserPanel__active]: isActive
        })}>
            <div className={styles.UserPanel__content}>
                <div className={styles.UserPanel__left}>
                    <Avatar
                        is_online={private_user && private_user.user.is_online}
                        loading={"eager"}
                        image={image}
                        size={"large"}
                    />
                    <div className={styles.UserPanel__info}>
                        <UserProfileBar
                            name={title}
                            isVerifiedCondition={private_user?.user?.is_verified}
                        />
                        <p className={styles.UserPanel__description}>
                            {
                                draft
                                    ?
                                    <>
                                        <span className={styles.UserPanel__draft}>Черновик: </span>
                                        {description}
                                    </>
                                    :
                                    description
                            }
                        </p>
                    </div>
                </div>
                <div className={styles.UserPanel__right}>
                    <div className={styles.UserPanel__top}>
                        {
                            isReadCondition && chat_type.key == "private"
                                ?
                                <img
                                    loading={"eager"}
                                    src={isReadCondition}
                                    width={16}
                                    height={16}
                                    alt={"read-status"}
                                />
                                :
                                null
                        }
                        <p className={styles.UserPanel__date}>{date}</p>
                    </div>
                    {
                        unReadMessagesCount > 0
                            ?
                            <Badge
                                className={styles.UserPanel__counter}
                                color={"blue"}
                            >
                                {unReadMessagesCount}
                            </Badge>
                            :
                            null
                    }
                </div>
            </div>
        </div>
    )
});

UserPanel.displayName = "UserPanel";