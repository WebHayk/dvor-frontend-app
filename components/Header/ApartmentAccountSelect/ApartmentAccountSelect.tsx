import styles from "./ApartmentAccountSelect.module.scss";
import {FC, useState} from "react";
import ApartmentUsers from "./ApartmentUsers";
import {useMainSelector} from "@store/selectors";

export const ApartmentAccountSelect: FC = () => {

    let [open, setOpen] = useState<boolean>(false);
    let state = useMainSelector();

    const handleOpen = () => setOpen(!open);

    return (
        <div className={styles.ApartmentAccountSelect}>
            <div onClick={handleOpen} className={styles.ApartmentAccountSelect__item}>
                <div className={styles.ApartmentAccountSelect__wrapper}>
                    <img
                        loading={"lazy"}
                        src={"/images/home-icon.svg"}
                        alt={"home-icon"}
                        width={40}
                        height={40}
                    />
                    <div className={styles.ApartmentAccountSelect__content}>
                        <div className={styles.ApartmentAccountSelect__left}>
                            <p className={styles.ApartmentAccountSelect__type}>Аккаунт</p>
                            <p className={styles.ApartmentAccountSelect__title}>{state.user.apartment_user?.apartment.apartment_house.thoroughfare_name}, {state.user?.apartment_user.apartment.apartment_house.premise_number}, кв {state.user?.apartment_user.apartment.apartment_number}</p>
                        </div>
                    </div>
                </div>
                <img
                    loading={"lazy"}
                    src={"/images/arrow-grey-icon.svg"}
                    alt={"arrow-icon"}
                    width={24}
                    height={24}
                />
            </div>
            <ApartmentUsers
                open={open}
                setOpen={setOpen}
            />
        </div>
    )
}