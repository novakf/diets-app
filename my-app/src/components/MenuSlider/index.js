import React, { memo } from "react";
import styled from "styled-components";
import SlickSlider from "react-slick";
import { Button } from "antd";
import './styles.css'

export function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <Button
      className="NextDay"
      onClick={onClick}
    >
      Next
    </Button>
  );
}

export function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <Button
      onClick={onClick}
    >
      Prev
    </Button>
  );
}

const MenuSlider = memo((props) => {
  return (
    <StyledMenuSlider
      dots={false}
      arrows={true}
      slidesToShow={1}
      slidesToScroll={1}
      infinite={false}
      draggable={false}
      nextArrow={<NextArrow />}
      prevArrow={<PrevArrow />}
      {...props}
    >
      {props.children}
    </StyledMenuSlider>
  );
});

const StyledMenuSlider = styled(SlickSlider)`
    .slick-track {
        position: relative;
        display: flex;
        max-height: 450px;
        width: 500px !important;
        
        padding: 0px 0px 0px 5px;
        flex-direction: column;
        flex-wrap: wrap;
    }
    .slick-slider {
        height: 100%;
        width: 300px;
    }

    .slick-list {
        width: 500px;
    }
`;

export default MenuSlider;
