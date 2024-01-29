import {FC, useState} from "react";
import styles from "./UserAuthorization.module.scss";
import LoginDialog from "@components/Header/LoginDialog";
import RegistrationDialog from "@components/Header/RegistrationDialog";

export const UserAuthorization: FC = () => {

    let [authOpen, setAuthOpen] = useState<boolean>(false);
    let [registerOpen, setRegisterOpen] = useState<boolean>(false);

    const handleAuthDialogShow = () => setAuthOpen(true);

    return (
        <>
            <LoginDialog
                open={authOpen}
                setRegisterOpen={setRegisterOpen}
                setOpen={setAuthOpen}
            />
            <RegistrationDialog
                open={registerOpen}
                setOpen={setRegisterOpen}
            />
            <div className={styles.UserAuthorization}>
                <button onClick={handleAuthDialogShow} className={styles.UserAuthorization__authButton}>
                    Авторизация
                </button>
            </div>
        </>
    )
}