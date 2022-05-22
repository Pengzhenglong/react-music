// import logo from './logo.svg'
import { IconStyle } from "./assets/iconfont/iconfont";
import { GlobalStyle } from "./style";
import MyRouter from "./router/index";
import store from "./store/index";
import { Provider } from 'react-redux';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {/* <i className="iconfont">&#xe62b;</i> */}
        <MyRouter></MyRouter>
      </div>
    </Provider>
  );
}

export default App;
