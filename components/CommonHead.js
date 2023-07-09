import React from "react";
import Head from "next/head";

export const CommonHead = ({ title = "全国の暑さ指数一覧" }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="日本全国の暑さ指数データを可視化。地図やグラフで各地点の統計が閲覧できます。"
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="nunawa7" />
      <meta property="og:url" content="https://weather.nunawa.net/" />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content="日本全国の暑さ指数データを可視化。地図やグラフで各地点の統計が閲覧できます。"
      />
      <meta
        property="og:image"
        content="https://weather.nunawa.net/android-chrome-512x512.png"
      />
    </Head>
  );
};

export default CommonHead;
