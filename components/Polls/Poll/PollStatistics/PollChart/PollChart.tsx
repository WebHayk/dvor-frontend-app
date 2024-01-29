import {FC, memo, useEffect, useState} from "react";

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {usePollsSelector} from "@store/selectors";
import {DatasetType, PollItemType} from "@typescript/interfaces";
import {getRandomColor} from "@common/utils/helpers";
import PollRatingResults from "./PollRatingResults";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip
);

const options = {
    responsive: true
};

export const PollChart: FC = memo(() => {

    let state = usePollsSelector();
    let {question_type_key} = state.polls.poll;

    let [datasets, setDatasets] = useState<DatasetType[]>([]);

    const configurationDatasets = () => {
        setDatasets([]);
        return state.polls.poll.options.map((option: PollItemType) => {
            setDatasets((prevState: any[]) => [...prevState, {
                data: [option.votes?.length],
                backgroundColor: getRandomColor(),
                label: option.text
            }]);
        });
    }

    useEffect(() => {
        if (state.polls.poll && question_type_key != "rating") {
            configurationDatasets();
        }
    }, [state.polls.poll.votes]);

    const data = {
        labels: [""],
        datasets
    };

    return (
        question_type_key != "rating"
            ?
            <Bar options={options} data={data}/>
            :
            <PollRatingResults/>
    )
});

PollChart.displayName = "PollChart";