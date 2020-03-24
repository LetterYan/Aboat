import React from "react";
import useFirstPage from "./hook";

export default function FirstPage() {
  const { Styled } = useFirstPage();
  return <Styled.Layout>
    <Styled.H>H</Styled.H>
    ello
    </Styled.Layout>;
}
