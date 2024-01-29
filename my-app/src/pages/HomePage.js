import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Menu from "../components/SelectDiet/Menu";
import axios from "axios";
import Content from "../components/SelectDiet/Content";
import { Button, Typography } from "antd";
import styled from "styled-components";
import { message, Card } from "antd";
import UserInfo from "../components/UserInfo";
import userMock from "../mocks/profile";
import dietsMock from "../mocks/diets";

const HomePage = () => {
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  const [stats, setStats] = useState("");
  const [diets, setDiets] = useState(dietsMock);

  React.useEffect(() => {}, []);

  const [messageApi, contextHolder] = message.useMessage();

  let { id, age, height, weight, cal } = userMock;

  const [info, setInfo] = useState(userMock);

  useEffect(() => {
    const user_id = id;
    axios
      .post("http://localhost:3001/auth/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: user_id,
      })
      .then((res) => {
        setInfo(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  cal = 10 * info.weight + 6.25 * info.height - 5 * info.age + 5;

  useEffect(() => {
    axios.get("http://localhost:3001/diets").then((res) => {
      setDiets(res.data);
    });
    updateStats();
  }, []);

  function updateStats() {
    axios
      .get(`http://localhost:3001/stats/${id}`)
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        setStats("");
      })
  }

  function deleteDiet() {
    fetch(`http://localhost:3001/stats/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        messageApi.open({ type: "success", content: data });
        setStats("");
      })
      .catch(() => {
        messageApi.open({ type: "error", content: "Ошибка сервера" });
      });
  }

  return (
    <div>
      {contextHolder}
      <UserInfo jwtInfo={userMock} />
      <h1>
        Привет, {userMock.name ? userMock.name : "Незнакомец"}!
      </h1>
      <Card
        title={`Ваш базовый метаболизм (основной обмен): ${cal} ккал/сутки`}
        bordered={false}
        style={{ width: "800px" }}
      >
        <Def>
          * это калории, которые сжигаются, когда вы находитесь в покое, и
          энергия тратится на обеспечение процессов дыхания, кровообращения,
          поддержание температуры тела и т.д.
        </Def>
      </Card>
      {stats[0] ? (
        <div>
          <h2>Твой рацион: {stats[0].diet_id.type}</h2>
          <Content
            delDiet={deleteDiet}
            id={stats[0].diet_id.diet_id - 1}
            diets={diets}
          />
        </div>
      ) : (
        <div>
          <h2>Выбери рацион:</h2>
          <Menu updateStats={updateStats} diets={diets} />
        </div>
      )}
    </div>
  );
};

const Def = styled.div`
  margin-top: -15px;
  width: 600px;
`;

export default HomePage;
