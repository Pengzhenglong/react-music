import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { forceCheck } from 'react-lazyload';
import { Outlet } from "react-router-dom";

import Slider from '../../components/slider/slider';
import RecommendList from '../../components/list/list';
import Scroll from '../../baseUI/scroll/index';
import { Content } from './style';
import Loading from '../../baseUI/loading/index';
import {
  getBannerList,
  getRecommendList,
  changeEnterLoading,
} from './store/actionCreators';
import * as actionTypes from './store/actionCreators';
// import Loading from '../../baseUI/loading/index';
function Recommend(props) {
  const { bannerList, recommendList, enterLoading,songsCount } = props;
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;
  useEffect(() => {
    // 如果页面有数据，则不发请求
    //immutable 数据结构中长度属性 size
    if (!bannerList.size) {
      getBannerDataDispatch();
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch();
    }
  }, []);
  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const getRecommendListJS = recommendList ? recommendList.toJS() : [];
  return (
    <Content  play={songsCount}>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={getRecommendListJS}></RecommendList>
        </div>
      </Scroll>
      {enterLoading ? <Loading></Loading> : null}
      {/* 将目前所在路由的下一层子路由加以渲染 */}
      <Outlet/>
    </Content>
  );
}
// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading']),
  songsCount: state.getIn(['player', 'playList']).size,//尽量减少toJS操作，直接取size属性就代表了list的长度
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend));
