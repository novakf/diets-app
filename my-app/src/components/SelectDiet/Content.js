import React from "react";
import styled from "styled-components";
import MenuSlider from "../HomeSliders/MenuSlider";
import DishSlider from "../HomeSliders/DishSlider";
import { Button, Spin, Table, Tag } from "antd";
import jwtDecode from "jwt-decode";
import { message } from "antd";

const Content = ({ delDiet, updateStats, id, diets }) => {
  const [messageApi, contextHolder] = message.useMessage();

  let data = [];

  if (id === 0)
    data = [
      {
        key: id,
        calories: 2500,
        protein: 140,
        fats: 97,
        carbs: 267,
      },
    ];
  else if (id === 1)
    data = [{ key: id, calories: 2000, protein: 110, fats: 76, carbs: 216 }];
  else if (id === 2)
    data = [{ key: id, calories: 1500, protein: 97, fats: 63, carbs: 138 }];

  const columns = [
    {
      title: "Ккал",
      dataIndex: "calories",
      key: "calories",
      render: (tag) => {
        let color;
        if (tag < 2000) color = "green";
        else if (tag === 2000) color = "gold";
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

  return (
    diets && (
      <div>
        {contextHolder}
        <MenuSlider>
          <div>
            <Day>День 1</Day>
            <DishSlider>
              {Object.values(diets[id].day1_id).map((dish) => {
                return (
                  <Dish key={dish.dish_name}>
                    <Title>{dish.dish_name}</Title>
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
                    <Title>{dish.dish_name}</Title>
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
            <Day>День 3</Day>
            <DishSlider>
              {Object.values(diets[id].day3_id).map((dish) => {
                return (
                  <Dish key={dish.dish_name}>
                    <Title>{dish.dish_name}</Title>
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
        </MenuSlider>
        <Info classTitle="info">
          <STable
            bordered
            pagination={false}
            dataSource={data}
            columns={columns}
          />
          {!delDiet ? (
            <SButton
              onClick={() => {
                messageApi.open({ type: "error", content: "Ошибка сервера" });
              }}
              type="primary"
              size="large"
            >
              Выбрать
            </SButton>
          ) : (
            <SButton onClick={delDiet} type="primary" size="large">
              Завершить рацион
            </SButton>
          )}
        </Info>
      </div>
    )
  );
};

const StyledImg = styled.img`
  width: 300px;
`;

const Title = styled.div`
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
