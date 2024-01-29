import React, {FC, useEffect, useState} from "react";
import styles from "./RegistrationConfirmDialog.module.scss";
import TextField from "@ui/TextField";
import Button from "@ui/Button";
import {RegistrationControlType} from "@typescript/interfaces";
import {addHiddenStyle, removeHiddenStyle} from "@common/utils/views";
import {useMutation} from "@apollo/client";
import {CONFIRM_REGISTRATION, GET_PROFILE, UPDATE_PROFILE} from "@api/mutations/mutations";
import useActions from "@hooks/useActions";
import {USER_SESSION} from "@api/query/query";
import {apiService} from "@services/apiService";

interface RegistrationConfirmDialog {
    open: boolean,
    setOpen: React.Dispatch<boolean>,
    values: RegistrationControlType
}

export const RegistrationConfirmDialog: FC<RegistrationConfirmDialog> = (
    {
        open,
        setOpen,
        values
    }
) => {

    let {
        userLoginAction,
        setSessionUserProfileAction,
        setSessionUserAction
    } = useActions();

    let [confirmRegistration] = useMutation(CONFIRM_REGISTRATION);
    let [getProfile] = useMutation(GET_PROFILE);

    let [code, setCode] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setCode(event.target.value);

    const handleSubmit = () => {
        if (code !== "") {
            confirmRegistration({
                variables: {
                    phone_number: values.phone_number,
                    pin_code: code
                }
            })
                .then(async (response) => {
                    userLoginAction(response.data.confirm_registration);

                    if (localStorage.getItem("token") !== null) {
                        apiService.queryRequest(USER_SESSION)
                            .then(response => {
                                setSessionUserAction(response.data.sessions[0]);

                                let variables = {
                                  name: values.first_name,
                                  last_name: values.last_name,
                                  avatar: null,
                                  gender: values.gender,
                                  mail: null,
                                  password: ""
                                };

                                apiService.mutationRequest(UPDATE_PROFILE, variables)
                                    .then(() => {
                                        getProfile()
                                            .then(response => {
                                                setSessionUserProfileAction(response.data.profile_get);
                                            })
                                            .catch(err => console.log(err))
                                    })
                                    .catch(err => console.log(err))

                            })
                            .catch(err => console.log(err))
                    }

                    setOpen(false);
                })
        }
    }

    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (open) {
            addHiddenStyle();
        } else {
            removeHiddenStyle();
        }
    }, [open])

    return (
        open
            ?
            <>
                <div className={styles.RegistrationConfirmDialog__backdrop}></div>
                <div className={styles.RegistrationConfirmDialog}>
                    <div className={styles.RegistrationConfirmDialog__content}>
                        <div className={styles.RegistrationConfirmDialog__top}>
                            <button className={styles.RegistrationConfirmDialog__close} onClick={handleClose}>
                                <img
                                    loading={"lazy"}
                                    src={"/images/close-black-icon.svg"}
                                    alt={"close-icon"}
                                    width={24}
                                    height={24}
                                />
                            </button>
                        </div>
                        <div className={styles.RegistrationConfirmDialog__bar}>
                            <p className={styles.RegistrationConfirmDialog__title}>Подтверждение номера телефона</p>
                            <div className={styles.RegistrationConfirmDialog__phone}>
                                <img
                                    loading={"lazy"}
                                    src={"/images/phone-template-icon.svg"}
                                    alt={"phone-template"}
                                    width={255}
                                    height={460}
                                />
                                <p className={styles.RegistrationConfirmDialog__template}>
                                    +7 (933) 993 - <span
                                    className={styles.RegistrationConfirmDialog__example}>XX - XX</span>
                                </p>
                            </div>
                            <div className={styles.RegistrationConfirmDialog__control}>
                                <p className={styles.RegistrationConfirmDialog__requirements}>Введите 4 последних цифры
                                    входящего номера телефона</p>
                                <div className={"mt-10"}>
                                    <TextField
                                        maxLength={4}
                                        placeholder={"Код"}
                                        type={"text"}
                                        value={code}
                                        name={"code"}
                                        onChange={handleChange}
                                    />
                                </div>
                                <p className={styles.RegistrationConfirmDialog__wait}>
                                    Не получили звонок? Подождите <span
                                    className={styles.RegistrationConfirmDialog__counter}>00:28</span>
                                </p>
                                <div className={styles.RegistrationConfirmDialog__submit}>
                                    <Button
                                        type={"submit"}
                                        onClick={handleSubmit}
                                        color={"blue"}
                                        label={"Завершить регистрацию"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            :
            null
    )
}