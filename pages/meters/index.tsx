import {FC} from "react";
import AuthProvider from "@hoc/AuthProvider";
import MainLayout from "@layouts/MainLayout";
import Breadcrumbs from "@ui/Breadcrumbs";
import Breadcrumb from "@ui/Breadcrumbs/Breadcrumb";
import Divider from "@ui/Breadcrumbs/Divider";
import MeterRecordsComponent from "@components/MeterRecords";
import RoleScreenProvider from "@hoc/RoleScreenProvider";

const MeterRecords: FC = () => {
    return (
        <AuthProvider>
            <RoleScreenProvider
                roles={["resident", "owner", "spokesman", "senior"]}
                isProfileVerified={"all"}
            >
                <MainLayout>
                    <Breadcrumbs>
                        <Breadcrumb href={"/desktop"} label={"Главная"} />
                        <Divider />
                        <Breadcrumb href={"/meter-records"} label={"Показания"} />
                    </Breadcrumbs>
                    <MeterRecordsComponent />
                </MainLayout>
            </RoleScreenProvider>
        </AuthProvider>
    )
}

export default MeterRecords;