import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const defaultState = fromJS({
  singerList: [],
  enterLoading: true, //控制进场的Loading
  pullUpLoading: false, //控制上拉加载的状态
  pullDownLoading: false, //控制下拉刷新的状态
  pageCount: 0, //控制分页
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SINGER_LIST:
      return state.set('singerList', action.data);
    case actionTypes.CHANGE_PAGE_COUNT:
      return state.set('pageCount', action.data);
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data);
    case actionTypes.CHANGE_PULLUP_LOADING:
      return state.set('pullUpLoading', action.data);
    case actionTypes.CHANGE_PULLDOWN_LOADING:
      return state.set('pullDownLoading', action.data);
    default:
      return state;
  }
};
