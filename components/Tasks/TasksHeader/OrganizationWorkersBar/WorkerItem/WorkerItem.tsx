import {FC, useEffect, useState} from "react";
import styles from "../OrganizationWorkersBar.module.scss";
import Avatar from "@ui/Avatar";
import {ASSETS_BASE_URL} from "@common/utils/options";
import {lastSeenHelper} from "@common/utils/helpers";

interface WorkerItem {
    avatar: string | null,
    isOnlineValue: boolean,
    name: string,
    lastSeenValue: string
}

export const WorkerItem: FC<WorkerItem> = (
    {
        avatar,
        isOnlineValue,
        name,
        lastSeenValue
    }
) => {

    let [isOnline, setIsOnline] = useState<boolean>(false);
    let [lastSeen, setLastSeen] = useState<string>("");

    let profileCondition = avatar ? ASSETS_BASE_URL + avatar : "/images/profile-empty-icon.svg";

    useEffect(() => {
        lastSeenHelper(lastSeenValue, setLastSeen);
        setIsOnline(isOnlineValue);
    },[lastSeenValue, isOnlineValue]);

    return (
        <div className={styles.WorkerItem}>
            <Avatar
                image={profileCondition}
                size={"medium"}
                is_online={isOnline}
            />
            <div className={styles.WorkerItem__right}>
                <p className={styles.WorkerItem__name}>{name}</p>
                {
                    isOnline
                    ?
                    <p className={styles.WorkerItem__online}>Онлайн</p>
                    :
                    <p className={styles.WorkerItem__lastSeen}>{lastSeen}</p>
                }
            </div>
        </div>
    )
}