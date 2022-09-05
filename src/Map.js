import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import './Map.css';
import Data from './amedastable.json'

const Circles = () => {
    let compoList = []

    for (const id in Data) {
        const lat = Data[id]["lat"][0] + (Data[id]["lat"][1] / 60);
        const lon = Data[id]["lon"][0] + (Data[id]["lon"][1] / 60);
        const name = Data[id]["enName"];

        compoList.push(
            <Circle center={[lat, lon]} radius={3000}>
                <Popup>
                    {name}
                </Popup>
            </Circle>
        )
    }

    return (
        <div>{compoList}</div>
    )
};

export const Map = () => {
  // 緯度軽度
  const position = [51.505, -0.09];
  // 初期マップズームレベル
  const zoom = 13;

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
        <Circle center={[51.505, -0.1]} radius={1000}>
            <Popup>
                Hi!!!!
            </Popup>
        </Circle>
        <Circles></Circles>
    </MapContainer>
  )
};