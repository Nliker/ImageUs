(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5009],{8615:function(t,e,n){"use strict";n.d(e,{Z:function(){return h}});var r=n(7311);n(2265);var o=n(6691),i=n.n(o),a=n(4033),l=n(1172),c=n(6820),s=n(8067),d=n(6494),u=n(4616),f=n(9150),m=n(5124);function p(t){let{isRoom:e,imageId:n}=t,o=(0,a.useParams)(),{deleteRoomImage:i,deleteUserImage:l}=(0,m.d)();return(0,r.tZ)(u.Z,{id:n,icon:(0,r.tZ)(f.VPh,{}),title:"주의!",content:"정말 이미지를 삭제하시겠습니까?",okHandler:()=>{e?i(o.id,n):l(n)}})}function h(t){var e;let{imageData:n,observerRef:o}=t,s=(0,a.useRouter)(),u=(0,a.useParams)(),f=(0,a.usePathname)(),[m]=(0,d.v$)();return(0,r.BX)(g,{ref:o,children:[(0,r.tZ)("div",{className:"image_box",onClick:()=>s.push("".concat(f,"/detail_photo/").concat(n.id)),children:(0,r.tZ)(i(),{src:n.link,alt:n.fileName+" 이미지",style:{width:"100%",height:"100%",objectFit:"cover"},width:300,height:300})}),(0,r.tZ)(l.Pd.Provider,{value:{size:"22px",color:"rgba(0, 0, 0, 0.88)",style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)"}},children:(0,r.BX)("div",{className:"button_box",children:[(0,r.tZ)("div",{className:"download_btn",children:(0,r.tZ)("a",{href:n.link,download:n.fileName,children:(0,r.tZ)(c.yf7,{})})}),(null==m?void 0:null===(e=m.user_info)||void 0===e?void 0:e.id)===n.user_id&&(0,r.tZ)(p,{isRoom:null!=u&&!!u.id,imageId:n.id})]})})]})}let g=(0,s.Z)("div",{target:"e78wwbe0"})("\r\n    display:flex;flex-direction:column;position:relative;box-sizing:border-box;height:250px;margin:0;padding:0;border:1px solid #f0f0f0;border-radius:8px;font-size:14px;color:rgba(0,0,0,0.88);transition:box-shadow 0.2s,border-color 0.2s;background:#fff;cursor:pointer;overflow:hidden;&:hover{border-color:transparent;box-shadow:0 1px 2px -2px rgba(0,0,0,0.16),0 3px 6px 0 rgba(0,0,0,0.12),0 5px 12px 4px rgba(0,0,0,0.09);}.image_box{display:flex;flex:4;overflow:hidden;}.button_box{display:flex;flex:1;& > div{position:relative;flex:1;}.download_btn{border-right:1px solid #f0f0f0;&:hover{background-color:#f0f0f0;}& > a{display:inline-block;width:100%;height:100%;}}}")},2046:function(t,e,n){"use strict";n.d(e,{Z:function(){return s}});var r=n(7311),o=n(606),i=n.n(o);n(2265);var a=n(3633),l=n.n(a),c=n(8067);function s(){return(0,r.tZ)(d,{children:(0,r.tZ)("div",{className:"circle_box",children:(0,r.BX)("div",{className:"text_box",children:[(0,r.tZ)("span",{className:"".concat(i().className," text"),children:"Loading..."}),(0,r.tZ)(l(),{type:"cylon",color:"#363745",className:"loading"})]})})})}let d=(0,c.Z)("div",{target:"ellqkn20"})("\r\n    display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;color:#363745;.circle_box{display:flex;flex-direction:column;justify-content:center;align-items:center;width:100px;height:100px;padding:2rem;border-radius:50%;background-color:#f8f8ff;.text_box{position:relative;.text{font-size:1.2rem;}.loading{position:absolute;top:20px;left:50%;transform:translateX(-50%);}}}")},4616:function(t,e,n){"use strict";n.d(e,{Z:function(){return i}});var r=n(7311);n(2265);var o=n(8067);function i(t){let{id:e,icon:n,title:o,content:i,okHandler:l}=t;return(0,r.BX)(a,{idNum:e,children:[(0,r.tZ)("input",{id:"modal_toggle_".concat(e),type:"checkbox"}),(0,r.tZ)("label",{htmlFor:"modal_toggle_".concat(e),className:"label_icon",children:n}),(0,r.tZ)("label",{className:"modal_backdrop",htmlFor:"modal_toggle_".concat(e)}),(0,r.BX)("div",{className:"modal_content",children:[(0,r.tZ)("label",{className:"modal_close",htmlFor:"modal_toggle_".concat(e),children:"✕"}),(0,r.tZ)("h2",{children:o}),(0,r.tZ)("hr",{}),(0,r.tZ)("p",{className:"modal_content_text",children:i}),(0,r.tZ)("label",{className:"modal_content_btn ok_button",onClick:l,htmlFor:"modal_toggle_".concat(e),children:"확인"}),(0,r.tZ)("label",{className:"modal_content_btn",htmlFor:"modal_toggle_".concat(e),children:"취소"})]})]})}let a=(0,o.Z)("div",{target:"e9y1uwz0"})("\r\n    flex:1;display:flex;align-items:center;justify-content:center;width:100%;&:hover{background-color:#f07070;svg{color:white !important;}}.label_icon{display:flex;width:100%;height:100%;justify-content:center;align-items:center;cursor:pointer;}#modal_toggle_",t=>{let{idNum:e}=t;return e},"{display:none;}.modal_content,.modal_backdrop{height:0;width:0;opacity:0;visibility:hidden;overflow:hidden;cursor:pointer;transition:opacity 0.2s ease-in;}.modal_content{.modal_content_text{margin-top:2rem;text-align:center;font-size:18px;}.modal_close{color:#aaa;position:absolute;right:5px;top:5px;padding-top:3px;background:#fff;font-size:16px;width:25px;height:25px;font-weight:bold;text-align:center;cursor:pointer;&:hover{color:#333;}}.modal_content_btn{position:absolute;text-align:center;cursor:pointer;bottom:20px;right:30px;background:#446cb3;color:#fff;width:50px;border-radius:2px;font-size:14px;height:32px;padding-top:9px;font-weight:normal;&:hover{color:#fff;background:#365690;}}.ok_button{margin-right:75px;}}#modal_toggle_",t=>{let{idNum:e}=t;return e},".active ~ .modal_backdrop,#modal_toggle_",t=>{let{idNum:e}=t;return e},":checked ~ .modal_backdrop{background-color:rgba(0,0,0,0.6);width:100vw;height:100vh;position:fixed;left:0;top:0;z-index:9;visibility:visible;opacity:1;transition:opacity 0.2s ease-in;}#modal_toggle_",t=>{let{idNum:e}=t;return e},".active ~ .modal_content,#modal_toggle_",t=>{let{idNum:e}=t;return e},":checked ~ .modal_content{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:999;max-width:400px;width:300px;height:230px;padding:10px 30px;opacity:1;border-radius:4px;background-color:#fff;box-shadow:0 3px 7px rgba(0,0,0,0.6);cursor:auto;pointer-events:auto;visibility:visible;}")},5124:function(t,e,n){"use strict";n.d(e,{d:function(){return f}});var r=n(4903),o=n(6494),i=n(9222),a=n(2164),l=n(6881),c=n(5476),s=n(6339),d=n(2472);async function u(t){try{let e=await (0,d.L)(),n=t.filter(t=>t.link&&t.user_id),r=[],o=i.default.create({baseURL:"https://codakcodak.site"});o.interceptors.response.use(void 0,t=>{var e;let n=t.config;n.retryCount=null!==(e=n.retryCount)&&void 0!==e?e:0;let r=n.retryCount<2;return r?(n.retryCount+=1,n.headers={...n.headers},o.request(n)):Promise.reject(t)});let a=await Promise.allSettled(n.map(async t=>{let n={url:"/imageapi/image-download/".concat(t.link),method:"GET",headers:{Authorization:e.access_token},responseType:"blob"},r=await o.request(n),i=null!==t.created_at?t.created_at.split(" ")[0]:null,a=window.URL.createObjectURL(new Blob([r.data],{type:r.headers["content-type"]})),l=t.link?t.link.split("/")[1]:"Image";return{...t,link:a,fileName:l,created_at:i}}));return a.forEach(t=>{"fulfilled"===t.status&&r.push(t.value)}),r}catch(t){throw t}}function f(){let[t,e]=(0,o.v$)(),[,n]=(0,c.W)(),[,i]=(0,o.zW)(),[f,m]=(0,l.ZP)({key:"".concat(c.H,"-loading"),initial:!0}),[p,h]=(0,l.ZP)({key:"".concat(c.H,"-loadend"),initial:!1}),g=async(t,e)=>{try{m(!0);let n=await (0,d.L)(),o=await r.Z.get("/user/".concat(t,"/imagelist?start=").concat(e,"&limit=").concat(12),{headers:{Authorization:n.access_token}}),i=o.data.imagelist,a=await u(i);return a.length<12&&h(!0),m(!1),a}catch(t){if(t instanceof a.d7){var n,o;(null===(n=t.response)||void 0===n?void 0:n.status)===401||(null===(o=t.response)||void 0===o?void 0:o.status)===403?console.error("Error: 올바른 요청이 아닙니다..다시시도 해주세요!"):console.error("Error: 이미지를 불러오는데 실패하였습니다..다시 시도해주세요")}else throw new s.U7}},v=async t=>{try{let n=await (0,d.L)();await r.Z.delete("/image",{headers:{Authorization:n.access_token},data:{delete_image_id:t}}),alert("이미지를 성공적으로 삭제하였습니다!"),i(e=>{if(!e)return null;let n=e.filter(e=>e.id!==t);return n}),e(t=>({...t,imageLen:(null==t?void 0:t.imageLen)?t.imageLen-1:null==t?void 0:t.imageLen}))}catch(t){if(t instanceof a.d7){var n,o;(null===(n=t.response)||void 0===n?void 0:n.status)===401||(null===(o=t.response)||void 0===o?void 0:o.status)===403?alert("올바른 요청이 아닙니다..다시시도 해주세요!"):alert("이미지를 삭제하는데 실패하였습니다..다시 시도해주세요")}else throw new s.U7}},_=async t=>{try{let n=await (0,d.L)(),o=await r.Z.post("/image",t,{headers:{Authorization:n.access_token}}),a=o.data.image_info,l=null!==a.created_at?a.created_at.split(" ")[0]:null,c=window.URL.createObjectURL(new Blob([t.get("image")],{type:"multipart/form-data"})),s=a.link?a.link.split("/")[1]:"Image",u={...o.data.image_info,created_at:l,link:c,fileName:s};alert("이미지를 성공적으로 업로드하였습니다!"),i(t=>t?[u,...t]:[u]),e(t=>({...t,imageLen:(null==t?void 0:t.imageLen)?t.imageLen+1:null==t?void 0:t.imageLen}))}catch(t){if(t instanceof a.d7){var n,o;(null===(n=t.response)||void 0===n?void 0:n.status)===401||(null===(o=t.response)||void 0===o?void 0:o.status)===403?alert("올바른 요청이 아닙니다..다시시도 해주세요!"):alert("이미지 업로드에 실패하였습니다..다시 시도해주세요")}else throw new s.U7}},b=async(t,e)=>{try{m(!0);let n=await (0,d.L)(),o=await r.Z.get("/room/".concat(t,"/imagelist?start=").concat(e,"&limit=").concat(12),{headers:{Authorization:n.access_token}}),i=o.data.imagelist,a=await u(i);return a.length<12&&h(!0),m(!1),a}catch(t){if(t instanceof a.d7){var n,o;(null===(n=t.response)||void 0===n?void 0:n.status)===401||(null===(o=t.response)||void 0===o?void 0:o.status)===403?console.error("Error: 올바른 요청이 아닙니다..다시시도 해주세요!"):console.error("Error: ","이미지를 불러오는데 실패하였습니다..다시 시도해주세요")}else throw new s.U7}},x=async(t,e)=>{try{let o=await (0,d.L)();await r.Z.delete("/room/".concat(t,"/image"),{headers:{Authorization:o.access_token},data:{delete_room_image_id:e}}),alert("이미지를 성공적으로 삭제하였습니다!"),n(t=>{if(!t)return null;let n=t.filter(t=>t.id!==e);return n})}catch(t){if(t instanceof a.d7){var o,i;(null===(o=t.response)||void 0===o?void 0:o.status)===401||(null===(i=t.response)||void 0===i?void 0:i.status)===403?alert("올바른 요청이 아닙니다..다시시도 해주세요!"):alert("이미지를 삭제하는데 실패하였습니다..다시 시도해주세요")}else throw new s.U7}},w=async(e,o)=>{var i,l,c;try{let a=await (0,d.L)(),l=await r.Z.post("/room/".concat(e,"/image"),o,{headers:{Authorization:a.access_token}}),c=l.data.image_info,s=null!==c.created_at?c.created_at.split(" ")[0]:null,u=window.URL.createObjectURL(new Blob([o.get("image")],{type:"multipart/form-data"})),f=c.link?c.link.split("/")[1]:"Image",m={...l.data.image_info,created_at:s,link:u,fileName:f,user_name:null===(i=t.user_info)||void 0===i?void 0:i.name};alert("이미지를 성공적으로 업로드하였습니다!"),n(t=>t?[m,...t]:[m])}catch(t){if(t instanceof a.d7)(null===(l=t.response)||void 0===l?void 0:l.status)===401||(null===(c=t.response)||void 0===c?void 0:c.status)===403?alert("올바른 요청이 아닙니다..다시시도 해주세요!"):alert("이미지 업로드에 실패하였습니다..다시 시도해주세요");else throw new s.U7}};return{isLoading:f,imageLoadEnd:p,setImageLoadEnd:h,loadUserImagelist:g,deleteUserImage:v,uploadUserImage:_,loadRoomImagelist:b,deleteRoomImage:x,uploadRoomImage:w}}},8718:function(t,e,n){"use strict";var r=n(2265);e.Z=(t,e)=>{let n=(0,r.useRef)(null),o=(0,r.useCallback)((e,n)=>{e.forEach(e=>{e.isIntersecting&&t(e,n)})},[t]);return(0,r.useEffect)(()=>{if(!n.current)return;let t=new IntersectionObserver(o,e);return t.observe(n.current),()=>t.disconnect()},[e,o]),n}},4903:function(t,e,n){"use strict";var r=n(9222);let o=r.default.create({baseURL:"https://codakcodak.site/backapi"});e.Z=o},6339:function(t,e,n){"use strict";n.d(e,{F7:function(){return r},U7:function(){return o}});class r extends Error{constructor(t="연결되 네트워크가 없습니다."){super(t),this.name="NetworkError"}}class o extends Error{constructor(t="예기치 못한 에러가 발생하였습니다..다시 시도해주세요."){super(t),this.name="unknownError"}}},7262:function(t,e){"use strict";e.Z={onSet(t,e){let n=JSON.stringify(e);localStorage.setItem(String(t),n)},onGet(t){var e;let n=null!==(e=localStorage.getItem(String(t)))&&void 0!==e?e:"null";try{return JSON.parse(n)}catch(t){return n}}}},5476:function(t,e,n){"use strict";n.d(e,{H:function(){return o},W:function(){return i}});var r=n(6881);let o="@room/image",i=(0,r.MT)({key:"".concat(o,"-imagelist"),initial:null})},6494:function(t,e,n){"use strict";n.d(e,{B1:function(){return i},EE:function(){return l},sB:function(){return a},v$:function(){return d},wy:function(){return c},zV:function(){return s},zW:function(){return u}});var r=n(6881),o=n(7262);let i="@user/token",a="@user/info",l="@user/room",c="@user/friend",s="@user/image",d=(0,r.MT)({key:a,initial:{loginState:"loading"},persistor:o.Z}),u=(0,r.MT)({key:"".concat(s,"-imagelist"),initial:null})},2472:function(t,e,n){"use strict";n.d(e,{L:function(){return l}});var r=n(9222),o=n(2164),i=n(7262),a=n(6494);let l=async()=>{try{let t=new Date,e=i.Z.onGet(a.B1),n=null==e?void 0:e.access_token,o=null==e?void 0:e.refresh_token,l=null==e?void 0:e.access_token_expire_time,c=null==e?void 0:e.refresh_token_expire_time;if(!l||!c||!n)return null;let s=new Date(l),d=s.getTime()-t.getTime(),u=new Date(c),f=u.getTime()-t.getTime();if(d>=3e4)return e;if(!(f>=3e4))return null;{let t=i.Z.onGet(a.sB),n=null==t?void 0:t.user_info.id,l=await r.default.post("/backapi/user/".concat(n,"/refresh"),{refresh_token:o}),c=l.data;return i.Z.onSet(a.B1,{...e,...c}),c}}catch(t){return t instanceof o.d7?console.error("Error: 사용자 권한을 갱신하지 못하였습니다..",t):console.error("Error: ",t),null}}},606:function(t){t.exports={style:{fontFamily:"'__Arvo_7c3f16', '__Arvo_Fallback_7c3f16'",fontWeight:400,fontStyle:"normal"},className:"__className_7c3f16"}},1172:function(t,e,n){"use strict";n.d(e,{w_:function(){return c},Pd:function(){return i}});var r=n(2265),o={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},i=r.createContext&&r.createContext(o),a=function(){return(a=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},l=function(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&0>e.indexOf(r)&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,r=Object.getOwnPropertySymbols(t);o<r.length;o++)0>e.indexOf(r[o])&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]]);return n};function c(t){return function(e){return r.createElement(s,a({attr:a({},t.attr)},e),function t(e){return e&&e.map(function(e,n){return r.createElement(e.tag,a({key:n},e.attr),t(e.child))})}(t.child))}}function s(t){var e=function(e){var n,o=t.attr,i=t.size,c=t.title,s=l(t,["attr","size","title"]),d=i||e.size||"1em";return e.className&&(n=e.className),t.className&&(n=(n?n+" ":"")+t.className),r.createElement("svg",a({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},e.attr,o,s,{className:n,style:a(a({color:t.color||e.color},e.style),t.style),height:d,width:d,xmlns:"http://www.w3.org/2000/svg"}),c&&r.createElement("title",null,c),t.children)};return void 0!==i?r.createElement(i.Consumer,null,function(t){return e(t)}):e(o)}}}]);