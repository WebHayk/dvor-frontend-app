import {FC, memo, useEffect} from "react";
import {Suspense} from "react";
import styles from "./styles.module.scss";
import MainLayout from "@layouts/MainLayout";
import Breadcrumbs from "@ui/Breadcrumbs";
import Breadcrumb from "@ui/Breadcrumbs/Breadcrumb";
import Divider from "@ui/Breadcrumbs/Divider";
import AuthProvider from "@hoc/AuthProvider";
import dynamic from "next/dynamic";
import {checkWebSocketSupport} from "@common/utils/helpers";
import useActions from "@hooks/useActions";
import {useChatSelector} from "@store/selectors";
import {useSubscription} from "@apollo/client";
import {CHATS_VIEW} from "@api/subscriptions/subscriptions";
import {client} from "apollo-client";
import RoleScreenProvider from "@hoc/RoleScreenProvider";

const ChatComponent = dynamic(() => import("@components/Chat"), {
    suspense: true
});

const Chat: FC = memo(() => {

    let socketSupport = checkWebSocketSupport();
    let chatState = useChatSelector();

    useEffect(() => {
        if (!socketSupport) {
            window.alert("Ваш браузер не поддерживает socket");
        }
    }, [socketSupport]);

    let {setChatsViewAction} = useActions();

    let chatsViewSubscription = useSubscription(CHATS_VIEW, {
        shouldResubscribe: true,
        client: client
    });

    useEffect(() => {
        if (chatsViewSubscription.data) {
            let data = chatsViewSubscription.data.chats_view;
            setChatsViewAction(data);
        }
    }, [chatsViewSubscription.data, chatState.currentChat]);

    return (
            <AuthProvider>
                <RoleScreenProvider
                    roles={["resident", "senior", "owner", "spokesman"]}
                    isProfileVerified={"all"}
                >
                    <MainLayout>
                        <Breadcrumbs>
                            <Breadcrumb
                                href={"/"}
                                label={"Главная"}
                            />
                            <Divider/>
                            <Breadcrumb
                                href={"/chat"}
                                label={"Чат"}
                            />
                        </Breadcrumbs>
                        <p className={styles.Chat__title}>Чаты</p>
                        <Suspense fallback={"Загрузка..."}>
                            <ChatComponent/>
                        </Suspense>
                    </MainLayout>
                </RoleScreenProvider>
            </AuthProvider>
    )
});

Chat.displayName = "Chat";

export default Chat;