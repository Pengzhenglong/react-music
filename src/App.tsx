
// import logo from './logo.svg'
import { IconStyle } from './assets/iconfont/iconfont';
import { GlobalStyle } from './style';
import  MyRouter from './router/index'
function App() {

  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      {/* <i className="iconfont">&#xe62b;</i> */}
      <MyRouter></MyRouter>

    </div>
  )
}

export default App
