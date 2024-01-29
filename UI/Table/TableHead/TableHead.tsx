import {FC} from "react";

export const TableHead: FC = ({children}) => {
    return (
        <thead>
            {children}
        </thead>
    )
}