import styles from "./Header.module.scss";
import {FC} from "react";
import AccountControl from "./AccountControl";
import Notifications from "./Notifications";
import {useMainSelector} from "@store/selectors";
import ApartmentAccountSelect from "./ApartmentAccountSelect";
import UserAuthorization from "@components/Header/UserAuthorization";

export const Header: FC = () => {

    const state = useMainSelector();

    return (
        <div className={styles.Header}>
            {
                state.isAuth && state.user?.apartment_user
                ?
                <div className={styles.Header__left}>
                    <ApartmentAccountSelect />
                </div>
                :
                null
            }
            <div className={styles.Header__right}>
                {
                    state.profile && state.user && state.isAuth
                    ?
                    <AccountControl />
                    :
                    <UserAuthorization />
                }
                { state.show.notifications ?  <Notifications /> : null }
            </div>
        </div>
    );
};