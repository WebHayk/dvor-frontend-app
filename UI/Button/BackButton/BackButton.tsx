import {FC} from "react";
import styles from "./BackButton.module.scss";
import {useRouter} from "next/router";

interface BackButton {
    path: string
}

export const BackButton: FC<BackButton> = (
    {
        path
    }
) => {

    let router = useRouter();

    const handleClick = () => router.push(path);

    return (
        <button
            onClick={handleClick}
            className={styles.BackButton}
        >
            <img
                src={"/images/arrow-grey-icon.svg"}
                alt={"arrow-grey-icon"}
                width={20}
                height={20}
            />
            Назад к списку
        </button>
    )
}