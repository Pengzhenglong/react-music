// import logo from './logo.svg'
import { IconStyle } from "./assets/iconfont/iconfont";
import { GlobalStyle } from "./style";
import MyRouter from "./router/index";
import store from "./store/index";
import { Provider } from "react-redux";
import { HashRouter, uesRoutes } from "react-router-dom";
// import { Data } from './application/Singers/data';

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div className="App">
          <GlobalStyle></GlobalStyle>
          <IconStyle></IconStyle>
          {/* <i className="iconfont">&#xe62b;</i> */}
          {/* <Data> */}
          <MyRouter />
          {/* </Data> */}
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
