import BeforeEnter from "./router/beforeEnter";
import router from "./router/index";
function App() {
  return <BeforeEnter routers={router} />;
}
export default App;
