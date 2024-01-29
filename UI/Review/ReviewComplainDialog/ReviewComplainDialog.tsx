import React, {FC} from "react";
import styles from "./ReviewComplainDialog.module.scss";
import Dialog from "@ui/Dialog";
import {ErrorMessage, Formik} from "formik";
import Select from "@ui/Select";
import TextField from "@ui/TextField";
import DialogFooter from "@ui/Dialog/DialogFooter";
import {COMPLAIN_FORM_SCHEMA} from "@common/schemas/schemas";
import ErrorMessageComponent from "@ui/Messages/ErrorMessage";

interface ReviewComplainDialog {
    open: boolean,
    setOpen: React.Dispatch<boolean>
}

let rules = ["Значение 1", "Значение 2", "Значение 3"];

export const ReviewComplainDialog: FC<ReviewComplainDialog> = (
    {
        open,
        setOpen
    }
) => {

    const handleClose = () => setOpen(false);

    return (
        <Dialog
            handleClose={handleClose}
            open={open}
            title={"Что вас смутило?"}
        >
            <Formik
                initialValues={{
                    rule: "",
                    note: ""
                }}
                onSubmit={values => console.log(values)}
                validationSchema={COMPLAIN_FORM_SCHEMA}
            >
                {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                }) => (
                    <>
                        <div className={styles.ReviewsComplainDialog__row}>
                            <Select
                                options={rules}
                                value={values.rule}
                                onChange={handleChange}
                                label={"Какое правило нарушил автор?"}
                                name={"rule"}
                                onBlur={handleBlur}
                            />
                            <ErrorMessage
                                name={"rule"}
                                render={msg => <ErrorMessageComponent label={msg} />}
                            />
                        </div>
                        <div className={styles.ReviewsComplainDialog__row}>
                            <TextField
                                type={"text"}
                                value={values.note}
                                onChange={handleChange}
                                placeholder={"Примечание..."}
                                name={"note"}
                                onBlur={handleBlur}
                            />
                        </div>
                        <DialogFooter
                            handleClose={handleClose}
                            handleSubmit={handleSubmit}
                            submitAction={"Пожаловаться"}
                        />
                    </>
                )}
            </Formik>
        </Dialog>
    )
}