import { Layout, Typography } from "antd";
import { useContext } from "react";
import { ContextCrypto } from "../../context/context";
import PortfolioChart from "./PortfolioChart";
import AssetsTable from "./AssetsTable";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh-60px * 2)",
  color: "#fff",
  backgroundColor: "#001529",
};

export default function Content() {
  const { assets, crypto } = useContext(ContextCrypto);

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ color: "white", textAlign: "left" }}>
        Portfolio :
        {assets
          .map((asset) => {
            //let coin = crypto.find((c) => c.id === asset.id);
            return asset.amount * cryptoPriceMap[asset.id];
          })
          .reduce((sum, el) => sum + el, 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
}
