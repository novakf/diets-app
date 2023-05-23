import { Modal, Button, Input } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { message } from "antd";

const DishForm = (props) => {
  const { open, onClose } = props;
  const [dish_name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [protein, setProtein] = useState("");
  const [fats, setFats] = useState("");
  const [carbs, setCarbs] = useState("");
  const [calories, setCalories] = useState("");
  const [photo, setPhoto] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const handleOk = () => {
    fetch("http://localhost:3001/dishes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dish_name,
        category,
        protein,
        fats,
        carbs,
        calories,
        photo,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        handleClose();
        messageApi.open({ type: "success", content: data });
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      });
  };

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <div>
      {contextHolder}
      <SModal
        title="ДОБАВИТЬ БЛЮДО"
        open={open}
        onClose={handleClose}
        onOk={handleOk}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose}>
            Отмена
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Добавить
          </Button>,
        ]}
      >
        <StyledInput
          value={dish_name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Название блюда"
        />
        <StyledInput
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Категория"
        />
        <StyledInput
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
          placeholder="Протеин"
        />
        <StyledInput
          value={fats}
          onChange={(e) => setFats(e.target.value)}
          placeholder="Жиры"
        />
        <StyledInput
          value={carbs}
          onChange={(e) => setCarbs(e.target.value)}
          placeholder="Углеводы"
        />
        <StyledInput
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="Калории"
        />
        <StyledInput
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="Фото"
        />
      </SModal>
    </div>
  );
};

const StyledInput = styled(Input)`
  margin-bottom: 10px;
`;

const SModal = styled(Modal)`
  text-align: center;
`;

export default DishForm;
