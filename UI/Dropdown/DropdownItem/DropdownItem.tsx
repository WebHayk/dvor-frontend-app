import {FC} from "react";
import styles from "../Dropdown.module.scss";
import Link from "next/link";

interface DropdownItem {
    label: string,
    onClick?: () => void,
    icon?: string,
    type: "link" | "handler",
    href?: string
}

export const DropdownItem: FC<DropdownItem> = (
    {
        onClick,
        label,
        icon,
        type,
        href
    }) => {
    return (
        type === "handler"
            ?
            <li
                className={styles.Dropdown__item}
                onClick={onClick}
            >
                {
                    icon?.length
                        ?
                        <img
                            loading={"lazy"}
                            src={icon}
                            width={24}
                            height={24}
                            alt={"dropdown-icon"}
                        />
                        :
                        null
                }
                <span className={icon?.length ? styles.Dropdown__text : ""}>{label}</span>
            </li>
            :
            href !== undefined
            ?
            <Link
                href={href}
            >
                <a className={styles.Dropdown__item}>
                    {
                        icon?.length
                            ?
                            <img
                                loading={"lazy"}
                                src={icon}
                                width={24}
                                height={24}
                                alt={"dropdown-icon"}
                            />
                            :
                            null
                    }
                    <span className={icon?.length ? styles.Dropdown__text : ""}>{label}</span>
                </a>
            </Link>
            :
            null
    )
}