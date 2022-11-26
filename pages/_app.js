import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>全国の暑さ指数一覧</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
