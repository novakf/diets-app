import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Menu from "../components/SelectDiet/Menu";
import axios from "axios";

const HomePage = () => {
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  const [stats, setStats] = useState("");
  const [diets, setDiets] = useState("");

  React.useEffect(() => {
    if (!token) navigate("/login");
  });

  const id = jwtDecode(token).id;
  useEffect(() => {
    axios.get("http://localhost:3001/diets").then((res) => {
      setDiets(res.data);
    });
    axios
      .get(`http://localhost:3001/stats/${id}`)
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        setStats("");
      });
  }, []);

  return (
    token && (
      <div>
        <h1>
          Привет, {jwtDecode(token).name ? jwtDecode(token).name : "Незнакомец"}
          !
        </h1>

        {console.log(stats)}

        {stats[0] && (
          <div>
            <h4>Ты уже выбрал рацион: </h4>
            <div>Тип: {stats[0].diet_id.type}</div>
            <div>Дата начала: {stats[0].start_date}</div>
            <div>Хочешь завершить его и выбрать другой?</div>
          </div>
        )}

        <h2>Выбери рацион:</h2>

        <Menu diets={diets} />
      </div>
    )
  );
};

export default HomePage;
