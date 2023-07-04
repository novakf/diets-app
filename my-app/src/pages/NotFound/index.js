import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFound = () => {
  console.log(404);
  return (
    <Page>
      <img style={{width: "130px"}} src="https://i.redd.it/xroc163s3to51.jpg" />
      <Title className="title">404</Title>
      <Description className="description">Упс... страница не найдена!</Description>
      <Link to="/">Вернуться</Link>
    </Page>
  );
};

const Page = styled.div`
  text-align: center;
`

const Title = styled.div`
  font-size: 50px;
  font-weight: 600;
`

const Description = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`

export default NotFound;
