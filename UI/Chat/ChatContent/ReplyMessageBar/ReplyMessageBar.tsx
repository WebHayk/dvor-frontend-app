import {FC} from "react";
import styles from "./ReplyMessageBar.module.scss";
import {CurrentChatMessageType} from "@typescript/interfaces";
import {replaceAllWithRegexp} from "@common/utils/helpers";
import {ASSETS_BASE_URL} from "@common/utils/options";

interface ReplyMessageBar {
    message: CurrentChatMessageType,
    onCancel: () => void
}

export const ReplyMessageBar: FC<ReplyMessageBar> = (
    {
        message,
        onCancel
    }
) => {

    let {
        content,
        attachments
    } = message;

    let messageValue = replaceAllWithRegexp(content, "<br />", " ");

    return (
        <div className={styles.ReplyMessageBar}>
            <div className={styles.ReplyMessageBar__left}>
                <img
                    src={"/images/reply-blue-icon.svg"}
                    alt={"reply-icon"}
                />
                <div className={styles.ReplyMessageBar__row}>
                    {
                        attachments.length
                        ?
                        <img
                            alt={"reply-image"}
                            width={30}
                            height={30}
                            src={ASSETS_BASE_URL + attachments[0]}
                        />
                        :
                        null
                    }
                    <p className={styles.ReplyMessageBar__content}>{messageValue}</p>
                </div>
            </div>
            <button className={styles.ReplyMessageBar__cancel} onClick={onCancel}>
                <img
                    src={"/images/close-black-icon.svg"}
                    alt={"close-icon"}
                />
            </button>
        </div>
    )
}