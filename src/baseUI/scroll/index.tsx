// import React, {
//   forwardRef,
//   useState,
//   useEffect,
//   useRef,
//   useMemo,
//   useImperativeHandle,
// } from 'react';
// import PropTypes from 'prop-types';
// import BScroll from 'better-scroll';
// import styled from 'styled-components';
// import Loading from '../loading/index';
// import style from '@/assets/global-style';
// import LoadingV2 from '../loading-v2/index';
// import  {debounce}  from  '@/api/utils';

// const ScrollContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
// `;
// const PullUpLoading = styled.div`
//   position: absolute;
//   left:0; right:0;
//   bottom: 5px;
//   width: 60px;
//   height: 60px;
//   margin: auto;
//   z-index: 100;
// `;

// export const PullDownLoading = styled.div`
//   position: absolute;
//   left:0; right:0;
//   top: 0px;
//   height: 30px;
//   margin: auto;
//   z-index: 100;
// `;

// const Scroll = forwardRef((props, ref) => {
//   // better-scroll 实例对象
//   const [bScroll, setBScroll] = useState();
//   //current 指向初始化 bs 实例需要的 DOM 元素
//   const scrollContaninerRef = useRef();

//   const { direction, click, refresh, bounceTop, bounceBottom } = props;

//   const { pullUp, pullDown, onScroll, pullUpLoading, pullDownLoading } = props;

//   let pullUpDebounce = useMemo(()=>{
//     return debounce(pullUp,300)
//   },[pullUp])
//   let pullDownDebounce = useMemo(()=>{
//     return debounce(pullDown,300)
//   },[pullDown])
//   // console.log(" pullUp, pullDown, onScroll")
//   // console.log(props);

//   useEffect(() => {
//     const scroll = new BScroll(scrollContaninerRef.current, {
//       scrollX: direction === 'horizental', //水平的
//       scrollY: direction === 'vertical', //垂直的
//       probeType: 3, //probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
//       click: click,
//       bounce: {
//         //当滚动超过边缘的时候会有一小段回弹动画。设置为 true 则开启动画。
//         top: bounceTop,
//         bottom: bounceBottom,
//       },
//     });
//     setBScroll(scroll);
//     return () => {
//       setBScroll(null);
//     };
//     // eslint-disable-next-line
//   }, []);
//   //给实例绑定 scroll 事件
//   useEffect(() => {
//     if (!bScroll || !onScroll) return;
//     bScroll.on('scroll', (scroll) => {
//       onScroll(scroll);
//     });
//     return () => {
//       bScroll.off('scroll');
//     };
//   }, [onScroll, bScroll]);
//   //进行上拉到底的判断，调用上拉刷新的函数
//   useEffect(() => {
//     if (!bScroll || !pullUp) return;
//     bScroll.on('scrollEnd', () => {
//       //判断是否滑动到了底部
//       if (bScroll.y <= bScroll.maxScrollY + 100) {
//         pullUpDebounce();
//       }
//     });
//     return () => {
//       bScroll.off('scrollEnd');
//     };
//   }, [pullUpDebounce,pullUp, bScroll]);
//   // 进行下拉的判断，调用下拉刷新的函数
//   useEffect(() => {
//     if (!bScroll || !pullDown) return;
//     bScroll.on('touchEnd', (pos) => {
//       //判断用户的下拉动作
//       if (pos.y > 50) {
//         pullDownDebounce();
//       }
//     });
//     return () => {
//       bScroll.off('touchEnd');
//     };
//   }, [pullDownDebounce,pullDown, bScroll]);
//   // 每次重新渲染都要刷新实例，防止无法滑动
//   useEffect(() => {
//     if (refresh && bScroll) {
//       bScroll.refresh();
//     }
//   });
//   // 给外界暴露组件方法，调用方法的方式刷新 scroll 组件
//   useImperativeHandle(ref, () => ({
//     refresh() {
//       if (bScroll) {
//         bScroll.refresh();
//         bScroll.scrollTo(0, 0);
//       }
//     },
//     getBScroll() {
//       if (bScroll) {
//         return bScroll;
//       }
//     },
//   }));
//   const  PullUpdisplayStyle = pullUpLoading ? { display: '' } : { display: 'none' };
//   const  PullDowndisplayStyle = pullDownLoading ? { display: '' } : { display: 'none' };
//   return (
//     <ScrollContainer ref={scrollContaninerRef}>
//       {props.children}
//        {/* 滑到底部加载动画 */}
//        <PullUpLoading  style={PullUpdisplayStyle}><Loading></Loading></PullUpLoading>
//         {/* 下拉刷新加载动画 */}
//         <PullDownLoading  style={PullDowndisplayStyle}>
//           <LoadingV2></LoadingV2>
//         </PullDownLoading>
//     </ScrollContainer>
//   );
// });

