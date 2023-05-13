import { TileLayer } from "@deck.gl/geo-layers";
import { BitmapLayer, ColumnLayer } from "@deck.gl/layers";
import { DeckGL } from "deck.gl";
import { MongoClient } from "mongodb";
import Container from "react-bootstrap/Container";
import { Navbars } from "../components/Navbars";

export default function Rainfall({ rainfall }) {
  const layer = new ColumnLayer({
    data: rainfall,
    diskResolution: 12,
    radius: 5000,
    extruded: true,
    pickable: true,
    elevationScale: 20,
    getPosition: (d) => [d.lon, d.lat],
    getFillColor: (d) => [
      Math.floor(d.ave / 15),
      30,
      255 - Math.floor(d.ave / 15),
      255,
    ],
    getLineColor: [0, 0, 0],
    getElevation: (d) => d.ave,
  });

  const tile = new TileLayer({
    data: "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,

    renderSubLayers: (props) => {
      const {
        bbox: { west, south, east, north },
      } = props.tile;

      return new BitmapLayer(props, {
        data: null,
        image: props.data,
        bounds: [west, south, east, north],
      });
    },
  });

  return (
    <>
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
        <DeckGL
          style={{ position: "relative", height: "70vh" }}
          initialViewState={{
            longitude: 135,
            latitude: 35,
            zoom: 5,
            maxZoom: 19,
            pitch: 70,
            bearing: 20,
          }}
          layers={[tile, layer]}
          getTooltip={({ object }) =>
            object && `${object.name}\n ${object.ave}mm`
          }
          controller={{ touchRotate: true }}
        />
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
