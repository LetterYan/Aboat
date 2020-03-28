import React from "react";
import useHeader from "./hook";
import { routerList } from "../../constant";

export default function Header() {
  const { Styled, routerPath } = useHeader();
  const current = routerList.find(item => item.path === routerPath);

  return (
    <Styled.Header>
      <Styled.Title>{current?.title || "A boat"}</Styled.Title>
    </Styled.Header>
  );
}
