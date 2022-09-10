import React from 'react';
import { MapContainer, TileLayer, Popup, Circle, useMap, useMapEvent } from 'react-leaflet'
import './Map.css';
import Data from './5y_wbgt.json'
import chroma from "chroma-js";
import { Link } from "react-router-dom";

// npm start

const Circles = () => {
    let wbgtList = []
    for (const id in Data) {
        wbgtList.push(Data[id]["ave"])
    }

    const limits = chroma.limits(wbgtList, "e", 6);
    const pallet = chroma.scale(["lightskyblue", "springgreen", "yellow", "salmon", "crimson"])
                        .mode("lch").colors(7);

    //console.log(wbgtList);
    //console.log(pallet);

    let compoList = [];

    for (const id in Data) {
        const lat = Data[id]["lat"];
        const lon = Data[id]["lon"];
        const name = Data[id]["name"];
        const wbgt = Data[id]["ave"];
        
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

        compoList.push(
            <Circle center={[lat, lon]} radius={3000} color={circleColor}>
                <Popup>
                    <Link to={{
                        pathname: "/data",
                        search: "?q=" + id
                    }}>{name}</Link><br/>
                    {String(Math.round(wbgt * 100)/100)}
                </Popup>
            </Circle>
        )
    }

    return (
        <div>{compoList}</div>
    )
};

let coord = [37.45805555, 137.63361111];
let zoom = 5;

function WrapUseMap() {
    const map = useMap()
    useMapEvent("moveend", () => {
        coord = map.getCenter();
        zoom = map.getZoom();
    });

    return null
}

export const Map = () => {
    return (
        <MapContainer center={coord} zoom={zoom}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Circles></Circles>
            <WrapUseMap/>
        </MapContainer>
    );
};