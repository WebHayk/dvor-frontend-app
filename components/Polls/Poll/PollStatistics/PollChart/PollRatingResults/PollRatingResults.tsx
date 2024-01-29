import {FC, memo, useEffect, useState} from "react";
import styles from "../../PollStatistics.module.scss";
import {usePollsSelector} from "@store/selectors";
import {PollRatingType} from "@typescript/interfaces";
import Rating from "@ui/Rating";

let initialState: PollRatingType = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
};

export const PollRatingResults: FC = memo(() => {

    let state = usePollsSelector();
    let {votes} = state.polls.poll;
    let [isShow, setIsShow] = useState<boolean>(false);

    useEffect(() => {

        async function clearInitialState() {
            initialState = {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0
            };
        }

        clearInitialState()
            .then(() => {
                for (let i = 0; i < votes.length; i++) {
                    let vote = votes[i];
                    initialState[vote.rate] = initialState[vote.rate] + 1;
                    setIsShow(!isShow);
                }
            })
    }, [votes]);

    return (
        <>
            {
                Object.entries(initialState).map(item => {

                    let ratingValue = item[0];
                    let count = item[1];

                    return (
                        <div key={ratingValue} className={styles.PollRatingResults__row}>
                            <Rating
                                className={styles.PollRatingResults__rating}
                                rating={+ratingValue}
                            />
                            {count}
                        </div>
                    )
                })
            }
        </>
    )
});

PollRatingResults.displayName = "PollRatingResults";