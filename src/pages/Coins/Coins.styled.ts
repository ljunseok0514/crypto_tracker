import styled from "styled-components";

interface Theme {
  textColor: string;
}

interface Props {
  status?: string;
  theme: Theme;
}

export const Container = styled.div`
  padding: 0px 20px;
  max-width: 1100px;
  margin: 0 auto;
`;

export const Header = styled.header`
  height: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 10px;
  margin: 40px 0 10px 0;
  padding: 0 20px;
`;

export const Title = styled.h1`
display: block
  font-size: 18px;
  color: ${(props) => props.theme.textColor};
`;

export const ModeBox = styled.div``;

export const ModeButton = styled.button`
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.modeBtnBgColor};
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

export const CoinTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  p {
    font-size: 16px;
    font-weight: 400;
  }
`;

export const StyledCoin = styled.li<{ status: string }>`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  a {
    display: block;
    padding: 20px;

    width: 100%;
    height: 100%;
  }
  ${CoinTitle} {
    transition: color 0.1s ease-in;
  }
  &:hover {
    ${CoinTitle} {
      color: ${(props) => {
        switch (props.status) {
          case "RISE":
            return "#c84a31";
          case "FALL":
            return "#3862c4";
          default:
            return "#4dc94d";
        }
      }};
    }
  }
`;

const media = {
  tablet: `@media(max-width:1024px)`,
  moblie: `@media(max-width:767px)`,
};

export const CoinsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 14px 0px;
  gap: 10px;
  ${media.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }
  ${media.moblie} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const CoinInfoBox = styled.div<Props>`
  text-align: left;
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
  p:last-child {
    margin-top: 4px;
  }
  ${media.moblie} {
    margin: 0 auto;
  }
`;

export const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

export const Currency = styled.span`
  font-size: 14px;
  font-weight: 400;
  margin-left: 4px;
`;

export const CoinInfoTradePrice = styled.p`
  font-size: 26px;
  margin-bottom: 10px;
`;
