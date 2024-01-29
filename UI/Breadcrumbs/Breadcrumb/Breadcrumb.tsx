import {FC} from "react";
import Link from "next/link";
import styles from "../Breadcrumbs.module.scss";

interface Breadcrumb {
    href: string,
    label: string
}

export const Breadcrumb: FC<Breadcrumb> = ({href, label}) => {
    return (
        <Link href={href}>
            <a className={styles.Breadcrumb}>
                {label}
            </a>
        </Link>
    )
}