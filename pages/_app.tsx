import type {AppProps} from 'next/app';
import "@fontsource/roboto";
import "../styles/main.scss";
import {wrapper} from "../store";
import {FC, useEffect} from "react";
import {ApolloProvider} from "@apollo/client";
import {client} from "../apollo-client";
import useActions from "@hooks/useActions";
import {useMainSelector} from "@store/selectors";
import {requestsService} from "@services/requestsService";
import {userOnlineInterval} from "@common/utils/helpers";
import {NotificationsService} from "@services/notificationsService";
import {LogoutService} from "@services/logoutService";
import MessagesView from "@components/MessagesView";

const App: FC<AppProps> = ({Component, pageProps}) => {
    let {
        userLogoutAction,
        authCheckAction,
        setSessionUserAction,
        setSessionUserProfileAction
    } = useActions();
    let state = useMainSelector();

    useEffect(() => {
        authCheckAction();

        if (state.isAuth) {
            userOnlineInterval();
            requestsService.getUserSession(setSessionUserAction, userLogoutAction);
            requestsService.getUserProfile(setSessionUserProfileAction, userLogoutAction);
        } else {
            if (!localStorage.getItem("token")) {
                NotificationsService.initHandler();
                LogoutService.resetStore();
            }
        }
    }, [state.isAuth]);

    return (
        <ApolloProvider client={client}>
            <MessagesView />
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default wrapper.withRedux(App);
