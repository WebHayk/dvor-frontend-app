import styles from "./FormControl.module.scss";
import Select from "@ui/Select";
import React, {useState} from "react";
import TextField from "@ui/TextField";
import {ImageType} from "@typescript/interfaces";
import FilesUpload from "@ui/FilesUpload";
import {IMAGE_ACCEPT} from "@common/utils/options";
import Button from "@ui/Button";
import {Formik} from "formik";

let options = ["Свойство 1", "Свойство 2", "Свойство 3"];

const HouseFormControl = () => {

    let [files, setFiles] = useState<ImageType[]>([]);

    const handleCancel = () => {
        console.log("Canceled!");
    }

    return (
        <Formik
            initialValues={{
                entity: options[0],
                city: "",
                street: "",
                flat: "",
                floors: 0,
                entrances: 0,
                cadastral_number: "",
                territory: "",
                personal: "",
                images: files
            }}
            onSubmit={values => {
                console.log(values);
            }}
        >
            {({
                  values,
                  handleChange,
                  handleSubmit,
                  /* and other goodies */
            }) => (
                <div className={styles.FormControl}>
                    <div className={styles.FormControl__content}>
                        <div className={styles.FormControl__entity}>
                            <div className={styles.FormControl__fieldWrapper}>
                                <Select
                                    name={"entity"}
                                    options={options}
                                    value={values.entity}
                                    onChange={handleChange}
                                    label={"Юр. лицо"}
                                />
                            </div>
                            <div className={styles.FormControl__fieldWrapper}>
                                <Select
                                    name={"city"}
                                    options={options}
                                    value={values.city}
                                    onChange={handleChange}
                                    label={"Город"}
                                />
                            </div>
                        </div>
                        <div className={styles.FormControl__street}>
                            <TextField
                                readOnly={false}
                                type={"text"}
                                value={values.street}
                                name={"street"}
                                placeholder={"Улица"}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.FormControl__building}>
                            <div className={styles.FormControl__buildingItem}>
                                <TextField
                                    readOnly={true}
                                    type={"number"}
                                    value={values.entrances}
                                    name={"entrances"}
                                    placeholder={"Количество подъездов"}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.FormControl__buildingItem}>
                                <TextField
                                    readOnly={true}
                                    type={"number"}
                                    value={values.floors}
                                    name={"floors"}
                                    placeholder={"Количество этажей"}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.FormControl__buildingItem}>
                                <TextField
                                    readOnly={false}
                                    type={"number"}
                                    value={values.flat}
                                    name={"flat"}
                                    placeholder={"Количество квартир"}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={styles.FormControl__info}>
                            <div className={styles.FormControl__fieldWrapper}>
                                <Select
                                    name={"cadastral_number"}
                                    options={options}
                                    value={values.cadastral_number}
                                    onChange={handleChange}
                                    label={"Кадастровый номер"}
                                />
                            </div>
                            <div className={styles.FormControl__fieldWrapper}>
                                <Select
                                    name={"territory"}
                                    options={options}
                                    value={values.territory}
                                    onChange={handleChange}
                                    label={"Площадь"}
                                />
                            </div>
                        </div>
                        <div className={styles.FormControl__personal}>
                            <TextField
                                readOnly={false}
                                type={"text"}
                                value={values.personal}
                                name={"personal"}
                                placeholder={"Лицевой счет"}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.FormControl__files}>
                            {/*<FilesUpload*/}
                            {/*    title={"Фото документа, подтверждающего собственность"}*/}
                            {/*    files={files}*/}
                            {/*    setFiles={setFiles}*/}
                            {/*    accept={IMAGE_ACCEPT}*/}
                            {/*/>*/}
                        </div>
                        <div className={styles.FormControl__actions}>
                            <Button
                                type={"submit"}
                                onClick={handleSubmit}
                                label={"Сохранить изменения"}
                                color={"blue"}
                            />
                            <Button
                                type={"button"}
                                onClick={handleCancel}
                                label={"Отмена"}
                                color={"white"}
                            />
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    )
}

export default HouseFormControl