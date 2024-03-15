// import React, { useEffect, useState } from "react";
// import { v4 as uuid } from "uuid";

// function Page() {
//   const [coinData, setCoinData] = useState<{ [key: string]: CoinData }>({});

//   useEffect(() => {
//     try {
//       const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
//       ws.binaryType = "arraybuffer";

//       ws.onopen = () => {
//         console.log("onopen");
//         const sendData = JSON.stringify([
//           { ticket: uuid() },
//           {
//             type: "ticker",
//             codes: ["KRW-BTC", "KRW-ETH", "KRW-XRP"], // 비트코인
//           },
//         ]);
//         ws.send(sendData);
//       };

//       ws.onmessage = (e: any) => {
//         const encode = new TextDecoder("utf-8");
//         const data = JSON.parse(encode.decode(e.data));

//         setCoinData((coinData) => {
//           const newCoinData = JSON.parse(JSON.stringify(coinData)); // deep copy
//           newCoinData[data.code] = data;
//           return newCoinData;
//         });
//       };

//       ws.onerror = (e: any) => {
//         if (ws.OPEN === ws.readyState) {
//           ws.close();
//         }
//       };

//       ws.onclose = () => {
//         console.log("onclose");
//       };

//       return () => {
//         if (ws.OPEN === ws.readyState) {
//           ws.close();
//         }
//       };
//     } catch (e) {
//       return () => {};
//     }
//   }, []);

//   return (
//     <div>
//       <ul>
//         {Object.keys(coinData).map((key) => {
//           return (
//             <li key={key}>
//               <div>
//                 <span>{key}</span>
//                 <ul>
//                   <li>{coinData[key].change}</li>
//                   <li>{coinData[key].trade_date}</li>
//                   <li>{coinData[key].trade_price.toLocaleString("ko-KR")}</li>
//                 </ul>
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// export default Page;
