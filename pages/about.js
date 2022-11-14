import Container from "react-bootstrap/Container";
import { Navbars } from "../components/Navbars";

export const About = () => {
  return (
    <>
      <Navbars />
      <Container className="w-80 mt-3">
        全国約800地点の暑さ指数（WBGT）の統計を閲覧できます。
        <br />
        暑さ指数のデータは
        <a href="https://www.wbgt.env.go.jp/">環境省熱中症予防情報サイト</a>
        より加工して作成しました。
      </Container>
      <Container bg="gray-500" className="w-80 mt-5">
        &copy; <a href="https://github.com/nunawa">Nunawa</a>
      </Container>
    </>
  );
};

export default About;
