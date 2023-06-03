import { MongoClient } from "mongodb";
import dynamic from "next/dynamic";
import Container from "react-bootstrap/Container";
import { Navbars } from "../components/Navbars";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Wbgt({ wbgt }) {
  return (
    <>
      <Navbars />

      <Container className="w-75 mt-4">
        全国の暑さ指数 年間平均値
        <br />
        （2017～2021年平均）
        <div className="text-muted">
          各マーカーをクリックし、リンクからそれぞれの地点の詳細データが閲覧できます。
        </div>
      </Container>
      <Container className="px-4">
        <Map>{wbgt}</Map>
      </Container>

      <Container className="mt-5 mb-3">
        &copy; <a href="https://github.com/nunawa">Nunawa</a>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.CONNECTIONSTRING, {
    useUnifiedTopology: true,
  });

  try {
    const wbgt = await client
      .db("weather")
      .collection("wbgt")
      .find(
        {},
        { projection: { _id: 0, id: 1, name: 1, lat: 1, lon: 1, ave: 1 } }
      )
      .toArray();

    client.close();

    return {
      props: { wbgt },
    };
  } catch (err) {
    console.log(err);
  }
}
