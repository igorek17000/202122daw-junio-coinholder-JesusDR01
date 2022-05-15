import React from 'react';
import { StyledSwapBtn } from './SwapBtn.styled';

export const SwapBtn = ({ trySwap, currentTrade, buttonState, loading }) => {
  return (
    <StyledSwapBtn
      loading={loading}
      type="primary"
      size="large"
      onClick={() => trySwap(currentTrade)}
      disabled={!buttonState.isActive}
    >
      {buttonState.text}
    </StyledSwapBtn>
  );
};
