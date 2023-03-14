/*! For license information please see 241.js.LICENSE.txt */
"use strict";(self.webpackChunkimageus=self.webpackChunkimageus||[]).push([[241],{6241:(t,e,n)=>{n.r(e),n.d(e,{default:()=>tt});var r,o,i,a=n(7294),l=n(1298),c=n(9655),u=n(9250),s=n(7715),f=n(5591),p=n(4334),h=n(2287),d=n(9785),m=n(1643),v=m.Z.div(r||(o=["\n  table {\n    white-space: nowrap;\n  }\n\n  table tbody tr {\n    height: 100px;\n  }\n\n  table tr th,\n  table tbody td {\n    text-align: center;\n  }\n  @media screen and (max-width: 850px) {\n    .delete_btn button {\n      width: 53px;\n      font-size: 0.65rem;\n    }\n  }\n"],i||(i=o.slice(0)),r=Object.freeze(Object.defineProperties(o,{raw:{value:Object.freeze(i)}}))));function y(t){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}function g(){g=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,r=Object.defineProperty||function(t,e,n){t[e]=n.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",l=o.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,n){return t[e]=n}}function u(t,e,n,o){var i=e&&e.prototype instanceof p?e:p,a=Object.create(i.prototype),l=new j(o||[]);return r(a,"_invoke",{value:_(t,n,l)}),a}function s(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var f={};function p(){}function h(){}function d(){}var m={};c(m,i,(function(){return this}));var v=Object.getPrototypeOf,b=v&&v(v(S([])));b&&b!==e&&n.call(b,i)&&(m=b);var x=d.prototype=p.prototype=Object.create(m);function w(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function o(r,i,a,l){var c=s(t[r],t,i);if("throw"!==c.type){var u=c.arg,f=u.value;return f&&"object"==y(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,a,l)}),(function(t){o("throw",t,a,l)})):e.resolve(f).then((function(t){u.value=t,a(u)}),(function(t){return o("throw",t,a,l)}))}l(c.arg)}var i;r(this,"_invoke",{value:function(t,n){function r(){return new e((function(e,r){o(t,n,e,r)}))}return i=i?i.then(r,r):r()}})}function _(t,e,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return{value:void 0,done:!0}}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var l=L(a,n);if(l){if(l===f)continue;return l}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var c=s(t,e,n);if("normal"===c.type){if(r=n.done?"completed":"suspendedYield",c.arg===f)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r="completed",n.method="throw",n.arg=c.arg)}}}function L(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,L(t,e),"throw"===e.method))return f;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var r=s(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,f;var o=r.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function S(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:N}}function N(){return{value:void 0,done:!0}}return h.prototype=d,r(x,"constructor",{value:d,configurable:!0}),r(d,"constructor",{value:h,configurable:!0}),h.displayName=c(d,l,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,c(t,l,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},w(E.prototype),c(E.prototype,a,(function(){return this})),t.AsyncIterator=E,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var a=new E(u(e,n,r,o),i);return t.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},w(x),c(x,l,"Generator"),c(x,i,(function(){return this})),c(x,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},t.values=S,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return a.type="throw",a.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var l=n.call(i,"catchLoc"),c=n.call(i,"finallyLoc");if(l&&c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(l){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),k(n),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;k(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:S(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),f}},t}function b(t,e,n,r,o,i,a){try{var l=t[i](a),c=l.value}catch(t){return void n(t)}l.done?e(c):Promise.resolve(c).then(r,o)}function x(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){b(i,r,o,a,l,"next",t)}function l(t){b(i,r,o,a,l,"throw",t)}a(void 0)}))}}const w=function(){var t=(0,f.ZP)("friendlist",d.NV,{revalidateIfStale:!1,revalidateOnFocus:!1,revalidateOnReconnect:!1}),e=t.data,n=t.mutate,r=(0,p.Z)("deleteFriend",d.V6).trigger,o=(0,a.useCallback)((function(t){return x(g().mark((function e(){return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r(t);case 2:return e.next=4,n();case 4:case"end":return e.stop()}}),e)})))}),[]);return a.createElement(v,null,a.createElement("table",null,a.createElement("colgroup",null,a.createElement("col",{span:1,style:{width:"15%"}}),a.createElement("col",{span:1,style:{width:"30%"}}),a.createElement("col",{span:1,style:{width:"40%"}}),a.createElement("col",{span:1,style:{width:"15%"}})),a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",{scope:"col"},"이름"),a.createElement("th",{scope:"col"},"이메일"),a.createElement("th",{scope:"col"},"가입 유형"),a.createElement("th",{scope:"col"},"목록 삭제"))),a.createElement("tbody",null,0!==(null==e?void 0:e.length)?null==e?void 0:e.map((function(t){return a.createElement("tr",{key:t.id},a.createElement("td",null,t.name),a.createElement("td",null,t.email),a.createElement("td",null,t.user_type),a.createElement("td",null,a.createElement("div",{className:"delete_btn"},a.createElement(h.z,{type:"button",onClick:o(t.id)},"삭제"))))})):a.createElement("tr",null,a.createElement("td",{colSpan:4},"등록된 친구가 없습니다.")))))};var E=n(4578),_=n(4405),L=n(8678),O=n(1721);function k(t){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},k(t)}function j(){j=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,r=Object.defineProperty||function(t,e,n){t[e]=n.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",l=o.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,n){return t[e]=n}}function u(t,e,n,o){var i=e&&e.prototype instanceof p?e:p,a=Object.create(i.prototype),l=new O(o||[]);return r(a,"_invoke",{value:w(t,n,l)}),a}function s(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var f={};function p(){}function h(){}function d(){}var m={};c(m,i,(function(){return this}));var v=Object.getPrototypeOf,y=v&&v(v(S([])));y&&y!==e&&n.call(y,i)&&(m=y);var g=d.prototype=p.prototype=Object.create(m);function b(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function x(t,e){function o(r,i,a,l){var c=s(t[r],t,i);if("throw"!==c.type){var u=c.arg,f=u.value;return f&&"object"==k(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,a,l)}),(function(t){o("throw",t,a,l)})):e.resolve(f).then((function(t){u.value=t,a(u)}),(function(t){return o("throw",t,a,l)}))}l(c.arg)}var i;r(this,"_invoke",{value:function(t,n){function r(){return new e((function(e,r){o(t,n,e,r)}))}return i=i?i.then(r,r):r()}})}function w(t,e,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return{value:void 0,done:!0}}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var l=E(a,n);if(l){if(l===f)continue;return l}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var c=s(t,e,n);if("normal"===c.type){if(r=n.done?"completed":"suspendedYield",c.arg===f)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r="completed",n.method="throw",n.arg=c.arg)}}}function E(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,E(t,e),"throw"===e.method))return f;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var r=s(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,f;var o=r.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function _(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(_,this),this.reset(!0)}function S(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:N}}function N(){return{value:void 0,done:!0}}return h.prototype=d,r(g,"constructor",{value:d,configurable:!0}),r(d,"constructor",{value:h,configurable:!0}),h.displayName=c(d,l,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,c(t,l,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},b(x.prototype),c(x.prototype,a,(function(){return this})),t.AsyncIterator=x,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var a=new x(u(e,n,r,o),i);return t.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},b(g),c(g,l,"Generator"),c(g,i,(function(){return this})),c(g,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},t.values=S,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return a.type="throw",a.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var l=n.call(i,"catchLoc"),c=n.call(i,"finallyLoc");if(l&&c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(l){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),L(n),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;L(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:S(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),f}},t}function S(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function N(t,e,n,r,o,i,a){try{var l=t[i](a),c=l.value}catch(t){return void n(t)}l.done?e(c):Promise.resolve(c).then(r,o)}const P=function(){var t,e=(t=j().mark((function t(e){return j().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",O.ZP.get("/backapi"+e).then((function(t){return function(t){if(Array.isArray(t))return S(t)}(e=t.data.result.slice(0,5))||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(e)||function(t,e){if(t){if("string"==typeof t)return S(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?S(t,e):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}();var e})).catch((function(t){console.error(t)})));case 1:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){N(i,r,o,a,l,"next",t)}function l(t){N(i,r,o,a,l,"throw",t)}a(void 0)}))});return function(t){return e.apply(this,arguments)}}();var A,Z,z,F;function G(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}var T=m.Z.div(A||(A=G(["\n  display: flex;\n  flex-direction: column;\n\n  width: 100%;\n  height: 100%;\n  padding: 40px 0;\n  box-sizing: border-box;\n\n  p {\n    margin: 0;\n  }\n\n  form {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    text-align: left;\n\n    height: 60px;\n    padding: 0 20px;\n    border-radius: 30px;\n\n    background: #fff;\n    box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 19%);\n\n    .search_btn {\n      padding-left: 10px;\n\n      button {\n        width: 60px;\n        font-size: 0.5rem;\n      }\n    }\n  }\n\n  form .search_input {\n    width: 100%;\n    margin-left: 10px;\n\n    label {\n      position: absolute;\n      display: block;\n      z-index: 100;\n\n      font-size: 12px;\n      font-weight: bold;\n    }\n    input {\n      width: 100%;\n      border: 0;\n      padding: 20px 0 0;\n    }\n    input:focus {\n      outline: none;\n      &::placeholder {\n        color: transparent;\n      }\n    }\n  }\n"]))),C=m.Z.div(Z||(Z=G(["\n  margin: 0 40px;\n"]))),I=m.Z.div(z||(z=G(["\n  position: absolute;\n\n  width: calc(100% - 180px);\n  margin-left: 20px;\n\n  border-radius: 5px;\n  box-shadow: rgb(0 0 0 / 30%) 0px 8px 12px 0px;\n  background-color: white;\n\n  ul li {\n    padding: 10px 0;\n\n    .search_result_space {\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n      gap: 0.3rem;\n\n      span:first-of-type {\n        margin-bottom: 5px;\n      }\n    }\n  }\n\n  ul li.preview_li {\n    border-bottom: 1px solid #e9ecef;\n\n    &:hover {\n      background-color: #f7f7f9;\n      cursor: pointer;\n    }\n  }\n"]))),Y=m.Z.div(F||(F=G(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex: 1 0 auto;\n\n  width: 100%;\n  margin-top: 30px;\n\n  .search_result_box {\n    align-self: flex-start;\n\n    ul {\n      margin-top: 20px;\n    }\n  }\n\n  .search_result {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n    gap: 1.5rem;\n    margin-top: 15px;\n\n    button {\n      font-size: 0.8rem;\n    }\n  }\n\n  .not_found {\n    text-align: center;\n\n    .not_found_text {\n      margin-top: 20px;\n    }\n  }\n"])));function D(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],a=!0,l=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(t){l=!0,o=t}finally{try{a||null==n.return||n.return()}finally{if(l)throw o}}return i}}(t,e)||function(t,e){if(t){if("string"==typeof t)return M(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?M(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function M(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}const W=function(){var t=(0,f.kY)().mutate,e=D((0,a.useState)(""),2),n=e[0],r=e[1],o=(0,f.ZP)("/user/search?email=".concat(n),P,{revalidateOnFocus:!1,revalidateOnMount:!1,revalidateOnReconnect:!1,keepPreviousData:!0}).data,i=(0,p.Z)("/user/friend",d.DZ).trigger,l=D((0,a.useState)(!1),2),c=l[0],u=l[1],s=D((0,a.useState)(),2),m=s[0],v=s[1],y=D((0,L.Z)(""),3),g=y[0],b=y[1],x=y[2];(0,a.useEffect)((function(){var t=setTimeout((function(){r(g)}),300);return function(){return clearTimeout(t)}}),[g]);var w=(0,a.useCallback)((function(t){t.preventDefault();var e=null==o?void 0:o.find((function(t){return t.email===g}));v(e)}),[g,n,o]),O=(0,a.useCallback)((function(t){return function(){if(null!=t&&t.id){var e;b(null!==(e=t.email)&&void 0!==e?e:""),u(!1);var n=null==o?void 0:o.find((function(e){return e.id===t.id}));v(n)}}}),[o]),k=(0,a.useCallback)((function(e){return function(){t("friendlist",i(e))}}),[m]);return a.createElement(T,null,a.createElement(C,null,a.createElement("form",{onSubmit:w},a.createElement("div",{className:"search_input"},a.createElement("label",{htmlFor:"searchFriend"},"Search"),a.createElement("input",{type:"text",id:"searchFriend",name:"search",autoComplete:"off",placeholder:"검색할 유저의 이메일을 입력하세요..",onChange:x,onFocus:function(){return u(!0)},onBlur:function(){return u(!1)},value:g})),a.createElement("div",{className:"search_btn"},a.createElement(h.z,{type:"submit"},"검색"))),c&&a.createElement(I,null,a.createElement("ul",null,o&&0!==(null==o?void 0:o.length)?o.map((function(t){return a.createElement("li",{key:t.id,className:"preview_li",onMouseDown:O(t)},a.createElement("div",{className:"search_result_space"},a.createElement("span",null,"이메일: ",t.email),a.createElement("span",null,"이름: ",t.name),a.createElement("span",null,"가입유형: ",t.user_type)))})):a.createElement("li",null,a.createElement("div",null,a.createElement("span",null,"검색 결과가 없습니다.")))))),a.createElement(Y,null,m?a.createElement("div",{className:"search_result_box"},a.createElement("h2",null,"검색결과"),a.createElement("div",{className:"search_result"},a.createElement("span",null,"이름: ",null==m?void 0:m.name),a.createElement("span",null,"이메일: ",null==m?void 0:m.email,"입니다."),a.createElement(h.z,{type:"button",onClick:k(null==m?void 0:m.id)},"친구 추가하기"))):a.createElement("div",{className:"not_found"},a.createElement(_.Pd.Provider,{value:{size:"30%",style:{display:"inline-block"}}},a.createElement(E.Xtm,null)),a.createElement("div",{className:"not_found_text"},a.createElement("span",null,"검색 결과가 없습니다.")))))};var R,U,V,$,B;function X(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}var q=m.Z.div(R||(R=X(["\n  height: 100%;\n\n  h1,\n  h2,\n  ul {\n    margin: 0;\n    padding: 0;\n  }\n\n  li {\n    list-style: none;\n  }\n\n  a {\n    color: black;\n    text-decoration: none;\n\n    &:active {\n      color: black;\n    }\n  }\n\n  .content_wrapper {\n    position: relative;\n    right: 3px;\n\n    padding-bottom: 40px;\n  }\n"]))),H=m.Z.header(U||(U=X(["\n  div {\n    padding: 28px 0;\n    height: 105px;\n    box-sizing: border-box;\n  }\n\n  h1 {\n    margin-left: 2em;\n  }\n"]))),J=m.Z.div(V||(V=X(["\n  position: relative;\n  top: 65px;\n\n  width: fit-content;\n  margin: auto;\n\n  table {\n    width: 100%;\n    position: relative;\n    padding-bottom: 0;\n    border: none;\n    border-collapse: collapse;\n\n    td,\n    th {\n      text-align: start;\n      padding: 16px;\n    }\n\n    th {\n      border-bottom: 1px solid #a39485;\n    }\n\n    tr td {\n      border-bottom: 1px solid #e5e5e5;\n    }\n  }\n\n  @media screen and (max-width: 850px) {\n    width: 100%;\n  }\n"]))),K=m.Z.div($||($=X(["\n  display: inline-block;\n  position: absolute;\n  top: -40px;\n  left: 40px;\n\n  box-sizing: border-box;\n\n  ul {\n    display: inline-flex;\n    gap: 1rem;\n\n    li {\n      text-align: center;\n      line-height: 45px;\n    }\n\n    a {\n      display: block;\n\n      width: 100px;\n      height: 60px;\n      border-radius: 15px;\n\n      color: #111;\n      box-sizing: border-box;\n      background-color: #ccc;\n      box-shadow: -2px 2px 2px 2px rgb(0 0 0 / 40%);\n    }\n\n    a.active_tab {\n      color: black;\n      background-color: white;\n      box-shadow: -2px 2px 2px 2px rgb(0 0 0 / 40%);\n    }\n  }\n"]))),Q=m.Z.div(B||(B=X(["\n  position: relative;\n\n  width: 100%;\n  border-top: 1px solid #a39485;\n\n  background-color: white;\n\n  @media screen and (min-width: 850px) {\n    width: 800px;\n    border-radius: 15px;\n    box-shadow: -2px 2px 2px 2px rgb(0 0 0 / 40%);\n  }\n"])));const tt=function(){return a.createElement(s.Z,null,a.createElement(q,null,a.createElement(l.ZP,null,a.createElement("div",{className:"content_wrapper"},a.createElement(H,null,a.createElement("div",null,a.createElement("h1",null,"친구 관리"))),a.createElement(J,null,a.createElement(K,null,a.createElement("ul",null,a.createElement("li",null,a.createElement(c.OL,{to:"",className:function(t){return t.isActive?"active_tab":void 0},end:!0,defaultChecked:!0},"친구 목록")),a.createElement("li",null,a.createElement(c.OL,{to:"search",className:function(t){return t.isActive?"active_tab":void 0}},"유저 검색")))),a.createElement(Q,null,a.createElement(u.Z5,null,a.createElement(u.AW,{path:"/",element:a.createElement(w,null)}),a.createElement(u.AW,{path:"/search",element:a.createElement(W,null)}),a.createElement(u.AW,{path:"*",element:a.createElement(u.Fg,{to:"/people_management"})}))))))))}}}]);