(this.webpackJsonpdndtome=this.webpackJsonpdndtome||[]).push([[18],{531:function(n,e,t){"use strict";var r=t(4),a=t(1),o=t.n(a),c=t(3),u=t(10),i=t(30);function l(){var n=Object(r.a)(["\n  height: auto;\n  width: calc(100% - 30px);\n  margin: 10px 5px 5px 5px;\n  float: left;\n  line-height: 18px;\n  padding: 10px;\n  border-radius: 5px;\n  background-color: ",";\n"]);return l=function(){return n},n}function d(){var n=Object(r.a)(["\n  display: inline-block;\n  color: ",";\n  text-decoration: none;\n  margin: 0px 5px 0px 5px;\n"]);return d=function(){return n},n}function p(){var n=Object(r.a)(["\n  height: auto;\n  width: calc(100% - 10px);\n  float: left;\n  padding: 5px 5px 0 5px;\n  display: flex;\n  flex-wrap: wrap;\n"]);return p=function(){return n},n}function f(){var n=Object(r.a)(["\n  height: auto;\n  float: left;\n  padding: 10px;\n  margin: 0 5px 5px 5px;\n  font-size: 14px;\n  width: calc(100% - 30px);\n  color: ",";\n  text-align: center;\n  border-radius: 5px;\n"]);return f=function(){return n},n}function x(){var n=Object(r.a)(["\n  flex: 1 1 15em;\n  color: ",";\n  background-color: ",";\n  margin: 0.5em;\n  border-radius: 10px;\n  box-shadow: ",";\n  overflow: hidden;\n\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n  align-content: center;\n"]);return x=function(){return n},n}e.a=function(n){var e=n.text,t=n.buttonText,r=n.onButton;return o.a.createElement(m,null,o.a.createElement(s,null,o.a.createElement(b,null,o.a.createElement("b",null,"A problem occured!")),o.a.createElement(g,null,o.a.createElement(h,null,"Text: "),e),o.a.createElement(i.a,{text:t,onClick:function(){return r()},icon:u.V})))};var m=c.b.div(x(),(function(n){return n.theme.tile.color}),(function(n){return n.theme.tile.backgroundColor}),(function(n){return n.theme.tile.boxShadow})),b=c.b.div(f(),(function(n){return n.theme.tile.headerColor})),s=c.b.div(p()),h=c.b.span(d(),(function(n){return n.theme.tile.backgroundColorLink})),g=c.b.div(l(),(function(n){return n.theme.tile.backgroundColor}))},647:function(n,e,t){"use strict";t.r(e);var r=t(15),a=t(1),o=t.n(a),c=t(2),u=t(247),i=t(138),l=t(341),d=t(69),p=t(531),f=t(32),x=t(568);e.default=function(n){var e=n.match,t=Object(c.f)(),a=new i.a,m=Object(l.b)(a.encounters,"name",e.params.name),b=Object(r.a)(m,3),s=b[0],h=b[1],g=b[2];return o.a.createElement(o.a.Fragment,null,!g&&h&&o.a.createElement(f.b,null),g&&!h&&o.a.createElement(o.a.Fragment,null,"Error occured"),!g&&!h&&void 0===s&&o.a.createElement(p.a,{text:"No such encounter exists. Want to creat such encounter?",buttonText:"Add",onButton:function(){return function(){var n=new u.a(0,e.params.name);delete n.id,Object(d.b)("encounters",n,(function(n){t.push("/encounter-detail/id/".concat(n))}))}()}}),g||h||void 0===s?"":o.a.createElement(x.a,{encounter:s,isNew:""===s.name}))}}}]);
//# sourceMappingURL=18.de403592.chunk.js.map