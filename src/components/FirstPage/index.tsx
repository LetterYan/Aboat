import React, { useState, useEffect } from "react";
import style from "./style.module.less";

export default function FirstPage() {
  const [loadStatus, setLoadStatus] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoadStatus(true), 3000);
  }, []);

  const randomColor = () =>
    "#" +
    ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6);

  const linear = `linear-gradient(to right, ${randomColor()}, ${randomColor()}) `;

  return (
    <>
      {!loadStatus && (
        <div className={style.Layout}>
          <div
            className={style.Context}
            style={{
              background: linear,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            Hello
          </div>
        </div>
      )}
    </>
  );
}
