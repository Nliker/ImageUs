(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6709],{5789:function(e,t,i){Promise.resolve().then(i.bind(i,1458))},1458:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return f}});var n=i(7311),r=i(2265),a=i(4033),l=i(7263),o=i(3159),s=i(9348),d=i(8067),c=i(8427),h=i(9509),p=i(8760),u=i(5137),m=i(6494),b=i(6529);function f(e){let{params:t}=e,i=(0,a.useRouter)(),{data:d,inviteMemberToRoom:f,forceOutMember:y}=(0,p.N)(),[w]=(0,m.v$)(),{data:k}=(0,u.y)(),[N,z]=(0,r.useState)(),[B,X]=(0,r.useState)([]),[C,E]=(0,r.useState)(null);(0,r.useEffect)(()=>{try{if(d&&k){let e=d.find(e=>""+e.id===t.id);if(!e)throw Error("방을 찾을 수 없습니다.. 다시 시도해주세요.");let i=null==k?void 0:k.filter(t=>!e.userlist.some(e=>e.id===t.id));z([...i]),E(e)}}catch(e){e instanceof Error&&alert(e.message),i.back()}},[d,i,k,t.id]);let L=e=>t=>{t.target.checked?X(t=>[...t,e]):X(t=>{let i=t.filter(t=>t.id!==e.id);return i})},S=async()=>{if(0===B.length){alert("선택된 멤버가 없습니다...");return}let e=B.map(e=>e.id);f(t.id,[...e])},U=async e=>{let i=t.id;await y(i,e)};return(0,n.tZ)(c.Z,{children:(0,n.BX)(x,{children:[(0,n.tZ)("div",{className:"title",children:"".concat(null==C?void 0:C.title," 친구관리")}),(0,n.BX)("div",{className:"tab_box",children:[(0,n.BX)(g,{children:[(0,n.tZ)("input",{type:"radio",name:"friend_management",id:"memberList",defaultChecked:!0}),(0,n.tZ)("label",{className:"subtitle",htmlFor:"memberList",children:"멤버 목록"}),(0,n.tZ)("div",{className:"member_list tab_content",children:(0,n.tZ)(l.ZP,{children:(0,n.tZ)("div",{className:"container",children:null==C?void 0:C.userlist.map(e=>{var t;return(0,n.BX)("div",{className:"member",children:[C.host_user_id===e.id?(0,n.tZ)(o.CvY,{}):(0,n.tZ)(s.whs,{}),(0,n.tZ)("span",{children:e.name}),C.host_user_id!==e.id&&C.host_user_id===(null==w?void 0:null===(t=w.user_info)||void 0===t?void 0:t.id)?(0,n.tZ)(h.z,{style:{fontSize:"0.8rem"},className:"error",onClick:()=>U(""+e.id),children:"강퇴하기"}):(0,n.tZ)("div",{children:(0,n.tZ)("b",{children:"방장"})})]},e.id)})})})})]}),(0,n.BX)(g,{children:[(0,n.tZ)("input",{type:"radio",name:"friend_management",id:"inviteFriends"}),(0,n.tZ)("label",{className:"subtitle",htmlFor:"inviteFriends",children:"초대할 친구목록"}),(0,n.tZ)(_,{className:"tab_content",children:(0,n.BX)("div",{className:"container",children:[(0,n.tZ)("div",{className:"check_group",children:(0,n.tZ)(l.ZP,{children:N?0===N.length?(0,n.tZ)("div",{className:"no_member",children:(0,n.tZ)("p",{children:"초대할 멤버가 없습니다..."})}):(0,n.BX)(n.HY,{children:[(0,n.BX)(v,{children:[(0,n.tZ)("div",{className:"sub_heading",children:"초대할 멤버목록"}),(0,n.tZ)("div",{className:"member_list",children:(0,n.tZ)("div",{className:"layout",children:N.map(e=>(0,n.BX)("label",{htmlFor:"".concat(e.id),className:"checkbox",children:[(0,n.tZ)("input",{type:"checkbox",className:"checkbox_input",id:"".concat(e.id),onChange:L(e)}),(0,n.tZ)("span",{className:"check_shape"}),(0,n.tZ)("span",{className:"checkbox_text",children:e.name})]},e.id))})})]}),(0,n.BX)(Z,{children:[(0,n.tZ)("div",{className:"sub_heading",children:"선택한 멤버들"}),(0,n.tZ)("div",{className:"select_members",children:B.map(e=>(0,n.tZ)("span",{className:"member_tag",children:e.name},e.id))})]})]}):(0,n.tZ)("div",{children:"로딩중..."})})}),(0,n.BX)("div",{className:"button_group",children:[(0,n.tZ)(h.z,{onClick:S,children:"초대하기"}),(0,n.tZ)(h.z,{onClick:()=>i.back(),children:"취소"})]})]})})]}),(0,n.BX)(g,{children:[(0,n.tZ)("input",{type:"radio",name:"friend_management",id:"SearchMember"}),(0,n.tZ)("label",{className:"subtitle",htmlFor:"SearchMember",children:"멤버 검색"}),(0,n.tZ)("div",{className:"search_member tab_content",children:(0,n.tZ)(l.ZP,{children:(0,n.tZ)(b.Z,{})})})]})]})]})})}let x=(0,d.Z)("div",{target:"e98nsrd0"})("\r\n    .title{height:30px;line-height:30px;margin:20px;text-align:center;font-size:1.2rem;}.tab_box{display:flex;height:30px;justify-content:space-evenly;align-items:center;}"),g=(0,d.Z)("div",{target:"e98nsrd1"})('\r\n    input[name="friend_management"]{display:none;}.subtitle{position:relative;z-index:1;display:inline-block;padding:10px 15px;color:#23527c;border:1px solid transparent;border-radius:4px 4px 0 0;cursor:pointer;&:hover{background-color:#ddd;}}input[name="friend_management"]:checked ~ .subtitle{color:#555;background-color:#fff;border:1px solid #ddd;border-bottom-color:transparent;cursor:default;}.tab_content{position:absolute;left:-9999px;clip-path:polygon(0 0,0 0,0 0);width:1px;height:1px;margin:-1px;border:1px solid #ddd;border-radius:10px;}input[name="friend_management"]:checked ~ .tab_content{clip-path:none;left:0;display:block;margin:0px 20px;width:calc(100% - 40px);height:calc(100% - 135px);margin-top:-1px;}.member_list{display:flex;flex-direction:column;.container{padding:20px 0;.member{display:flex;align-items:center;justify-content:space-around;margin:0 20px;margin-bottom:1.2rem;}}}.invite_friends{.container{display:flex;flex-direction:column;height:100%;}.sub_heading{height:30px;padding:1rem 0;margin-left:30px;line-height:30px;}.check_group{flex:1 0 auto;counter-reset:total;counter-reset:checked;.no_member{height:100%;overflow:hidden;&::before{display:block;content:"";clear:both;}& > p{position:relative;top:50%;transform:translateY(-50%);text-align:center;}}.select_members_c{margin:1rem 0;}.select_members{display:flex;gap:0.5rem;padding:0 30px;.member_tag{padding:4px 8px;border-radius:20px;background-color:#f7f8fc;color:#a0a6b5;}}}.button_group{display:flex;align-items:center;justify-content:space-evenly;width:100%;height:60px;box-shadow:rgba(206,206,206,0.5) 0px -1px 1px 0px;}}.search_member{padding:10px 0;box-sizing:border-box;}'),v=(0,d.Z)("div",{target:"e98nsrd2"})('\r\n    margin:1rem 0;.member_list{height:calc(100% - 62px);.layout{display:flex;flex-direction:column;gap:1rem;height:100%;box-sizing:border-box;}.checkbox{counter-increment:total;display:flex;align-items:center;width:fit-content;margin-left:3rem;cursor:pointer;.checkbox_input{display:none;& + .check_shape{position:relative;display:inline-block;width:16px;height:16px;margin-top:1px;border:3px solid #707070;border-radius:5px;}&:checked + .check_shape::after{content:"✔";width:15px;height:15px;text-align:center;position:absolute;left:0;top:0;font-size:12px;font-weight:bolder;}}.checkbox_text{margin-left:0.5rem;}}}'),_=(0,d.Z)("div",{target:"e98nsrd3"})('\r\n    .container{display:flex;flex-direction:column;height:100%;}.sub_heading{height:30px;padding:1rem 0;margin-left:30px;line-height:30px;}.check_group{flex:1 0 auto;counter-reset:total;counter-reset:checked;.no_member{height:100%;overflow:hidden;&::before{display:block;content:"";clear:both;}& > p{position:relative;top:50%;transform:translateY(-50%);text-align:center;}}}.button_group{display:flex;align-items:center;justify-content:space-evenly;width:100%;height:60px;box-shadow:rgba(206,206,206,0.5) 0px -1px 1px 0px;}'),Z=(0,d.Z)("div",{target:"e98nsrd4"})("\r\n    margin:1rem 0;.select_members{display:flex;gap:0.5rem;padding:0 30px;.member_tag{padding:4px 8px;border-radius:20px;background-color:#f7f8fc;color:#a0a6b5;}}")},8427:function(e,t,i){"use strict";var n=i(7311),r=i(2265),a=i(8067),l=i(4033),o=i(7263);let s=(0,a.Z)("div",{target:"e1yx7v2l0"})("\r\n    display:flex;justify-content:center;align-items:center;position:absolute;left:0;right:0;top:0;bottom:0;z-index:100;overflow:hidden;background-color:rgb(0,0,0,0.65);"),d=(0,a.Z)("div",{target:"e1yx7v2l1"})("\r\n    position:relative;width:",e=>{let{width:t}=e;return null!=t?t:"70%"},";height:",e=>{let{height:t}=e;return null!=t?t:"70%"},";max-width:550px;box-sizing:border-box;border-radius:10px;background:#fff;box-shadow:0 30px 60px 0 rgba(90,116,148,0.4);");t.Z=e=>{let{children:t,scroll:i=!0,width:a,height:c}=e,h=(0,r.useRef)(null),p=(0,l.useRouter)(),u=(0,r.useCallback)(()=>{p.back()},[p]),m=(0,r.useCallback)(e=>{e.target===h.current&&u&&u()},[u,h]);return(0,n.tZ)(s,{ref:h,onClick:m,children:(0,n.tZ)(d,{width:a,height:c,children:i?(0,n.tZ)(o.ZP,{children:t}):t})})}},8760:function(e,t,i){"use strict";i.d(t,{N:function(){return c}});var n=i(2164),r=i(6881),a=i(4903),l=i(7262),o=i(6494),s=i(6339),d=i(2472);function c(){let[,e]=(0,o.v$)(),[t,i]=(0,r.ZP)({key:"".concat(o.EE,"-loading"),initial:!0}),[c,,h]=(0,r.ZP)({key:o.EE,initial:null,persistor:{onSet:l.Z.onSet,onGet:async t=>{try{let t=await (0,d.L)(),i=l.Z.onGet(o.sB),n=await a.Z.get("/user/".concat(i.user_info.id,"/roomlist"),{headers:{Authorization:t.access_token}}),r=n.data.roomlist.map(e=>{let t=e.userlist.map(e=>({id:e.id,name:e.name}));return{...e,userlist:t}});return e(e=>({...e,roomList:r})),r}catch(e){if(window.navigator.onLine){if(e instanceof n.d7){var r,c;if((null===(r=e.response)||void 0===r?void 0:r.status)===401||(null===(c=e.response)||void 0===c?void 0:c.status)===403)console.error("Error: 올바른 요청이 아닙니다..다시시도 해주세요!");else throw new s.U7}else throw new s.U7}throw new s.F7}finally{i(!1)}}}}),{mutate:p,error:u}=h,m=async e=>{let{userlist:t,title:r}=e;try{i(!0);let e=await (0,d.L)();await a.Z.post("/room",{userlist:t,title:r},{headers:{Authorization:e.access_token}}),p(),alert("성공적으로 방을 생성하였습니다!"),i(!1)}catch(e){if(e instanceof n.d7){var l,o;(null===(l=e.response)||void 0===l?void 0:l.status)===401||(null===(o=e.response)||void 0===o?void 0:o.status)===403?alert("올바른 요청이 아닙니다..다시시도 해주세요!"):alert("방 생성에 실패했습니다..다시시도 해주세요!")}else throw new s.U7}},b=async e=>{try{i(!0);let t=await (0,d.L)(),n=l.Z.onGet(o.sB);await a.Z.delete("/user/".concat(n.user_info.id,"/room"),{headers:{Authorization:t.access_token},data:{delete_user_room_id:e}}),p(),alert("성공적으로 방에서 나갔습니다!"),i(!1)}catch(e){if(e instanceof n.d7){var t,r;(null===(t=e.response)||void 0===t?void 0:t.status)===401||(null===(r=e.response)||void 0===r?void 0:r.status)===403?alert("올바른 요청이 아닙니다..다시시도 해주세요!"):alert("방에서 나가지 못하였습니다..다시시도 해주세요!")}else throw new s.U7}},f=async(e,t)=>{try{i(!0);let n=await (0,d.L)();await a.Z.post("/room/".concat(e,"/user"),{invite_userlist:t},{headers:{Authorization:n.access_token}}),p(),alert("성공적으로 초대하였습니다!"),i(!1)}catch(e){if(e instanceof n.d7){var r,l,o;if((null===(r=e.response)||void 0===r?void 0:r.status)===401||(null===(l=e.response)||void 0===l?void 0:l.status)===403)alert("올바른 요청이 아닙니다..다시시도 해주세요!");else if((null===(o=e.response)||void 0===o?void 0:o.status)===402)alert("방이 존재하지 않습니다...다시시도 해주세요!");else throw new s.U7}else throw new s.U7}},x=async(e,t)=>{try{i(!0);let n=await (0,d.L)();await a.Z.delete("/room/".concat(e,"/user"),{headers:{Authorization:n.access_token},data:{delete_room_user_id:t}}),p(),alert("성공적으로 강퇴하였습니다!"),i(!1)}catch(e){if(e instanceof n.d7){var r,l,o;if((null===(r=e.response)||void 0===r?void 0:r.status)===401||(null===(l=e.response)||void 0===l?void 0:l.status)===403)alert("올바른 요청이 아닙니다..다시시도 해주세요!");else if((null===(o=e.response)||void 0===o?void 0:o.status)===402)alert("방이 존재하지 않습니다..다시시도 해주세요!");else throw new s.U7}else throw new s.U7}};return{data:c,isLoading:t,error:u,createRoom:m,exitRoom:b,inviteMemberToRoom:f,forceOutMember:x}}},4033:function(e,t,i){e.exports=i(8165)}},function(e){e.O(0,[6169,2420,5520,7311,6881,2164,7263,243,6529,2971,596,1744],function(){return e(e.s=5789)}),_N_E=e.O()}]);