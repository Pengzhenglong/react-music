import React, {useState} from 'react';
import {Container} from './style';
import { CSSTransition } from 'react-transition-group';
import { useNavigate, Navigate } from 'react-router-dom';
import  Header  from '@/baseUI/header/index';
function Album (props) {
  const [showStatus, setShowStatus] = useState (true);
  const navigate = useNavigate();
  const  goBack = () => {
    navigate(-1);
  }
  const handleBack = () => {
    setShowStatus (false);
  };
  
  return (
    <CSSTransition
      in={showStatus}  
      timeout={300} 
      classNames="fly" 
      appear={true} 
      unmountOnExit
      onExited={goBack}
    >
      <Container>
      <Header title={"返回"} handleClick={handleBack}></Header>
      </Container>
    </CSSTransition>
  )
}

export default React.memo (Album);