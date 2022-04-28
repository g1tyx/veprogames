/*!
 * vue-konva v2.1.7 - https://github.com/konvajs/vue-konva#readme
 * MIT Licensed
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("vue"),require("konva")):"function"==typeof define&&define.amd?define(["vue","konva"],t):"object"==typeof exports?exports.VueKonva=t(require("vue"),require("konva")):e.VueKonva=t(e.Vue,e.Konva)}(this,(function(e,t){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(t,n){t.exports=e},function(e,t,n){e.exports=n(3)},function(e,n){e.exports=t},function(e,t,n){"use strict";n.r(t);var o=n(0);function r(e){var t=e.getLayer()||e.getStage();t&&t.batchDraw()}var i={key:!0,style:!0,elm:!0,isRootInsert:!0};function a(e,t,n,o){void 0===t&&(t={}),void 0===n&&(n={});var a=e._konvaNode,u={},s=!1;for(var c in n)if(!i[c]){var d="on"===c.slice(0,2),f=n[c]!==t[c];if(d&&f){var v=c.substr(2).toLowerCase();"content"===v.substr(0,7)&&(v="content"+v.substr(7,1).toUpperCase()+v.substr(8)),a.off(v+".vue-konva-event",n[c])}!t.hasOwnProperty(c)&&a.setAttr(c,void 0)}for(var l in t)if(!i[l]){var p="on"===l.slice(0,2),h=n[l]!==t[l];if(p&&h){var g=l.substr(2).toLowerCase();"content"===g.substr(0,7)&&(g="content"+g.substr(7,1).toUpperCase()+g.substr(8)),t[l]&&(a.off(g+".vue-konva-event"),a.on(g+".vue-konva-event",t[l]))}!p&&(t[l]!==n[l]||o&&t[l]!==a.getAttr(l))&&(s=!0,u[l]=t[l])}s&&(a.setAttrs(u),r(a))}function u(e){var t={};return Object.keys(e).forEach((function(n){t["on"+n]=e[n]})),t}function s(e,t){var n=!1,o=e.componentOptions.children||[],i=[];o.forEach((function(e){var t=function e(t){return t?t.$options._konvaNode?t.getNode():0===t.$children.length?null:e(t.$children[0]):null}(e.componentInstance);t&&i.push(t);var n=e.elm,o=e.componentInstance;if(n&&n.tagName&&o&&!t){var r=n&&n.tagName.toLowerCase();console.error('vue-konva error: You are trying to render "'+r+'" inside your component tree. Looks like it is not a Konva node. You can render only Konva components inside the Stage.')}})),i.forEach((function(e,t){e.getZIndex()!==t&&(e.setZIndex(t),n=!0)})),n&&r(t)}function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var d=n.n(o).a.component("v-stage",{render:function(e){return e("div",this.$slots.default)},watch:{config:{handler:function(e){this.uploadKonva()},deep:!0}},props:{config:{type:Object,default:function(){return{}}},__useStrictMode:{type:Boolean}},created:function(){this._konvaNode=new window.Konva.Stage({width:this.config.width,height:this.config.height,container:document.createElement("div")})},mounted:function(){this.$el.innerHTML="",this._konvaNode.container(this.$el),this.uploadKonva(),this.validateChildren()},updated:function(){this.uploadKonva(),this.uploadKonva(),s(this.$vnode,this._konvaNode)},beforeDestroy:function(){this._konvaNode.destroy()},methods:{getNode:function(){return this._konvaNode},getStage:function(){return this._konvaNode},uploadKonva:function(){var e=this.oldProps||{},t=c({},this.$attrs,this.config,u(this.$listeners));a(this,t,e,this.__useStrictMode),this.oldProps=t},validateChildren:function(){}}});function f(){return(f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var v={Group:!0,Layer:!0,FastLayer:!0,Label:!0};"undefined"==typeof window||window.Konva||n(2);var l=[{name:"Stage",component:d}].concat(["Layer","FastLayer","Group","Label","Rect","Circle","Ellipse","Wedge","Line","Sprite","Image","Text","TextPath","Star","Ring","Arc","Tag","Path","RegularPolygon","Arrow","Shape","Transformer"].map((function(e){return{name:e,component:(t=e,(n={})._konvaNode=!0,n.render=function(e){return v[t]?e("template",this.$slots.default):null},n.watch={config:{handler:function(e){this.uploadKonva()},deep:!0}},n.props={config:{type:Object,default:function(){return{}}},__useStrictMode:{type:Boolean}},n.created=function(){this.initKonva()},n.mounted=function(){(function e(t){return t._konvaNode?t:t.$parent?e(t.$parent):{}})(this.$parent)._konvaNode.add(this._konvaNode),r(this._konvaNode)},n.updated=function(){this.uploadKonva(),s(this.$vnode,this._konvaNode)},n.destroyed=function(){r(this._konvaNode),this._konvaNode.destroy(),this._konvaNode.off(".vue-konva-event")},n.methods={getNode:function(){return this._konvaNode},getStage:function(){return this._konvaNode},initKonva:function(){var e=window.Konva[t];e?(this._konvaNode=new e,this._konvaNode.VueComponent=this,this.uploadKonva()):console.error("vue-konva error: Can not find node "+t)},uploadKonva:function(){var e=this.oldProps||{},t=f({},this.$attrs,this.config,u(this.$listeners));a(this,t,e,this.__useStrictMode),this.oldProps=t}},n)};var t,n}))),p={install:function(e,t){var n="v";t&&t.prefix&&(n=t.prefix),l.forEach((function(t){e.component(""+n+t.name,t.component)}))}};t.default=p;"undefined"!=typeof window&&window.Vue&&window.Vue.use(p)}]).default}));
//# sourceMappingURL=vue-konva.min.js.map