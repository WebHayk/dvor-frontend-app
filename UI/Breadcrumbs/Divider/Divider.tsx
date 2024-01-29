import {FC} from "react";
import styles from "../Breadcrumbs.module.scss";

export const Divider: FC = () => {
    return (
        <div className={styles.Divider}>
            <img
                loading={"lazy"}
                src={"/images/arrow-grey-icon.svg"}
                alt={"arrow-icon"}
                width={15}
                height={15}
            />
        </div>
    )
}