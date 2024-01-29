import {FC, useState} from "react";
import styles from "./CreateEvent.module.scss";
import CreateEventDialog from "./CreateEventDialog/CreateEventDialog";

const CreateEvent: FC = () => {

    const [open, setOpen] = useState<boolean>(false);

    const handleClick = () => setOpen(true);

    return (
        <>
            <CreateEventDialog
                open={open}
                setOpen={setOpen}
            />
            <button onClick={handleClick} className={styles.Events__create}>
                <img
                    loading={"lazy"}
                    src={"/images/add-blue-icon.svg"}
                    alt={"add-icon"}
                    width={14}
                    height={14}
                />
                <span>Создать событие</span>
            </button>
        </>
    )
}

export default CreateEvent