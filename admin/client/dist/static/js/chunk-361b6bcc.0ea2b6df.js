(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-361b6bcc"],{"0c55":function(e,t,n){"use strict";n("327e")},"327e":function(e,t,n){},cc5e:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o})),n.d(t,"d",(function(){return i})),n.d(t,"b",(function(){return c}));var r=n("b775");function a(){return Object(r["a"])({url:"/role/roles",method:"get"})}function o(e){return Object(r["a"])({url:"/role/role",method:"post",data:e})}function i(e,t){return Object(r["a"])({url:"/role/role/".concat(e),method:"put",data:t})}function c(e){return Object(r["a"])({url:"/role/role/".concat(e),method:"delete"})}},d78e:function(e,t,n){"use strict";n.r(t);n("b0c0"),n("a4d3"),n("e01a");var r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"app-container"},[t("el-button",{attrs:{type:"primary"},on:{click:e.handleAddRole}},[e._v("新建角色")]),t("el-table",{staticStyle:{width:"100%","margin-top":"30px"},attrs:{data:e.rolesList,border:""}},[t("el-table-column",{attrs:{align:"center",label:"Role Key",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.key)+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"Role Name",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.name)+" ")]}}])}),t("el-table-column",{attrs:{align:"header-center",label:"Description"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.description)+" ")]}}])}),t("el-table-column",{attrs:{align:"center",label:"Operations"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.handleEdit(n)}}},[e._v("编辑")]),t("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(t){return e.handleDelete(n)}}},[e._v("删除")])]}}])})],1),t("el-dialog",{attrs:{visible:e.dialogVisible,title:"edit"===e.dialogType?"Edit Role":"New Role"},on:{"update:visible":function(t){e.dialogVisible=t}}},[t("el-form",{attrs:{model:e.role,"label-width":"80px","label-position":"left"}},[t("el-form-item",{attrs:{label:"Name"}},[t("el-input",{attrs:{placeholder:"Role Name"},model:{value:e.role.name,callback:function(t){e.$set(e.role,"name",t)},expression:"role.name"}})],1),t("el-form-item",{attrs:{label:"Desc"}},[t("el-input",{attrs:{autosize:{minRows:2,maxRows:4},type:"textarea",placeholder:"Role Description"},model:{value:e.role.description,callback:function(t){e.$set(e.role,"description",t)},expression:"role.description"}})],1),t("el-form-item",{attrs:{label:"Menus"}},[t("el-tree",{ref:"tree",staticClass:"permission-tree",attrs:{"check-strictly":e.checkStrictly,data:e.routesData,props:e.defaultProps,"show-checkbox":"","node-key":"path"}})],1)],1),t("div",{staticStyle:{"text-align":"right"}},[t("el-button",{attrs:{type:"danger"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("Cancel")]),t("el-button",{attrs:{type:"primary"},on:{click:e.confirmRole}},[e._v("Confirm")])],1)],1)],1)},a=[],o=n("5530"),i=n("2909"),c=n("b85c"),l=n("c7eb"),s=n("1da1"),u=(n("d3b7"),n("159b"),n("99af"),n("a434"),n("caad"),n("2532"),n("4de4"),n("df7c")),d=n.n(u),h=n("ed08"),f=n("a18c"),b=n("cc5e"),p={key:"",name:"",description:"",routes:[]},g={data:function(){return{role:Object.assign({},p),routes:[],rolesList:[],dialogVisible:!1,dialogType:"new",checkStrictly:!1,defaultProps:{children:"children",label:"title"}}},computed:{routesData:function(){return this.routes}},created:function(){this.getRoutes(),this.getRoles()},methods:{getRoutes:function(){var e=this;return Object(s["a"])(Object(l["a"])().mark((function t(){return Object(l["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.serviceRoutes=f["a"],e.routes=e.generateRoutes(f["a"]);case 2:case"end":return t.stop()}}),t)})))()},getRoles:function(){var e=this;return Object(s["a"])(Object(l["a"])().mark((function t(){var n;return Object(l["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(b["c"])();case 2:n=t.sent,e.rolesList=n.data;case 4:case"end":return t.stop()}}),t)})))()},generateRoutes:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/",n=[];if(!e.length)return n;var r,a=Object(c["a"])(e);try{for(a.s();!(r=a.n()).done;){var o=r.value;if(!o.hidden){var i=this.onlyOneShowingChild(o.children,o);o.children&&i&&!o.alwaysShow&&(o=i);var l={path:d.a.resolve(t,o.path),title:o.meta&&o.meta.title};o.children&&(l.children=this.generateRoutes(o.children,l.path)),n.push(l)}}}catch(s){a.e(s)}finally{a.f()}return n},generateArr:function(e){var t=this,n=[];return e.forEach((function(e){if(n.push(e),e.children){var r=t.generateArr(e.children);r.length>0&&(n=[].concat(Object(i["a"])(n),Object(i["a"])(r)))}})),n},handleAddRole:function(){this.role=Object.assign({},p),this.$refs.tree&&this.$refs.tree.setCheckedNodes([]),this.dialogType="new",this.dialogVisible=!0},handleEdit:function(e){var t=this;this.dialogType="edit",this.dialogVisible=!0,this.checkStrictly=!0,this.role=Object(h["b"])(e.row),this.$nextTick((function(){console.log("roles:",t.role.routes);var e=t.generateRoutes(t.role.routes);t.$refs.tree.setCheckedNodes(t.generateArr(e)),t.checkStrictly=!1}))},handleDelete:function(e){var t=this,n=e.$index,r=e.row;this.$confirm("Confirm to remove the role?","Warning",{confirmButtonText:"Confirm",cancelButtonText:"Cancel",type:"warning"}).then(Object(s["a"])(Object(l["a"])().mark((function e(){return Object(l["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(b["b"])(r.key);case 2:t.rolesList.splice(n,1),t.$message({type:"success",message:"Delete succed!"});case 4:case"end":return e.stop()}}),e)})))).catch((function(e){console.error(e)}))},generateTree:function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/",r=arguments.length>2?arguments[2]:void 0,a=[],o=Object(c["a"])(e);try{for(o.s();!(t=o.n()).done;){var i=t.value,l=d.a.resolve(n,i.path);i.children&&(i.children=this.generateTree(i.children,l,r)),(r.includes(l)||i.children&&i.children.length>=1)&&a.push(i)}}catch(s){o.e(s)}finally{o.f()}return a},confirmRole:function(){var e=this;return Object(s["a"])(Object(l["a"])().mark((function t(){var n,r,a,o,i,c,s,u,d;return Object(l["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n="edit"===e.dialogType,r=e.$refs.tree.getCheckedKeys(),e.role.routes=e.generateTree(Object(h["b"])(e.serviceRoutes),"/",r),!n){t.next=16;break}return t.next=6,Object(b["d"])(e.role.key,e.role);case 6:a=0;case 7:if(!(a<e.rolesList.length)){t.next=14;break}if(e.rolesList[a].key!==e.role.key){t.next=11;break}return e.rolesList.splice(a,1,Object.assign({},e.role)),t.abrupt("break",14);case 11:a++,t.next=7;break;case 14:t.next=22;break;case 16:return t.next=18,Object(b["a"])(e.role);case 18:o=t.sent,i=o.data,e.role.key=i.key,e.rolesList.push(e.role);case 22:c=e.role,s=c.description,u=c.key,d=c.name,e.dialogVisible=!1,e.$notify({title:"Success",dangerouslyUseHTMLString:!0,message:"\n            <div>Role Key: ".concat(u,"</div>\n            <div>Role Name: ").concat(d,"</div>\n            <div>Description: ").concat(s,"</div>\n          "),type:"success"});case 25:case"end":return t.stop()}}),t)})))()},onlyOneShowingChild:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,n=null,r=e.filter((function(e){return!e.hidden}));return 1===r.length?(n=r[0],n.path=d.a.resolve(t.path,n.path),n):0===r.length&&(n=Object(o["a"])(Object(o["a"])({},t),{},{path:"",noShowingChildren:!0}),n)}}},v=g,m=(n("0c55"),n("2877")),y=Object(m["a"])(v,r,a,!1,null,"4eb158f1",null);t["default"]=y.exports},ed08:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return o}));var r=n("53ca");n("ac1f"),n("00b4"),n("5319"),n("4d63"),n("2c3e"),n("25f0"),n("d3b7"),n("4d90"),n("a15b"),n("d81d"),n("b64b"),n("159b"),n("fb6a"),n("a630"),n("3ca3"),n("6062"),n("ddb0"),n("466d");function a(e,t,n){var r,a,o,i,c,l=function l(){var s=+new Date-i;s<t&&s>0?r=setTimeout(l,t-s):(r=null,n||(c=e.apply(o,a),r||(o=a=null)))};return function(){for(var a=arguments.length,s=new Array(a),u=0;u<a;u++)s[u]=arguments[u];o=this,i=+new Date;var d=n&&!r;return r||(r=setTimeout(l,t)),d&&(c=e.apply(o,s),o=s=null),c}}function o(e){if(!e&&"object"!==Object(r["a"])(e))throw new Error("error arguments","deepClone");var t=e.constructor===Array?[]:{};return Object.keys(e).forEach((function(n){e[n]&&"object"===Object(r["a"])(e[n])?t[n]=o(e[n]):t[n]=e[n]})),t}}}]);