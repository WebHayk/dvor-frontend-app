import {FC} from "react";
import styles from "../Bank.module.scss";
import {ErrorMessage, Formik, FormikValues} from "formik";
import Select from "@ui/Select";
import DateField from "@ui/DateField";
import Button from "@ui/Button";
import {GET_STATEMENT_FORM_SCHEMA} from "@common/schemas/schemas";
import ErrorMessageComponent from "@ui/Messages/ErrorMessage";

let statementsValue = ["Номер 1", "Номер 2"];

interface StatementControl {
    onSubmit: (values: FormikValues) => void
}

export const StatementControl: FC<StatementControl> = (
    {
        onSubmit
    }
) => {
    return (
        <Formik
            initialValues={{
                statement_number: "",
                start_date: "",
                end_date: ""
            }}
            onSubmit={values => {
                onSubmit(values);
            }}
            validationSchema={GET_STATEMENT_FORM_SCHEMA}
        >
            {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit
            }) => (
                <div className={styles.StatementControl}>
                    <Select
                        name={"statement_number"}
                        label={"Номер выписки"}
                        onBlur={handleBlur}
                        options={statementsValue}
                        value={values.statement_number}
                        onChange={handleChange}
                    />
                    <ErrorMessage
                        name={"statement_number"}
                        render={msg => <ErrorMessageComponent label={msg} />}
                    />
                    <div className={styles.StatementControl__item}>
                        <p className={styles.StatementControl__label}>Дата начала</p>
                        <DateField
                            value={values.start_date}
                            onChange={handleChange}
                            name={"start_date"}
                            onBlur={handleBlur}
                        />
                        <ErrorMessage
                            name={"start_date"}
                            render={msg => <ErrorMessageComponent label={msg} />}
                        />
                    </div>
                    <div className={styles.StatementControl__item}>
                        <p className={styles.StatementControl__label}>Дата окончания</p>
                        <DateField
                            value={values.end_date}
                            onChange={handleChange}
                            name={"end_date"}
                            onBlur={handleBlur}
                        />
                        <ErrorMessage
                            name={"end_date"}
                            render={msg => <ErrorMessageComponent label={msg} />}
                        />
                    </div>
                    <Button
                        type={"submit"}
                        onClick={handleSubmit}
                        color={"blue"}
                        label={"Сгенерировать выписку"}
                    />
                </div>
            )}
        </Formik>
    )
}