/**
 * Kendo UI v2023.2.718 (http://www.telerik.com/kendo-ui)
 * Copyright 2023 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import"./kendo.data.js";import"./kendo.treelist.js";var __meta__={id:"gantt.data",name:"GanttData",category:"web",description:"The Gantt Data.",depends:["data","treelist"],hidden:!0};!function(e,t){var n=Array.isArray,a=e.extend,r=e.map,i=kendo.data,d=i.Query,s=i.DataSource,l=i.TreeListDataSource,u=i.TreeListModel,o=function(e,t){return function(a){var r=(a=n(a)?{data:a}:a)||{},i=r.data;if(r.data=i,!(r instanceof e)&&r instanceof s)throw new Error("Incorrect DataSource type. Only "+t+" instances are supported");return r instanceof e?r:new e(r)}},h=function(e){if(e.filter("[name=end], [name=start], [name=plannedEnd], [name=plannedStart]").length){for(var t,n,a=e.attr("name"),r=kendo.widgetInstance(e,kendo.ui),i={},d=e;d!==window&&!t;)t=(d=d.parent()).data("kendoEditable");return!(n=t?t.options.model:null)||(a.indexOf("planned")>=0?(i.plannedStart=n.plannedStart,i.plannedEnd=n.plannedEnd):(i.start=n.start,i.end=n.end),i[a]=r?r.value():kendo.parseDate(e.val()),a.indexOf("planned")>=0?i.plannedStart<=i.plannedEnd:i.start<=i.end)}return!0},c=kendo.data.Model.define({id:"id",fields:{id:{type:"number",editable:!1},predecessorId:{type:"number",validation:{required:!0}},successorId:{type:"number",validation:{required:!0}},type:{type:"number",validation:{required:!0}}}}),p=s.extend({init:function(e){s.fn.init.call(this,a(!0,{},{schema:{modelBase:c,model:c}},e))},dependencies:function(e){var t=this.predecessors(e),n=this.successors(e);return t.push.apply(t,n),t},predecessors:function(e){return this._dependencies("successorId",e)},successors:function(e){return this._dependencies("predecessorId",e)},_dependencies:function(e,t){var n=this.view(),a={field:e,operator:"eq",value:t};return n=new d(n).filter(a).toArray()}});p.create=o(p,"GanttDependencyDataSource");var m=u.define({fields:{id:{type:"number",editable:!1},parentId:{type:"number",defaultValue:null,nullable:!0},orderId:{type:"number",validation:{required:!0}},title:{type:"string",defaultValue:"New task"},start:{type:"date",validation:{required:!0}},end:{type:"date",validation:{required:!0,dateCompare:h,message:"End date should be after or equal to the start date"}},percentComplete:{type:"number",validation:{required:!0,min:0,max:1,step:.01}},summary:{type:"boolean"},expanded:{type:"boolean",defaultValue:!0},plannedStart:{type:"date",defaultValue:null,nullable:!0},plannedEnd:{type:"date",defaultValue:null,nullable:!0,validation:{dateCompare:h,message:"Planned end date should be after or equal to the planned start date"}}},duration:function(){return this.end-this.start},plannedDuration:function(){var e=this.plannedEnd,t=this.plannedStart;return e&&t?e-t:0},isMilestone:function(){return 0===this.duration()},_offset:function(e){for(var t,n=["start","end"],a=0;a<n.length;a++)t=new Date(this.get(n[a]).getTime()+e),this.set(n[a],t)},_offsetPlanned:function(e){for(var t,n=["plannedStart","plannedEnd"],a=0;a<n.length;a++)t=new Date(this.get(n[a]).getTime()+e),this.set(n[a],t)}});m.define=function(e,n){n===t&&(n=e,e=m);var a=n.parentId||"parentId";n.parentIdField=a;var r=u.define(e,n);return a&&(r.parentIdField=a),r};var f=l.extend({init:function(e){l.fn.init.call(this,a(!0,{},{schema:{modelBase:m,model:m},sort:{field:"orderId",dir:"asc"}},e))},add:function(e){if(e)return e=this._toGanttTask(e),this.insert(this.taskSiblings(e).length,e)},insert:function(e,t){if(t)return(t=this._toGanttTask(t)).set("orderId",e),t=s.fn.insert.call(this,e,t),this._reorderSiblings(t,this.taskSiblings(t).length-1),this._resolveSummaryFields(this.taskParent(t)),t},remove:function(e){var t=e.get("parentId"),n=this.taskAllChildren(e);return this._removeItems(n),e=l.fn.remove.call(this,e),this._childRemoved(t,e.get("orderId")),e},taskAllChildren:function(e){var t=[],n=this,a=function(e){var i=n.taskChildren(e);t.push.apply(t,i),r(i,a)};return e?a(e):t=this.view(),t},taskChildren:function(e,n){var a,r,i={field:"parentId",operator:"eq",value:null},s=this._sort&&this._sort.length?this._sort:{field:"orderId",dir:"asc"};if(r=n?this.view():this.data(),e){if((a=e.get("id"))===t||null===a||""===a)return[];i.value=a}return r=new d(r).filter(i).sort(s).toArray()},taskLevel:function(e){for(var t=0,n=this.taskParent(e);null!==n;)t+=1,n=this.taskParent(n);return t},taskParent:function(e){return e&&null!==e.get("parentId")?this.get(e.parentId):null},taskSiblings:function(e){if(!e)return null;var t=this.taskParent(e);return this.taskChildren(t)},taskTree:function(e){for(var t,n=[],a=this.taskChildren(e,!0),r=0,i=a.length;r<i;r++)if(t=a[r],n.push(t),t.get("expanded")){var d=this.taskTree(t);n.push.apply(n,d)}return n},update:function(e,n){var a,r=this,i=function(e){var t=e.field,n=e.sender;switch(t){case"start":r._resolveSummaryStart(r.taskParent(n)),function(e,t){for(var n=r.taskAllChildren(e),a=0,i=n.length;a<i;a++)n[a]._offset(t)}(n,n.get(t).getTime()-a.getTime());break;case"end":r._resolveSummaryEnd(r.taskParent(n));break;case"plannedStart":r._resolveSummaryPlannedStart(r.taskParent(n)),n.get(t)&&a&&function(e,t){for(var n=r.taskAllChildren(e),a=0,i=n.length;a<i;a++)n[a]._offsetPlanned(t)}(n,n.get(t).getTime()-a.getTime());break;case"plannedEnd":r._resolveSummaryPlannedEnd(r.taskParent(n));break;case"percentComplete":r._resolveSummaryPercentComplete(r.taskParent(n));break;case"orderId":r._reorderSiblings(n,a)}};for(var d in n.parentId!==t&&((a=e.get("parentId"))!==n.parentId&&(e.set("parentId",n.parentId),r._childRemoved(a,e.get("orderId")),e.set("orderId",r.taskSiblings(e).length-1),r._resolveSummaryFields(r.taskParent(e))),delete n.parentId),e.bind("change",i),e.bind("equalSet",i),n)a=e.get(d),"plannedStart"===d||"plannedEnd"===d?a===t&&null===n[d]||e.set(d,n[d]):("start"===d||"end"===d||e.get(d)!==n[d])&&e.set(d,n[d]);e.unbind("change",i),e.unbind("equalSet",i)},_childRemoved:function(e,t){for(var n=null===e?null:this.get(e),a=this.taskChildren(n),r=t,i=a.length;r<i;r++)a[r].set("orderId",r);this._resolveSummaryFields(n)},_resolveSummaryFields:function(e){e&&(this._updateSummary(e),this.taskChildren(e).length&&(this._resolveSummaryStart(e),this._resolveSummaryEnd(e),this._resolveSummaryPlannedStart(e),this._resolveSummaryPlannedEnd(e),this._resolveSummaryPercentComplete(e)))},_resolveSummaryStart:function(e){var t=this;this._updateSummaryRecursive(e,"start",(function(e){for(var n,a=t.taskChildren(e),r=a[0].start.getTime(),i=1,d=a.length;i<d;i++)(n=a[i].start.getTime())<r&&(r=n);return new Date(r)}))},_resolveSummaryEnd:function(e){var t=this;this._updateSummaryRecursive(e,"end",(function(e){for(var n,a=t.taskChildren(e),r=a[0].end.getTime(),i=1,d=a.length;i<d;i++)(n=a[i].end.getTime())>r&&(r=n);return new Date(r)}))},_resolveSummaryPlannedStart:function(e){var t=this;this._updateSummaryRecursive(e,"plannedStart",(function(e){for(var n,a=t.taskChildren(e),r=null,i=0,d=a.length;i<d;i++)a[i].plannedStart&&(n=a[i].plannedStart.getTime(),(!r||n<r)&&(r=n));return r?new Date(r):null}))},_resolveSummaryPlannedEnd:function(e){var t=this;this._updateSummaryRecursive(e,"plannedEnd",(function(e){for(var n,a=t.taskChildren(e),r=null,i=0,d=a.length;i<d;i++)a[i].plannedEnd&&(n=a[i].plannedEnd.getTime(),(!r||n>r)&&(r=n));return r?new Date(r):null}))},_resolveSummaryPercentComplete:function(e){var t=this;this._updateSummaryRecursive(e,"percentComplete",(function(e){var n=t.taskChildren(e);return new d(n).aggregate([{field:"percentComplete",aggregate:"average"}]).percentComplete.average}))},_reorderSiblings:function(e,t){var n=e.get("orderId"),a=n>t,r=a?t:n,i=a?n:t,d=a?r:r+1,s=this.taskSiblings(e);if(s.length){i=Math.min(i,s.length-1);for(var l=r;l<=i;l++)s[l]!==e&&(s[l].set("orderId",d),d+=1)}},_toGanttTask:function(e){if(!(e instanceof m)){var t=e;(e=s.fn._createNewModel.call(this)).accept(t)}return e},_updateSummary:function(e){if(null!==e){var t=this.taskChildren(e).length;e.set("summary",t>0)}},_updateSummaryRecursive:function(e,t,n){if(e){var a=n(e);e.set(t,a);var r=this.taskParent(e);r&&this._updateSummaryRecursive(r,t,n)}}});f.create=o(f,"GanttDataSource"),a(!0,kendo.data,{GanttDataSource:f,GanttTask:m,GanttDependencyDataSource:p,GanttDependency:c})}(window.kendo.jQuery);var kendo$1=kendo;export{kendo$1 as default};
//# sourceMappingURL=kendo.gantt.data.js.map
