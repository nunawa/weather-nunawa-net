import React from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  Circle,
  useMap,
  useMapEvent,
} from "react-leaflet";
import chroma from "chroma-js";
import Link from "next/link";

// npm start

const getCompoList = (data) => {
  const wbgtList = data.map((elem) => elem.ave);

  const limits = chroma.limits(wbgtList, "e", 6);
  const pallet = chroma
    .scale(["lightskyblue", "springgreen", "yellow", "salmon", "crimson"])
    .mode("lch")
    .colors(7);

  let compoList = [];

  for (const elem of data) {
    const id = elem.id;
    const lat = elem.lat;
    const lon = elem.lon;
    const name = elem.name;
    const wbgt = elem.ave;

    let circleColor = "#FFFFF";
    if (wbgt < limits[0]) {
      circleColor = pallet[0];
    } else if (limits[0] <= wbgt && wbgt < limits[1]) {
      circleColor = pallet[1];
    } else if (limits[1] <= wbgt && wbgt < limits[2]) {
      circleColor = pallet[2];
    } else if (limits[2] <= wbgt && wbgt < limits[3]) {
      circleColor = pallet[3];
    } else if (limits[3] <= wbgt && wbgt < limits[4]) {
      circleColor = pallet[4];
    } else if (limits[4] <= wbgt && wbgt < limits[5]) {
      circleColor = pallet[5];
    } else if (limits[5] <= wbgt) {
      circleColor = pallet[6];
    }

    compoList.push(
      <Circle center={[lat, lon]} radius={3000} color={circleColor} key={id}>
        <Popup>
          <Link href={"/data/" + id}>{name}</Link>
          <br />
          {String(wbgt)}
        </Popup>
      </Circle>
    );
  }

  return compoList;
};

const Circles = (props) => {
  const compoList = getCompoList(props.children.children);

  return <>{compoList}</>;
};

let coord = [37.45805555, 137.63361111];
let zoom = 5;

function WrapUseMap() {
  const map = useMap();
  useMapEvent("moveend", () => {
    coord = map.getCenter();
    zoom = map.getZoom();
  });

  return null;
}

export const Map = (props) => {
  return (
    <MapContainer center={coord} zoom={zoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circles>{props}</Circles>
      <WrapUseMap />
    </MapContainer>
  );
};

export default Map;
