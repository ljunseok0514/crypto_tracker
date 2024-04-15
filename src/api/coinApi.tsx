import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export interface CoinData {
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

export function FetchUpbitCoinInfo() {
  const [coinData, setCoinData] = useState<CoinData>({
    //변수로 선언해서 위로빼도 됨
    type: "",
    code: "",
    opening_price: 0,
    high_price: 0,
    low_price: 0,
    trade_price: 0,
    prev_closing_price: 0,
    acc_trade_price: 0,
    change: "",
    change_price: 0,
    signed_change_price: 0,
    change_rate: 0,
    signed_change_rate: 0,
    ask_bid: "",
    trade_volume: 0,
    acc_trade_volume: 0,
    trade_date: "",
    trade_time: "",
    trade_timestamp: 0,
    acc_ask_volume: 0,
    acc_bid_volume: 0,
    highest_52_week_price: 0,
    highest_52_week_date: "",
    lowest_52_week_price: 0,
    lowest_52_week_date: "",
    market_state: "",
    is_trading_suspended: false,
    delisting_date: null,
    market_warning: "",
    timestamp: 0,
    acc_trade_price_24h: 0,
    acc_trade_volume_24h: 0,
    stream_type: "",
  });

  useEffect(() => {
    try {
      const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
      ws.binaryType = "arraybuffer"; //어레이버퍼로 받는다는 의미(데이터 종류)

      ws.onopen = () => {
        //연결이 된다면 실행해라는 명령
        const sendData = JSON.stringify([
          { ticket: uuid() }, // 키 값 uuid로 난수 생성해줌
          {
            type: "ticker", //ticker: 현재가
            codes: ["KRW-BTC"], // 비트코인 데이터를 요청함
          },
        ]);
        ws.send(sendData);
      };

      ws.onmessage = (e: any) => {
        //데이터 오는 부분 e에 데이터가 담겨져 있음
        const encode = new TextDecoder("utf-8"); //utf-8로 변환해서 스트링 형태로 데이터를 변환함
        const data: TextEncoder = JSON.parse(encode.decode(e.data)); //json으로 파싱함
        setCoinData(data as any);
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
  }, []);

  return (
    <div>
      <ul>
        <li>{coinData.code}</li>
        <li>{coinData.trade_price.toLocaleString("ko-KR")}</li>
        <li>{coinData.change}</li>
        <li>{coinData.change_price.toLocaleString("ko-KR")}</li>
        <li>{coinData.stream_type}</li>
        <li>{coinData.code}</li>
      </ul>
    </div>
  );
}

export default FetchUpbitCoinInfo;
