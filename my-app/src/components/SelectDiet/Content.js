import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import MenuSlider from "../MenuSlider";
import DishSlider from "../DishSlider";
import ProgressiveImage from "react-progressive-graceful-image";

const Content = ({ id, diets }) => {
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
                  <div key={dish.dish_name}>
                    <Name>{dish.dish_name}</Name>
                    {dish.photo ? (
                      <img src={dish.photo} alt="new" />
                    ) : (
                      <StyledImg
                        src="https://drive.google.com/uc?export=view&id=1OyNn_HUo0Vz17MWhl7jM71_uLFIkgIcu"
                        alt="new"
                      />
                    )}
                  </div>
                );
              })}
            </DishSlider>
          </div>
          <div>
            <Day>День 2</Day>
            <DishSlider>
              {Object.values(diets[id].day2_id).map((dish) => {
                return (
                  <div key={dish.dish_name}>
                    <Name>{dish.dish_name}</Name>
                    {dish.photo ? (
                      <img src={dish.photo} alt="new" />
                    ) : (
                      <StyledImg
                        src="https://drive.google.com/uc?export=view&id=1OyNn_HUo0Vz17MWhl7jM71_uLFIkgIcu"
                        alt="new"
                      />
                    )}
                  </div>
                );
              })}
            </DishSlider>
          </div>
          <div>
            <Day>День 3</Day>
            <DishSlider>
              {Object.values(diets[id].day3_id).map((dish) => {
                return (
                  <div key={dish.dish_name}>
                    <Name>{dish.dish_name}</Name>
                    {dish.photo ? (
                      <img src={dish.photo} alt="new" />
                    ) : (
                      <StyledImg
                        src="https://drive.google.com/uc?export=view&id=1OyNn_HUo0Vz17MWhl7jM71_uLFIkgIcu"
                        alt="new"
                      />
                    )}
                  </div>
                );
              })}
            </DishSlider>
          </div>
        </MenuSlider>
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
`

const Day = styled.div`
    font-size: 22px;
    margin-left: 200px;
`

export default Content;
