// import { BrowserTracing } from "@sentry/tracing";
// import {
//   attachErrorHandler,
//   createTracingMixins,
//   vueRouterInstrumentation,
// } from "@sentry/vue";
import {
  makeFetchTransport,
  makeMain,
  defaultStackParser,
  defaultIntegrations,
  Hub,
  BrowserClient,
} from "@sentry/browser";

// 当前关联window的Hub实例的名字
let currentHubName;

// 用于存放主应用和子应用的对象，key值是应用的名称
const hubMap = {};

/**
 * type: 应用所使用的框架，目前只支持'vue'和'react'
 * name: 应用的名称
 * settings: 初始化client实例时需要的配置
 */
export function usingSentryHub(type, name, settings) {
  if (name === currentHubName) return;
  if (hubMap[name]) {
    // makeMain用于切换绑定window的Hub实例
    makeMain(hubMap[name]);
    currentHubName = name;

    // 如果hubMap[name]不存在且settings不为空，则根据type调用不同的函数创建新的Hub实例
  } else if (settings) {
    switch (type) {
      case "react":
        hubMap[name] = initReactSentryHub(settings);
        break;
      default:
        break;
    }
    makeMain(hubMap[name]);
    currentHubName = name;
  }
}

// 用于创建应用框架为vue的Hub实例
// function initVueSentryHub({ Vue, router, options, VueOptions }) {
//   const integrations = [...defaultIntegrations];
//   if (router) {
//     integrations.push(
//       new BrowserTracing({
//         routingInstrumentation: vueRouterInstrumentation(router),
//         tracingOrigins: ["localhost", /^\//],
//       })
//     );
//   }

//   const ultimateOptions = {
//     environment: process.env.NODE_ENV,
//     transport: makeFetchTransport,
//     stackParser: defaultStackParser,
//     integrations,
//     tracesSampleRate: 1.0,
//     ...options,
//   };
//   const client = new BrowserClient(ultimateOptions);
//   const ultimateVueOptions = {
//     // 显示错误来源组件的props参数
//     attachProps: true,
//     // 控制台输出错误
//     logErrors: true,
//     tracesSampleRate: 1.0,
//     ...VueOptions,
//   };
//   attachErrorHandler(Vue, ultimateVueOptions);
//   if (
//     "tracesSampleRate" in ultimateVueOptions ||
//     "tracesSampler" in ultimateVueOptions
//   ) {
//     Vue.mixin(
//       createTracingMixins({
//         ...ultimateVueOptions,
//         ...ultimateVueOptions.tracingOptions,
//       })
//     );
//   }
//   return new Hub(client);
// }

// 用于创建应用框架为react的Hub实例
function initReactSentryHub({ options }) {
  const ultimateOptions = {
    environment: process.env.NODE_ENV,
    transport: makeFetchTransport,
    stackParser: defaultStackParser,
    integrations: [...defaultIntegrations],
    tracesSampleRate: 1.0,
    ...options,
  };
  const client = new BrowserClient(ultimateOptions);
  return new Hub(client);
}
