(self.webpackChunkcoinholder=self.webpackChunkcoinholder||[]).push([[45,321],{93378:function(t,e,n){"use strict";n.r(e),n.d(e,{WalletConnectV1Adapter:function(){return C}});var r=n(15861),i=n(15671),a=n(43144),o=n(97326),c=n(11752),s=n(61120),u=n(60136),h=n(29388),d=n(87757),l=n.n(d),p=n(4942),f=n(73678),v=n(37949),w=n(19256),y=[{name:"Rainbow",chains:[v.EN.EIP155],logo:"https://images.web3auth.io/login-rainbow.svg",mobile:{native:"rainbow:",universal:"https://rnbwapp.com"},desktop:{native:"",universal:""}},{name:"MetaMask",chains:[v.EN.EIP155],logo:"https://images.web3auth.io/login-metamask.svg",mobile:{native:"metamask:",universal:"https://metamask.app.link"},desktop:{native:"",universal:""}}];function k(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function g(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?k(Object(n),!0).forEach((function(e){(0,p.Z)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var C=function(t){(0,u.Z)(n,t);var e=(0,h.Z)(n);function n(){var t;(0,i.Z)(this,n);var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return t=e.call(this),(0,p.Z)((0,o.Z)(t),"name",v.rW.WALLET_CONNECT_V1),(0,p.Z)((0,o.Z)(t),"adapterNamespace",v.yk.EIP155),(0,p.Z)((0,o.Z)(t),"currentChainNamespace",v.EN.EIP155),(0,p.Z)((0,o.Z)(t),"type",v.hN.EXTERNAL),(0,p.Z)((0,o.Z)(t),"adapterOptions",void 0),(0,p.Z)((0,o.Z)(t),"status",v.MP.NOT_READY),(0,p.Z)((0,o.Z)(t),"adapterData",{uri:"",extensionAdapters:y}),(0,p.Z)((0,o.Z)(t),"connector",null),(0,p.Z)((0,o.Z)(t),"wcProvider",null),(0,p.Z)((0,o.Z)(t),"rehydrated",!1),t.adapterOptions=g({},r),t.chainConfig=r.chainConfig||null,t}return(0,a.Z)(n,[{key:"connected",get:function(){var t;return!(null===(t=this.connector)||void 0===t||!t.connected)}},{key:"provider",get:function(){var t;return(null===(t=this.wcProvider)||void 0===t?void 0:t.provider)||null},set:function(t){throw new Error("Not implemented")}},{key:"init",value:function(){var t=(0,r.Z)(l().mark((function t(){return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if((0,c.Z)((0,s.Z)(n.prototype),"checkInitializationRequirements",this).call(this),this.chainConfig||(this.chainConfig=(0,v.h2)(v.EN.EIP155,1)),this.connector=this.getWalletConnectInstance(),this.wcProvider=new w.WalletConnectProvider({config:{chainConfig:this.chainConfig},connector:this.connector}),this.emit(v.n2.READY,v.rW.WALLET_CONNECT_V1),this.status=v.MP.READY,v.cM.debug("initializing wallet connect v1 adapter"),!this.connector.connected){t.next=11;break}return this.rehydrated=!0,t.next=11,this.onConnectHandler({accounts:this.connector.accounts,chainId:this.connector.chainId});case 11:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"connect",value:function(){var t=(0,r.Z)(l().mark((function t(){var e,i,a=this;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if((0,c.Z)((0,s.Z)(n.prototype),"checkConnectionRequirements",this).call(this),this.connector){t.next=3;break}throw v.Ty.notReady("Wallet adapter is not ready yet");case 3:if(!this.connected){t.next=7;break}return t.next=6,this.onConnectHandler({accounts:this.connector.accounts,chainId:this.connector.chainId});case 6:return t.abrupt("return",this.provider);case 7:if(this.status===v.MP.CONNECTING){t.next=13;break}return null!==(e=this.adapterOptions.adapterSettings)&&void 0!==e&&e.qrcodeModal&&(this.connector=this.getWalletConnectInstance(),this.wcProvider=new w.WalletConnectProvider({config:{chainConfig:this.chainConfig,skipLookupNetwork:null===(i=this.adapterOptions.adapterSettings)||void 0===i?void 0:i.skipNetworkSwitching},connector:this.connector})),t.next=11,this.createNewSession();case 11:this.status=v.MP.CONNECTING,this.emit(v.n2.CONNECTING,{adapter:v.rW.WALLET_CONNECT_V1});case 13:return t.abrupt("return",new Promise((function(t,e){if(!a.connector)return e(v.Ty.notReady("Wallet adapter is not ready yet"));a.connector.on("modal_closed",(0,r.Z)(l().mark((function t(){return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.status=v.MP.READY,a.emit(v.n2.READY,v.rW.WALLET_CONNECT_V1),t.abrupt("return",e(new Error("User closed modal")));case 3:case"end":return t.stop()}}),t)}))));try{a.connector.on("connect",function(){var e=(0,r.Z)(l().mark((function e(n,r){return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n&&a.emit(v.n2.ERRORED,n),v.cM.debug("connected event emitted by web3auth"),e.next=4,a.onConnectHandler(r.params[0]);case 4:return e.abrupt("return",t(a.provider));case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}())}catch(n){v.cM.error("Wallet connect v1 adapter error while connecting",n),a.status=v.MP.READY,a.rehydrated=!0,a.emit(v.n2.ERRORED,n),e(n instanceof v.up?n:v.RM.connectionError("Failed to login with wallet connect: ".concat((null===n||void 0===n?void 0:n.message)||"")))}})));case 14:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"getUserInfo",value:function(){var t=(0,r.Z)(l().mark((function t(){return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.connected){t.next=2;break}throw v.RM.notConnectedError("Not connected with wallet, Please login/connect first");case 2:return t.abrupt("return",{});case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"disconnect",value:function(){var t=(0,r.Z)(l().mark((function t(){var e,n,r=arguments;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=r.length>0&&void 0!==r[0]?r[0]:{cleanup:!1},n=e.cleanup,this.connector&&this.connected){t.next=4;break}throw v.RM.notConnectedError("Not connected with wallet");case 4:return t.next=6,this.connector.killSession();case 6:this.rehydrated=!1,n?(this.connector=null,this.status=v.MP.NOT_READY,this.wcProvider=null):this.status=v.MP.READY,this.emit(v.n2.DISCONNECTED);case 9:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"addChain",value:function(){var t=(0,r.Z)(l().mark((function t(e){var n,r;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,this.wcProvider){t.next=3;break}throw v.Ty.notReady("Wallet adapter is not ready yet");case 3:if(!(r=null===(n=this.adapterOptions.adapterSettings)||void 0===n?void 0:n.networkSwitchModal)){t.next=7;break}return t.next=7,r.addNetwork({chainConfig:e,appOrigin:window.location.hostname});case 7:return t.next=9,this.wcProvider.addChain(e);case 9:t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),v.cM.error(t.t0);case 14:case"end":return t.stop()}}),t,this,[[0,11]])})));return function(e){return t.apply(this,arguments)}}()},{key:"switchChain",value:function(){var t=(0,r.Z)(l().mark((function t(e,n){var r,i;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.wcProvider){t.next=2;break}throw v.Ty.notReady("Wallet adapter is not ready yet");case 2:if(!(i=null===(r=this.adapterOptions.adapterSettings)||void 0===r?void 0:r.networkSwitchModal)){t.next=6;break}return t.next=6,i.switchNetwork({currentChainConfig:n,newChainConfig:e,appOrigin:window.location.hostname});case 6:return t.next=8,this.wcProvider.switchChain({chainId:n.chainId,lookup:!1,addChain:!1});case 8:case"end":return t.stop()}}),t,this)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"createNewSession",value:function(){var t=(0,r.Z)(l().mark((function t(){var e,n,i,a,o=this,c=arguments;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(i=c.length>0&&void 0!==c[0]?c[0]:{forceNewSession:!1},this.connector){t.next=3;break}throw v.Ty.notReady("Wallet adapter is not ready yet");case 3:if(!i.forceNewSession||!this.connector.pending){t.next=6;break}return t.next=6,this.connector.killSession();case 6:if(null===(e=this.adapterOptions)||void 0===e||null===(n=e.adapterSettings)||void 0===n||!n.qrcodeModal){t.next=10;break}return t.next=9,this.connector.createSession({chainId:parseInt((null===(a=this.chainConfig)||void 0===a?void 0:a.chainId)||"0x1",16)});case 9:return t.abrupt("return");case 10:return t.abrupt("return",new Promise((function(t,e){var n;if(!o.connector)return e(v.Ty.notReady("Wallet adapter is not ready yet"));v.cM.debug("creating new session for web3auth wallet connect"),o.connector.on("display_uri",function(){var n=(0,r.Z)(l().mark((function n(r,i){var a,c;return l().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!r){n.next=3;break}return o.emit(v.n2.ERRORED,v.RM.connectionError("Failed to display wallet connect qr code")),n.abrupt("return",e(r));case 3:return c=i.params[0],o.updateAdapterData({uri:c,extensionAdapters:y}),null===(a=o.connector)||void 0===a||a.off("display_uri"),n.abrupt("return",t());case 7:case"end":return n.stop()}}),n)})));return function(t,e){return n.apply(this,arguments)}}()),o.connector.createSession({chainId:parseInt((null===(n=o.chainConfig)||void 0===n?void 0:n.chainId)||"0x1",16)}).catch((function(t){return v.cM.error("error while creating new wallet connect session",t),o.emit(v.n2.ERRORED,t),e(t)}))})));case 11:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"onConnectHandler",value:function(){var t=(0,r.Z)(l().mark((function t(e){var n,r,i,a,o,c;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.connector&&this.wcProvider){t.next=2;break}throw v.Ty.notReady("Wallet adapter is not ready yet");case 2:if(this.chainConfig){t.next=4;break}throw v.Ty.invalidParams("Chain config is not set");case 4:if(n=e.chainId,v.cM.debug("connected chainId in hex"),n===parseInt(this.chainConfig.chainId,16)){t.next=27;break}if(o=(0,v.h2)(v.EN.EIP155,n)||{chainId:"0x".concat(n.toString(16)),displayName:"Unknown Network"},(c=null===(r=this.adapterOptions.adapterSettings)||void 0===r?void 0:r.qrcodeModal)&&(!c||null!==(i=this.adapterOptions)&&void 0!==i&&null!==(a=i.adapterSettings)&&void 0!==a&&a.skipNetworkSwitching)){t.next=27;break}return t.prev=10,t.next=13,this.addChain(this.chainConfig);case 13:return t.next=15,this.switchChain(o,this.chainConfig);case 15:this.connector=this.getWalletConnectInstance(),t.next=27;break;case 18:return t.prev=18,t.t0=t.catch(10),v.cM.error("error while chain switching",t.t0),t.next=23,this.createNewSession({forceNewSession:!0});case 23:return this.emit(v.n2.ERRORED,v.Ty.fromCode(5e3,"Not connected to correct network. Expected: ".concat(this.chainConfig.displayName,", Current: ").concat((null===o||void 0===o?void 0:o.displayName)||n,", Please switch to correct network from wallet"))),this.status=v.MP.READY,this.rehydrated=!0,t.abrupt("return");case 27:return t.next=29,this.wcProvider.setupProvider(this.connector);case 29:this.subscribeEvents(this.connector),this.status=v.MP.CONNECTED,this.emit(v.n2.CONNECTED,{adapter:v.rW.WALLET_CONNECT_V1,reconnected:this.rehydrated});case 32:case"end":return t.stop()}}),t,this,[[10,18]])})));return function(e){return t.apply(this,arguments)}}()},{key:"subscribeEvents",value:function(t){var e=this;t.on("session_update",function(){var t=(0,r.Z)(l().mark((function t(n){return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n&&e.emit(v.n2.ERRORED,n);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}},{key:"getWalletConnectInstance",value:function(){var t=this.adapterOptions.adapterSettings||{};return t.bridge=t.bridge||"https://bridge.walletconnect.org",new f.Z(t)}}]),n}(v.J5)},62859:function(){},75304:function(){},64123:function(){},29704:function(){},88924:function(){},55024:function(){}}]);
//# sourceMappingURL=45.1882d39a.chunk.js.map