import { v4 as uuid } from "uuid";
import { Helmet } from "react-helmet";
import { useLocation, useParams } from "react-router-dom";
import { fetchCoinDaysAgo } from "../../api/api";
import Chart from "../../components/coin/Chart";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../../store/atom/atoms";
import {
  BoxContainer,
  Container,
  Header,
  StyledLink,
  ChartContainer,
  Title,
} from "./Coin.styled";
import { CoinData } from "../../interface/CoinData.type";
import { ICoinDaysAgo } from "../../interface/ICoinDaysAgo.type";
import Loader from "../../components/common/loader/Loader";
import OverviewBox from "../../components/coin/OverviewBox";

interface RouteState {
  coinCodeName: string;
}

interface RouteParams {
  coinId: string;
}

function Coin() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const [loading, setLoading] = useState(true);
  const { isLoading: coinDaysAgoLoading, data: coinDaysAgoData } = useQuery<
    ICoinDaysAgo[]
  >(["tickers", coinId], () => fetchCoinDaysAgo(coinId));
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
        <Loader message="Loading Coin Info..." />
      ) : (
        <BoxContainer>
          <OverviewBox coinData={coinData} coinId={coinId} />
          <ChartContainer>
            {coinDaysAgoLoading ? (
              <Loader message="Loading Coin Chart..." />
            ) : (
              <Chart coinDaysAgoData={coinDaysAgoData ? coinDaysAgoData : []} />
            )}
          </ChartContainer>
        </BoxContainer>
      )}
    </Container>
  );
}

export default Coin;
