import React from "react";
import { Navbars } from "../components/Navbars";
import { Container } from "react-bootstrap";
import { MongoClient } from "mongodb";
import dynamic from "next/dynamic";
import { DeckGL } from "deck.gl";
import { ColumnLayer, BitmapLayer } from "@deck.gl/layers";
import { TileLayer } from "@deck.gl/geo-layers";
import { CommonHead } from "../components/CommonHead";
const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home({ wbgt, temp, rainfall }) {
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
    <div className="Home">
      <CommonHead title="全国の暑さ指数一覧" />
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
    const wbgt = await client
      .db("weather")
      .collection("wbgt")
      .find(
        {},
        { projection: { _id: 0, id: 1, name: 1, lat: 1, lon: 1, ave: 1 } }
      )
      .toArray();

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
        }
      )
      .toArray();

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

    temp.map((elem) => {
      elem.ave = elem.yearly.temp;
      delete elem.yearly;
    });

    rainfall.map((elem) => {
      elem.ave = elem.yearly.rainfall;
      delete elem.yearly;
    });

    return {
      props: { wbgt, temp, rainfall },
    };
  } catch (err) {
    console.log(err);
  }
}
