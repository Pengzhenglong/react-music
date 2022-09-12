import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRankList } from './store/index';
import Loading from '@/baseUI/loading';
import { List, ListItem, SongList, Container } from './style';
import Scroll from '@/baseUI/scroll/index';
import { EnterLoading } from '@/application/Singers/style';
import { filterIndex, filterIdx } from '@/api/utils';
import { Outlet, useNavigate } from 'react-router-dom';

function Rank(props) {
  const { rankList: list, loading,songsCount } = props;
  const { getRankListDataDispatch } = props;
  const navigate = useNavigate();
  const  enterDetail = (detail) => {
    navigate(`/rank/${detail.id}`);
  }
  let rankList = list ? list.toJS() : [];
  // console.log('rankList', rankList);
  useEffect(() => {
    if (!rankList.length) {
      getRankListDataDispatch();
    }
  }, []);
  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}.{item.first}-{item.second}
            </li>
          );
        })}
      </SongList>
    ) : null;
  };

  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {list.map((item) => {
          return (
            <ListItem
              key={item.coverImgId}
              tracks={item.tracks}
              onClick={() => enterDetail(item)}
            >
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          );
        })}
      </List>
    );
  };
  let displayStyle = loading ? { display: 'none' } : { display: 'block' };
  return (
    <Container play={songsCount}>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>
            官方榜
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            全球榜
          </h1>
          {renderRankList(globalList, true)}
          {loading  ?<EnterLoading><Loading></Loading></EnterLoading>:null}
        </div>
      </Scroll>
      <Outlet />
    </Container>
  );
}
// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading']),
  songsCount: state.getIn(['player', 'playList']).size
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch() {
      dispatch(getRankList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));
