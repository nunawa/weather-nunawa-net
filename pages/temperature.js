import { MongoClient } from "mongodb";
import dynamic from "next/dynamic";
import Container from "react-bootstrap/Container";
import { Navbars } from "../components/Navbars";
import { CommonHead } from "../components/CommonHead";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Temperature({ temp }) {
  return (
    <>
      <CommonHead title="年平均気温の一覧 - 全国の暑さ指数一覧" />
      <Navbars />

      <Container className="w-75 mt-4">
        全国の年平均気温
        <br />
        （1991～2020年平年値）
        <div className="text-muted">
          各マーカーをクリックし、リンクからそれぞれの地点の詳細データが閲覧できます。
        </div>
      </Container>
      <Container className="px-4">
        <Map>{temp}</Map>
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
    const temp = await client
      .db("weather")
      .collection("amedas")
      .find(
        { "yearly.temp": { $ne: null }, id: { $ne: "50066" } },
        {
          projection: {
            _id: 0,
            id: 1,
            name: 1,
            lat: 1,
            lon: 1,
            yearly: { temp: 1 },
          },
        },
      )
      .toArray();

    client.close();

    temp.map((elem) => {
      elem.ave = elem.yearly.temp;
      delete elem.yearly;
    });

    return {
      props: { temp },
    };
  } catch (err) {
    console.log(err);
  }
}
