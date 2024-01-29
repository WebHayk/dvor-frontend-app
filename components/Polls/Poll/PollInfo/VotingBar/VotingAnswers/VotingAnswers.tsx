import React, {FC} from "react";
import {usePollsSelector} from "@store/selectors";
import VotingAnswer from "./VotingAnswer";
import {PollItemType} from "@typescript/interfaces";

interface VotingAnswers {
    setAnswers: React.Dispatch<number[]>,
    answers: number[]
}

export const VotingAnswers: FC<VotingAnswers> = (
    {
        setAnswers,
        answers
    }
) => {

    let state = usePollsSelector();
    let poll = state.polls.poll;

    return (
        poll.options.length
        ?
        poll.options.map((option: PollItemType, index: number) => {
            return (
                <VotingAnswer
                    image={option.image}
                    id={option.id as number}
                    answers={answers}
                    key={option.id}
                    variant={option.text}
                    index={index}
                    questionType={poll.question_type_key}
                    setAnswers={setAnswers}
                />
            )
        })
        :
        null
    )
}