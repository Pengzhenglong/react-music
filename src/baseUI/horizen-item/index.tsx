import React, { useState, useRef, useEffect, memo } from 'react';
import styled from 'styled-components';
import Scroll from '../scroll/index';
import PropTypes, { func } from 'prop-types';
import style from '../../assets/global-style';
import list from '../../components/list/list';

//样式部分
const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  > span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style['font-size-m']};
    vertical-align: middle;
  }
`;
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style['font-size-m']};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style['theme-color']};
    border: 1px solid ${style['theme-color']};
    opacity: 0.8;
  }
`;
function Horizen(props) {
    // 对props进行解构
    const  {list,oldVal,title} = props;
    const  {handleClick} = props;
    // 加入声明
    const  Category = useRef(null)
    // 加入初始化内容宽度的逻辑
    useEffect(()=>{
        let  categoryDOM  = Category.current;
        let tagElems = categoryDOM.querySelectorAll("span");
        let  totalWidth = 0;
        Array.from(tagElems).forEach(ele=>{
            totalWidth+=ele.offsetWidth;
        })
        // console.log(totalWidth);
        categoryDOM.style.width = `${totalWidth}px`
    },[])
  return (
    <Scroll direction={'horizental'}>
      <div  ref={Category}> 
        <List>
          <span>{title}</span>
          {list.map((item) => {
            return (
              <ListItem
                key={item.key}
                className={`${oldVal === item.key ? 'selected' : ''}`}
                onClick={() => handleClick(item.key)}
              >
                {item.name}
              </ListItem>
            );
          })}
        </List>
      </div>
    </Scroll>
  );
}

// 首先考虑接受的参数
//list 为接受的列表数据
//oldVal 为当前的 item 值
//title 为列表左边的标题
//handleClick 为点击不同的 item 执行的方法

Horizen.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null,
};

Horizen.prototype = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func  ,
};
export default memo(Horizen);
