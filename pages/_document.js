import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          content="日本全国の暑さ指数データを可視化。地図やグラフで各地点の統計が閲覧できます。"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="nunawa7" />
        <meta property="og:url" content="https://weather.nunawa.net/" />
        <meta property="og:title" content="全国の暑さ指数一覧" />
        <meta
          property="og:description"
          content="日本全国の暑さ指数データを可視化。地図やグラフで各地点の統計が閲覧できます。"
        />
        <meta
          property="og:image"
          content="https://weather.nunawa.net/android-chrome-512x512.png"
        />
        <meta
          name="google-site-verification"
          content="07X984s8f0c8OR7SRbdmCCOTP49L3GzyoOBsxtwSLrM"
        />
        <meta
          name="google-site-verification"
          content="a9Jekfvar8guFfeGaF5pwCse4vlBtAoOBW5isIHAA4g"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
