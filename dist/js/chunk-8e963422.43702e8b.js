(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8e963422"],{5525:function(t,i,s){"use strict";s.r(i);var o=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("v-app",{staticClass:"mx-auto overflow-hidden"},[s("v-app-bar",{attrs:{color:"#333333",dark:"",app:""}},[s("v-app-bar-nav-icon",{on:{click:function(i){t.drawer=!t.drawer}}}),s("v-toolbar-title",[t._v(t._s(this.$route.meta.title))])],1),s("v-navigation-drawer",{attrs:{app:""},model:{value:t.drawer,callback:function(i){t.drawer=i},expression:"drawer"}},[s("router-link",{staticClass:"w100",staticStyle:{background:"#333333"},attrs:{to:"/dashboard",id:"brand-link"}},[s("img",{staticClass:"brand-image",attrs:{src:"/logotipo-extenso-bw.png",alt:"WK3 Logo"}})]),s("v-list",{attrs:{nav:"",dense:""}},[s("v-list-item",{attrs:{to:"/admin/vendas"}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-dollar-sign")])],1),s("v-list-item-title",[t._v("Vendas")])],1),s("v-list-group",{attrs:{value:!1},scopedSlots:t._u([{key:"activator",fn:function(){return[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-box-open")])],1),s("v-list-item-title",[t._v("Catálogo")])]},proxy:!0}])},[s("v-list-group",{attrs:{value:!1,"no-action":"","sub-group":""},scopedSlots:t._u([{key:"activator",fn:function(){return[s("v-list-item-content",[s("v-list-item-title",[t._v("Produtos")])],1)]},proxy:!0}])},[s("v-list-item",{attrs:{to:"/admin/produtos/novo"}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-plus")])],1),s("v-list-item-title",[t._v(" Novo ")])],1),s("v-list-item",{attrs:{to:"/admin/produtos"}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-list-ul")])],1),s("v-list-item-title",[t._v("Consultar")])],1)],1),s("v-list-group",{attrs:{value:!1,"no-action":"","sub-group":""},scopedSlots:t._u([{key:"activator",fn:function(){return[s("v-list-item-content",[s("v-list-item-title",[t._v("Categorias")])],1)]},proxy:!0}])},[s("v-list-item",{attrs:{to:"/admin/categorias/novo"}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-plus")])],1),s("v-list-item-title",[t._v(" Novo ")])],1),s("v-list-item",{attrs:{to:"/admin/categorias"}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-list-ul")])],1),s("v-list-item-title",[t._v(" Consultar ")])],1)],1),s("v-list-item",{attrs:{to:"/admin/acertos"}},[s("v-list-item-title",[t._v(" Acerto de estoque ")])],1)],1),s("v-list-group",{attrs:{value:!1},scopedSlots:t._u([{key:"activator",fn:function(){return[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-bullhorn")])],1),s("v-list-item-title",[t._v("Marketing")])]},proxy:!0}])},[s("v-list-group",{attrs:{value:!1,"no-action":"","sub-group":""},scopedSlots:t._u([{key:"activator",fn:function(){return[s("v-list-item-content",[s("v-list-item-title",[t._v("Cupons")])],1)]},proxy:!0}])},[s("v-list-item",{attrs:{to:"/admin/cupons/novo"}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-plus")])],1),s("v-list-item-title",[t._v(" Novo ")])],1),s("v-list-item",{attrs:{to:"/admin/cupons"}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-list-ul")])],1),s("v-list-item-title",[t._v("Consultar")])],1)],1),s("v-list-group",{attrs:{value:!1,"no-action":"","sub-group":""},scopedSlots:t._u([{key:"activator",fn:function(){return[s("v-list-item-content",[s("v-list-item-title",[t._v("Newsletter")])],1)]},proxy:!0}])},[s("v-list-item",{attrs:{to:"/admin/categorias/novo"}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-plus")])],1),s("v-list-item-title",[t._v(" Novo ")])],1),s("v-list-item",{attrs:{to:"/admin/categorias"}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-list-ul")])],1),s("v-list-item-title",[t._v(" Consultar ")])],1)],1)],1),s("v-list-group",{attrs:{value:!1},scopedSlots:t._u([{key:"activator",fn:function(){return[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-clipboard")])],1),s("v-list-item-title",[t._v("Relatórios")])]},proxy:!0}])},[s("v-list-item",{attrs:{link:""}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-tshirt")])],1),s("v-list-item-title",[t._v("Produtos")])],1),s("v-list-item",{attrs:{link:""}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-user")])],1),s("v-list-item-title",[t._v("Usuários")])],1),s("v-list-item",{attrs:{link:""}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-dollar-sign")])],1),s("v-list-item-title",[t._v("Vendas")])],1)],1),s("v-list-group",{attrs:{value:!1},scopedSlots:t._u([{key:"activator",fn:function(){return[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-cog")])],1),s("v-list-item-title",[t._v("Atributos")])]},proxy:!0}])},[s("v-list-group",{attrs:{value:!1,"no-action":"","sub-group":""},scopedSlots:t._u([{key:"activator",fn:function(){return[s("v-list-item-content",[s("v-list-item-title",[t._v("Cores")])],1)]},proxy:!0}])},[s("v-list-item",{attrs:{to:"/admin/cores/novo"}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-plus")])],1),s("v-list-item-title",[t._v(" Novo ")])],1),s("v-list-item",{attrs:{to:"/admin/cores"}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-list-ul")])],1),s("v-list-item-title",[t._v("Consultar")])],1)],1),s("v-list-group",{attrs:{value:!1,"no-action":"","sub-group":""},scopedSlots:t._u([{key:"activator",fn:function(){return[s("v-list-item-content",[s("v-list-item-title",[t._v("Marcas")])],1)]},proxy:!0}])},[s("v-list-item",{attrs:{to:"/admin/marcas/novo"}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-plus")])],1),s("v-list-item-title",[t._v(" Novo ")])],1),s("v-list-item",{attrs:{to:"/admin/marcas"}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-list-ul")])],1),s("v-list-item-title",[t._v(" Consultar ")])],1)],1),s("v-list-group",{attrs:{value:!1,"no-action":"","sub-group":""},scopedSlots:t._u([{key:"activator",fn:function(){return[s("v-list-item-content",[s("v-list-item-title",[t._v("Modelos")])],1)]},proxy:!0}])},[s("v-list-item",{attrs:{to:"/admin/modelos/novo"}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-plus")])],1),s("v-list-item-title",[t._v(" Novo ")])],1),s("v-list-item",{attrs:{to:"/admin/modelos"}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-list-ul")])],1),s("v-list-item-title",[t._v(" Consultar ")])],1)],1),s("v-list-group",{attrs:{value:!1,"no-action":"","sub-group":""},scopedSlots:t._u([{key:"activator",fn:function(){return[s("v-list-item-content",[s("v-list-item-title",[t._v("Tamanhos")])],1)]},proxy:!0}])},[s("v-list-item",{attrs:{to:"/admin/tamanhos/novo"}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-plus")])],1),s("v-list-item-title",[t._v(" Novo ")])],1),s("v-list-item",{attrs:{to:"/admin/tamanhos"}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-list-ul")])],1),s("v-list-item-title",[t._v(" Consultar ")])],1)],1),s("v-list-group",{attrs:{value:!1,"no-action":"","sub-group":""},scopedSlots:t._u([{key:"activator",fn:function(){return[s("v-list-item-content",[s("v-list-item-title",[t._v("Motivos")])],1)]},proxy:!0}])},[s("v-list-item",{attrs:{to:"/admin/motivos/novo"}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-plus")])],1),s("v-list-item-title",[t._v(" Novo ")])],1),s("v-list-item",{attrs:{to:"/admin/motivos"}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-list-ul")])],1),s("v-list-item-title",[t._v(" Consultar ")])],1)],1)],1),s("v-list-item",{on:{click:t.logoff}},[s("v-list-item-icon",[s("v-icon",{attrs:{small:""}},[t._v("fas fa-power-off")])],1),s("v-list-item-title",[t._v("Sair")])],1)],1)],1),s("v-main",[s("v-container",[t._t("default")],2)],1)],1)},a=[],l={name:"AppLayoutAdmin",data:function(){return{drawer:!1,group:null}},methods:{logoff:function(){localStorage.removeItem("user"),this.$store.dispatch("auth/logout"),this.$router.push("/admin")}}},e=l,v=(s("cede"),s("2877")),n=Object(v["a"])(e,o,a,!1,null,null,null);i["default"]=n.exports},cede:function(t,i,s){"use strict";s("fdc1")},fdc1:function(t,i,s){}}]);
//# sourceMappingURL=chunk-8e963422.43702e8b.js.map