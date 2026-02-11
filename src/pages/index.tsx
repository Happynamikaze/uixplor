
import { Button } from "@/components/ui/button";
import ShadowCardGrid from "@/components/homepage/ShadowCardGrid";
import Head from "next/head";

export default function Index() {
    return (
        <>
            <Head>
                <title>UiXplore</title>
            </Head>
            <main className={`main-border-around `}>
                <div className="container py-8 flex gap-4 flex-wrap justify-center">
                    <Button>Default Button</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                </div>
                <ShadowCardGrid />
            </main>
        </>
    );
}

