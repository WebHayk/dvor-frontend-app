import {FC, memo} from "react";
import {NotificationType} from "@typescript/interfaces";
import Notification from "@components/Header/Notifications/Notification";

interface NotificationsList {
    notifications: NotificationType[]
}

export const NotificationsList: FC<NotificationsList> = memo(({notifications}) => {
    return (
        <>
            {
                notifications.length
                ?
                notifications.map(notification => {

                    let {
                        title,
                        body,
                        created_at,
                        id,
                        link
                    } = notification;

                    return (
                        <Notification
                            key={id}
                            id={id}
                            created_at={created_at}
                            link={link}
                            body={body}
                            title={title}
                        />
                    )
                })
                :
                <p>Пусто</p>
            }
        </>
    )
});

NotificationsList.displayName = "NotificationsList";