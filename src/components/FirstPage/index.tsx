import React, { useState, useEffect } from "react";
import useFirstPage from "./hook";

export default function FirstPage() {
  const { Styled } = useFirstPage();
  const [loadStatus, setLoadStatus] = useState(false);  
  useEffect(() => {
    setTimeout(() => setLoadStatus(true), 3000);
  }, []);
  return (
    <>
      {!loadStatus && (
        <Styled.Layout>
          <Styled.H>H</Styled.H>
          ello
        </Styled.Layout>
      )}
    </>
  );
}
