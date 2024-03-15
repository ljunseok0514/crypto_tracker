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

const Header = styled.header`
  height: 5vh;
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

const Loader = styled.span`
  text-align: center;
  display: block;
  color: rgb(90, 97, 122);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin-top: 10px;
  padding: 20px 0;
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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  span:first-child {
    color: rgb(90, 97, 122);
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
`;
const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 14px 0px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  span {
    color: rgb(90, 97, 122);
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  p {
    display: block;
    line-height: 20px;
    text-align: justify;
    hyphens: auto;
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

const BoxContainer = styled.div`
  display: flex;
`;

const OverviewBox = styled.div`
  width: 50%;
  padding-right: 10px;
`;

const TabsBox = styled.div`
  width: 50%;
`;

interface RouteParams {
  coinId: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
export interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface RouteState {
  name: string;
  price: number;
  symblo: string;
  currency: string;
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
    // {
    //   refetchInterval: 5000,
    // }
  );

  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>{state?.name}</title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      <StyledLink to="/"></StyledLink>
      {loading ? (
        <Loader>"Coin Info Loading..."</Loader>
      ) : (
        <BoxContainer>
          <OverviewBox>
            <Overview>
              {/* <OverviewItem>
                <span>Rank:</span>
                <span>{infoData?.rank}</span>
              </OverviewItem> */}
              <OverviewItem>
                <span>Symbol:</span>
                <span>{state?.symblo}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Price:</span>
                {/* <span>{tickersData?.quotes.USD.price.toFixed(3)}</span> */}
                <span>
                  {state?.price}
                  {state?.currency}
                </span>
              </OverviewItem>
            </Overview>
            <Description>
              <span>description:</span>
              <p>{infoData?.description}</p>
            </Description>
            <Overview>
              <OverviewItem>
                <span>Total Suply:</span>
                <span>{tickersData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply:</span>
                <span>{tickersData?.max_supply}</span>
              </OverviewItem>
            </Overview>
            {/* <Price coinId={coinId} /> */}
          </OverviewBox>

          <TabsBox>
            {/* <Chart coinId={coinId} /> */}
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
