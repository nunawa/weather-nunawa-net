import React from "react";
import Container from "react-bootstrap/Container";
import { Navbars } from "../../components/Navbars";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  ReferenceArea,
  Label,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { MongoClient } from "mongodb";

const WbgtChart = (wbgt) => {
  let returnComponent = <></>;

  if (wbgt.children != null) {
    returnComponent = (
      <Container className="px-4 mt-3">
        {wbgt.children.pref} {wbgt.children.name}
        <br />
        毎日の暑さ指数 最高値・最低値の推移
        <br />
        （2017～2021年平均）
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={wbgt.children.max_min} margin={{ left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis width={30} />
            <Tooltip />
            <Line type="monotone" dataKey="max" stroke="crimson" dot={false} />
            <Line type="monotone" dataKey="min" stroke="darkblue" dot={false} />
            <ReferenceArea
              y2={21}
              label={<Label fill="#6c757d">ほぼ安全</Label>}
              fill="#218cff"
              fillOpacity={0.15}
            />
            <ReferenceArea
              y1={21}
              y2={25}
              label={<Label fill="#6c757d">注意</Label>}
              fill="#a0d2ff"
              fillOpacity={0.15}
            />
            <ReferenceArea
              y1={25}
              y2={28}
              label={<Label fill="#6c757d">警戒</Label>}
              fill="#faf500"
              fillOpacity={0.15}
            />
            <ReferenceArea
              y1={28}
              y2={31}
              label={<Label fill="#6c757d">厳重警戒</Label>}
              fill="#ff9600"
              fillOpacity={0.15}
            />
            <ReferenceArea
              y1={31}
              label={<Label fill="#6c757d">危険</Label>}
              fill="#ff2800"
              fillOpacity={0.15}
            />
          </LineChart>
        </ResponsiveContainer>
      </Container>
    );
  }

  return returnComponent;
};

const AmedasChart = (amedas) => {
  let returnComponent = [];

  if (amedas.children.yearly.temp != null) {
    const tempChart = (
      <Container className="px-4 mt-3" key="temp">
        {amedas.children.pref} {amedas.children.name}
        <br />
        毎日の最高気温・最低気温の推移
        <br />
        （1991～2020年平年値）
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={amedas.children.daily} margin={{ left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis width={35} />
            <Tooltip />
            <Line type="monotone" dataKey="max" stroke="crimson" dot={false} />
            <Line type="monotone" dataKey="min" stroke="darkblue" dot={false} />
            <ReferenceArea
              y2={24}
              label={<Label fill="#6c757d">ほぼ安全</Label>}
              fill="#218cff"
              fillOpacity={0.15}
            />
            <ReferenceArea
              y1={24}
              y2={28}
              label={<Label fill="#6c757d">注意</Label>}
              fill="#a0d2ff"
              fillOpacity={0.15}
            />
            <ReferenceArea
              y1={28}
              y2={31}
              label={<Label fill="#6c757d">警戒</Label>}
              fill="#faf500"
              fillOpacity={0.15}
            />
            <ReferenceArea
              y1={31}
              y2={35}
              label={<Label fill="#6c757d">厳重警戒</Label>}
              fill="#ff9600"
              fillOpacity={0.15}
            />
            <ReferenceArea
              y1={35}
              label={<Label fill="#6c757d">危険</Label>}
              fill="#ff2800"
              fillOpacity={0.15}
            />
          </LineChart>
        </ResponsiveContainer>
      </Container>
    );

    returnComponent.push(tempChart);
  }

  if (amedas.children.yearly.rainfall != null) {
    const rainfallChart = (
      <Container className="px-4 mt-3" key="rainfall">
        {amedas.children.pref} {amedas.children.name}
        <br />
        毎月の降水量の推移
        <br />
        （1991～2020年平年値）
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={amedas.children.monthly} margin={{ left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis width={45} />
            <Tooltip />
            <Bar dataKey="rainfall" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Container>
    );

    returnComponent.push(rainfallChart);
  }

  return returnComponent;
};

export const Data = ({ wbgt, amedas }) => {
  return (
    <>
      <Navbars />
      <WbgtChart>{wbgt}</WbgtChart>
      <AmedasChart>{amedas}</AmedasChart>
      <Container className="my-3">
        &copy; <a href="https://github.com/nunawa">Nunawa</a>
      </Container>
    </>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(process.env.CONNECTIONSTRING, {
    useUnifiedTopology: true,
  });

  try {
    const wbgt = await client
      .db("weather")
      .collection("wbgt")
      .find({}, { projection: { _id: 0, id: 1 } })
      .toArray();

    const amedas = await client
      .db("weather")
      .collection("amedas")
      .find(
        {
          $or: [
            { "yearly.rainfall": { $ne: null } },
            { "yearly.temp": { $ne: null } },
          ],
          id: { $ne: "50066" },
        },
        { projection: { _id: 0, id: 1 } }
      )
      .toArray();
    client.close();

    const ids = Object.assign(wbgt, amedas);

    const pathArray = ids.map((elem) => ({
      params: elem,
    }));

    return {
      paths: pathArray,
      fallback: false,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const client = await MongoClient.connect(process.env.CONNECTIONSTRING, {
    useUnifiedTopology: true,
  });

  try {
    const wbgt = await client
      .db("weather")
      .collection("wbgt")
      .findOne(
        { id: id },
        { projection: { _id: 0, pref: 1, name: 1, max_min: 1 } }
      );
    const amedas = await client
      .db("weather")
      .collection("amedas")
      .findOne(
        { id: id },
        {
          projection: {
            _id: 0,
            pref: 1,
            name: 1,
            daily: 1,
            monthly: 1,
            yearly: { temp: 1, rainfall: 1 },
          },
        }
      );
    client.close();

    return {
      props: { wbgt, amedas },
    };
  } catch (error) {
    console.log(error);
  }
};

export default Data;
