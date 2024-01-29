import React, {FC, useState} from "react";
import {Formik} from "formik";
import styles from "./RegistrationControl.module.scss";
import TextField from "@ui/TextField";
import ShowButton from "@ui/Button/ShowButton";
import Checkbox from "@ui/Checkbox";
import Button from "@ui/Button";
import cs from "classnames";
import {REGISTRATION_FORM_SCHEMA} from "@common/schemas/schemas";
import {RegistrationControlType} from "@typescript/interfaces";
import ErrorMessage from "@ui/Messages/ErrorMessage";
import {useMutation} from "@apollo/client";
import {REGISTRATION} from "@api/mutations/mutations";
import "react-phone-input-2/lib/style.css";
import {PhoneField} from "@ui/PhoneField/PhoneField";

interface RegistrationControl {
    setValues: React.Dispatch<RegistrationControlType>,
    setOpen: React.Dispatch<boolean>,
    setConfirmOpen: React.Dispatch<boolean>
}

export const RegistrationControl: FC<RegistrationControl> = (
    {
        setValues,
        setOpen,
        setConfirmOpen
    }
) => {

    let [passwordType, setPasswordType] = useState<"text" | "password">("password");
    let [passwordRepeatType, setPasswordRepeatType] = useState<"text" | "password">("password");

    let [gender, setGender] = useState<string>("male");
    let [phoneNumber, setPhoneNumber] = useState<string>("");

    let [read, setRead] = useState<boolean>(false);

    const [Registration] = useMutation(REGISTRATION);

    const handleReadChange = () => setRead(!read);

    const handleChangeGender = (gender: string) => setGender(gender);

    return (
        <Formik
            initialValues={{
                phone_number: "",
                first_name: "",
                last_name: "",
                password: "",
                password_repeat: "",
                gender: ""
            }}
            onSubmit={values => {

                let password = values.password;
                values.phone_number = phoneNumber;

                Registration({
                   variables: {
                       phone_number: phoneNumber,
                       password
                   }
                })
                    .then((response) => {
                        if (response) {
                            values.gender = gender;
                            setValues(values);
                            setOpen(false);
                            setConfirmOpen(true);
                        }
                    })
                    .catch(err => console.log(err))
            }}
            validationSchema={REGISTRATION_FORM_SCHEMA}
        >
            {({
                  values,
                  handleChange,
                  handleSubmit,
                  touched,
                  errors,
                  handleBlur
              }) => (
                <div className={styles.RegistrationControl}>
                    <PhoneField
                        value={phoneNumber}
                        setValue={setPhoneNumber}
                    />
                    <TextField
                        placeholder={"Имя"}
                        onChange={handleChange}
                        type={"text"}
                        onBlur={handleBlur}
                        value={values.first_name}
                        name={"first_name"}
                    />
                    {
                        touched.first_name
                        &&
                        errors
                        &&
                        errors.first_name
                        &&
                        <ErrorMessage label={errors.first_name} />
                    }
                    <TextField
                        onBlur={handleBlur}
                        placeholder={"Фамилия"}
                        onChange={handleChange}
                        type={"text"}
                        value={values.last_name}
                        name={"last_name"}
                    />
                    {
                        touched.last_name
                        &&
                        errors
                        &&
                        errors.last_name
                        &&
                        <ErrorMessage label={errors.last_name} />
                    }
                    <div className={styles.RegistrationControl__gender}>
                        <p className={styles.RegistrationControl__label}>Выберите ваш пол</p>
                        <div className={styles.RegistrationControl__row}>
                            <button onClick={() => handleChangeGender("male")} className={cs({
                                [styles.RegistrationControl__item]: true,
                                [styles.RegistrationControl__active]: gender === "male"
                            })}>Мужской
                            </button>
                            <button onClick={() => handleChangeGender("female")} className={cs({
                                [styles.RegistrationControl__item]: true,
                                [styles.RegistrationControl__active]: gender === "female"
                            })}>Женский
                            </button>
                        </div>
                    </div>
                    <div className={styles.RegistrationControl__password}>
                        <TextField
                            onBlur={handleBlur}
                            type={passwordType}
                            value={values.password}
                            name={"password"}
                            placeholder={"Пароль"}
                            onChange={handleChange}
                        />
                        <ShowButton
                            type={passwordType}
                            setType={setPasswordType}
                        />
                    </div>
                    {
                        touched.password
                        &&
                        errors
                        &&
                        errors.password
                        &&
                        <ErrorMessage label={errors.password} />
                    }
                    <div className={styles.RegistrationControl__password}>
                        <TextField
                            onBlur={handleBlur}
                            type={passwordRepeatType}
                            value={values.password_repeat}
                            name={"password_repeat"}
                            placeholder={"Подтвердить пароль"}
                            onChange={handleChange}
                        />
                        <ShowButton
                            type={passwordRepeatType}
                            setType={setPasswordRepeatType}
                        />
                    </div>
                    {
                        touched.password_repeat
                        &&
                        errors
                        &&
                        errors.password_repeat
                        &&
                        <ErrorMessage label={errors.password_repeat} />
                    }
                    <div className={styles.RegistrationControl__submit}>
                        <div className={styles.RegistrationControl__agreement}>
                            <Checkbox
                                checked={read}
                                onChange={handleReadChange}
                            />
                            <p className={styles.RegistrationControl__politics}>
                                Вы подтверждаете свое согласие согласие с Правилами использования и Политикой
                                конфиденциальности
                            </p>
                        </div>
                        <div className={styles.RegistrationControl__submitButton}>
                            <Button
                                disabled={!read}
                                label={"Продолжить регистрацию"}
                                type={"submit"}
                                onClick={handleSubmit}
                                color={"blue"}
                            />
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    )
}