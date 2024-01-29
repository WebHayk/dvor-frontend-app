import {FC} from "react";
import styles from "./ApartmentHouseInfo.module.scss";
import ColumnBar from "@ui/ColumnBar";
import ContactsInfo from "@ui/Organizations/ContactsInfo";
import OrganizationBar from "@ui/Organizations/OrganizationBar";
import {useHousesMapSelector} from "@store/selectors";
import OrganizationChangesList from "./OrganizationChangesList";

export const ApartmentHouseInfo: FC = () => {

    let state = useHousesMapSelector();

    return (
        <div className={styles.ApartmentHouseInfo}>
            {
                state.apartmentHouse.info.organization
                ?
                <>
                <div className={styles.ApartmentHouseInfo__left}>
                    <div className={styles.ApartmentHouseInfo__item}>
                        <p className={styles.ApartmentHouseInfo__info}>Общая информация</p>
                        <ColumnBar
                            titles={[
                                "Зарегистрировано юзеров",
                                "Тип обслуживающей организации"
                            ]}
                            values={[
                                state.apartmentHouse.info.users_count,
                                state.apartmentHouse.info.organization.type.name
                            ]}
                        />
                    </div>
                    <div className={styles.ApartmentHouseInfo__item}>
                        <p className={styles.ApartmentHouseInfo__info}>Контактная информация</p>
                        <ContactsInfo
                            email={state.apartmentHouse.info.organization.email}
                            phone_number={state.apartmentHouse.info.organization.phone_number}
                            website={state.apartmentHouse.info.organization.website}
                        />
                    </div>
                    <div className={styles.ApartmentHouseInfo__item}>
                        <p className={styles.ApartmentHouseInfo__info}>История изменений обслуживающей организации</p>
                        <OrganizationChangesList />
                    </div>
                </div>
                <div className={styles.ApartmentHouseInfo__right}>
                    <OrganizationBar
                        logotype_path={state.apartmentHouse.info.organization.logotype_path}
                        type={state.apartmentHouse.info.organization.type}
                        phone_number={state.apartmentHouse.info.organization.phone_number}
                        legal_address={state.apartmentHouse.info.organization.legal_address}
                    />
                </div>
                </>
                :
                <p className={styles.ApartmentHouseInfo__empty}>Информация отсутствует</p>
            }
        </div>
    )
}