import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Apple Touch Icons */}
                <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />

                {/* Standard Favicons */}
                <link rel="icon" type="image/x-icon" href="/favicons/favicon.ico" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-icon-192x192.png" />

                {/* Web App Manifest */}
                <link rel="manifest" href="/favicons/manifest.json" />

                {/* MS / Windows tiles */}
                <meta name="msapplication-TileColor" content="#0a0a0f" />
                <meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png" />

                {/* Theme */}
                <meta name="theme-color" content="#0a0a0f" />
                <meta name="color-scheme" content="dark" />

                {/* Google Fonts preconnect */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}