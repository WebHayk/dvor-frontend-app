import {FC} from "react";
import styles from "./AddComment.module.scss";

const AddComment: FC = () => {
    return (
        <div className={styles.AddComment}>
            <div className={styles.AddComment__file}>
                <label htmlFor="file-upload" className={styles.AddComment__fileButton}>
                    <img
                        loading={"lazy"}
                        src={"/images/file-icon.svg"}
                        alt={"file-icon"}
                        width={24}
                        height={24}
                    />
                </label>
                <input id="file-upload" type="file"/>
            </div>
            <div className={styles.AddComment__content}>
                <textarea
                    placeholder={"Введите сообщение..."}
                />
            </div>
            <button className={styles.AddComment__send}>
                <img
                    loading={"lazy"}
                    src={"/images/send-icon.svg"}
                    alt={"send-icon"}
                    width={24}
                    height={24}
                />
            </button>
        </div>
    )
}

export default AddComment