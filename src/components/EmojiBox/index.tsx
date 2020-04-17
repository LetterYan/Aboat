import React from "react";
import { Tabs } from "antd";
import { browser } from "noahsark";
import { emojis } from "utils";
import "./style.less";
const { TabPane } = Tabs;

interface defaultProps {
  callback: Function;
}

const defaultProps = {
  callback: () => {},
};

export default function EmojiBox(props: defaultProps = defaultProps) {
  const { callback } = props;

  return (
    <Tabs tabPosition="bottom" animated={false}>
      {emojis.map(
        (
          emoji: {
            title: string;
            icons: {
              name: string;
              path: string;
            }[];
          },
          i: number
        ) => (
          <TabPane tab={emoji.title} key={String(i)}>
            <div className={`EmojiWrapper ${browser.mobile && "EmojiMobile"}`}>
              {emoji.icons.map((item: { name: string; path: string }) => {
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
        )
      )}
    </Tabs>
  );
}
