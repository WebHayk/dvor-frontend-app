import {FC} from "react";
import StatementControl from "@components/Bank/StatementControl";
import {useRouter} from "next/router";

export const Bank: FC = () => {

    let router = useRouter();

    const getStatementHandler = () => {
        router.push("/bank/45");
    }

    return (
        <StatementControl onSubmit={getStatementHandler} />
    )
}