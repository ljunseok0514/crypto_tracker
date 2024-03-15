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
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin: 40px 0 10px 0;
  padding-left: 20px;
`;

const Title = styled.h1`
  font-size: 18px;
  color: white;
`;

const CoinsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 14px 0px;
  gap: 10px;
`;

const Coin = styled.li`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    width: 100%;
    height: 100%;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
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
`;

const CoinInfoBox = styled.div`
  text-align: right;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const CoinInfoChangePrice = styled.p<{ status: string }>`
  color: ${(props) => {
    switch (props.status) {
      case "RISE":
        return "green";
      case "FALL":
        return "red";
      default:
        return "white"; // 기본 색상
    }
  }};
`;

const CoinInfoTradePrice = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
`;

interface ICoinList {
  market: string;
  english_name: string;
}

function Coins() {
  const { isLoading: coinListLoading, data: coinListData } = useQuery<
    ICoinList[]
  >(["test"], fetchCoinList);

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
      </Header>
      {coinListLoading ? (
        <Loader>"Crypto List Loading..." </Loader>
      ) : (
        <CoinsList>
          {Object.keys(coinData).map((key) => {
            const coinInfo = coinListData?.find((item) => item.market === key); // testData에서 현재 key에 해당하는 객체의 english_name을 찾습니다.
            const coinCodeName = coinInfo ? coinInfo.english_name : key; // key가 testData의 id와 일치한다고 가정합니다.
            return (
              <Coin key={key}>
                <Link
                  to={{
                    pathname: `/${coinData[key].code}`,
                    state: {
                      name: coinData[key].code,
                      price: coinData[key].trade_price.toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 17,
                      }),
                      currency: key.split("-")[0],
                      symblo: coinInfo?.market.split("-")[1],
                    },
                  }}
                >
                  <CoinTitle>
                    <Img
                      src={`https://coinicons-api.vercel.app/api/icon/${key
                        .split("-")[1]
                        .toLowerCase()}`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement; // e.target을 HTMLImageElement로 타입 단언
                        target.onerror = null; // 중복 에러 방지
                        target.src = coinImg; // 기본 이미지로 대체
                      }}
                    />
                    <p>{coinCodeName} &rarr;</p>
                  </CoinTitle>
                  <CoinInfoBox>
                    <CoinInfoTradePrice>
                      {coinData[key].trade_price.toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 17,
                      })}
                      {key.split("-")[0]}
                    </CoinInfoTradePrice>
                    <CoinInfoChangePrice status={coinData[key].change}>
                      {coinData[key].change === "RISE" && "+ "}
                      {coinData[key].change === "FALL" && "- "}
                      {coinData[key].change_rate}%
                    </CoinInfoChangePrice>
                  </CoinInfoBox>
                </Link>
              </Coin>
            );
          })}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
