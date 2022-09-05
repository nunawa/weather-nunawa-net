import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import './Map.css';
import Data from './amedastable.json'

// npm start

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
  return (
    <MapContainer center={[35.68944,139.69167]} zoom={9} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circles></Circles>
    </MapContainer>
  )
};