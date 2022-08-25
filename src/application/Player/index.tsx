import React, { memo,useEffect,useRef,useState } from 'react'
import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer';
import { connect } from 'react-redux'
import {
  changePlayingState,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  changeFullScreen
} from "./store/actionCreators";

const Player = memo((props) => {
  const { fullScreen } = props;
  const {
    togglePlayingDispatch,
    changeCurrentIndexDispatch,
    changeCurrentDispatch,
    changePlayListDispatch,//改变playList
    changeModeDispatch,//改变mode
    toggleFullScreenDispatch
  } = props;
  const  currentSong={
    al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
    name: "木偶人",
    ar: [{name: "薛之谦"}]
  }
  return (
    <div>
      <MiniPlayer  song={currentSong}    fullScreen={fullScreen}   toggleFullScreen={toggleFullScreenDispatch}></MiniPlayer>
      <NormalPlayer 
        song={currentSong}
        fullScreen={fullScreen}
        toggleFullScreen={toggleFullScreenDispatch}
      />
    </div>
  )
})
// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  fullScreen:state.getIn(['player','fullScreen']),
  playing: state.getIn (["player", "playing"]),
  currentSong: state.getIn (["player", "currentSong"]),
  showPlayList: state.getIn (["player", "showPlayList"]),
  mode: state.getIn (["player", "mode"]),
  currentIndex: state.getIn (["player", "currentIndex"]),
  playList: state.getIn (["player", "playList"]),
  sequencePlayList: state.getIn (["player", "sequencePlayList"])
})
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return  {
    togglePlayingDispatch(data){
      dispatch(changePlayingState(data))
    },
    toggleFullScreenDispatch (data) {
      dispatch (changeFullScreen (data));
    },
    togglePlayListDispatch (data) {
      dispatch (changeShowPlayList (data));
    },
    changeCurrentIndexDispatch (index) {
      dispatch (changeCurrentIndex (index));
    },
    changeCurrentDispatch (data) {
      dispatch (changeCurrentSong (data));
    },
    changeModeDispatch (data) {
      dispatch (changePlayMode (data));
    },
    changePlayListDispatch (data) {
      dispatch (changePlayList (data));
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Player))