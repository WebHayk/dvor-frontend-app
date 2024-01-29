import {FC} from "react";
import styles from "./OrganizationType.module.scss";
import cs from "classnames";

interface OrganizationType {
    type: string
}

export const OrganizationType: FC<OrganizationType> = ({type}) => {
    return (
       <div className={cs({
           [styles.OrganizationType]: true,
           [styles.OrganizationType__uk]: type == "УК",
           [styles.OrganizationType__tsj]: type == "ТСЖ"
       })}>{type}</div>
    )
}