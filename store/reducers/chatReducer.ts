import {ActionType} from "@typescript/interfaces";
import {ChatReducerType} from "@typescript/interfaces/reducers/ChatReducerType";
import {
    SET_CHAT_CONTENT_SCROLL, SET_CHAT_REPLY_MESSAGE,
    SET_CHATS_VIEW,
    SET_CURRENT_CHAT_INFO,
    SET_SELECTED_MESSAGES
} from "@store/actions/actionTypes";

const initialState: ChatReducerType = {
    chatsView: [],
    currentChat: null,
    selectedMessages: [],
    isChatContentScroll: true,
    replyMessage: null
};

export const chatReducer = (state = initialState, action: ActionType) => {

    let data = action.payload;

    switch (action.type) {
        case SET_CHATS_VIEW: // Chats view (список чатов) - (chat)
            return {
                ...state,
                chatsView: data
            }
        case SET_CURRENT_CHAT_INFO: // Информация текущего чата
            return {
                ...state,
                currentChat: data
            }
        case SET_SELECTED_MESSAGES: // Выбранные сообщения текущего чата

            let copySelectedMessages = [...state.selectedMessages];

            if (!Array.isArray(data)) {
                if (copySelectedMessages.includes(data)) {
                    let index = copySelectedMessages.indexOf(data);
                    copySelectedMessages.splice(index, 1);
                } else {
                    copySelectedMessages.push(data);
                }
            } else {
                copySelectedMessages = [];
            }

            return {
                ...state,
                selectedMessages: copySelectedMessages
            }
        case SET_CHAT_CONTENT_SCROLL: // Доступен скролл контейнера чата
            return {
                ...state,
                isChatContentScroll: data
            }
        case SET_CHAT_REPLY_MESSAGE: // Сообщение для ответа (локально)
            return {
                ...state,
                replyMessage: data
            }
        default:
            return state
    }
}