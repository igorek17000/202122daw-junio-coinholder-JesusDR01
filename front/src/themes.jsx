import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#fff',
  fontColor: '#000',
  materialInputColor: '#c4c4c4',
  materialInputHover: 'black',
  paperShadow:
    '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  materialDisabled: 'rgba(0, 0, 0, 0.26)',
  iframeBackground: 'transparent',
};

export const darkTheme = {
  body: '#0f171e',
  fontColor: '#fff',
  materialInputColor: '#c4c4c4',
  materialInputHover: 'white',
  paperShadow:
    '0px 2px 1px -1px rgb(255 255 255 / 20%), 0px 1px 1px 0px rgb(255 255 255 / 14%), 0px 1px 3px 0px rgb(255 255 255 / 12%)',
  materialDisabled: 'rgb(255 255 255 / 47%)',
  iframeBackground: '#313c4b',
};

export const GlobalStyles = createGlobalStyle`
	header, #generic-layout, #portfolios-layout, ::placeholder, h1,label, input, ul, ul a, .MuiCheckbox-root, #total,
    #accordion-coin, .accordion,
     #portfolios-manager .MuiSelect-iconOutlined,
     #chain-selector,
     .accordion .MuiAccordionSummary-expandIconWrapper .MuiSvgIcon-root, 
     #transactions-table, #transactions-table td, #transactions-table th, .MuiTablePagination-root,
     #modal-content, #modal-content h2, #modal-content legend,
     .card-coin, #transaction-drawer .MuiPaper-root, .transaction-card, .transaction-card .actions, .transaction-card .actions button, 
     #transactions-pagination button, #address-wrapper, #binance-wrapper ,#kucoin-wrapper, p,h3, article, 
     #wallet-screen, #wallet-screen .wallet-card-content, #wallet-screen .input-wrapper span, #wallet-screen strong, #wallet-screen .ant-select-selector, .wallet-card-content div
     #transfer-btn, #notification-wallet, .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected, .ant-menu-item:active, .ant-menu-submenu-title:active, 
     #dex-screen, #dex-body, #dex-body .ant-card-body, #dex-body #select-coin,
     .select-provider-modal .ant-modal-body, .select-provider-modal .ant-modal-body h2, .select-provider-modal .ant-modal-body h4,
     .ant-select-dropdown, .asset-item, .ant-select-item-option-selected:not(.ant-select-item-option-disabled), .ant-select-item-option-active:not(.ant-select-item-option-disabled),
     .ant-modal-content , .ant-modal-header, .ant-modal-title, .token h4, .ant-card-body, .ant-card-meta-detail div, .ant-card-actions span, 
     #nft, #account, #coin-search-card, #search-icon, #profile-screen, #profile-screen h2, #no-coins, #no-coins h2 {
        background-color: ${({ theme }) => theme.body} !important;
        color: ${({ theme }) => theme.fontColor} !important;
	}
    .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected, #dex-body .ant-card-body, #action-button {
        box-shadow: ${({ theme }) => theme.paperShadow} !important;
    }
    .ant-menu-vertical{
        padding:10px !important;
    }
    #transactions-table .Mui-disabled{
        color: ${({ theme }) => theme.materialDisabled} !important;
    }
    iframe{
        background-color : ${({ theme }) => theme.iframeBackground} !important;
    }
    #action-button{
        &:disabled{
          background-color: ${({ theme }) => theme.materialDisabled} !important;
    }
    }
   .MuiOutlinedInput-root {
    color: ${({ theme }) => theme.fontColor} !important;
    & fieldset {
      border:1px solid ${({ theme }) => theme.materialInputColor} !important
    }
    &:hover fieldset {
      border:1px solid ${({ theme }) => theme.materialInputHover} !important
    }
    &.Mui-focused fieldset {
        border:2px solid ${({ theme }) => theme.materialInputHover} !important
    }
   }

   .MuiRadio-root{
         color: ${({ theme }) => theme.fontColor} !important;
   }
   #dex-body button{
         background-color: ${({ theme }) => theme.body} !important;
            color: ${({ theme }) => theme.fontColor} !important;
   }
   #basic-menu .Mui-disabled{
         color: ${({ theme }) => theme.materialDisabled} !important;
         border: 1px solid ${({ theme }) => theme.materialInputColor} !important;
   }
   
   .token:hover, #account, .MuiPaper-root, #coin-search-card:hover, #coins > div:first-child, .ant-menu-vertical li:hover, #user-menu li:hover, #profile-screen, #no-coins{
    box-shadow: ${({ theme }) => theme.paperShadow} !important;
   }

   #coin-search-card{
       border: 1px solid ${({ theme }) => theme.materialInputColor} !important;
   }

   ::-webkit-scrollbar-thumb {
    background-color: #57ffff;
    border: 5px solid transparent;
    border-radius: 11px;
    background-clip: content-box;
}

::-webkit-scrollbar {
    width: 18px;
}

::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.body} !important;
}

`;
