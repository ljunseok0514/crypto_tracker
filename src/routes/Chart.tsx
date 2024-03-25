import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { ICoinDaysAgo } from "./Coin";

const media = {
  moblie: `@media(max-width:767px)`,
};

const ApexChartBoxContainer = styled.div`
  display: flex;
  ${media.moblie} {
    display: block;
    width: 100%;
    padding-right: 0;
  }
`;

const ApexChartBox = styled.div`
  width: 50%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin-bottom: 10px;
  &:first-child {
    margin-right: 5px;
  }
  &:last-child {
    margin-left: 5px;
  }
  ${media.moblie} {
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

const Loader = styled.div`
  text-align: center;
  display: block;
  color: rgb(90, 97, 122);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin-top: 10px;
  padding: 20px 0;
`;

export interface IHistoryical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinDaysAgoData: ICoinDaysAgo[];
}

function Chart({ coinDaysAgoData }: ChartProps) {
  // const mappedOhlcvData = data?.map((price) => ({
  //   x: new Date(price.time_close * 1000).toUTCString(),
  //   y: [
  //     parseFloat(price.open),
  //     parseFloat(price.high),
  //     parseFloat(price.low),
  //     parseFloat(price.close),
  //   ],
  // }));
  return (
    <ApexChartBoxContainer>
      <ApexChartBox>
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: coinDaysAgoData?.map((props) => props.prev_closing_price),
            },
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 200,
              width: 300,
              toolbar: { show: false },
              background: "tratransparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            // yaxis: {
            //   show: false,
            // },
            xaxis: {
              axisTicks: {
                // show: false,
              },
              axisBorder: {
                show: false,
              },
              type: "datetime",
              categories: coinDaysAgoData?.map((price) =>
                new Date(price.candle_date_time_utc).toUTCString()
              ),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) =>
                  `${value}${coinDaysAgoData[0].market.split("-")[0]}
                  `,
              },
            },
          }}
        />
      </ApexChartBox>
      <ApexChartBox>
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: coinDaysAgoData?.map((props) => props.prev_closing_price),
              // data: [1, 2, 3, 4, 5],
            },
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 200,
              width: 1100,
              toolbar: { show: false },
              background: "tratransparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              // type: "datetime",
              // categories: coinDaysAgoData?.map((price) =>
              //   new Date(
              //     Number(price.candle_date_time_utc) * 1000
              //   ).toUTCString()
              // ),
              // labels: {
              //   show: false,
              //   datetimeFormatter: { month: "mmm 'yy" },
              // },
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => ` ${value.toFixed(2)}`,
              },
            },
          }}
        />
      </ApexChartBox>
      {/* <ApexChartBox>
            <ApexChart
              type="candlestick"
              series={
                [
                  {
                    data: mappedOhlcvData,
                  },
                ] as unknown as number[]
              }
              options={{
                theme: { mode: "dark" },
                chart: {
                  type: "candlestick",
                  height: 350,
                  width: 500,
                  toolbar: {
                    show: false,
                  },
                  background: "transparent",
                },
                stroke: {
                  curve: "smooth",
                  width: 2,
                },
                yaxis: {
                  show: false,
                },
                xaxis: {
                  type: "datetime",
                  // categories: data?.map((price) =>
                  //   new Date(Number(price.time_close) * 1000).toUTCString()
                  // ),
                  labels: {
                    style: {
                      colors: "#9c88ff",
                    },
                  },
                },
                plotOptions: {
                  candlestick: {
                    colors: {
                      upward: "#3c90eb",
                      downward: "#df7d46",
                    },
                  },
                },
              }}
            />
          </ApexChartBox> */}
    </ApexChartBoxContainer>
  );
}

export default Chart;
