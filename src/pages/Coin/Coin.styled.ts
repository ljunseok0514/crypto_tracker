import { Link } from "react-router-dom";
import styled from "styled-components";
import arrowBackBlack from "../../assets/arrow_back_black_24dp.svg";
import arrowBackWhite from "../../assets/arrow_back_white_24dp.svg";
interface IsDarkProps {
  isDark: boolean;
}

export const Header = styled.header`
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 10px;
  margin: 40px 0 10px 0;
`;

export const Title = styled.h1`
  font-size: 18px;
  color: ${(props) => props.theme.textColor};
`;

export const Container = styled.div`
  padding: 0px 20px;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
`;

export const StyledLink = styled(Link)<IsDarkProps>`
  position: absolute;
  cursor: pointer;
  left: 30px;
  top: 11px;
  height: 24px;
  width: 24px;
  background: url(${(props) =>
      props.isDark ? arrowBackBlack : arrowBackWhite})
    no-repeat center;
`;

export const Loader = styled.span`
  text-align: center;
  display: block;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 10px;
  margin-top: 10px;
  padding: 20px 0;
`;

export const BoxContainer = styled.div``;

export const ChartContainer = styled.div``;
