import {FC, ReactNode} from "react";
import Table from "@ui/Table";
import TableHead from "@ui/Table/TableHead";
import TableRow from "@ui/Table/TableRow";
import TableCell from "@ui/Table/TableCell";
import TableBody from "@ui/Table/TableBody";

interface DocumentsTable {
    children: ReactNode
}

export const DocumentsTable: FC<DocumentsTable> = ({children}) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell type={"th"}>
                        Формат
                    </TableCell>
                    <TableCell type={"th"}>
                        Название
                    </TableCell>
                    <TableCell type={"th"}>
                        Дата создания
                    </TableCell>
                    <TableCell type={"th"}></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {children}
            </TableBody>
        </Table>
    )
}