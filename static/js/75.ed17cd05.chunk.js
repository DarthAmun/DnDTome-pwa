(this.webpackJsonpdndtome=this.webpackJsonpdndtome||[]).push([[75],{57:function(e,t,n){"use strict";var l=n(8),a=n(14),r=n(0),c=n.n(r),o=n(1),u=n(6),i=n(80),m=n(68),s=n(12),d=n(21),b=n(73),E=n(82),f=n(48),p=function(e){var t=e.type,n=e.name,l=Object(r.useState)(!0),o=Object(a.a)(l,2),u=o[0],p=o[1],h=Object(r.useState)(!1),x=Object(a.a)(h,2),g=x[0],v=x[1];Object(r.useEffect)((function(){Object(f.n)(t+"s","name",n).then((function(e){v(e>0),p(!1)}))}),[t,n]);return c.a.createElement(c.a.Fragment,null,u&&c.a.createElement(i.b,null),!u&&!g&&c.a.createElement(i.a,null),!u&&g&&c.a.createElement(c.a.Fragment,null,function(e){switch(e){case"spell":return c.a.createElement(d.a,{icon:s.K});case"item":return c.a.createElement(m.e,null);case"gear":return c.a.createElement(m.b,null);case"race":return c.a.createElement(m.o,null);case"class":return c.a.createElement(m.i,null);case"selection":return c.a.createElement(i.c,null);case"char":return c.a.createElement(d.a,{icon:s.F});case"monster":return c.a.createElement(d.a,{icon:s.r});case"encounter":return c.a.createElement(m.m,null);case"campaign":return c.a.createElement(m.c,null);case"quest":return c.a.createElement(m.k,null);case"event":return c.a.createElement(b.a,null);case"world":return c.a.createElement(m.l,null);case"location":return c.a.createElement(d.a,{icon:s.J});case"npc":return c.a.createElement(m.g,null);case"randomTable":return c.a.createElement(d.a,{icon:s.cb});case"book":return c.a.createElement(m.d,null);case"group":return c.a.createElement(E.a,null);default:return""}}(t)))};function h(){var e=Object(l.a)(["\n  background-color: ",";\n  color: ",";\n  border-radius: 5px;\n  padding: 5px;\n  text-align: center;\n"]);return h=function(){return e},e}function x(){var e=Object(l.a)(["\n  background-color: ",";\n  color: ",";\n  border-radius: 5px;\n  padding: 2px 5px 2px 5px;\n"]);return x=function(){return e},e}function g(){var e=Object(l.a)(["\n  white-space: pre-line;\n"]);return g=function(){return e},e}function v(){var e=Object(l.a)(["\n  display: inline-block;\n  background-color: ",";\n  border-radius: 5px;\n  text-decoration: none;\n  color: ",";\n  font-size: 14px;\n  padding: 0px 5px 0px 5px;\n  cursor: pointer;\n  white-space: pre;\n"]);return v=function(){return e},e}t.a=function(e){var t=e.text,n=Object(r.useState)(),l=Object(a.a)(n,2),u=l[0],i=l[1],m=Object(o.g)(),s=function(e,t,n){return e.substr(0,t)+e.substr(n+1)},d=Object(r.useCallback)((function(e){if(void 0!==e){if(e.includes("[[")&&e.includes("]]")){var t=e.split("[["),n=[];return t.forEach((function(e,t){if(e.includes("]]")){var l=e.split("]]"),a=l[0].split("."),r="/"+a[0]+"-detail/name/"+a[1];n.push(c.a.createElement(w,{key:t},c.a.createElement(y,{onClick:function(){return m.push(r)}},c.a.createElement(p,{type:a[0],name:a[1]})," ",a[1]),c.a.createElement(w,null,l[1])))}else""!==e&&n.push(c.a.createElement(w,{key:t},e))})),c.a.createElement(c.a.Fragment,null,n)}return c.a.createElement(w,null,e)}}),[m]),b=Object(r.useCallback)((function(e){if(e.includes("||table||")){var n=t.split("||table||"),l=n[1].split("||"),a=!0;return c.a.createElement(c.a.Fragment,null,d(n[0]),c.a.createElement("table",null,c.a.createElement("tbody",null,l.map((function(e,t){if(e.includes("|")){if(a){a=!1;var n=e.split("|");return c.a.createElement("tr",{key:t},n.map((function(e,t){return c.a.createElement(k,{key:t},e)})))}var l=e.split("|");return c.a.createElement("tr",{key:t},l.map((function(e,t){return c.a.createElement(H,{key:t},d(e))})))}return c.a.createElement(c.a.Fragment,null)})))),d(n[2]))}return d(e)}),[t,d]),E=Object(r.useCallback)((function(e){for(;e.includes("{{");){var t=e.indexOf("{{"),n=e.indexOf("}}")+1;e=s(e,t,n)}return b(e)}),[b]);return Object(r.useEffect)((function(){if(void 0!==t){var e=E(t);i(e)}}),[t,m,E]),c.a.createElement(c.a.Fragment,null,u)};var y=u.b.span(v(),(function(e){return e.theme.tile.backgroundColorLink}),(function(e){return e.theme.tile.backgroundColor})),w=u.b.span(g()),k=u.b.th(x(),(function(e){return e.theme.input.backgroundColor}),(function(e){return e.theme.input.color})),H=u.b.td(h(),(function(e){return e.theme.input.backgroundColor}),(function(e){return e.theme.input.color}))},700:function(e,t,n){"use strict";n.r(t);var l=n(8),a=n(14),r=n(0),c=n.n(r),o=n(6),u=n(56),i=n(57),m=n(85);function s(){var e=Object(l.a)(["\n  flex: 1 1 auto;\n  width: calc(100% - 10px);\n  padding: 5px;\n"]);return s=function(){return e},e}function d(){var e=Object(l.a)(["\n  flex: 1 1 auto;\n  padding: 5px;\n  margin: 5px;\n  min-width: calc(100% - 20px);\n  font-weight: bold;\n  text-algin: center;\n  border-radius: 5px;\n  color: ",";\n  background-color: ",";\n"]);return d=function(){return e},e}function b(){var e=Object(l.a)(["\n  flex: 1 1 20em;\n  color: ",";\n  background-color: ",";\n  margin: 0.5em;\n  border-radius: 3px;\n  box-shadow: ",";\n  overflow: hidden;\n\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  align-content: flex-start;\n"]);return b=function(){return e},e}function E(){var e=Object(l.a)(["\n  flex: 1 1 auto;\n\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  align-content: flex-start;\n"]);return E=function(){return e},e}t.default=function(){var e=Object(r.useState)("Create"),t=Object(a.a)(e,2),n=t[0],l=t[1];return c.a.createElement(u.a,null,c.a.createElement(f,null,c.a.createElement(m.a,{children:["Create","Import","Export","Text Formating","Modifiers"],onChange:function(e){return l(e)},activeTab:n}),"Create"===n&&c.a.createElement(c.a.Fragment,null,c.a.createElement(p,null,c.a.createElement(h,null,"How to create Entitys"),c.a.createElement(x,null,'To create a new Spell for example go to Spells and hit "Add Spell" in the top middle.')),c.a.createElement(p,null,c.a.createElement(h,null,"How to create Sub-Entitys"),c.a.createElement(x,null,"For subclasses/subraces you need to visit a class/race and click the little circled + in the subclass/subrace section of the class/race."))),"Import"===n&&c.a.createElement(c.a.Fragment,null,c.a.createElement(p,null,c.a.createElement(h,null,"How to import Entitiys via .json files"),c.a.createElement(x,null,'Go to options and select a file in the top left file select dialog titled "Import".')),c.a.createElement(p,null,c.a.createElement(h,null,"How to import Entitiys via the send functionallity"),c.a.createElement(x,null,"Go to options and navigate to recive. Add the ID of the sender to the filed and accept sended entities.")),c.a.createElement(p,null,c.a.createElement(h,null,"How to import 5eTools files"),c.a.createElement(x,null,'Go to options and navigate to "Other Import" and select the file dialog suited for the entity you want to import.'),c.a.createElement(x,null,"Your entity is not listed there?"),c.a.createElement(x,null,"Those will be updated and added gradually.")),c.a.createElement(p,null,c.a.createElement(h,null,"How to import from other sources"),c.a.createElement(x,null,"As of now only dndtome and 5eTools .json files are supported."))),"Export"===n&&c.a.createElement(c.a.Fragment,null,c.a.createElement(p,null,c.a.createElement(h,null,"How to export Entitiys to .json files"),c.a.createElement(x,null,'Go to options and click the "export"-Button located in the top right section titled "Export". This will export your hole collection to one big file! (Excluding your pdf library)'),c.a.createElement(x,null,'Or go to options and navigate to the entities you want to send for example "Spells". There you can export all your spells to one file.')),c.a.createElement(p,null,c.a.createElement(h,null,"How to send Entitiys via the send functionallity"),c.a.createElement(x,null,'Go to options and navigate to the entities you want to send for example "Spells". Click the "Send all Spells"-Button and copy the ID.'),c.a.createElement(x,null,'Or go to the entities overview and choose a single entity for example a spell called "Heal". Click the "Send Heal"-Button and copy the ID.'),c.a.createElement(x,null,"You can now send the ID to the reciver.")),c.a.createElement(p,null,c.a.createElement(h,null,"How to export 5eTools files"),c.a.createElement(x,null,"Not supported as of now.")),c.a.createElement(p,null,c.a.createElement(h,null,"How to export to other sources"),c.a.createElement(x,null,"As of now you can only export to dndtome .json files."))),"Text Formating"===n&&c.a.createElement(c.a.Fragment,null,c.a.createElement(p,null,c.a.createElement(h,null,"How to create a hyper-link"),c.a.createElement(x,null,"You can add a hyper-link in every textarea."),c.a.createElement(x,null,'To do so write: [[spell.Heal Me]] to link to the spell with the name "Heal Me".'),c.a.createElement(x,null,"Result: ",c.a.createElement(i.a,{text:"[[spell.Heal Me]]"})),c.a.createElement(x,null,"This works for all entities.")),c.a.createElement(p,null,c.a.createElement(h,null,"How to create a table"),c.a.createElement(x,null,"You can add a table in every textarea."),c.a.createElement(x,null,"To do so write: ",c.a.createElement("br",null),"||table||",c.a.createElement("br",null),'||"Header1"|"Header2"|"Header3"|...||',c.a.createElement("br",null),'||"Cell1"|"Cell2"|"Cell3"|...||',c.a.createElement("br",null),"||...||"),c.a.createElement(x,null,"Result:"," ",c.a.createElement(i.a,{text:"||table||||Header1|Header2|Header3|...||||Cell1|Cell2|Cell3|...||"}))),c.a.createElement(p,null,c.a.createElement(h,null,"How to create a table with links in it"),c.a.createElement(x,null,"You can add a link to every cell of a table in every textarea."),c.a.createElement(x,null,"To do so write: ",c.a.createElement("br",null),"||table||",c.a.createElement("br",null),'||"Header1"|"Header2"|"Header3"|...||',c.a.createElement("br",null),'||"[[spell.Heal Me]]"|"Cell2"|"Cell3"|...||',c.a.createElement("br",null),"||...||"),c.a.createElement(x,null,"Result:"," ",c.a.createElement(i.a,{text:"||table||||Header1|Header2|Header|...||||[[spell.Heal Me]]|Cell2|Cell3|...||"})))),"Modifiers"===n&&c.a.createElement(c.a.Fragment,null,c.a.createElement(p,null,c.a.createElement(h,null,"What are modifiers?"),c.a.createElement(x,null,"Modifiers enable you to give class-, subclass-, race-, subracefeatures and magic items (for now) spezial modifiers that will directly modify the character using those things.")),c.a.createElement(p,null,c.a.createElement(h,null,"Equal modifiers"),c.a.createElement(x,null,"Add ","{{'target'='value'}}"," to a feature."),c.a.createElement(x,null,"For example: ","{{ac=15}}"," or ",'{{alignment="Real Evil"}'),c.a.createElement(x,null,"You can even alter deeper values like: ","{{saves.chaSaveProf=1}}"),c.a.createElement(x,null,"Complex example: ","{{ac=10+(([dex]-10)/2)+(([con]-10)/2)}}"," where"," ","(([dex]-10)/2)"," gives you the bonus for the stat.")),c.a.createElement(p,null,c.a.createElement(h,null,"Add modifiers"),c.a.createElement(x,null,"Add ","{{'target'+'value'}}"," to a feature."),c.a.createElement(x,null,"For example: ","{{ac+3}}"," or ",'{{profs+"Thiefs tools"}'),c.a.createElement(x,null,"Deep example: ","{{skills.natureProf+1}}")),c.a.createElement(p,null,c.a.createElement(h,null,"Substract modifiers"),c.a.createElement(x,null,"Add ","{{'target'-'value'}}"," to a feature."),c.a.createElement(x,null,"For example: ","{{ac-3}}"),c.a.createElement(x,null,"Deep example: ","{{money.gold-100}}"),c.a.createElement(x,null,"No option for removing something from a text yet!")),c.a.createElement(p,null,c.a.createElement(h,null,"Add modifiers"),c.a.createElement(x,null,"Add ","{{'target'.add='value'}}"," to a feature."),c.a.createElement(x,null,"For example: ",'{{spells.add="Acid Splash"}}')),c.a.createElement(p,null,c.a.createElement(h,null,"Character fields that can be accessed"),c.a.createElement(x,null,"name: text",c.a.createElement("br",null)," player: text",c.a.createElement("br",null)," pic: text",c.a.createElement("br",null)," background: text",c.a.createElement("br",null)," ac: number",c.a.createElement("br",null)," hp: number",c.a.createElement("br",null)," currentHp: number",c.a.createElement("br",null)," init: number",c.a.createElement("br",null)," speed: text",c.a.createElement("br",null)," str: number",c.a.createElement("br",null)," dex: number",c.a.createElement("br",null)," con: number",c.a.createElement("br",null)," int: number",c.a.createElement("br",null)," wis: number",c.a.createElement("br",null)," cha: number",c.a.createElement("br",null)," actions: text",c.a.createElement("br",null)," profsLangs: text",c.a.createElement("br",null)," senses: text",c.a.createElement("br",null)," alignment: text",c.a.createElement("br",null)," inspiration: number",c.a.createElement("br",null)," castingHit: number",c.a.createElement("br",null)," castingDC: number",c.a.createElement("br",null)," money: Money",c.a.createElement("br",null)," skills: Skills",c.a.createElement("br",null)," saves: Saves")),c.a.createElement(p,null,c.a.createElement(h,null,"Money fields that can be accessed"),c.a.createElement(x,null,"copper: number",c.a.createElement("br",null)," silver: number",c.a.createElement("br",null)," electrum: number",c.a.createElement("br",null)," gold: number",c.a.createElement("br",null)," platinum: number")),c.a.createElement(p,null,c.a.createElement(h,null,"Saves fields that can be accessed"),c.a.createElement(x,null,"strSaveProf: number",c.a.createElement("br",null)," dexSaveProf: number",c.a.createElement("br",null)," conSaveProf: number",c.a.createElement("br",null)," intSaveProf: number",c.a.createElement("br",null)," wisSaveProf: number",c.a.createElement("br",null)," chaSaveProf: number")),c.a.createElement(p,null,c.a.createElement(h,null,"Skills fields that can be accessed"),c.a.createElement(x,null,"acrobaticsProf: number",c.a.createElement("br",null)," animalHandlingProf: number",c.a.createElement("br",null)," arcanaProf: number",c.a.createElement("br",null)," athleticsProf: number",c.a.createElement("br",null)," deceptionProf: number",c.a.createElement("br",null)," historyProf: number",c.a.createElement("br",null)," insightProf: number",c.a.createElement("br",null)," intimidationProf: number",c.a.createElement("br",null)," investigationProf: number",c.a.createElement("br",null)," medicineProf: number",c.a.createElement("br",null)," natureProf: number",c.a.createElement("br",null)," perceptionProf: number",c.a.createElement("br",null)," performanceProf: number",c.a.createElement("br",null)," persuasionProf: number",c.a.createElement("br",null)," religionProf: number",c.a.createElement("br",null)," sleightOfHandProf: number",c.a.createElement("br",null)," stealthProf: number",c.a.createElement("br",null)," survivalProf: number")),c.a.createElement(p,null,c.a.createElement(h,null,"Fields you can add something to"),c.a.createElement(x,null,"monsters",c.a.createElement("br",null)," spells")))))};var f=o.b.div(E()),p=o.b.div(b(),(function(e){return e.theme.tile.color}),(function(e){return e.theme.tile.backgroundColor}),(function(e){return e.theme.tile.boxShadow})),h=o.b.div(d(),(function(e){return e.theme.input.color}),(function(e){return e.theme.input.backgroundColor})),x=o.b.div(s())},85:function(e,t,n){"use strict";var l=n(8),a=n(0),r=n.n(a),c=n(6);function o(){var e=Object(l.a)(["\n  flex: 3 1 auto;\n  height: 30px;\n  line-height: 20px;\n  padding: 5px;\n  box-sizing: border-box;\n  text-align: center;\n  border: none;\n  background-color: ",";\n  color: ",";\n  margin: 2px;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: background-color 0.2s;\n\n  &:hover {\n    background-color: ",";\n    color: ",";\n  }\n\n  ","\n"]);return o=function(){return e},e}function u(){var e=Object(l.a)(["\n  color: ",";\n  background-color: ",";\n  font-size: 16px;\n  overflow: hidden;\n  min-width: calc(100% - 20px);\n  flex: 1 1 auto;\n  padding: 3px;\n  margin: 5px;\n  border-radius: 10px;\n  position: relative;\n  z-index: 100;\n\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: baseline;\n"]);return u=function(){return e},e}t.a=function(e){var t=e.children,n=e.activeTab,l=e.onChange;return r.a.createElement(i,null,t.map((function(e,t){return r.a.createElement(m,{key:t,onClick:function(t){return l(e)},isActive:e===n},e)})))};var i=c.b.div(u(),(function(e){return e.theme.tile.color}),(function(e){return e.theme.tile.backgroundColor})),m=c.b.div(o(),(function(e){return e.theme.input.backgroundColor}),(function(e){return e.theme.input.color}),(function(e){return e.theme.buttons.backgroundColor}),(function(e){return e.theme.buttons.color}),(function(e){if(e.isActive)return"background-color: ".concat(e.theme.buttons.backgroundColor,"; \n      color: ").concat(e.theme.buttons.color,";")}))}}]);
//# sourceMappingURL=75.ed17cd05.chunk.js.map