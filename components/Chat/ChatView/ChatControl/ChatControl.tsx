import React, {FC, useEffect, useState} from "react";
import ChatControl from "@ui/Chat/ChatControl";
import {useMutation} from "@apollo/client";
import {INSERT_CHAT_MESSAGE_VIEW} from "@api/mutations/mutations";
import ImagesList from "@ui/FilesUpload/ImagesList";
import {CurrentChatType, FileType, ImageType} from "@typescript/interfaces";
import {BREAK_LINE_REGEXP, LINE_REGEXP} from "@common/utils/options";
import {FilesService} from "@services/filesService";
import {replaceWithRegexp} from "@common/utils/helpers";
import {useChatSelector} from "@store/selectors";
import useActions from "@hooks/useActions";
import {requestsService} from "@services/requestsService";
import {useRouter} from "next/router";

interface ChatControlComponent {
    currentChat: CurrentChatType
}

export const ChatControlComponent: FC<ChatControlComponent> = ({currentChat}) => {

    const {replyMessage} = useChatSelector();
    let {query} = useRouter();

    let {setChatReplyMessageAction} = useActions();

    let [message, setMessage] = useState<string>("");
    const [insertChatMessageView] = useMutation(INSERT_CHAT_MESSAGE_VIEW);
    let [images, setImages] = useState<ImageType[]>([]);
    let [files, setFiles] = useState<FileType[]>([]);

    const handleMessageRequest = (attachments: string[], message: string) => {
        insertChatMessageView({
            variables: {
                chat_id: currentChat.id,
                content: message,
                attachments,
                reply_to_message_id: replyMessage?.id || null
            }
        })
            .then(() => {
                setMessage("");
                setFiles([]);
                setImages([]);

                if (currentChat.draft) {
                    requestsService.setChatDraft(currentChat.id, null);
                }

                if (replyMessage) {
                    setChatReplyMessageAction(null);
                }
            })
            .catch(err => console.log(err))
    }

    const handleMessageValidityCheck = (message: string) => {
        let attachments = FilesService.getFiles(files);

        if (attachments.length) {
            FilesService.filesUploadRequest(attachments)
                .then(response => {
                    let files = FilesService.imagesArrayCreator(response);
                    handleMessageRequest(files, message);
                })
        } else {
            handleMessageRequest([], message);
        }
    }

    const handleMessageSend = () => {
        const match = BREAK_LINE_REGEXP.exec(message);
        const validationValue = replaceWithRegexp(message, LINE_REGEXP, "");

        if (validationValue != "") {
            if (match) {
                const replacedValue = match.input.replace(LINE_REGEXP, "<br />");
                handleMessageValidityCheck(replacedValue);
            } else {
                handleMessageValidityCheck(message);
            }
        } else {
            if (files.length) {
                handleMessageValidityCheck(message);
            }
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        FilesService.handleFilesUpload(event, files, images, setImages, setFiles);
    }

    useEffect(() => {
        setFiles([]);
        setImages([]);
        setMessage("");
    }, [currentChat.id]);

    useEffect(() => {
        if (currentChat.draft) {
            setMessage(currentChat.draft.content);
        }
    }, [currentChat.draft]);

    const chatDraftHandler = (drafted_chat_id: string) => {
        if (message) {
            requestsService.setChatDraft(+drafted_chat_id, message);
        }

        if (!message) {
            requestsService.setChatDraft(+drafted_chat_id, null);
        }
    }

    useEffect(() => {
        if (query.drafted_chat_id) {
            let {drafted_chat_id} = query;
            chatDraftHandler(drafted_chat_id as string);
        }
    }, [query]);

    return (
        <>
            <ChatControl
                handleFileChange={handleFileChange}
                placeholder={"Введите сообщение..."}
                handleSend={handleMessageSend}
                setValueAction={setMessage}
                value={message}
            />
            {
                images.length
                ?
                <ImagesList
                    setImages={setImages}
                    images={images}
                    files={files}
                    setFiles={setFiles}
                />
                :
                null
            }
        </>
    )
}