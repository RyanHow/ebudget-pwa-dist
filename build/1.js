webpackJsonp([1],{448:function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),a.d(n,"TransactionWizardViewMenuModuleNgFactory",function(){return w});var i=a(0),o=a(456),e=a(375),s=a(376),r=a(377),u=a(378),l=a(379),c=a(380),d=a(381),h=a(382),m=a(383),f=a(454),p=a(458),g=a(12),_=a(19),v=a(193),y=a(191),b=a(452),P=a(87),I=a(455),w=i.X(o.a,[],function(t){return i._11([i._12(512,i.i,i.S,[[8,[e.a,s.a,r.a,u.a,l.a,c.a,d.a,h.a,m.a,f.a,p.a]],[3,i.i],i.s]),i._12(4608,g.k,g.j,[i.r,[2,g.t]]),i._12(4608,_.s,_.s,[]),i._12(4608,_.d,_.d,[]),i._12(512,g.b,g.b,[]),i._12(512,_.q,_.q,[]),i._12(512,_.e,_.e,[]),i._12(512,_.n,_.n,[]),i._12(512,v.a,v.a,[]),i._12(512,v.b,v.b,[]),i._12(512,y.a,y.a,[]),i._12(512,b.a,b.a,[]),i._12(512,o.a,o.a,[]),i._12(256,P.a,I.a,[])])})},451:function(t,n,a){"use strict";a(1),a(0),a(17);var i=a(154),o=a(54),e=a(42),s=a(45),r=(a(22),function(){return function(){}}()),u=a(41);a.d(n,"a",function(){return l});var l=function(){function t(t,n,a){var l=this;if(this.navParams=t,this.viewCtrl=n,this.engineFactory=a,this.showAccount=!0,this.modalPageParams=this.navParams.data,this.modalPage=this.navParams.data.transactionId?"TransactionWizardViewPage":"TransactionWizardDescriptionStep",this.data=new r,this.data.transactionType="Expense",this.data.lines=[],this.data.engine=a.getEngineById(t.data.budgetId),null!=t.data.categoryId&&(this.data.engine.getCategory(t.data.categoryId),this.data.category=this.data.engine.db.transactionProcessor.table(o.a).by("id",t.data.categoryId)),t.data.transactionId){this.data.editing=!0;var c=this.data.engine.db.transactionProcessor.table(s.a).by("id",t.data.transactionId);this.data.transaction=this.data.engine.db.transactionProcessor.findTransactionsForRecord(c,i.a)[0],null==this.data.category&&(this.data.category=this.data.engine.db.transactionProcessor.table(o.a).by("id",this.data.transaction.amounts[0].categoryId)),this.data.date=e.a.toIonicFromYYYYMMDD(this.data.transaction.date),this.data.expense=this.data.transaction.amounts[0].amount.cmp(Object(u.Big)(0))>=0,this.data.description=this.data.transaction.description,this.data.transaction.amounts.forEach(function(t){l.data.lines.push({categoryId:t.categoryId,amount:t.amount.times(l.data.expense?1:-1)+""})})}else this.data.editing=!1,this.data.expense=!0,this.data.date=e.a.toIonicFromYYYYMMDD(this.navParams.data.date||e.a.nowYYYYMMDD()),this.data.description=this.navParams.data.description,this.data.accountId=this.navParams.data.accountId,this.data.status="realised",this.data.lines.push({categoryId:this.data.category?this.data.category.id:void 0,amount:"",accountId:this.data.accountId})}return t.prototype.done=function(){var t,n=this;(t=this.data.editing?this.data.transaction:new i.a).date=e.a.toYYYYMMDDFromIonic(this.data.date),t.description=this.data.description,t.amounts=[],this.data.lines.forEach(function(a){t.amounts.push({categoryId:a.categoryId,amount:new u.Big((a.amount||"0").replace(",","")).times(n.data.expense?1:-1)})}),this.data.engine.db.applyTransaction(t),this.dismiss()},t.prototype.delete=function(){this.data.engine.db.deleteTransaction(this.data.transaction),this.dismiss()},t.prototype.ngOnInit=function(){},t.prototype.dismiss=function(){this.viewCtrl.dismiss()},t.prototype.next=function(){"TransactionWizardDescriptionStep"===this.currentPage.static_name?this.navPush("TransactionWizardAmountStep"):this.navRoot("TransactionWizardViewPage")},t.prototype.navPush=function(t){return this.nav.push(t,this.modalPageParams,{animate:!1})},t.prototype.navRoot=function(t){return this.nav.setRoot(t,this.modalPageParams)},t.prototype.back=function(){this.nav.pop()},t.prototype.canGoBack=function(){return this.nav.canGoBack()},t}()},452:function(t,n,a){"use strict";a.d(n,"a",function(){return i});a(1),a(17),a(191),a(453);var i=function(){return function(){}}()},453:function(t,n,a){"use strict";a.d(n,"a",function(){return i});a(1),a(17);var i=function(){function t(t,n){this.wizard=t,this.platform=n,this.data=t.data}return t.prototype.cancel=function(){this.wizard.dismiss()},t}()},454:function(t,n,a){"use strict";function i(t){return o._23(0,[o._19(402653184,1,{nav:0}),(t()(),o._0(1,0,null,null,2,"ion-nav",[["id","transactionWizardNav"]],null,null,null,e.b,e.a)),o._18(6144,null,s.a,null,[r.a]),o.Z(3,4374528,[[1,4],["nav",4]],0,r.a,[[2,u.a],[2,l.a],c.a,d.a,h.a,o.j,o.u,o.z,o.i,m.l,f.a,[2,p.a],g.a,o.k],{root:[0,"root"],rootParams:[1,"rootParams"]},null),(t()(),o._21(-1,null,["\n"]))],function(t,n){var a=n.component;t(n,3,0,a.modalPage,a.modalPageParams)},null)}a.d(n,"a",function(){return P});var o=a(0),e=a(192),s=a(64),r=a(86),u=a(5),l=a(18),c=a(7),d=a(2),h=a(4),m=a(11),f=a(63),p=a(36),g=a(8),_=a(451),v=a(16),y=a(22),b=o.Y({encapsulation:2,styles:[],data:{}}),P=o.W("ng-component",_.a,function(t){return o._23(0,[(t()(),o._0(0,0,null,null,1,"ng-component",[],null,null,null,i,b)),o.Z(1,114688,null,0,_.a,[v.a,u.a,y.a],null,null)],function(t,n){t(n,1,0)},null)},{},{},[])},455:function(t,n,a){"use strict";a.d(n,"a",function(){return i});a(1),a(17);var i=function(){function t(t){this.viewCtrl=t,this.wizard=this.viewCtrl.getNavParams().data.wizard}return t.prototype.delete=function(){var t=this;this.viewCtrl.dismiss(void 0,void 0,{animate:!1,duration:0}).then(function(){t.wizard.delete()})},t.prototype.edit=function(){var t=this;this.viewCtrl.dismiss(void 0,void 0,{animate:!1,duration:0}).then(function(){t.wizard.navPush("TransactionWizardDescriptionStep")})},t}()},456:function(t,n,a){"use strict";a.d(n,"a",function(){return i});a(1),a(17),a(191);var i=function(){return function(){}}()},458:function(t,n,a){"use strict";function i(t){return e._23(0,[(t()(),e._0(0,0,null,null,8,"button",[["class","item item-block"],["detail-none",""],["ion-item",""],["no-lines",""]],null,[[null,"click"]],function(t,n,a){var i=!0;if("click"===n){i=!1!==t.component.delete()&&i}return i},s.b,s.a)),e.Z(1,1097728,null,3,r.a,[u.a,l.a,e.j,e.z,[2,c.a]],null,null),e._19(335544320,4,{contentLabel:0}),e._19(603979776,5,{_buttons:1}),e._19(603979776,6,{_icons:1}),e.Z(5,16384,null,0,d.a,[],null,null),(t()(),e._0(6,0,null,0,1,"ion-icon",[["item-start",""],["name","trash"],["role","img"]],[[2,"hide",null]],null,null,null,null)),e.Z(7,147456,[[6,4]],0,h.a,[l.a,e.j,e.z],{name:[0,"name"]},null),(t()(),e._21(-1,2,["Delete"]))],function(t,n){t(n,7,0,"trash")},function(t,n){t(n,6,0,e._14(n,7)._hidden)})}function o(t){return e._23(0,[(t()(),e._21(-1,null,["\n    "])),(t()(),e._0(1,0,null,null,8,"button",[["class","item item-block"],["detail-none",""],["ion-item",""],["no-lines",""]],null,[[null,"click"]],function(t,n,a){var i=!0;if("click"===n){i=!1!==t.component.edit()&&i}return i},s.b,s.a)),e.Z(2,1097728,null,3,r.a,[u.a,l.a,e.j,e.z,[2,c.a]],null,null),e._19(335544320,1,{contentLabel:0}),e._19(603979776,2,{_buttons:1}),e._19(603979776,3,{_icons:1}),e.Z(6,16384,null,0,d.a,[],null,null),(t()(),e._0(7,0,null,0,1,"ion-icon",[["item-start",""],["name","build"],["role","img"]],[[2,"hide",null]],null,null,null,null)),e.Z(8,147456,[[3,4]],0,h.a,[l.a,e.j,e.z],{name:[0,"name"]},null),(t()(),e._21(-1,2,["Edit"])),(t()(),e._21(-1,null,["\n    "])),(t()(),e.V(16777216,null,null,1,null,i)),e.Z(12,16384,null,0,m.i,[e.I,e.F],{ngIf:[0,"ngIf"]},null),(t()(),e._21(-1,null,["\n  "]))],function(t,n){var a=n.component;t(n,8,0,"build");t(n,12,0,a.wizard.data.editing)},function(t,n){t(n,7,0,e._14(n,8)._hidden)})}a.d(n,"a",function(){return _});var e=a(0),s=a(34),r=a(15),u=a(13),l=a(2),c=a(29),d=a(30),h=a(53),m=a(12),f=a(455),p=a(5),g=e.Y({encapsulation:2,styles:[],data:{}}),_=e.W("ng-component",f.a,function(t){return e._23(0,[(t()(),e._0(0,0,null,null,1,"ng-component",[],null,null,null,o,g)),e.Z(1,49152,null,0,f.a,[p.a],null,null)],null,null)},{},{},[])}});