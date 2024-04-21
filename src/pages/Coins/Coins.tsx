import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchCoinList } from "../../api/api";
import { Helmet } from "react-helmet";
import { v4 as uuid } from "uuid";
import coinImg from "../../assets/coin.png";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../../store/atom/atoms";
import {
  CoinInfoBox,
  CoinInfoTradePrice,
  CoinTitle,
  CoinsList,
  Container,
  Currency,
  Header,
  Img,
  ModeBox,
  ModeButton,
  StyledCoin,
  Title,
} from "./Coins.styled";
import { CoinData } from "../../interface/CoinData.type";
import Loader from "../../components/common/loader/Loader";

interface ICoinList {
  market: string;
  english_name: string;
}

function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const isDark = useRecoilValue(isDarkAtom);
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
        <ModeBox>
          <ModeButton onClick={toggleDarkAtom}>
            {isDark ? "🌚 Dark Mode" : "🌞 Light Mode"}
          </ModeButton>
        </ModeBox>
      </Header>
      {coinListLoading ? (
        <Loader message="Crypto List Loading..." />
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
