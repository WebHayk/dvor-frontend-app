import React, {FC} from "react";
import styles from "../Dropdown.module.scss";

interface DropdownButton {
    setOpen: React.Dispatch<boolean>,
    open: boolean
}

export const DropdownButton: FC<DropdownButton> = (
    {
        setOpen,
        open
    }
) => {

    const handleClick = () => setOpen(!open);

    return (
        <button className={styles.Dropdown__button} onClick={handleClick}>
            <img
                loading={"lazy"}
                src={"/images/dropdown-icon.svg"}
                alt={"dropdown-icon"}
                width={4}
                height={17}
            />
        </button>
    )
}