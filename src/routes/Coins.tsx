import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinList } from "./api";
import { Helmet } from "react-helmet";
import { v4 as uuid } from "uuid";
import coinImg from "../assets/coin.png";

interface CoinData {
  type: string;
  code: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  prev_closing_price: number;
  acc_trade_price: number;
  change: string;
  change_price: number;
  signed_change_price: number;
  change_rate: number;
  signed_change_rate: number;
  ask_bid: string;
  trade_volume: number;
  acc_trade_volume: number;
  trade_date: string;
  trade_time: string;
  trade_timestamp: number;
  acc_ask_volume: number;
  acc_bid_volume: number;
  highest_52_week_price: number;
  highest_52_week_date: string;
  lowest_52_week_price: number;
  lowest_52_week_date: string;
  market_state: string;
  is_trading_suspended: boolean;
  delisting_date: any;
  market_warning: string;
  timestamp: number;
  acc_trade_price_24h: number;
  acc_trade_volume_24h: number;
  stream_type: string;
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 1100px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 5vh;
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 10px;
  margin: 40px 0 10px 0;
  padding-left: 20px;
`;

const Title = styled.h1`
  font-size: 18px;
  color: black;
`;

const media = {
  tablet: `@media(max-width:1024px)`,
  moblie: `@media(max-width:767px)`,
};

const CoinsList = styled.ul`
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

const Loader = styled.span`
  text-align: center;
  display: block;
  color: rgb(90, 97, 122);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin-top: 10px;
  padding: 20px 0;
`;

const CoinTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  p {
    font-size: 16px;
    font-weight: 400;
  }
`;
const StyledCoin = styled.li<{ status: string }>`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  border: 1px solid white;
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

const CoinInfoBox = styled.div<{ status: string }>`
  text-align: left;
  color: ${(props) => {
    switch (props.status) {
      case "RISE":
        return "#c84a31";
      case "FALL":
        return "#3862c4";
      default:
        return "black"; // 기본 색상
    }
  }};
  p:last-child {
    margin-top: 4px;
  }
  ${media.moblie} {
    margin: 0 auto;
  }
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const Currency = styled.span`
  font-size: 14px;
  font-weight: 400;
  margin-left: 4px;
`;

const CoinInfoTradePrice = styled.p`
  font-size: 26px;
  margin-bottom: 10px;
`;

interface ICoinList {
  market: string;
  english_name: string;
}

interface ICoinsProps {
  toggleDark: () => void;
}

function Coins({ toggleDark }: ICoinsProps) {
  const { isLoading: coinListLoading, data: coinListData } = useQuery<
    ICoinList[]
  >("CoinList", fetchCoinList);

  const [coinData, setCoinData] = useState<{ [key: string]: CoinData }>({});

  useEffect(() => {
    //데이터를 불러오기 전에 에러 방지를 위해 논리 부정 연산자로 조건문 작성
    if (!coinListData) {
      return;
    }
    const codes = coinListData
      ?.slice(0, 100)
      .filter((item) => item !== undefined)
      .map((item) => item.market);
    try {
      const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
      ws.binaryType = "arraybuffer";

      ws.onopen = () => {
        const sendData = JSON.stringify([
          { ticket: uuid() },
          {
            type: "ticker",
            codes, // 요청 코인리스트
          },
        ]);
        ws.send(sendData);
      };

      ws.onmessage = (e: any) => {
        const encode = new TextDecoder("utf-8");
        const data = JSON.parse(encode.decode(e.data));

        setCoinData((coinData) => {
          const newCoinData = JSON.parse(JSON.stringify(coinData)); // deep copy
          newCoinData[data.code] = data;
          return newCoinData;
        });
      };

      ws.onerror = (e: any) => {
        if (ws.OPEN === ws.readyState) {
          ws.close();
        }
      };

      return () => {
        if (ws.OPEN === ws.readyState) {
          ws.close();
        }
      };
    } catch (e) {
      return () => {};
    }
  }, [coinListLoading, coinListData]);

  return (
    <Container>
      <Helmet>
        <title>Crypto List</title>
      </Helmet>
      <Header>
        <Title>Crypto List</Title>
        <button onClick={toggleDark}>Toggle Dark Mode</button>
      </Header>
      {coinListLoading ? (
        <Loader>"Crypto List Loading..." </Loader>
      ) : (
        <CoinsList>
          {Object.keys(coinData).map((key) => {
            const coinInfo = coinListData?.find((item) => item.market === key); // testData에서 현재 key에 해당하는 객체의 english_name을 찾습니다.
            const coinCodeName = coinInfo ? coinInfo.english_name : key; // key가 testData의 id와 일치한다고 가정합니다.
            return (
              <StyledCoin key={key} status={coinData[key].change}>
                <Link
                  to={{
                    pathname: `/${coinData[key].code}`,
                    state: { coinCodeName: coinCodeName },
                  }}
                >
                  <CoinTitle>
                    <Img
                      src={` https://coplore-icon-api.vercel.app/api/icons/${key
                        .split("-")[1]
                        .toLowerCase()}`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement; // e.target을 HTMLImageElement로 타입 단언
                        target.onerror = null; // 중복 에러 방지
                        target.src = coinImg; // 기본 이미지로 대체
                      }}
                      alt="코인아이콘"
                    />
                    <p>{coinCodeName} &rarr;</p>
                  </CoinTitle>
                  <CoinInfoBox status={coinData[key].change}>
                    <CoinInfoTradePrice>
                      {coinData[key].trade_price.toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 17,
                      })}
                      <Currency>{key.split("-")[0]}</Currency>
                    </CoinInfoTradePrice>
                    <p>
                      {coinData[key].change === "RISE" && "+ "}
                      {coinData[key].change === "FALL" && "- "}
                      {coinData[key].change_rate}%
                    </p>
                    <p>
                      {coinData[key].change === "RISE" && "▲ "}
                      {coinData[key].change === "FALL" && "▼ "}
                      {coinData[key].change_price}
                    </p>
                  </CoinInfoBox>
                </Link>
              </StyledCoin>
            );
          })}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
