import { Layout } from "antd";
import Footer from "./layout/Footer";
import { Outlet } from "react-router-dom";

export default function Cascade() {
  return (
    <Layout>
      <Outlet />
      <Footer />
    </Layout>
  );
}
