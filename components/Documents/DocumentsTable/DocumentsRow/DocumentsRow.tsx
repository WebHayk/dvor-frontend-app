import {FC, memo} from "react";
import styles from "../../Documents.module.scss";
import TableRow from "@ui/Table/TableRow";
import TableCell from "@ui/Table/TableCell";
import RowControl from "@ui/Table/TableRow/RowControl";
import {dateFormatterHelper, dateToTimeHelper} from "@common/utils/helpers";

interface DocumentsRow {
    icon: string,
    name: string,
    created_at: string,
    control: boolean,
    handleDelete?: () => void,
    handleEdit?: () => void,
    handleRowClick: () => void
}

export const DocumentsRow: FC<DocumentsRow> = memo((
    {
        icon,
        name,
        control,
        handleDelete,
        handleEdit,
        handleRowClick,
        created_at
    }
) => {

    let creationDate = dateFormatterHelper(created_at);
    let creationTime = dateToTimeHelper(created_at);

    return (
        <TableRow
            type={"hover"}
        >
            <TableCell
                onClick={handleRowClick}
                type={"td"}
            >
                <img
                    src={icon}
                    alt={"document-icon"}
                    width={36}
                    height={36}
                />
            </TableCell>
            <TableCell
                onClick={handleRowClick}
                type={"td"}
            >
                {name}
            </TableCell>
            <TableCell
                onClick={handleRowClick}
                type={"td"}
            >
                {creationDate} {creationTime}
            </TableCell>
            <TableCell classes={[styles.DocumentsRow__row]} type={"td"}>
                {
                    control && handleDelete && handleEdit
                        ?
                        <RowControl
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                        :
                        null
                }
            </TableCell>
        </TableRow>
    )
});

DocumentsRow.displayName = "DocumentsRow";