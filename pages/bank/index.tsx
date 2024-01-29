import {FC} from "react";
import AuthProvider from "@hoc/AuthProvider";
import MainLayout from "@layouts/MainLayout";
import Breadcrumbs from "@ui/Breadcrumbs";
import Breadcrumb from "@ui/Breadcrumbs/Breadcrumb";
import Divider from "@ui/Breadcrumbs/Divider";
import Section from "@ui/Section";
import Bank from "@components/Bank";
import RoleScreenProvider from "@hoc/RoleScreenProvider";
import {useMainSelector} from "@store/selectors";

const BankPage: FC = () => {

    let state = useMainSelector();
    let isProfileVerified = state.profile?.user.is_verified;

    return (
        <AuthProvider>
            <RoleScreenProvider
                roles={["senior"]}
                isProfileVerified={isProfileVerified}
            >
                <MainLayout>
                    <Breadcrumbs>
                        <Breadcrumb href={"/desktop"} label={"Главная"} />
                        <Divider />
                        <Breadcrumb href={"/bank"} label={"Банк"} />
                    </Breadcrumbs>
                    <Section title={"Получение выписки по номеру счета"}>
                        <Bank />
                    </Section>
                </MainLayout>
            </RoleScreenProvider>
        </AuthProvider>
    )
}

export default BankPage;