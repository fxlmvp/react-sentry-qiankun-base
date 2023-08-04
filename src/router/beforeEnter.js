import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { useEffect } from "react";
import { usingSentryHub } from "./../usingSentryHub";
const BeforeEnter = ({ routers }) => {
  //路由守卫判断
  const judgeRouter = (location, navigate) => {
    const { pathname } = location;
    console.log(pathname);
    changeSentryHubWithRouter(pathname);
  };

  //基于useEffect监听页面路由改变。
  const navigate = useNavigate();
  const location = useLocation();
  const router = useRoutes(routers);
  useEffect(() => {
    //路由守卫判断
    judgeRouter(location, navigate);
  }, [navigate, location]);
  return router;
};
function changeSentryHubWithRouter(to) {
  // 通过meta知道当前路由是否含子应用，若有则直接切换到name对应的子应用Hub实例
  // 如果此时Hub实例还没创建，则不会切换
  if (to === "/errorPage") {
    usingSentryHub(undefined, to);
  } else {
    // 如果路由不含子应用，则切换为主应用Hub实例，如果主应用的Hub实例还没创建，则根据第三形参进行创建
    usingSentryHub("react", to, {
      dsn: "XXXXXX",
      integrations: [],
      tracesSampleRate: 1.0,
      release: "base-5",
    });
  }
}

export default BeforeEnter;
