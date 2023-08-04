import { registerMicroApps, start } from "qiankun";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";
// import SentryRRWeb from "@sentry/rrweb";

// Sentry.init({
//   dsn: "xxxxxx",
//   integrations: [
//     new Integrations.BrowserTracing(),
//     new SentryRRWeb({
//       checkoutEveryNms: 10 * 1000, // 每10秒重新制作快照
//       checkoutEveryNth: 200, // 每 200 个 event 重新制作快照
//       maskAllInputs: false, // 将所有输入内容记录为 *
//     }),
//   ],
//   tracesSampleRate: 1.0,
//   release: "base-5",
// });

const root = ReactDOM.createRoot(document.getElementById("root"));

registerMicroApps([
  {
    name: "conversation", // app name registered
    entry: "//localhost:9010",
    container: "#micro",
    activeRule: "/errorPage",
  },
]);
start();

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
