(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{350:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("card",{attrs:{next:"/","next-text":"В начало"}},[r("div",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.Test.Title))]),t._v(" "),r("div",[t._v("Вы успешно завершили тест.")]),t._v(" "),r("div",[t._v("Всего вопросов "+t._s(t.CurrentTestResult.count)+", из них правильно "+t._s(t.CurrentTestResult.isTrue)+" ")])])],1)};n._withStripped=!0;var s=r(0),i=r.n(s),u=r(1),a=r.n(u),c=r(4),o=r.n(c),l=r(23),p={name:"Test-Finish",computed:o()({id:function(){return this.$route.params.id},Test:function(){return this.$store.getters.test(this.id)}},Object(l.c)(["CurrentTestResult","CurrentTest"])),fetch:function(){var t=a()(i.a.mark(function t(e){var r=e.store,n=e.params;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.dispatch("GET_TEST_INFO",n.id);case 2:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},d=r(2),v=Object(d.a)(p,n,[],!1,null,null,null);e.default=v.exports}}]);