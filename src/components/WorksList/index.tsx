import React from "react";
import { RightOutlined } from "@ant-design/icons";
import { routerList } from "../../constant";
import { useHistory } from "react-router-dom";
import style from "./style.module.less";


export default function WorksList() {
  const { push } = useHistory();

  return (
    <div className={style.WorksList}>
      {routerList.map((item) => {
        return (
          <div className={style.Item} key={item.name} onClick={() => push(item.path)}>
            <span>{item.name}</span>
            <RightOutlined className={style.icon} />
          </div>
        );
      })}
    </div>
  );
}
