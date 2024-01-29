import {FC} from "react";
import styles from "../Statement.module.scss";
import HouseBanner from "@ui/Houses/HouseBanner";

export const StatementHeader: FC = () => {
    return (
        <HouseBanner
            showRating={false}
            logotype_path={"uploads/40/5w/f81rkoh4bnds"}
            type={"ТСЖ"}
            organizationName={"Наш дом"}
            thoroughfare_name={"Трубников"}
            premise_number={"15"}
            rating={4}
            reviews_count={15}
            control={false}
        >
            <p className={styles.StatementHeader__balance}>На счете дома: <span>1,567,890.43 ₽</span></p>
        </HouseBanner>
    )
}