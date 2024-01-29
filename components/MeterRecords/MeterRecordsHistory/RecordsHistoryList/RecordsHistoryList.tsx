import {FC} from "react";
import {useMetersSelector} from "@store/selectors";
import {MeterRecordType} from "@typescript/interfaces";
import RecordsHistoryTable from "../RecordsHistoryTable";
import MeterRecordsRow from "@components/MeterRecords/MeterRecordsTable/MeterRecordsRow";
import {calculateConsumptionHelper, dateFormatterHelper} from "@common/utils/helpers";
import RecordsHistoryBody from "@components/MeterRecords/MeterRecordsHistory/RecordsHistoryTable/RecordsHistoryBody";

export const RecordsHistoryList: FC = () => {

    let state = useMetersSelector();

    return (
        <RecordsHistoryTable>
            {
                state.meterRecords.length
                    ?
                    state.meterRecords.map((records: MeterRecordType[], index: number) => {

                        let recordsInsertDate = dateFormatterHelper(records[0].created_at);

                        return (
                            <RecordsHistoryBody key={index} date={recordsInsertDate}>
                                {
                                    records.map(record => {

                                        let currentMonthRecords = record.meter?.records[0] ? record.meter.records[0].value : null;
                                        let lastMonthRecords = record.meter?.records[1] ? record.meter.records[1].value : null;

                                        let values: any = calculateConsumptionHelper(currentMonthRecords, lastMonthRecords);

                                        return (
                                            <MeterRecordsRow
                                                key={Math.random()}
                                                decreased={values.decreased}
                                                number={record.meter.number}
                                                control={false}
                                                type={record.meter.type}
                                                icon={`/images/${record.meter.type.key}-icon.svg`}
                                                description={record.meter.description}
                                                value={record.value}
                                                consumption={values.consumption}
                                                difference={values.percent}
                                            />
                                        )
                                    })
                                }
                            </RecordsHistoryBody>
                        )
                    })
                    :
                    null
            }
        </RecordsHistoryTable>
    )
}