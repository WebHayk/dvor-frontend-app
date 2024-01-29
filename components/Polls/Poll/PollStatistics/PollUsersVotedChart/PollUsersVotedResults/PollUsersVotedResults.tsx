import {FC, memo} from "react";
import ResultItem from "@components/Polls/Poll/PollStatistics/PollChart/PollResults/ResultItem";
import {usePollsSelector} from "@store/selectors";

export const PollUsersVotedResults: FC = memo(() => {

    let state = usePollsSelector();

    let users_count = state.polls.poll.apartment_house.users_count;
    let voted_count = state.polls.poll.votes.length;
    let not_voted_count = users_count - voted_count;

    return (
        <div>
            <ResultItem
                variant={"Всего жителей"}
                value={users_count}
            />
            <ResultItem
                variant={"Проголосовало"}
                value={voted_count}
            />
            <ResultItem
                variant={"Не проголосовали"}
                value={not_voted_count}
            />
        </div>
    )
});

PollUsersVotedResults.displayName = "PollUsersVotedResults";