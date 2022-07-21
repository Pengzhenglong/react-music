import React, { useState, useEffect } from 'react';
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

function Singers(props) {
  let [category, setCategory] = useState('');
  let [alpha, setAlpha] = useState('');
  const { getHotSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props;
  const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props;
  console.log(props);
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
  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    const  list  = singerList?singerList.toJS():[];
    // console.log(props)
    return (
      <List>
        {list.map((item, index) => {
          return (
            <ListItem key={item.accountId + '' + index}>
              <div className="img_wrapper">
                <img
                  src={`${item.picUrl}?param=300x300`}
                  width="100%"
                  height="100%"
                  alt="music"
                />
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
        >{renderSingerList()}</Scroll>
         <Loading show={enterLoading}></Loading>
      </ListContainer>
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
