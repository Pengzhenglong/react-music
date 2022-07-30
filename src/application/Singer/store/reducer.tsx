import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const defaultState = fromJS({
  artist:{},
  songsOfArtist:[],
  loading:true
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_ARTIST:
      return state.set('artist', action.data);
    case actionTypes.CHANGE_SONGS_OF_ARTIST:
      return state.set('songsOfArtist', action.data);
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('loading', action.data);
    default:
      return state;
  }
};
