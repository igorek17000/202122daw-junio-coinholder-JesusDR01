import { StyledScrollToTopBtn } from './ScrollToTopBtn.styled';
import React, { useState, useEffect } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';

export const ScrollToTopBtn = ({ showBelow }) => {
  const [show, setShow] = useState(showBelow ? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: `smooth` });
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  });

  return (
    <StyledScrollToTopBtn id="scrollToTopBtn">
      {show && (
        <IconButton onClick={handleClick} aria-label="to top" component="span">
          <ExpandLessIcon />
        </IconButton>
      )}
    </StyledScrollToTopBtn>
  );
};
