import React from 'react';
import { ListWrapper, ListItem, List } from './style';
import { getCount } from '../../api/utils';
import LazyLoad from 'react-lazyload';
import music from './music.png';
import {  useNavigate } from 'react-router-dom';

function RecommendList(props) {
  const navigate = useNavigate();
  const enterDetail = (id) => {
    navigate(`/recommend/${id}`);
  };
  return (
    <ListWrapper>
      <h1 className="title"> 推荐歌单 </h1>
      <List>
        {props.recommendList.map((item, index) => {
          return (
            <ListItem
              key={item.id + index}
              onClick={() => enterDetail(item.id)}
            >
              <div className="img_wrapper">
                <div className="decorate"></div>
                {/* 加此参数可以减小请求的图片资源大小 */}
                {/* img 标签外部包裹一层 LazyLoad */}
                <LazyLoad
                  placeholder={
                    <img width="100%" height="100%" src={music} alt="music" />
                  }
                >
                  <img
                    src={item.picUrl + '?param=300x300'}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          );
        })}
      </List>
    </ListWrapper>
  );
}

export default React.memo(RecommendList);
