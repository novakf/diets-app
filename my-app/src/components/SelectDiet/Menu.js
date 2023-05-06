import React from "react";
import { Tabs } from "antd";
import Content from "./Content";

const Menu = () => {
    return (
        <Tabs
            type="card"
            items={
                new Array(3).fill(null).map((_, i) => {
                    const id = String(i + 1);
                    return {
                        label: `Tab ${id}`,
                        key: id,
                        children: <Content id={id}/>,
                    };
                })}
        />
    )
}

export default Menu