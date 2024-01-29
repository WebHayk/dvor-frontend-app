import {FC, useState} from "react";
import styles from "./AccountControl.module.scss";
import useActions from "@hooks/useActions";
import ControlDropdown from "./ControlDropdown";
import {useMainSelector} from "@store/selectors";
import {ASSETS_BASE_URL} from "@common/utils/options";
import {useRouter} from "next/router";
import cs from "classnames";
import RoleElementProvider from "@hoc/RoleElementProvider";
import Avatar from "@ui/Avatar";

export const AccountControl: FC = () => {

    let router = useRouter();

    let [open, setOpen] = useState<boolean>(false);
    const {setNotificationsShowAction} = useActions();
    const state = useMainSelector();

    let isVerified = state.profile?.user.is_verified;
    let role_key = state.user?.role.key;
    let roleName = state.user?.role.name;
    let avatar = state.profile?.avatar;

    let residentVerifiedCondition = state.user ? role_key == "resident" ? isVerified ? "верифицированный" : "неверифицированный" : null : null;
    let profileCondition = state.profile ? avatar ? `${ASSETS_BASE_URL + avatar}` : "/images/profile-empty-icon.svg" : "";

    const handleNotificationsShow = () => setNotificationsShowAction();

    const handleDropdownShow = () => setOpen(!open);

    const handleChatRedirect = () => router.push("/chat");

    const handleMetersRedirect = () => router.push("/meters");

    return (
        <div className={styles.AccountControl}>
            <RoleElementProvider roles={["resident", "owner", "spokesman", "senior", "operator"]}>
                <div
                    onClick={handleMetersRedirect}
                    className={cs({
                        [styles.AccountControl__item]: true,
                        [styles.AccountControl__active]: router.pathname.includes("meters")
                    })}
                >
                    <img
                        loading={"lazy"}
                        src={"/images/process-icon.svg"}
                        alt={"process-icon"}
                        width={24}
                        height={24}
                    />
                </div>
            </RoleElementProvider>
            <div
                onClick={handleNotificationsShow}
                className={cs({
                    [styles.AccountControl__item]: true,
                    [styles.AccountControl__active]: state.show.notifications
                })}
            >
                <img
                    loading={"lazy"}
                    src={"/images/notifications-icon.svg"}
                    alt={"notifications-icon"}
                    width={24}
                    height={24}
                />
            </div>
            <RoleElementProvider
                roles={["resident", "owner", "spokesman", "senior", "worker", "operator"]}
            >
                <div
                    onClick={handleChatRedirect}
                    className={cs({
                        [styles.AccountControl__item]: true,
                        [styles.AccountControl__active]: router.pathname.includes("chat")
                    })}
                >
                    <img
                        loading={"lazy"}
                        src={"/images/chat-icon.svg"}
                        alt={"chat-icon"}
                        width={24}
                        height={24}
                    />
                </div>
            </RoleElementProvider>
            <div
                onClick={handleDropdownShow}
                className={`${styles.AccountControl__item} pr-20`}
            >
                <Avatar
                    image={profileCondition}
                    size={"medium"}
                />
                <div className={styles.AccountControl__info}>
                    <p className={styles.AccountControl__name}>
                        {state.profile?.name} {state.profile?.last_name}
                    </p>
                    <p className={styles.AccountControl__type}>{roleName} {residentVerifiedCondition}</p>
                </div>
                <ControlDropdown open={open}/>
            </div>
        </div>
    )
}
