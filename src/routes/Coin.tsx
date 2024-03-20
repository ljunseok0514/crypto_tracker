import { v4 as uuid } from "uuid";
import { Helmet } from "react-helmet";
import {
  Switch,
  Route,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers, fetchCoinList } from "./api";
import Chart from "./Chart";
import Price from "./Price";
import arrowBack from "../assets/arrow_back_white_24dp.svg";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const Header = styled.header`
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin: 40px 0 10px 0;
`;

const Title = styled.h1`
  font-size: 18px;
  color: white;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
`;

const StyledLink = styled(Link)`
  position: absolute;
  cursor: pointer;
  left: 30px;
  top: 11px;
  height: 24px;
  width: 24px;
  background: url(${arrowBack}) no-repeat center;
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

const media = {
  tablet: `@media(max-width:767px)`,
  moblie: `@media(min-width:480px)`,
};

const OverviewBox = styled.div`
  display: flex;
  ${media.tablet} {
    display: block;
    width: 100%;
    padding-right: 0;
  }
`;

const Overview = styled.div`
  width: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 30px 20px 0 20px;
  border-radius: 10px;
  margin-bottom: 10px;

  &:first-child {
    margin-right: 5px;
  }
  &:last-child {
    margin-left: 5px;
  }
  ${media.tablet} {
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
const OverviewItem = styled.div`
  text-align: center;
  p:first-child {
    color: rgb(90, 97, 122);
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    padding-bottom: 10px;
  }
  P:last-child {
    padding-bottom: 30px;
    font-size: 18px;
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0 0 14px 0;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    padding: 10px;
    display: block;
  }
`;

const BoxContainer = styled.div``;

const TabsBox = styled.div`
  ${media.tablet} {
    width: 100%;
  }
`;

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

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const [loading, setLoading] = useState(true);
  const [coinData, setCoinData] = useState<{ [key: string]: CoinData }>({});

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
        <title>{coinId}</title>
      </Helmet>
      <Header>
        <Title>{coinId}</Title>
      </Header>
      <StyledLink to="/"></StyledLink>
      {loading ? (
        <Loader>Loading Coin Info...</Loader>
      ) : (
        <BoxContainer>
          <OverviewBox>
            <Overview>
              <OverviewItem>
                <p>Symbol:</p>
                {/* <p>{coinListData?[].market.split("-")[1]}</p> */}
                <p>{coinData[coinId]?.code.split("-")[1]}</p>
              </OverviewItem>
              <OverviewItem>
                <p>Price:</p>
                <p>
                  {coinData[coinId].trade_price.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 17,
                  })}
                  {coinId.split("-")[0]}
                </p>
              </OverviewItem>
              <OverviewItem>
                <p>Trade Date:</p>
                <p>{coinData[coinId]?.trade_date}</p>
              </OverviewItem>
            </Overview>
            <Overview>
              <OverviewItem>
                <p>opening_price:</p>
                <p>{coinData[coinId]?.opening_price}</p>
              </OverviewItem>
              <OverviewItem>
                <p>high_price:</p>
                <p>{coinData[coinId]?.high_price}</p>
              </OverviewItem>
              <OverviewItem>
                <p>low_price:</p>
                <p>{coinData[coinId]?.low_price}</p>
              </OverviewItem>
            </Overview>
            <Overview>
              <OverviewItem>
                <p>trade_time:</p>
                <p>{coinData[coinId]?.trade_time}</p>
              </OverviewItem>
              <OverviewItem>
                <p>trade_timestamp:</p>
                <p>{coinData[coinId]?.trade_timestamp}</p>
              </OverviewItem>
              <OverviewItem>
                <p>trade_volume:</p>
                <p>{coinData[coinId]?.trade_volume}</p>
              </OverviewItem>
            </Overview>
          </OverviewBox>

          <TabsBox>
            {/* <Chart state={state} /> */}
            {/* <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
              </Tab>
            </Tabs>

            <Switch>
              <Route path={`/:coinId/price`}>
                <Price coinId={coinId} />
              </Route>
              <Route path={`/:coinId/chart`}>
                <Chart coinId={coinId} />
              </Route>
            </Switch> */}
          </TabsBox>
        </BoxContainer>
      )}
    </Container>
  );
}
export default Coin;
