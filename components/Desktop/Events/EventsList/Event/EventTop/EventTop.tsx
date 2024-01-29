import {FC, useState} from "react";
import styles from "../Event.module.scss";
import DropdownButton from "@ui/Dropdown/DropdownButton";
import EventDropdown from "../Dropdown/Dropdown";

const EventTop: FC = () => {

    let [open, setOpen] = useState<boolean>(false);

    return (
        <div className={styles.Event__top}>
            <div className={styles.Event__left}>
                <div className={styles.Event__profile}> </div>
                <div className={styles.Event__info}>
                    <div className={styles.Event__row}>
                        <p className={styles.Event__name}>Наталья</p>
                        <p className={styles.Event__date}>2 часа назад</p>
                    </div>
                    <div className={styles.Event__row}>
                        <p className={styles.Event__address}>Трубникова, 48</p>
                        <p className={styles.Event__range}>8 км от вас</p>
                    </div>
                </div>
            </div>
            <div className={styles.Event__right}>
                <DropdownButton
                    open={open}
                    setOpen={setOpen}
                />
                <EventDropdown open={open} />
            </div>
        </div>
    )
}

export default EventTop