// Scroll.defaultProps = {
//   direction: 'vertical',
//   click: true,
//   refresh: true,
//   onScroll: null,
//   pullUpLoading: false,
//   pullDownLoading: false,
//   pullUp: null,
//   pullDown: null,
//   bounceTop: true,
//   bounceBottom: true,
// };

// Scroll.propTypes = {
//   direction: PropTypes.oneOf(['vertical', 'horizental']), // 滚动的方向
//   click: true, // 是否支持点击
//   refresh: PropTypes.bool, // 是否刷新
//   onScroll: PropTypes.func, // 滑动触发的回调函数
//   pullUp: PropTypes.func, // 上拉加载逻辑
//   pullDown: PropTypes.func, // 下拉加载逻辑
//   pullUpLoading: PropTypes.bool, // 是否显示上拉 loading 动画
//   pullDownLoading: PropTypes.bool, // 是否显示下拉 loading 动画
//   bounceTop: PropTypes.bool, // 是否支持向上吸顶
//   bounceBottom: PropTypes.bool, // 是否支持向下吸底
// };

// export default Scroll;
import React, { forwardRef, useState,useEffect, useRef, useImperativeHandle, useMemo } from "react"
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import styled from 'styled-components';
import Loading from '../loading';
import { debounce } from "../../api/utils";
import LoadingV2 from '../loading-v2';

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PullUpLoading = styled.div`
  position: absolute;
  left:0; right:0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

export const PullDownLoading = styled.div`
  position: absolute;
  left:0; right:0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`;

const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState();

  const scrollContaninerRef = useRef();

  const { direction, click, refresh,  bounceTop, bounceBottom } = props;

  const { pullUp, pullDown, onScroll, pullUpLoading, pullDownLoading } = props;
  
  let pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 300)
  }, [pullUp]);
  
  let pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 300)
  }, [pullDown]);

  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce:{
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll);
    })
    return () => {
      bScroll.off('scroll');
    }
  }, [onScroll, bScroll]);

  useEffect(() => {
    if(!bScroll || !pullUp) return;
    bScroll.on('scrollEnd', () => {
      //判断是否滑动到了底部
      if(bScroll.y <= bScroll.maxScrollY + 100){
        pullUpDebounce();
      }
    });
    return () => {
      bScroll.off('scrollEnd');
    }
  }, [pullUpDebounce, pullUp, bScroll]);

  useEffect(() => {
    if(!bScroll || !pullDown) return;
    bScroll.on('touchEnd', (pos) => {
      //判断用户的下拉动作
      if(pos.y > 50) {
        pullDownDebounce();
      }
    });
    return () => {
      bScroll.off('touchEnd');
    }
  }, [pullDownDebounce, pullDown, bScroll]);


  useEffect(() => {
    if(refresh && bScroll){
      bScroll.refresh();
    }
  });

  useImperativeHandle(ref, () => ({
    refresh() {
      if(bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if(bScroll) {
        return bScroll;
      }
    }
  }));

  const PullUpdisplayStyle = pullUpLoading ? { display: "" } : { display: "none" };
  const PullDowndisplayStyle = pullDownLoading ? { display: "" } : { display: "none" };
  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={ PullUpdisplayStyle }><Loading></Loading></PullUpLoading>
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading style={ PullDowndisplayStyle }><LoadingV2></LoadingV2></PullDownLoading>
    </ScrollContainer>
  );
})

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll:null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,//是否支持向上吸顶
  bounceBottom: PropTypes.bool//是否支持向上吸顶
};

export default Scroll;
