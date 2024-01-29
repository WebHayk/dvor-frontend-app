import React, {FC, useState} from 'react';
import styles from "../SidebarContent.module.scss";
import {useMainSelector} from "@store/selectors";
import Link from "next/link";
import {useRouter} from "next/router";
import cs from "classnames";

interface SidebarLink {
    icon: string,
    label: string,
    href: string
}

export const SidebarLink: FC<SidebarLink> = ({icon, label, href}) => {

    let state = useMainSelector();
    let router = useRouter();

    return (
        <li>
        <Link href={href}>
            <a className={cs({
                [styles.Sidebar__link]: true,
                // [styles.Sidebar__active]: pathname.includes(href)
            })}
            >
                <img
                    loading={"lazy"}
                    src={icon}
                    alt={"sidebar-icon"}
                    width={40}
                    height={40}
                />
                <span className={cs({
                    [styles.Sidebar__hideContent]: !state.show.sidebar
                })}>{label}</span>
            </a>
        </Link>
        </li>
    );
};