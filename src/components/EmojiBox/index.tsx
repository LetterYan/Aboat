import React from "react";
import { browser } from "noahsark";
import { emojis } from "constant";
import "./style.less";

const defaultProps = {
  callback: () => {},
};

export default function EmojiBox(props: any = defaultProps) {
  const { callback } = props;

  const renderList = emojis;

  return (
    <div className={`EmojiWrapper ${browser.mobile && "EmojiMobile"}`}>
      {renderList.map((item) => {
        return (
          <div
            key={item.name}
            className="emojiBox"
            onClick={() => callback(item)}
          >
            <img
              className="emoji"
              src={item.path}
              alt={item.name}
              key={item.name}
            />
          </div>
        );
      })}
    </div>
  );
}
