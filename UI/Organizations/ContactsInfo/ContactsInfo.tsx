import {FC} from "react";
import styles from "./ContactsInfo.module.scss";

interface ContactsInfo {
    email: string | null,
    phone_number: string | null,
    website: string | null
}

export const ContactsInfo: FC<ContactsInfo> = (
    {
        email,
        phone_number,
        website
    }
) => {
    return (
        <div className={styles.ContactsInfo__info}>
            <div className={styles.ContactsInfo__row}>
                <img
                    loading={"lazy"}
                    src={"/images/email-grey-icon.svg"}
                    alt={"email-grey-icon"}
                    width={16}
                    height={12}
                />
                <span className={styles.ContactsInfo__label}>{email || "Отсутствует"}</span>
            </div>
            <div className={styles.ContactsInfo__row}>
                <img
                    loading={"lazy"}
                    src={"/images/phone-grey-icon.svg"}
                    alt={"phone-grey-icon"}
                    width={16}
                    height={16}
                />
                <span className={styles.ContactsInfo__label}>{phone_number || "Отсутствует"}</span>
            </div>
            <div className={styles.ContactsInfo__row}>
                <img
                    loading={"lazy"}
                    src={"/images/website-grey-icon.svg"}
                    alt={"website-grey-icon"}
                    width={16}
                    height={16}
                />
                <span className={styles.ContactsInfo__label}>{website || "Отсутствует"}</span>
            </div>
        </div>
    )
}