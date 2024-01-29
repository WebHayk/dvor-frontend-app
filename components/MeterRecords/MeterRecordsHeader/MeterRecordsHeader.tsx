import {FC, useState} from "react";
import styles from "./MeterRecordsHeader.module.scss";
import Button from "@ui/Button";
import AddIndicationsDialog from "./AddIndicationsDialog";
import {useRouter} from "next/router";
import MeterDeviceDialog from "../MeterDeviceDialog";
import {FormikValues} from "formik";
import {useMainSelector, useMetersSelector} from "@store/selectors";
import {apiService} from "@services/apiService";
import {GET_METERS} from "@api/query/query";
import useActions from "@hooks/useActions";
import {useQuery} from "@apollo/client";
import {INSERT_METER} from "@api/mutations/mutations";
import {FilesService} from "@services/filesService";

export const MeterRecordsHeader: FC = () => {

    let router = useRouter();
    let meters = useQuery(GET_METERS);
    let mainState = useMainSelector();
    let metersState = useMetersSelector();
    let {setMetersAction} = useActions();

    let [meterDeviceOpen, setMeterDeviceOpen] = useState<boolean>(false);
    let [indicationsOpen, setIndicationsOpen] = useState<boolean>(false);

    const handleMeterDeviceDialogShow = () => setMeterDeviceOpen(true);
    const handleHistoryIndicationsShow = () => router.push("/meters/history");
    const showAddIndicationsDialog = () => setIndicationsOpen(true);

    const insertMeterHandler = (values: FormikValues, files: string[]) => {

        let {number, type_key, description} = values;
        let apartment_id = mainState.user.apartment_user.apartment.id;

        apiService.mutationRequest(INSERT_METER, {
            apartment_id,
            number,
            type_key,
            description,
            images: files
        })
            .then(() => {
                meters.refetch()
                    .then(response => {
                        let data = response.data.meters;
                        setMetersAction(data);
                        setMeterDeviceOpen(false);
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const handleAddMeter = (values: FormikValues) => {
        let {images} = values;

        if (images.length) {
            FilesService.filesUploadRequest(images)
                .then(response => {
                    let data = FilesService.imagesArrayCreator(response);
                    insertMeterHandler(values, data);
                })
                .catch(err => console.log(err))
        } else {
            insertMeterHandler(values, []);
        }
    }

    return (
        <>
            <MeterDeviceDialog
                onSubmit={handleAddMeter}
                title={"Добавить прибор учета"}
                submitAction={"Добавить прибор учета"}
                setOpen={setMeterDeviceOpen}
                open={meterDeviceOpen}
            />
            <AddIndicationsDialog
                open={indicationsOpen}
                setOpen={setIndicationsOpen}
            />
            <div className={styles.MeterRecordsHeader}>
                <p className={styles.MeterRecordsHeader__title}>Показания приборов учета</p>
                <div className={styles.MeterRecordsHeader__right}>
                    <Button
                        type={"button"}
                        onClick={handleMeterDeviceDialogShow}
                        color={"white"}
                        icon={"/images/add-grey-icon.svg"}
                        label={"Добавить прибор учета"}
                    />
                    <div className={styles.MeterRecordsHeader__history}>
                        <Button
                            type={"button"}
                            onClick={handleHistoryIndicationsShow}
                            color={"white"}
                            icon={"/images/history-grey-icon.svg"}
                            label={"История показаний"}
                        />
                    </div>
                    {
                        metersState.meters.length
                        ?
                        <Button
                            type={"button"}
                            onClick={showAddIndicationsDialog}
                            color={"blue"}
                            icon={"/images/meter-records-white-icon.svg"}
                            label={"Передать показания"}
                        />
                        :
                        null
                    }
                </div>
            </div>
        </>
    )
}