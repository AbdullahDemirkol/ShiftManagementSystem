/**
 * Kendo UI v2023.2.718 (http://www.telerik.com/kendo-ui)
 * Copyright 2023 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import"./kendo.popup.js";import"./kendo.filtermenu.js";import"./kendo.menu.js";import"./kendo.expansionpanel.js";import"./kendo.html.button.js";import"./kendo.icons.js";var __meta__={id:"columnmenu",name:"Column Menu",category:"framework",depends:["popup","filtermenu","menu","expansionpanel","html.button","icons"],advanced:!0};!function(e,n){var s=window.kendo,t=s.htmlEncode,i=s.ui,l=e.extend,o=e.grep,a=(t=s.htmlEncode,e.map),r=e.inArray,u=s.data.Comparer,c="k-selected",d="asc",m="desc",p="change",k="init",f="open",h="select",g="stick",b="unstick",v="kendoPopup",C="kendoMenu",_="kendoExpansionPanel",$=".kendoColumnMenu",w=i.Widget;function x(e){return s.trim(e).replace(/&nbsp;/gi,"")}function M(e){return this.columns.indexOf(e.title)>=0||this.columns.indexOf(e.field)>=0}function y(e){for(var n=[],s=0;s<e.length;s++)e[s].columns?n=n.concat(y(e[s].columns)):n.push(e[s]);return n}var S=w.extend({init:function(n,t){var i,l=this;(t=t||{}).componentType=t.componentType||"classic",w.fn.init.call(l,n,t),n=l.element,t=l.options,l.owner=t.owner,l.dataSource=t.dataSource,l.field=n.attr(s.attr("field")),l.title=n.attr(s.attr("title")),(i=e(n.closest(".k-table-th"))).length?l.appendTo=i.find(t.appendTo):l.appendTo=e(t.appendTo),l.link=l._createLink(),l.wrapper=e('<div class="k-column-menu"/>'),l._refreshHandler=l.refresh.bind(l),l.dataSource.bind(p,l._refreshHandler)},_init:function(){var e=this;e.pane=e.options.pane,e.pane&&(e._isMobile=!0),e._isMobile?e._createMobileMenu():e._createMenu(),e.owner._muteAngularRebind((function(){e._angularItems("compile")})),e._sort(),e._columns(),e._filter(),e._lockColumns(),e._reorderColumns(),e._stickyColumns(),e._groupColumn(),e.trigger(k,{field:e.field,container:e.wrapper})},events:[k,f,"sort","filtering",g,b],options:{name:"ColumnMenu",messages:{sortAscending:"Sort Ascending",sortDescending:"Sort Descending",filter:"Filter",column:"Column",columns:"Columns",columnVisibility:"Column Visibility",clear:"Clear",cancel:"Cancel",done:"Done",settings:"Edit Column Settings",lock:"Lock Column",unlock:"Unlock Column",stick:"Stick Column",unstick:"Unstick Column",setColumnPosition:"Set Column Position",apply:"Apply",reset:"Reset",buttonTitle:"{0} edit column settings",movePrev:"Move previous",moveNext:"Move next",groupColumn:"Group column",ungroupColumn:"Ungroup column"},filter:"",columns:!0,sortable:!0,filterable:!0,animations:{left:"slide"},encodeTitles:!1,componentType:"classic",appendTo:null},_createMenu:function(){var e,n,t=this,i=t.options,l=t._ownerColumns();t._hasGroups()&&(l=t._groupColumns(l),(e=t._flattenMenuCols(l)).length!==t.owner.columns.length&&t._syncMenuCols(e,t.owner.columns)),n=t._isModernComponentType()?s.template(H):s.template(D),t.wrapper.html(n({uid:s.guid(),ns:s.ns,messages:i.messages,sortable:i.sortable,filterable:i.filterable,columns:l,showColumns:i.columns,hasLockableColumns:i.hasLockableColumns,hasStickableColumns:i.hasStickableColumns,encodeTitles:i.encodeTitles,omitWrapAttribute:s.attr("omit-wrap"),reorderable:i.reorderable,groupable:i.groupable})),t.popup=t.wrapper[v]({anchor:t.link,copyAnchorStyles:!1,open:t._open.bind(t),activate:t._activate.bind(t),deactivate:t._deactivate.bind(t),close:function(e){t.menu&&(t.menu._closing=e.sender.element),t.options.closeCallback&&t.options.closeCallback(t.element)}}).data(v),t._isModernComponentType()?(t.popup.element.addClass("k-grid-columnmenu-popup"),t._createExpanders()):t.menu=t.wrapper.children()[C]({orientation:"vertical",closeOnClick:!1,open:function(){t._updateMenuItems()}}).data(C)},_createLink:function(){var e=this,n=e.element,i=e.appendTo.length?n.find(e.appendTo):n,l=n.find(".k-grid-column-menu"),o=t(s.format(e.options.messages.buttonTitle,e.title||e.field));return l[0]||(n.addClass("k-filterable"),l=i.append('<a class="k-grid-column-menu k-grid-header-menu" href="#" aria-hidden="true" title="'+o+'">'+s.ui.icon("more-vertical")+"</a>").find(".k-grid-column-menu")),l.attr("tabindex",-1).on("click"+$,e._click.bind(e)),l},_createExpanders:function(){var n=this,i=n.options,l={expanded:!1,headerClass:"k-columnmenu-item",useBareTemplate:!0};n.wrapper.find(".k-columns-item")[_](e.extend(!0,{},l,{title:s.ui.icon("columns")+"<span>"+t(i.messages.columns)+"</span>"})),n.wrapper.find(".k-column-menu-filter")[_](e.extend(!0,{},l,{title:s.ui.icon("filter")+"<span>"+t(i.messages.filter)+"</span>"})),n.wrapper.find(".k-column-menu-position")[_](e.extend(!0,{},l,{title:s.ui.icon("set-column-position")+"<span>"+t(i.messages.setColumnPosition)+"</span>"}))},_syncMenuCols:function(e,n){for(var s,t=n.length,i=e.map((function(e){return e.field})),l=0;l<t;l++)s=n[l],i.indexOf(s.field)<0&&(s.menu=!1)},_flattenMenuCols:function(e){for(var n=[],s=e.length,t=0;t<s;t++)e[t].columns?n=n.concat(this._flattenMenuCols(e[t].columns)):e[t].groupHeader||n.push(e[t]);return n},_groupColumns:function(e,n){var s,t,i,l,o,a=[],r=this.options.columns.groups,u=r.length;for(s=0;s<u;s++)t=r[s],i=M.bind(t),l={title:t.title,groupHeader:!0},o=e.filter(i),a.push(l),n?l.columns=o:a=a.concat(o);return a},_hasGroups:function(){return this.options.columns&&this.options.columns.groups&&this.options.columns.groups.length},_isModernComponentType:function(){return"modern"===this.options.componentType&&!this._isMobile},_deactivate:function(){this.menu&&(this.menu._closing=!1)},_createMobileMenu:function(){var e,n,t=this,i=t.options,l=t._ownerColumns();t._hasGroups()&&(e=t._groupColumns(l,!0),(n=t._flattenMenuCols(e)).length!==t.owner.columns.length&&t._syncMenuCols(n,t.owner.columns));var o=s.template(E)({ns:s.ns,field:t.field,title:t.title||t.field,messages:i.messages,sortable:i.sortable,filterable:i.filterable,columns:l,showColumns:i.columns,hasLockableColumns:i.hasLockableColumns,hasStickableColumns:i.hasStickableColumns,hasGroups:t._hasGroups(),groups:e,reorderable:i.reorderable,groupable:i.groupable});t.view=t.pane.append(o),t.view.state={columns:{}},t.wrapper=t.view.element.find(".k-column-menu"),t.menu=new O(t.wrapper.children(),{pane:t.pane,columnMenu:t}),t.menu.element.on("transitionend"+$,(function(e){e.stopPropagation()}));var a=t.view.wrapper&&t.view.wrapper[0]?t.view.wrapper:t.view.element;a.on("click",".k-header-done",(function(e){e.preventDefault(),t.menu._applyChanges(),t.menu._cancelChanges(!1),t.close()})),a.on("click",".k-header-cancel",(function(e){e.preventDefault(),t.menu._cancelChanges(!0),t.close()})),t.view.bind("showStart",(function(){var e=t.view||{columns:{}};t.options.hasLockableColumns&&t._updateLockedColumns(),t.options.hasStickableColumns&&t._updateStickyColumns(),t.options.reorderable&&t._updateReorderColumns(),t.options.groupable&&t._updateGroupColumns(),e.element.find(".k-sort-asc.k-selected").length?e.state.initialSort="asc":e.element.find(".k-sort-desc.k-selected").length&&(e.state.initialSort="desc")}))},_angularItems:function(n){var t=this;t.angular(n,(function(){return{elements:t.wrapper.find(".k-columns-item input["+s.attr("field")+"]").map((function(){return e(this).closest("li")})),data:a(t._ownerColumns(),(function(e){return{column:e._originalObject}}))}}))},destroy:function(){var e=this;e._angularItems("cleanup"),w.fn.destroy.call(e),e.filterMenu&&e.filterMenu.destroy(),e._refreshHandler&&e.dataSource.unbind(p,e._refreshHandler),e.options.columns&&e.owner&&(e._updateColumnsMenuHandler&&(e.owner.unbind("columnShow",e._updateColumnsMenuHandler),e.owner.unbind("columnHide",e._updateColumnsMenuHandler)),e._updateColumnsLockedStateHandler&&(e.owner.unbind("columnLock",e._updateColumnsLockedStateHandler),e.owner.unbind("columnUnlock",e._updateColumnsLockedStateHandler))),e.menu&&(e.menu.element.off($),e.menu.destroy()),e.wrapper.off($),e.popup&&e.popup.destroy(),e.view&&e.view.purge(),e.link.off($),e.owner=null,e.wrapper=null,e.element=null},close:function(){this.menu&&this.menu.close(),this.popup&&(this.popup.close(),this.popup.element.off("keydown"+$))},_click:function(e){e.preventDefault(),e.stopPropagation();var n=this.options;n.filter&&this.element.is(!n.filter)||(this.popup||this.pane?this._updateMenuItems():this._init(),this._isMobile?this.pane.navigate(this.view,this.options.animations.left):this.popup.toggle())},_updateMenuItems:function(){var e=this;e.options.columns&&(e._setMenuItemsVisibility(),e.options.columns.sort||e.options.columns.groups?e._updateDataIndexes():e._reorderMenuItems())},_setMenuItemsVisibility:function(){this._eachRenderedMenuItem((function(e,n,s){!1===n.matchesMedia?s.hide():s.show()}))},_reorderMenuItems:function(){this._eachRenderedMenuItem((function(e,n,s,t){s[0]&&s.index()!==e&&function(e,n,s){e>0?n.insertAfter(s.children().eq(e-1)):s.prepend(n)}(e,s,t)})),this._updateDataIndexes()},_updateDataIndexes:function(){var n=this,t=n._isMobile&&n.view?e(n.view.element).find(".k-columns-item").children("ul"):e(n.wrapper).find(".k-menu-group").first(),i=n._ownerColumns(!0).map((function(e){return e.title||e.field}));t.find("span."+(this._isMobile?"k-listgroup-form-field-wrapper":"k-menu-link")+" input").each((function(t){var l,o;n.options.columns.sort?(l=n._ownerColumns(),o=i.indexOf(l[t].title),e(this).attr(s.attr("index"),o)):e(this).attr(s.attr("index"),t)}))},_eachRenderedMenuItem:function(n){for(var t,i,l,a,r,u,c=this,d=o(y(c.owner.columns),(function(e){var n=!0,s=x(e.title||"");return!1!==e.menu&&(e.field||s.length)||(n=!1),n})).map((function(e){return{field:e.field,title:e.title,matchesMedia:e.matchesMedia}})),m=c._getRenderedList(),p=c._getRenderedListElements(m),k=function(e,n){for(var t,i,l,o,a,r=s.attr("index"),u=s.attr("field"),c={},d=0;d<e.length;d++)i=n.eq(d),l=parseInt(i.attr(r),10),o=i.attr(u),a=i.attr("title"),c[t=o||a]?c[t].push(l):c[t]=[l];return c}(p,m.find("input[type=checkbox]")),f=function(e){for(var n,s={},t=0;t<e.length;t++)s[n=JSON.stringify(e[t])]?s[n].push(t):s[n]=[t];return s}(d),h=0;h<d.length;h++){i=(l=d[h]).field?l.field:l.title,t=e.inArray(h,f[JSON.stringify(l)]),a=e();for(var g=0;g<k[i].length;g++)a=a.add(p.eq(k[i][g]));n(h,l,a.find((r="field",u=i,"["+s.attr(r)+"='"+(u||"").replace(/'/g,'"')+"']")).closest(c._isModernComponentType()?"label":"li").eq(t),m)}},_getRenderedList:function(){var n=this;return n._isModernComponentType()?e(n.wrapper).find(".k-columns-item"):n._isMobile&&n.view?e(n.view.element).find(".k-columns-item").children("ul"):e(n.wrapper).find(".k-menu-group").first()},_getRenderedListElements:function(e){return this._isModernComponentType()?e.find("label"):e.find("span."+(this._isMobile?"k-listgroup-form-field-wrapper":"k-menu-link"))},_open:function(){var n,t,i=this;e(".k-column-menu").not(i.wrapper).each((function(){e(this).data(v).close()})),i.popup.element.off("keydown"+$).on("keydown"+$,(function(l){var o=e(l.target);if(i._isModernComponentType()&&l.keyCode===s.keys.ENTER&&o.click(),l.keyCode==s.keys.ESC){if(n=s.widgetInstance(o.find("select")),o.hasClass("k-picker")&&n&&n.popup.visible())return void l.stopPropagation();(t=o.closest(".k-popup").closest(".k-menu-item")).length>0&&(t.addClass("k-focus"),i.menu?i.menu.element.trigger("focus"):i.popup.element.find("[tabindex=0]").eq(0).trigger("focus")),o.closest(".k-popup").getKendoPopup().close()}})),i.options.hasLockableColumns&&i._updateLockedColumns(),i.options.hasStickableColumns&&i._updateStickyColumns(),i.options.reorderable&&i._updateReorderColumns(),i.options.groupable&&i._updateGroupColumns()},_activate:function(){this.menu?this.menu.element.trigger("focus"):this.popup.element.find("[tabindex=0]").eq(0).trigger("focus"),this.trigger(f,{field:this.field,container:this.wrapper})},_ownerColumns:function(e){var n,s=y(this.owner.columns),t=o(s,(function(e){var n=!0,s=x(e.title||"");return!1!==e.menu&&(e.field||s.length)||(n=!1),n})),i=this.options.columns.sort;return n=a(t,(function(e){return{originalField:e.field,field:e.field||e.title,title:e.title||e.field,hidden:e.hidden,matchesMedia:e.matchesMedia,index:r(e,s),locked:!!e.locked,_originalObject:e,uid:e.headerAttributes.id}})),i&&!e&&n.sort(u.create({field:"title",dir:i})),n},_sort:function(){var e=this;e.options.sortable&&(e.refresh(),e._isModernComponentType()?e.wrapper.on("click"+$,".k-sort-asc, .k-sort-desc",e._sortHandler.bind(e)):e.menu.bind(h,e._sortHandler.bind(e)))},_sortHandler:function(n){var s,t=this,i=n.item?e(n.item):e(n.target);i.hasClass("k-sort-asc")?s=d:i.hasClass("k-sort-desc")&&(s=m),s&&(t._getSortItemsContainer(i).find(".k-sort-"+(s==d?m:d)).removeClass(c),t._sortDataSource(i,s),t._isMobile||t.close())},_getSortItemsContainer:function(e){return this._isModernComponentType()?e.parents(".k-columnmenu-item-wrapper").first():e.parent()},_sortDataSource:function(e,s){var t,i,l=this,o=l.options.sortable,a=null===o.compare?n:o.compare,r=l.dataSource,u=r.sort()||[],d=e.hasClass(c)&&o&&!1!==o.allowUnsort;if(s=d?n:s,!l.trigger("sort",{sort:{field:l.field,dir:s,compare:a}})){if(d?e.removeClass(c):e.addClass(c),"multiple"===o.mode){for(t=0,i=u.length;t<i;t++)if(u[t].field===l.field){u.splice(t,1);break}u.push({field:l.field,dir:s,compare:a})}else u=[{field:l.field,dir:s,compare:a}];r.sort(u)}},_columns:function(){var n=this;n.options.columns&&(n._updateColumnsMenu(),n._updateColumnsMenuHandler=n._updateColumnsMenu.bind(n),n.owner.bind(["columnHide","columnShow"],n._updateColumnsMenuHandler),n._updateColumnsLockedStateHandler=n._updateColumnsLockedState.bind(n),n.owner.bind(["columnUnlock","columnLock"],n._updateColumnsLockedStateHandler),n._isModernComponentType()?(n.wrapper.on("click"+$,".k-columns-item .k-button:not(.k-button-solid-primary)",(function(){n._updateColumnsMenu()})),n.wrapper.on("click"+$,".k-columns-item .k-button.k-button-solid-primary",n._applyColumnVisibility.bind(n)),n.wrapper.on("click"+$,".k-columns-item .k-checkbox",(function(){n._updateColumnsMenu(!0)}))):n.menu.bind(h,(function(t){var i,l,a,r=e(t.item),u=s.attr("uid"),c=o(y(n.owner.columns),(function(e){var n=!0,s=x(e.title||"");return!1!==e.menu&&(e.field||s.length)||(n=!1),n}));n._isMobile&&t.preventDefault(),r.parent().closest("li.k-columns-item")[0]&&((i=r.find(":checkbox")).attr("disabled")||(a=c.map((function(e){return e.headerAttributes.id})).indexOf(i.attr(u)),!0===(l=c[a]).hidden?n.owner.showColumn(l):n.owner.hideColumn(l)))})))},_applyColumnVisibility:function(){var n,t,i,l,a=this,r=s.attr("field"),u=s.attr("uid"),c=a.wrapper.find(".k-columns-item input["+r+"]"),d=o(y(this.owner.columns),(function(e){var n=!0,s=x(e.title||"");return!1!==e.menu&&(e.field||s.length)||(n=!1),n})),m=c.length;for(a.owner.unbind("columnShow",a._updateColumnsMenuHandler),a.owner.unbind("columnHide",a._updateColumnsMenuHandler),n=0;n<m;n++)i=e(c[n]),t=d.map((function(e){return e.headerAttributes.id})).indexOf(i.attr(u)),l=d[t],i.is(":checked")&&l.hidden?a.owner.showColumn(l):i.is(":not(:checked)")&&!l.hidden&&a.owner.hideColumn(l);a.popup.close(),a.owner.bind(["columnHide","columnShow"],a._updateColumnsMenuHandler)},_updateColumnsMenu:function(e){var n,t,i,l,a,r=this,u=s.attr("field"),c=s.attr("locked"),d=s.attr("uid"),m={},p=0,k=0;e=!0===e;var f=o(y(this.owner.columns),(function(e,n){var s=!0,t=x(e.title||"");return!1!==e.menu&&(e.field||t.length)||(s=!1),s&&(m[n]=p,p++),s})),h=o(this._ownerColumns(),(function(n){return e?r.wrapper.find("[role='menuitemcheckbox'] ["+d+"='"+n.uid+"']").prop("checked"):!n.hidden&&!1!==n.matchesMedia})),g=o(h,(function(e){return e.originalField})),b=o(g,(function(e){return!0===e.locked})).length,v=o(g,(function(e){return!0!==e.locked})).length,C=o(this.owner.columns,(function(e){return!1===e.menu})),_=o(C,(function(e){return e.hidden}));this.wrapper.find("[role='menuitemcheckbox']").attr("aria-checked",!1);var $,w=this.wrapper.find(".k-columns-item input["+u+"]").prop("disabled",!1);for(e||w.prop("checked",!1),n=0,t=w.length;n<t;n++)a="true"===(i=w.eq(n)).attr(c),!1,$=i.data("kendoSwitch"),k=f.map((function(e){return e.headerAttributes.id})).indexOf(i.attr(d)),l=e?i.prop("checked"):!f[k].hidden&&!1!==f[k].matchesMedia,i.prop("checked",l),$&&($.enable(!0),$.check(l)),i.closest("[role='menuitemcheckbox']").attr("aria-checked",l),l&&(1==b&&a&&(i.prop("disabled",!0),$&&$.enable(!1)),0!==C.length&&C.length!==_.length||1!=v||a||(i.prop("disabled",!0),$&&$.enable(!1)))},_updateColumnsLockedState:function(){var e,n,t,i,l=s.attr("field"),o=s.attr("locked"),a=function(e,n){var s,t,i,l={};for(s=0,t=e.length;s<t;s++)l[(i=e[s])[n]]=i;return l}(this._ownerColumns(),"field"),r=this.wrapper.find(".k-columns-item input[type=checkbox]");for(e=0,n=r.length;e<n;e++)(i=a[(t=r.eq(e)).attr(l)])&&t.attr(o,i.locked);this._updateColumnsMenu()},_filter:function(){var n=this,s="kendoFilterMenu",t=n.options;!1!==t.filterable&&(t.filterable.multi&&(s="kendoFilterMultiCheck",t.filterable.dataSource&&(t.filterable.checkSource=t.filterable.dataSource,delete t.filterable.dataSource)),n.filterMenu=n.wrapper.find(".k-filterable")[s](l(!0,{},{appendToElement:!0,dataSource:t.dataSource,values:t.values,field:n.field,title:n.title,change:function(e){n.trigger("filtering",{filter:e.filter,field:e.field})&&e.preventDefault()},componentType:n.options.componentType,cycleForm:!n._isModernComponentType()},t.filterable)).data(s),n._isMobile&&n.menu.bind(h,(function(s){e(s.item).hasClass("k-filter-item")&&n.pane.navigate(n.filterMenu.view,n.options.animations.left)})))},_lockColumns:function(){var e=this;e._isModernComponentType()?e.wrapper.on("click"+$,".k-lock, .k-unlock",e._lockableHandler.bind(e)):e.menu.bind(h,e._lockableHandler.bind(e))},_lockableHandler:function(n){var s=this,t=n.item?e(n.item):e(n.target);t.hasClass("k-lock")?(s.owner.lockColumn(s.field),s._isMobile||s.close()):t.hasClass("k-unlock")&&(s.owner.unlockColumn(s.field),s._isMobile||s.close())},_reorderColumns:function(){var e=this;e._isModernComponentType()?e.wrapper.on("click"+$,".k-move-prev, .k-move-next",e._reorderHandler.bind(e)):e.menu.bind(h,e._reorderHandler.bind(e))},_reorderHandler:function(n){var s=this,t=n.item?e(n.item):e(n.target);t.hasClass("k-move-prev")?(s.owner._moveColumn(s.element,!0),s._isMobile||s.close()):t.hasClass("k-move-next")&&(s.owner._moveColumn(s.element,!1),s._isMobile||s.close())},_groupColumn:function(){var e=this;e._isModernComponentType()?e.wrapper.on("click"+$,".k-group, .k-ungroup",e._groupHandler.bind(e)):e.menu.bind(h,e._groupHandler.bind(e))},_groupHandler:function(n){var s=this,t=n.item?e(n.item):e(n.target);(t.hasClass("k-group")||t.hasClass("k-ungroup"))&&(s.owner._handleSpaceKey(s.element,!0),s._isMobile||s.close())},_stickyColumns:function(){var e=this;e._isModernComponentType()?e.wrapper.on("click"+$,".k-stick, .k-unstick",e._stickableHandler.bind(e)):e.menu.bind(h,e._stickableHandler.bind(e))},_stickableHandler:function(n){var s=this,t=n.item?e(n.item):e(n.target),i=s.field,l=s.owner.columns,a=o(l,(function(e){return e.field==i||e.title==i}))[0];t.hasClass("k-stick")?(s.owner.stickColumn(s.field),s.trigger(g,{column:a}),s._isMobile||s.close()):t.hasClass("k-unstick")&&(s.owner.unstickColumn(s.field),s.trigger(b,{column:a}),s._isMobile||s.close())},_updateLockedColumns:function(){var e=this.field,n=this.owner.columns,s=o(n,(function(n){return n.field==e||n.title==e}))[0];if(s){var t=!0===s.locked,i=o(n,(function(e){return!e.hidden&&(e.locked&&t||!e.locked&&!t)})).length,l=!1===s.lockable,a=this.wrapper.find(".k-lock").removeClass("k-disabled").removeAttr("aria-disabled"),r=this.wrapper.find(".k-unlock").removeClass("k-disabled").removeAttr("aria-disabled");(t||1==i||l)&&a.addClass("k-disabled").attr("aria-disabled","true"),t&&1!=i&&!l||r.addClass("k-disabled").attr("aria-disabled","true"),this._updateColumnsLockedState()}},_updateStickyColumns:function(){var e=this.field,n=this.owner.columns,s=o(n,(function(n){return n.field==e||n.title==e}))[0];if(s){var t=!0===s.sticky,i=!0===s.stickable,l=!0===s.locked,a=o(n,(function(e){return!e.hidden&&(e.locked&&l||!e.locked&&!l)})).length,r=this.wrapper.find(".k-stick").removeClass("k-disabled").removeAttr("aria-disabled"),u=this.wrapper.find(".k-unstick").removeClass("k-disabled").removeAttr("aria-disabled");(t||!i||l&&1===a)&&r.addClass("k-disabled").attr("aria-disabled","true"),t&&i||u.addClass("k-disabled").attr("aria-disabled","true")}},_updateReorderColumns:function(){var e=this.element,n=e.index(),s=e.parent().children().length,t=this.wrapper.find(".k-move-prev").removeClass("k-disabled").removeAttr("aria-disabled"),i=this.wrapper.find(".k-move-next").removeClass("k-disabled").removeAttr("aria-disabled");0===this.element.index()&&t.addClass("k-disabled").attr("aria-disabled","true"),n+1===s&&i.addClass("k-disabled").attr("aria-disabled","true")},_updateGroupColumns:function(){var e=this.element,n=this.wrapper,s=n.find(".k-group"),t=n.find(".k-ungroup");this.owner.groupable._canDrag(e)?(s.removeClass("k-hidden"),t.addClass("k-hidden")):(s.addClass("k-hidden"),t.removeClass("k-hidden"))},refresh:function(){var e,n,s,t=this,i=t.options.dataSource.sort()||[],l=t.field;for(t.wrapper.find(".k-sort-asc, .k-sort-desc").removeClass(c),n=0,s=i.length;n<s;n++)l==(e=i[n]).field&&t.wrapper.find(".k-sort-"+e.dir).addClass(c);t.link[t._filterExist(t.dataSource.filter())?"addClass":"removeClass"]("k-active")},_filterExist:function(e){var n,s=!1;if(e){for(var t=0,i=(e=e.filters).length;t<i;t++)(n=e[t]).field==this.field?s=!0:n.filters&&(s=s||this._filterExist(n));return s}}});const T=({columns:e,messages:n,encodeTitles:i,ns:l})=>`<div class="k-columnmenu-item-wrapper"><div><div class="k-columnmenu-item-content k-columns-item"><div class="k-column-list-wrapper"><div class="k-column-list" role="menu">${function(e,n,s){return e.map((e=>e.groupHeader?`<span class="k-column-menu-group-header"><span class="k-column-menu-group-header-text">${e.title}</span></span>`:`<label class="k-column-list-item" role="menuitemcheckbox" aria-checked="false" ${!1===e.matchesMedia?"style='display:none;'":""}><input class="k-checkbox k-checkbox-md k-rounded-md" type="checkbox" title="${n?t(e.title):e.title}" data-${s}field="${e.field.replace(/\"/g,"&#34;")}" data-${s}index="${e.index} data-${s}locked="${e.locked}" data-${s}uid="${e.uid}" /><span class="k-checkbox-label">${n?t(e.title):e.title}</span></label>`)).join("")}(e,i,l)}</div></div><div class="k-actions-stretched k-columnmenu-actions">`+s.html.renderButton(`<button>${t(n.apply)}</button>`,{themeColor:"primary",icon:"check"})+s.html.renderButton(`<button>${t(n.reset)}</button>`,{icon:"undo"})+"</div></div></div></div>",L=({hasLockableColumns:e,hasStickableColumns:n,messages:i,reorderable:l})=>`<div class="k-columnmenu-item-wrapper"><div class="k-column-menu-position">${e?(({messages:e})=>`<div class="k-columnmenu-item k-lock" tabindex="0">${s.ui.icon("lock")}${t(e.lock)}</div><div class="k-columnmenu-item k-unlock" tabindex="0">${s.ui.icon("unlock")}${t(e.unlock)}</div>`)({messages:i}):""}${n?(({messages:e})=>`<div class="k-columnmenu-item k-stick" tabindex="0">${s.ui.icon("stick")}${t(e.stick)}</div><div class="k-columnmenu-item k-unstick" tabindex="0">${s.ui.icon("unstick")}${t(e.unstick)}</div>`)({messages:i}):""}${l?(({messages:e})=>`<div class="k-columnmenu-item k-move-prev" tabindex="0">${s.ui.icon("caret-alt-left")}${t(e.movePrev)}</div><div class="k-columnmenu-item k-move-next" tabindex="0">${s.ui.icon("caret-alt-right")}${t(e.moveNext)}</div>`)({messages:i}):""}</div></div>`;var H=({sortable:e,filterable:n,showColumns:i,messages:l,columns:o,hasLockableColumns:a,hasStickableColumns:r,encodeTitles:u,ns:c,reorderable:d,groupable:m})=>`${e?(({messages:e})=>`<div class="k-columnmenu-item-wrapper"><div><div class="k-columnmenu-item k-sort-asc" tabindex="0">${s.ui.icon("sort-asc-small")}${t(e.sortAscending)}</div></div><div><div class="k-columnmenu-item k-sort-desc" tabindex="0">${s.ui.icon("sort-desc-small")}${t(e.sortDescending)}</div></div></div>`)({messages:l}):""}${i?T({columns:o,messages:l,encodeTitles:u,ns:c}):""}${n?'<div class="k-columnmenu-item-wrapper"><div class="k-columnmenu-item-content k-column-menu-filter"><div class="k-filterable"></div></div></div>':""}${m?(({messages:e})=>`<div class="k-columnmenu-item-wrapper"><div><div class="k-columnmenu-item k-group" tabindex="0">${s.ui.icon("group")}${t(e.groupColumn)}</div></div></div>\n<div class="k-columnmenu-item-wrapper"><div><div class="k-columnmenu-item k-ungroup" tabindex="0">${s.ui.icon("ungroup")}${t(e.ungroupColumn)}</div></div></div>`)({messages:l}):""}${a||r||d?L({hasLockableColumns:a,hasStickableColumns:r,messages:l,reorderable:d}):""}`;const A=({columns:e,messages:n,encodeTitles:i,ns:l,omitWrapAttribute:o,filterable:a,hasLockableColumns:r,hasStickableColumns:u})=>`<li class="k-item k-menu-item k-columns-item" aria-haspopup="true"><span class="k-link k-menu-link">${s.ui.icon("columns")}<span class="k-menu-link-text">${t(n.columns)}</span></span><ul>${function(e,n,s,i){return e.map((e=>e.groupHeader?`<li class="k-column-menu-group-header" ${i}="true" ><span class="k-column-menu-group-header-text">${e.title}</span></li>`:`<li role="menuitemcheckbox" aria-checked="false" ${!1===e.matchesMedia?"style='display:none;'":""}><input type="checkbox" class="k-checkbox k-checkbox-md k-rounded-md" title="${n?t(e.title):e.title}" data-${s}field="${e.field.replace(/\"/g,"&#34;")}" data-${s}index="${e.index}" data-${s}locked="${e.locked}" data-${s}uid="${e.uid}"/>${n?t(e.title):e.title}</li>`)).join("")}(e,i,l,o)}</ul></li>${a||r||u?'<li class="k-separator k-menu-separator" role="presentation"></li>':""}`,I=({messages:e,hasLockableColumns:n,hasStickableColumns:i,reorderable:l})=>`<li class="k-item k-menu-item k-position-item" aria-haspopup="true"><span class="k-link k-menu-link">${s.ui.icon("set-column-position")}<span class="k-menu-link-text">${t(e.setColumnPosition)}</span></span><ul>${n?(({messages:e,hasStickableColumns:n})=>`<li class="k-item k-menu-item k-lock"><span class="k-link k-menu-link">${s.ui.icon("lock")}<span class="k-menu-link-text">${t(e.lock)}</span></span></li><li class="k-item k-menu-item k-unlock"><span class="k-link k-menu-link">${s.ui.icon("unlock")}<span class="k-menu-link-text">${t(e.unlock)}</span></span></li>${n?'<li class="k-separator k-menu-separator" role="presentation"></li>':""}`)({messages:e,hasStickableColumns:i}):""}${i?(({messages:e})=>`<li class="k-item k-menu-item k-stick"><span class="k-link k-menu-link">${s.ui.icon("stick")}<span class="k-menu-link-text">${t(e.stick)}</span></span></li><li class="k-item k-menu-item k-unstick"><span class="k-link k-menu-link">${s.ui.icon("unstick")}<span class="k-menu-link-text">${t(e.unstick)}</span></span></li>`)({messages:e}):""}${l?(({messages:e})=>`<li class="k-item k-menu-item k-move-prev"><span class="k-link k-menu-link">${s.ui.icon("caret-alt-left")}<span class="k-menu-link-text">${t(e.movePrev)}</span></span></li><li class="k-item k-menu-item k-move-next"><span class="k-link k-menu-link">${s.ui.icon("caret-alt-right")}<span class="k-menu-link-text">${t(e.moveNext)}</span></span></li>`)({messages:e}):""}</ul></li>`;var D=({uid:e,sortable:n,filterable:i,showColumns:l,messages:o,columns:a,hasLockableColumns:r,hasStickableColumns:u,encodeTitles:c,ns:d,omitWrapAttribute:m,reorderable:p,groupable:k})=>`<ul id="${e}">${n?(({messages:e,showColumns:n,filterable:i})=>`<li class="k-item k-menu-item k-sort-asc"><span class="k-link k-menu-link">${s.ui.icon("sort-asc-small")}<span class="k-menu-link-text">${t(e.sortAscending)}</span></span></li><li class="k-item k-menu-item k-sort-desc"><span class="k-link k-menu-link">${s.ui.icon("sort-desc-small")}<span class="k-menu-link-text">${t(e.sortDescending)}</span></span></li>${n||i?'<li class="k-separator k-menu-separator" role="presentation"></li>':""}`)({messages:o,showColumns:l,filterable:i}):""}${l?A({columns:a,messages:o,encodeTitles:c,ns:d,omitWrapAttribute:m,filterable:i,hasLockableColumns:r,hasStickableColumns:u}):""}${i?(({messages:e,hasLockableColumns:n,hasStickableColumns:i,reorderable:l})=>`<li class="k-item k-menu-item k-filter-item" aria-haspopup="true"><span class="k-link k-menu-link">${s.ui.icon("filter")}<span class="k-menu-link-text">${t(e.filter)}</span></span><ul><li><div class="k-filterable"></div></li></ul></li>${n||i||l?'<li class="k-separator k-menu-separator" role="presentation"></li>':""}`)({messages:o,hasLockableColumns:r,hasStickableColumns:u,reorderable:p}):""}${k?(({messages:e,hasLockStickMove:n})=>`<li class="k-item k-menu-item k-group"><span class="k-link k-menu-link">${s.ui.icon("group")}<span class="k-menu-link-text">${t(e.groupColumn)}</span></span></li><li class="k-item k-menu-item k-ungroup"><span class="k-link k-menu-link">${s.ui.icon("ungroup")}<span class="k-menu-link-text">${t(e.ungroupColumn)}</span></span></li>${n?'<li class="k-separator k-menu-separator" role="presentation"></li>':""}`)({messages:o,hasLockStickMove:r||u||p}):""}${r||u||p?I({messages:o,hasLockableColumns:r,hasStickableColumns:u,reorderable:p}):""}\n</ul>`;const P=({messages:e,hasGroups:n,columns:i,groups:l,ns:o})=>`<li class="k-columns-item"><span class="k-list-title">${e.columnVisibility}</span>${function(e,n,i,l){var o="";if(l)for(var a=0;a<n.length;a++){o+=`<span class="k-list-group-header k-pb-1">${t(n[a].title)}</span><ul class="k-listgroup k-listgroup-flush k-mb-4">`;for(var r=0;r<n[a].columns.length;r++)o+=`<li id="${s.guid()}" class="k-item k-listgroup-item"><span class="k-listgroup-form-row"><span class="k-listgroup-form-field-label k-item-title">${n[a].columns[r].title}</span><span class="k-listgroup-form-field-wrapper"><input type="checkbox" title="${n[a].columns[r].title}" data-${i}field="${n[a].columns[r].field.replace(/\"/g,"&#34;")}" data-${i}index="${n[a].columns[r].index}" data-${i}uid="${n[a].columns[r].uid}" data-${i}locked="${n[a].columns[r].locked}"/></span></span></li>"`;o+="</ul>"}else{for(o+='<ul class="k-listgroup k-listgroup-flush k-mb-4">',r=0;r<e.length;r++)o+=`<li id="${s.guid()}" class="k-item k-listgroup-item"><span class="k-listgroup-form-row"><span class="k-listgroup-form-field-label k-item-title">${e[r].title}</span><span class="k-listgroup-form-field-wrapper"><input type="checkbox" title="${e[r].title}" data-${i}field="${e[r].field.replace(/\"/g,"&#34;")}" data-${i}index="${e[r].index}" data-${i}uid="${e[r].uid}" data-${i}locked="${e[r].locked}"/></span></span></li>`;o+="</ul>"}return o}(i,l,o,n)}</li>`;var E=({messages:e,title:n,sortable:i,filterable:l,showColumns:o,hasLockableColumns:a,hasStickableColumns:r,hasGroups:u,columns:c,groups:d,ns:m,reorderable:p,groupable:k})=>`<div data-${m}role="view" class="k-grid-column-menu"><div data-${m}role="header" class="k-header"><a href="#" class="k-header-cancel k-link" title="${e.cancel}" aria-label="${e.cancel}">${s.ui.icon("chevron-left")}</a>${t(e.settings)}<a href="#" class="k-header-done k-link" title="${e.done}" aria-label="${e.done}">${s.ui.icon("check")}</a></div><div class="k-column-menu"><ul class="k-reset"><li><span class="k-list-title">${t(e.column)}: ${n}</span><ul class="k-listgroup k-listgroup-flush k-mb-4">${i?(({messages:e})=>`<li id="${s.guid()}" class="k-item k-listgroup-item k-sort-asc"><span class="k-link">${s.ui.icon("sort-asc-small")}<span class="k-item-title">${t(e.sortAscending)}</span></span></li><li id="${s.guid()}" class="k-item k-listgroup-item k-sort-desc"><span class="k-link">${s.ui.icon("sort-desc-small")}<span class="k-item-title">${t(e.sortDescending)}</span></span></li>`)({messages:e}):""}${a?(({messages:e})=>`<li id="${s.guid()}" class="k-item k-listgroup-item k-lock"><span class="k-link">${s.ui.icon("lock")}<span class="k-item-title">${t(e.lock)}</span></span></li><li id="${s.guid()}" class="k-item k-listgroup-item k-unlock"><span class="k-link">${s.ui.icon("unlock")}<span class="k-item-title">${t(e.unlock)}</span></span></li>`)({messages:e}):""}${r?(({messages:e})=>`<li id="${s.guid()}" class="k-item k-listgroup-item k-stick"><span class="k-link">${s.ui.icon("stick")}<span class="k-item-title">${t(e.stick)}</span></span></li><li id="${s.guid()}" class="k-item k-listgroup-item k-unstick"><span class="k-link">${s.ui.icon("unstick")}<span class="k-item-title">${t(e.unstick)}</span></span></li>`)({messages:e}):""}${p?(({messages:e})=>`<li id="${s.guid()}" class="k-item k-listgroup-item k-move-prev"><span class="k-link">${s.ui.icon("caret-alt-left")}<span class="k-item-title">${t(e.movePrev)}</span></span></li><li id="${s.guid()}" class="k-item k-listgroup-item k-move-next"><span class="k-link">${s.ui.icon("caret-alt-right")}<span class="k-item-title">${t(e.moveNext)}</span></span></li>`)({messages:e}):""}${l?(({messages:e})=>`<li id="${s.guid()}" class="k-item k-listgroup-item k-filter-item"><span class="k-link k-filterable">${s.ui.icon("filter")}<span class="k-item-title">${t(e.filter)}</span><span class="k-select">${s.ui.icon("chevron-right")}</span></span></li>`)({messages:e}):""}${k?(({messages:e})=>`<li id="${s.guid()}" class="k-item k-listgroup-item k-group"><span class="k-link">${s.ui.icon("group")}<span class="k-item-title">${t(e.groupColumn)}</span></span></li><li id="${s.guid()}" class="k-item k-listgroup-item k-ungroup"><span class="k-link">${s.ui.icon("ungroup")}<span class="k-item-title">${t(e.ungroupColumn)}</span></span></li>`)({messages:e}):""}</ul></li>${o?P({messages:e,hasGroups:u,columns:c,groups:d,ns:m}):""}<li class="k-item k-clear-wrap"><ul class="k-listgroup k-listgroup-flush"><li class="k-listgroup-item"><span class="k-link k-label k-clear" title="${e.clear}" aria-label="${e.clear}">${t(e.clear)}</span></li></ul></li></ul></div></div>`,O=w.extend({init:function(e,n){var s=this;w.fn.init.call(s,e,n),s._createCheckBoxes(),s.element.on("click"+$,"li.k-item:not(.k-separator):not(.k-disabled):not(:has(.k-switch))","_click")},events:[h],_click:function(n){var s=this;if(e(n.target).is("[type=checkbox]")||n.preventDefault(),!e(n.target).hasClass("k-clear"))return e(n.target).hasClass("k-filterable")?(s._cancelChanges(!0),void s.trigger(h,{item:n.currentTarget})):void s._updateSelectedItems(n.currentTarget);s._cancelChanges(!0)},_updateSelectedItems:function(n){var s=this,t=e(n),i=s.options.columnMenu.view.state||{columns:{}},l=t.prop("id");if(!t.hasClass("k-filter-item")){var o,a,r;if(i[l]?i[l]=!1:i[l]=!0,t.hasClass("k-sort-asc")||t.hasClass("k-sort-desc"))t.hasClass("k-sort-asc")?(o="asc",a=s.element.find(".k-sort-desc")):(o="desc",a=s.element.find(".k-sort-asc")),r=a.prop("id"),o!==i.initialSort||t.hasClass("k-selected")||(i[l]=!1),i[r]&&(i[r]=!1),a.removeClass(c);t.hasClass(c)?t.removeClass(c):t.addClass(c)}},_cancelChanges:function(e){var n=this,s=n.options.columnMenu,t=s.view,i=(t.state||{columns:{}}).columns;if(n.element.find("."+c).removeClass(c),s.refresh(),e){var l=[];for(var o in i)if(i.hasOwnProperty(o)&&!0===i[o]){var a=t.element.find("#"+o);l.push(a[0])}for(var r=l.length-1;r>=0;r--)n.trigger(h,{item:l[r]});s.options.hasLockableColumns&&s._updateLockedColumns(),s.options.hasStickableColumns&&s._updateStickyColumns(),s.options.reorderable&&s._updateReorderColumns(),s.options.groupable&&s._updateGroupColumns()}n.options.columnMenu.view.state={columns:{}}},_applyChanges:function(){var e=this.options.columnMenu.view,n=e.state||{columns:{}};for(var s in n)if(n.hasOwnProperty(s)&&"initialSort"!==s&&"columns"!==s&&!0===n[s]){var t=e.element.find("#"+s);t.hasClass(c)?t.removeClass(c):t.addClass(c),this.trigger(h,{item:t[0]})}},_createCheckBoxes:function(){var e=this;e.element.find(".k-columns-item").find("[type='checkbox']").kendoSwitch({messages:{checked:"",unchecked:""},change:function(n){var s=n.sender.element.closest(".k-item"),t=e.options.columnMenu.view.state||{columns:{}},i=s.prop("id");t.columns[i]?t.columns[i]=!1:t.columns[i]=!0,e.trigger(h,{item:s})}})},_destroyCheckBoxes:function(){for(var e,n=this.element.find(".k-columns-item").find("[type='checkbox']"),s=0;s<n.length;s++)(e=n.eq(s).data("kendoSwitch"))&&e.destroy()},close:function(){this.options.pane.navigate("")},destroy:function(){var e=this;w.fn.destroy.call(e),e.element.off($),e._destroyCheckBoxes()}});i.plugin(S)}(window.kendo.jQuery);var kendo$1=kendo;export{kendo$1 as default};
//# sourceMappingURL=kendo.columnmenu.js.map