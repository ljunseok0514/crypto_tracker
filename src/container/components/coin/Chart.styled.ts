import styled from "styled-components";

export const media = {
  moblie: `@media(max-width:767px)`,
};

export const ApexChartBoxContainer = styled.div`
  display: flex;
  ${media.moblie} {
    display: block;
    width: 100%;
    padding-right: 0;
  }
`;

export const ApexChartBox = styled.div`
  width: 50%;
  padding: 10px;
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 10px;
  margin-bottom: 10px;
  &:first-child {
    margin-right: 5px;
  }
  &:last-child {
    margin-left: 5px;
  }
  ${media.moblie} {
    display: block;
    width: 100%;
    &:first-child {
      margin-right: 0px;
    }
    &:last-child {
      margin-left: 0px;
    }
  }
`;
