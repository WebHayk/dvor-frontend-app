import React, {FC, useEffect} from "react";
import VerticalTabs from "@ui/VerticalTabs";
import VerticalTab from "@ui/VerticalTabs/VerticalTab";
import styles from "../Task.module.scss";
import RatingView from "@ui/Rating/RatingView";
import {useTasksSelector} from "@store/selectors";
import {useRouter} from "next/router";

interface TaskTab {
    setCurrentIndex: React.Dispatch<number>,
    currentIndex: number
}

enum TabNames {
    APPLICATION = "application",
    CHAT = "chat",
    CHECKLISTS = "checklists",
    HISTORY = "history"
}

export const TaskTab: FC<TaskTab> = (
    {
        setCurrentIndex,
        currentIndex
    }
) => {

    let router = useRouter();
    let {query} = router;
    let state = useTasksSelector();

    const tabChangerWithRouter = (view: string) => {
        router.push({
            pathname: `${router.query.id}`,
            query: {
                view
            }
        });
    }

    useEffect(() => {
        switch (currentIndex) {
            case 1:
                tabChangerWithRouter(TabNames.APPLICATION);
                break;
            case 2:
                tabChangerWithRouter(TabNames.CHAT);
                break;
            case 3:
                tabChangerWithRouter(TabNames.CHECKLISTS);
                break;
            default:
                tabChangerWithRouter(TabNames.HISTORY);

        }
    }, [currentIndex]);

    useEffect(() => {
        if (query && query.view) {
            switch (query.view) {
                case TabNames.APPLICATION:
                    setCurrentIndex(1);
                    break;
                case TabNames.CHAT:
                    setCurrentIndex(2);
                    break;
                case TabNames.CHECKLISTS:
                    setCurrentIndex(3);
                    break;
                default:
                    setCurrentIndex(4)
            }
        }
    }, [query]);

    return (
        <div className={styles.TaskComponent__tab}>
            <VerticalTabs
                setCurrentIndex={setCurrentIndex}
                currentIndex={currentIndex}
            >
                <VerticalTab
                    icon={"/images/application-grey-icon.svg"}
                    label={"Заявка"}
                    index={1}
                />
                {
                    state.task.data.worker_user_chat || state.task.data.operator_user_chat
                    ?
                    <VerticalTab
                        icon={"/images/comments-icon.svg"}
                        label={"Чаты"}
                        index={2}
                    />
                    :
                    null
                }
                <VerticalTab
                    icon={"/images/history-editions-grey-icon.svg"}
                    label={"История изменений"}
                    index={4}
                />
            </VerticalTabs>
            {
                state.task.data.rating
                ?
                <RatingView
                    className={styles.TaskTab__rating}
                    rating={state.task.data.rating}
                    title={"Рейтинг заявки"}
                />
                :
                null
            }
        </div>
    )
}