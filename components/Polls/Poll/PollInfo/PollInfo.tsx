import {FC, memo} from "react";
import styles from "./PollInfo.module.scss";
import {usePollsSelector} from "@store/selectors";
import {pollDurationCalculateHelper} from "@common/utils/helpers";
import PollsDate from "@ui/Polls/PollsDate";
import VotersList from "@components/Polls/Poll/VotersList";
import Avatar from "@ui/Avatar";
import {ASSETS_BASE_URL} from "@common/utils/options";
import VotingBar from "./VotingBar";
import PollImages from "./PollImages";
import cs from "classnames";

export const PollInfo: FC = memo(() => {

    let state = usePollsSelector();
    let poll = state.polls.poll;
    let owner = poll?.owner.profile;

    let days = pollDurationCalculateHelper(poll?.end_date);

    let avatarCondition = owner?.avatar ? ASSETS_BASE_URL + owner.avatar : "/profile-empty-icon.svg";

    return (
        poll
        ?
        <div className={styles.PollInfo}>
            <div className={styles.PollInfo__header}>
                {
                    days > 0
                    ?
                    <p className={styles.PollInfo__process}>
                        До окончания голосования осталось <span className={styles.PollInfo__days}>{days} дней</span>
                    </p>
                    :
                    null
                }
                <p className={styles.PollInfo__theme}>{poll.theme}</p>
                {
                    poll.is_anonymous
                    &&
                    <p className={cs({
                        [styles.PollInfo__process]: true,
                        [styles.PollInfo__anonymous]: poll.is_anonymous
                    })}>Анонимный опрос</p>
                }
            </div>
            <div className={styles.PollInfo__content}>
                <div className={styles.PollInfo__section}>
                    <p className={styles.PollInfo__label}>Описание</p>
                    <p className={styles.PollInfo__description}>{poll.content}</p>
                </div>
                <PollsDate
                    className={styles.PollInfo__date}
                    startDate={poll.start_date}
                    endDate={poll.end_date}
                />
                {
                    !poll.is_anonymous
                    &&
                    <div className={styles.PollInfo__section}>
                        <p className={styles.PollInfo__label}>Заметка / Доп описание</p>
                        <p className={styles.PollInfo__description}>{poll.notes}</p>
                    </div>
                }
                <div className={styles.PollInfo__owner}>
                    <Avatar
                        image={avatarCondition}
                        size={"medium"}
                    />
                    <div className={styles.PollInfo__profile}>
                        <p>{owner.name} {owner.last_name}</p>
                        <p className={styles.PollInfo__position}>Автор</p>
                    </div>
                </div>
            </div>
            {
                poll.images.length
                ?
                <PollImages/>
                :
                null
            }
            <VotingBar />
            {
                !poll.is_anonymous
                &&
                <VotersList/>
            }
        </div>
        :
        null
    )
});

PollInfo.displayName = "PollInfo";