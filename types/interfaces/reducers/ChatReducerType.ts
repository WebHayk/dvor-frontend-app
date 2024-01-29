import {
    ChatsViewType, CurrentChatMessageType,
    CurrentChatType
} from "@typescript/interfaces";

export interface ChatReducerType {
    chatsView: ChatsViewType[],
    currentChat: CurrentChatType | null,
    selectedMessages: number[],
    isChatContentScroll: boolean,
    replyMessage: CurrentChatMessageType | null
}
