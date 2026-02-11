
import ShadowCardGrid from "@/components/homepage/ShadowCardGrid";
import Head from "next/head";

export default function Index() {
    return (
        <>
            <Head>
                <title>UiXplore</title>
            </Head>
            <main className={`main-border-around `}>
                <ShadowCardGrid/>
            </main>
        </>
    );
} 

