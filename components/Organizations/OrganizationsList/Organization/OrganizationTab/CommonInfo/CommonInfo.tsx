import {FC, useContext} from "react";
import styles from "./CommonInfo.module.scss";
import {OrganizationContext} from "@context/context";
import {OrganizationsType} from "@typescript/interfaces";
import {dateFormatterHelper} from "@common/utils/helpers";
import RowItem from "@ui/RowItem";
import RoleElementProvider from "@hoc/RoleElementProvider";

export const CommonInfo: FC = () => {

    const data: OrganizationsType = useContext(OrganizationContext);

    let date = dateFormatterHelper(data.created_at);

    return (
        <div className={styles.CommonInfo}>
            <div className={styles.CommonInfo__row}>
                <RowItem
                    className={styles.CommonInfo__renderer}
                    title={"ИНН"}
                    text={data.inn || "Отсутствует"}
                />
                <RowItem
                    title={"Дата добавления"}
                    text={date}
                />
            </div>
            <RowItem
                className={styles.CommonInfo__description}
                title={"Описание деяиельности компании"}
                text={data.description || "Отсутствует"}
            />
            <RoleElementProvider roles={["manager"]}>
                <RowItem
                    className={styles.CommonInfo__notes}
                    title={"Заметка"}
                    text={data.note || "Отсутствует"}
                />
            </RoleElementProvider>
            <RoleElementProvider roles={["manager"]}>
                <div>
                    <p className={styles.CommonInfo__moduleTitle}>Модули</p>
                    <div className={styles.CommonInfo__modules}>
                        <div className={styles.CommonInfo__module}>
                            <img
                                loading={"lazy"}
                                src={"/images/modules-icon.svg"}
                                alt={"modules-icon"}
                                width={40}
                                height={40}
                            />
                        </div>
                    </div>
                </div>
            </RoleElementProvider>
        </div>
    )
}