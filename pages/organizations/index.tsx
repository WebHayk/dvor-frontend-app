import {FC, useEffect} from "react";
import MainLayout from "@layouts//MainLayout";
import Breadcrumbs from "@ui/Breadcrumbs";
import Breadcrumb from "@ui/Breadcrumbs/Breadcrumb";
import Divider from "@ui/Breadcrumbs/Divider";
import useActions from "@hooks/useActions";
import dynamic from "next/dynamic";

const Organizations = dynamic(() => import("@components/Organizations"));

const OrganizationsPage: FC = () => {

    let {setSearchOrganizationsTypeAction} = useActions();

    useEffect(() => {
        setSearchOrganizationsTypeAction("");
    }, [])

    return (
        <MainLayout>
            <Breadcrumbs>
                <Breadcrumb href={"/desktop"} label={"Главная"}/>
                <Divider/>
                <Breadcrumb href={"/organizations"} label={"Организации"}/>
            </Breadcrumbs>
            <Organizations/>
        </MainLayout>
    )
}


export default OrganizationsPage