import {FC} from "react";
import styles from "./OrganizationBar.module.scss";
import OrganizationType from "@ui/Organizations/OrganizationType";
import {ASSETS_BASE_URL} from "@common/utils/options";

interface OrganizationBar {
    logotype_path: string,
    type: {
        name: string
    },
    phone_number: string,
    legal_address: string
}

export const OrganizationBar: FC<OrganizationBar> = (
    {
        legal_address,
        type,
        phone_number,
        logotype_path
    }
) => {
    return (
        <div className={styles.OrganizationBar}>
            <div className={styles.OrganizationBar__content}>
                <div className={styles.OrganizationBar__imageWrapper}>
                    <img
                        loading={"lazy"}
                        className={styles.OrganizationBar__image}
                        src={ASSETS_BASE_URL + logotype_path}
                        alt={"organization-image"}
                    />
                </div>
                <div className={styles.OrganizationBar__info}>
                    <div className={styles.OrganizationBar__item}>
                        <p className={styles.OrganizationBar__label}>Тип</p>
                        <OrganizationType type={type.name} />
                    </div>
                    <div className={styles.OrganizationBar__item}>
                        <p className={styles.OrganizationBar__label}>Телефон</p>
                        <p className={styles.OrganizationBar__value}>{phone_number}</p>
                    </div>
                    <div className={styles.OrganizationBar__item}>
                        <p className={styles.OrganizationBar__label}>Адрес</p>
                        <p className={styles.OrganizationBar__value}>{legal_address}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}