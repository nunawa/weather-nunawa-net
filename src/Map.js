import React from 'react';
import { MapContainer, TileLayer, Popup, Circle } from 'react-leaflet'
import './Map.css';
import Data from './ave_wbgt.json'
import chroma from "chroma-js";

// npm start

const Circles = () => {
    let wbgtList = [];

    for (const iter of Data) {
        const aveWbgt = (Number(iter["4"]) + Number(iter["5"]) + Number(iter["6"]) + Number(iter["7"]) + Number(iter["8"]) + Number(iter["9"]) + Number(iter["10"])) / 7;
        wbgtList.push(aveWbgt)
    }

    const limits = chroma.limits(wbgtList, "e", 6);
    const pallet = chroma.scale(["lightskyblue", "yellow", "salmon", "crimson", "darkmagenta"]).mode("hsl").colors(7);

    console.log(wbgtList);
    console.log(pallet);

    let compoList = [];

    for (let i = 0; i < Data.length; i++) {
        const lat = Number(Data[i]["lat"]);
        const lon = Number(Data[i]["lon"]);
        const name = Data[i]["name"];
        const wbgt = wbgtList[i];
        
        let circleColor = "#FFFFF";
        if (wbgt < limits[0]) {
            circleColor = pallet[0];
            
        } else if (limits[0] <= wbgt && wbgt < limits[1]){
            circleColor = pallet[1];

        } else if (limits[1] <= wbgt && wbgt< limits[2]) {
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

        console.log(circleColor);

        compoList.push(
            <Circle center={[lat, lon]} radius={3000} color={circleColor}>
                <Popup>
                    {name}<br/>
                    {String(Math.round(wbgt * 100)/100)}
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
    <MapContainer center={[35.68944, 139.69167]} zoom={9}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circles></Circles>
    </MapContainer>
  )
};