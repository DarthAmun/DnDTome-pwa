(this.webpackJsonpdndtome=this.webpackJsonpdndtome||[]).push([[57],{119:function(e,t,n){"use strict";var r=n(4),o=n(1),a=n.n(o),i=n(6),l=n(3);function c(){var e=Object(r.a)([""]);return c=function(){return e},e}function s(){var e=Object(r.a)(["\n  margin: 30px;\n  width: 100px;\n  height: 100px;\n  border: 2px double ",';\n  transform: rotate(45deg);\n  overflow: hidden;\n\n  &::before {\n    content: "";\n    position: absolute;\n    width: 200%;\n    height: 200%;\n    top: -50%;\n    left: -50%;\n    z-index: -1;\n    background: url(',") 0 0 no-repeat;\n    background-size: cover;\n    transform: rotate(-45deg);\n  }\n"]);return s=function(){return e},e}function u(){var e=Object(r.a)(["\n  &:nth-child(odd) {\n    margin: 0 5px 5px 0;\n  }\n}\n"]);return u=function(){return e},e}function h(){var e=Object(r.a)(["\n  height: 12px;\n  margin: 0 5px 0 0;\n  flex: 1 1 auto;\n  line-height: 10px;\n  padding: 10px;\n  font-size: 12px;\n  border-radius: 5px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n\n  svg {\n    margin-right: 5px;\n    height: auto;\n    border-radius: 150px;\n    transition: color 0.2s;\n    color: ",";\n  }\n}\n"]);return h=function(){return e},e}function p(){var e=Object(r.a)(["\n  flex-wrap: nowrap;\n  padding: 0 0 5px 0;\n  flex: 1 1 auto;\n  width: 100%;\n  border-bottom: 1px solid ",";\n"]);return p=function(){return e},e}function f(){var e=Object(r.a)(["\n  height: auto;\n  flex: 1 1 auto;\n  padding: 5px 5px 0 5px;\n  display: flex;\n  flex-wrap: wrap;\n"]);return f=function(){return e},e}function d(){var e=Object(r.a)(["\n  height: auto;\n  flex: 1 1 auto;\n  padding: 10px;\n  margin: 5px 5px 5px 0;\n  font-size: 14px;\n  text-align: center;\n  border-radius: 5px;\n"]);return d=function(){return e},e}function m(){var e=Object(r.a)(["\n  flex: 1 1 15em;\n  color: ",";\n  background-color: ",";\n  margin: 0.5em;\n  border-radius: 10px;\n  box-shadow: ",";\n  overflow: hidden;\n  cursor: pointer;\n  text-decoration: none;\n\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n  align-content: center;\n"]);return m=function(){return e},e}t.a=function(e){var t=e.char,n=Object(o.useCallback)((function(){return void 0!==t?""===t.pic||null===t.pic?"":t.pic:""}),[t]),r=Object(o.useCallback)((function(){var e=0;return t.classes.forEach((function(t){e+=t.level})),e}),[t]);return a.a.createElement(b,{to:"/char-detail/id/"+t.id},""!==n()?a.a.createElement(O,{pic:n()}):"",a.a.createElement(v,null,a.a.createElement(g,null,a.a.createElement("b",null,t.name)),t.campaign&&a.a.createElement(g,null,t.campaign),a.a.createElement(E,null,a.a.createElement(x,null,r()),a.a.createElement(x,null,t.player),a.a.createElement(x,null,t.race.race),a.a.createElement(x,null,t.race.subrace)),t.classes&&t.classes.map((function(e,t){return a.a.createElement(E,{key:t},a.a.createElement(x,null,e.level),a.a.createElement(x,null,e.classe),a.a.createElement(x,null,e.subclasse))})),a.a.createElement(w,null,t.background),a.a.createElement(w,null,t.alignment)))};var b=Object(l.b)(i.b)(m(),(function(e){return e.theme.tile.color}),(function(e){return e.theme.tile.backgroundColor}),(function(e){return e.theme.tile.boxShadow})),g=l.b.div(d()),v=l.b.div(f()),E=Object(l.b)(v)(p(),(function(e){return e.theme.main.backgroundColor})),x=l.b.div(h(),(function(e){return e.theme.main.highlight})),w=Object(l.b)(x)(u()),O=function(e){var t=e.pic;return""!==t?a.a.createElement(y,{pic:t}):a.a.createElement(j,null)},y=l.b.div(s(),(function(e){return e.theme.main.highlight}),(function(e){return e.pic})),j=l.b.div(c())},59:function(e,t,n){"use strict";var r=n(4),o=n(1),a=n.n(o),i=n(3),l=n(13);function c(){var e=Object(r.a)(["\n  flex: 1 1 auto;\n"]);return c=function(){return e},e}function s(){var e=Object(r.a)(["\n  color: ",";\n  background-color: ",";\n  cursor: not-allowed;\n"]);return s=function(){return e},e}function u(){var e=Object(r.a)(["\n  color: ",";\n  background-color: ",";\n  cursor: pointer;\n\n  font-size: 16px;\n  overflow: hidden;\n  height: ",";\n  line-height: ",";\n  float: ",";\n  padding: 10px;\n  margin: 5px;\n  border-radius: 10px;\n  box-shadow: inset -2px -2px 5px 0px rgba(0, 0, 0, 0.3);\n\n  transition: color 0.2s;\n\n  &:hover {\n    color: white;\n  }\n\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n"]);return u=function(){return e},e}t.a=function(e){var t=e.icon,n=e.floatLeft,r=e.disabled,o=e.transform,i=e.onClick;return a.a.createElement(a.a.Fragment,null,!r&&a.a.createElement(h,{left:n,onClick:i},a.a.createElement(f,{icon:t,transform:o})),r&&a.a.createElement(p,null,a.a.createElement(f,{icon:t,transform:o})))};var h=i.b.div(u(),(function(e){return e.theme.buttons.color}),(function(e){return e.theme.buttons.backgroundColor}),(function(e){return e.theme.buttons.height}),(function(e){return e.theme.buttons.height}),(function(e){return e.left?"left":"right"})),p=Object(i.b)(h)(s(),(function(e){return e.theme.buttons.backgroundColor}),(function(e){return e.theme.buttons.color})),f=Object(i.b)(l.a)(c())},65:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(21);var o=n(31);function a(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(o.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},712:function(e,t,n){"use strict";n.r(t);var r=n(4),o=n(16),a=n(1),i=n.n(a),l=n(3),c=n(28),s=n(119),u=n(27),h=n(65),p=n(2),f=n(78),d=n(29),m=n.n(d),b=n(9),g=n(13),v=n(59),E=n(89),x=n(58),w=n(7),O=function(e){var t=e.onSend,n=Object(a.useState)(!1),r=Object(o.a)(n,2),l=r[0],c=r[1],s=Object(a.useState)([]),d=Object(o.a)(s,2),O=d[0],y=d[1],j=Object(p.f)(),T=Object(a.useState)(""),S=Object(o.a)(T,2),k=S[0],C=S[1],_=Object(a.useState)(""),L=Object(o.a)(_,2),D=L[0],M=L[1],Y=Object(a.useState)(""),R=Object(o.a)(Y,2),A=R[0],H=R[1],N=Object(a.useState)({name:"",label:"",sort:0}),F=Object(o.a)(N,2),P=F[0],B=F[1];return i.a.createElement(i.a.Fragment,null,i.a.createElement(w.e,{open:l},i.a.createElement(E.a,{value:k,sort:P,field:"name",label:"Name",onChange:function(e,t){C(e),B(t)}}),i.a.createElement(E.a,{value:D,sort:P,field:"campaign",label:"Campaign",onChange:function(e,t){M(e),B(t)}}),i.a.createElement(E.a,{value:A,sort:P,field:"sources",label:"Sources",icon:b.H,onChange:function(e,t){H(e),B(t)}}),i.a.createElement(v.a,{onClick:function(){return function(){var e=[];""!==k&&(e=[].concat(Object(h.a)(e),[new f.a("name",k)])),""!==D&&(e=[].concat(Object(h.a)(e),[new f.a("campaign",D)])),""!==A&&(e=[].concat(Object(h.a)(e),[new f.a("sources",A)])),e=e.map((function(e){return P.name===e.fieldName?Object(u.a)(Object(u.a)({},e),{},{sort:P.sort}):e})),y(e),c(!1),t(e)}()},icon:b.W}),i.a.createElement(v.a,{onClick:function(){return m.a.unstable_batchedUpdates((function(){C(""),M(""),H(""),c(!1),B({name:"",label:"",sort:0})})),void t([])},icon:b.T}),i.a.createElement(w.h,{onClick:function(){return c(!l)}},i.a.createElement(g.a,{icon:b.W}))),i.a.createElement(w.b,{onClick:function(){j.push("/char-lab")}},i.a.createElement(g.a,{icon:b.Q}),i.a.createElement(w.f,null,"Add new")),i.a.createElement(w.c,{onClick:function(){Object(x.d)("chars",O,"DnDTome_filtered_chars.json")}},i.a.createElement(g.a,{icon:b.x}),i.a.createElement(w.f,null,"Export filtered")))},y=n(82);function j(){var e=Object(r.a)(["\n  margin-top: 20px;\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  align-content: flex-start;\n"]);return j=function(){return e},e}t.default=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],r=t[1],l=Object(a.useState)([]),u=Object(o.a)(l,2),h=u[0],p=u[1],f=Object(a.useState)([]),d=Object(o.a)(f,2),m=d[0],b=d[1],g=Object(a.useState)({start:100,end:120,hasMore:!0}),v=Object(o.a)(g,2),E=v[0],w=v[1];Object(a.useEffect)((function(){Object(x.f)("chars",n,(function(e){p(e),b(e.slice(0,100)),0===e.length&&w({start:0,end:0,hasMore:!1})}))}),[n]);return i.a.createElement(i.a.Fragment,null,i.a.createElement(O,{onSend:function(e){return r(e)}}),i.a.createElement("div",{id:"scrollable",style:{width:"100%"}},i.a.createElement(T,{dataLength:m.length,next:function(){m.length!==h.length?(b((function(e){return e.concat(h.slice(E.start,E.end))})),w({start:E.start+20,end:E.end+20,hasMore:!0})):w({start:E.start+20,end:E.end+20,hasMore:!1})},hasMore:E.hasMore,loader:i.a.createElement(c.b,null)},m.map((function(e,t){return i.a.createElement(s.a,{key:t,char:e})})))))};var T=Object(l.b)(y.a)(j())},78:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(60),o=function e(t,n,o){Object(r.a)(this,e),this.fieldName=void 0,this.value=void 0,this.sort=void 0,this.fieldName=t,this.value=n,this.sort=o||0}},82:function(e,t,n){"use strict";var r=n(1),o=n.n(r),a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};var i=function(){return(i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};var l="Pixel",c="Percent",s={unit:c,value:.8};function u(e){return"number"===typeof e?{unit:c,value:100*e}:"string"===typeof e?e.match(/^(\d*(\.\d+)?)px$/)?{unit:l,value:parseFloat(e)}:e.match(/^(\d*(\.\d+)?)%$/)?{unit:c,value:parseFloat(e)}:(console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...'),s):(console.warn("scrollThreshold should be string or number"),s)}var h=function(e){function t(t){var n=e.call(this,t)||this;return n.lastScrollTop=0,n.actionTriggered=!1,n.startY=0,n.currentY=0,n.dragging=!1,n.maxPullDownDistance=0,n.getScrollableTarget=function(){return n.props.scrollableTarget instanceof HTMLElement?n.props.scrollableTarget:"string"===typeof n.props.scrollableTarget?document.getElementById(n.props.scrollableTarget):(null===n.props.scrollableTarget&&console.warn("You are trying to pass scrollableTarget but it is null. This might\n        happen because the element may not have been added to DOM yet.\n        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.\n      "),null)},n.onStart=function(e){n.lastScrollTop||(n.dragging=!0,e instanceof MouseEvent?n.startY=e.pageY:e instanceof TouchEvent&&(n.startY=e.touches[0].pageY),n.currentY=n.startY,n._infScroll&&(n._infScroll.style.willChange="transform",n._infScroll.style.transition="transform 0.2s cubic-bezier(0,0,0.31,1)"))},n.onMove=function(e){n.dragging&&(e instanceof MouseEvent?n.currentY=e.pageY:e instanceof TouchEvent&&(n.currentY=e.touches[0].pageY),n.currentY<n.startY||(n.currentY-n.startY>=Number(n.props.pullDownToRefreshThreshold)&&n.setState({pullToRefreshThresholdBreached:!0}),n.currentY-n.startY>1.5*n.maxPullDownDistance||n._infScroll&&(n._infScroll.style.overflow="visible",n._infScroll.style.transform="translate3d(0px, "+(n.currentY-n.startY)+"px, 0px)")))},n.onEnd=function(){n.startY=0,n.currentY=0,n.dragging=!1,n.state.pullToRefreshThresholdBreached&&(n.props.refreshFunction&&n.props.refreshFunction(),n.setState({pullToRefreshThresholdBreached:!1})),requestAnimationFrame((function(){n._infScroll&&(n._infScroll.style.overflow="auto",n._infScroll.style.transform="none",n._infScroll.style.willChange="none")}))},n.onScrollListener=function(e){"function"===typeof n.props.onScroll&&setTimeout((function(){return n.props.onScroll&&n.props.onScroll(e)}),0);var t=n.props.height||n._scrollableNode?e.target:document.documentElement.scrollTop?document.documentElement:document.body;n.actionTriggered||((n.props.inverse?n.isElementAtTop(t,n.props.scrollThreshold):n.isElementAtBottom(t,n.props.scrollThreshold))&&n.props.hasMore&&(n.actionTriggered=!0,n.setState({showLoader:!0}),n.props.next&&n.props.next()),n.lastScrollTop=t.scrollTop)},n.state={showLoader:!1,pullToRefreshThresholdBreached:!1},n.throttledOnScrollListener=function(e,t,n,r){var o,a=!1,i=0;function l(){o&&clearTimeout(o)}function c(){var c=this,s=Date.now()-i,u=arguments;function h(){i=Date.now(),n.apply(c,u)}function p(){o=void 0}a||(r&&!o&&h(),l(),void 0===r&&s>e?h():!0!==t&&(o=setTimeout(r?p:h,void 0===r?e-s:e)))}return"boolean"!==typeof t&&(r=n,n=t,t=void 0),c.cancel=function(){l(),a=!0},c}(150,n.onScrollListener).bind(n),n.onStart=n.onStart.bind(n),n.onMove=n.onMove.bind(n),n.onEnd=n.onEnd.bind(n),n}return function(e,t){function n(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}(t,e),t.prototype.componentDidMount=function(){if("undefined"===typeof this.props.dataLength)throw new Error('mandatory prop "dataLength" is missing. The prop is needed when loading more content. Check README.md for usage');if(this._scrollableNode=this.getScrollableTarget(),this.el=this.props.height?this._infScroll:this._scrollableNode||window,this.el&&this.el.addEventListener("scroll",this.throttledOnScrollListener),"number"===typeof this.props.initialScrollY&&this.el&&this.el instanceof HTMLElement&&this.el.scrollHeight>this.props.initialScrollY&&this.el.scrollTo(0,this.props.initialScrollY),this.props.pullDownToRefresh&&this.el&&(this.el.addEventListener("touchstart",this.onStart),this.el.addEventListener("touchmove",this.onMove),this.el.addEventListener("touchend",this.onEnd),this.el.addEventListener("mousedown",this.onStart),this.el.addEventListener("mousemove",this.onMove),this.el.addEventListener("mouseup",this.onEnd),this.maxPullDownDistance=this._pullDown&&this._pullDown.firstChild&&this._pullDown.firstChild.getBoundingClientRect().height||0,this.forceUpdate(),"function"!==typeof this.props.refreshFunction))throw new Error('Mandatory prop "refreshFunction" missing.\n          Pull Down To Refresh functionality will not work\n          as expected. Check README.md for usage\'')},t.prototype.componentWillUnmount=function(){this.el&&(this.el.removeEventListener("scroll",this.throttledOnScrollListener),this.props.pullDownToRefresh&&(this.el.removeEventListener("touchstart",this.onStart),this.el.removeEventListener("touchmove",this.onMove),this.el.removeEventListener("touchend",this.onEnd),this.el.removeEventListener("mousedown",this.onStart),this.el.removeEventListener("mousemove",this.onMove),this.el.removeEventListener("mouseup",this.onEnd)))},t.prototype.UNSAFE_componentWillReceiveProps=function(e){this.props.dataLength!==e.dataLength&&(this.actionTriggered=!1,this.setState({showLoader:!1}))},t.prototype.isElementAtTop=function(e,t){void 0===t&&(t=.8);var n=e===document.body||e===document.documentElement?window.screen.availHeight:e.clientHeight,r=u(t);return r.unit===l?e.scrollTop<=r.value+n-e.scrollHeight+1||0===e.scrollTop:e.scrollTop<=r.value/100+n-e.scrollHeight+1||0===e.scrollTop},t.prototype.isElementAtBottom=function(e,t){void 0===t&&(t=.8);var n=e===document.body||e===document.documentElement?window.screen.availHeight:e.clientHeight,r=u(t);return r.unit===l?e.scrollTop+n>=e.scrollHeight-r.value:e.scrollTop+n>=r.value/100*e.scrollHeight},t.prototype.render=function(){var e=this,t=i({height:this.props.height||"auto",overflow:"auto",WebkitOverflowScrolling:"touch"},this.props.style),n=this.props.hasChildren||!!(this.props.children&&this.props.children instanceof Array&&this.props.children.length),r=this.props.pullDownToRefresh&&this.props.height?{overflow:"auto"}:{};return o.a.createElement("div",{style:r,className:"infinite-scroll-component__outerdiv"},o.a.createElement("div",{className:"infinite-scroll-component "+(this.props.className||""),ref:function(t){return e._infScroll=t},style:t},this.props.pullDownToRefresh&&o.a.createElement("div",{style:{position:"relative"},ref:function(t){return e._pullDown=t}},o.a.createElement("div",{style:{position:"absolute",left:0,right:0,top:-1*this.maxPullDownDistance}},this.state.pullToRefreshThresholdBreached?this.props.releaseToRefreshContent:this.props.pullDownToRefreshContent)),this.props.children,!this.state.showLoader&&!n&&this.props.hasMore&&this.props.loader,this.state.showLoader&&this.props.hasMore&&this.props.loader,!this.props.hasMore&&this.props.endMessage))},t}(r.Component);t.a=h},89:function(e,t,n){"use strict";var r=n(4),o=n(1),a=n.n(o),i=n(3),l=n(13),c=n(9),s=n(59);function u(){var e=Object(r.a)(["\n  flex: 1 1 auto;\n  cursor: pointer;\n"]);return u=function(){return e},e}function h(){var e=Object(r.a)(["\n  flex: 3 1 auto;\n  height: 38px;\n  padding: 5px;\n  box-sizing: border-box;\n  border: none;\n  background-color: ",";\n  color: ",";\n  margin-left: 5px;\n  border-radius: 5px;\n  width: 0;\n  min-width: 100px;\n"]);return h=function(){return e},e}function p(){var e=Object(r.a)(["\n  flex: 1 1 auto;\n  min-width: max-content;\n  cursor: pointer;\n"]);return p=function(){return e},e}function f(){var e=Object(r.a)(["\n  margin-right: 5px;\n  width: 20px;\n  height: auto;\n  border-radius: 150px;\n  transition: color 0.2s;\n  color: ",";\n"]);return f=function(){return e},e}function d(){var e=Object(r.a)(["\n  color: ",";\n  background-color: ",";\n  font-size: 16px;\n  overflow: hidden;\n  height: 38px;\n  line-height: 30px;\n  flex: 1 1 auto;\n  padding: 5px;\n  margin: 5px;\n  border-radius: 5px;\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  ","\n"]);return d=function(){return e},e}t.a=function(e){var t=e.value,n=e.sort,r=e.field,o=e.label,i=e.icon,l=e.transform,u=e.mobile,h=e.onChange,p=function(){n.label===o?h(t,{name:r,label:o,sort:(n.sort+1)%3}):h(t,{name:r,label:o,sort:1})};return a.a.createElement(m,{mobile:void 0===u||u},a.a.createElement(g,{onClick:function(){return p()}},i?a.a.createElement(b,{icon:i,transform:l}):""," ",o),a.a.createElement(v,{type:"text",value:t,onChange:function(e){return h(e.target.value,n)}}),0!==n.sort&&n.label===o&&a.a.createElement(E,null,1===n.sort&&a.a.createElement(s.a,{onClick:function(){return p()},icon:c.l}),2===n.sort&&a.a.createElement(s.a,{onClick:function(){return p()},icon:c.k})))};var m=i.b.label(d(),(function(e){return e.theme.tile.color}),(function(e){return e.theme.tile.backgroundColor}),(function(e){return e.mobile?"":"@media (max-width: 576px) {display: none;}"})),b=Object(i.b)(l.a)(f(),(function(e){return e.theme.main.highlight})),g=i.b.div(p()),v=i.b.input(h(),(function(e){return e.theme.input.backgroundColor}),(function(e){return e.theme.input.color})),E=i.b.div(u())}}]);
//# sourceMappingURL=57.f98b4537.chunk.js.map