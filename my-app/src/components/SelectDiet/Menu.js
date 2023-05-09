import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Tabs } from "antd";
import Content from "./Content";
import { CircularProgress } from "@mui/material";
import { Spin } from "antd";

const Menu = ({ updateStats, diets }) => {
  const [loading, setLoading] = useState(false);

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
  
  const loader = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 700);
    return;
  };

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
