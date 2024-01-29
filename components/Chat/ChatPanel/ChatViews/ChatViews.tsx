import {FC, memo} from "react";
import {useChatSelector} from "@store/selectors";
import {ChatsViewType} from "@typescript/interfaces";
import ChatView from "./ChatView";

export const ChatViews: FC = memo(() => {

    let state = useChatSelector();

    return (
        <>
            {
                state.chatsView.length
                ?
                state.chatsView.map((view: ChatsViewType) => {
                    return (
                       <ChatView
                           key={view.id}
                           view={view}
                       />
                    )
                })
                :
                null
            }
        </>
    )
});

ChatViews.displayName = "ChatViews";
