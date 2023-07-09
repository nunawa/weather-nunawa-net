import React from "react";
import { Navbars } from "../components/Navbars";
import { Col, Container, Row, Table } from "react-bootstrap";
import { MongoClient } from "mongodb";
import { CommonHead } from "../components/CommonHead";
import Link from "next/link";

export default function Home({
  wbgtAsc,
  wbgtDesc,
  tempAsc,
  tempDesc,
  rainfallAsc,
  rainfallDesc,
}) {
  const RankingTable = ({ children, type }) => {
    const tr = children.map(({ id, pref, name, ave }, i) => {
      return (
        <tr key={i}>
          <th className="fw-normal">{i + 1}</th>
          <th className="fw-normal">{pref}</th>
          <th className="fw-normal">
            <Link href={"/data/" + id}>{name}</Link>
          </th>
          <th className="fw-normal">{ave}</th>
        </tr>
      );
    });

    return (
      <Table striped bordered hover className="text-start">
        <thead>
          <tr>
            <th className="fw-normal">順位</th>
            <th className="fw-normal">地域</th>
            <th className="fw-normal">地点名</th>
            <th className="fw-normal">{type}</th>
          </tr>
        </thead>
        <tbody>{tr}</tbody>
      </Table>
    );
  };

  return (
    <div className="Home">
      <CommonHead title="全国の暑さ指数一覧" />
      <Navbars />

      <Container className="mt-4">
        <h5>
          全国の暑さ指数 年間平均値
          <br />
          TOP5
        </h5>
        （2017～2021年平均）
        <br />
        <Row>
          <Col
            lg
            className="mx-auto me-xl-1 me-xxl-1"
            style={{ maxWidth: "500px" }}
          >
            <h6>高い順</h6>
            <RankingTable type="暑さ指数（℃）">{wbgtDesc}</RankingTable>
          </Col>
          <Col
            lg
            className="mx-auto ms-xl-1 ms-xxl-1"
            style={{ maxWidth: "500px" }}
          >
            <h6>低い順</h6>
            <RankingTable type="暑さ指数（℃）">{wbgtAsc}</RankingTable>
          </Col>
        </Row>
        <Link href="/wbgt">もっと見る</Link>
      </Container>

      <Container className="mt-5">
        <h5>
          全国の年平均気温 <br />
          TOP5
        </h5>
        （1991～2020年平年値）
        <br />
        <Row>
          <Col
            lg
            className="mx-auto me-xl-1 me-xxl-1"
            style={{ maxWidth: "500px" }}
          >
            <h6>高い順</h6>
            <RankingTable type="気温（℃）">{tempDesc}</RankingTable>
          </Col>
          <Col
            lg
            className="mx-auto ms-xl-1 ms-xxl-1"
            style={{ maxWidth: "500px" }}
          >
            <h6>低い順</h6>
            <RankingTable type="気温（℃）">{tempAsc}</RankingTable>
          </Col>
        </Row>
        <Link href="/temperature">もっと見る</Link>
      </Container>

      <Container className="mt-5">
        <h5>
          全国の年降水量 <br />
          TOP5
        </h5>
        （1991～2020年平年値）
        <br />
        <Row>
          <Col
            lg
            className="mx-auto me-xl-1 me-xxl-1"
            style={{ maxWidth: "500px" }}
          >
            <h6>高い順</h6>
            <RankingTable type="降水量（mm）">{rainfallDesc}</RankingTable>
          </Col>
          <Col
            lg
            className="mx-auto ms-xl-1 ms-xxl-1"
            style={{ maxWidth: "500px" }}
          >
            <h6>低い順</h6>
            <RankingTable type="降水量（mm）">{rainfallAsc}</RankingTable>
          </Col>
        </Row>
        <Link href="/rainfall">もっと見る</Link>
      </Container>

      <Container className="mt-5 mb-3">
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
    const wbgtAsc = await client
      .db("weather")
      .collection("wbgt")
      .find(
        {},
        {
          projection: {
            _id: 0,
            id: 1,
            pref: 1,
            name: 1,
            ave: 1,
          },
        },
      )
      .sort({ ave: 1 })
      .limit(5)
      .toArray();

    const wbgtDesc = await client
      .db("weather")
      .collection("wbgt")
      .find(
        {},
        {
          projection: {
            _id: 0,
            id: 1,
            pref: 1,
            name: 1,
            ave: 1,
          },
        },
      )
      .sort({ ave: -1 })
      .limit(5)
      .toArray();

    const tempAsc = await client
      .db("weather")
      .collection("amedas")
      .find(
        { "yearly.temp": { $ne: null }, id: { $ne: "50066" } },
        {
          projection: {
            _id: 0,
            id: 1,
            pref: 1,
            name: 1,
            yearly: { temp: 1 },
          },
        },
      )
      .sort({ "yearly.temp": 1 })
      .limit(5)
      .toArray();

    const tempDesc = await client
      .db("weather")
      .collection("amedas")
      .find(
        { "yearly.temp": { $ne: null }, id: { $ne: "50066" } },
        {
          projection: {
            _id: 0,
            id: 1,
            pref: 1,
            name: 1,
            yearly: { temp: 1 },
          },
        },
      )
      .sort({ "yearly.temp": -1 })
      .limit(5)
      .toArray();

    const rainfallAsc = await client
      .db("weather")
      .collection("amedas")
      .find(
        { "yearly.rainfall": { $ne: null } },
        {
          projection: {
            _id: 0,
            id: 1,
            pref: 1,
            name: 1,
            yearly: { rainfall: 1 },
          },
        },
      )
      .sort({ "yearly.rainfall": 1 })
      .limit(5)
      .toArray();

    const rainfallDesc = await client
      .db("weather")
      .collection("amedas")
      .find(
        { "yearly.rainfall": { $ne: null } },
        {
          projection: {
            _id: 0,
            id: 1,
            pref: 1,
            name: 1,
            yearly: { rainfall: 1 },
          },
        },
      )
      .sort({ "yearly.rainfall": -1 })
      .limit(5)
      .toArray();

    client.close();

    tempAsc.map((elem) => {
      elem.ave = elem.yearly.temp;
      delete elem.yearly;
    });

    tempDesc.map((elem) => {
      elem.ave = elem.yearly.temp;
      delete elem.yearly;
    });

    rainfallAsc.map((elem) => {
      elem.ave = elem.yearly.rainfall;
      delete elem.yearly;
    });

    rainfallDesc.map((elem) => {
      elem.ave = elem.yearly.rainfall;
      delete elem.yearly;
    });

    return {
      props: {
        wbgtAsc,
        wbgtDesc,
        tempAsc,
        tempDesc,
        rainfallAsc,
        rainfallDesc,
      },
    };
  } catch (err) {
    console.log(err);
  }
}
