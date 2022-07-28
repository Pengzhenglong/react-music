import React, { memo,useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Container } from "./style";
import { useNavigate } from 'react-router-dom';

const Singer = memo(() => {
  const navigate = useNavigate();
  const  [showStatus, setShowStatus] = useState(true);
  const goBack = () => {
    navigate(-1);
  };
  return (
    <CSSTransition
    in={showStatus}
    timeout={300}
    classNames="fly"
    appear={true}
    unmountOnExit
    onExited={goBack}
  >      <Container>
  </Container>
    </CSSTransition>
  )
})

export default Singer