(this.webpackJsonpdndtome=this.webpackJsonpdndtome||[]).push([[37],{188:function(n,t,e){"use strict";var r=e(8),o=e(0),a=e.n(o),i=e(6),c=e(21);function u(){var n=Object(r.a)(["\n  flex: 3 1 auto;\n  height: 38px;\n  line-height: 30px;\n  padding: 5px;\n  box-sizing: border-box;\n  border: none;\n  background-color: ",";\n  color: ",";\n  margin-left: 5px;\n  border-radius: 5px;\n"]);return u=function(){return n},n}function l(){var n=Object(r.a)(["\n  flex: 1 1 auto;\n"]);return l=function(){return n},n}function f(){var n=Object(r.a)(["\n  margin-right: 5px;\n  width: 20px;\n  height: auto;\n  border-radius: 150px;\n  transition: color 0.2s;\n  color: ",";\n"]);return f=function(){return n},n}function d(){var n=Object(r.a)(["\n  color: ",";\n  background-color: ",";\n  font-size: 16px;\n  overflow: hidden;\n  height: 38px;\n  line-height: 38px;\n  flex: 1 1 auto;\n  padding: 5px;\n  margin: 5px;\n  border-radius: 5px;\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]);return d=function(){return n},n}t.a=function(n){var t=n.label,e=n.accept,r=n.isMulti,o=n.icon,i=n.transform,c=n.onChange;return a.a.createElement(b,null,a.a.createElement(s,null,o?a.a.createElement(p,{icon:o,transform:i}):""," ",t),r&&a.a.createElement(h,{onChange:function(n){return c(n.target.files)},type:"file",accept:e,multiple:!0}),!r&&a.a.createElement(h,{onChange:function(n){return c(n.target.files)},accept:e,type:"file"}))};var b=i.b.label(d(),(function(n){return n.theme.tile.color}),(function(n){return n.theme.tile.backgroundColor})),p=Object(i.b)(c.a)(f(),(function(n){return n.theme.main.highlight})),s=i.b.div(l()),h=i.b.input(u(),(function(n){return n.theme.input.backgroundColor}),(function(n){return n.theme.input.color}))},50:function(n,t,e){"use strict";var r=e(8),o=e(0),a=e.n(o),i=e(6),c=e(21);function u(){var n=Object(r.a)(["\n  flex: 1 1 auto;\n"]);return u=function(){return n},n}function l(){var n=Object(r.a)(["\n  color: ",";\n  background-color: ",";\n  cursor: not-allowed;\n"]);return l=function(){return n},n}function f(){var n=Object(r.a)(["\n  color: ",";\n  background-color: ",";\n  cursor: pointer;\n\n  font-size: 16px;\n  overflow: hidden;\n  height: ",";\n  line-height: ",";\n  float: ",";\n  padding: 10px;\n  margin: 5px;\n  border-radius: 10px;\n  box-shadow: inset -2px -2px 5px 0px rgba(0, 0, 0, 0.3);\n\n  transition: color 0.2s;\n\n  &:hover {\n    color: white;\n  }\n\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n"]);return f=function(){return n},n}t.a=function(n){var t=n.icon,e=n.floatLeft,r=n.disabled,o=n.transform,i=n.onClick;return a.a.createElement(a.a.Fragment,null,!r&&a.a.createElement(d,{left:e,onClick:i},a.a.createElement(p,{icon:t,transform:o})),r&&a.a.createElement(b,null,a.a.createElement(p,{icon:t,transform:o})))};var d=i.b.div(f(),(function(n){return n.theme.buttons.color}),(function(n){return n.theme.buttons.backgroundColor}),(function(n){return n.theme.buttons.height}),(function(n){return n.theme.buttons.height}),(function(n){return n.left?"left":"right"})),b=Object(i.b)(d)(l(),(function(n){return n.theme.buttons.backgroundColor}),(function(n){return n.theme.buttons.color})),p=Object(i.b)(c.a)(u())},52:function(n,t,e){"use strict";var r=e(8),o=e(0),a=e.n(o),i=e(6),c=e(21);function u(){var n=Object(r.a)(["\n  flex: 1 1 auto;\n  margin-right: 5px;\n"]);return u=function(){return n},n}function l(){var n=Object(r.a)(["\n  color: ",";\n  background-color: ",";\n  font-size: 16px;\n  overflow: hidden;\n  height: ",";\n  line-height: ",";\n  float: right;\n  padding: 10px;\n  margin: 5px;\n  border-radius: 10px;\n  cursor: pointer;\n  box-shadow: inset -2px -2px 5px 0px rgba(0, 0, 0, 0.3);\n  box-sizing: content-box;\n  border: none;\n\n  transition: color 0.2s;\n\n  &:hover {\n    color: ",";\n  }\n\n  &:disabled {\n    background-color: ",";\n  }\n\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n"]);return l=function(){return n},n}t.a=function(n){var t=n.text,e=n.icon,r=n.transform,o=n.disabled,i=n.onClick;return a.a.createElement(f,{onClick:i,disabled:o},e?a.a.createElement(d,{icon:e,transform:r}):""," ",t)};var f=i.b.button(l(),(function(n){return n.theme.buttons.color}),(function(n){return n.theme.buttons.backgroundColor}),(function(n){return n.theme.buttons.height}),(function(n){return n.theme.buttons.height}),(function(n){return n.theme.buttons.hoverColor}),(function(n){return n.theme.buttons.disabled})),d=Object(i.b)(c.a)(u())},520:function(n,t,e){"use strict";var r=e(8),o=e(14),a=e(0),i=e.n(a),c=e(1),u=e(6),l=e(48),f=e(12),d=e(21),b=e(283),p=e(52),s=e(22);function h(){var n=Object(r.a)(["\n  flex: 1 1 auto;\n  max-width: 100%;\n\n  .react-pdf__Document {\n    width: 100%;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: flex-start;\n  }\n  .react-pdf__Outline {\n    flex: 1 1 auto;\n    max-height: 600px;\n    overflow: hidden;\n  }\n  .react-pdf__Page {\n    flex: 1 1 auto;\n    width: 100%;\n    max-width: 600px;\n    overflow: hidden;\n    border-radius: 5px;\n\n    .react-pdf__Page__canvas {\n      width: 100% !important;\n      height: auto !important;\n    }\n    .react-pdf__Page__textContent {\n      width: 100% !important;\n      height: auto !important;\n      top: 0 !important;\n      left: 0 !important;\n      transform: none !important;\n    }\n  }\n"]);return h=function(){return n},n}function m(){var n=Object(r.a)(["\n  flex: 1 1 auto;\n  height: auto;\n  float: left;\n  padding: 3px;\n\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n"]);return m=function(){return n},n}function g(){var n=Object(r.a)(["\n  display: inline-block;\n  background-color: ",";\n  border-radius: 5px;\n  color: ",";\n  font-size: 10px;\n  padding: 10px;\n  margin-right: 5px;\n"]);return g=function(){return n},n}function x(){var n=Object(r.a)(["\n  height: auto;\n  float: left;\n  padding: 10px;\n  margin: 5px 5px 10px 5px;\n  width: calc(100% - 30px);\n  color: var(--card-title-color);\n  text-align: center;\n  border-radius: 5px;\n  background-color: ",";\n"]);return x=function(){return n},n}function v(){var n=Object(r.a)(["\n  color: ",";\n  font-size: 16px;\n  flex: 1 1 600px;\n  padding: 5px;\n  margin: 5px;\n  height: 100%;\n  max-width: calc(100% - 20px);\n\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  align-items: flex-start;\n  align-content: flex-start;\n"]);return v=function(){return n},n}function j(){var n=Object(r.a)(["\n  overflow: hidden;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n"]);return j=function(){return n},n}b.c.GlobalWorkerOptions.workerSrc="//cdnjs.cloudflare.com/ajax/libs/pdf.js/".concat(b.c.version,"/pdf.worker.js");var O=function(n){var t=n.book,e=Object(a.useState)(""),r=Object(o.a)(e,2),c=r[0],u=r[1],l=Object(a.useState)(0),h=Object(o.a)(l,2),m=h[0],g=h[1],x=Object(a.useState)(1),v=Object(o.a)(x,2),j=v[0],O=v[1];Object(a.useEffect)((function(){var n=new FileReader;n.readAsDataURL(t.data),n.onloadend=function(){var t=n.result;null!==t&&u(t.toString())}}));var _=function(n){O((function(t){return t+n}))};return i.a.createElement(w,null,i.a.createElement(E,null,i.a.createElement(S,null,i.a.createElement("div",null,i.a.createElement(p.a,{onClick:function(){_(1)},text:"Next",disabled:j>=m,icon:f.d}),i.a.createElement(p.a,{onClick:function(){_(-1)},text:"Previous",disabled:j<=1,icon:f.c}),"Page ",j||(m?1:"--")," of ",m||"--"),i.a.createElement(b.a,{file:c,onLoadSuccess:function(n){var t=n.numPages;g(t),O(1)},onItemClick:function(n){var t=n.pageNumber;O(+t)},loading:s.c},i.a.createElement(b.b,{pageNumber:j,loading:s.c})))),i.a.createElement(E,null,i.a.createElement(k,null,i.a.createElement("b",null,t.name)),i.a.createElement(p.a,{onClick:function(){return function(){if(navigator.appVersion.toString().indexOf(".NET")>0)window.navigator.msSaveBlob(t.data,t.name+".pdf");else{var n=URL.createObjectURL(t.data);window.open(n,"_blank")}}()},text:"Show PDF",icon:f.v}),i.a.createElement(p.a,{onClick:function(){return function(n){if(window.navigator&&window.navigator.msSaveOrOpenBlob)navigator.msSaveOrOpenBlob(t.data,n);else{var e=window.URL.createObjectURL(t.data),r=document.createElement("a");r.download=n,r.href=e,r.target="_blank",document.body.appendChild(r),r.click(),document.body.removeChild(r)}}(t.name+".pdf")},text:"Downlaod PDF",icon:f.w}),i.a.createElement(y,null,t.tags&&t.tags.map((function(n,t){return i.a.createElement(C,{key:t},i.a.createElement(d.a,{icon:f.db})," ",n)})))))},w=u.b.div(j()),E=u.b.div(v(),(function(n){return n.theme.tile.color})),k=u.b.div(x(),(function(n){return n.theme.tile.backgroundColor})),C=u.b.span(g(),(function(n){return n.theme.tile.backgroundColorLink}),(function(n){return n.theme.tile.backgroundColor})),y=u.b.div(m()),S=u.b.div(h()),_=e(55),z=e(23),P=e(72),F=e(53),L=e(188),R=e(50);function D(){var n=Object(r.a)(["\n  flex: 1 1 600px;\n  height: auto;\n  width: calc(100% - 6px);\n  float: left;\n  padding: 3px;\n\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-around;\n"]);return D=function(){return n},n}function N(){var n=Object(r.a)([""]);return N=function(){return n},n}function T(){var n=Object(r.a)(["\n  color: ",";\n  font-size: 16px;\n  flex: 1 1 600px;\n  padding: 5px;\n  margin: 5px;\n  height: 100%;\n\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-around;\n  align-items: flex-start;\n  align-content: flex-start;\n"]);return T=function(){return n},n}function B(){var n=Object(r.a)(["\n  overflow: hidden;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-around;\n"]);return B=function(){return n},n}var U=function(n){var t=n.book,e=n.onEdit;return i.a.createElement(V,null,i.a.createElement(A,null,i.a.createElement(F.a,{value:t.name,label:"Name",onChange:function(n){return e(Object(z.a)(Object(z.a)({},t),{},{name:n}))}}),i.a.createElement(L.a,{label:"",isMulti:!1,icon:f.y,accept:".pdf",onChange:function(n){return function(n){if(null!==n){var r=Array.from(n);1===r.length&&e(Object(z.a)(Object(z.a)({},t),{},{data:r[0]}))}}(n)}}),i.a.createElement(F.a,{value:t.cover,label:"Cover",icon:f.G,onChange:function(n){return e(Object(z.a)(Object(z.a)({},t),{},{cover:n}))}}),i.a.createElement(P.a,{value:t.pages,label:"Pages",icon:f.H,onChange:function(n){return e(Object(z.a)(Object(z.a)({},t),{},{pages:n}))}})),i.a.createElement(G,null,t.tags.map((function(n,r){return i.a.createElement(I,{key:r},i.a.createElement(F.a,{value:n,label:"Tag",onChange:function(r){return function(n,r){var o=t.tags.map((function(t){return t===n?r:t}));e(Object(z.a)(Object(z.a)({},t),{},{tags:o}))}(n,r)}}),i.a.createElement(R.a,{icon:f.gb,onClick:function(){return function(n){var r=t.tags,o=r.indexOf(n);-1!==o&&(r.splice(o,1),e(Object(z.a)(Object(z.a)({},t),{},{tags:r})))}(n)}}))})),i.a.createElement(I,null,i.a.createElement(R.a,{icon:f.P,onClick:function(){e(Object(z.a)(Object(z.a)({},t),{},{tags:[].concat(Object(_.a)(t.tags),[""])}))}}))))},V=u.b.div(B()),A=u.b.div(T(),(function(n){return n.theme.tile.color})),G=Object(u.b)(A)(N()),I=u.b.div(D()),J=e(62),M=e(70),q=e(63);function H(){var n=Object(r.a)(["\n  float: right;\n  line-height: 30px;\n  display: block;\n  height: 30px;\n  padding: 10px;\n  color: ",";\n"]);return H=function(){return n},n}function W(){var n=Object(r.a)(["\n  padding: 5px;\n  width: 150px;\n  height: 30px;\n  line-height: 30px;\n  border-radius: 5px;\n  float: right;\n"]);return W=function(){return n},n}function K(){var n=Object(r.a)(["\n  color: ",";\n  font-size: 16px;\n  overflow: hidden;\n  flex: 1 1;\n  min-width: calc(100% - 20px);\n  height: 45px;\n  padding: 10px;\n"]);return K=function(){return n},n}t.a=function(n){var t=n.book,e=n.isNew,r=Object(a.useState)(e),u=Object(o.a)(r,2),d=u[0],b=u[1],p=Object(a.useState)(t),s=Object(o.a)(p,2),h=s[0],m=s[1],g=Object(a.useState)(!1),x=Object(o.a)(g,2),v=x[0],j=x[1],w=Object(a.useState)(!1),E=Object(o.a)(w,2),k=E[0],C=E[1],y=Object(a.useState)(""),S=Object(o.a)(y,2),_=S[0],z=S[1],P=Object(a.useState)(!1),F=Object(o.a)(P,2),L=F[0],D=F[1],N=Object(c.g)();Object(a.useEffect)((function(){h!==t&&D(!0)}),[h,t]);return i.a.createElement(i.a.Fragment,null,k&&i.a.createElement(M.a,{message:"Delete ".concat(t.name,"?"),icon:f.u,confirmeText:"Delete",confirmeClick:function(){Object(l.o)("books",t.id),N.goBack()},abortText:"Back",abortClick:function(){C(!1)}}),i.a.createElement(Q,null,i.a.createElement(J.a,{icon:f.c,action:function(){return N.goBack()}}),i.a.createElement(q.a,{mode:d.toString()},i.a.createElement(q.b,{onClick:function(){return b(!1)}},"View"),i.a.createElement(q.c,{onClick:function(){return b(!0)}},"Edit")),L&&i.a.createElement(Y,{icon:f.u,title:"Unsaved changes!"}),d&&i.a.createElement(i.a.Fragment,null,i.a.createElement(R.a,{onClick:function(){return function(n,t){Object(l.s)(n,t,(function(n){n>0?(D(!1),z("Saved successful!"),j(!0)):(z("Something went wrong!"),j(!0)),setTimeout((function(){j(!1)}),3e3)}))}("books",h)},icon:f.V}),i.a.createElement(R.a,{onClick:function(){C(!0)},icon:f.gb}),_&&v&&i.a.createElement(X,null,_))),d?i.a.createElement(U,{book:h,onEdit:function(n){return m(n)}}):i.a.createElement(O,{book:h}))};var Q=u.b.div(K(),(function(n){return n.theme.tile.color})),X=u.b.div(W()),Y=Object(u.b)(d.a)(H(),(function(n){return n.theme.main.highlight}))},53:function(n,t,e){"use strict";var r=e(8),o=e(0),a=e.n(o),i=e(6),c=e(21);function u(){var n=Object(r.a)(["\n  flex: 3 1 auto;\n  height: 38px;\n  padding: 5px;\n  box-sizing: border-box;\n  border: none;\n  background-color: ",";\n  color: ",";\n  margin-left: 5px;\n  border-radius: 5px;\n  width: 0;\n  min-width: 100px;\n"]);return u=function(){return n},n}function l(){var n=Object(r.a)(["\n  flex: 1 1 auto;\n"]);return l=function(){return n},n}function f(){var n=Object(r.a)(["\n  margin-right: 5px;\n  width: 20px;\n  height: auto;\n  border-radius: 150px;\n  transition: color 0.2s;\n  color: ",";\n"]);return f=function(){return n},n}function d(){var n=Object(r.a)(["\n  color: ",";\n  background-color: ",";\n  font-size: 16px;\n  overflow: hidden;\n  height: 38px;\n  line-height: 30px;\n  flex: 1 1 auto;\n  padding: 5px;\n  margin: 5px;\n  border-radius: 5px;\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]);return d=function(){return n},n}t.a=function(n){var t=n.value,e=n.label,r=n.placeholder,o=n.icon,i=n.transform,c=n.onChange;return a.a.createElement(b,null,a.a.createElement(s,null,o?a.a.createElement(p,{icon:o,transform:i}):""," ",e),a.a.createElement(h,{type:"text",value:t,onChange:function(n){return c(n.target.value)},placeholder:r}))};var b=i.b.label(d(),(function(n){return n.theme.tile.color}),(function(n){return n.theme.tile.backgroundColor})),p=Object(i.b)(c.a)(f(),(function(n){return n.theme.main.highlight})),s=i.b.div(l()),h=i.b.input(u(),(function(n){return n.theme.input.backgroundColor}),(function(n){return n.theme.input.color}))},540:function(n,t){},541:function(n,t){},542:function(n,t){},543:function(n,t){},544:function(n,t){},58:function(n,t,e){"use strict";e.d(t,"a",(function(){return a})),e.d(t,"b",(function(){return i}));var r=e(14),o=e(0),a=(e(24),function(n,t){var e=Object(o.useState)(!0),a=Object(r.a)(e,2),i=a[0],c=a[1],u=Object(o.useCallback)((function(n,t){switch(t.type){case"resolved":return[t.data,!1,void 0];case"empty":return[void 0,!1,void 0];case"error":return[void 0,!1,t.error];default:return[void 0,!0,void 0]}}),[]),l=Object(o.useReducer)(u,[void 0,!0,void 0]),f=Object(r.a)(l,2),d=f[0],b=f[1];return Object(o.useEffect)((function(){if(i){n.get(t).then((function(n){b(void 0!==n?{type:"resolved",data:n}:{type:"empty"})})).catch((function(n){b({type:"error",error:n})})),c(!1)}}),[n,t,i]),d}),i=function(n,t,e){var a=Object(o.useState)(!0),i=Object(r.a)(a,2),c=i[0],u=i[1],l=Object(o.useCallback)((function(n,t){switch(t.type){case"resolved":return[t.data,!1,void 0];case"empty":return[void 0,!1,void 0];case"error":return[void 0,!1,t.error];default:return[void 0,!0,void 0]}}),[]),f=Object(o.useReducer)(l,[void 0,!0,void 0]),d=Object(r.a)(f,2),b=d[0],p=d[1];return Object(o.useEffect)((function(){if(c){n.where(t).equals(e).first().then((function(n){p(void 0!==n?{type:"resolved",data:n}:{type:"empty"})})).catch((function(n){p({type:"error",error:n})})),u(!1)}}),[n,t,e,c]),b}},62:function(n,t,e){"use strict";var r=e(8),o=e(0),a=e.n(o),i=e(6),c=e(21);function u(){var n=Object(r.a)(["\n  float: left;\n  font-size: calc("," + 10px);\n  margin: 10px 0px 0px 10px;\n  cursor: pointer;\n"]);return u=function(){return n},n}function l(){var n=Object(r.a)(["\n  margin-right: 5px;\n  width: 20px;\n  height: auto;\n  border-radius: 150px;\n  transition: color 0.2s;\n  color: ",";\n  &:hover {\n    color: ",";\n  }\n"]);return l=function(){return n},n}t.a=function(n){var t=n.icon,e=n.transform,r=n.action;return a.a.createElement(d,{onClick:r},a.a.createElement(f,{icon:t,transform:e}))};var f=Object(i.b)(c.a)(l(),(function(n){return n.theme.main.highlight}),(function(n){return n.theme.buttons.color})),d=i.b.div(u(),(function(n){return n.theme.buttons.height}))},63:function(n,t,e){"use strict";e.d(t,"b",(function(){return u})),e.d(t,"c",(function(){return l})),e.d(t,"a",(function(){return f}));var r=e(8),o=e(6);function a(){var n=Object(r.a)(["\n  width: auto;\n  height: ",";\n  float: right;\n  color: ",";\n\n  "," {\n    background-color: ",";\n  }\n\n  "," {\n    background-color: ",";\n  }\n"]);return a=function(){return n},n}function i(){var n=Object(r.a)(["\n  margin: 5px 5px 5px 0px;\n\n  border-radius: 0px 5px 5px 0px;\n"]);return i=function(){return n},n}function c(){var n=Object(r.a)(["\n  width: auto;\n  padding: 10px;\n  margin: 5px 0px 5px 5px;\n  height: ",";\n  line-height: ",";\n  float: left;\n  cursor: pointer;\n  box-shadow: inset -2px -2px 5px 0px rgba(0, 0, 0, 0.3);\n  border-radius: 5px 0px 0px 5px;\n\n  transition: color 0.2s, background-color 0.2s;\n\n  &:hover {\n    color: ",";\n  }\n"]);return c=function(){return n},n}var u=o.b.div(c(),(function(n){return n.theme.buttons.height}),(function(n){return n.theme.buttons.height}),(function(n){return n.theme.buttons.hoverColor})),l=Object(o.b)(u)(i()),f=o.b.div(a(),(function(n){return n.theme.buttons.height}),(function(n){return n.theme.buttons.color}),u,(function(n){return"true"!==n.mode?function(n){return n.theme.buttons.backgroundColor}:function(n){return n.theme.tile.backgroundColor}}),l,(function(n){return"true"===n.mode?function(n){return n.theme.buttons.backgroundColor}:function(n){return n.theme.tile.backgroundColor}}))},676:function(n,t,e){"use strict";e.r(t);var r=e(14),o=e(0),a=e.n(o),i=e(66),c=e(58),u=e(56),l=e(22),f=e(520);t.default=function(n){var t=n.match,e=new i.a,o=Object(c.a)(e.books,+t.params.id),d=Object(r.a)(o,3),b=d[0],p=d[1],s=d[2];return a.a.createElement(u.a,null,!s&&p&&a.a.createElement(l.b,null),s&&!p&&a.a.createElement(a.a.Fragment,null,"Fail by Id"),!s&&!p&&void 0!==b&&a.a.createElement(f.a,{book:b,isNew:""===b.name}))}},70:function(n,t,e){"use strict";var r=e(8),o=e(0),a=e.n(o),i=e(6),c=e(21),u=e(52);function l(){var n=Object(r.a)(["\n  flex: 1 1 auto;\n  margin-right: 5px;\n"]);return l=function(){return n},n}function f(){var n=Object(r.a)(["\n  width: 100%;\n"]);return f=function(){return n},n}function d(){var n=Object(r.a)(["\n  width: 100%;\n  text-align: center;\n"]);return d=function(){return n},n}function b(){var n=Object(r.a)(["\n  width: 180px;\n  position: absolute;\n  z-index: 1010;\n  top: 10px;\n  left: calc(50% - 100px);\n  padding: 10px;\n  background-color: ",";\n  color: ",";\n"]);return b=function(){return n},n}t.a=function(n){var t=n.message,e=n.icon,r=n.confirmeText,o=n.confirmeClick,i=n.abortText,c=n.abortClick;return a.a.createElement(p,null,a.a.createElement(s,null,e?a.a.createElement(m,{icon:e}):""," ",t),a.a.createElement(h,null,a.a.createElement(u.a,{text:i,onClick:c}),a.a.createElement(u.a,{text:r,onClick:o})))};var p=i.b.div(b(),(function(n){return n.theme.tile.backgroundColor}),(function(n){return n.theme.tile.color})),s=i.b.div(d()),h=i.b.div(f()),m=Object(i.b)(c.a)(l())},72:function(n,t,e){"use strict";var r=e(8),o=e(0),a=e.n(o),i=e(6),c=e(21);function u(){var n=Object(r.a)(["\n  flex: 1 1 auto;\n  max-width: 6em;\n  height: 38px;\n  padding: 5px;\n  box-sizing: border-box;\n  border: none;\n  background-color: ",";\n  color: ",";\n  margin-left: 5px;\n  border-radius: 5px;\n"]);return u=function(){return n},n}function l(){var n=Object(r.a)(["\n  flex: 1 1;\n"]);return l=function(){return n},n}function f(){var n=Object(r.a)(["\n  margin-right: 5px;\n  width: 20px;\n  height: auto;\n  border-radius: 150px;\n  transition: color 0.2s;\n  color: ",";\n"]);return f=function(){return n},n}function d(){var n=Object(r.a)(["\n  color: ",";\n  background-color: ",";\n  font-size: 16px;\n  overflow: hidden;\n  height: 38px;\n  line-height: 30px;\n  flex: 1 1 auto;\n  padding: 5px;\n  margin: 5px;\n  border-radius: 5px;\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]);return d=function(){return n},n}t.a=function(n){var t=n.value,e=n.max,r=n.label,o=n.icon,i=n.transform,c=n.onChange;return a.a.createElement(b,null,a.a.createElement(s,null,o?a.a.createElement(p,{icon:o,transform:i}):""," ",r),e&&a.a.createElement(h,{type:"number",max:e,value:t,onChange:function(n){return c(+n.target.value)}}),!e&&a.a.createElement(h,{type:"number",value:t,onChange:function(n){return c(+n.target.value)}}))};var b=i.b.label(d(),(function(n){return n.theme.tile.color}),(function(n){return n.theme.tile.backgroundColor})),p=Object(i.b)(c.a)(f(),(function(n){return n.theme.main.highlight})),s=i.b.div(l()),h=i.b.input(u(),(function(n){return n.theme.input.backgroundColor}),(function(n){return n.theme.input.color}))}}]);
//# sourceMappingURL=37.2b38d661.chunk.js.map