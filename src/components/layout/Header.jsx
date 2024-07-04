import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useContext, useEffect, useState } from "react";
import { ContextCrypto } from "../../context/context";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  textAlign: "center",
  height: 60,
};

export default function Header() {
  const { crypto } = useContext(ContextCrypto);
  const [select, setSelect] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coin, setCoin] = useState(null);
  useEffect(() => {
    const keyDown = (event) => {
      if (event.key === "/") setSelect((prev) => !prev);
    };
    document.addEventListener("keydown", keyDown);
    return () => document.removeEventListener("keydown", keyDown);
  }, []);
  const [openDrawer, setOpenDrawer] = useState(false);

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    setIsModalOpen(true);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: "250px",
        }}
        value="press / to open"
        onSelect={handleSelect}
        open={select}
        onClick={() => setSelect((prev) => !prev)}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img src={option.data.icon} alt={option.data.label} width="20px" />
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setOpenDrawer(true)}>
        Add asset
      </Button>

      <Drawer
        width="600px"
        title="Add asset"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setOpenDrawer(false)} />
      </Drawer>

      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin} />
      </Modal>
    </Layout.Header>
  );
}
