import React from 'react';
import { StyledActionButton } from './ActionButton.styled';

export const ActionButton = (props) => {
  return (
    <StyledActionButton id="action-button" {...props}>
      {props.children}
    </StyledActionButton>
  );
};