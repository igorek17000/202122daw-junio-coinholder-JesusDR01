import React from 'react';
import { StyledInchModal } from './InchModal.styled';

export const InchModal = ({ open, onClose, setToken, tokenList }) => {
  if (!open) return null;
  return (
    <StyledInchModal>
      {!tokenList
        ? null
        : Object.keys(tokenList).map((token, index) => (
            <div
              className="token"
              onClick={() => {
                setToken(tokenList[token]);
                onClose();
              }}
              key={index}
            >
              <img src={tokenList[token].logoURI} alt="noLogo" />
              <div>
                <h4>{tokenList[token].name}</h4>
                <span>{tokenList[token].symbol}</span>
              </div>
            </div>
          ))}
    </StyledInchModal>
  );
};
