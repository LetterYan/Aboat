import React from "react";
import useHeader from "./hook";

export default function Header(props: any) {
  const { Styled } = useHeader();
  return (
    <Styled.Header>
      <Styled.Title>{props.title || "A boat"}</Styled.Title>
    </Styled.Header>
  );
}
