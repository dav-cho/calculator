(this.webpackJsonptakehome=this.webpackJsonptakehome||[]).push([[0],[,,,,,,,,,,,,function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),s=t(4),i=t.n(s),c=t(2),l=t(0),u=Object(r.createContext)({isInvalidExpression:!1,setIsInvalidExpression:function(){},errorMessage:"",setErrorMessage:function(){}}),o=function(){return Object(r.useContext)(u)},d=function(e){var n=e.children,t=Object(r.useState)(!1),a=Object(c.a)(t,2),s=a[0],i=a[1],o=Object(r.useState)(""),d=Object(c.a)(o,2),j=d[0],h=d[1];return Object(l.jsx)(u.Provider,{value:{isInvalidExpression:s,setIsInvalidExpression:i,errorMessage:j,setErrorMessage:h},children:n})},j=(t(12),t(13),function(e){var n=e.setHelpModalOpen,t=Object(r.useRef)(null);return Object(l.jsx)(l.Fragment,{children:Object(l.jsxs)("div",{className:"nav",children:[Object(l.jsx)("div",{className:"title",children:Object(l.jsx)("h1",{children:"calculator"})}),Object(l.jsx)("a",{href:"/",ref:t,onClick:function(e){e.preventDefault(),n(!0),t.current.blur()},children:"help"})]})})}),h=function(e){for(var n=[],t="",r=0,a=0,s=0;s<e.length;++s){var i=e[s];if(" "!==i)if(i>="0"&&i<="9"||"."===i){if(")"===n[n.length-1])return"Syntax Error";if("."===i){if(r)return"Syntax Error";r++}t+=i}else if(t&&(n.push(t),t="",r=0),"()".includes(i)){if("("===i){var c=n[n.length-1];if(!isNaN(Number(c)))return"Syntax Error";a++}else if(")"===i&&--a<0)return"Unmatched Parenthesis";n.push(i)}else if("+*/".includes(i)){var l=n[n.length-1];if(!n.length||"("===l)return"Syntax Error";if("+-*/(".includes(l))return"Syntax Error";n.push(i)}else{if("-"!==i)return"Invalid Expression";if(!n||n&&"("===n[n.length-1])t+="-";else{for(var u=0,o=n.length-1;o>=0&&"+-*/".includes(n[o])&&u<3;)u++,o--;if(1===u)t+="-";else{if(0!==u)return"Syntax Error";n.push(i)}}}}return a?"Unmatched Parenthesis":(t&&n.push(t),n)},f=function e(n){var t=h(n);if("string"===typeof t)return t;var r=[],a=0,s="+",i=0;if(1===t.length)return+t[0];for(;i<t.length;){var c=t[i];if(c>="0"&&c<="9"||c.length>1)a=+c;else if("("===c){for(var l="",u=1;++i<t.length&&u>0;){if("("===t[i])u++;else if(")"===t[i]){if(1===u)break;u--}l+=t[i]}if(!l)return"";var o=e(l);if("number"!==typeof o)return o;a=o,c=t[i]}if("+-*/".includes(c)||i===t.length-1){switch(s){case"+":r.push(a);break;case"-":r.push(-a);break;case"*":r.push(r.pop()*a);break;case"/":r.push(r.pop()/a)}s=c,a=0}i++}var d=r.reduce((function(e,n){return e+n}));return Math.round(100*(d+Number.EPSILON))/100},v=(t(14),function(e){var n=e.currDisplay,t=e.setDisplay,r=e.setDisplayFocused,a=o().isInvalidExpression;return Object(l.jsx)("div",{className:"display",children:Object(l.jsx)("input",{type:"text",value:n,className:a?"invalid":"",onChange:function(e){var n=e.target.value;n=n.replace(" ",""),t(n)},onFocus:function(){r(!0)},onBlur:function(){r(!1)}})})}),b=t(3),p=t(6),O=(t(15),function(e){var n=e.name,t=e.value,a=e.display,s=e.handleClick,i=Object(p.a)(e,["name","value","display","handleClick"]),u=Object(r.useState)(!0),o=Object(c.a)(u,2),d=o[0],j=o[1],f=function(e){var n=h(a+e),t=a[a.length-1];["del","clear","="].includes(e)||"("===t||(Array.isArray(n)?j(!0):j(!1))};return Object(l.jsx)("button",Object(b.a)(Object(b.a)({value:t,className:d?"button valid":"button invalid",onClick:s,onMouseEnter:function(){return f(t)},onMouseLeave:function(){return f(t)}},i),{},{children:n}))}),x=(t(16),function(e){return Object(l.jsx)("div",{className:"controls",children:Object(l.jsx)("div",{className:"buttons-container",children:[{name:"(",value:"("},{name:")",value:")"},{name:"<-",value:"del"},{name:"AC",value:"clear"},{name:"7",value:"7"},{name:"8",value:"8"},{name:"9",value:"9"},{name:"/",value:"/"},{name:"4",value:"4"},{name:"5",value:"5"},{name:"6",value:"6"},{name:"*",value:"*"},{name:"1",value:"1"},{name:"2",value:"2"},{name:"3",value:"3"},{name:"-",value:"-"},{name:"0",value:"0"},{name:".",value:"."},{name:"=",value:"="},{name:"+",value:"+"}].map((function(n){var t=n.name,r=n.value;return Object(l.jsx)(O,Object(b.a)({name:t,value:r},e),t)}))})})}),m=(t(17),function(e){var n=e.helpModalOpen,t=Object(r.useState)(""),a=Object(c.a)(t,2),s=a[0],i=a[1],u=Object(r.useState)(!1),d=Object(c.a)(u,2),j=d[0],b=d[1],p=o(),O=p.setIsInvalidExpression,m=p.setErrorMessage,y=Object(r.useCallback)((function(){var e=f(s);s&&("string"===typeof e?(O(!0),m(e)):i(e.toString()))}),[s,O,m]),g=Object(r.useCallback)((function(e){var t=e.key;n||(function(e){var n=e>="0"&&e<="9"||"."===e,t="+-*/".includes(e),r="()".includes(e),a=["=","Enter","Escape","Backspace","Delete"].includes(e);return n||t||r||a}(t)&&!j&&(["=","Enter"].includes(t)?y():i("Escape"===t?"":"Backspace"===t?function(e){return e.slice(0,e.length-1)}:function(e){return e+t})),"Enter"===t&&j?y():"Escape"===t&&i(""))}),[j,y,n]);return Object(r.useEffect)((function(){var e=h(s);s||O(!1),"string"===typeof e?(O(!0),m(e)):O(!1)}),[s,i,O,m]),Object(r.useEffect)((function(){return window.addEventListener("keydown",g),function(){window.removeEventListener("keydown",g)}}),[g]),Object(l.jsxs)("div",{className:"calculator",children:[Object(l.jsx)(v,{currDisplay:s,setDisplay:i,setDisplayFocused:b}),Object(l.jsx)(x,{display:s,handleClick:function(e){var n=e.target.value;"="===n?y():i("clear"===n?"":"del"===n?function(e){return e.slice(0,e.length-1)}:function(e){return e+n})}})]})});function y(){return(y=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function g(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var E=r.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"});function w(e,n){var t=e.title,a=e.titleId,s=g(e,["title","titleId"]);return r.createElement("svg",y({xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 0 24 24",width:"24px",fill:"#000000",ref:n,"aria-labelledby":a},s),t?r.createElement("title",{id:a},t):null,E)}var k=r.forwardRef(w),I=(t.p,t(18),function(){var e=o().errorMessage;return Object(l.jsxs)("div",{className:"error-message",children:[Object(l.jsx)(k,{}),Object(l.jsx)("span",{children:e})]})}),S=(t(19),function(e){var n=e.isOpen,t=e.setIsOpen,a=function(e){e.preventDefault(),t(!1)};return Object(r.useEffect)((function(){return n&&window.addEventListener("keydown",a),function(){window.removeEventListener("keydown",a)}})),n?Object(s.createPortal)(Object(l.jsx)("div",{className:"help-container",onClick:a,children:Object(l.jsxs)("div",{className:"help",children:[Object(l.jsx)("h1",{children:"Help"}),Object(l.jsx)("h3",{children:"Instructions:"}),Object(l.jsxs)("ol",{children:[Object(l.jsxs)("li",{children:["Use the buttons or your keyboard to type an expression",Object(l.jsxs)("ul",{children:[Object(l.jsx)("li",{children:'Press "Backspace" to delete the last character'}),Object(l.jsx)("li",{children:'Press "Escape" to clear the display'}),Object(l.jsx)("li",{children:"You can also copy/paste an expression into the display"})]})]}),Object(l.jsx)("li",{children:'Type or press "=" or press enter to evaluate the expression'})]}),Object(l.jsx)("h3",{children:"Valid Operations:"}),Object(l.jsxs)("ul",{children:[Object(l.jsx)("li",{children:'Addition: "+"'}),Object(l.jsx)("li",{children:'Subtraction: "-"'}),Object(l.jsx)("li",{children:'Multiplication: "*"'}),Object(l.jsx)("li",{children:'Division: "/"'})]}),Object(l.jsx)("h3",{children:"General Syntax Rules:"}),Object(l.jsxs)("ul",{children:[Object(l.jsx)("li",{children:"Valid numbers include whole numbers and decimals"}),Object(l.jsx)("li",{children:"Input must be a valid mathematical expression"}),Object(l.jsx)("li",{children:"Must have an equal number of opening and closing parenthesis"}),Object(l.jsx)("li",{children:'Only two operators in sequence where the second operator is a "-"'})]})]})}),document.getElementById("modal")):null});t(20);var M=function(){var e=Object(r.useState)(!1),n=Object(c.a)(e,2),t=n[0],a=n[1],s=o().isInvalidExpression;return Object(l.jsxs)("div",{className:"App",children:[Object(l.jsx)(j,{setHelpModalOpen:a}),Object(l.jsx)(m,{helpModalOpen:t}),s?Object(l.jsx)(I,{}):null,Object(l.jsx)(S,{isOpen:t,setIsOpen:a})]})},N=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,22)).then((function(n){var t=n.getCLS,r=n.getFID,a=n.getFCP,s=n.getLCP,i=n.getTTFB;t(e),r(e),a(e),s(e),i(e)}))};i.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(d,{children:Object(l.jsx)(M,{})})}),document.getElementById("root")),N()}],[[21,1,2]]]);
//# sourceMappingURL=main.5446471c.chunk.js.map