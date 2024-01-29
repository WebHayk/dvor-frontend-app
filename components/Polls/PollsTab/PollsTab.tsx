import {FC, memo, Suspense} from "react";
import TabList from "@ui/Tabs";
import TabHeader from "@ui/Tabs/TabHeader";
import Tab from "@ui/Tabs/Tab";
import TabPanel from "@ui/Tabs/TabPanel";
import useActions from "@hooks/useActions";
import {usePollsSelector} from "@store/selectors";
import dynamic from "next/dynamic";

const Polls = dynamic(() => import("./Polls"), {
    suspense: true
});

export const PollsTab: FC = memo(() => {

    let state = usePollsSelector();
    let {setCurrentPollsAction, setPastPollsAction} = useActions();

    return (
        <TabList>
            <TabHeader>
                <Tab label={"Текущие"} index={1}/>
                <Tab label={"Завершенные"} index={2}/>
            </TabHeader>
            <TabPanel index={1}>
                <Suspense fallback={"Загрузка.."}>
                    <Polls
                        array={state.polls.current}
                        setPollsAction={setCurrentPollsAction}
                        is_finished={false}
                    />
                </Suspense>
            </TabPanel>
            <TabPanel index={2}>
                <Suspense fallback={"Загрузка.."}>
                    <Polls
                        array={state.polls.past}
                        setPollsAction={setPastPollsAction}
                        is_finished={true}
                    />
                </Suspense>
            </TabPanel>
        </TabList>
    )
});

PollsTab.displayName = "PollsTab";