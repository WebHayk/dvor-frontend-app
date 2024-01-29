import {FC, useEffect, useState} from "react";
import styles from "./Notification.module.scss";
import {NotificationType} from "@typescript/interfaces";
import {dateFormatterHelper, dateToTimeHelper} from "@common/utils/helpers";
import cs from "classnames";
import {DEVELOPMENT_DOMAIN} from "@common/utils/variables";
import {useRouter} from "next/router";
import useActions from "@hooks/useActions";

export const Notification: FC<NotificationType> = (
    {
        created_at,
        body,
        title,
        id,
        link
    }
) => {

    let {setNotificationsShowAction} = useActions();
    let router = useRouter();

    let [linkValue, setLinkValue] = useState<string>("");

    let creationDateTime = dateToTimeHelper(created_at);
    let creationDateFormatted = dateFormatterHelper(created_at);

    useEffect(() => {
        if (link) {
            let data = link.replace(DEVELOPMENT_DOMAIN, "").trim();
            setLinkValue(data);
        }
    }, [link]);

    const handleRedirect = () => {
        if (linkValue) {
            router.push(linkValue);
            setNotificationsShowAction();
        }
    }

    return (
        <div onClick={handleRedirect} className={cs({
            [styles.Notification]: true,
            [styles.Notification__link]: link
        })}>
            <div className={styles.Notification__top}>
                <p className={styles.Notification__date}>{creationDateFormatted} {creationDateTime}</p>
                <p className={styles.Notification__title}>{title}</p>
            </div>
            <div className={styles.Notification__content}>
                <p
                    dangerouslySetInnerHTML={{__html: body}}
                    className={styles.Notification__info}
                >

                </p>
            </div>
        </div>
    )
}