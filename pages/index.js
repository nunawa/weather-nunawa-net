import React from "react";
import { Navbars } from "../components/Navbars";
import { Container } from "react-bootstrap";
import { MongoClient } from "mongodb";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home({ data }) {
  return (
    <div className="Home">
      <Navbars />
      <Container className="w-75 mt-3">
        全国の年間平均値
        <br />
        （2017～2021年平均）
        <p className="text-muted">
          各マーカーをクリックし、リンクからそれぞれの地点の詳細データが閲覧できます。
        </p>
      </Container>
      <Container className="px-4 mt-3">
        <Map>{data}</Map>
      </Container>
      <Container className="my-3">
        &copy; <a href="https://github.com/nunawa">Nunawa</a>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.CONNECTIONSTRING, {
    useUnifiedTopology: true,
  });

  try {
    const data = await client
      .db("weather")
      .collection("wbgt")
      .find({}, { projection: { _id: 0, dist: 0, pref: 0, max_min: 0 } })
      .toArray();
    client.close();

    return {
      props: { data },
    };
  } catch (err) {
    console.log(err);
  }
}
