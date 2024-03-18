import { useQuery } from "react-query";

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
import { CoinData } from "./Coins";

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

export interface RouteState {
  name: string;
  price: number;
  symblo: string;
  currency: string;
  trade_date: number;
  prev_closing_price: number;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_time: number;
  trade_timestamp: number;
  trade_volume: number;
}

interface CoinProps {
  key: string;
  coinSocket: any; // 여기에 해당 타입을 추가
  children: React.ReactNode; // `any` 대신 더 구체적인 타입을 사용하는 것이 좋습니다.
}

function Coin({ coinSocket, children }: any) {
  const { state } = useLocation<RouteState>();
  console.log(coinSocket);

  return (
    <Container>
      <Helmet>
        <title>{state?.name}</title>
      </Helmet>
      <Header>
        <Title>{state?.name}</Title>
      </Header>
      <StyledLink to="/"></StyledLink>

      <BoxContainer>
        <OverviewBox>
          <Overview>
            <OverviewItem>
              <p>Symbol:</p>
              <p>{state?.symblo}</p>
            </OverviewItem>
            <OverviewItem>
              <p>Price:</p>
              <p>{coinSocket.trade_price}</p>
            </OverviewItem>
            <OverviewItem>
              <p>Trade Date:</p>
              <p>{state?.trade_date}</p>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <p>opening_price:</p>
              <p>{state?.opening_price}</p>
            </OverviewItem>
            <OverviewItem>
              <p>high_price:</p>
              <p>{state?.high_price}</p>
            </OverviewItem>
            <OverviewItem>
              <p>low_price:</p>
              <p>{state?.low_price}</p>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <p>trade_time:</p>
              <p>{state?.trade_time}</p>
            </OverviewItem>
            <OverviewItem>
              <p>trade_timestamp:</p>
              <p>{state?.trade_timestamp}</p>
            </OverviewItem>
            <OverviewItem>
              <p>trade_volume:</p>
              <p>{state?.trade_volume}</p>
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
    </Container>
  );
}
export default Coin;
