import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";
import Content from "./Content";
import { CircularProgress } from "@mui/material";

const Menu = ({diets}) => {
  const [loading, setLoading] = useState(false);

  const loader = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  };

  return (
    diets && (
      <Tabs
        type="card"
        onTabClick={loader}
        items={new Array(diets.length).fill(null).map((_, id) => {
          return {
            label: `${diets[id].type}`,
            key: id,
            children: <Content id={id} diets={diets} loading={loading} />,
            forceRender: true,
          };
        })}
      />
    )
  );
};

export default Menu;
