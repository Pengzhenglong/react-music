import React, { useState, useEffect,useContext } from 'react';
import  LazyLoad, {forceCheck} from 'react-lazyload';
import Horizen from '@/baseUI/horizen-item/index';
import { categoryTypes, alphaTypes } from '@/api/config';
import { NavContainer, ListContainer, List, ListItem } from './style';
import Scroll from '@/baseUI/scroll/index';
import Loading from '@/baseUI/loading/index';
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList,
} from './store/actionCreators';
import { connect } from 'react-redux';
import { PullDownLoading } from '../../baseUI/scroll/index';
import   singer  from  './singer.png'
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
// import { CategoryDataContext } from './data';
// import { CHANGE_CATEGORY, CHANGE_ALPHA, Data } from './data';
function Singers(props) {
  const  navigate = useNavigate();
  const { getHotSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props;
  const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props;
  console.log(props);
  // 首先需要引入 useContext  
// 如何用 hooks 实现一个 Redux?
// 将之前的 useState 代码删除  纯函数
// const {data, dispatch} = useContext (CategoryDataContext);
// // 拿到 category 和 alpha 的值
// console.log(data);

// const {category, alpha} = data.toJS();
// //CHANGE_ALPHA 和 CHANGE_CATEGORY 变量需要从 data.js 中引入
// let handleUpdateAlpha = (val) => {
//   dispatch ({type: CHANGE_ALPHA, data: val});
//   updateDispatch (category, val);
// };

// let handleUpdateCategory = (val) => {
//   dispatch ({type: CHANGE_CATEGORY, data: val});
//   updateDispatch (val, alpha);
// };
  //  useState
  let [category, setCategory] = useState('');
  let [alpha, setAlpha] = useState('');

  let handleUpdateAlpha = (val) => {
    setAlpha(val);
    updateDispatch(category,val)
  };
  let handleUpdateCategory = (val) => {
    setCategory(val);
    updateDispatch(val,alpha)
  };
  useEffect(() => {
    getHotSingerDispatch();
  },[])
  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  }
  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  }
  const  enterDetail = (id) => {
    navigate.push(`/singers/${id}`);
  }
  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    const  list  = singerList?singerList.toJS():[];
    // console.log(props)
    return (
      <List>
        {list.map((item, index) => {
          return (
            <ListItem key={item.accountId + '' + index} onClick={()=>enterDetail(item.id)}>
              <div className="img_wrapper">
              <LazyLoad placeholder={<img width="100%" height="100%" src={singer}  alt="music"/>}>
                <img
                  src={`${item.picUrl}?param=300x300`}
                  width="100%"
                  height="100%"
                  alt="music"
                />
              </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };
  return (
    <div>
      <NavContainer>
        <Horizen
          list={categoryTypes}
          title={'分类(默认热门):'}
          handleClick={handleUpdateCategory}
          oldVal={category}
        />
        <Horizen
          list={alphaTypes}
          title={'首字母:'}
          handleClick={handleUpdateAlpha}
          oldVal={alpha}
        />
      </NavContainer>
      <ListContainer>
        <Scroll
        pullUp={handlePullUp}
        pullDown = {handlePullDown}
        pullUpLoading={pullUpLoading}
        pullDownLoading={pullDownLoading}
        onScroll={forceCheck}
        >{renderSingerList()}</Scroll>
         <Loading show={enterLoading}></Loading>
      </ListContainer>
      <Outlet/>
    </div>
  );
}
  // redux 连接数据
  const mapStateToProps = (state) => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    pageCount: state.getIn(['singers', 'pageCount']),
  });
  const mapDispatchToProps = (dispatch) => {
    return {
      getHotSingerDispatch() {
        dispatch(getHotSingerList());
      },
      updateDispatch(category, alpha) {
        dispatch(changePageCount(0)); //由于改变了分类，所以pageCount清零
        dispatch(changeEnterLoading(true)); //loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
        dispatch(getSingerList(category, alpha));
      },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count+1));
      if(hot){
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
      //顶部下拉刷新
      pullDownRefreshDispatch(category, alpha) {
        dispatch(changePullDownLoading(true));
        dispatch(changePageCount(0)); //属于重新获取数据
        if (category === '' && alpha === '') {
          dispatch(getHotSingerList());
        } else {
          dispatch(getSingerList(category, alpha));
        }
      },
    };
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Singers));
