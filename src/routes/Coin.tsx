import { v4 as uuid } from "uuid";
import { Helmet } from "react-helmet";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinDaysAgo } from "./api";
import Chart from "./Chart";
import arrowBackBlack from "../assets/arrow_back_black_24dp.svg";
import arrowBackWhite from "../assets/arrow_back_white_24dp.svg";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

const Header = styled.header`
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 10px;
  margin: 40px 0 10px 0;
`;

const Title = styled.h1`
  font-size: 18px;
  color: ${(props) => props.theme.textColor};
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
`;

interface IsDarkProps {
  isDark: boolean;
}

const StyledLink = styled(Link)<IsDarkProps>`
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

const Loader = styled.span`
  text-align: center;
  display: block;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 10px;
  margin-top: 10px;
  padding: 20px 0;
`;

const media = {
  mobile: `@media(max-width:767px)`,
};

const OverviewBox = styled.div`
  display: flex;
  ${media.mobile} {
    display: block;
    width: 100%;
    padding-right: 0;
  }
`;

const Overview = styled.div`
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

interface Theme {
  textColor: string;
}

interface Props {
  status?: string;
  theme: Theme;
}

const OverviewItem = styled.div<Props>`
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

const Currency = styled.span`
  font-size: 12px;
  font-weight: 400;
  margin-left: 4px;
`;

const CurrencyStatic = styled(Currency)`
  color: #7a7a7a;
`;

const BoxContainer = styled.div``;

const TabsBox = styled.div``;

interface RouteState {
  coinCodeName: string;
}

interface RouteParams {
  coinId: string;
}

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

export interface ICoinDaysAgo {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  prev_closing_price: number;
  change_price: number;
  change_rate: number;
}

function Coin() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const [loading, setLoading] = useState(true);
  const [coinData, setCoinData] = useState<{ [key: string]: CoinData }>({});
  const { isLoading: coinDaysAgoLoading, data: coinDaysAgoData } = useQuery<
    ICoinDaysAgo[]
  >(["tickers", coinId], () => fetchCoinDaysAgo(coinId));
  useEffect(() => {
    try {
      const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
      ws.binaryType = "arraybuffer";

      ws.onopen = () => {
        const sendData = JSON.stringify([
          { ticket: uuid() },
          {
            type: "ticker",
            codes: [coinId], // 요청 코인리스트
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
          setLoading(false);
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
  }, [coinId]);
  return (
    <Container>
      <Helmet>
        <title>
          {state?.coinCodeName
            ? state.coinCodeName
            : loading
            ? "Coin Info"
            : coinData[coinId]?.code}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.coinCodeName
            ? state.coinCodeName
            : loading
            ? "Price Info"
            : coinData[coinId]?.code}
        </Title>
      </Header>
      <StyledLink
        isDark={isDark}
        to="/"
        aria-label="홈으로 돌아가기"
      ></StyledLink>
      {loading ? (
        <Loader>Loading Coin Info...</Loader>
      ) : (
        <BoxContainer>
          <OverviewBox>
            <Overview>
              <OverviewItem status={coinData[coinId].change}>
                <p>Price:</p>
                <p>
                  {coinData[coinId].trade_price.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 17,
                  })}
                  <Currency>{coinId.split("-")[0]}</Currency>
                </p>
              </OverviewItem>
              <OverviewItem status={coinData[coinId].change}>
                <p>Change:</p>
                <p>
                  {coinData[coinId].change === "RISE" && "+ "}
                  {coinData[coinId].change === "FALL" && "- "}

                  {coinData[coinId].change_rate}
                  <Currency>%</Currency>
                </p>
              </OverviewItem>
              <OverviewItem status={coinData[coinId].change}>
                <p>Change price:</p>
                <p>
                  {coinData[coinId].change === "RISE" && "▲ "}
                  {coinData[coinId].change === "FALL" && "▼ "}
                  {coinData[coinId]?.change_price}
                </p>
              </OverviewItem>
            </Overview>
            <Overview>
              <OverviewItem>
                <p>trade timestamp:</p>
                <p>
                  {new Date(coinData[coinId]?.trade_timestamp).toLocaleString()}
                </p>
              </OverviewItem>
              <OverviewItem>
                <p>trade time:</p>
                <p>{`${coinData[coinId]?.trade_time.slice(0, 2)}:${coinData[
                  coinId
                ]?.trade_time.slice(2, 4)}:${coinData[coinId]?.trade_time.slice(
                  4,
                  6
                )}`}</p>
              </OverviewItem>
              <OverviewItem>
                <p>trade volume:</p>
                <p>
                  {coinData[coinId]?.trade_volume}
                  <CurrencyStatic>{coinId.split("-")[0]}</CurrencyStatic>
                </p>
              </OverviewItem>
            </Overview>
            <Overview>
              <OverviewItem>
                <p>opening price:</p>
                <p>
                  {coinData[coinId]?.opening_price.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 17,
                  })}
                  <CurrencyStatic>{coinId.split("-")[0]}</CurrencyStatic>
                </p>
              </OverviewItem>
              <OverviewItem>
                <p>high price:</p>
                <p>
                  {coinData[coinId]?.high_price.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 17,
                  })}
                  <CurrencyStatic>{coinId.split("-")[0]}</CurrencyStatic>
                </p>
              </OverviewItem>
              <OverviewItem>
                <p>low price:</p>
                <p>
                  {coinData[coinId]?.low_price.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 17,
                  })}
                  <CurrencyStatic>{coinId.split("-")[0]}</CurrencyStatic>
                </p>
              </OverviewItem>
            </Overview>
          </OverviewBox>

          <TabsBox>
            {coinDaysAgoLoading ? (
              <Loader>Loading Coin Chart...</Loader>
            ) : (
              <Chart coinDaysAgoData={coinDaysAgoData ? coinDaysAgoData : []} />
            )}
          </TabsBox>
        </BoxContainer>
      )}
    </Container>
  );
}
export default Coin;
