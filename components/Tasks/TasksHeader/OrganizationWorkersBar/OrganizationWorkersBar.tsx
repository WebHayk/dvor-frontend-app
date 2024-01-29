import {FC} from "react";
import styles from "./OrganizationWorkersBar.module.scss";
import {OrganizationOperatorType} from "@typescript/interfaces";
import WorkerItem from "./WorkerItem";
import {useMainSelector} from "@store/selectors";

interface OrganizationWorkersBar {
    operators: OrganizationOperatorType[]
}

export const OrganizationWorkersBar: FC<OrganizationWorkersBar> = ({operators}) => {

    let state = useMainSelector();
    let {start_time, end_time} = state.user.apartment_user.apartment.apartment_house.organization.work_schedule;

    return (
        <div className={styles.OrganizationWorkersBar}>
            <p className={styles.OrganizationWorkersBar__schedule}>Мы ответим вам с {start_time} до {end_time}</p>
            <div className={styles.OrganizationWorkersBar__list}>
                {
                    operators.length
                        ?
                        operators.map((operator, index) => {

                            let {is_online, last_seen} = operator.user;
                            let {
                                avatar
                            } = operator.user.profile;

                            return (
                                <WorkerItem
                                    key={index}
                                    lastSeenValue={last_seen}
                                    avatar={avatar}
                                    isOnlineValue={is_online}
                                    name={operator.name}
                                />
                            )
                        })
                        :
                        null
                }
            </div>
        </div>
    )
}