import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import {
  Container,
  ImgWrapper,
  CollectButton,
  SongListWrapper,
  BgLayer,
} from './style';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/baseUI/header/index';
import Scroll from '@/baseUI/scroll/index';
import SongsList from '@/application/SongsList/index';
import Loading from '@/baseUI/loading/index';
import { HEADER_HEIGHT } from '@/api/config';
import { connect } from 'react-redux';
import { getSingerInfo, changeEnterLoading } from './store/actionCreators';
import MusicNote from "../../baseUI/music-note/index";

function Singer(props) {
  const [showStatus, setShowStatus] = useState(true);
  const { artist: immutableArtist, songs: immutableSongs, loading ,songsCount} = props;

  const { getSingerDataDispatch } = props;
  console.log(props);

  const artist = immutableArtist.toJS();
  const songs = immutableSongs.toJS();
  const collectButton = useRef();
  const imageWrapper = useRef();
  const songScrollWrapper = useRef();
  const songScroll = useRef();
  const header = useRef();
  const layer = useRef();
  // 图片初始高度
  const initialHeight = useRef(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5;
  const handleScroll = useCallback((pos) => {
    let height = initialHeight.current;
    const newY = pos.y;
    const imageDOM = imageWrapper.current;
    const buttonDOM = collectButton.current;
    const headerDOM = header.current;
    const layerDOM = layer.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    //指的是滑动距离占图片高度的百分比
    const percent = Math.abs(newY / height);

    if (newY > 0) {
      imageDOM.style['transform'] = `scale(${1 + percent})`;
      buttonDOM.style['transform'] = `translate3d(0, ${newY}px, 0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    } else if (newY >= minScrollY) {
      layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
      //这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
      layerDOM.style.zIndex = 1;
      imageDOM.style.paddingTop = '75%';
      imageDOM.style.height = 0;
      imageDOM.style.zIndex = -1;
      //按钮跟着移动且渐渐变透明
      buttonDOM.style['transform'] = `translate3d(0, ${newY}px, 0)`;
      buttonDOM.style['opacity'] = `${1 - percent * 2}`;
    } else if (newY < minScrollY) {
      //往上滑动，但是超过Header部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerDOM.style.zIndex = 1;
      //防止溢出的歌单内容遮住Header
      headerDOM.style.zIndex = 100;
      //此时图片高度与Header一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
    }
  }, []);
  useEffect(() => {
    getSingerDataDispatch(id);
    let h = imageWrapper.current.offsetHeight;
    initialHeight.current = h;
    songScrollWrapper.current.style.top = `${h - OFFSET}px`; //px不能有空格 
    // 把遮罩先放在下面，以裹住歌曲列表
    layer.current.style.top = `${h - OFFSET}px`;
    songScroll.current.refresh();
  }, []);
  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
  }, []);
  const  musicNoteRef = useRef();

  const   musicAnimation = (x,y) =>{
    musicNoteRef.current.startAnimation({x,y});
  }
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={goBack}
    >
      <Container  play={songsCount}>
        <Header
          handleClick={setShowStatusFalse}
          title={artist.name}
          ref={header}
        ></Header>
        <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll ref={songScroll} onScroll={handleScroll}>
            <SongsList songs={songs} showCollect={false}    musicAnimation={musicAnimation}></SongsList>
          </Scroll>
        </SongListWrapper>
        {loading ? <Loading></Loading> : null}
        <MusicNote  ref={musicNoteRef}></MusicNote>
      </Container>
    </CSSTransition>
  );
}
// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  artist: state.getIn(['singerInfo', 'artist']),
  songs: state.getIn(['singerInfo', 'songsOfArtist']),
  loading: state.getIn(['singerInfo', 'loading']),
  songsCount: state.getIn(['player', 'playList']).size
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getSingerDataDispatch(id) {
      dispatch(changeEnterLoading(true));
      dispatch(getSingerInfo(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer));
