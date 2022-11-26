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
} from "recharts";
import { MongoClient } from "mongodb";

export const Data = ({ data }) => {
  return (
    <>
      <Navbars />
      <Container className="px-4 mt-3">
        {data.pref} {data.name}
        <br />
        毎日の最高値・最低値の推移
        <br />
        （2017～2021年平均）
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data.max_min} margin={{ left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis width={30} />
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
    const ids = await client
      .db("weather")
      .collection("wbgt")
      .find({}, { projection: { _id: 0, id: 1 } })
      .toArray();
    client.close();

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
    const data = await client
      .db("weather")
      .collection("wbgt")
      .findOne({ id: id }, { projection: { _id: 0, dist: 0, ave: 0 } });
    client.close();

    return {
      props: { data },
    };
  } catch (error) {
    console.log(error);
  }
};

export default Data;
