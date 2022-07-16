import React, {useEffect} from 'react';
import { connect } from "react-redux";
// import { forceCheck } from 'react-lazyload';


import Slider from '../../components/slider/slider';
import RecommendList from '../../components/list/list';
import Scroll from '../../baseUI/scroll/index';
import { Content } from './style';
import { getBannerList, getRecommendList } from './store/actionCreators';
import * as actionTypes from './store/actionCreators';
// import Loading from '../../baseUI/loading/index';
function Recommend(props) {
  const  {bannerList,recommendList} = props;
  const  {getBannerDataDispatch,getRecommendListDataDispatch} = props;
  useEffect(()=>{
    getBannerDataDispatch();
    getRecommendListDataDispatch();
  },[])
  const  bannerListJS= bannerList?bannerList.toJS():[];
  const  getRecommendListJS= recommendList?recommendList.toJS():[] 
  return (
    <Content>
      <Scroll className="list" >
        <div>
         <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={getRecommendListJS}></RecommendList>
        </div>
      </Scroll>
      {/* <Loading></Loading> */}
    </Content>
  );
}
// 映射 Redux 全局的 state 到组件的 props 上
const  mapStateToProps = (state) =>({
   // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn (['recommend', 'bannerList']),
  recommendList: state.getIn (['recommend', 'recommendList']),
});

// 映射 dispatch 到 props 上
const  mapDispatchToProps = (dispatch)=>{
  return  {
    getBannerDataDispatch(){
      dispatch(actionTypes.getBannerList())
    },
    getRecommendListDataDispatch(){
      dispatch(actionTypes.getRecommendList())
    }
  }
};
export default  connect(mapStateToProps,mapDispatchToProps)(React.memo(Recommend));