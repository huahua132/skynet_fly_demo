(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7fc99dc6"],{3252:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"app-container"},[t("switch-roles",{on:{change:e.handleRolesChange}})],1)},o=[],c=(n("b0c0"),function(){var e=this,t=e._self._c;return t("div",[t("div",{staticStyle:{"margin-bottom":"15px"}},[e._v(" 你的当前角色是: "+e._s(e.roles)+" ")]),e._v(" 切换角色: "),t("el-radio-group",{model:{value:e.switchRoles,callback:function(t){e.switchRoles=t},expression:"switchRoles"}},[e._l(e.rolesList,(function(n){return[n.name!=e.roles?t("el-radio-button",[e._v(e._s(n.name))]):e._e()]}))],2)],1)}),s=[],i=n("c7eb"),u=n("1da1"),a=n("cc5e"),l={data:function(){return{rolesList:[]}},created:function(){this.getRoles()},computed:{getRoles:function(){var e=this;return Object(u["a"])(Object(i["a"])().mark((function t(){var n;return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(a["c"])();case 2:n=t.sent,e.rolesList=n.data;case 4:case"end":return t.stop()}}),t)})))()},roles:function(){return this.$store.getters.roles},switchRoles:{get:function(){return this.roles[0]},set:function(e){var t=this;this.$store.dispatch("user/changeRoles",e).then((function(){t.$emit("change")}))}}}},h=l,d=n("2877"),f=Object(d["a"])(h,c,s,!1,null,null,null),p=f.exports,b={name:"PagePermission",components:{SwitchRoles:p},methods:{handleRolesChange:function(){this.$router.push({path:"/permission/index?"+ +new Date})}}},m=b,w=Object(d["a"])(m,r,o,!1,null,null,null);t["default"]=w.exports},cc5e:function(e,t,n){"use strict";n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return c})),n.d(t,"d",(function(){return s})),n.d(t,"b",(function(){return i}));var r=n("b775");function o(){return Object(r["a"])({url:"/role/roles",method:"get"})}function c(e){return Object(r["a"])({url:"/role/role",method:"post",data:e})}function s(e,t){return Object(r["a"])({url:"/role/role/".concat(e),method:"put",data:t})}function i(e){return Object(r["a"])({url:"/role/role/".concat(e),method:"delete"})}}}]);