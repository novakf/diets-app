import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Tabs } from "antd";
import Content from "./Content";

const Menu = () => {
    const [diets, setDiets] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3001/diets')
            .then(res => {
                setDiets(res.data)
            })
    }, [])



    return diets && (
        <Tabs
            type="card"
            items={
                new Array(diets.length).fill(null).map((_, id) => {
                    return {
                        label: `${diets[id].type}`,
                        key: id,
                        children: <Content id={id} diets={diets} />,
                    };
                })}
        />
    )
}

export default Menu