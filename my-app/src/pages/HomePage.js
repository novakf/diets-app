import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Menu from "../components/SelectDiet/Menu";
import axios from "axios";
import Content from "../components/SelectDiet/Content";
import { Button } from "antd";
import { style } from "@mui/system";
import styled from "styled-components";

const HomePage = () => {
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  const [stats, setStats] = useState("");
  const [diets, setDiets] = useState("");
  const [status, setStatus] = useState("");

  React.useEffect(() => {
    if (!token) navigate("/login");
  });

  const id = jwtDecode(token).id;

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
      });
  }

  function deleteDiet() {
    fetch(`http://localhost:3001/stats/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        setStats("");
      });
  }

  return (
    token && (
      <div>
        <h1>
          Привет, {jwtDecode(token).name ? jwtDecode(token).name : "Незнакомец"}
          !
        </h1>

        {console.log(status)}

        {stats[0] ? (
          <div>
            <h2>Твой рацион: {stats[0].diet_id.type}</h2>
            <Content delDiet={deleteDiet} id={id} diets={diets} />
          </div>
        ) : (
          <div>
            <h2>Выбери рацион:</h2>
            <Menu updateStats={updateStats} diets={diets} />
          </div>
        )}
      </div>
    )
  );
};

const SButton = styled(Button)`
  margin-top: 50px;
`;

export default HomePage;
