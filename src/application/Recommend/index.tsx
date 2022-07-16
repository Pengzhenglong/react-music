import React from 'react';
import Slider from '../../components/slider/slider';
import RecommendList from '../../components/list/list';
import Scroll from '../../baseUI/scroll/index';
import { forceCheck } from 'react-lazyload';
import { Content } from './style';
// import Loading from '../../baseUI/loading/index';
function Recommend() {
  //mock 数据
  const bannerList = [1, 2, 3, 4].map((item) => {
    return {
      imageUrl:
        'http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg',
    };
  });

  const recommendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
    return {
      id: 1,
      picUrl:
        'https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg',
      playCount: 17171122,
      name: '朴树、许巍、李健、郑钧、老狼、赵雷',
    };
  });
  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
      {/* <Loading></Loading> */}
    </Content>
  );
}
export default React.memo(Recommend);
// export default React.memo(Recommend);
// import React, { useEffect } from 'react';
// import Slider from '../../components/slider/';
// import { connect } from 'react-redux';
// import * as actionTypes from './store/actionCreators';
// import RecommendList from '../../components/list/';
// import Scroll from '../../baseUI/scroll/index';
// import { Content } from './style';

// function Recommend(props) {
//   const { bannerList, recommendList } = props;

//   const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

//   useEffect(() => {
//     getBannerDataDispatch();
//     getRecommendListDataDispatch();
//     //eslint-disable-next-line
//   }, []);

//   const bannerListJS = bannerList ? bannerList.toJS() : [];
//   const recommendListJS = recommendList ? recommendList.toJS() : [];

//   return (
//     <Content>
//       <Scroll>
//         <div>
//           <Slider bannerList={bannerListJS}></Slider>
//           <RecommendList recommendList={recommendListJS}></RecommendList>
//         </div>
//       </Scroll>
//     </Content>
//   );
// }

// // 映射 Redux 全局的 state 到组件的 props 上
// const mapStateToProps = (state) => ({
//   // 不要在这里将数据 toJS
//   // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
//   bannerList: state.getIn(['recommend', 'bannerList']),
//   recommendList: state.getIn(['recommend', 'recommendList']),
// });
// // 映射 dispatch 到 props 上
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getBannerDataDispatch() {
//       dispatch(actionTypes.getBannerList());
//     },
//     getRecommendListDataDispatch() {
//       dispatch(actionTypes.getRecommendList());
//     },
//   };
// };

// // 将 ui 组件包装成容器组件
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(React.memo(Recommend));
