/*! For license information please see 19.c66b43a5.chunk.js.LICENSE.txt */
(this.webpackJsonpdndtome=this.webpackJsonpdndtome||[]).push([[19],{262:function(e,i,t){"use strict";t.d(i,"a",(function(){return a})),t.d(i,"b",(function(){return n})),t.d(i,"c",(function(){return r}));var a={prefix:"far",iconName:"calendar-alt",icon:[448,512,[],"f073","M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"]},n={prefix:"far",iconName:"image",icon:[512,512,[],"f03e","M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"]},r={prefix:"far",iconName:"trash-alt",icon:[448,512,[],"f2ed","M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"]}},628:function(e,i,t){Object.defineProperty(i,"__esModule",{value:!0});var a=t(1),n=t(5),r=function(e){var i,t=e.bgcolor,n=e.completed,r=e.baseBgColor,l=e.height,c=e.width,o=e.margin,s=e.padding,d=e.borderRadius,h=e.labelAlignment,g=e.labelColor,b=e.labelSize,u=e.isLabelVisible,f="left"===(i=h)?"flex-start":"center"===i?"center":"right"===i?"flex-end":null,m={height:l,backgroundColor:r,borderRadius:d,padding:s,width:c,margin:o},p={height:l,width:"string"===typeof n||n>100?"100%":n+"%",backgroundColor:t,transition:"width 1s ease-in-out",borderRadius:"inherit",display:"flex",alignItems:"center",justifyContent:"outside"!==h&&f?f:"normal"},v={padding:"outside"===h?"0 0 0 5px":"5px",color:g,fontWeight:"bold",fontSize:b,display:u?"initial":"none"},z={display:"outside"===h?"flex":"initial",alignItems:"outside"===h?"center":"initial"};return a.createElement("div",{style:z},a.createElement("div",{style:m},a.createElement("div",{style:p},"outside"!==h&&a.createElement("span",{style:v},"number"===typeof n?n+"%":""+n))),"outside"===h&&a.createElement("span",{style:v},"number"===typeof n?n+"%":""+n))};r.propTypes={completed:n.oneOfType([n.string,n.number]).isRequired,bgcolor:n.string,baseBgColor:n.string,height:n.string,width:n.string,borderRadius:n.string,margin:n.string,padding:n.string,labelAlignment:n.oneOf(["left","center","right","outside"]),labelColor:n.string,labelSize:n.string,isLabelVisible:n.bool},r.defaultProps={bgcolor:"#6a1b9a",height:"20px",width:"100%",borderRadius:"50px",labelAlignment:"right",baseBgColor:"#e0e0de",labelColor:"#fff",labelSize:"15px",isLabelVisible:!0},i.default=r}}]);
//# sourceMappingURL=19.c66b43a5.chunk.js.map