import React, {FC, useEffect, useState} from "react";
import styles from "./ChatInfoDialog.module.scss";
import Dialog from "@ui/Dialog";
import {ChatUserType} from "@typescript/interfaces";
import ChatUsersList from "./ChatUsersList";
import {useSubscription} from "@apollo/client";
import {CHAT_USERS} from "@api/subscriptions/subscriptions";
import {client} from "apollo-client";

interface ChatInfoDialog {
    open: boolean,
    setOpen: React.Dispatch<boolean>,
    logo: string,
    chatName: string,
    count: number,
    id: number,
    type_key: string
}

export const ChatInfoDialog: FC<ChatInfoDialog> = (
    {
        open,
        setOpen,
        logo,
        chatName,
        count,
        type_key,
        id
    }
) => {

    let [chatUsers, setChatUsers] = useState<ChatUserType[]>([]);
    let chatUsersSubscription = useSubscription(CHAT_USERS, {
        variables: {
            chat_id: id
        },
        client: client,
        shouldResubscribe: true
    });

    useEffect(() => {
        if (chatUsersSubscription.data) {
            let data = chatUsersSubscription.data.chat_users;
            setChatUsers(data);
        }
    }, [chatUsersSubscription.data]);

    const handleClose = () => setOpen(false);

    return (
        <Dialog
            handleClose={handleClose}
            open={open}
            title={"Информация о чате"}
        >
            <div className={styles.ChatInfoDialog__top}>
                <img
                    alt={"logo"}
                    src={logo}
                    width={60}
                    height={60}
                    loading={"lazy"}
                />
                <div className={styles.ChatInfoDialog__left}>
                    <p className={styles.ChatInfoDialog__title}>{chatName}</p>
                    <p className={styles.ChatInfoDialog__count}>{count} участника</p>
                </div>
            </div>
            <div className={styles.ChatInfoDialog__list}>
                <ChatUsersList
                    type_key={type_key}
                    setOpen={setOpen}
                    chatUsers={chatUsers}
                />
            </div>
        </Dialog>
    )
}