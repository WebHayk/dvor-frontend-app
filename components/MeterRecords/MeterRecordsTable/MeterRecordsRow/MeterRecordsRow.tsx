import {FC} from "react";
import TableRow from "@ui/Table/TableRow";
import TableCell from "@ui/Table/TableCell";
import styles from "./MeterRecordsRow.module.scss";
import cs from "classnames";
import RowControl from "@ui/Table/TableRow/RowControl";

interface MeterRecordsRow {
    icon: string,
    onDelete?: () => void,
    onEdit?: () => void,
    type: {
        key: string,
        name: string
    },
    number: string,
    value: number,
    consumption: number,
    difference: string,
    description: string,
    control: boolean,
    decreased: boolean,
    images?: string[]
}

export const MeterRecordsRow: FC<MeterRecordsRow> = (
    {
        icon,
        type,
        number,
        value,
        consumption,
        difference,
        description,
        control,
        decreased,
        onDelete,
        onEdit,
        images
    }
) => {
    return (
        <TableRow>
            <TableCell type={"td"}>
                <div className={styles.MeterRecordsRow__counter}>
                    <img
                        src={icon}
                        alt={"counter-icon"}
                        width={40}
                        height={40}
                    />
                    <div className={styles.MeterRecordsRow__counterContent}>
                        <p className={styles.MeterRecordsRow__type}>{type.name}</p>
                        <p className={styles.MeterRecordsRow__number}>{number}</p>
                    </div>
                </div>
            </TableCell>
            <TableCell type={"td"}>
                <p className={styles.MeterRecordsRow__label}>{value}</p>
            </TableCell>
            <TableCell type={"td"}>
                <div className={styles.MeterRecordsRow__consumption}>
                    <p className={styles.MeterRecordsRow__label}>{consumption} {type.key == "electricity_day" || type.key == "electricity_night" ? "кВТ.ч" : "куб. м"}</p>
                    <div className={styles.MeterRecordsRow__row}>
                        <p className={cs({
                            [styles.MeterRecordsRow__difference]: true,
                            [styles.MeterRecordsRow__grow]: !decreased,
                            [styles.MeterRecordsRow__decreased]: decreased
                        })}>{decreased ? "-" : "+"}{difference}%</p>
                        <img
                            alt={"meters-icon"}
                            src={decreased ? "/images/decreased-icon.svg" : "/images/grow-icon.svg"}
                        />
                    </div>
                </div>
            </TableCell>
            <TableCell type={"td"}>
                <p className={styles.MeterRecordsRow__label}>{description}</p>
            </TableCell>
            {
                control
                ?
                <TableCell align={"right"} type={"td"}>
                    <div className={styles.MeterRecordsRow__control}>
                        {
                            images?.length
                            ?
                            <div className={styles.MeterRecordsRow__verified}>
                                <img
                                    src={"/images/image-grey-icon.svg"}
                                    alt={"image-icon"}
                                    width={24}
                                    height={24}
                                />
                            </div>
                            :
                            null
                        }
                        {
                            onDelete && onEdit
                            ?
                            <RowControl
                                handleEdit={onEdit}
                                handleDelete={onDelete}
                            />
                            :
                            number
                        }
                    </div>
                </TableCell>
                :
                null
            }
        </TableRow>
    )
}