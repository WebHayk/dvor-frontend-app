import React, {FC, useEffect, useState} from "react";
import styles from "./LoginDialog.module.scss";
import {addHiddenStyle, removeHiddenStyle} from "@common/utils/views";
import {Formik} from "formik";
import TextField from "@ui/TextField";
import ShowButton from "@ui/Button/ShowButton";
import {useMutation} from "@apollo/client";
import useActions from "@hooks/useActions";
import {LOGIN_FORM_SCHEMA} from "@common/schemas/schemas";
import {ErrorMessage} from "formik";
import {USER_SESSION} from "@api/query/query";
import {GET_PROFILE, LOGIN_USER} from "@api/mutations/mutations";
import PhoneField from "@ui/PhoneField";
import {apiService} from "@services/apiService";
import Button from "@ui/Button";
import ErrorMessageComponent from "@ui/Messages/ErrorMessage";
import {firebaseCloudMessaging} from "@common/firebase/config";

interface LoginDialog {
    open: boolean,
    setOpen: React.Dispatch<boolean>,
    setRegisterOpen: React.Dispatch<boolean>
}

export const LoginDialog: FC<LoginDialog> = (
    {
        open,
        setOpen,
        setRegisterOpen
    }
) => {

    let [error, setError] = useState<string>("");

    let {userLoginAction, setSessionUserProfileAction, setSessionUserAction} = useActions();
    let [phoneNumber, setPhoneNumber] = useState<string>("");

    let [passwordType, setPasswordType] = useState<"text" | "password">("password");

    const [loginUser] = useMutation(LOGIN_USER);
    const [userProfile] = useMutation(GET_PROFILE);

    const handleClose = () => setOpen(!open);

    useEffect(() => {
        if (open) {
            addHiddenStyle();
        } else {
            removeHiddenStyle();
        }
    }, [open])

    const registerDialogShow = () => {
        setOpen(false);
        setRegisterOpen(true);
    }

    return (
        open
            ?
            <>
                <div className={styles.LoginDialog__backdrop}> </div>
                <div className={styles.LoginDialog}>
                    <div className={styles.LoginDialog__content}>
                        <div className={styles.LoginDialog__top}>
                            <button onClick={handleClose}>
                                <img
                                    loading={"lazy"}
                                    src={"/images/close-black-icon.svg"}
                                    alt={"close-icon"}
                                    width={24}
                                    height={24}
                                />
                            </button>
                        </div>
                        <div className={styles.LoginDialog__preview}>
                            <img
                                loading={"lazy"}
                                src={"/images/logo.svg"}
                                alt={"logo"}
                                width={56}
                                height={56}
                            />
                            <div className={styles.LoginDialog__info}>
                                <p className={styles.LoginDialog__title}>Добро пожаловать!</p>
                                <p className={styles.LoginDialog__description}>Авторизируйтесь для того, чтобы
                                    использовать все возможности сервиса</p>
                            </div>
                        </div>

                        <Formik
                            initialValues={{
                                phone_number: "",
                                password: ""
                            }}
                            onSubmit={async (values) => {

                                if (phoneNumber != "") {

                                    setError("");

                                    let password = values.password;

                                    loginUser({
                                        variables: {
                                            password: password,
                                            phone_number: phoneNumber,
                                            fcm_token: await firebaseCloudMessaging.getTokenFromStorage()
                                        }
                                    })
                                        .then((response) => {

                                            let data = response.data.login_user;
                                            userLoginAction(data);

                                            if (localStorage.getItem("token") !== null) {
                                                apiService.queryRequest(USER_SESSION)
                                                    .then(response => {
                                                        setSessionUserAction(response.data.sessions[0]);
                                                    })
                                                    .catch(err => console.log(err))

                                                userProfile()
                                                    .then(response => {
                                                        setSessionUserProfileAction(response.data.profile_get);
                                                    })
                                                    .catch(err => console.log(err))
                                            }

                                            setOpen(false);
                                        })
                                        .catch(err => console.log(err))
                                } else {
                                    setError("Необходимо заполнить номер телефона");
                                }
                            }
                            }
                            validationSchema={LOGIN_FORM_SCHEMA}
                        >
                            {({
                                  values,
                                  handleChange,
                                  handleSubmit,
                                  handleBlur
                              }) => (
                                 <div className={styles.LoginDialog__control}>
                                     <PhoneField
                                         value={phoneNumber}
                                         setValue={setPhoneNumber}
                                     />
                                     {
                                         error != ""
                                         &&
                                         <ErrorMessageComponent label={error} />
                                     }
                                     <div className={styles.LoginDialog__password}>
                                        <TextField
                                            onBlur={handleBlur}
                                            type={passwordType}
                                            value={values.password}
                                            name={"password"}
                                            onChange={handleChange}
                                            placeholder={"Пароль"}
                                        />
                                        <ShowButton
                                            type={passwordType}
                                            setType={setPasswordType}
                                        />
                                     </div>
                                     <ErrorMessage
                                         name={"password"}
                                         render={msg => <ErrorMessageComponent label={msg} />}
                                     />
                                     <button className={styles.LoginDialog__remind}>Напомнить пароль?</button>
                                     <div className={styles.LoginDialog__submit}>
                                         <Button
                                             type={"button"}
                                             onClick={handleSubmit}
                                             color={"blue"}
                                             label={"Войти в сервис"}
                                         />
                                     </div>
                                 </div>
                              )}
                        </Formik>

                        <div className={styles.LoginDialog__registration}>
                            <p className={styles.LoginDialog__offer}>Еще не зарегистрированы?</p>
                            <button onClick={registerDialogShow} className={styles.LoginDialog__register}>
                                Регистрация
                            </button>
                        </div>
                    </div>
                </div>
            </>
            :
            null
    )
}