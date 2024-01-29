import React, {
    Dispatch,
    FC,
    memo,
    SetStateAction,
    useState
} from "react";
import styles from "./Message.module.scss";
import cx from "classnames";
import {ASSETS_BASE_URL} from "@common/utils/options";
import Avatar from "@ui/Avatar";
import {contextMenuInitHelper, dateDayCheckHelper} from "@common/utils/helpers";
import {CurrentChatMessageType, PositionType} from "@typescript/interfaces";
import useActions from "@hooks/useActions";
import {useChatSelector} from "@store/selectors";
import {useRouter} from "next/router";

interface Message {
    setDeletionIds: Dispatch<SetStateAction<number[]>>,
    setPosition: Dispatch<PositionType>,
    setIsShow: Dispatch<boolean>,
    isShow: boolean,
    setChatContentElement: Dispatch<HTMLDivElement>,
    chatContentElement: HTMLDivElement | null,
    localUserId: number,
    message: CurrentChatMessageType
}

export const Message: FC<Message> = memo((props) => {

    let {
        setDeletionIds,
        setPosition,
        setIsShow,
        isShow,
        setChatContentElement,
        chatContentElement,
        localUserId,
        message
    } = props;

    let {
        id,
        is_readed,
        user_id,
        user,
        attachments,
        content,
        created_at,
        reply_to
    } = message;

    let {
        name,
        avatar
    } = user.profile;

    let {selectedMessages, currentChat} = useChatSelector();
    let router = useRouter();
    let {query} = router;

    let {
        setChatReplyMessageAction,
        setSelectedMessagesAction
    } = useActions();

    let [checkerShow, setCheckerShow] = useState<boolean>(false); // Показать/скрыть чекер при наведении
    let [isReplyShow, setReplyShow] = useState<boolean>(false); // Показать/скрыть кнопку ответа

    let messageClassesCondition = [user_id == localUserId ? styles.Message__renderer : "", styles.Message__container];
    let isParticipant = user_id !== localUserId;
    let participantNameCondition = isParticipant ? name : "";
    let date = dateDayCheckHelper(created_at);
    let participantImageCondition = avatar ? ASSETS_BASE_URL + avatar : "/images/profile-empty-icon.svg";
    let isReadCondition = !isParticipant ? is_readed ? "/images/readed-icon.svg" : "/images/unread-icon.svg" : null;

    const onContextMenuHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        let {target} = event;

        let messageElement = (target as HTMLDivElement).closest(`[data-owner-id="${user_id}"]`);

        if (messageElement) {
            let messageOwnerId = parseInt(messageElement.getAttribute("data-owner-id") as string);

            if (messageOwnerId == localUserId) {
                contextMenuInitHelper<HTMLDivElement>(
                    event,
                    setIsShow,
                    setPosition
                );

                let chatContentElement = (messageElement as HTMLDivElement).closest(`[data-content="chat"]`);

                if (chatContentElement) {
                    setChatContentElement(chatContentElement as HTMLDivElement);
                    (chatContentElement as HTMLDivElement).classList.add("hidden");
                }

                setDeletionIds([id]);
            }
        }
    };

    const onMouseHandler = () => {
        if (user_id == localUserId) {
            setCheckerShow(!checkerShow);
        } else {
            setReplyShow(!isReplyShow);
        }
    };

    const handleMessageClick = (event: any) => {

        let baseRedirectVariable = {
            message_id: reply_to?.id
        };

        if (event.target.closest("#reply-message") || event.target.id.includes("#reply-message")) {
            if (currentChat) {
                router.push({
                    pathname: "/chat",
                    query: {
                        chat_id: currentChat?.id,
                        ...baseRedirectVariable
                    }
                });
            } else {
                if (query && query.view) {
                    let {view} = query;
                    router.push({
                        pathname: `${query.id}`,
                        query: {
                            view,
                            ...baseRedirectVariable
                        }
                    });
                }
            }
        } else {
            if (user_id == localUserId) {
                setSelectedMessagesAction(id);
            } else {
                setChatReplyMessageAction(message);
            }

            if (isShow) {
                setIsShow(false);
            }

            if (chatContentElement && chatContentElement.classList.contains("hidden")) {
                chatContentElement.classList.remove("hidden");
            }
        }
    }

    return (
        <>
            <div
                id={id.toString()}
                onMouseLeave={onMouseHandler}
                onMouseEnter={onMouseHandler}
                data-owner-id={user_id}
                onContextMenu={onContextMenuHandler}
                onClick={handleMessageClick}
                className={cx({
                    [styles.Message]: true,
                    [styles.Message__selected]: selectedMessages.includes(id),
                    [messageClassesCondition.join(" ")]: messageClassesCondition.length
                })}
            >
                {configureMessageCheckerView(
                    checkerShow,
                    selectedMessages,
                    id
                )}
                {configureParticipantAvatarView(
                    isParticipant,
                    participantImageCondition
                )}
                <div className={cx({
                    [styles.Message__info]: true,
                    [styles.Message__participant]: isParticipant,
                    [styles.Message__local]: !isParticipant
                })}>
                    {
                        reply_to
                        ?
                        isReplyShow
                        &&
                        <img
                            className={styles.Message__replyIcon}
                            width={15}
                            height={15}
                            src={"/images/reply-blue-icon.svg"}
                            alt={"reply-icon"}
                        />
                        :
                        null
                    }
                    {
                        reply_to
                        &&
                        <div id={"reply-message"} className={styles.Message__reply}>
                            <div className={styles.Message__divider}></div>
                            {
                                reply_to.attachments.length
                                ?
                                <img
                                    className={styles.Message__replyImage}
                                    src={ASSETS_BASE_URL + reply_to.attachments[0]}
                                    alt={"attachment-image"}
                                    width={30}
                                    height={30}
                                />
                                :
                                null
                            }
                            <div className={styles.Message__replyContent}>
                                <p className={styles.Message__owner}>{reply_to.user.profile.name}</p>
                                <div className={styles.Message__replyMessage}>{reply_to.content}</div>
                            </div>
                        </div>
                    }
                    {configureParticipantInfoView(
                        isParticipant,
                        participantNameCondition,
                        isReplyShow,
                        !reply_to
                    )}
                    {
                        attachments.length
                            ?
                            attachments.map(image => {
                                return (
                                    <img
                                        loading={"eager"}
                                        className={styles.Message__image}
                                        src={ASSETS_BASE_URL + image}
                                        alt={"image"}
                                        width={250}
                                        height={200}
                                        key={image}
                                    />
                                )
                            })
                            :
                            null
                    }
                    <p dangerouslySetInnerHTML={{__html: content}} className={cx({
                        [styles.Message__message]: true,
                        [styles.Message__renderer]: attachments.length
                    })}></p>
                    <div className={styles.Message__bottom}>
                        {configureMessageIsReadIconView(isReadCondition)}
                        <p className={styles.Message__date}>{date}</p>
                    </div>
                </div>
            </div>
        </>
    )
});

