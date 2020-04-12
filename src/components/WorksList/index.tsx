import React from "react";
import { RightOutlined } from "@ant-design/icons";
import { routerList } from "../../constant";
import { useHistory } from "react-router-dom";
import "./style.less";

export default function WorksList() {
  const { push } = useHistory();

  return (
    <div className="WorksList">
      {routerList.map((item) => {
        return (
          <div className="Item" key={item.name} onClick={() => push(item.path)}>
            <span>{item.name}</span>
            <RightOutlined className="icon" />
          </div>
        );
      })}
    </div>
  );
}
