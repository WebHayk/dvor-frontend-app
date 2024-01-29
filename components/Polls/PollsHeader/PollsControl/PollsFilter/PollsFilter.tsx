import {FC, useState} from "react";
import styles from "../../PollsHeader.module.scss";
import Button from "@ui/Button";
import PollsFilterDialog from "./PollsFilterDialog";

export const PollsFilter: FC = () => {

    let [open, setOpen] = useState<boolean>(false);

    const handleClick = () => setOpen(!open);

    return (
        <div className={styles.PollsFilter}>
            <Button
                type={"button"}
                onClick={handleClick}
                color={"white"}
                label={"Фильтр"}
            />
            <PollsFilterDialog
                open={open}
                setOpen={setOpen}
            />
        </div>
    )
}