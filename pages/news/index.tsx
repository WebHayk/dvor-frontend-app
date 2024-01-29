import {FC} from "react";
import {Suspense} from "react";
import AuthProvider from "@hoc/AuthProvider";
import MainLayout from "@layouts/MainLayout";
import Breadcrumbs from "@ui/Breadcrumbs";
import Breadcrumb from "@ui/Breadcrumbs/Breadcrumb";
import Divider from "@ui/Breadcrumbs/Divider";
import Section from "@ui/Section";
import RoleScreenProvider from "@hoc/RoleScreenProvider";
import {useMainSelector} from "@store/selectors";
import dynamic from "next/dynamic";

const NewsComponent = dynamic(() => import("@components/News"), {
    suspense: true
});

const News: FC = () => {

    let state = useMainSelector();
    let isProfileVerified = state.profile?.user.is_verified;

    return (
        <AuthProvider>
            <RoleScreenProvider
                roles={["owner", "senior", "resident", "spokesman"]}
                isProfileVerified={isProfileVerified}
            >
                <MainLayout>
                    <Breadcrumbs>
                        <Breadcrumb href={"/desktop"} label={"Главная"} />
                        <Divider />
                        <Breadcrumb href={"/news"} label={"Новости"} />
                    </Breadcrumbs>
                    <Section title={"Новости"}>
                        <Suspense fallback={"Загрузка.."}>
                            <NewsComponent />
                        </Suspense>
                    </Section>
                </MainLayout>
            </RoleScreenProvider>
        </AuthProvider>
    )
}

export default News;