import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { routerList } from "constant";
import style from "./style.module.less";

export default function Header() {
  const history = useHistory();
  const current = routerList.find(
    (item) => item.path === history.location.pathname
  );

  return (
    <div className={style.Header}>
      <div className={style.TitleBox}>
        <span className={style.Title}>{current?.title}</span>
        <span className={style.Home} onClick={() => history.push("/")}>
          <HomeOutlined />
        </span>
      </div>
    </div>
  );
}
