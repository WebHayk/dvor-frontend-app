import React, {FC} from "react";
import styles from "./ShowButton.module.scss";

interface ShowButton {
    type: string,
    setType: React.Dispatch<"password" | "text">
}

export const ShowButton: FC<ShowButton> = (
    {
        type,
        setType
    }
) => {

    const handleChangeType = () => {
        if (type === "text") {
            setType("password");
        } else {
            setType("text");
        }
    }

    return (
        <button onClick={handleChangeType} className={styles.ShowButton}>
            <img
                loading={"lazy"}
                src={type === "password" ? "/images/show-grey-icon.svg" : "/images/unshow-grey-icon.svg"}
                alt={"show-icon"}
                width={24}
                height={24}
            />
        </button>
    )
}