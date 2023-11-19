import { Avatar, Button, Descriptions, Form, Input } from "antd";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import { message } from "antd";
import axios from "axios";

const UserInfo = ({ jwtInfo }) => {
  const [info, setInfo] = useState(jwtInfo);
  const [messageApi, contextHolder] = message.useMessage();
  const [editingHeight, setEditingHeight] = useState(false);
  const [editingWeight, setEditingWeight] = useState(false);
  const [height, setHeight] = useState(info.height);
  const [weight, setWeight] = useState(info.weight);

  const user_id = jwtInfo.id;
  const inputRef = useRef(null);

  useEffect(() => {
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
  }, [editingHeight || editingWeight]);

  useEffect(() => {
    if (editingHeight || editingWeight) {
      inputRef.current?.focus();
    }
  }, [editingHeight || editingWeight]);

  const saveHeight = () => {
    const property = "height";
    const change = height;
    setEditingHeight(false);
    fetch("http://localhost:3001/auth/register", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        property,
        change,
        user_id,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        messageApi.open({ type: "success", content: data });
      });
  };

  const saveWeight = () => {
    const property = "weight";
    const change = weight;
    setEditingWeight(false);
    fetch("http://localhost:3001/auth/register", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        property,
        change,
        user_id,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        messageApi.open({ type: "success", content: data });
      });
  };

  return (
    <Info>
      {contextHolder}
      <Descriptions
        title={<Avatar size="large" icon={<UserOutlined />} />}
        column={1}
      >
        <Descriptions.Item label="Имя">{info.name}</Descriptions.Item>
        <Descriptions.Item label="Возраст">{info.age}</Descriptions.Item>
        {!editingHeight ? (
          <Descriptions.Item label="Рост">
            <div onClick={() => setEditingHeight(true)}>{height}</div>
          </Descriptions.Item>
        ) : (
          <Descriptions.Item style={{ Height: "30px" }} label="Рост">
            <HeightItem>
              <Input
                ref={inputRef}
                style={{ width: "70px" }}
                size="small"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                onPressEnter={saveHeight}
                onBlur={saveHeight}
              />
            </HeightItem>
          </Descriptions.Item>
        )}
        {!editingWeight ? (
          <Descriptions.Item label="Вес">
            <div onClick={() => setEditingWeight(true)}>{weight}</div>
          </Descriptions.Item>
        ) : (
          <Descriptions.Item label="Вес">
            <Form.Item>
              <SInput
                ref={inputRef}
                style={{ width: "70px" }}
                size="small"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                onPressEnter={saveWeight}
                onBlur={saveWeight}
              />
            </Form.Item>
          </Descriptions.Item>
        )}
      </Descriptions>
    </Info>
  );
};

const Info = styled.div`
  position: absolute;
  margin-left: 900px;
  z-index: 1;
`;

const SInput = styled(Input)`
  margin-bottom: 10px;
`;

const HeightItem = styled(Descriptions.Item)`
  height: 50px !important;
`;

export default UserInfo;
