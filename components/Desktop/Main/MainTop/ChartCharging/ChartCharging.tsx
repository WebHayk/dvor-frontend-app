import React from "react";
import {FC, useState} from "react";
import styles from "./ChartCharging.module.scss";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Select from "@ui/Select";
import {CHARGING_OPTIONS_LIST} from "@common/utils/options";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
);

const labels = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл'];

const options = {
    responsive: true
};

const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [0,5,20,25,45,53,50,52],
            borderColor: '#FF9500',
            backgroundColor: '#FF9500',
        },
        {
            label: 'Dataset 2',
            data: [0,3,18,22,34,46,40,24],
            borderColor: '#34C759',
            backgroundColor: '#34C759',
        },
    ],
};

export const ChartCharging: FC = () => {

    let [chargingSelect, setChargingSelect] = useState<string>("")

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setChargingSelect(event.target.value);
    }

    return (
        <div className={styles.ChartCharging}>
            <div className={styles.ChartCharging__top}>
                <p className={styles.ChartCharging__title}>График</p>
                <Select
                    value={chargingSelect}
                    options={CHARGING_OPTIONS_LIST}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.ChartCharging__content}>
                <Line options={options} data={data} />
            </div>
        </div>
    )
}