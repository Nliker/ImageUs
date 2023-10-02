"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1122],{1122:function(e,t,n){n.d(t,{Z:function(){return v}});var a=n(7311),r=n(2265),i=n(4033),o=n(6691),l=n.n(o),s=n(1172),c=n(1697),d=n(9348),u=n(442),f=n(8067),g=n(5124),p=n(9509),m=n(8427);let h=["image/HEIF","image/heif","image/JPEG","image/jpeg","image/JPG","image/jpg","image/GIF","image/gif","image/PDF","image/pdf","image/PNG","image/png"];function v(e){let{roomId:t}=e,n=(0,i.useRouter)(),{uploadRoomImage:o,uploadUserImage:f}=(0,g.d)(),[v,b]=(0,r.useState)(null),[k,y,x]=(0,u.Z)(""),[_,Z]=(0,r.useState)(!1),[L,z]=(0,r.useState)(null),j=(0,r.useRef)(null),U=async()=>{v&&(t?await o(t,v):await f(v)),n.back()};return(0,a.tZ)(m.Z,{children:(0,a.BX)(w,{children:[(0,a.tZ)("div",{className:"title",children:"이미지 업로드"}),(0,a.tZ)("div",{className:"preview",onDrop:e=>{e.preventDefault();let t=new FormData;if(e.dataTransfer.items)for(let n=0;n<e.dataTransfer.items.length;n++)if("file"===e.dataTransfer.items[n].kind&&h.includes(e.dataTransfer.items[n].type)){let a=e.dataTransfer.items[n].getAsFile();t.append("image",a)}else{alert("jpg, png, pdf, gif, jpeg, heif 형식만 업로드 가능합니다.");return}else for(let n=0;n<e.dataTransfer.files.length;n++)if(h.includes(e.dataTransfer.files[n].type))t.append("image",e.dataTransfer.files[n]);else{alert("jpg, png, pdf, gif, jpeg, heif 형식만 업로드 가능합니다.");return}let n=new Image,a=t.get("image");n.src=URL.createObjectURL(a),y(a.name),z(n),b(t),Z(!1)},onDragOver:e=>{e.preventDefault(),Z(!0)},ref:j,children:(0,a.tZ)(s.Pd.Provider,{value:{size:"60px"},children:_?(0,a.tZ)("div",{className:"upload_cover",children:(0,a.tZ)(d.cmt,{})}):L?(0,a.tZ)(l(),{src:L.src,alt:"미리보기 이미지",style:{width:"100%",height:"100%",objectFit:"contain"},width:300,height:300}):(0,a.BX)("div",{className:"preview_icon_box",children:[(0,a.tZ)(c.BJX,{}),(0,a.tZ)("p",{children:"이미지를 올려놓으세요"})]})})}),(0,a.BX)("div",{className:"file_search",children:[(0,a.tZ)("input",{className:"upload_name",value:k,placeholder:"첨부파일",readOnly:!0}),(0,a.tZ)("label",{htmlFor:"file",children:"파일찾기"}),(0,a.tZ)("input",{type:"file",id:"file",onChange:e=>{let t=new FormData;if(e.target.files){if(0===e.target.files.length)return;for(let n=0;n<e.target.files.length;n++)if(h.includes(e.target.files[n].type))t.append("image",e.target.files[n]),y(e.target.files[n].name);else{alert("jpg, png, pdf, gif, jpeg, heif 형식만 업로드 가능합니다.");return}let n=new Image;n.src=URL.createObjectURL(t.get("image")),z(n),b(t)}}})]}),(0,a.BX)("div",{className:"button_group",children:[(0,a.tZ)(p.z,{onClick:U,children:"업로드"}),(0,a.tZ)(p.z,{onClick:()=>n.back(),children:"취소"})]})]})})}let w=(0,f.Z)("div",{target:"e1zvsee0"})('\r\n    display:flex;flex-direction:column;height:100%;padding:1.5rem;box-sizing:border-box;.title{margin-bottom:10px;text-align:center;font-size:1.2rem;}.preview{flex:1 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;max-height:300px;color:hsla(240,7%,70%,1);user-select:none;.preview_icon_box{display:flex;flex-direction:column;align-items:center;}}.file_search{display:flex;justify-content:center;margin:15px 0;.upload_name{display:inline-block;height:40px;padding:0 10px;vertical-align:middle;border:1px solid #dddddd;width:60%;color:#999999;}label{display:inline-block;padding:10px 20px;color:#fff;vertical-align:middle;background-color:#999999;cursor:pointer;margin-left:10px;white-space:nowrap;}input[type="file"]{position:absolute;width:0;height:0;padding:0;overflow:hidden;border:0;}}.button_group{display:flex;justify-content:space-evenly;}')},9509:function(e,t,n){n.d(t,{z:function(){return r}});var a=n(8067);let r=(0,a.Z)("button",{target:"e8c3pr40"})("\r\n    -webkit-appearance:none;-moz-appearance:none;appearance:none;background:","#446cb3",";color:","#ffffff",";margin:0;padding:0.5rem 1rem;font-size:1rem;font-weight:400;text-align:center;text-decoration:none;border:none;border-radius:4px;display:inline-block;width:auto;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);cursor:pointer;transition:0.5s;&:hover,&:active,&:focus{background:","#365690",";outline:0;}&:disabled{opacity:0.5;}&.success{background:","#28a745",";&:hover,&:active,&:focus{background:","#218838",";outline:0;}&:disabled{opacity:0.5;}}&.error{background:","#dc3545",";&:hover,&:active,&:focus{background:","#c82333",";outline:0;}&:disabled{opacity:0.5;}}&.warning{color:","#212529",";background:","#ffc107",";&:hover,&:active,&:focus{background:","#e0a800",";outline:0;}&:disabled{opacity:0.5;}}")},8427:function(e,t,n){var a=n(7311),r=n(2265),i=n(8067),o=n(4033),l=n(7263);let s=(0,i.Z)("div",{target:"e1yx7v2l0"})("\r\n    display:flex;justify-content:center;align-items:center;position:absolute;left:0;right:0;top:0;bottom:0;z-index:100;overflow:hidden;background-color:rgb(0,0,0,0.65);"),c=(0,i.Z)("div",{target:"e1yx7v2l1"})("\r\n    position:relative;width:",e=>{let{width:t}=e;return null!=t?t:"70%"},";height:",e=>{let{height:t}=e;return null!=t?t:"70%"},";max-width:550px;box-sizing:border-box;border-radius:10px;background:#fff;box-shadow:0 30px 60px 0 rgba(90,116,148,0.4);");t.Z=e=>{let{children:t,scroll:n=!0,width:i,height:d}=e,u=(0,r.useRef)(null),f=(0,o.useRouter)(),g=(0,r.useCallback)(()=>{f.back()},[f]),p=(0,r.useCallback)(e=>{e.target===u.current&&g&&g()},[g,u]);return(0,a.tZ)(s,{ref:u,onClick:p,children:(0,a.tZ)(c,{width:i,height:d,children:n?(0,a.tZ)(l.ZP,{children:t}):t})})}},5124:function(e,t,n){n.d(t,{d:function(){return f}});var a=n(4903),r=n(6494),i=n(9222),o=n(2164),l=n(6881),s=n(5476),c=n(6339),d=n(2472);async function u(e){try{let t=await (0,d.L)(),n=e.filter(e=>e.link&&e.user_id),a=[],r=i.default.create({baseURL:"https://codakcodak.site"});r.interceptors.response.use(void 0,e=>{var t;let n=e.config;n.retryCount=null!==(t=n.retryCount)&&void 0!==t?t:0;let a=n.retryCount<2;return a?(n.retryCount+=1,n.headers={...n.headers},r.request(n)):Promise.reject(e)});let o=await Promise.allSettled(n.map(async e=>{let n={url:"/imageapi/image-download/".concat(e.link),method:"GET",headers:{Authorization:t.access_token},responseType:"blob"},a=await r.request(n),i=null!==e.created_at?e.created_at.split(" ")[0]:null,o=window.URL.createObjectURL(new Blob([a.data],{type:a.headers["content-type"]})),l=e.link?e.link.split("/")[1]:"Image";return{...e,link:o,fileName:l,created_at:i}}));return o.forEach(e=>{"fulfilled"===e.status&&a.push(e.value)}),a}catch(e){throw e}}function f(){let[e,t]=(0,r.v$)(),[,n]=(0,s.W)(),[,i]=(0,r.zW)(),[f,g]=(0,l.ZP)({key:"".concat(s.H,"-loading"),initial:!0}),[p,m]=(0,l.ZP)({key:"".concat(s.H,"-loadend"),initial:!1}),h=async(e,t)=>{try{g(!0);let n=await (0,d.L)(),r=await a.Z.get("/user/".concat(e,"/imagelist?start=").concat(t,"&limit=").concat(12),{headers:{Authorization:n.access_token}}),i=r.data.imagelist,o=await u(i);return o.length<12&&m(!0),g(!1),o}catch(e){if(e instanceof o.d7){var n,r;(null===(n=e.response)||void 0===n?void 0:n.status)===401||(null===(r=e.response)||void 0===r?void 0:r.status)===403?console.error("Error: 올바른 요청이 아닙니다..다시시도 해주세요!"):console.error("Error: 이미지를 불러오는데 실패하였습니다..다시 시도해주세요")}else throw new c.U7}},v=async e=>{try{let n=await (0,d.L)();await a.Z.delete("/image",{headers:{Authorization:n.access_token},data:{delete_image_id:e}}),alert("이미지를 성공적으로 삭제하였습니다!"),i(t=>{if(!t)return null;let n=t.filter(t=>t.id!==e);return n}),t(e=>({...e,imageLen:(null==e?void 0:e.imageLen)?e.imageLen-1:null==e?void 0:e.imageLen}))}catch(e){if(e instanceof o.d7){var n,r;(null===(n=e.response)||void 0===n?void 0:n.status)===401||(null===(r=e.response)||void 0===r?void 0:r.status)===403?alert("올바른 요청이 아닙니다..다시시도 해주세요!"):alert("이미지를 삭제하는데 실패하였습니다..다시 시도해주세요")}else throw new c.U7}},w=async e=>{try{let n=await (0,d.L)(),r=await a.Z.post("/image",e,{headers:{Authorization:n.access_token}}),o=r.data.image_info,l=null!==o.created_at?o.created_at.split(" ")[0]:null,s=window.URL.createObjectURL(new Blob([e.get("image")],{type:"multipart/form-data"})),c=o.link?o.link.split("/")[1]:"Image",u={...r.data.image_info,created_at:l,link:s,fileName:c};alert("이미지를 성공적으로 업로드하였습니다!"),i(e=>e?[u,...e]:[u]),t(e=>({...e,imageLen:(null==e?void 0:e.imageLen)?e.imageLen+1:null==e?void 0:e.imageLen}))}catch(e){if(e instanceof o.d7){var n,r;(null===(n=e.response)||void 0===n?void 0:n.status)===401||(null===(r=e.response)||void 0===r?void 0:r.status)===403?alert("올바른 요청이 아닙니다..다시시도 해주세요!"):alert("이미지 업로드에 실패하였습니다..다시 시도해주세요")}else throw new c.U7}},b=async(e,t)=>{try{g(!0);let n=await (0,d.L)(),r=await a.Z.get("/room/".concat(e,"/imagelist?start=").concat(t,"&limit=").concat(12),{headers:{Authorization:n.access_token}}),i=r.data.imagelist,o=await u(i);return o.length<12&&m(!0),g(!1),o}catch(e){if(e instanceof o.d7){var n,r;(null===(n=e.response)||void 0===n?void 0:n.status)===401||(null===(r=e.response)||void 0===r?void 0:r.status)===403?console.error("Error: 올바른 요청이 아닙니다..다시시도 해주세요!"):console.error("Error: ","이미지를 불러오는데 실패하였습니다..다시 시도해주세요")}else throw new c.U7}},k=async(e,t)=>{try{let r=await (0,d.L)();await a.Z.delete("/room/".concat(e,"/image"),{headers:{Authorization:r.access_token},data:{delete_room_image_id:t}}),alert("이미지를 성공적으로 삭제하였습니다!"),n(e=>{if(!e)return null;let n=e.filter(e=>e.id!==t);return n})}catch(e){if(e instanceof o.d7){var r,i;(null===(r=e.response)||void 0===r?void 0:r.status)===401||(null===(i=e.response)||void 0===i?void 0:i.status)===403?alert("올바른 요청이 아닙니다..다시시도 해주세요!"):alert("이미지를 삭제하는데 실패하였습니다..다시 시도해주세요")}else throw new c.U7}},y=async(t,r)=>{var i,l,s;try{let o=await (0,d.L)(),l=await a.Z.post("/room/".concat(t,"/image"),r,{headers:{Authorization:o.access_token}}),s=l.data.image_info,c=null!==s.created_at?s.created_at.split(" ")[0]:null,u=window.URL.createObjectURL(new Blob([r.get("image")],{type:"multipart/form-data"})),f=s.link?s.link.split("/")[1]:"Image",g={...l.data.image_info,created_at:c,link:u,fileName:f,user_name:null===(i=e.user_info)||void 0===i?void 0:i.name};alert("이미지를 성공적으로 업로드하였습니다!"),n(e=>e?[g,...e]:[g])}catch(e){if(e instanceof o.d7)(null===(l=e.response)||void 0===l?void 0:l.status)===401||(null===(s=e.response)||void 0===s?void 0:s.status)===403?alert("올바른 요청이 아닙니다..다시시도 해주세요!"):alert("이미지 업로드에 실패하였습니다..다시 시도해주세요");else throw new c.U7}};return{isLoading:f,imageLoadEnd:p,setImageLoadEnd:m,loadUserImagelist:h,deleteUserImage:v,uploadUserImage:w,loadRoomImagelist:b,deleteRoomImage:k,uploadRoomImage:y}}},442:function(e,t,n){var a=n(2265);t.Z=e=>{let[t,n]=(0,a.useState)(e),r=(0,a.useCallback)(e=>{n(e.target.value)},[]);return[t,n,r]}},4903:function(e,t,n){var a=n(9222);let r=a.default.create({baseURL:"https://codakcodak.site/backapi"});t.Z=r},6339:function(e,t,n){n.d(t,{F7:function(){return a},U7:function(){return r}});class a extends Error{constructor(e="연결되 네트워크가 없습니다."){super(e),this.name="NetworkError"}}class r extends Error{constructor(e="예기치 못한 에러가 발생하였습니다..다시 시도해주세요."){super(e),this.name="unknownError"}}},7262:function(e,t){t.Z={onSet(e,t){let n=JSON.stringify(t);localStorage.setItem(String(e),n)},onGet(e){var t;let n=null!==(t=localStorage.getItem(String(e)))&&void 0!==t?t:"null";try{return JSON.parse(n)}catch(e){return n}}}},5476:function(e,t,n){n.d(t,{H:function(){return r},W:function(){return i}});var a=n(6881);let r="@room/image",i=(0,a.MT)({key:"".concat(r,"-imagelist"),initial:null})},6494:function(e,t,n){n.d(t,{B1:function(){return i},EE:function(){return l},sB:function(){return o},v$:function(){return d},wy:function(){return s},zV:function(){return c},zW:function(){return u}});var a=n(6881),r=n(7262);let i="@user/token",o="@user/info",l="@user/room",s="@user/friend",c="@user/image",d=(0,a.MT)({key:o,initial:{loginState:"loading"},persistor:r.Z}),u=(0,a.MT)({key:"".concat(c,"-imagelist"),initial:null})},2472:function(e,t,n){n.d(t,{L:function(){return l}});var a=n(9222),r=n(2164),i=n(7262),o=n(6494);let l=async()=>{try{let e=new Date,t=i.Z.onGet(o.B1),n=null==t?void 0:t.access_token,r=null==t?void 0:t.refresh_token,l=null==t?void 0:t.access_token_expire_time,s=null==t?void 0:t.refresh_token_expire_time;if(!l||!s||!n)return null;let c=new Date(l),d=c.getTime()-e.getTime(),u=new Date(s),f=u.getTime()-e.getTime();if(d>=3e4)return t;if(!(f>=3e4))return null;{let e=i.Z.onGet(o.sB),n=null==e?void 0:e.user_info.id,l=await a.default.post("/backapi/user/".concat(n,"/refresh"),{refresh_token:r}),s=l.data;return i.Z.onSet(o.B1,{...t,...s}),s}}catch(e){return e instanceof r.d7?console.error("Error: 사용자 권한을 갱신하지 못하였습니다..",e):console.error("Error: ",e),null}}}}]);