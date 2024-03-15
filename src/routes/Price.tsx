import { useQuery } from "react-query";
// import { PriceData } from "./Coin";
import { fetchCoinTickers } from "./api";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

interface PriceProps {
  coinId: string;
}

const Loader = styled.div`
  text-align: center;
  display: block;
  color: rgb(90, 97, 122);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin-top: 10px;
  padding: 20px 0;
`;

const PriceView = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 14px 0px;
  gap: 10px;
`;

const PriceViewItem = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 10px;
  p:first-child {
    color: rgb(90, 97, 122);
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
`;

export default function Price({ coinId }: PriceProps) {
  return (
    <PriceView>
      <PriceViewItem>
        <p>ath_date</p>
        {/* <p>{USD?.ath_date}</p> */}
      </PriceViewItem>
      <PriceViewItem>
        <p>ath_price</p>
        {/* <p>{USD?.ath_price.toFixed(3)}</p> */}
      </PriceViewItem>
      <PriceViewItem>
        <p>market_cap</p>
        {/* <p>{USD?.market_cap}</p> */}
      </PriceViewItem>
      <PriceViewItem>
        <p>market_cap_change_24h</p>
        {/* <p>{USD?.market_cap_change_24h}</p> */}
      </PriceViewItem>{" "}
      <PriceViewItem>
        <p>percent_change_1h</p>
        {/* <p>{USD?.percent_change_1h}</p> */}
      </PriceViewItem>{" "}
      <PriceViewItem>
        <p>percent_change_6h</p>
        {/* <p>{USD?.percent_change_6h}</p> */}
      </PriceViewItem>{" "}
      <PriceViewItem>
        <p>percent_change_12h</p>
        {/* <p>{USD?.percent_change_12h}</p> */}
      </PriceViewItem>{" "}
      <PriceViewItem>
        <p>market_cap_change_24h</p>
        {/* <p>{USD?.percent_change_24h}</p> */}
      </PriceViewItem>{" "}
    </PriceView>
  );
}
