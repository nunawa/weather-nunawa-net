import React from 'react';
import Container from 'react-bootstrap/Container';
import { Navbars } from "./Navbars";
import { useSearchParams } from "react-router-dom";
import WbgtData from "./5y_wbgt.json";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, ReferenceArea, Label } from "recharts"

export const Data = () => {
    const [param] = useSearchParams();
    const id = param.get("q");

    return (
    <>
        <Navbars/>
        <Container className='w-80 mt-3'>
            {WbgtData[id]["pref"]} {WbgtData[id]["name"]}<br/>
            毎日の最高値・最低値の推移<br/>
            （2017～2021年平均）
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={WbgtData[id]["max_min"]}
                    margin={{ left: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis width={30}/>
                    <Tooltip />
                    <Line type="monotone" dataKey="max" stroke="crimson" dot={false} />
                    <Line type="monotone" dataKey="min" stroke="darkblue" dot={false} />
                    <ReferenceArea
                        x1="4/1"
                        x2="10/30"
                        y2={21}
                        label={<Label fill="#6c757d">ほぼ安全</Label>}
                        fill="#218cff"
                        fillOpacity={0.15}
                    />
                    <ReferenceArea
                        x1="4/1"
                        x2="10/30"
                        y1={21}
                        y2={25}
                        label={<Label fill="#6c757d">注意</Label>}
                        fill="#a0d2ff"
                        fillOpacity={0.15}
                    />
                    <ReferenceArea
                        x1="4/1"
                        x2="10/30"
                        y1={25}
                        y2={28}
                        label={<Label fill="#6c757d">警戒</Label>}
                        fill="#faf500"
                        fillOpacity={0.15}
                    />
                    <ReferenceArea
                        x1="4/1"
                        x2="10/30"
                        y1={28}
                        y2={31} 
                        label={<Label fill="#6c757d">厳重警戒</Label>}
                        fill="#ff9600"
                        fillOpacity={0.15}
                    />
                    <ReferenceArea
                        x1="4/1"
                        x2="10/30"
                        y1={31}
                        label={<Label fill="#6c757d">危険</Label>}
                        fill="#ff2800"
                        fillOpacity={0.15}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Container>
        <Container bg="gray-500" className='w-80 mt-5'>
            &copy; <a href='https://github.com/nunawa'>Nunawa</a>
        </Container>
    </>
    )
}