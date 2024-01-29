import {FC, memo} from "react";
import styles from "../Poll.module.scss";
import Paper from "@ui/Paper";
import VotersTable from "@components/Polls/Poll/VotersTable";
import {usePollsSelector} from "@store/selectors";
import {PollVoteType} from "@typescript/interfaces";
import VotersTableRow from "../VotersTable/VotersTableRow";

export const VotersList: FC = memo(() => {

    let state = usePollsSelector();

    return (
        <Paper className={styles.VotersList}>
            <div className={styles.VotersList__header}>
                <p className={styles.VotersList__title}>Проголосовавшие</p>
            </div>
            <VotersTable>
                {
                    state.polls.poll.votes.map((vote: PollVoteType) => {
                        return (
                            <VotersTableRow
                                rate={vote.rate}
                                comment={vote.comment}
                                key={vote.user.id}
                                variants={vote.options}
                                created_at={vote.created_at}
                                profile={vote.user.profile}
                            />
                        )
                    })
                }
            </VotersTable>
        </Paper>
    )
});

VotersList.displayName = "VotersList";