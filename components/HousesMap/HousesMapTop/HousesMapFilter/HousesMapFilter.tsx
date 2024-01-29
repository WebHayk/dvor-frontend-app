import {FC, useState} from "react";
import styles from "./HousesMapFilter.module.scss";
import Button from "@ui/Button";
import FilterControl from "./FilterControl";

export const HousesMapFilter: FC = () => {

    let [open, setOpen] = useState<boolean>(false);

    const handleClick = () => setOpen(true);

    return (
        <div className={styles.HousesMapFilter}>
            <Button
                label={"Фильтр"}
                type={"button"}
                onClick={handleClick}
                color={"white"}
            />
            <div className={styles.HousesMapFilter__filter}>
                <FilterControl
                    open={open}
                    setOpen={setOpen}
                />
            </div>
        </div>
    )
}