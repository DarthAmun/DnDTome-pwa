(this.webpackJsonpdndtome=this.webpackJsonpdndtome||[]).push([[56],{152:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return i}));var r=n(60),o=function e(t,n,o,i,a,c,l,s,u,h,p){Object(r.a)(this,e),this.id=void 0,this.name=void 0,this.sources=void 0,this.description=void 0,this.pic=void 0,this.cost=void 0,this.damage=void 0,this.weight=void 0,this.properties=void 0,this.type=void 0,this.filename=void 0,this.name=n||"",this.sources=o||"",this.description=i||"",this.pic=a||"",this.cost=c||"",this.damage=l||"",this.weight=s||"",this.properties=u||"",this.type=h||"",this.id=t,this.filename=p||""};function i(e){var t=void 0!==e.name&&"string"==typeof e.name,n=void 0!==e.sources&&"string"==typeof e.sources,r=void 0!==e.description&&"string"==typeof e.description,o=void 0!==e.cost&&"string"==typeof e.cost,i=void 0!==e.damage&&"string"==typeof e.damage,a=void 0!==e.weight&&"string"==typeof e.weight,c=void 0!==e.properties&&"string"==typeof e.properties,l=void 0!==e.type&&"string"==typeof e.type,s=void 0!==e.pic&&"string"==typeof e.pic;return e&&t&&n&&r&&o&&i&&a&&c&&l&&s}},176:function(e,t,n){"use strict";var r=n(4),o=n(1),i=n.n(o),a=n(6),c=n(3),l=n(13),s=n(9);function u(){var e=Object(r.a)([""]);return u=function(){return e},e}function h(){var e=Object(r.a)(["\n  margin: -10px 5px -10px -10px;\n  height: 47px;\n  width: 47px;\n  float: left;\n  border-radius: 100px;\n  border: 3px solid ",";\n  box-shadow: 0px 0px 10px 0px rgba(172, 172, 172, 0.2);\n  background-color: white;\n  overflow: hidden;\n"]);return h=function(){return e},e}function p(){var e=Object(r.a)(["\n  margin-right: 5px;\n  width: 20px;\n  height: auto;\n  border-radius: 150px;\n  color: ",";\n"]);return p=function(){return e},e}function d(){var e=Object(r.a)(["\n  margin: 0 0 5px 0px;\n  width: calc(100% - 20px);\n"]);return d=function(){return e},e}function f(){var e=Object(r.a)(["\n  height: 12px;\n  width: calc(50% - 22.5px);\n  margin: 0 0 5px 5px;\n  float: left;\n  line-height: 10px;\n  padding: 10px;\n  font-size: 12px;\n  border-radius: 5px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n\n  &:nth-child(odd) {\n  margin: 0 0 5px 0px;\n  }\n}\n"]);return f=function(){return e},e}function m(){var e=Object(r.a)(["\n  height: auto;\n  width: calc(100% - 10px);\n  float: left;\n  padding: 5px 5px 0 5px;\n  display: flex;\n  flex-wrap: wrap;\n"]);return m=function(){return e},e}function b(){var e=Object(r.a)(["\n  height: 30px;\n  float: left;\n  padding: 10px;\n  margin: 5px;\n  font-size: 14px;\n  width: calc(100% - 30px);\n  color: ",";\n  text-align: center;\n  border-radius: 50px 5px 5px 50px;\n"]);return b=function(){return e},e}function g(){var e=Object(r.a)(["\n  height: auto;\n  float: left;\n  padding: 10px;\n  margin: 5px;\n  font-size: 14px;\n  width: calc(100% - 30px);\n  color: ",";\n  text-align: center;\n  border-radius: 5px;\n"]);return g=function(){return e},e}function v(){var e=Object(r.a)(["\n  flex: 1 1 15em;\n  color: ",";\n  background-color: ",";\n  margin: 0.5em;\n  border-radius: 10px;\n  box-shadow: ",";\n  overflow: hidden;\n  cursor: pointer;\n"]);return v=function(){return e},e}t.a=function(e){var t=e.gear,n=Object(o.useCallback)((function(){return void 0!==t?""===t.pic||null===t.pic?"":t.pic:""}),[t]);return i.a.createElement(x,{to:"/gear-detail/id/"+t.id},""!==n()?i.a.createElement(w,null,i.a.createElement(T,{pic:n()}),i.a.createElement("b",null,t.name)):i.a.createElement(E,null,i.a.createElement("b",null,t.name)),i.a.createElement(O,null,i.a.createElement(j,null,i.a.createElement(S,{icon:s.n}),t.cost),i.a.createElement(j,null,i.a.createElement(S,{icon:s.jb}),t.weight),i.a.createElement(y,null,t.type),i.a.createElement(y,null,i.a.createElement(S,{icon:s.H}),t.sources)))};var x=Object(c.b)(a.b)(v(),(function(e){return e.theme.tile.color}),(function(e){return e.theme.tile.backgroundColor}),(function(e){return e.theme.tile.boxShadow})),E=c.b.div(g(),(function(e){return e.theme.tile.headerColor})),w=c.b.div(b(),(function(e){return e.theme.tile.headerColor})),O=c.b.div(m()),j=c.b.div(f()),y=Object(c.b)(j)(d()),S=Object(c.b)(l.a)(p(),(function(e){return e.theme.main.highlight})),T=function(e){var t=e.pic,n={backgroundImage:"url(".concat(t,")"),backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat"};return""!==t?i.a.createElement(C,{style:n}):i.a.createElement(k,null)},C=c.b.div(h(),(function(e){return e.theme.main.highlight})),k=c.b.div(u())},184:function(e,t,n){"use strict";var r=n(4),o=n(1),i=n.n(o),a=n(3),c=n(13),l=n(130);function s(){var e=Object(r.a)(["\n  flex: 3 2 auto;\n  box-sizing: border-box;\n  border: none;\n  min-width: 120px;\n\n  background-color: ",";\n  color: ",";\n  margin-left: 5px;\n\n  .react-select__control {\n    background-color: ",";\n    border: none;\n    border-radius: 5px;\n  }\n  .react-select__menu {\n    background-color: ",";\n\n    .react-select__option:hover {\n      background-color: ",";\n      color: ",";\n    }\n    .react-select__option--is-focused {\n      background-color: ",";\n      color: ",";\n    }\n  }\n"]);return s=function(){return e},e}function u(){var e=Object(r.a)(["\n  flex: 1 1 auto;\n"]);return u=function(){return e},e}function h(){var e=Object(r.a)(["\n  margin-right: 5px;\n  width: 20px;\n  height: auto;\n  border-radius: 150px;\n  transition: color 0.2s;\n  color: ",";\n"]);return h=function(){return e},e}function p(){var e=Object(r.a)(["\n  color: ",";\n  background-color: ",";\n  font-size: 16px;\n  flex: 1 1 auto;\n  padding: 5px;\n  margin: 5px;\n  border-radius: 5px;\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]);return p=function(){return e},e}t.a=function(e){var t=e.options,n=e.label,r=e.icon,o=e.transform,a=e.onChange,c=function(e){if(null!==e&&void 0!==e){var t=e.map((function(e){return e.value}));a(t)}};return i.a.createElement(d,null,i.a.createElement(m,null,r?i.a.createElement(f,{icon:r,transform:o}):""," ",n),i.a.createElement(b,{isMulti:!0,classNamePrefix:"react-select",options:t,onChange:function(e){return c(e)}}))};var d=a.b.label(p(),(function(e){return e.theme.tile.color}),(function(e){return e.theme.tile.backgroundColor})),f=Object(a.b)(c.a)(h(),(function(e){return e.theme.main.highlight})),m=a.b.div(u()),b=Object(a.b)(l.a)(s(),(function(e){return e.theme.input.backgroundColor}),(function(e){return e.theme.input.color}),(function(e){return e.theme.input.backgroundColor}),(function(e){return e.theme.input.backgroundColor}),(function(e){return e.theme.buttons.backgroundColor}),(function(e){return e.theme.buttons.color}),(function(e){return e.theme.buttons.backgroundColor}),(function(e){return e.theme.buttons.color}))},59:function(e,t,n){"use strict";var r=n(4),o=n(1),i=n.n(o),a=n(3),c=n(13);function l(){var e=Object(r.a)(["\n  flex: 1 1 auto;\n"]);return l=function(){return e},e}function s(){var e=Object(r.a)(["\n  color: ",";\n  background-color: ",";\n  cursor: not-allowed;\n"]);return s=function(){return e},e}function u(){var e=Object(r.a)(["\n  color: ",";\n  background-color: ",";\n  cursor: pointer;\n\n  font-size: 16px;\n  overflow: hidden;\n  height: ",";\n  line-height: ",";\n  float: ",";\n  padding: 10px;\n  margin: 5px;\n  border-radius: 10px;\n  box-shadow: inset -2px -2px 5px 0px rgba(0, 0, 0, 0.3);\n\n  transition: color 0.2s;\n\n  &:hover {\n    color: white;\n  }\n\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n"]);return u=function(){return e},e}t.a=function(e){var t=e.icon,n=e.floatLeft,r=e.disabled,o=e.transform,a=e.onClick;return i.a.createElement(i.a.Fragment,null,!r&&i.a.createElement(h,{left:n,onClick:a},i.a.createElement(d,{icon:t,transform:o})),r&&i.a.createElement(p,null,i.a.createElement(d,{icon:t,transform:o})))};var h=a.b.div(u(),(function(e){return e.theme.buttons.color}),(function(e){return e.theme.buttons.backgroundColor}),(function(e){return e.theme.buttons.height}),(function(e){return e.theme.buttons.height}),(function(e){return e.left?"left":"right"})),p=Object(a.b)(h)(s(),(function(e){return e.theme.buttons.backgroundColor}),(function(e){return e.theme.buttons.color})),d=Object(a.b)(c.a)(l())},716:function(e,t,n){"use strict";n.r(t);var r=n(4),o=n(16),i=n(1),a=n.n(i),c=n(3),l=n(28),s=n(176),u=n(27),h=n(65),p=n(2),d=n(78),f=n(29),m=n.n(f),b=n(58),g=n(9),v=n(13),x=n(184),E=n(59),w=n(152),O=n(89),j=n(7),y=function(e){var t=e.onSend,n=Object(i.useState)(!1),r=Object(o.a)(n,2),c=r[0],l=r[1],s=Object(i.useState)([]),f=Object(o.a)(s,2),y=f[0],S=f[1],T=Object(p.f)(),C=Object(i.useState)(""),k=Object(o.a)(C,2),_=k[0],L=k[1],D=Object(i.useState)(""),M=Object(o.a)(D,2),Y=M[0],R=M[1],P=Object(i.useState)(""),H=Object(o.a)(P,2),N=H[0],A=H[1],F=Object(i.useState)([]),z=Object(o.a)(F,2),B=z[0],W=z[1],U=Object(i.useState)([]),I=Object(o.a)(U,2),J=I[0],$=I[1],q=Object(i.useState)(""),Q=Object(o.a)(q,2),V=Q[0],G=Q[1],K=Object(i.useState)(""),X=Object(o.a)(K,2),Z=X[0],ee=X[1],te=Object(i.useState)(""),ne=Object(o.a)(te,2),re=ne[0],oe=ne[1],ie=Object(i.useState)(""),ae=Object(o.a)(ie,2),ce=ae[0],le=ae[1],se=Object(i.useState)({name:"",label:"",sort:0}),ue=Object(o.a)(se,2),he=ue[0],pe=ue[1];Object(i.useEffect)((function(){Object(b.h)("gears","type",(function(e){var t=e.map((function(e){return""===e?{value:e.toString(),label:"Empty"}:{value:e.toString(),label:e.toString()}}));$(t)}))}),[]);return a.a.createElement(a.a.Fragment,null,a.a.createElement(j.e,{open:c},a.a.createElement(O.a,{value:_,sort:he,field:"name",label:"Name",onChange:function(e,t){L(e),pe(t)}}),a.a.createElement(O.a,{value:Y,sort:he,field:"cost",label:"Cost",icon:g.n,onChange:function(e,t){R(e),pe(t)}}),a.a.createElement(O.a,{value:N,sort:he,field:"weight",label:"Weight",icon:g.jb,onChange:function(e,t){A(e),pe(t)}}),a.a.createElement(O.a,{value:Z,sort:he,field:"damage",label:"Damage",icon:g.o,onChange:function(e,t){ee(e),pe(t)}}),a.a.createElement(O.a,{value:V,sort:he,field:"properties",label:"Properties",onChange:function(e,t){G(e),pe(t)}}),a.a.createElement(x.a,{options:J,label:"Types",onChange:function(e){return W(e)}}),a.a.createElement(O.a,{value:ce,sort:he,field:"text",label:"Text",icon:g.e,onChange:function(e,t){le(e),pe(t)}}),a.a.createElement(O.a,{value:re,sort:he,field:"sources",label:"Sources",icon:g.H,onChange:function(e,t){oe(e),pe(t)}}),a.a.createElement(E.a,{onClick:function(){return function(){var e=[];""!==_&&(e=[].concat(Object(h.a)(e),[new d.a("name",_)])),""!==Y&&(e=[].concat(Object(h.a)(e),[new d.a("cost",Y)])),""!==N&&(e=[].concat(Object(h.a)(e),[new d.a("weight",N)])),""!==V&&(e=[].concat(Object(h.a)(e),[new d.a("properties",V)])),""!==Z&&(e=[].concat(Object(h.a)(e),[new d.a("damage",Z)])),""!==re&&(e=[].concat(Object(h.a)(e),[new d.a("sources",re)])),""!==ce&&(e=[].concat(Object(h.a)(e),[new d.a("description",ce)])),0!==B.length&&(e=[].concat(Object(h.a)(e),[new d.a("type",B)])),e=e.map((function(e){return he.name===e.fieldName?Object(u.a)(Object(u.a)({},e),{},{sort:he.sort}):e})),S(e),l(!1),t(e)}()},icon:g.W}),a.a.createElement(E.a,{onClick:function(){return m.a.unstable_batchedUpdates((function(){L(""),R(""),A(""),G(""),ee(""),oe(""),W([]),le(""),l(!1),pe({name:"",label:"",sort:0})})),void t([])},icon:g.T}),a.a.createElement(j.h,{onClick:function(){return l(!c)}},a.a.createElement(v.a,{icon:g.W}))),a.a.createElement(j.b,{onClick:function(){return function(){var e=new w.a;delete e.id,Object(b.b)("gears",e,(function(e){T.push("/gear-detail/id/".concat(e))}))}()}},a.a.createElement(v.a,{icon:g.Q}),a.a.createElement(j.f,null,"Add new")),a.a.createElement(j.c,{onClick:function(){Object(b.d)("gears",y,"DnDTome_filtered_gears.json")}},a.a.createElement(v.a,{icon:g.x}),a.a.createElement(j.f,null,"Export filtered")))},S=n(82);function T(){var e=Object(r.a)(["\n  margin-top: 20px;\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  align-content: flex-start;\n"]);return T=function(){return e},e}t.default=function(){var e=Object(i.useState)([]),t=Object(o.a)(e,2),n=t[0],r=t[1],c=Object(i.useState)([]),u=Object(o.a)(c,2),h=u[0],p=u[1],d=Object(i.useState)([]),f=Object(o.a)(d,2),m=f[0],g=f[1],v=Object(i.useState)({start:100,end:120,hasMore:!0}),x=Object(o.a)(v,2),E=x[0],w=x[1];Object(i.useEffect)((function(){Object(b.f)("gears",n,(function(e){p(e),g(e.slice(0,100)),0===e.length&&w({start:0,end:0,hasMore:!1})}))}),[n]);return a.a.createElement(a.a.Fragment,null,a.a.createElement(y,{onSend:function(e){return r(e)}}),a.a.createElement("div",{id:"scrollable",style:{width:"100%"}},a.a.createElement(C,{dataLength:m.length,next:function(){m.length!==h.length?(g((function(e){return e.concat(h.slice(E.start,E.end))})),w({start:E.start+20,end:E.end+20,hasMore:!0})):w({start:E.start+20,end:E.end+20,hasMore:!1})},hasMore:E.hasMore,loader:a.a.createElement(l.b,null)},m.map((function(e,t){return a.a.createElement(s.a,{key:t,gear:e})})))))};var C=Object(c.b)(S.a)(T())},78:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(60),o=function e(t,n,o){Object(r.a)(this,e),this.fieldName=void 0,this.value=void 0,this.sort=void 0,this.fieldName=t,this.value=n,this.sort=o||0}},82:function(e,t,n){"use strict";var r=n(1),o=n.n(r),i=function(e,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};var a=function(){return(a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};var c="Pixel",l="Percent",s={unit:l,value:.8};function u(e){return"number"===typeof e?{unit:l,value:100*e}:"string"===typeof e?e.match(/^(\d*(\.\d+)?)px$/)?{unit:c,value:parseFloat(e)}:e.match(/^(\d*(\.\d+)?)%$/)?{unit:l,value:parseFloat(e)}:(console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...'),s):(console.warn("scrollThreshold should be string or number"),s)}var h=function(e){function t(t){var n=e.call(this,t)||this;return n.lastScrollTop=0,n.actionTriggered=!1,n.startY=0,n.currentY=0,n.dragging=!1,n.maxPullDownDistance=0,n.getScrollableTarget=function(){return n.props.scrollableTarget instanceof HTMLElement?n.props.scrollableTarget:"string"===typeof n.props.scrollableTarget?document.getElementById(n.props.scrollableTarget):(null===n.props.scrollableTarget&&console.warn("You are trying to pass scrollableTarget but it is null. This might\n        happen because the element may not have been added to DOM yet.\n        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.\n      "),null)},n.onStart=function(e){n.lastScrollTop||(n.dragging=!0,e instanceof MouseEvent?n.startY=e.pageY:e instanceof TouchEvent&&(n.startY=e.touches[0].pageY),n.currentY=n.startY,n._infScroll&&(n._infScroll.style.willChange="transform",n._infScroll.style.transition="transform 0.2s cubic-bezier(0,0,0.31,1)"))},n.onMove=function(e){n.dragging&&(e instanceof MouseEvent?n.currentY=e.pageY:e instanceof TouchEvent&&(n.currentY=e.touches[0].pageY),n.currentY<n.startY||(n.currentY-n.startY>=Number(n.props.pullDownToRefreshThreshold)&&n.setState({pullToRefreshThresholdBreached:!0}),n.currentY-n.startY>1.5*n.maxPullDownDistance||n._infScroll&&(n._infScroll.style.overflow="visible",n._infScroll.style.transform="translate3d(0px, "+(n.currentY-n.startY)+"px, 0px)")))},n.onEnd=function(){n.startY=0,n.currentY=0,n.dragging=!1,n.state.pullToRefreshThresholdBreached&&(n.props.refreshFunction&&n.props.refreshFunction(),n.setState({pullToRefreshThresholdBreached:!1})),requestAnimationFrame((function(){n._infScroll&&(n._infScroll.style.overflow="auto",n._infScroll.style.transform="none",n._infScroll.style.willChange="none")}))},n.onScrollListener=function(e){"function"===typeof n.props.onScroll&&setTimeout((function(){return n.props.onScroll&&n.props.onScroll(e)}),0);var t=n.props.height||n._scrollableNode?e.target:document.documentElement.scrollTop?document.documentElement:document.body;n.actionTriggered||((n.props.inverse?n.isElementAtTop(t,n.props.scrollThreshold):n.isElementAtBottom(t,n.props.scrollThreshold))&&n.props.hasMore&&(n.actionTriggered=!0,n.setState({showLoader:!0}),n.props.next&&n.props.next()),n.lastScrollTop=t.scrollTop)},n.state={showLoader:!1,pullToRefreshThresholdBreached:!1},n.throttledOnScrollListener=function(e,t,n,r){var o,i=!1,a=0;function c(){o&&clearTimeout(o)}function l(){var l=this,s=Date.now()-a,u=arguments;function h(){a=Date.now(),n.apply(l,u)}function p(){o=void 0}i||(r&&!o&&h(),c(),void 0===r&&s>e?h():!0!==t&&(o=setTimeout(r?p:h,void 0===r?e-s:e)))}return"boolean"!==typeof t&&(r=n,n=t,t=void 0),l.cancel=function(){c(),i=!0},l}(150,n.onScrollListener).bind(n),n.onStart=n.onStart.bind(n),n.onMove=n.onMove.bind(n),n.onEnd=n.onEnd.bind(n),n}return function(e,t){function n(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}(t,e),t.prototype.componentDidMount=function(){if("undefined"===typeof this.props.dataLength)throw new Error('mandatory prop "dataLength" is missing. The prop is needed when loading more content. Check README.md for usage');if(this._scrollableNode=this.getScrollableTarget(),this.el=this.props.height?this._infScroll:this._scrollableNode||window,this.el&&this.el.addEventListener("scroll",this.throttledOnScrollListener),"number"===typeof this.props.initialScrollY&&this.el&&this.el instanceof HTMLElement&&this.el.scrollHeight>this.props.initialScrollY&&this.el.scrollTo(0,this.props.initialScrollY),this.props.pullDownToRefresh&&this.el&&(this.el.addEventListener("touchstart",this.onStart),this.el.addEventListener("touchmove",this.onMove),this.el.addEventListener("touchend",this.onEnd),this.el.addEventListener("mousedown",this.onStart),this.el.addEventListener("mousemove",this.onMove),this.el.addEventListener("mouseup",this.onEnd),this.maxPullDownDistance=this._pullDown&&this._pullDown.firstChild&&this._pullDown.firstChild.getBoundingClientRect().height||0,this.forceUpdate(),"function"!==typeof this.props.refreshFunction))throw new Error('Mandatory prop "refreshFunction" missing.\n          Pull Down To Refresh functionality will not work\n          as expected. Check README.md for usage\'')},t.prototype.componentWillUnmount=function(){this.el&&(this.el.removeEventListener("scroll",this.throttledOnScrollListener),this.props.pullDownToRefresh&&(this.el.removeEventListener("touchstart",this.onStart),this.el.removeEventListener("touchmove",this.onMove),this.el.removeEventListener("touchend",this.onEnd),this.el.removeEventListener("mousedown",this.onStart),this.el.removeEventListener("mousemove",this.onMove),this.el.removeEventListener("mouseup",this.onEnd)))},t.prototype.UNSAFE_componentWillReceiveProps=function(e){this.props.dataLength!==e.dataLength&&(this.actionTriggered=!1,this.setState({showLoader:!1}))},t.prototype.isElementAtTop=function(e,t){void 0===t&&(t=.8);var n=e===document.body||e===document.documentElement?window.screen.availHeight:e.clientHeight,r=u(t);return r.unit===c?e.scrollTop<=r.value+n-e.scrollHeight+1||0===e.scrollTop:e.scrollTop<=r.value/100+n-e.scrollHeight+1||0===e.scrollTop},t.prototype.isElementAtBottom=function(e,t){void 0===t&&(t=.8);var n=e===document.body||e===document.documentElement?window.screen.availHeight:e.clientHeight,r=u(t);return r.unit===c?e.scrollTop+n>=e.scrollHeight-r.value:e.scrollTop+n>=r.value/100*e.scrollHeight},t.prototype.render=function(){var e=this,t=a({height:this.props.height||"auto",overflow:"auto",WebkitOverflowScrolling:"touch"},this.props.style),n=this.props.hasChildren||!!(this.props.children&&this.props.children instanceof Array&&this.props.children.length),r=this.props.pullDownToRefresh&&this.props.height?{overflow:"auto"}:{};return o.a.createElement("div",{style:r,className:"infinite-scroll-component__outerdiv"},o.a.createElement("div",{className:"infinite-scroll-component "+(this.props.className||""),ref:function(t){return e._infScroll=t},style:t},this.props.pullDownToRefresh&&o.a.createElement("div",{style:{position:"relative"},ref:function(t){return e._pullDown=t}},o.a.createElement("div",{style:{position:"absolute",left:0,right:0,top:-1*this.maxPullDownDistance}},this.state.pullToRefreshThresholdBreached?this.props.releaseToRefreshContent:this.props.pullDownToRefreshContent)),this.props.children,!this.state.showLoader&&!n&&this.props.hasMore&&this.props.loader,this.state.showLoader&&this.props.hasMore&&this.props.loader,!this.props.hasMore&&this.props.endMessage))},t}(r.Component);t.a=h},89:function(e,t,n){"use strict";var r=n(4),o=n(1),i=n.n(o),a=n(3),c=n(13),l=n(9),s=n(59);function u(){var e=Object(r.a)(["\n  flex: 1 1 auto;\n  cursor: pointer;\n"]);return u=function(){return e},e}function h(){var e=Object(r.a)(["\n  flex: 3 1 auto;\n  height: 38px;\n  padding: 5px;\n  box-sizing: border-box;\n  border: none;\n  background-color: ",";\n  color: ",";\n  margin-left: 5px;\n  border-radius: 5px;\n  width: 0;\n  min-width: 100px;\n"]);return h=function(){return e},e}function p(){var e=Object(r.a)(["\n  flex: 1 1 auto;\n  min-width: max-content;\n  cursor: pointer;\n"]);return p=function(){return e},e}function d(){var e=Object(r.a)(["\n  margin-right: 5px;\n  width: 20px;\n  height: auto;\n  border-radius: 150px;\n  transition: color 0.2s;\n  color: ",";\n"]);return d=function(){return e},e}function f(){var e=Object(r.a)(["\n  color: ",";\n  background-color: ",";\n  font-size: 16px;\n  overflow: hidden;\n  height: 38px;\n  line-height: 30px;\n  flex: 1 1 auto;\n  padding: 5px;\n  margin: 5px;\n  border-radius: 5px;\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  ","\n"]);return f=function(){return e},e}t.a=function(e){var t=e.value,n=e.sort,r=e.field,o=e.label,a=e.icon,c=e.transform,u=e.mobile,h=e.onChange,p=function(){n.label===o?h(t,{name:r,label:o,sort:(n.sort+1)%3}):h(t,{name:r,label:o,sort:1})};return i.a.createElement(m,{mobile:void 0===u||u},i.a.createElement(g,{onClick:function(){return p()}},a?i.a.createElement(b,{icon:a,transform:c}):""," ",o),i.a.createElement(v,{type:"text",value:t,onChange:function(e){return h(e.target.value,n)}}),0!==n.sort&&n.label===o&&i.a.createElement(x,null,1===n.sort&&i.a.createElement(s.a,{onClick:function(){return p()},icon:l.l}),2===n.sort&&i.a.createElement(s.a,{onClick:function(){return p()},icon:l.k})))};var m=a.b.label(f(),(function(e){return e.theme.tile.color}),(function(e){return e.theme.tile.backgroundColor}),(function(e){return e.mobile?"":"@media (max-width: 576px) {display: none;}"})),b=Object(a.b)(c.a)(d(),(function(e){return e.theme.main.highlight})),g=a.b.div(p()),v=a.b.input(h(),(function(e){return e.theme.input.backgroundColor}),(function(e){return e.theme.input.color})),x=a.b.div(u())}}]);
//# sourceMappingURL=56.1be71114.chunk.js.map