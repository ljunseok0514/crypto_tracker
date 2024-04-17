import { CoinData } from "../../../interface/CoinData.type";
import {
  OverviewBox as StyledOverviewBox,
  Overview,
  OverviewItem,
  Currency,
  CurrencyStatic,
} from "./OverviewBox.styled";

interface OverviewBoxProps {
  coinData: { [key: string]: CoinData };
  coinId: string;
}

function OverviewBox({ coinData, coinId }: OverviewBoxProps) {
  return (
    <StyledOverviewBox>
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
          <p>{new Date(coinData[coinId]?.trade_timestamp).toLocaleString()}</p>
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
    </StyledOverviewBox>
  );
}

export default OverviewBox;
