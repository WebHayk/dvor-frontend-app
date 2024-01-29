import {FC} from "react";
import styles from "./UserProfileBar.module.scss";
import ProfileVerifiedIcon from "assets/icons/ProfileVerifiedIcon";
import cx from "classnames";

interface UserProfileBar {
    name: string,
    isVerifiedCondition: boolean | null,
    weight?: "regular" | "medium"
}

export const UserProfileBar: FC<UserProfileBar> = (
    {
        name,
        isVerifiedCondition,
        weight
    }
) => {
    return (
        <div className={styles.UserProfileBar}>
            <p className={cx({
                [styles.UserProfileBar__title]: true
            }, styles[weight || "medium"])}>{name}</p>
            {
                isVerifiedCondition
                &&
                <ProfileVerifiedIcon
                    className={styles.UserProfileBar__verified}
                />
            }
        </div>
    )
}