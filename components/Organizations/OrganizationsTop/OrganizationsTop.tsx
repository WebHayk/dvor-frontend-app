import React, {FC, memo, useEffect, useState} from "react";
import styles from "./OrganizationsTop.module.scss";
import Select from "@ui/Select";
import {useOrganizationsSelector} from "@store/selectors";
import useActions from "@hooks/useActions";

export const OrganizationsTop: FC = memo(() => {

    let organizationsState = useOrganizationsSelector();
    let {setSearchOrganizationsTypeAction} = useActions();

    let [type, setType] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let value = event.target.value;
        setType(value);
    }

    useEffect(() => {
        if (type !== "") {
            setSearchOrganizationsTypeAction(type);
        }
    }, [type])

    return (
        <div className={styles.OrganizationsTop}>
            <div className={styles.OrganizationsTop__content}>
                <div className={styles.OrganizationsTop__left}>
                    <p className={styles.OrganizationsTop__title}>Организации</p>
                </div>
                <div className={styles.OrganizationsTop__right}>
                    <div className={styles.OrganizationsTop__type}>
                        <Select
                            label={"Тип организации"}
                            name={"type"}
                            options={organizationsState.types}
                            value={type}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
});

OrganizationsTop.displayName = "OrganizationsTop";