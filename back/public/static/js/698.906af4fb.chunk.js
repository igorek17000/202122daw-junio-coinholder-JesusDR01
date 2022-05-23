(self.webpackChunkcoinholder=self.webpackChunkcoinholder||[]).push([[698],{34773:function(n,e,t){"use strict";t.r(e),t.d(e,{OpenloginAdapter:function(){return E},getOpenloginDefaultOptions:function(){return y}});var i=t(15861),r=t(15671),o=t(43144),a=t(97326),s=t(11752),c=t(61120),h=t(60136),p=t(29388),l=t(87757),u=t.n(l),g=t(41163),d=t(37949),f=t(4942),v=t(63087),C=t(57381),N=t.n(C),y=function(n,e){return{adapterSettings:{network:g.dr.MAINNET,clientId:"",uxMode:g.$e.POPUP},chainConfig:n?(0,d.h2)(n,e):null,loginSettings:{relogin:!0}}};function O(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,i)}return t}function P(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?O(Object(t),!0).forEach((function(e){(0,f.Z)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):O(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}var E=function(n){(0,h.Z)(l,n);var e=(0,p.Z)(l);function l(n){var t,i,o,s;(0,r.Z)(this,l),t=e.call(this),(0,f.Z)((0,a.Z)(t),"name",d.rW.OPENLOGIN),(0,f.Z)((0,a.Z)(t),"adapterNamespace",d.yk.MULTICHAIN),(0,f.Z)((0,a.Z)(t),"type",d.hN.IN_APP),(0,f.Z)((0,a.Z)(t),"openloginInstance",null),(0,f.Z)((0,a.Z)(t),"status",d.MP.NOT_READY),(0,f.Z)((0,a.Z)(t),"currentChainNamespace",d.EN.EIP155),(0,f.Z)((0,a.Z)(t),"openloginOptions",void 0),(0,f.Z)((0,a.Z)(t),"loginSettings",{}),(0,f.Z)((0,a.Z)(t),"privKeyProvider",null),d.cM.debug("const openlogin adapter",n);var c=y(null===(i=n.chainConfig)||void 0===i?void 0:i.chainNamespace,null===(o=n.chainConfig)||void 0===o?void 0:o.chainId);if(t.openloginOptions=P(P({clientId:"",network:g.dr.MAINNET},c.adapterSettings),n.adapterSettings||{}),t.loginSettings=P(P({},c.loginSettings),n.loginSettings),null!==(s=n.chainConfig)&&void 0!==s&&s.chainNamespace){var h;t.currentChainNamespace=null===(h=n.chainConfig)||void 0===h?void 0:h.chainNamespace;var p=c.chainConfig?c.chainConfig:{};if(t.chainConfig=P(P({},p),null===n||void 0===n?void 0:n.chainConfig),d.cM.debug("const openlogin chainConfig",t.chainConfig),!t.chainConfig.rpcTarget)throw d.Ty.invalidParams("rpcTarget is required in chainConfig")}return t}return(0,o.Z)(l,[{key:"chainConfigProxy",get:function(){return this.chainConfig?P({},this.chainConfig):null}},{key:"provider",get:function(){var n;return(null===(n=this.privKeyProvider)||void 0===n?void 0:n.provider)||null},set:function(n){throw new Error("Not implemented")}},{key:"init",value:function(){var n=(0,i.Z)(u().mark((function n(e){var t,i,r;return u().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if((0,s.Z)((0,c.Z)(l.prototype),"checkInitializationRequirements",this).call(this),null!==(t=this.openloginOptions)&&void 0!==t&&t.clientId){n.next=3;break}throw d.Ty.invalidParams("clientId is required before openlogin's initialization");case 3:if(this.chainConfig||this.currentChainNamespace===d.EN.OTHER){n.next=5;break}throw d.Ty.invalidParams("chainConfig is required before initialization");case 5:return i=!1,this.openloginOptions.uxMode===g.$e.REDIRECT&&(r=(0,g.Gv)(),Object.keys(r).length>0&&r._pid&&(i=!0)),this.openloginOptions=P(P({},this.openloginOptions),{},{replaceUrlOnRedirect:i}),this.openloginInstance=new g.ZP(this.openloginOptions),d.cM.debug("initializing openlogin adapter init"),n.next=12,this.openloginInstance.init();case 12:if(this.status=d.MP.READY,this.emit(d.n2.READY,d.rW.OPENLOGIN),n.prev=14,d.cM.debug("initializing openlogin adapter"),!this.openloginInstance.privKey||!e.autoConnect&&!i){n.next=19;break}return n.next=19,this.connect();case 19:n.next=25;break;case 21:n.prev=21,n.t0=n.catch(14),d.cM.error("Failed to connect with cached openlogin provider",n.t0),this.emit("ERRORED",n.t0);case 25:case"end":return n.stop()}}),n,this,[[14,21]])})));return function(e){return n.apply(this,arguments)}}()},{key:"connect",value:function(){var n=(0,i.Z)(u().mark((function n(e){return u().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return(0,s.Z)((0,c.Z)(l.prototype),"checkConnectionRequirements",this).call(this),this.status=d.MP.CONNECTING,this.emit(d.n2.CONNECTING,P(P({},e),{},{adapter:d.rW.OPENLOGIN})),n.prev=3,n.next=6,this.connectWithProvider(e);case 6:return n.abrupt("return",this.provider);case 9:if(n.prev=9,n.t0=n.catch(3),d.cM.error("Failed to connect with openlogin provider",n.t0),this.status=d.MP.READY,this.emit(d.n2.ERRORED,n.t0),null===n.t0||void 0===n.t0||!n.t0.message.includes("user closed popup")){n.next=16;break}throw d.RM.popupClosed();case 16:throw d.RM.connectionError("Failed to login with openlogin");case 17:case"end":return n.stop()}}),n,this,[[3,9]])})));return function(e){return n.apply(this,arguments)}}()},{key:"disconnect",value:function(){var n=(0,i.Z)(u().mark((function n(){var e,t=arguments;return u().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(e=t.length>0&&void 0!==t[0]?t[0]:{cleanup:!1},this.status===d.MP.CONNECTED){n.next=3;break}throw d.RM.notConnectedError("Not connected with wallet");case 3:if(this.openloginInstance){n.next=5;break}throw d.Ty.notReady("openloginInstance is not ready");case 5:return n.next=7,this.openloginInstance.logout();case 7:e.cleanup?(this.status=d.MP.NOT_READY,this.openloginInstance=null,this.privKeyProvider=null):this.status=d.MP.READY,this.emit(d.n2.DISCONNECTED);case 9:case"end":return n.stop()}}),n,this)})));return function(){return n.apply(this,arguments)}}()},{key:"getUserInfo",value:function(){var n=(0,i.Z)(u().mark((function n(){var e;return u().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(this.status===d.MP.CONNECTED){n.next=2;break}throw d.RM.notConnectedError("Not connected with wallet");case 2:if(this.openloginInstance){n.next=4;break}throw d.Ty.notReady("openloginInstance is not ready");case 4:return n.next=6,this.openloginInstance.getUserInfo();case 6:return e=n.sent,n.abrupt("return",e);case 8:case"end":return n.stop()}}),n,this)})));return function(){return n.apply(this,arguments)}}()},{key:"setAdapterSettings",value:function(n){if(this.status!==d.MP.READY){var e=y();this.openloginOptions=P(P(P({},e.adapterSettings),this.openloginOptions||{}),n)}}},{key:"setChainConfig",value:function(n){(0,s.Z)((0,c.Z)(l.prototype),"setChainConfig",this).call(this,n),this.currentChainNamespace=n.chainNamespace}},{key:"connectWithProvider",value:function(){var n=(0,i.Z)(u().mark((function n(e){var i,r,o,a,s,c,h,p;return u().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(this.chainConfig){n.next=2;break}throw d.Ty.invalidParams("chainConfig is required before initialization");case 2:if(this.openloginInstance){n.next=4;break}throw d.Ty.notReady("openloginInstance is not ready");case 4:if(this.currentChainNamespace!==d.EN.SOLANA){n.next=12;break}return n.next=7,Promise.all([t.e(826),t.e(201),t.e(823),t.e(450)]).then(t.bind(t,63823));case 7:i=n.sent,r=i.SolanaPrivateKeyProvider,this.privKeyProvider=new r({config:{chainConfig:this.chainConfig}}),n.next=25;break;case 12:if(this.currentChainNamespace!==d.EN.EIP155){n.next=20;break}return n.next=15,Promise.all([t.e(826),t.e(256),t.e(321)]).then(t.bind(t,19256));case 15:o=n.sent,a=o.EthereumPrivateKeyProvider,this.privKeyProvider=new a({config:{chainConfig:this.chainConfig}}),n.next=25;break;case 20:if(this.currentChainNamespace!==d.EN.OTHER){n.next=24;break}this.privKeyProvider=new v.FL,n.next=25;break;case 24:throw new Error("Invalid chainNamespace: ".concat(this.currentChainNamespace," found while connecting to wallet"));case 25:if(this.openloginInstance.privKey||!e){n.next=28;break}return n.next=28,this.openloginInstance.login(N()(this.loginSettings,{loginProvider:e.loginProvider},{extraLoginOptions:P(P({},e.extraLoginOptions||{}),{},{login_hint:e.login_hint||(null===(s=e.extraLoginOptions)||void 0===s?void 0:s.login_hint)})}));case 28:if(!(c=this.openloginInstance.privKey)){n.next=40;break}if(this.currentChainNamespace!==d.EN.SOLANA){n.next=36;break}return n.next=33,Promise.all([t.e(201),t.e(921)]).then(t.bind(t,84656));case 33:h=n.sent,p=h.getED25519Key,c=p(c).sk.toString("hex");case 36:return n.next=38,this.privKeyProvider.setupProvider(c);case 38:this.status=d.MP.CONNECTED,this.emit(d.n2.CONNECTED,{adapter:d.rW.OPENLOGIN,reconnected:!e});case 40:case"end":return n.stop()}}),n,this)})));return function(e){return n.apply(this,arguments)}}()}]),l}(d.J5)},64123:function(){}}]);
//# sourceMappingURL=698.906af4fb.chunk.js.map