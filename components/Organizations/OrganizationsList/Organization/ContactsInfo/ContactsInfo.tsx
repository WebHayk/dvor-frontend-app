import {FC, useContext} from "react";
import styles from "./ContactsInfo.module.scss";
import {OrganizationContext} from "@context/context";
import {OrganizationsType} from "@typescript/interfaces";
import ContactsInfo from "@ui/Organizations/ContactsInfo";
import RoleElementProvider from "@hoc/RoleElementProvider";

export const ContactsInfoComponent: FC = () => {

    let data: OrganizationsType = useContext(OrganizationContext);

    return (
        <div className={styles.ContactsInfo}>
            <p className={styles.ContactsInfo__title}>Контактная информация</p>

            <ContactsInfo
                email={data.email}
                phone_number={data.phone_number}
                website={data.website}
            />

            <div className={styles.ContactsInfo__item}>
                <p className={styles.ContactsInfo__itemTitle}>Юридический адрес компании</p>
                <p className={styles.ContactsInfo__itemLabel}>{data.legal_address || "Отсутствует"}</p>
            </div>
            <RoleElementProvider roles={["manager"]}>
                <div className={styles.ContactsInfo__item}>
                    <p className={styles.ContactsInfo__itemTitle}>Почта, на которую будут отправляться показания</p>
                    <p className={styles.ContactsInfo__itemLabel}>{data.service_email || "Отсутствует"}</p>
                </div>
            </RoleElementProvider>

        </div>
    )
}