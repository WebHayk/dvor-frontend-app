import {FC} from "react";
import styles from "./CommonInfo.module.scss";
import {useHousesMapSelector} from "@store/selectors";

export const CommonInfo: FC = () => {

    let state = useHousesMapSelector();
    let info = state.organization;

    return (
        <div className={styles.CommonInfo}>
            <div className={styles.CommonInfo__common}>
                <p className={styles.CommonInfo__title}>Общая информация</p>
                <div className={styles.CommonInfo__row}>
                    <div className={styles.CommonInfo__column}>
                        <p className={styles.CommonInfo__label}>Зарегистрировано юзеров</p>
                        <p className={styles.CommonInfo__label}>Тип обслуживающей организации</p>
                    </div>
                    <div className={styles.CommonInfo__column}>
                        <p className={styles.CommonInfo__value}>{info.house.users_count}</p>
                        <p className={styles.CommonInfo__value}>{info.organization.type.name}</p>
                    </div>
                </div>
            </div>
            <div className={styles.CommonInfo__contacts}>
                <p className={styles.CommonInfo__title}>Контактная информация</p>
                <div className={styles.CommonInfo__list}>
                    <div className={styles.CommonInfo__item}>
                        <img
                            loading={"lazy"}
                            src={"/images/email-grey-icon.svg"}
                            alt={"email-icon"}
                            width={16}
                            height={12}
                        />
                        <p className={styles.CommonInfo__label}>{info.organization.email || "Отсутствует"}</p>
                    </div>
                    <div className={styles.CommonInfo__item}>
                        <img
                            loading={"lazy"}
                            src={"/images/phone-grey-icon.svg"}
                            alt={"phone-icon"}
                            width={16}
                            height={16}
                        />
                        <p className={styles.CommonInfo__label}>{info.organization.phone_number || "Отсутствует"}</p>
                    </div>
                    <div className={styles.CommonInfo__item}>
                        <img
                            loading={"lazy"}
                            src={"/images/website-grey-icon.svg"}
                            alt={"website-icon"}
                            width={16}
                            height={16}
                        />
                        <p className={styles.CommonInfo__label}>{info.organization.website || "Отсутствует"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}