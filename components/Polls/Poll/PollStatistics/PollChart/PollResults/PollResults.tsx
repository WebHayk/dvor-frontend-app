import {FC, memo} from "react";
import {usePollsSelector} from "@store/selectors";
import ResultItem from "./ResultItem";
import {PollItemType} from "@typescript/interfaces";

export const PollResults: FC = memo(() => {

    let state = usePollsSelector();
    let options = state.polls.poll.options;

    return (
        options.length
        ?
        options.map((answer: PollItemType , index: number) => {
            return (
                <ResultItem
                    key={answer.text}
                    variant={answer.text}
                    value={answer.votes?.length || 0}
                />
            )
        })
        :
        null
    )
});

PollResults.displayName = "PollResults";