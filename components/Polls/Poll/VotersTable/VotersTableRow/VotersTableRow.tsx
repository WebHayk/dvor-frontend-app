import {FC, useEffect, useState} from "react";
import styles from "../../Poll.module.scss";
import TableRow from "@ui/Table/TableRow";
import TableCell from "@ui/Table/TableCell";
import {dateFormatterHelper, dateToTimeHelper} from "@common/utils/helpers";
import {ASSETS_BASE_URL} from "@common/utils/options";
import Avatar from "@ui/Avatar";
import {PollOptionType} from "@typescript/interfaces";
import {usePollsSelector} from "@store/selectors";

interface VotersTableRow {
    created_at: string,
    rate: number | null,
    variants: PollOptionType[],
    comment: string,
    profile: {
        avatar: string | null,
        name: string,
        last_name: string
    }
}

export const VotersTableRow: FC<VotersTableRow> = (
    {
        created_at,
        rate,
        comment,
        profile,
        variants
    }
) => {

    let state = usePollsSelector();
    let date = dateFormatterHelper(created_at);
    let time = dateToTimeHelper(created_at);
    let [answers, setAnswers] = useState<string[]>([]);

    let avatarCondition = profile.avatar ? ASSETS_BASE_URL + profile.avatar : "/empty-profile-icon.svg";

    useEffect(() => {
        setAnswers([]);
    }, [state.polls.poll.votes]);

    useEffect(() => {
        if (variants.length) {
            for (let i = 0; i < variants.length; i++) {
                let {text} = variants[i].option;
                setAnswers(prevState => [...prevState, text]);
            }
        }
    }, [variants]);

    return (
        <TableRow>
            <TableCell type={"td"}>
                {date} {time}
            </TableCell>
            <TableCell type={"td"}>
                <div className={styles.VotersTableRow__profile}>
                    <Avatar
                        loading={"lazy"}
                        image={avatarCondition}
                        size={"medium"}
                    />
                    <p className={styles.VotersTableRow__name}>{profile.name} {profile.last_name}</p>
                </div>
            </TableCell>
            <TableCell type={"td"}>
                <p className={styles.VotersTableRow__comment}>{comment}</p>
            </TableCell>
            <TableCell type={"td"}>
                {
                    rate
                    ?
                    rate
                    :
                    answers.join(", ")
                }
            </TableCell>
        </TableRow>
    )
}