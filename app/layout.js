import "./globals.css";
import {Providers} from "@/app/components/Providers";
import 'animate.css'
import Footer from "@/app/components/Footer";
import {Suspense} from "react";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
    title: "Magnólia Tiffanystúdió és építészeti díszüveg",
    description: "Tiffany lámpák, ólomüveg ablakok, építészeti díszüveg készítése",
};

export default function RootLayout({children}) {
    return (
        <html lang="hu" className="dark bg-[#111111]">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            <link href="https://fonts.googleapis.com/css2?family=Allura&display=swap" rel="stylesheet"/>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
                rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Antonio:wght@100..700&display=swap" rel="stylesheet"/>
            <title>Magnólia Tiffanystúdió és építészeti díszüveg</title>
            <link rel="icon" href="/design/favicon-256.ico"/>
        </head>
        <body className="min-h-screen bg-[#111111] inter-description">
            <Providers>
                <Suspense>
                    {children}
                    <Footer />
                    <Analytics />
                </Suspense>
            </Providers>
        </body>
        </html>
    );
}
