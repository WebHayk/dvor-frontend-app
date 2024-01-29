import React, {FC, memo} from "react";
import styles from "../../VotingBar.module.scss";
import Radio from "@ui/Radio";
import Checkbox from "@ui/Checkbox";
import cs from "classnames";
import ImageComponent from "@ui/FilesUpload/ImagesList/Image";
import {ASSETS_BASE_URL} from "@common/utils/options";
import {generateId} from "@common/utils/helpers";

interface VotingAnswer {
    questionType: string,
    setAnswers: any,
    index: number,
    answers: number[],
    variant: string,
    id: number,
    image: string
}

export const VotingAnswer: FC<VotingAnswer> = memo((
    {
        questionType,
        setAnswers,
        id,
        answers,
        index,
        variant,
        image
    }
) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!answers.includes(id) && event.target.checked) {
            if (questionType == "one_of_many") {
                setAnswers([id]);
            } else {
                setAnswers((prevState: any) => [...prevState, id]);
            }
        } else if (!event.target.checked) {
            setAnswers(answers.filter(answer => answer !== id));
        }
    }

    const configureAnswersControlView = () => {
        switch (questionType) {
            case "one_of_many":
                return (
                    <Radio
                        onChange={handleChange}
                        name={"vote-variant"}
                    />
                )
            case "some_of_many":
                return (
                    <Checkbox
                        onChange={handleChange}
                        name={"vote-variant"}
                        checked={answers.includes(index)}
                    />
                )
        }
    }

    return (
        <div className={styles.VotingAnswer}>
            <div className={styles.VotingAnswer__content}>
                {configureAnswersControlView()}
                <p className={cs({
                    [styles.VotingAnswer__label]: true,
                    [styles.VotingAnswer__active]: answers.includes(id)
                })}>{variant}</p>
            </div>
            {
                image
                &&
                <ImageComponent
                    className={styles.VotingAnswer__image}
                    image={ASSETS_BASE_URL + image}
                    id={1}
                />
            }
        </div>
    )
});

VotingAnswer.displayName = "VotingAnswer";