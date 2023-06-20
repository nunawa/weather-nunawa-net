import { MongoClient } from "mongodb";
import dynamic from "next/dynamic";
import Container from "react-bootstrap/Container";
import { CommonHead } from "../components/CommonHead";
import { Navbars } from "../components/Navbars";

const Map3d = dynamic(() => import("../components/Map3d"), { ssr: false });

export default function Rainfall({ rainfall }) {
  return (
    <>
      <CommonHead title="年降水量の一覧 - 全国の暑さ指数一覧" />
      <Navbars />

      <Container className="w-75 mt-4">
        全国の年降水量
        <br />
        （1991～2020年平年値）
        <div className="text-muted">
          Shift+ドラッグもしくはCtrl+ドラッグで回転できます。
        </div>
      </Container>
      <Container className="px-4">
        <Map3d data={rainfall} />
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
    const rainfall = await client
      .db("weather")
      .collection("amedas")
      .find(
        { "yearly.rainfall": { $ne: null } },
        {
          projection: {
            _id: 0,
            id: 1,
            name: 1,
            lat: 1,
            lon: 1,
            yearly: { rainfall: 1 },
          },
        }
      )
      .toArray();
    client.close();

    rainfall.map((elem) => {
      elem.ave = elem.yearly.rainfall;
      delete elem.yearly;
    });

    return {
      props: { rainfall },
    };
  } catch (err) {
    console.log(err);
  }
}
