import React, { useMemo } from "react";
import { Tabs } from "antd";
import Content from "./Content";

const Menu = ({ updateStats, diets }) => {
  const items = useMemo(
    () =>
      new Array(diets.length).fill(null).map((_, id) => {
        let label = diets[id].type;
        return {
          label: label,
          key: id,
          children: <Content updateStats={updateStats} id={id} diets={diets} loading={loading} />,
        };
      }),
    [diets]
  );

  return (
    diets && (
      <Tabs
        type="card"
        destroyInactiveTabPane={true}
        items={items}
      />
    )
  );
};

export default Menu;
