import Container from "react-bootstrap/Container";
import { Navbars } from "../components/Navbars";

export const About = () => {
  return (
    <>
      <Navbars />
      <Container className="w-75 mt-4">
        全国約800地点の暑さ指数（WBGT）の統計を閲覧できます。
        <br />
        暑さ指数のデータは
        <a href="https://www.wbgt.env.go.jp/">環境省熱中症予防情報サイト</a>
        より加工して作成しました。
        <br />
        また、気温と降水量のデータは
        <a href="https://www.data.jma.go.jp/obd/stats/data/mdrr/normal/index.html">
          気象庁 2020年平年値
        </a>
        より加工して作成しました。
      </Container>
      <Container className="w-75 mt-5">
        <b>アクセス解析ツールについて</b>
        <br />
        <p className="text-start">
          当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
          Googleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。
          <br />
          トラフィックデータは匿名で収集されており、個人を特定するものではありません。
        </p>
      </Container>
      <Container className="w-75 mt-3">
        <b>免責事項</b>
        <br />
        <p className="text-start">
          当サイトからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。
          <br />
          また当サイトのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。
          情報が古くなっていることもございます。
          <br />
          当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
        </p>
      </Container>
      <Container className="mt-5 mb-3">
        &copy; <a href="https://github.com/nunawa">Nunawa</a>
      </Container>
    </>
  );
};

export default About;
