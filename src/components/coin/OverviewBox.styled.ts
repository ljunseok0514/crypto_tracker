import styled from "styled-components";

export const media = {
  mobile: `@media(max-width:767px)`,
};

export const OverviewBox = styled.div`
  display: flex;
  ${media.mobile} {
    display: block;
    width: 100%;
    padding-right: 0;
  }
`;

export const Overview = styled.div`
  width: 50%;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 30px 20px 0 20px;
  border-radius: 10px;
  margin-bottom: 10px;

  &:first-child {
    margin-right: 5px;
  }
  &:last-child {
    margin-left: 5px;
  }
  ${media.mobile} {
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

interface Props {
  status?: string;
  theme: Theme;
}

interface Theme {
  textColor: string;
}

export const OverviewItem = styled.div<Props>`
  color: ${(props) => {
    switch (props.status) {
      case "RISE":
        return "#c84a31";
      case "FALL":
        return "#3862c4";
      default:
        return props.theme.textColor; // 기본 색상
    }
  }};
  text-align: center;
  p:first-child {
    color: rgb(123, 133, 167);
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
    padding-bottom: 10px;
  }
  p:last-child {
    padding-bottom: 30px;
    font-size: 20px;
  }
`;

export const Currency = styled.span`
  font-size: 12px;
  font-weight: 400;
  margin-left: 4px;
`;

export const CurrencyStatic = styled(Currency)`
  color: #7a7a7a;
`;
