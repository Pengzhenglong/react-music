import React,{useState} from 'react';
import Horizen from '@/baseUI/horizen-item/index';
import { categoryTypes, alphaTypes } from '@/api/config';
import { NavContainer } from './style';

function Singers(props) {
  let [category, setCategory] = useState('');
  let [alpha, setAlpha] = useState('');
  let handleUpdateAlpha = (val) => {
    setAlpha(val);
  };
  let handleUpdateCategory = (val) => {
    setCategory(val);
  };
  return (
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
  );
}

export default React.memo(Singers);
