import React, {FC, useEffect, useState} from "react";
import Dialog from "@ui/Dialog";
import styles from "./AddIndicationsDialog.module.scss";
import {useMetersSelector} from "@store/selectors";
import {IndicationType, MetersType} from "@typescript/interfaces";
import IndicationRow from "./IndicationRow";
import DialogFooter from "@ui/Dialog/DialogFooter";
import {useMutation, useQuery} from "@apollo/client";
import {INSERT_METER_RECORDS} from "@api/mutations/mutations";
import useActions from "@hooks/useActions";
import {GET_METERS} from "@api/query/query";

interface AddIndicationsDialog {
    open: boolean,
    setOpen: React.Dispatch<boolean>
}

let indications: IndicationType[] = [];

export const AddIndicationsDialog: FC<AddIndicationsDialog> = (
    {
        open,
        setOpen
    }
) => {

    const handleClose = () => setOpen(false);
    const {setMetersAction} = useActions();
    const meters = useQuery(GET_METERS);
    const [insertMeterRecords] = useMutation(INSERT_METER_RECORDS);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const state = useMetersSelector();

    const handleSubmit = () => setIsSubmitted(true);

    useEffect(() => {
        if (isSubmitted) {
            if (indications.length == state.meters.length) {
                insertMeterRecords({
                    variables: {
                        values: indications
                    }
                })
                    .then(() => {
                        meters.refetch()
                            .then(response => {
                                let metersResponse = response.data.meters;
                                setMetersAction(metersResponse);
                                setOpen(false);
                                indications = [];
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            } else {
                setIsSubmitted(false);
                indications = [];
            }
        }
    }, [indications, isSubmitted]);

    return (
        <Dialog
            handleClose={handleClose}
            open={open}
            title={"Передать показания"}
        >
            <div className={styles.AddIndicationsDialog}>
                {
                    state.meters.length
                    ?
                    state.meters.map((meter: MetersType) => {

                        let lastMonthRecords = meter.records[1] ? meter.records[1].value : null;

                        return (
                            <IndicationRow
                                key={meter.id}
                                id={meter.id}
                                indications={indications}
                                type={meter.type}
                                lastValue={lastMonthRecords}
                                icon={meter.type.key}
                                placeholder={`${meter.type.name} ${meter.number}`}
                                isSubmitted={isSubmitted}
                            />
                        )
                    })
                    :
                    null
                }
                <DialogFooter
                    handleClose={handleClose}
                    handleSubmit={handleSubmit}
                    submitAction={"Отправить показания"}
                />
            </div>
        </Dialog>
    )
}

