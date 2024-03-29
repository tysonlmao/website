import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html className="pagecolor">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com"></link>

                <link href="https://fonts.googleapis.com/css2?family=Martian+Mono&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet"></link>
                <link rel="stylesheet" media="screen" href="https://fontlibrary.org//face/minecraftia" type="text/css"/>
                <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet"></link>


<link rel="preconnect" href="https://fonts.gstatic.com"></link>
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@700&display=swap" rel="stylesheet"></link>

                <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}></script>
                <script dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                });
                `
                }}>
                </script>
            </Head>
            <body className="fluid">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}