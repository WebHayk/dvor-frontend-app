import AuthProvider from "@hoc/AuthProvider";
import MainLayout from "@layouts/MainLayout";
import Breadcrumbs from "@ui/Breadcrumbs";
import Breadcrumb from "@ui/Breadcrumbs/Breadcrumb";
import Divider from "@ui/Breadcrumbs/Divider";
import MeterRecordsHistoryComponent from "@components/MeterRecords/MeterRecordsHistory";

const MeterRecordsHistory = () => {
    return (
        <AuthProvider>
            <MainLayout>
                <Breadcrumbs>
                    <Breadcrumb href={"/desktop"} label={"Главная"} />
                    <Divider />
                    <Breadcrumb href={"/meters"} label={"Показания"} />
                    <Divider />
                    <Breadcrumb href={"/meters/history"} label={"История показаний"} />
                </Breadcrumbs>
                <MeterRecordsHistoryComponent />
            </MainLayout>
        </AuthProvider>
    )
}

export default MeterRecordsHistory;