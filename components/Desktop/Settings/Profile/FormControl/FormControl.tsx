import React, {memo, useState} from "react";
import {FC} from "react";
import styles from "./FormControl.module.scss";
import TextField from "@ui/TextField";
import Button from "@ui/Button";
import {useMainSelector} from "@store/selectors";
import {ErrorMessage, Formik} from "formik";
import Avatar from "@components/Desktop/Settings/Profile/Avatar/Avatar";
import {GET_PROFILE, UPDATE_PROFILE} from "@api/mutations/mutations";
import useActions from "@hooks/useActions";
import {AvatarType} from "@typescript/interfaces";
import {PROFILE_UPDATE_FORM_SCHEMA} from "@common/schemas/schemas";
import ErrorMessageComponent from "@ui/Messages/ErrorMessage";
import {useMutation} from "@apollo/client";
import {FilesService} from "@services/filesService";

const ProfileFormControl: FC = memo(() => {

    let state = useMainSelector();
    let [getProfile] = useMutation(GET_PROFILE);
    let [updateProfile] = useMutation(UPDATE_PROFILE);
    let {setSessionUserProfileAction} = useActions();

    let [avatar, setAvatar] = useState<AvatarType>({
        image: state.profile?.avatar,
        file: null
    });

    const updateProfileHandler = (updateVariables: any) => {
        updateProfile({
            variables: updateVariables
        })
            .then(async () => {
                try {
                    let profile = await getProfile();
                    setAvatar({
                        image: profile.data.profile_get.avatar,
                        file: null
                    });
                    setSessionUserProfileAction(profile.data.profile_get);
                } catch (error) {
                    console.log(error);
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <Formik
            initialValues={{
                avatar: avatar.image,
                name: state.profile?.name || "",
                last_name: state.profile?.last_name || "",
                mail: state.profile?.mail || "",
                password: "",
                nickname: state.profile?.nickname || ""
            }}
            validationSchema={PROFILE_UPDATE_FORM_SCHEMA}
            onSubmit={async (values) => {

                let {name, last_name, mail, password, nickname} = values;

                let variables = {
                    name,
                    last_name,
                    mail,
                    gender: state.profile.gender,
                    password,
                    nickname
                };

                if (avatar.file) {
                    FilesService.filesUploadRequest(avatar.file)
                        .then(response => {
                            let data = FilesService.imagesArrayCreator(response);

                            let updateVariables = {
                                ...variables,
                                avatar: data[0]
                            };

                            updateProfileHandler(updateVariables);
                        })
                        .catch(err => console.log(err))
                } else {
                    let updateVariables = {
                        ...variables,
                        avatar: values.avatar
                    };

                    updateProfileHandler(updateVariables);
                }

            }}
        >
            {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
              }) => (
                <div className={styles.FormControl}>
                    <Avatar
                        setAvatar={setAvatar}
                        avatar={avatar}
                    />
                    <div className={styles.FormControl__content}>
                        <div className={styles.FormControl__row}>
                            <div className={styles.FormControl__fieldWrapper}>
                                <TextField
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type={"text"}
                                    value={values.name}
                                    name={"name"}
                                    placeholder={"Имя"}
                                />
                                <ErrorMessage
                                    render={msg => <ErrorMessageComponent label={msg}/>}
                                    name={"name"}
                                />
                            </div>
                            <div className={styles.FormControl__fieldWrapper}>
                                <TextField
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type={"text"}
                                    value={values.last_name}
                                    name={"last_name"}
                                    placeholder={"Фамилия"}
                                />
                                <ErrorMessage
                                    render={msg => <ErrorMessageComponent label={msg}/>}
                                    name={"last_name"}
                                />
                            </div>
                        </div>
                        <div className={styles.FormControl__row}>
                            <div className={styles.FormControl__fieldWrapper}>
                                <TextField
                                    type={"text"}
                                    value={values.mail}
                                    name={"mail"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder={"Электронная почта"}
                                />
                                <ErrorMessage
                                    render={msg => <ErrorMessageComponent label={msg}/>}
                                    name={"mail"}
                                />
                            </div>
                            <div className={styles.FormControl__fieldWrapper}>
                                <TextField
                                    type={"text"}
                                    value={values.password}
                                    name={"password"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder={"Пароль"}
                                />
                            </div>
                        </div>
                        <TextField
                            type={"text"}
                            value={values.nickname}
                            name={"nickname"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={"Никнейм"}
                        />
                        <div className={styles.FormControl__actions}>
                            <Button
                                type={"submit"}
                                onClick={handleSubmit}
                                label={"Сохранить изменения"}
                                color={"blue"}
                            />
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    )
});

ProfileFormControl.displayName = "ProfileFormControl";

export default ProfileFormControl