import {FC, ReactNode} from "react";
import styles from "../../MeterRecordsHistory.module.scss";
import TableRow from "@ui/Table/TableRow";
import TableCell from "@ui/Table/TableCell";
import TableBody from "@ui/Table/TableBody";

interface RecordsHistoryBody {
    date: string,
    children: ReactNode
}

export const RecordsHistoryBody: FC<RecordsHistoryBody> = (
    {
        date,
        children
    }
) => {
    return (
        <TableBody>
             <TableRow classes={[styles.RecordsHistoryTable__date]}>
                 <TableCell classes={[styles.RecordsHistoryTable__cell]} type={"td"}>
                     {date}
                 </TableCell>
                 <TableCell type={"td"}> </TableCell>
                 <TableCell type={"td"}> </TableCell>
                 <TableCell type={"td"}> </TableCell>
             </TableRow>
            {children}
        </TableBody>
    )
}