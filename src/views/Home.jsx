import { Link, Outlet } from "react-router-dom";

function Login() {
  function throwError() {
    throw new Error("new 111222");
  }
  return (
    <div className="App">
      <header className="App-header">
        <div onClick={throwError}>抛出错误</div>
        <Link to="/page1">page1</Link>
        <Link to="/page2">page2</Link>
        <Link to="/errorPage">errorPage</Link>
        <Outlet></Outlet>
      </header>
    </div>
  );
}
export default Login;
