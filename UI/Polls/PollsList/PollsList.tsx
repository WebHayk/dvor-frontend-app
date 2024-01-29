import {FC, memo} from "react";
import {PollListType} from "@typescript/interfaces";
import PollsItem from "@ui/Polls/PollsItem";

interface PollsList {
    array: PollListType[]
}

export const PollsList: FC<PollsList> = memo((
    {
        array
    }
) => {
    return (
        <>
            {
                array.length
                ?
                array.map((poll) => {
                    return (
                        <PollsItem
                            id={poll.id}
                            key={poll.id}
                            theme={poll.theme}
                            content={poll.content}
                            startDate={poll.start_date}
                            endDate={poll.end_date}
                        />
                    )
                })
                :
                <p>Нет опросов</p>
            }
        </>
    )
});

PollsList.displayName = "PollsList";