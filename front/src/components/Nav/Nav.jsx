import { Menu } from 'antd';
import { useGetExistingPortfoliosQuery } from 'app/services/account';
import { useAuth } from 'hooks/auth/useAuth';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { StyledNav } from './Nav.styled';

function Nav() {
  const {t} = useTranslation();
  const { pathname } = useLocation();
  const isAuthenticated = useAuth()?.user?.token;
  const { data } = useGetExistingPortfoliosQuery(null,{
    skip: !isAuthenticated,
  });
  const showImport = isAuthenticated;
  
  return (
    <StyledNav  id="nav" mode="horizontal" defaultSelectedKeys={[pathname]}>
      {isAuthenticated && (
        <>
          <Menu.Item key="/">
            <Link to="/">📊Portfolios</Link>
          </Menu.Item>

          {showImport && (
            <Menu.Item key="/import">
              <Link to="/import">📲{t('nav.import')}</Link>
            </Menu.Item>
          )}
        </>
      )}
      <Menu.Item key="/wallet">
        <Link to="/wallet">👛 {t('nav.wallet')}</Link>
      </Menu.Item>
      <Menu.Item key="/1inch">
        <Link to="/1inch">🏦 Dex</Link>
      </Menu.Item>
      <Menu.Item key="onramp">
        <Link to="/onramp">💵 Fiat</Link>
      </Menu.Item>
      <Menu.Item key="/erc20balance">
        <Link to="/erc20balance">💰 Balances</Link>
      </Menu.Item>
      <Menu.Item key="/erc20transfers">
        <Link to="/erc20transfers">💸 {t('nav.transfers')}</Link>
      </Menu.Item>
      <Menu.Item key="/nftBalance">
        <Link to="/nftBalance">🖼 NFTs</Link>
      </Menu.Item>
    </StyledNav>
  );
}

export default Nav;
