/**
 * Kendo UI v2023.2.718 (http://www.telerik.com/kendo-ui)
 * Copyright 2023 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import"./kendo.core.js";var __meta__={id:"data.odata",name:"OData",category:"framework",depends:["core"],hidden:!0};!function(t,e){var n=window.kendo,a=t.extend,r="\r\n",o="\r\n\r\n",s=n.isFunction,d={eq:"eq",neq:"ne",gt:"gt",gte:"ge",lt:"lt",lte:"le",contains:"substringof",doesnotcontain:"substringof",endswith:"endswith",startswith:"startswith",isnull:"eq",isnotnull:"ne",isnullorempty:"eq",isnotnullorempty:"ne",isempty:"eq",isnotempty:"ne"},i=a({},d,{contains:"contains"}),p={pageSize:t.noop,page:t.noop,filter:function(t,e,n){e&&(e=l(e,n))&&(t.$filter=e)},sort:function(e,n){var a=t.map(n,(function(t){var e=t.field.replace(/\./g,"/");return"desc"===t.dir&&(e+=" desc"),e})).join(",");a&&(e.$orderby=a)},skip:function(t,e){e&&(t.$skip=e)},take:function(t,e){e&&(t.$top=e)}},c={read:{dataType:"jsonp"}};function l(t,e){var a,r,o,s,p,c,u,f,y=[],h=t.logic||"and",g=t.filters;for(a=0,r=g.length;a<r;a++)o=(t=g[a]).field,u=t.value,c=t.operator,t.filters?t=l(t,e):(f=t.ignoreCase,o=o.replace(/\./g,"/"),t=d[c],e&&(t=i[c]),"isnullorempty"===c?t=n.format("{0} {1} null or {0} {1} ''",o,t):"isnotnullorempty"===c?t=n.format("{0} {1} null and {0} {1} ''",o,t):"isnull"===c||"isnotnull"===c?t=n.format("{0} {1} null",o,t):"isempty"===c||"isnotempty"===c?t=n.format("{0} {1} ''",o,t):t&&undefined!==u&&("string"===(s=n.type(u))?(p="'{1}'",u=u.replace(/'/g,"''"),!0===f&&(o="tolower("+o+")")):"date"===s?e?(p="{1:yyyy-MM-ddTHH:mm:ss+00:00}",u=n.timezone.apply(u,"Etc/UTC")):p="datetime'{1:yyyy-MM-ddTHH:mm:ss}'":p="{1}",t.length>3?"substringof"!==t?p="{0}({2},"+p+")":(p="{0}("+p+",{2})","doesnotcontain"===c&&(e?(p="{0}({2},'{1}') eq -1",t="indexof"):p+=" eq false")):p="{2} {0} "+p,t=n.format(p,t,u,o))),y.push(t);return t=y.join(" "+h+" "),y.length>1&&(t="("+t+")"),t}function u(t){for(var e in t)0===e.indexOf("@odata")&&delete t[e]}function f(){return Math.floor(65536*(1+Math.random())).toString(16).substr(1)}function y(t){return t+f()+"-"+f()+"-"+f()}function h(t,e){var n="\r\n--"+t;return e&&(n+="--"),n}function g(t,e,a,r){var o=t.options[r].url,d=n.format("{0} ",a);return s(o)?d+o(e):d+o}function m(t,e){var n="";return n+=h(t,!1),n+="\r\nContent-Type: application/http",n+="\r\nContent-Transfer-Encoding: binary",n+="\r\nContent-ID: "+e}function T(t,e,a,s,d,i,p){var c="";return c+=function(t,e){var n="";return n+="--"+t+r,n+="Content-Type: multipart/mixed; boundary="+e+r}(e,a),c+=function(t,e,a,s,d,i){for(var p,c,l="",u=0;u<t.length;u++)l+=m(e,a),l+=o+g(d,t[u],d.options[s].type,s)+" HTTP/1.1",i||(l+=(p=t[u],c=void 0,c="",c+="\r\nContent-Type: application/json;odata=minimalmetadata",c+="\r\nPrefer: return=representation",c+=o+n.stringify(p))),l+=r,a++;return l}(t,a,s,i,d,p),c+=h(a,!0),c+=r}a(!0,n.data,{schemas:{odata:{type:"json",data:function(t){return t.d.results||[t.d]},total:"d.__count"}},transports:{odata:{read:{cache:!0,dataType:"jsonp",jsonp:"$callback"},update:{cache:!0,dataType:"json",contentType:"application/json",type:"PUT"},create:{cache:!0,dataType:"json",contentType:"application/json",type:"POST"},destroy:{cache:!0,dataType:"json",type:"DELETE"},parameterMap:function(t,e,a){var r,o,s,d;if(t=t||{},e=e||"read",d=(d=(this.options||c)[e])?d.dataType:"json","read"===e)for(s in r={$inlinecount:"allpages"},"json"!=d&&(r.$format="json"),t)p[s]?p[s](r,t[s],a):r[s]=t[s];else{if("json"!==d)throw new Error("Only json dataType can be used for "+e+" operation.");if("destroy"!==e){for(s in t)"number"==typeof(o=t[s])&&(t[s]=o+"");r=n.stringify(t)}}return r}}}}),a(!0,n.data,{schemas:{"odata-v4":{type:"json",data:function(e){if(Array.isArray(e)){for(var n=0;n<e.length;n++)u(e[n]);return e}return u(e=t.extend({},e)),e.value?e.value:[e]},total:function(t){return t["@odata.count"]}}},transports:{"odata-v4":{batch:{type:"POST"},read:{cache:!0,dataType:"json"},update:{cache:!0,dataType:"json",contentType:"application/json;IEEE754Compatible=true",type:"PUT"},create:{cache:!0,dataType:"json",contentType:"application/json;IEEE754Compatible=true",type:"POST"},destroy:{cache:!0,dataType:"json",type:"DELETE"},parameterMap:function(t,e){var a=n.data.transports.odata.parameterMap(t,e,!0);return"read"==e&&(a.$count=!0,delete a.$inlinecount),a&&a.$filter&&(a.$filter=a.$filter.replace(/('[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}')/gi,(function(t){return t.substring(1,t.length-1)}))),a},submit:function(e){var r=function(t,e){var n=a({},t.options.batch),r=y("sf_batch_"),o="",d=0,i=t.options.batch.url,p=y("sf_changeset_");return n.type=t.options.batch.type,n.url=s(i)?i():i,n.headers=a(n.headers||{},{"Content-Type":"multipart/mixed; boundary="+r}),e.updated.length&&(o+=T(e.updated,r,p,d,t,"update",!1),d+=e.updated.length,p=y("sf_changeset_")),e.destroyed.length&&(o+=T(e.destroyed,r,p,d,t,"destroy",!0),d+=e.destroyed.length,p=y("sf_changeset_")),e.created.length&&(o+=T(e.created,r,p,d,t,"create",!1)),o+=h(r,!0),n.data=o,n}(this,e.data),o=e.data;(o.updated.length||o.destroyed.length||o.created.length)&&t.ajax(a(!0,{},{success:function(t){var a,r=function(t){var e,a,r,o,s,d=t.match(/--changesetresponse_[a-z0-9-]+$/gm),i=0,p=[];p.push({models:[],passed:!0});for(var c=0;c<d.length;c++)(o=d[c]).lastIndexOf("--",o.length-1)?c<d.length-1&&p.push({models:[],passed:!0}):(i=i?t.indexOf(o,i+o.length):t.indexOf(o),a=(e=t.substring(i,t.indexOf("--",i+1))).match(/^HTTP\/1\.\d (\d{3}) (.*)$/gm).pop(),(r=n.parseFloat(a.match(/\d{3}/g).pop()))>=200&&r<=299?(s=e.match(/\{.*\}/gm))&&p[p.length-1].models.push(JSON.parse(s[0])):p[p.length-1].passed=!1);return p}(t),s=0;o.updated.length&&((a=r[s]).passed&&e.success(a.models.length?a.models:[],"update"),s++),o.destroyed.length&&((a=r[s]).passed&&e.success([],"destroy"),s++),o.created.length&&(a=r[s]).passed&&e.success(a.models,"create")},error:function(t,n,a){e.error(t,n,a)}},r))}}}})}(window.kendo.jQuery);var kendo$1=kendo;export{kendo$1 as default};
//# sourceMappingURL=kendo.data.odata.js.map
