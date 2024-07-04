import { Layout, Spin } from "antd";
import Header from "../components/layout/Header";
import Sider from "../components/layout/Sider";
import Content from "../components/layout/Content";
import React, { useContext } from "react";
import { ContextCrypto } from "../context/context";

export default function MyLayout() {
  const { loading } = useContext(ContextCrypto);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <>
      <Header />
      <Layout>
        <Sider />
        <Content />
      </Layout>
    </>
  );
}
