import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import MenuSlider from "../HomeSliders/MenuSlider";
import DishSlider from "../HomeSliders/DishSlider";
import ProgressiveImage from "react-progressive-graceful-image";
import { Button, Spin, Table, Tag } from "antd";
import jwtDecode from "jwt-decode";

const Content = ({ delDiet, updateStats, id, diets }) => {
  const [status, setStatus] = useState("");

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

  async function setStats() {
    const user_id = jwtDecode(window.localStorage.getItem("token")).id;
    const diet_id = id + 1;
    await fetch("http://localhost:3001/stats", {
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
    updateStats();
  }

  return (
    diets && (
      <div>
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
            {!delDiet ? (
              <SButton onClick={setStats} type="primary" size="large">
                Выбрать
              </SButton>
            ) : (
              <SButton onClick={delDiet} type="primary" size="large">
                Завершить рацион
              </SButton>
            )}
          </Info>
        </div>
      </div>
    )
  );
};

const Hide = styled.div`
  animation: cssAnimation 0s 0.7s forwards;
  visibility: hidden;

  @keyframes cssAnimation {
    to {
      visibility: visible;
    }
  }
`;

const SSpin = styled(Spin)`
  margin-top: 120px;
  margin-left: -100px;
  animation: spinAnimation 0s 0.5s forwards;
  visibility: visible;

  @keyframes spinAnimation {
    to {
      visibility: hidden;
    }
  }
`;

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
  margin-top: -220px;
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
