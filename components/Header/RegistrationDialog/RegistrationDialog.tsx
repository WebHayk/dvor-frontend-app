import React, {FC, useEffect, useState} from "react";
import styles from "./RegistrationDialog.module.scss";
import {addHiddenStyle, removeHiddenStyle} from "@common/utils/views";
import RegistrationControl from "./RegistrationControl";
import {RegistrationControlType} from "@typescript/interfaces";
import RegistrationConfirmDialog from "@components/Header/RegistrationConfirmDialog";

interface RegistrationDialog {
    open: boolean,
    setOpen: React.Dispatch<boolean>
}

export const RegistrationDialog: FC<RegistrationDialog> = (
    {
        setOpen,
        open
    }
) => {

    let [values, setValues] = useState<RegistrationControlType>();

    let [confirmOpen, setConfirmOpen] = useState<boolean>(false);

    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (open) {
            addHiddenStyle();
        } else if (!confirmOpen) {
            removeHiddenStyle();
        }
    }, [open])

    return (
        <>
        <RegistrationConfirmDialog
            open={confirmOpen}
            setOpen={setConfirmOpen}
            values={values as RegistrationControlType}
        />
            {
                open
                ?
                <>
                    <div className={styles.RegistrationDialog__backdrop}></div>
                    <div className={styles.RegistrationDialog}>
                        <div className={styles.RegistrationDialog__content}>
                            <div className={styles.RegistrationDialog__top}>
                                <button onClick={handleClose}>
                                    <img
                                        src={"/images/close-black-icon.svg"}
                                        alt={"close-icon"}
                                        width={24}
                                        height={24}
                                    />
                                </button>
                            </div>
                            <div className={styles.RegistrationDialog__preview}>
                                <img
                                    src={"/images/logo.svg"}
                                    alt={"logo"}
                                    width={56}
                                    height={56}
                                />
                                <div className={styles.RegistrationDialog__info}>
                                    <p className={styles.RegistrationDialog__title}>Зарегистрируйтесь</p>
                                    <p className={styles.RegistrationDialog__description}>Описание для регистрации</p>
                                </div>
                            </div>
                            <div className={styles.RegistrationDialog__control}>
                                <RegistrationControl
                                    setOpen={setOpen}
                                    setValues={setValues}
                                    setConfirmOpen={setConfirmOpen}
                                />
                            </div>
                        </div>
                    </div>
                </>
                :
                null
            }
     </>
    )
}
