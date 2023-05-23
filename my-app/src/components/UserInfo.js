import { Avatar, Descriptions } from "antd";
import React from "react";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";

const UserInfo = ({ info }) => {
  return (
    <SDescriptions
      title={<Avatar size="large" icon={<UserOutlined />} />}
      column={1}
    >
      <Descriptions.Item label="Имя">{info.name}</Descriptions.Item>
      <Descriptions.Item label="Возраст">{info.age}</Descriptions.Item>
      <Descriptions.Item label="Рост">{info.height}</Descriptions.Item>
      <Descriptions.Item label="Вес">{info.weight}</Descriptions.Item>
    </SDescriptions>
  );
};

const SDescriptions = styled(Descriptions)`
  position: absolute;
  margin-left: 900px;
`;

export default UserInfo;
