import React, {ChangeEvent, FC, useCallback, useEffect, useState} from "react";
import styles from "./VotingBar.module.scss";
import {useMainSelector, usePollsSelector} from "@store/selectors";
import Button from "@ui/Button";
import VotingAnswers from "./VotingAnswers";
import Paper from "@ui/Paper";
import Rating from "@ui/Rating";
import {apiService} from "@services/apiService";
import {POLL_VOTE} from "@api/mutations/mutations";
import useActions from "@hooks/useActions";
import Textarea from "@ui/Textarea";
import ErrorMessageComponent from "@ui/Messages/ErrorMessage";

const COMMENT_MAX_LENGTH = 100;

export const VotingBar: FC = () => {

    let state = usePollsSelector();
    let mainState = useMainSelector();
    let poll = state.polls.poll;
    let {setPollOneUpdateStateAction} = useActions();

    let [rate, setRate] = useState<number>(0);
    let [answers, setAnswers] = useState<number[]>([]);
    let [isVoted, setIsVoted] = useState<boolean>(false);
    let [comment, setComment] = useState<string>("");

    let [error, setError] = useState<string>("");

    const handleSubmit = () => {
        if (poll.question_type_key == "some_of_many" || poll.question_type_key == "one_of_many") {
            if (answers.length) {
                apiService.mutationRequest(POLL_VOTE, {
                    comment: comment != "" ? comment : null,
                    options_ids: answers,
                    poll_id: poll.id,
                    rate: null
                })
                    .then(() => {
                        setPollOneUpdateStateAction(true);
                        setAnswers([]);
                        setComment("");
                    })
                    .catch(err => console.log(err))
            } else {
                setError("Необходимо выбрать вариант");
            }
        }

        if (poll.question_type_key == "rating") {
            if (rate != 0) {
                apiService.mutationRequest(POLL_VOTE, {
                    comment: comment != "" ? comment : null,
                    options_ids: [],
                    poll_id: poll.id,
                    rate
                })
                    .then(() => {
                        setPollOneUpdateStateAction(true);
                        setComment("");
                    })
                    .catch(err => console.log(err))
            } else {
                setError("Необходимо выбрать рейтинг");
            }
        }
    }

    useEffect(() => {
        let user_id = mainState.user.user_id;

        for (let i = 0; i < poll.votes.length; i++) {
            let vote = poll.votes[i];
            let user = poll.votes[i].user;

            if (vote.comment && user.id == user_id) {
                setComment(vote.comment);
            }

            if (user.id == user_id) setIsVoted(true);
        }

        return () => {
            setIsVoted(false);
            setError("");
        }
    }, [poll.votes]);

    const handleRetry = () => setIsVoted(false);

    const handleCommentChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        let {value} = event.target;

        if (comment.length <= COMMENT_MAX_LENGTH) {
            setComment(value);
        }
    }, [comment]);

    const configurePollControlView = () => {
        if (poll.question_type_key == "one_of_many" || poll.question_type_key == "some_of_many") {
            return (
                <VotingAnswers
                    setAnswers={setAnswers}
                    answers={answers}
                />
            )
        }

        if (poll.question_type_key == "rating") {
            return (
                <div className={styles.VotingBar__rate}>
                    <Rating
                        size={"medium"}
                        rating={rate}
                        setRating={setRate}
                    />
                    <p className={styles.VotingBar__label}>{rate}</p>
                </div>
            )
        }
    }

    return (
        <Paper className={styles.VotingBar}>
            {
                !poll.is_finished
                    ?
                    !isVoted
                        ?
                        <>
                            <p className={styles.VotingBar__question}>{poll.theme}?</p>
                            <div className={styles.VotingBar__content}>
                                {configurePollControlView()}
                                {
                                    error != ""
                                    &&
                                    <ErrorMessageComponent label={error}/>
                                }
                                <Textarea
                                    maxLength={COMMENT_MAX_LENGTH}
                                    className={styles.VotingBar__comment}
                                    placeholder={"Комментарий"}
                                    onChange={handleCommentChange}
                                    value={comment}
                                    name={"comment"}
                                />
                                <p className={styles.VotingBar__commentLength}>{comment.length} из {COMMENT_MAX_LENGTH} символов</p>
                            </div>
                            <Button
                                type={"button"}
                                onClick={handleSubmit}
                                color={"blue"}
                                label={"Проголосовать"}
                            />
                        </>
                        :
                        <div className={styles.VotingBar__voted}>
                            <p className={styles.VotingBar__text}>Ваш голос учтен</p>
                            {
                                poll?.is_vote_changeable
                                &&
                                <Button
                                    type={"button"}
                                    onClick={handleRetry}
                                    color={"white"}
                                    label={"Изменить голос"}
                                />
                            }
                        </div>
                    :
                    <p className={styles.VotingBar__ended}>Голосование окончено</p>
            }
        </Paper>
    )
}