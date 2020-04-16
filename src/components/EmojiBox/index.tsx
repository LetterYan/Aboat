import React from "react";
import { Tabs } from "antd";
import { browser } from "noahsark";
import { emojis } from "utils";
import "./style.less";
const { TabPane } = Tabs;

const defaultProps = {
  callback: () => {},
};

export default function EmojiBox(props: any = defaultProps) {
  const { callback } = props;

  return (
    <Tabs tabPosition="bottom" animated={false}>
      {emojis.map((emoji: any, i: number) => (
        <TabPane tab={emoji.title} key={String(i)}>
          <div className={`EmojiWrapper ${browser.mobile && "EmojiMobile"}`}>
            {emoji.icons.map((item: any) => {
              return (
                <div
                  key={item.name}
                  className="emojiBox"
                  onClick={() => callback(item)}
                >
                  <img className="emoji" src={item.path} alt={item.name} />
                </div>
              );
            })}
          </div>
        </TabPane>
      ))}
    </Tabs>
  );
}
