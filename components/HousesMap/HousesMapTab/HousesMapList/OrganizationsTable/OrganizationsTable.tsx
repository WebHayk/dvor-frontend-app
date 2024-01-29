import {FC, ReactNode} from "react";
import Table from "@ui/Table";
import TableBody from "@ui/Table/TableBody";

interface OrganizationsTable {
    children: ReactNode
}

export const OrganizationsTable: FC<OrganizationsTable> = (
    {
        children
    }
) => {
    return (
        <Table>
            <TableBody>
                {children}
            </TableBody>
        </Table>
    )
}