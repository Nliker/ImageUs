"use strict";(self.webpackChunkimageus=self.webpackChunkimageus||[]).push([[378],{7378:(e,r,t)=>{t.r(r),t.d(r,{default:()=>C});var n={};t.r(n),t.d(n,{exclude:()=>x,extract:()=>j,parse:()=>F,parseUrl:()=>w,pick:()=>S,stringify:()=>v,stringifyUrl:()=>O});var o=t(7294),a=t(5591);const c="%[a-f0-9]{2}",i=new RegExp("("+c+")|([^%]+?)","gi"),s=new RegExp("("+c+")+","gi");function l(e,r){try{return[decodeURIComponent(e.join(""))]}catch{}if(1===e.length)return e;r=r||1;const t=e.slice(0,r),n=e.slice(r);return Array.prototype.concat.call([],l(t),l(n))}function u(e){try{return decodeURIComponent(e)}catch{let r=e.match(i)||[];for(let t=1;t<r.length;t++)r=(e=l(r,t).join("")).match(i)||[];return e}}function p(e,r){if("string"!=typeof e||"string"!=typeof r)throw new TypeError("Expected the arguments to be of type `string`");if(""===e||""===r)return[];const t=e.indexOf(r);return-1===t?[]:[e.slice(0,t),e.slice(t+r.length)]}function f(e,r){const t={};if(Array.isArray(r))for(const n of r){const r=Object.getOwnPropertyDescriptor(e,n);r?.enumerable&&Object.defineProperty(t,n,r)}else for(const n of Reflect.ownKeys(e)){const o=Object.getOwnPropertyDescriptor(e,n);o.enumerable&&r(n,e[n],e)&&Object.defineProperty(t,n,o)}return t}const d=Symbol("encodeFragmentIdentifier");function y(e){if("string"!=typeof e||1!==e.length)throw new TypeError("arrayFormatSeparator must be single character string")}function m(e,r){return r.encode?r.strict?encodeURIComponent(e).replace(/[!'()*]/g,(e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`)):encodeURIComponent(e):e}function g(e,r){return r.decode?function(e){if("string"!=typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return decodeURIComponent(e)}catch{return function(e){const r={"%FE%FF":"��","%FF%FE":"��"};let t=s.exec(e);for(;t;){try{r[t[0]]=decodeURIComponent(t[0])}catch{const e=u(t[0]);e!==t[0]&&(r[t[0]]=e)}t=s.exec(e)}r["%C2"]="�";const n=Object.keys(r);for(const t of n)e=e.replace(new RegExp(t,"g"),r[t]);return e}(e)}}(e):e}function b(e){return Array.isArray(e)?e.sort():"object"==typeof e?b(Object.keys(e)).sort(((e,r)=>Number(e)-Number(r))).map((r=>e[r])):e}function h(e){const r=e.indexOf("#");return-1!==r&&(e=e.slice(0,r)),e}function k(e,r){return r.parseNumbers&&!Number.isNaN(Number(e))&&"string"==typeof e&&""!==e.trim()?e=Number(e):!r.parseBooleans||null===e||"true"!==e.toLowerCase()&&"false"!==e.toLowerCase()||(e="true"===e.toLowerCase()),e}function j(e){const r=(e=h(e)).indexOf("?");return-1===r?"":e.slice(r+1)}function F(e,r){y((r={decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1,...r}).arrayFormatSeparator);const t=function(e){let r;switch(e.arrayFormat){case"index":return(e,t,n)=>{r=/\[(\d*)]$/.exec(e),e=e.replace(/\[\d*]$/,""),r?(void 0===n[e]&&(n[e]={}),n[e][r[1]]=t):n[e]=t};case"bracket":return(e,t,n)=>{r=/(\[])$/.exec(e),e=e.replace(/\[]$/,""),r?void 0!==n[e]?n[e]=[...n[e],t]:n[e]=[t]:n[e]=t};case"colon-list-separator":return(e,t,n)=>{r=/(:list)$/.exec(e),e=e.replace(/:list$/,""),r?void 0!==n[e]?n[e]=[...n[e],t]:n[e]=[t]:n[e]=t};case"comma":case"separator":return(r,t,n)=>{const o="string"==typeof t&&t.includes(e.arrayFormatSeparator),a="string"==typeof t&&!o&&g(t,e).includes(e.arrayFormatSeparator);t=a?g(t,e):t;const c=o||a?t.split(e.arrayFormatSeparator).map((r=>g(r,e))):null===t?t:g(t,e);n[r]=c};case"bracket-separator":return(r,t,n)=>{const o=/(\[])$/.test(r);if(r=r.replace(/\[]$/,""),!o)return void(n[r]=t?g(t,e):t);const a=null===t?[]:t.split(e.arrayFormatSeparator).map((r=>g(r,e)));void 0!==n[r]?n[r]=[...n[r],...a]:n[r]=a};default:return(e,r,t)=>{void 0!==t[e]?t[e]=[...[t[e]].flat(),r]:t[e]=r}}}(r),n=Object.create(null);if("string"!=typeof e)return n;if(!(e=e.trim().replace(/^[?#&]/,"")))return n;for(const o of e.split("&")){if(""===o)continue;const e=r.decode?o.replace(/\+/g," "):o;let[a,c]=p(e,"=");void 0===a&&(a=e),c=void 0===c?null:["comma","separator","bracket-separator"].includes(r.arrayFormat)?c:g(c,r),t(g(a,r),c,n)}for(const[e,t]of Object.entries(n))if("object"==typeof t&&null!==t)for(const[e,n]of Object.entries(t))t[e]=k(n,r);else n[e]=k(t,r);return!1===r.sort?n:(!0===r.sort?Object.keys(n).sort():Object.keys(n).sort(r.sort)).reduce(((e,r)=>{const t=n[r];return Boolean(t)&&"object"==typeof t&&!Array.isArray(t)?e[r]=b(t):e[r]=t,e}),Object.create(null))}function v(e,r){if(!e)return"";y((r={encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:",",...r}).arrayFormatSeparator);const t=t=>r.skipNull&&null==e[t]||r.skipEmptyString&&""===e[t],n=function(e){switch(e.arrayFormat){case"index":return r=>(t,n)=>{const o=t.length;return void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?t:null===n?[...t,[m(r,e),"[",o,"]"].join("")]:[...t,[m(r,e),"[",m(o,e),"]=",m(n,e)].join("")]};case"bracket":return r=>(t,n)=>void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?t:null===n?[...t,[m(r,e),"[]"].join("")]:[...t,[m(r,e),"[]=",m(n,e)].join("")];case"colon-list-separator":return r=>(t,n)=>void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?t:null===n?[...t,[m(r,e),":list="].join("")]:[...t,[m(r,e),":list=",m(n,e)].join("")];case"comma":case"separator":case"bracket-separator":{const r="bracket-separator"===e.arrayFormat?"[]=":"=";return t=>(n,o)=>void 0===o||e.skipNull&&null===o||e.skipEmptyString&&""===o?n:(o=null===o?"":o,0===n.length?[[m(t,e),r,m(o,e)].join("")]:[[n,m(o,e)].join(e.arrayFormatSeparator)])}default:return r=>(t,n)=>void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?t:null===n?[...t,m(r,e)]:[...t,[m(r,e),"=",m(n,e)].join("")]}}(r),o={};for(const[r,n]of Object.entries(e))t(r)||(o[r]=n);const a=Object.keys(o);return!1!==r.sort&&a.sort(r.sort),a.map((t=>{const o=e[t];return void 0===o?"":null===o?m(t,r):Array.isArray(o)?0===o.length&&"bracket-separator"===r.arrayFormat?m(t,r)+"[]":o.reduce(n(t),[]).join("&"):m(t,r)+"="+m(o,r)})).filter((e=>e.length>0)).join("&")}function w(e,r){r={decode:!0,...r};let[t,n]=p(e,"#");return void 0===t&&(t=e),{url:t?.split("?")?.[0]??"",query:F(j(e),r),...r&&r.parseFragmentIdentifier&&n?{fragmentIdentifier:g(n,r)}:{}}}function O(e,r){r={encode:!0,strict:!0,[d]:!0,...r};const t=h(e.url).split("?")[0]||"";let n=v({...F(j(e.url),{sort:!1}),...e.query},r);n&&(n=`?${n}`);let o=function(e){let r="";const t=e.indexOf("#");return-1!==t&&(r=e.slice(t)),r}(e.url);if(e.fragmentIdentifier){const n=new URL(t);n.hash=e.fragmentIdentifier,o=r[d]?n.hash:`#${e.fragmentIdentifier}`}return`${t}${n}${o}`}function S(e,r,t){t={parseFragmentIdentifier:!0,[d]:!1,...t};const{url:n,query:o,fragmentIdentifier:a}=w(e,t);return O({url:n,query:f(o,r),fragmentIdentifier:a},t)}function x(e,r,t){return S(e,Array.isArray(r)?e=>!r.includes(e):(e,t)=>!r(e,t),t)}const E=n;var I=t(9250),N=t(2648);const C=function(){var e=(0,I.s0)(),r=(0,a.kY)().mutate,t=E.parse(window.location.search),n=t.coperation,c=t.code,i=(0,a.ZP)(["/oauth-login/callback",n,c],N.J_,{revalidateIfStale:!1,revalidateOnFocus:!1,revalidateOnReconnect:!1}).data;return(0,o.useEffect)((function(){i&&("success"===i.result?r("/user/my",(0,N.aZ)("/user/my")).then((function(){e("/",{replace:!0})})):e("/login"))}),[i]),o.createElement("div",null,"로그인 요청 처리중..")}}}]);