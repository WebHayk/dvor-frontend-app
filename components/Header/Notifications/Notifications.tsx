import {FC, memo, useEffect, useState} from "react";
import styles from "./Notifications.module.scss";
import useActions from "@hooks/useActions";
import {NotificationType} from "@typescript/interfaces";
import {useSubscription} from "@apollo/client";
import {NOTIFICATIONS} from "@api/subscriptions/subscriptions";
import {client} from "apollo-client";
import NotificationsList from "@components/Header/Notifications/NotificationsList";

export const Notifications: FC = memo(() => {

    let [notifications, setNotifications] = useState<NotificationType[]>([]);

    const {setNotificationsShowAction} = useActions();

    const notificationsSubscription = useSubscription(NOTIFICATIONS, {
        client,
        shouldResubscribe: true
    });

    useEffect(() => {
        if (notificationsSubscription.data) {
            let response = notificationsSubscription.data.notifications;
            setNotifications(response);
        }
    }, [notificationsSubscription.data]);

    const handleClose = () => setNotificationsShowAction();

    return (
        <div className={styles.Notifications}>
            <div className={styles.Notifications__top}>
                <p className={styles.Notifications__title}>Уведомления</p>
                <button
                    onClick={handleClose}
                    className={styles.Notifications__closeButton}
                >
                    <img
                        loading={"lazy"}
                        src={"/images/close-white-icon.svg"}
                        alt={"close-icon"}
                        width={24}
                        height={24}
                    />
                </button>
            </div>
            <div className={styles.Notifications__content}>
                <NotificationsList
                    notifications={notifications}
                />
            </div>
        </div>
    )
});

Notifications.displayName = "Notifications";