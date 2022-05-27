import React from 'react';
import { Tabs } from 'antd';
import { StyledDexScreen } from './DexScreen.styled';
import { DEX } from 'components/DEX/DEX';
export const DexScreen = () => {
  return (
    <StyledDexScreen id="dex-screen" defaultActiveKey="1">
      <Tabs.TabPane tab={<span>Ethereum</span>} key="1">
        <DEX chain="eth" />
      </Tabs.TabPane>
      <Tabs.TabPane tab={<span>Binance Smart Chain</span>} key="2">
        <DEX chain="bsc" />
      </Tabs.TabPane>
      <Tabs.TabPane tab={<span>Polygon</span>} key="3">
        <DEX chain="polygon" />
      </Tabs.TabPane>
    </StyledDexScreen>
  );
};