Message.displayName = "Message";

// configuring conditional views

function configureMessageIsReadIconView(isReadCondition: string | null) {
    if (isReadCondition) {
        return (
            <img
                loading={"eager"}
                src={isReadCondition}
                width={16}
                height={16}
                alt={"read-status"}
            />
        )
    }
}

function configureParticipantInfoView(
    isParticipant: boolean,
    participantNameCondition: string | null,
    isReplyShow: boolean,
    isReplyMessage: boolean
) {
    if (isParticipant) {
        return (
            <div
                className={styles.Message__top}
            >
                <p className={styles.Message__owner}>{participantNameCondition}</p>
                {
                    isReplyMessage
                    ?
                    isReplyShow
                    &&
                    <img
                        width={15}
                        height={15}
                        src={"/images/reply-blue-icon.svg"}
                        alt={"reply-icon"}
                    />
                    :
                    null
                }
            </div>
        );
    }
}

function configureParticipantAvatarView(isParticipant: boolean, participantImageCondition: string) {
    if (isParticipant) {
        return (
            <div className={styles.Message__profile}>
                <Avatar
                    loading={"eager"}
                    image={participantImageCondition}
                />
            </div>
        )
    }
}

function configureMessageCheckerView(checkerShow: boolean, selectedMessages: number[], id: number) {
    if (checkerShow || selectedMessages.includes(id)) {
        return (
            <img
                width={15}
                height={15}
                alt={"check-icon"}
                className={styles.Message__checker}
                src={"/images/check-blue-icon.svg"}
            />
        )
    }
}
