import { Menu } from 'antd';
import React from 'react';
import { StyledChainsMenu } from './ChainsMenu.styled';

export const ChainsMenu = ({ handleMenuClick, menuItems }) => {
  
  return (
    <StyledChainsMenu  onClick={handleMenuClick}>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} className="item">
          <span className="item-value">{item.value}</span>
        </Menu.Item>
      ))}
    </StyledChainsMenu>
  );
};
