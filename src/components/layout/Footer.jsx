import { Layout } from "antd";
import { Link } from "react-router-dom";

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
  height: 60,
};

export default function Footer() {
  return (
    <Layout.Footer style={footerStyle}>
      <nav>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            columnGap: "10px",
            listStyle: "none",
          }}
        >
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/about">О проекте</Link>
          </li>
          <li>
            <Link to="https://github.com/RomaAbarov" target="_blank">
              GitHub
            </Link>
          </li>
        </ul>
      </nav>
    </Layout.Footer>
  );
}
