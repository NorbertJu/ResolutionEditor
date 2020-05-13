(this["webpackJsonpresolution-editor"]=this["webpackJsonpresolution-editor"]||[]).push([[0],{24:function(e,t,r){e.exports=r(44)},44:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),o=r(15),i=r(16),u=r(8),c="ADD_STEP",s="CHANGE_STEP",l="CHANGE_RULE",f="CHANGE_UNIFIER",p="CHANGE_RENAMING",b="CHANGE_REFERENCE1",m="CHANGE_REFERENCE2",d="DELETE_STEP",v="INSERT_STEP",g="STEP_UP",y="STEP_DOWN",h="CHANGE_CONST",j="CHANGE_FUN",O="CHANGE_PRED",E="INPUT_FOCUS",w="IMPORT_STATE",x="EXPORT_STATE",S=0;var k=function(e){return{type:E,text:e}},N=function(e){return{type:"INPUT_BLUR",text:e}},R=function(e){var t=e.dispatch;return a.a.createElement("div",null,a.a.createElement("form",{onSubmit:function(e){e.preventDefault(),t({type:c,id:S++})}},a.a.createElement("button",{type:"submit",className:"btn btn-outline-success"},"Add Step")))},C=R=Object(u.b)()(R),P=function(e){var t=e.error,r=e.input;return t.hasOwnProperty("location")?a.a.createElement("div",{className:"invalid-feedback pr-1 pl-1"},a.a.createElement("b",null,r.substring(0,t.location.start.offset),a.a.createElement("mark",{className:"text-danger"},r.substring(t.location.start.offset,t.location.end.offset)),r.substring(t.location.end.offset,r.length)),a.a.createElement("br",null),t.name+": "+t.message):t?a.a.createElement("div",{className:"invalid-feedback pr-1 pl-1"},t.name+": "+t.message):null},F=function(e){var t=e.reference,r=e.index,n=e.number,o=e.onReference,i=e.onFocus,u=e.onBlur;return a.a.createElement("div",{className:"form-group col-2"},a.a.createElement("label",{htmlFor:"reference"+n+"-"+r},"Premise ",n),a.a.createElement("input",{type:"text",className:"form-control ".concat(t.error?"is-invalid":""),id:"reference"+n+"-"+r,onChange:function(e){return o(e.target.value)},onBlur:function(e){return u(e.target.value)},onFocus:function(e){return i(e.target.value)},value:t.input}),a.a.createElement(P,{error:t.error}))},M=function(e){var t=e.unifier,r=e.index,n=e.onUnifier,o=e.onFocus,i=e.onBlur;return a.a.createElement("div",{className:"form-group col"},a.a.createElement("label",{htmlFor:"unifier-"+r},"Unifier"),a.a.createElement("input",{type:"text",className:"form-control ".concat(t.error?"is-invalid":""),id:"unifier-"+r,onChange:function(e){return n(e.target.value)},onBlur:function(e){return i(e.target.value)},onFocus:function(e){return o(e.target.value)},value:t.input}),a.a.createElement(P,{error:t.error,input:t.input}))},D=function(e){var t=e.renaming,r=e.index,n=e.onRenaming,o=e.onFocus,i=e.onBlur;return a.a.createElement("div",{className:"form-group col"},a.a.createElement("label",{htmlFor:"renaming-"+r},"Renaming"),a.a.createElement("input",{type:"text",className:"form-control ".concat(t.error?"is-invalid":""),id:"renaming-"+r,onChange:function(e){return n(e.target.value)},onBlur:function(e){return i(e.target.value)},onFocus:function(e){return o(e.target.value)},value:t.input}),a.a.createElement(P,{error:t.error,input:t.input}))},U=function(e){var t=e.reference1,r=e.reference2,n=e.renaming,o=e.unifier,i=e.index,u=e.onReference1,c=e.onReference2,s=e.onRenaming,l=e.onUnifier,f=e.onFocus,p=e.onBlur;return a.a.createElement("div",{className:"form-row"},a.a.createElement(F,{reference:t,index:i,number:1,onReference:u,onFocus:f,onBlur:p}),a.a.createElement(D,{renaming:n,index:i,onRenaming:s,onFocus:f,onBlur:p}),a.a.createElement(F,{reference:r,index:i,number:2,onReference:c,onFocus:f,onBlur:p}),a.a.createElement(M,{unifier:o,index:i,onUnifier:l,onFocus:f,onBlur:p}))},A=function(e){var t=e.reference,r=e.unifier,n=e.index,o=e.onReference,i=e.onUnifier,u=e.onFocus,c=e.onBlur;return a.a.createElement("div",{className:"form-row"},a.a.createElement(F,{reference:t,index:n,number:1,onReference:o,onFocus:u,onBlur:c}),a.a.createElement(M,{unifier:r,index:n,onUnifier:i,onFocus:u,onBlur:c}))},B=function(e){var t=e.index,r=e.step,n=e.onChange,o=e.onDelete,i=e.onInsert,u=e.onUp,c=e.onDown,s=e.onRule,l=e.onRenaming,f=e.onUnifier,p=e.onReference1,b=e.onReference2,m=e.onBlur,d=e.onFocus;return a.a.createElement("div",null,a.a.createElement("button",{type:"button",className:"btn btn-light btn-sm",onClick:i,style:{float:"right"}}," + "),a.a.createElement("div",{className:"input-group mb-3"},a.a.createElement("div",{className:"input-group-prepend"},a.a.createElement("span",{className:"input-group-text"},t)),a.a.createElement("input",{type:"text",name:"item",className:"form-control \n        ".concat(r.formula.error?"is-invalid":"","\n        ").concat(r.valid?"is-valid":""),onChange:function(e){return n(e.target.value)},onBlur:function(e){return m(e.target.value)},onFocus:function(e){return d(e.target.value)},value:r.formula.input}),a.a.createElement("div",{className:"input-group-append"},a.a.createElement("select",{className:"form-control",onChange:function(e){return s(e.target.value)},value:r.rule},a.a.createElement("option",null,"Assumption"),a.a.createElement("option",null,"Resolution"),a.a.createElement("option",null,"Factoring")),a.a.createElement("button",{type:"button",className:"btn btn-outline-secondary btn-sm",onClick:u,disabled:null===u}," \u2191 "),a.a.createElement("button",{type:"button",className:"btn btn-outline-secondary btn-sm",onClick:c,disabled:null===c}," \u2193 "),a.a.createElement("button",{className:"btn btn-outline-danger",type:"button",onClick:o},"X")),a.a.createElement(P,{error:r.formula.error,input:r.formula.input})),{Resolution:a.a.createElement(U,{reference1:r.reference1,reference2:r.reference2,renaming:r.renaming,unifier:r.unifier,index:t,onReference1:p,onReference2:b,onRenaming:l,onUnifier:f,onFocus:d,onBlur:m}),Factoring:a.a.createElement(A,{reference:r.reference2,unifier:r.unifier,index:t,onReference:b,onUnifier:f,onFocus:d,onBlur:m})}[r.rule])},I=function(e){var t=e.steps,r=e.onStepDelete,n=e.onStepChange,o=e.onStepInsert,i=e.onStepUp,u=e.onStepDown,c=e.onRuleChange,s=e.onRenaming,l=e.onUnifier,f=e.onReference1,p=e.onReference2,b=e.inputFocus,m=e.inputBlur;return a.a.createElement("div",{style:{margin:"20px 0px"}},a.a.createElement("h2",null,"Proof"),t.order.map((function(e,d){return a.a.createElement(B,{key:e,step:t.allSteps.get(e),index:d+1,state:t,onChange:function(t){return n(e,t)},onRule:function(t){return c(e,t)},onRenaming:function(t){return s(e,t)},onUnifier:function(t){return l(e,t)},onReference1:function(t){return f(e,t)},onReference2:function(t){return p(e,t)},onDelete:function(){return r(e)},onInsert:function(){return o(d)},onUp:0===d?null:function(){return i(d)},onDown:d===t.order.length-1?null:function(){return u(d)},onFocus:function(e){return b(e)},onBlur:function(e){return m(e)}})})))},T={onStepDelete:function(e){return{type:d,id:e}},onStepChange:function(e,t){return{type:s,id:e,text:t}},onRuleChange:function(e,t){return{type:l,id:e,text:t}},onRenaming:function(e,t){return{type:p,id:e,text:t}},onUnifier:function(e,t){return{type:f,id:e,text:t}},onReference1:function(e,t){return{type:b,id:e,text:t}},onReference2:function(e,t){return{type:m,id:e,text:t}},onStepInsert:function(e){return{type:v,id:S++,position:e}},onStepUp:function(e){return{type:g,position:e}},onStepDown:function(e){return{type:y,position:e}},inputFocus:k,inputBlur:N},_=Object(u.b)((function(e){return{steps:e.present.steps}}),T)(I),L=function(e){var t=e.language,r=e.onConstChange,n=e.onFunChange,o=e.onPredChange,i=e.onFocus,u=e.onBlur;return a.a.createElement("div",{className:"mt-3"},a.a.createElement("h2",null,"Language"),a.a.createElement("div",{className:"input-group mb-3"},a.a.createElement("div",{className:"input-group-prepend"},a.a.createElement("span",{className:"input-group-text",id:"basic-addon1"},"Constants")),a.a.createElement("input",{type:"text",className:"form-control ".concat(t.consts.error?"is-invalid":""),name:"constants",onChange:function(e){return r(e.target.value)},onBlur:function(e){return u(e.target.value)},onFocus:function(e){return i(e.target.value)},value:t.consts.input}),a.a.createElement(P,{error:t.consts.error,input:t.consts.input})),a.a.createElement("div",{className:"input-group mb-3"},a.a.createElement("div",{className:"input-group-prepend"},a.a.createElement("span",{className:"input-group-text",id:"basic-addon1"},"Functions")),a.a.createElement("input",{type:"text",className:"form-control ".concat(t.funs.error?"is-invalid":""),name:"functions",onChange:function(e){return n(e.target.value)},onBlur:function(e){return u(e.target.value)},onFocus:function(e){return i(e.target.value)},value:t.funs.input}),a.a.createElement(P,{error:t.funs.error,input:t.funs.input})),a.a.createElement("div",{className:"input-group mb-3"},a.a.createElement("div",{className:"input-group-prepend"},a.a.createElement("span",{className:"input-group-text",id:"basic-addon1"},"Predicates")),a.a.createElement("input",{type:"text",className:"form-control ".concat(t.preds.error?"is-invalid":""),name:"predicates",onChange:function(e){return o(e.target.value)},onBlur:function(e){return u(e.target.value)},onFocus:function(e){return i(e.target.value)},value:t.preds.input}),a.a.createElement(P,{error:t.preds.error,input:t.preds.input})))},q={onConstChange:function(e){return{type:h,text:e}},onFunChange:function(e){return{type:j,text:e}},onPredChange:function(e){return{type:O,text:e}},onFocus:k,onBlur:N},G=Object(u.b)((function(e){return{language:e.present.language}}),q)(L),H=r(14),J=r.n(H),V=function(e){var t=e.canUndo,r=e.canRedo,n=e.onUndo,o=e.onRedo;return a.a.createElement("div",{className:"btn-group",role:"group"},a.a.createElement("button",{type:"button",className:"btn btn-secondary btn-sm",onClick:n,disabled:!t},"\u21b6 Undo"),a.a.createElement("button",{type:"button",className:"btn btn-secondary btn-sm",onClick:o,disabled:!r},"Redo \u21b7"))},Y={onUndo:H.ActionCreators.undo,onRedo:H.ActionCreators.redo},X=V=Object(u.b)((function(e){return{canUndo:e.past.length>0,canRedo:e.future.length>0}}),Y)(V),W=function(e){var t=e.onImport,r=e.onExport;return a.a.createElement("div",{className:"btn-group float-right",role:"group"},a.a.createElement("label",{htmlFor:"fileUpload",className:"btn btn-secondary btn-sm mb-0"},"\u2b71 Import"),a.a.createElement("input",{type:"file",id:"fileUpload",className:"btn btn-secondary btn-sm d-none",onChange:function(e){var r=new FileReader;r.onload=(e.target.files[0],function(e){t(e.target.result)}),r.readAsText(e.target.files[0])},onClick:function(e){return e.target.value=""}}),a.a.createElement("button",{type:"button",className:"btn btn-secondary btn-sm",onClick:r},"Export \u2b73"))},z={onImport:function(e){return{type:w,data:e}},onExport:function(){return{type:x}}},K=W=Object(u.b)((function(e){return{state:e.present}}),z)(W),Q=function(){return a.a.createElement("div",null,a.a.createElement(X,null),a.a.createElement(K,null),a.a.createElement(G,null),a.a.createElement(_,null),a.a.createElement(C,null))},Z=r(11),$=r(7),ee=r(6),te=r(12),re=r(1),ne=r(2),ae=function(){function e(t){Object(re.a)(this,e),this.name=t}return Object(ne.a)(e,[{key:"toString",value:function(){return this.name}},{key:"substitute",value:function(e){new Error("Unimplemented")}},{key:"equals",value:function(){new Error("Unimplemented")}}]),e}(),oe=r(4),ie=r(3),ue=r(5),ce=function(e){function t(e){return Object(re.a)(this,t),Object(oe.a)(this,Object(ie.a)(t).call(this,e))}return Object(ue.a)(t,e),Object(ne.a)(t,[{key:"equals",value:function(e){return e instanceof t&&this.name===e.name}},{key:"substitute",value:function(e){return new t(this.name)}}]),t}(ae),se=function(e){function t(e){var r,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Object(re.a)(this,t),(r=Object(oe.a)(this,Object(ie.a)(t).call(this,e))).subts=n,r}return Object(ue.a)(t,e),Object(ne.a)(t,[{key:"toString",value:function(){return"".concat(this.name,"(").concat(this.subts.join(", "),")")}},{key:"equals",value:function(e){return e instanceof t&&this.name===e.name&&this.subts.length===e.subts.length&&this.subts.every((function(t,r){return t.equals(e.subts[r])}))}},{key:"substitute",value:function(e){return new t(this.name,this.subts.map((function(t){return t.substitute(e)})))}}]),t}(ae),le=function(e){function t(e){return Object(re.a)(this,t),Object(oe.a)(this,Object(ie.a)(t).call(this,e))}return Object(ue.a)(t,e),Object(ne.a)(t,[{key:"equals",value:function(e){return e instanceof t&&this.name===e.name}},{key:"substitute",value:function(e){return e&&e.has(this.name)?e.get(this.name):new t(this.name)}}]),t}(ae),fe=function(){function e(t){Object(re.a)(this,e),this.subfs=t}return Object(ne.a)(e,[{key:"subfs",value:function(){return this.subfs}},{key:"toString",value:function(){new Error("Unimplemented")}},{key:"equals",value:function(e){new Error("Unimplemented")}},{key:"substitute",value:function(e){new Error("Unimplemented")}}]),e}(),pe=r(9),be=r.n(pe),me=function(e){function t(){var e,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return Object(re.a)(this,t),(e=Object(oe.a)(this,Object(ie.a)(t).call(this))).lits=r,e.litsMultiset=null,e}return Object(ue.a)(t,e),Object(ne.a)(t,[{key:"toString",value:function(){return this.lits.map((function(e){return e.toString()})).join(" \u2228 ")}},{key:"equals",value:function(e){if(!(e instanceof t)||this.lits.length!==e.lits.length)return!1;var r=!0,n=!1,a=void 0;try{for(var o,i=this.getLitsMultiset()[Symbol.iterator]();!(r=(o=i.next()).done);r=!0){var u=o.value;if(!e.has(u[0]))return!1;if(e.get(u[0])!==u[1])return!1}}catch(c){n=!0,a=c}finally{try{r||null==i.return||i.return()}finally{if(n)throw a}}return!0}},{key:"substitute",value:function(e){return new t(this.lits.map((function(t){return t.substitute(e)})))}},{key:"getLitsMultiset",value:function(){if(null!=this.litsMultiset)return this.litsMultiset;this.litsMultiset=[];var e=!1,t=!0,r=!1,n=void 0;try{for(var a,o=this.lits[Symbol.iterator]();!(t=(a=o.next()).done);t=!0){var i=a.value;e=!1;var u=!0,c=!1,s=void 0;try{for(var l,f=this.litsMultiset[Symbol.iterator]();!(u=(l=f.next()).done);u=!0){var p=l.value;if(p[0].equals(i)){p[1]++,e=!0;break}}}catch(b){c=!0,s=b}finally{try{u||null==f.return||f.return()}finally{if(c)throw s}}e||this.litsMultiset.push([i,1])}}catch(b){r=!0,n=b}finally{try{t||null==o.return||o.return()}finally{if(r)throw n}}return this.litsMultiset}},{key:"has",value:function(e){var t=!0,r=!1,n=void 0;try{for(var a,o=this.getLitsMultiset()[Symbol.iterator]();!(t=(a=o.next()).done);t=!0){if(a.value[0].equals(e))return!0}}catch(i){r=!0,n=i}finally{try{t||null==o.return||o.return()}finally{if(r)throw n}}return!1}},{key:"get",value:function(e){var t=!0,r=!1,n=void 0;try{for(var a,o=this.getLitsMultiset()[Symbol.iterator]();!(t=(a=o.next()).done);t=!0){var i=a.value;if(i[0].equals(e))return i[1]}}catch(u){r=!0,n=u}finally{try{t||null==o.return||o.return()}finally{if(r)throw n}}}},{key:"getResolvents",value:be.a.mark((function e(r,n,a){var o,i,u,c,s,l,f,p,b;return be.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o=this.substitute(n).substitute(a).getLitsMultiset(),i=r.substitute(a).getLitsMultiset(),u=!0,c=!1,s=void 0,e.prev=5,l=be.a.mark((function e(){var r,n,a,u,c,s,l,f,m,d;return be.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=p.value,b=Object($.a)(r,2),n=b[0],b[1],a=n.negation(),u=!0,c=!1,s=void 0,e.prev=8,l=be.a.mark((function e(){var r,u;return be.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=m.value,d=Object($.a)(r,2),u=d[0],d[1],!a.equals(u)){e.next=8;break}return e.next=7,new t(o.flatMap((function(e){var t=Object($.a)(e,2),r=t[0],a=t[1];return new Array(n===r?a-1:a).fill(r)})).concat(i.flatMap((function(e){var t=Object($.a)(e,2),r=t[0],n=t[1];return new Array(u===r?n-1:n).fill(r)}))));case 7:return e.abrupt("return","break");case 8:case"end":return e.stop()}}),e)})),f=i[Symbol.iterator]();case 11:if(u=(m=f.next()).done){e.next=19;break}return e.delegateYield(l(),"t0",13);case 13:if("break"!==e.t0){e.next=16;break}return e.abrupt("break",19);case 16:u=!0,e.next=11;break;case 19:e.next=25;break;case 21:e.prev=21,e.t1=e.catch(8),c=!0,s=e.t1;case 25:e.prev=25,e.prev=26,u||null==f.return||f.return();case 28:if(e.prev=28,!c){e.next=31;break}throw s;case 31:return e.finish(28);case 32:return e.finish(25);case 33:case"end":return e.stop()}}),e,null,[[8,21,25,33],[26,,28,32]])})),f=o[Symbol.iterator]();case 8:if(u=(p=f.next()).done){e.next=13;break}return e.delegateYield(l(),"t0",10);case 10:u=!0,e.next=8;break;case 13:e.next=19;break;case 15:e.prev=15,e.t1=e.catch(5),c=!0,s=e.t1;case 19:e.prev=19,e.prev=20,u||null==f.return||f.return();case 22:if(e.prev=22,!c){e.next=25;break}throw s;case 25:return e.finish(22);case 26:return e.finish(19);case 27:case"end":return e.stop()}}),e,this,[[5,15,19,27],[20,,22,26]])}))},{key:"isResolventOf",value:function(e,t,r,n){var a=!0,o=!1,i=void 0;try{for(var u,c=e.getResolvents(t,r,n)[Symbol.iterator]();!(a=(u=c.next()).done);a=!0){var s=u.value;if(this.equals(s))return!0}}catch(l){o=!0,i=l}finally{try{a||null==c.return||c.return()}finally{if(o)throw i}}return!1}},{key:"getFactors",value:be.a.mark((function e(r){var n,a,o,i,u,c,s,l;return be.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=this.substitute(r).getLitsMultiset(),a=!0,o=!1,i=void 0,e.prev=4,u=be.a.mark((function e(){var r,a;return be.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=s.value,l=Object($.a)(r,2),a=l[0],!(l[1]>=2)){e.next=7;break}return e.next=7,new t(n.flatMap((function(e){var t=Object($.a)(e,2),r=t[0],n=t[1];return new Array(r===a?n-1:n).fill(r)})));case 7:case"end":return e.stop()}}),e)})),c=n[Symbol.iterator]();case 7:if(a=(s=c.next()).done){e.next=12;break}return e.delegateYield(u(),"t0",9);case 9:a=!0,e.next=7;break;case 12:e.next=18;break;case 14:e.prev=14,e.t1=e.catch(4),o=!0,i=e.t1;case 18:e.prev=18,e.prev=19,a||null==c.return||c.return();case 21:if(e.prev=21,!o){e.next=24;break}throw i;case 24:return e.finish(21);case 25:return e.finish(18);case 26:case"end":return e.stop()}}),e,this,[[4,14,18,26],[19,,21,25]])}))},{key:"isFactorOf",value:function(e,t){var r=!0,n=!1,a=void 0;try{for(var o,i=e.getFactors(t)[Symbol.iterator]();!(r=(o=i.next()).done);r=!0){var u=o.value;if(this.equals(u))return!0}}catch(c){n=!0,a=c}finally{try{r||null==i.return||i.return()}finally{if(n)throw a}}return!1}}]),t}(fe),de=function(e){function t(e,r){var n,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return Object(re.a)(this,t),(n=Object(oe.a)(this,Object(ie.a)(t).call(this))).neg=e,n.name=r,n.terms=a,n}return Object(ue.a)(t,e),Object(ne.a)(t,[{key:"toString",value:function(){var e="";return this.neg&&(e+="\xac"),e+this.name+"("+this.terms.map((function(e){return e.toString()})).join(", ")+")"}},{key:"equals",value:function(e){return e instanceof t&&this.neg===e.neg&&this.name===e.name&&this.terms.length===e.terms.length&&this.terms.every((function(t,r){return t.equals(e.terms[r])}))}},{key:"negation",value:function(){return new t(!this.neg,this.name,this.terms)}},{key:"substitute",value:function(e){return new t(this.neg,this.name,this.terms.map((function(t){return t.substitute(e)})))}}]),t}(fe);function ve(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function ge(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ve(r,!0).forEach((function(t){Object(Z.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ve(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var ye=function(e,t){switch(t.type){case s:return ge({},e,{formula:ge({},e.formula,{input:t.text})});case l:return ge({},e,{rule:t.text});case p:return ge({},e,{renaming:ge({},e.renaming,{input:t.text})});case f:return ge({},e,{unifier:ge({},e.unifier,{input:t.text})});case b:return ge({},e,{reference1:ge({},e.reference1,{input:t.text})});case m:return ge({},e,{reference2:ge({},e.reference2,{input:t.text})});default:return e}};function he(e,t,r){return e.error="",""!==e.input?r.rank.get(t)<parseInt(e.input)||parseInt(e.input)<1?e.error={name:"IndexError",message:"Index out of range."}:isNaN(parseInt(e.input))?e.error={name:"SyntaxError",message:'Expected number but "'+e.input+'" found.'}:(e.object=parseInt(e.input)-1,e.error=""):e.error={name:"EmptyError",message:"This field cannot be empty"},[!e.error,e]}function je(e){for(var t=0;t<e.length;t++)for(var r=t+1;r<e.length;r++)if(e[t][0]===e[r][0])return{name:"DuplicityError",message:'Symbol "'+e[t][0]+'" is already being substituted'};return""}function Oe(e){function t(e,t,r,n){var a=n.expected,o=r.get(e);t.length!==o&&a("".concat(o," argument").concat(1==o?"":"s"," to ").concat(e))}return{variable:function(e,t){return new le(e)},constant:function(e,t){return new ce(e)},functionApplication:function(r,n,a){return t(r,n,e.funs.object,a),new se(r,n)},literal:function(r,n,a,o){return t(n,a,e.preds.object,o),new de(r,n,a)},clause:function(e,t){return new me(e)}}}function Ee(e){var t=new Set([].concat(Object(ee.a)(e.consts.object),Object(ee.a)(e.funs.object.keys()),Object(ee.a)(e.preds.object.keys())));return{isConstant:function(t){return e.consts.object.has(t)},isFunction:function(t){return e.funs.object.has(t)},isPredicate:function(t){return e.preds.object.has(t)},isVariable:function(e){return!t.has(e)}}}function we(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function xe(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?we(r,!0).forEach((function(t){Object(Z.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):we(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Se={formula:{input:"",object:void 0,error:""},rule:"Assumption",reference1:{input:"",object:void 0,error:""},renaming:{input:"",object:void 0,error:""},reference2:{input:"",object:void 0,error:""},unifier:{input:"",object:void 0,error:""},valid:!1};function ke(e,t){return e.object>=t&&(e={object:e.object+1,input:e.object+2+"",error:""}),e}function Ne(e,t){return e.object>t?e={object:e.object-1,input:e.object+"",error:""}:e.object===t&&(e={object:void 0,input:"",error:""}),e}function Re(e,t,r){return e.object===t?e={object:r,input:r+1+"",error:""}:e.object===r&&(e={object:t,input:t+1+"",error:""}),e}function Ce(e,t,r,n){var a=he(xe({},e.reference1),t,r),o=he(xe({},e.reference2),t,r),i=function(e,t){e.error="";try{if(""!==e.input){var r=Object(te.parseSubstitution)(e.input,Ee(t),Oe(t));e.object=new Map(r);var n=!0,a=!1,o=void 0;try{for(var i,u=e.object[Symbol.iterator]();!(n=(i=u.next()).done);n=!0){var c=i.value,s=Object($.a)(c,2),l=s[0],f=s[1];f instanceof le||(e.error={name:"TypeError",message:'"'+l+'" is renamed to "'+f+'", which is not a variable'})}}catch(p){a=!0,o=p}finally{try{n||null==u.return||u.return()}finally{if(a)throw o}}e.error||(e.error=je(r))}else e.object=void 0}catch(b){e.error=b}return[!e.error,e]}(xe({},e.renaming),n),u=function(e,t){e.error="";try{if(""!==e.input){var r=Object(te.parseSubstitution)(e.input,Ee(t),Oe(t));e.object=new Map(r),e.error=je(r)}else e.object=void 0}catch(n){e.error=n}return[!e.error,e]}(xe({},e.unifier),n),c=function(e,t){e.error="";try{e.object=Object(te.parseClause)(e.input,Ee(t),Oe(t))}catch(r){e.error=r}return[!e.error,e]}(xe({},e.formula),n),s=xe({},e,{reference1:a[1],reference2:o[1],renaming:i[1],unifier:u[1],formula:c[1]});switch(e.rule){case"Factoring":if(!o[0])return xe({},s,{valid:!1});var l=Pe(o[1].object,r);return l&&c[0]?s.formula.object.isFactorOf(l.formula.object,s.unifier.object)?xe({},s,{valid:!0,formula:xe({},s.formula,{error:""})}):xe({},s,{valid:!1,formula:xe({},s.formula,{error:{name:"LogicError",message:"This clause is not valid factor of clause "+s.reference2.input}})}):xe({},s,{valid:!1});case"Resolution":if(!o[0]||!a[0])return xe({},s,{valid:!1});var f=Pe(a[1].object,r),p=Pe(o[1].object,r);return f&&p&&c[0]?s.formula.object.isResolventOf(f.formula.object,p.formula.object,s.renaming.object,s.unifier.object)?xe({},s,{valid:!0,formula:xe({},s.formula,{error:""})}):xe({},s,{valid:!1,formula:xe({},s.formula,{error:{name:"LogicError",message:"This clause is not valid resolvent of clauses "+s.reference1.input+" and "+s.reference2.input}})}):xe({},s,{valid:!1});case"Assumption":return c[0]?xe({},s,{valid:!0}):xe({},s,{valid:!1});default:return xe({},s)}}function Pe(e,t){var r=t.allSteps.get(t.order[parseInt(e)]);return r.valid?r:null}var Fe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{order:[],allSteps:new Map,rank:new Map},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{type:void 0},r=arguments.length>2?arguments[2]:void 0;switch(t.type){case c:return Object.assign({},e,{order:[].concat(Object(ee.a)(e.order),[t.id]),allSteps:new Map([].concat(Object(ee.a)(e.allSteps),[[t.id,Se]])),rank:new Map([].concat(Object(ee.a)(e.rank),[[t.id,e.order.length]]))});case l:case p:case f:case b:case m:case s:for(var n=new Map(e.allSteps),a=e.rank.get(t.id),o=new Set,i=a;i<e.order.length;i++){var u=e.order[i],E=n.get(u);i===a?(o.add(i),n.set(u,Ce(ye(E,t),u,e,r))):("Factoring"===E.rule&&o.has(E.reference2.object)||"Resolution"===E.rule&&(o.has(E.reference2.object)||o.has(E.reference1.object)))&&(o.add(i),n.set(u,Ce(n.get(u),u,xe({},e,{allSteps:n}),r)))}return xe({},e,{allSteps:n});case d:var x=e.rank.get(t.id),S=new Map(Object(ee.a)(e.allSteps));S.delete(t.id);var k=Object(ee.a)(e.order.filter((function(e){return e!==t.id}))),N=e.rank.get(t.id),R=new Map(Object(ee.a)(e.rank));R.delete(t.id);var C=!0,P=!1,F=void 0;try{for(var M,D=R.entries()[Symbol.iterator]();!(C=(M=D.next()).done);C=!0){var U=M.value,A=Object($.a)(U,2),B=A[0],I=A[1];I>x&&R.set(B,I-1)}}catch(Ye){P=!0,F=Ye}finally{try{C||null==D.return||D.return()}finally{if(P)throw F}}for(var T=N+1;T<e.order.length;T++){var _=e.order[T],L=S.get(_);S.set(_,xe({},L,{reference1:Ne(xe({},L.reference1),N),reference2:Ne(xe({},L.reference2),N)}))}for(var q=xe({},e,{rank:R,order:k,allSteps:S}),G=N;G<q.order.length;G++){var H=q.order[G];S.set(H,Ce(S.get(H),H,xe({},q,{newSteps:S}),r))}return xe({},q,{allSteps:S});case v:var J=new Map(Object(ee.a)(e.rank)),V=!0,Y=!1,X=void 0;try{for(var W,z=J.entries()[Symbol.iterator]();!(V=(W=z.next()).done);V=!0){var K=W.value,Q=Object($.a)(K,2),Z=Q[0],te=Q[1];te>=t.position&&J.set(Z,te+1)}}catch(Ye){Y=!0,X=Ye}finally{try{V||null==z.return||z.return()}finally{if(Y)throw X}}J.set(t.id,t.position);for(var re=[].concat(Object(ee.a)(e.order.slice(0,t.position)),[t.id],Object(ee.a)(e.order.slice(t.position))),ne=new Map([].concat(Object(ee.a)(e.allSteps),[[t.id,Se]])),ae=t.position+1;ae<e.order.length;ae++){var oe=e.order[ae],ie=ne.get(oe);ne.set(oe,xe({},ie,{reference1:ke(xe({},ie.reference1),t.position),reference2:ke(xe({},ie.reference2),t.position)}))}for(var ue=xe({},e,{rank:J,order:re,allSteps:ne}),ce=t.position+1;ce<ue.order.length;ce++){var se=ue.order[ce];ne.set(se,Ce(ne.get(se),se,xe({},ue,{newSteps:ne}),r))}return xe({},ue,{allSteps:ne});case g:var le=new Map(Object(ee.a)(e.rank));le.set(e.order[t.position],t.position-1),le.set(e.order[t.position-1],t.position);for(var fe=[].concat(Object(ee.a)(e.order.slice(0,t.position-1)),[e.order[t.position],e.order[t.position-1]],Object(ee.a)(e.order.slice(t.position+1))),pe=new Map(Object(ee.a)(e.allSteps)),be=t.position-1;be<e.order.length;be++){var me=e.order[be],de=pe.get(me);pe.set(me,xe({},de,{reference1:Re(xe({},de.reference1),t.position,t.position-1),reference2:Re(xe({},de.reference2),t.position,t.position-1)}))}for(var ve=xe({},e,{rank:le,order:fe,allSteps:pe}),ge=new Set,he=t.position-1;he<ve.order.length;he++){var je=ve.order[he],Oe=pe.get(je);(he===t.position-1||he===t.position||"Factoring"===Oe.rule&&ge.has(Oe.reference2.object)||"Resolution"===Oe.rule&&(ge.has(Oe.reference2.object)||ge.has(Oe.reference1.object)))&&(ge.add(he),pe.set(je,Ce(pe.get(je),je,xe({},ve,{newSteps:pe}),r)))}return xe({},ve,{allSteps:pe});case y:var Ee=new Map(Object(ee.a)(e.rank));Ee.set(e.order[t.position],t.position+1),Ee.set(e.order[t.position+1],t.position);for(var we=[].concat(Object(ee.a)(e.order.slice(0,t.position)),[e.order[t.position+1],e.order[t.position]],Object(ee.a)(e.order.slice(t.position+2))),Pe=new Map(Object(ee.a)(e.allSteps)),Fe=t.position;Fe<e.order.length;Fe++){var Me=e.order[Fe],De=Pe.get(Me);Pe.set(Me,xe({},De,{reference1:Re(xe({},De.reference1),t.position,t.position+1),reference2:Re(xe({},De.reference2),t.position,t.position+1)}))}for(var Ue=xe({},e,{rank:Ee,order:we,allSteps:Pe}),Ae=new Set,Be=t.position;Be<Ue.order.length;Be++){var Ie=Ue.order[Be],Te=Pe.get(Ie);(Be===t.position||Be===t.position+1||"Factoring"===Te.rule&&Ae.has(Te.reference2.object)||"Resolution"===Te.rule&&(Ae.has(Te.reference2.object)||Ae.has(Te.reference1.object)))&&(Ae.add(Be),Pe.set(Ie,Ce(Pe.get(Ie),Ie,xe({},Ue,{newSteps:Pe}),r)))}return xe({},Ue,{allSteps:Pe});case h:case j:case O:case w:var _e=new Map(e.allSteps),Le=!0,qe=!1,Ge=void 0;try{for(var He,Je=e.order[Symbol.iterator]();!(Le=(He=Je.next()).done);Le=!0){var Ve=He.value;_e.set(Ve,Ce(ye(_e.get(Ve),t),Ve,xe({},e,{allSteps:_e}),r))}}catch(Ye){qe=!0,Ge=Ye}finally{try{Le||null==Je.return||Je.return()}finally{if(qe)throw Ge}}return xe({},e,{allSteps:_e});default:return e}};function Me(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function De(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Me(r,!0).forEach((function(t){Object(Z.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Me(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Ue(e){return""===e.error&&""!==e.input}function Ae(e){if(!Ue(e)&&"DuplicityError"!==e.error.name)return e;for(var t=0;t<e.symbols.length;t++)for(var r=t+1;r<e.symbols.length;r++)if(e.symbols[t]===e.symbols[r])return De({},e,{error:{name:"DuplicityError",message:'Symbol "'+e.symbols[t]+'" is already a constant'}});return De({},e,{error:""})}function Be(e,t){if(!Ue(e)&&"DuplicityError"!==e.error.name)return e;for(var r=0;r<e.symbols.length;r++)for(var n=r+1;n<e.symbols.length;n++)if(e.symbols[r].name===e.symbols[n].name)return De({},e,{error:{name:"DuplicityError",message:'Symbol "'+e.symbols[r].name+'" is already a function'}});if(Ue(t)){var a=!0,o=!1,i=void 0;try{for(var u,c=e.object[Symbol.iterator]();!(a=(u=c.next()).done);a=!0){var s=u.value,l=Object($.a)(s,2),f=l[0],p=(l[1],!0),b=!1,m=void 0;try{for(var d,v=t.object[Symbol.iterator]();!(p=(d=v.next()).done);p=!0){if(f===d.value)return De({},e,{error:{name:"DuplicityError",message:'Symbol "'+f+'" is already a constant'}})}}catch(g){b=!0,m=g}finally{try{p||null==v.return||v.return()}finally{if(b)throw m}}}}catch(g){o=!0,i=g}finally{try{a||null==c.return||c.return()}finally{if(o)throw i}}}return De({},e,{error:""})}function Ie(e,t,r){if(!Ue(e)&&"DuplicityError"!==e.error.name)return e;for(var n=0;n<e.symbols.length;n++)for(var a=n+1;a<e.symbols.length;a++)if(e.symbols[n].name===e.symbols[a].name)return De({},e,{error:{name:"DuplicityError",message:'Symbol "'+e.symbols[n].name+'" is already a predicate'}});if(Ue(t)){var o=!0,i=!1,u=void 0;try{for(var c,s=t.object[Symbol.iterator]();!(o=(c=s.next()).done);o=!0){var l=c.value,f=Object($.a)(l,2),p=f[0],b=(f[1],!0),m=!1,d=void 0;try{for(var v,g=e.object[Symbol.iterator]();!(b=(v=g.next()).done);b=!0){var y=v.value,h=Object($.a)(y,2),j=h[0];h[1];if(p===j)return De({},e,{error:{name:"DuplicityError",message:'Symbol "'+p+'" is already a function'}})}}catch(A){m=!0,d=A}finally{try{b||null==g.return||g.return()}finally{if(m)throw d}}}}catch(A){i=!0,u=A}finally{try{o||null==s.return||s.return()}finally{if(i)throw u}}}if(Ue(r)){var O=!0,E=!1,w=void 0;try{for(var x,S=r.object[Symbol.iterator]();!(O=(x=S.next()).done);O=!0){var k=x.value,N=!0,R=!1,C=void 0;try{for(var P,F=e.object[Symbol.iterator]();!(N=(P=F.next()).done);N=!0){var M=P.value,D=Object($.a)(M,2),U=D[0];D[1];if(k===U)return De({},e,{error:{name:"DuplicityError",message:'Symbol "'+k+'" is already a constant'}})}}catch(A){R=!0,C=A}finally{try{N||null==F.return||F.return()}finally{if(R)throw C}}}}catch(A){E=!0,w=A}finally{try{O||null==S.return||S.return()}finally{if(E)throw w}}}return De({},e,{error:""})}var Te=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{consts:{input:"",object:new Set,error:"",symbols:[]},funs:{input:"",object:new Map,error:"",symbols:[]},preds:{input:"",object:new Map,error:"",symbols:[]}},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{type:void 0};switch(t.type){case h:var r=De({},e.consts,{input:t.text,error:""});try{""!==t.text?(r.symbols=Object(te.parseConstants)(t.text),r.object=new Set(r.symbols)):(r.symbols=[],r.object=new Set)}catch(o){r.error=o}return De({},e,{consts:Ae(r),funs:Be(e.funs,r),preds:Ie(e.preds,e.funs,r)});case j:var n=De({},e.funs,{input:t.text,error:""});try{""!==t.text?(n.symbols=Object(te.parseFunctions)(t.text),n.object=new Map(n.symbols.map((function(e){return[e.name,e.arity]})))):(n.symbols=[],n.object=new Map)}catch(o){n.error=o}return De({},e,{funs:Be(n,e.consts),preds:Ie(e.preds,n,e.consts)});case O:var a=De({},e.preds,{input:t.text,error:""});try{a.symbols=Object(te.parsePredicates)(t.text),a.object=new Map(a.symbols.map((function(e){return[e.name,e.arity]})))}catch(o){a.error=o}return De({},e,{preds:Ie(a,e.funs,e.consts)});default:return e}};function _e(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Le(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?_e(r,!0).forEach((function(t){Object(Z.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):_e(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var qe={language:Te(),steps:Fe(),inputChange:{originValue:""}};var Ge=J()((function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:qe,r=arguments.length>1?arguments[1]:void 0;switch(r.type){case h:case j:case O:var n=Te(t.language,r);return Le({},t,{language:n,steps:Fe(t.steps,r,n)});case E:return Le({},t,{inputChange:{originValue:r.text}});case c:case s:case d:case v:case g:case y:case l:case b:case m:case p:case f:var a=Fe(t.steps,r,t.language);return Le({},t,{language:t.language,steps:a});case x:var o=document.createElement("a");o.setAttribute("download","resolution_state");var i=Le({},t,{language:Le({},t.language,{consts:Le({},t.language.consts,{object:Array.from(t.language.consts.object)}),funs:Le({},t.language.funs,{object:Array.from(t.language.funs.object.entries())}),preds:Le({},t.language.preds,{object:Array.from(t.language.preds.object.entries())})}),steps:Le({},t.steps,{allSteps:Array.from(t.steps.allSteps.entries()),rank:Array.from(t.steps.rank.entries())})}),u=new Blob([JSON.stringify({state:i,id:S})],{type:"text/plain"}),k=window.URL.createObjectURL(u);return o.href=k,o.click(),t;case w:var N=JSON.parse(r.data),R=N.state;return e=N.id,S=e,R.steps.allSteps=new Map(R.steps.allSteps),R.steps.rank=new Map(R.steps.rank),R.language.consts.object=new Set(R.language.consts.object),R.language.funs.object=new Map(R.language.funs.object),R.language.preds.object=new Map(R.language.preds.object),R.steps=Fe(R.steps,r,R.language),R;default:return t}}),{filter:function(e,t,r){switch(e.type){case s:case h:case j:case O:case b:case m:case p:case f:case E:return!1;case"INPUT_BLUR":return e.text!==t.inputChange.originValue;default:return!0}}}),He=Object(i.b)(Ge);Object(o.render)(a.a.createElement(u.a,{store:He},a.a.createElement(Q,null)),document.getElementById("root"))}},[[24,1,2]]]);
//# sourceMappingURL=main.2ddd39ff.chunk.js.map