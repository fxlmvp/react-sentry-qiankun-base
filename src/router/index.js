import Page1 from "./../views/Page1";
import Page2 from "./../views/Page2";
import Login from "./../views/Login";
import NotFound from "./../views/ErrorPage";
import Home from "./../views/Home";
const routes = [
  {
    path: "/",
    element: <Home />,
    auth: false,
    children: [
      {
        path: "/page1",
        element: <Page1 />,
        auth: false,
      },
      {
        path: "/page2",
        element: <Page2 />,
        auth: true,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/errorPage",
        element: <NotFound />,
      },
    ],
  },
];
export default routes;
