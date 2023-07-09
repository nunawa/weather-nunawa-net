import { TileLayer } from "@deck.gl/geo-layers";
import { BitmapLayer, ColumnLayer } from "@deck.gl/layers";
import { DeckGL } from "deck.gl";
import React from "react";

export const Map3d = ({ data }) => {
  const layer = new ColumnLayer({
    data: data,
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
      getTooltip={({ object }) => object && `${object.name}\n ${object.ave}mm`}
      controller={{ touchRotate: true }}
    />
  );
};

export default Map3d;
