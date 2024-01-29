import React, {
    FC,
    memo,
    useEffect,
    useState
} from "react";
import styles from "./ChatControl.module.scss";
import FileUpload from "@ui/FileUpload";
import {IMAGE_ACCEPT} from "@common/utils/options";
// @ts-ignore
import {EmojiData, Picker} from 'emoji-mart-next';
import 'emoji-mart-next/css/emoji-mart.css';
import ReplyMessageBar from "@ui/Chat/ChatContent/ReplyMessageBar";
import {useChatSelector} from "@store/selectors";
import useActions from "@hooks/useActions";
import Textarea from "@ui/Textarea";

interface ChatControl {
    placeholder: string,
    handleSend: () => void,
    setValueAction: any,
    value: string,
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

let pickerStyles = {
    position: "absolute",
    bottom: "40px"
};

export const ChatControl: FC<ChatControl> = memo((
    {
        placeholder,
        handleSend,
        setValueAction,
        value,
        handleFileChange
    }
) => {

    let {replyMessage} = useChatSelector();
    let {setChatReplyMessageAction} = useActions();

    let [pickerOpen, setPickerOpen] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValueAction(event.target.value);
        event.target.style.height = "inherit";
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    const handleKeyPress = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        let {key, shiftKey} = event;

        if (key == "Enter" && !shiftKey) {
            event.preventDefault();
            handleSend();
        }

        if (key == "Enter" && shiftKey) {
            event.preventDefault();
            setValueAction(value + "\r\n");
        }
    }

    const handleEmojiPickerOpen = () => setPickerOpen(!pickerOpen);

    const handleAddEmoji = (emoji: EmojiData) => {
        let emojiValue = emoji.native;
        setValueAction(value + emojiValue);
    }

    useEffect(() => {

        const closePickerHandler = (event: any) => {

            let {target} = event;

            let pickerElement = target.closest('[data-emoji-picker="picker"]');
            let emojiPickerElement = target.closest(".emoji-mart ");

            if (!emojiPickerElement && !pickerElement) {
                setPickerOpen(false);
            }
        }

        if (pickerOpen) {
            window.addEventListener("click", closePickerHandler);
        }

        return () => window.removeEventListener("click", closePickerHandler);
    }, [pickerOpen]);

    const handleCancelReplyMessage = () => setChatReplyMessageAction(null);

    return (
        <div className={styles.ChatControl}>
            {
                replyMessage
                &&
                <ReplyMessageBar
                    onCancel={handleCancelReplyMessage}
                    message={replyMessage}
                />
            }
            <div className={styles.ChatControl__content}>
                <div className={styles.ChatControl__left}>
                    <FileUpload
                        accept={IMAGE_ACCEPT}
                        handleChange={handleFileChange}
                    >
                        <img
                            src={"/images/file-icon.svg"}
                            alt={"file-icon"}
                            width={24}
                            height={24}
                            loading={"eager"}
                        />
                    </FileUpload>
                    <div className={styles.ChatControl__pickerWrapper}>
                        {
                            pickerOpen
                            &&
                            <Picker
                                title={"Выберите эмодзи"}
                                style={pickerStyles}
                                onSelect={handleAddEmoji}
                            />
                        }
                        <button
                            data-emoji-picker={"picker"}
                            onClick={handleEmojiPickerOpen}
                            className={styles.ChatControl__picker}
                        >
                            <img
                                loading={"eager"}
                                src={"/images/emoji-picker-icon.svg"}
                                alt={"emoji-picker"}
                                width={22}
                                height={22}
                            />
                        </button>
                    </div>
                </div>
                <div className={styles.ChatControl__control}>
                    <textarea
                        onKeyPress={handleKeyPress}
                        className={styles.ChatControl__area}
                        value={value}
                        onChange={handleChange}
                        placeholder={placeholder}
                    />
                </div>
                <button
                    onClick={handleSend}
                    className={styles.ChatControl__send}
                >
                    <img
                        src={"/images/send-icon.svg"}
                        alt={"send-icon"}
                        width={24}
                        height={24}
                    />
                </button>
            </div>
        </div>
    )
});

ChatControl.displayName = "ChatControl";