import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { routerList } from "constant";
import "./style.less";

export default function Header() {
  const history = useHistory();
  const current = routerList.find(
    (item) => item.path === history.location.pathname
  );

  return (
    <div className="Header">
      <div className="TitleBox">
        <span className="Title">{current?.title}</span>
        <span className="Home" onClick={() => history.push("/")}>
          <HomeOutlined />
        </span>
      </div>
    </div>
  );
}
