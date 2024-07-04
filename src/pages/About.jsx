import { Layout, Divider, Typography } from "antd";

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 60,
  backgroundColor: "#4096ff",
};

const contentStyle = {
  textAlign: "center",
  color: "#fff ",
  height: "calc(100vh - 60px *2)",
};

export default function About() {
  return (
    <>
      <Layout.Header style={headerStyle}>
        <h1>О проекте</h1>
      </Layout.Header>
      <Layout>
        <Layout.Content style={contentStyle}>
          <Divider orientation="left">Описание</Divider>
          <Typography.Text>
            При загрузке сайта, делается запрос на получение данных о текущем
            курсе криптовалюты. Текущий портфель отображается в таблице. В
            боковом меню отображается информация сколько мы заработали на
            текущее время (разница за сколько покупали с текущей стоимостью). В
            модальном окне отображается информация о конкретной криптовалюте.
            Можно довавить данные о покупке криптовалюты по кнопке add asset.
          </Typography.Text>
          <Divider orientation="left">Технологии</Divider>
          <Typography.Paragraph>
            Технологии в проекте : Vite, React, React Router, JavaScript, HTML5
            , CSS3.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Для создания frontend части использовалась библиотека ant design,
            react-chartjs-2.
          </Typography.Paragraph>
        </Layout.Content>
      </Layout>
    </>
  );
}
