import {FC, useEffect, useState} from "react";
import MeterRecordsTable from "../MeterRecordsTable";
import MeterRecordsRow from "../MeterRecordsTable/MeterRecordsRow";
import {useMetersSelector} from "@store/selectors";
import {FileType, MetersType} from "@typescript/interfaces";
import {calculateConsumptionHelper} from "@common/utils/helpers";
import {useQuery} from "@apollo/client";
import {DELETE_METER, UPDATE_METER} from "@api/mutations/mutations";
import useActions from "@hooks/useActions";
import {GET_METERS} from "@api/query/query";
import MeterDeviceDialog from "@components/MeterRecords/MeterDeviceDialog";
import {FormikValues} from "formik";
import {apiService} from "@services/apiService";
import WarningDialog from "@ui/Dialog/WarningDialog";
import {FilesService} from "@services/filesService";

export const MeterList: FC = () => {

    const state = useMetersSelector();
    const {setMetersAction} = useActions();
    const meters = useQuery(GET_METERS);

    const [open, setOpen] = useState<boolean>(false);
    const [values, setValues] = useState<any>();
    const [id, setId] = useState<number>();

    const [warningOpen, setWarningOpen] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const metersRefetch = () => {
        meters.refetch()
            .then(response => {
                let metersResponse = response.data.meters;
                setMetersAction(metersResponse);
            })
            .catch(err => console.log(err))
    };

    const updateMeterHandler = (values: FormikValues, files: string[], currentFiles: string[]) => {

        let {description, number, type_key} = values;

        apiService.mutationRequest(UPDATE_METER, {
            description,
            images: currentFiles.concat(files),
            number,
            type_key,
            id
        })
            .then(() => {
                metersRefetch();
                setOpen(false);
            })
            .catch(err => console.log(err))
    };


    const handleEdit = (values: FormikValues) => {
        let {images} = values;
        if (images.length) {
            let uploads: File[] = [];
            let currentFiles: string[] = [];

            FilesService.filterFiles(images as FileType[], uploads, currentFiles);

            if (uploads.length) {
                FilesService.filesUploadRequest(uploads)
                    .then(response => {
                        let files = FilesService.imagesArrayCreator(response);
                        updateMeterHandler(values, files, currentFiles);
                    })
                    .catch(err => console.log(err))
            } else {
                updateMeterHandler(values, [], currentFiles);
            }
        } else {
            updateMeterHandler(values,[], []);
        }
    };

    useEffect(() => {
        if (isSubmitted) {
            apiService.mutationRequest(DELETE_METER, {
                id
            })
                .then(() => {
                    setWarningOpen(false);
                    setIsSubmitted(false);
                    metersRefetch();
                })
                .catch(err => console.log(err))
        } else {
            setIsSubmitted(false);
            setWarningOpen(false);
        }
    }, [isSubmitted]);

    return (
        <>
            <WarningDialog
                open={warningOpen}
                setOpen={setWarningOpen}
                setIsSubmitted={setIsSubmitted}
            >
                Вы действительно желаете удалить прибор учета?
            </WarningDialog>
            <MeterDeviceDialog
                values={values}
                setOpen={setOpen}
                open={open}
                onSubmit={handleEdit}
                title={"Редактировать прибор учета"}
                submitAction={"Редактировать прибор учета"}
            />
            <MeterRecordsTable>
                {
                    state.meters.length
                        ?
                        state.meters.map((meter: MetersType) => {

                            let currentMonthRecords = meter.records[0] ? meter.records[0].value : null;
                            let lastMonthRecords = meter.records[1] ? meter.records[1].value : null;

                            let values: any = calculateConsumptionHelper(currentMonthRecords, lastMonthRecords);

                            const handleDelete = () => {
                                setWarningOpen(true);
                                setId(meter.id);
                            };

                            const showEditDialog = () => {
                                setOpen(true);
                                setValues(meter);
                                setId(meter.id);
                            };

                            return (
                                <MeterRecordsRow
                                    images={meter.images}
                                    onEdit={showEditDialog}
                                    onDelete={handleDelete}
                                    decreased={values.decreased}
                                    key={meter.id}
                                    control={true}
                                    icon={`/images/${meter.type.key}-icon.svg`}
                                    type={meter.type}
                                    number={meter.number}
                                    value={meter.records[0] ? meter.records[0].value : 0}
                                    consumption={values.consumption}
                                    difference={values.percent}
                                    description={meter.description}
                                />
                            )
                        })
                        :
                        null
                }
            </MeterRecordsTable>
        </>
    )
}