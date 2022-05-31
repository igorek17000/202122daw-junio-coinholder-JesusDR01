import { Menu } from 'antd';
import { useGetExistingPortfoliosQuery } from 'app/services/account';
import { useAuth } from 'hooks/auth/useAuth';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { StyledNav } from './Nav.styled';

function Nav() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isAuthenticated = useAuth()?.user?.token;
  const { data } = useGetExistingPortfoliosQuery(null, {
    skip: !isAuthenticated,
  });
  const showImport = isAuthenticated;

  const items = [
    {
      label: <Link to="/wallet">👛 {t('nav.wallet')}</Link>,
      key: '/wallet',
    },
    {
      label: <Link to="/1inch">🏦 Dex</Link>,
      key: '/1inch',
    },
    {
      label: <Link to="/onramp">💵 Fiat</Link>,
      key: 'onramp',
    },
    {
      label: <Link to="/nftBalance">🖼 NFTs</Link>,
      key: 'nftBalance',
    },
    {
      label: <Link to="/faq">💭❓FAQ</Link>,
      key: '/faq',
    },
  ];

  if (isAuthenticated){
    items.unshift(
      ...[
        {
          label: <Link to="/">📊Portfolios</Link>,
          key: '/',
        }, // remember to pass the key prop
        {
          label: <Link to="/import">📲{t('nav.import')}</Link>,
          key: '/import',
        },
      ],
    );
  }
  return (
    <StyledNav
      items={items}
      id="nav"
      mode="horizontal"
      triggerSubMenuAction="click"
      selectedKeys={[pathname]}
    >
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
      <Menu.Item key="/nftBalance">
        <Link to="/nftBalance">🖼 NFTs</Link>
      </Menu.Item>
      <Menu.Item key="/faq">
        <Link to="/faq">💭❓FAQ</Link>
      </Menu.Item>
      <Menu.Item key="/about">
        <Link to="/about">🏢{t('nav.about')}</Link>
      </Menu.Item>
    </StyledNav>
  );
}

export default Nav;
