import React from "react";
import useSider from "./hook";

export default function SideBar() {
  const { Styled } = useSider();

  return (
    <Styled.Sider>
      <Styled.MenuItem>A boat</Styled.MenuItem>
    </Styled.Sider>
  );
}
