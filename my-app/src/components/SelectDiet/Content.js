import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import MenuSlider from "../MenuSlider";
import DishSlider from "../DishSlider";
import ProgressiveImage from "react-progressive-graceful-image";
import { Button, Table, Tag } from "antd";
import jwtDecode from "jwt-decode";

const Content = ({ id, diets }) => {
  const data = [
    {
      key: id,
      calories: 1500,
      protein: 50,
      fats: 70,
      carbs: 100,
    },
  ];

  const columns = [
    {
      title: "Ккал",
      dataIndex: "calories",
      key: "calories",
      render: (tag) => {
        let color;
        if (tag < 2000) color = "green";
        else if ((tag = 2000)) color = "gold";
        else color = "red";

        return (
          <STag bordered={false} color={color}>
            {tag}
          </STag>
        );
      },
    },
    {
      title: "Б",
      dataIndex: "protein",
      key: "protein",
    },
    {
      title: "Ж",
      dataIndex: "fats",
      key: "fats",
    },
    {
      title: "У",
      dataIndex: "carbs",
      key: "carbs",
    },
  ];

  function setStats() {
    const user_id = jwtDecode(window.localStorage.getItem('token')).id
    const diet_id = id+1
    fetch("http://localhost:3001/stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, diet_id }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
      });
  }

  return (
    diets && (
      <div>
        {console.log(diets[id].day1_id)}
        <MenuSlider>
          <div>
            <Day>День 1</Day>
            <DishSlider>
              {Object.values(diets[id].day1_id).map((dish) => {
                return (
                  <Dish key={dish.dish_name}>
                    <Name>{dish.dish_name}</Name>
                    {dish.photo ? (
                      <StyledImg src={dish.photo} alt="new" />
                    ) : (
                      <StyledImg
                        src="https://drive.google.com/uc?export=view&id=1OyNn_HUo0Vz17MWhl7jM71_uLFIkgIcu"
                        alt="new"
                      />
                    )}
                  </Dish>
                );
              })}
            </DishSlider>
          </div>
          <div>
            <Day>День 2</Day>
            <DishSlider>
              {Object.values(diets[id].day2_id).map((dish) => {
                return (
                  <Dish key={dish.dish_name}>
                    <Name>{dish.dish_name}</Name>
                    {dish.photo ? (
                      <img src={dish.photo} alt="new" />
                    ) : (
                      <StyledImg
                        src="https://drive.google.com/uc?export=view&id=1OyNn_HUo0Vz17MWhl7jM71_uLFIkgIcu"
                        alt="new"
                      />
                    )}
                  </Dish>
                );
              })}
            </DishSlider>
          </div>
          <div>
            <Day>День 3</Day>
            <DishSlider>
              {Object.values(diets[id].day3_id).map((dish) => {
                return (
                  <Dish key={dish.dish_name}>
                    <Name>{dish.dish_name}</Name>
                    {dish.photo ? (
                      <img src={dish.photo} alt="new" />
                    ) : (
                      <StyledImg
                        src="https://drive.google.com/uc?export=view&id=1OyNn_HUo0Vz17MWhl7jM71_uLFIkgIcu"
                        alt="new"
                      />
                    )}
                  </Dish>
                );
              })}
            </DishSlider>
          </div>
        </MenuSlider>
        <Info className="info">
          <STable
            bordered
            pagination={false}
            dataSource={data}
            columns={columns}
          />
          <SButton onClick={setStats} type="primary" size="large">
            Выбрать
          </SButton>
        </Info>
      </div>
    )
  );
};

const StyledImg = styled.img`
  width: 300px;
`;

const Name = styled.div`
  font-size: 18px;
  margin-left: 20px;
`;

const Day = styled.div`
  font-size: 22px;
  margin-left: 200px;
`;

const Dish = styled.div`
  margin-left: -16px;
`;

const Info = styled.div`
  margin-left: 540px;
  margin-top: -240px;
`;

const STable = styled(Table)`
  max-width: 250px;
  padding-bottom: 60px;
`;

const STag = styled(Tag)`
  font-size: 15px;
`;

const SButton = styled(Button)``;

export default Content;
