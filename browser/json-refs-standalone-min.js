!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.JsonRefs=t()}}(function(){var t;return function e(t,n,r){function o(s,a){if(!n[s]){if(!t[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(i)return i(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var h=n[s]={exports:{}};t[s][0].call(h.exports,function(e){var n=t[s][1][e];return o(n?n:e)},h,h.exports,e,t,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(t,e,n){"use strict";function r(t,e){var n=p[t],r=Promise.resolve(),o=-1===t.indexOf(":")?void 0:t.split(":")[0];return u.isUndefined(n)?-1!==l.indexOf(o)||u.isUndefined(o)?(r=c.load(t,e),r=e.processContent?r.then(function(n){return e.processContent(n,t)}):r.then(JSON.parse),r=r.then(function(e){return p[t]=e,e})):r=r.then(function(){return Promise.reject(new Error("Unsupported remote reference scheme: "+o))}):r=r.then(function(){return n}),r=r.then(function(t){return u.cloneDeep(t)})}function o(t,e){var n=g(t);return v(e)&&(e=-1===e.indexOf("#")?"#":e.substring(e.indexOf("#"))),y(n.concat(g(e))).replace(/\/\$ref/g,"")}function i(t,e){function n(t){".."===t?o.pop():"."!==t&&o.push(t)}var r="#"!==e.charAt(0)&&-1===e.indexOf(":"),o=[],i=(e.indexOf("#")>-1?e.split("#")[0]:e).split("/");return t&&(t.indexOf("#")>-1&&(t=t.substring(0,t.indexOf("#"))),t.length>1&&"/"===t[t.length-1]&&(t=t.substring(0,t.length-1)),t.split("#")[0].split("/").forEach(n)),r?i.forEach(n):o=i,o.join("/")}function s(t,e,n){function r(t){var e=t.slice(0,t.lastIndexOf("allOf")),o=n[y(e)];return u.isUndefined(o)?e.indexOf("allOf")>-1?r(e):void 0:y(e)}function i(t){var e=[],o=t.map(function(){var t,o=y(this.path),i=n[o];this.circular&&(e.push(o),u.isUndefined(i)&&(t=r(this.path),i=n[t]),u.isUndefined(i)||(i.circular=!0),0===a?this.update({}):this.update(h(this.node).map(function(){this.circular&&this.parent.update({})})))});return u.each(e,function(t){var e,n=[],r=g(t),i=h(o).get(r);for(e=0;a>e;e++)n.push.apply(n,r),h(o).set(n,u.cloneDeep(i))}),o}function s(t,e){var r=o(e,"#"),i=t=-1===t.indexOf("#")?"#":t.substring(t.indexOf("#")),s=g(i),a=!c.has(s),u=c.get(s),h=g(e),f=h.slice(0,h.length-1),p=n[r]||{ref:t};a?p.missing=!0:0===f.length?(c.value===u&&(u={},p.circular=!0),c.value=u):(c.get(f)===u&&(u={},p.circular=!0),c.set(f,u)),n[r]=p}var a=u.isUndefined(e.depth)?1:e.depth,c=h(t);return u.each(m(t),function(t,e){v(t)||s(t,e)}),u.isUndefined(e.location)||u.each(n,function(t){var n=t.ref;0===n.indexOf(e.location)&&(n=n.substring(e.location.length),"/"===n.charAt(0)&&(n=n.substring(1))),t.ref=n}),{metadata:n,resolved:i(c)}}function a(t,e,n,c,p){function l(t,e,r,i,s){var a,f=r+("#"===i?"":i),l=o(n,t),d=p[l]||{},y=g(t);u.isUndefined(s)?(d.circular=!0,a=c[r].ref):(a=h(s).get(g(i)),u.isUndefined(a)?d.missing=!0:a.$ref?a=a.$ref:y.pop()),0===y.length?x.value=a:x.set(y,a),d.ref=f,p[l]=d}function d(){return{metadata:p,resolved:x.value}}var y,b,w=Promise.resolve(),x=h(t);return null!==f.parse(""+t.id).protocol&&(t.id=i(t.id,t.id),b=t.id),u.each(m(t),function(s,h){v(s)&&(w=w.then(function(){var f=i(e.location,s),d=s.split("#"),m="#"+(d[1]||"");return u.isUndefined(c[f])?(y=function(t){var r=d[0],y=u.cloneDeep(e),v=o(n,h);return r=r.substring(0,r.lastIndexOf("/")+1),y.location=i(e.location,r),u.isError(t)?void(p[v]={err:t,missing:!0,ref:s}):(c[f]={ref:n},a(t,y,v,c,p).then(function(t){return delete c[f],l(h,s,f,m,t.resolved),t}))},b===f?y(t):r(f,e).then(function(t){return t},function(t){return t}).then(y)):void l(h,s,f,m)}))}),w=w.then(function(){s(x.value,e,p)}).then(d,d)}"undefined"==typeof Promise&&t("native-promise-only");var u=t("./lib/utils"),c=t("path-loader"),h=t("traverse"),f=t("url"),p={},l=["file","http","https"];e.exports.clearCache=function(){p={}};var d=e.exports.isJsonReference=function(t){return u.isPlainObject(t)&&u.isString(t.$ref)},y=e.exports.pathToPointer=function(t){if(u.isUndefined(t))throw new Error("path is required");if(!u.isArray(t))throw new Error("path must be an array");var e="#";return t.length>0&&(e+="/"+t.map(function(t){return t.replace(/~/g,"~0").replace(/\//g,"~1")}).join("/")),e},m=e.exports.findRefs=function(t){if(u.isUndefined(t))throw new Error("json is required");if(!u.isPlainObject(t))throw new Error("json must be an object");return h(t).reduce(function(t){var e=this.node;return"$ref"===this.key&&d(this.parent.node)&&(t[y(this.path)]=e),t},{})},v=e.exports.isRemotePointer=function(t){if(u.isUndefined(t))throw new Error("ptr is required");if(!u.isString(t))throw new Error("ptr must be a string");return""!==t&&"#"!==t.charAt(0)},g=e.exports.pathFromPointer=function(t){if(u.isUndefined(t))throw new Error("ptr is required");if(!u.isString(t))throw new Error("ptr must be a string");var e=[],n=["","#","#/"];return v(t)?e=t:-1===n.indexOf(t)&&"#"===t.charAt(0)&&(e=t.substring(t.indexOf("/")).split("/").reduce(function(t,e){return""!==e&&t.push(e.replace(/~0/g,"~").replace(/~1/g,"/")),t},[])),e};e.exports.resolveRefs=function(t,e,n){var r=Promise.resolve();return 2===arguments.length&&u.isFunction(e)&&(n=e,e={}),u.isUndefined(e)&&(e={}),r=r.then(function(){if(u.isUndefined(t))throw new Error("json is required");if(!u.isPlainObject(t))throw new Error("json must be an object");if(!u.isPlainObject(e))throw new Error("options must be an object");if(!u.isUndefined(n)&&!u.isFunction(n))throw new Error("done must be a function");if(!u.isUndefined(e.processContent)&&!u.isFunction(e.processContent))throw new Error("options.processContent must be a function");if(!u.isUndefined(e.prepareRequest)&&!u.isFunction(e.prepareRequest))throw new Error("options.prepareRequest must be a function");if(!u.isUndefined(e.location)&&!u.isString(e.location))throw new Error("options.location must be a string");if(!u.isUndefined(e.depth)&&!u.isNumber(e.depth))throw new Error("options.depth must be a number");if(!u.isUndefined(e.depth)&&e.depth<0)throw new Error("options.depth must be greater or equal to zero")}),t=h(t).clone(),e=h(e).clone(),r=r.then(function(){return a(t,e,"#",{},{})}).then(function(t){return s(t.resolved,e,t.metadata)}),!u.isUndefined(n)&&u.isFunction(n)&&(r=r.then(function(t){n(void 0,t.resolved,t.metadata)},function(t){n(t)})),r}},{"./lib/utils":2,"native-promise-only":8,"path-loader":9,traverse:15,url:7}],2:[function(t,e,n){"use strict";function r(t,e){return Object.prototype.toString.call(t)==="[object "+e+"]"}var o=t("traverse");e.exports.cloneDeep=function(t){return o(t).clone()};var i=e.exports.isArray=function(t){return r(t,"Array")};e.exports.isError=function(t){return r(t,"Error")},e.exports.isFunction=function(t){return r(t,"Function")},e.exports.isNumber=function(t){return r(t,"Number")};var s=e.exports.isPlainObject=function(t){return r(t,"Object")};e.exports.isString=function(t){return r(t,"String")},e.exports.isUndefined=function(t){return"undefined"==typeof t},e.exports.each=function(t,e){i(t)?t.forEach(e):s(t)&&Object.keys(t).forEach(function(n){e(t[n],n)})}},{traverse:15}],3:[function(e,n,r){(function(e){!function(o){function i(t){throw RangeError(L[t])}function s(t,e){for(var n=t.length,r=[];n--;)r[n]=e(t[n]);return r}function a(t,e){var n=t.split("@"),r="";n.length>1&&(r=n[0]+"@",t=n[1]),t=t.replace(P,".");var o=t.split("."),i=s(o,e).join(".");return r+i}function u(t){for(var e,n,r=[],o=0,i=t.length;i>o;)e=t.charCodeAt(o++),e>=55296&&56319>=e&&i>o?(n=t.charCodeAt(o++),56320==(64512&n)?r.push(((1023&e)<<10)+(1023&n)+65536):(r.push(e),o--)):r.push(e);return r}function c(t){return s(t,function(t){var e="";return t>65535&&(t-=65536,e+=S(t>>>10&1023|55296),t=56320|1023&t),e+=S(t)}).join("")}function h(t){return 10>t-48?t-22:26>t-65?t-65:26>t-97?t-97:O}function f(t,e){return t+22+75*(26>t)-((0!=e)<<5)}function p(t,e,n){var r=0;for(t=n?I(t/q):t>>1,t+=I(t/e);t>D*_>>1;r+=O)t=I(t/D);return I(r+(D+1)*t/(t+T))}function l(t){var e,n,r,o,s,a,u,f,l,d,y=[],m=t.length,v=0,g=k,b=A;for(n=t.lastIndexOf(C),0>n&&(n=0),r=0;n>r;++r)t.charCodeAt(r)>=128&&i("not-basic"),y.push(t.charCodeAt(r));for(o=n>0?n+1:0;m>o;){for(s=v,a=1,u=O;o>=m&&i("invalid-input"),f=h(t.charCodeAt(o++)),(f>=O||f>I((j-v)/a))&&i("overflow"),v+=f*a,l=b>=u?E:u>=b+_?_:u-b,!(l>f);u+=O)d=O-l,a>I(j/d)&&i("overflow"),a*=d;e=y.length+1,b=p(v-s,e,0==s),I(v/e)>j-g&&i("overflow"),g+=I(v/e),v%=e,y.splice(v++,0,g)}return c(y)}function d(t){var e,n,r,o,s,a,c,h,l,d,y,m,v,g,b,w=[];for(t=u(t),m=t.length,e=k,n=0,s=A,a=0;m>a;++a)y=t[a],128>y&&w.push(S(y));for(r=o=w.length,o&&w.push(C);m>r;){for(c=j,a=0;m>a;++a)y=t[a],y>=e&&c>y&&(c=y);for(v=r+1,c-e>I((j-n)/v)&&i("overflow"),n+=(c-e)*v,e=c,a=0;m>a;++a)if(y=t[a],e>y&&++n>j&&i("overflow"),y==e){for(h=n,l=O;d=s>=l?E:l>=s+_?_:l-s,!(d>h);l+=O)b=h-d,g=O-d,w.push(S(f(d+b%g,0))),h=I(b/g);w.push(S(f(h,0))),s=p(n,v,r==o),n=0,++r}++n,++e}return w.join("")}function y(t){return a(t,function(t){return R.test(t)?l(t.slice(4).toLowerCase()):t})}function m(t){return a(t,function(t){return U.test(t)?"xn--"+d(t):t})}var v="object"==typeof r&&r&&!r.nodeType&&r,g="object"==typeof n&&n&&!n.nodeType&&n,b="object"==typeof e&&e;(b.global===b||b.window===b||b.self===b)&&(o=b);var w,x,j=2147483647,O=36,E=1,_=26,T=38,q=700,A=72,k=128,C="-",R=/^xn--/,U=/[^\x20-\x7E]/,P=/[\x2E\u3002\uFF0E\uFF61]/g,L={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},D=O-E,I=Math.floor,S=String.fromCharCode;if(w={version:"1.3.2",ucs2:{decode:u,encode:c},decode:l,encode:d,toASCII:m,toUnicode:y},"function"==typeof t&&"object"==typeof t.amd&&t.amd)t("punycode",function(){return w});else if(v&&g)if(n.exports==v)g.exports=w;else for(x in w)w.hasOwnProperty(x)&&(v[x]=w[x]);else o.punycode=w}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],4:[function(t,e,n){"use strict";function r(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.exports=function(t,e,n,i){e=e||"&",n=n||"=";var s={};if("string"!=typeof t||0===t.length)return s;var a=/\+/g;t=t.split(e);var u=1e3;i&&"number"==typeof i.maxKeys&&(u=i.maxKeys);var c=t.length;u>0&&c>u&&(c=u);for(var h=0;c>h;++h){var f,p,l,d,y=t[h].replace(a,"%20"),m=y.indexOf(n);m>=0?(f=y.substr(0,m),p=y.substr(m+1)):(f=y,p=""),l=decodeURIComponent(f),d=decodeURIComponent(p),r(s,l)?o(s[l])?s[l].push(d):s[l]=[s[l],d]:s[l]=d}return s};var o=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},{}],5:[function(t,e,n){"use strict";function r(t,e){if(t.map)return t.map(e);for(var n=[],r=0;r<t.length;r++)n.push(e(t[r],r));return n}var o=function(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}};e.exports=function(t,e,n,a){return e=e||"&",n=n||"=",null===t&&(t=void 0),"object"==typeof t?r(s(t),function(s){var a=encodeURIComponent(o(s))+n;return i(t[s])?r(t[s],function(t){return a+encodeURIComponent(o(t))}).join(e):a+encodeURIComponent(o(t[s]))}).join(e):a?encodeURIComponent(o(a))+n+encodeURIComponent(o(t)):""};var i=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},s=Object.keys||function(t){var e=[];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.push(n);return e}},{}],6:[function(t,e,n){"use strict";n.decode=n.parse=t("./decode"),n.encode=n.stringify=t("./encode")},{"./decode":4,"./encode":5}],7:[function(t,e,n){function r(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function o(t,e,n){if(t&&c(t)&&t instanceof r)return t;var o=new r;return o.parse(t,e,n),o}function i(t){return u(t)&&(t=o(t)),t instanceof r?t.format():r.prototype.format.call(t)}function s(t,e){return o(t,!1,!0).resolve(e)}function a(t,e){return t?o(t,!1,!0).resolveObject(e):e}function u(t){return"string"==typeof t}function c(t){return"object"==typeof t&&null!==t}function h(t){return null===t}function f(t){return null==t}var p=t("punycode");n.parse=o,n.resolve=s,n.resolveObject=a,n.format=i,n.Url=r;var l=/^([a-z0-9.+-]+:)/i,d=/:[0-9]*$/,y=["<",">",'"',"`"," ","\r","\n","	"],m=["{","}","|","\\","^","`"].concat(y),v=["'"].concat(m),g=["%","/","?",";","#"].concat(v),b=["/","?","#"],w=255,x=/^[a-z0-9A-Z_-]{0,63}$/,j=/^([a-z0-9A-Z_-]{0,63})(.*)$/,O={javascript:!0,"javascript:":!0},E={javascript:!0,"javascript:":!0},_={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},T=t("querystring");r.prototype.parse=function(t,e,n){if(!u(t))throw new TypeError("Parameter 'url' must be a string, not "+typeof t);var r=t;r=r.trim();var o=l.exec(r);if(o){o=o[0];var i=o.toLowerCase();this.protocol=i,r=r.substr(o.length)}if(n||o||r.match(/^\/\/[^@\/]+@[^@\/]+/)){var s="//"===r.substr(0,2);!s||o&&E[o]||(r=r.substr(2),this.slashes=!0)}if(!E[o]&&(s||o&&!_[o])){for(var a=-1,c=0;c<b.length;c++){var h=r.indexOf(b[c]);-1!==h&&(-1===a||a>h)&&(a=h)}var f,d;d=-1===a?r.lastIndexOf("@"):r.lastIndexOf("@",a),-1!==d&&(f=r.slice(0,d),r=r.slice(d+1),this.auth=decodeURIComponent(f)),a=-1;for(var c=0;c<g.length;c++){var h=r.indexOf(g[c]);-1!==h&&(-1===a||a>h)&&(a=h)}-1===a&&(a=r.length),this.host=r.slice(0,a),r=r.slice(a),this.parseHost(),this.hostname=this.hostname||"";var y="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!y)for(var m=this.hostname.split(/\./),c=0,q=m.length;q>c;c++){var A=m[c];if(A&&!A.match(x)){for(var k="",C=0,R=A.length;R>C;C++)k+=A.charCodeAt(C)>127?"x":A[C];if(!k.match(x)){var U=m.slice(0,c),P=m.slice(c+1),L=A.match(j);L&&(U.push(L[1]),P.unshift(L[2])),P.length&&(r="/"+P.join(".")+r),this.hostname=U.join(".");break}}}if(this.hostname.length>w?this.hostname="":this.hostname=this.hostname.toLowerCase(),!y){for(var D=this.hostname.split("."),I=[],c=0;c<D.length;++c){var S=D[c];I.push(S.match(/[^A-Za-z0-9_-]/)?"xn--"+p.encode(S):S)}this.hostname=I.join(".")}var H=this.port?":"+this.port:"",N=this.hostname||"";this.host=N+H,this.href+=this.host,y&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==r[0]&&(r="/"+r))}if(!O[i])for(var c=0,q=v.length;q>c;c++){var F=v[c],X=encodeURIComponent(F);X===F&&(X=escape(F)),r=r.split(F).join(X)}var M=r.indexOf("#");-1!==M&&(this.hash=r.substr(M),r=r.slice(0,M));var z=r.indexOf("?");if(-1!==z?(this.search=r.substr(z),this.query=r.substr(z+1),e&&(this.query=T.parse(this.query)),r=r.slice(0,z)):e&&(this.search="",this.query={}),r&&(this.pathname=r),_[i]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var H=this.pathname||"",S=this.search||"";this.path=H+S}return this.href=this.format(),this},r.prototype.format=function(){var t=this.auth||"";t&&(t=encodeURIComponent(t),t=t.replace(/%3A/i,":"),t+="@");var e=this.protocol||"",n=this.pathname||"",r=this.hash||"",o=!1,i="";this.host?o=t+this.host:this.hostname&&(o=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(o+=":"+this.port)),this.query&&c(this.query)&&Object.keys(this.query).length&&(i=T.stringify(this.query));var s=this.search||i&&"?"+i||"";return e&&":"!==e.substr(-1)&&(e+=":"),this.slashes||(!e||_[e])&&o!==!1?(o="//"+(o||""),n&&"/"!==n.charAt(0)&&(n="/"+n)):o||(o=""),r&&"#"!==r.charAt(0)&&(r="#"+r),s&&"?"!==s.charAt(0)&&(s="?"+s),n=n.replace(/[?#]/g,function(t){return encodeURIComponent(t)}),s=s.replace("#","%23"),e+o+n+s+r},r.prototype.resolve=function(t){return this.resolveObject(o(t,!1,!0)).format()},r.prototype.resolveObject=function(t){if(u(t)){var e=new r;e.parse(t,!1,!0),t=e}var n=new r;if(Object.keys(this).forEach(function(t){n[t]=this[t]},this),n.hash=t.hash,""===t.href)return n.href=n.format(),n;if(t.slashes&&!t.protocol)return Object.keys(t).forEach(function(e){"protocol"!==e&&(n[e]=t[e])}),_[n.protocol]&&n.hostname&&!n.pathname&&(n.path=n.pathname="/"),n.href=n.format(),n;if(t.protocol&&t.protocol!==n.protocol){if(!_[t.protocol])return Object.keys(t).forEach(function(e){n[e]=t[e]}),n.href=n.format(),n;if(n.protocol=t.protocol,t.host||E[t.protocol])n.pathname=t.pathname;else{for(var o=(t.pathname||"").split("/");o.length&&!(t.host=o.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==o[0]&&o.unshift(""),o.length<2&&o.unshift(""),n.pathname=o.join("/")}if(n.search=t.search,n.query=t.query,n.host=t.host||"",n.auth=t.auth,n.hostname=t.hostname||t.host,n.port=t.port,n.pathname||n.search){var i=n.pathname||"",s=n.search||"";n.path=i+s}return n.slashes=n.slashes||t.slashes,n.href=n.format(),n}var a=n.pathname&&"/"===n.pathname.charAt(0),c=t.host||t.pathname&&"/"===t.pathname.charAt(0),p=c||a||n.host&&t.pathname,l=p,d=n.pathname&&n.pathname.split("/")||[],o=t.pathname&&t.pathname.split("/")||[],y=n.protocol&&!_[n.protocol];if(y&&(n.hostname="",n.port=null,n.host&&(""===d[0]?d[0]=n.host:d.unshift(n.host)),n.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===o[0]?o[0]=t.host:o.unshift(t.host)),t.host=null),p=p&&(""===o[0]||""===d[0])),c)n.host=t.host||""===t.host?t.host:n.host,n.hostname=t.hostname||""===t.hostname?t.hostname:n.hostname,n.search=t.search,n.query=t.query,d=o;else if(o.length)d||(d=[]),d.pop(),d=d.concat(o),n.search=t.search,n.query=t.query;else if(!f(t.search)){if(y){n.hostname=n.host=d.shift();var m=n.host&&n.host.indexOf("@")>0?n.host.split("@"):!1;m&&(n.auth=m.shift(),n.host=n.hostname=m.shift())}return n.search=t.search,n.query=t.query,h(n.pathname)&&h(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.href=n.format(),n}if(!d.length)return n.pathname=null,n.search?n.path="/"+n.search:n.path=null,n.href=n.format(),n;for(var v=d.slice(-1)[0],g=(n.host||t.host)&&("."===v||".."===v)||""===v,b=0,w=d.length;w>=0;w--)v=d[w],"."==v?d.splice(w,1):".."===v?(d.splice(w,1),b++):b&&(d.splice(w,1),b--);if(!p&&!l)for(;b--;b)d.unshift("..");!p||""===d[0]||d[0]&&"/"===d[0].charAt(0)||d.unshift(""),g&&"/"!==d.join("/").substr(-1)&&d.push("");var x=""===d[0]||d[0]&&"/"===d[0].charAt(0);if(y){n.hostname=n.host=x?"":d.length?d.shift():"";var m=n.host&&n.host.indexOf("@")>0?n.host.split("@"):!1;m&&(n.auth=m.shift(),n.host=n.hostname=m.shift())}return p=p||n.host&&d.length,p&&!x&&d.unshift(""),d.length?n.pathname=d.join("/"):(n.pathname=null,n.path=null),h(n.pathname)&&h(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.auth=t.auth||n.auth,n.slashes=n.slashes||t.slashes,n.href=n.format(),n},r.prototype.parseHost=function(){var t=this.host,e=d.exec(t);e&&(e=e[0],":"!==e&&(this.port=e.substr(1)),t=t.substr(0,t.length-e.length)),t&&(this.hostname=t)}},{punycode:3,querystring:6}],8:[function(e,n,r){(function(e){!function(e,r,o){r[e]=r[e]||o(),"undefined"!=typeof n&&n.exports?n.exports=r[e]:"function"==typeof t&&t.amd&&t(function(){return r[e]})}("Promise","undefined"!=typeof e?e:this,function(){"use strict";function t(t,e){p.add(t,e),f||(f=d(p.drain))}function e(t){var e,n=typeof t;return null==t||"object"!=n&&"function"!=n||(e=t.then),"function"==typeof e?e:!1}function n(){for(var t=0;t<this.chain.length;t++)r(this,1===this.state?this.chain[t].success:this.chain[t].failure,this.chain[t]);this.chain.length=0}function r(t,n,r){var o,i;try{n===!1?r.reject(t.msg):(o=n===!0?t.msg:n.call(void 0,t.msg),o===r.promise?r.reject(TypeError("Promise-chain cycle")):(i=e(o))?i.call(o,r.resolve,r.reject):r.resolve(o))}catch(s){r.reject(s)}}function o(r){var s,u=this;if(!u.triggered){u.triggered=!0,u.def&&(u=u.def);try{(s=e(r))?t(function(){var t=new a(u);try{s.call(r,function(){o.apply(t,arguments)},function(){i.apply(t,arguments)})}catch(e){i.call(t,e)}}):(u.msg=r,u.state=1,u.chain.length>0&&t(n,u))}catch(c){i.call(new a(u),c)}}}function i(e){var r=this;r.triggered||(r.triggered=!0,r.def&&(r=r.def),r.msg=e,r.state=2,r.chain.length>0&&t(n,r))}function s(t,e,n,r){for(var o=0;o<e.length;o++)!function(o){t.resolve(e[o]).then(function(t){n(o,t)},r)}(o)}function a(t){this.def=t,this.triggered=!1}function u(t){this.promise=t,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function c(e){if("function"!=typeof e)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var r=new u(this);this.then=function(e,o){var i={success:"function"==typeof e?e:!0,failure:"function"==typeof o?o:!1};return i.promise=new this.constructor(function(t,e){if("function"!=typeof t||"function"!=typeof e)throw TypeError("Not a function");i.resolve=t,i.reject=e}),r.chain.push(i),0!==r.state&&t(n,r),i.promise},this["catch"]=function(t){return this.then(void 0,t)};try{e.call(void 0,function(t){o.call(r,t)},function(t){i.call(r,t)})}catch(s){i.call(r,s)}}var h,f,p,l=Object.prototype.toString,d="undefined"!=typeof setImmediate?function(t){return setImmediate(t)}:setTimeout;try{Object.defineProperty({},"x",{}),h=function(t,e,n,r){return Object.defineProperty(t,e,{value:n,writable:!0,configurable:r!==!1})}}catch(y){h=function(t,e,n){return t[e]=n,t}}p=function(){function t(t,e){this.fn=t,this.self=e,this.next=void 0}var e,n,r;return{add:function(o,i){r=new t(o,i),n?n.next=r:e=r,n=r,r=void 0},drain:function(){var t=e;for(e=n=f=void 0;t;)t.fn.call(t.self),t=t.next}}}();var m=h({},"constructor",c,!1);return c.prototype=m,h(m,"__NPO__",0,!1),h(c,"resolve",function(t){var e=this;return t&&"object"==typeof t&&1===t.__NPO__?t:new e(function(e,n){if("function"!=typeof e||"function"!=typeof n)throw TypeError("Not a function");e(t)})}),h(c,"reject",function(t){return new this(function(e,n){if("function"!=typeof e||"function"!=typeof n)throw TypeError("Not a function");n(t)})}),h(c,"all",function(t){var e=this;return"[object Array]"!=l.call(t)?e.reject(TypeError("Not an array")):0===t.length?e.resolve([]):new e(function(n,r){if("function"!=typeof n||"function"!=typeof r)throw TypeError("Not a function");var o=t.length,i=Array(o),a=0;s(e,t,function(t,e){i[t]=e,++a===o&&n(i)},r)})}),h(c,"race",function(t){var e=this;return"[object Array]"!=l.call(t)?e.reject(TypeError("Not an array")):new e(function(n,r){if("function"!=typeof n||"function"!=typeof r)throw TypeError("Not a function");s(e,t,function(t,e){n(e)},r)})}),c})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],9:[function(t,e,n){"use strict";function r(t){return o[t.split(":")[0]]||i}var o={file:t("./lib/loaders/file"),http:t("./lib/loaders/http"),https:t("./lib/loaders/http")},i="object"==typeof window||"function"==typeof importScripts?o.http:o.file;"undefined"==typeof Promise&&t("native-promise-only"),e.exports.load=function(t,e,n){var o=Promise.resolve();return 2===arguments.length&&"function"==typeof e&&(n=e,e=void 0),o=o.then(function(){if("undefined"==typeof t)throw new TypeError("location is required");if("string"!=typeof t)throw new TypeError("location must be a string");if("undefined"!=typeof e){if("object"!=typeof e)throw new TypeError("options must be an object")}else e={};if("undefined"!=typeof n&&"function"!=typeof n)throw new TypeError("callback must be a function")}),o=o.then(function(){return new Promise(function(n,o){var i=r(t);i.load(t,e,function(t,e){t?o(t):n(e)})})}),"function"==typeof n&&(o=o.then(function(t){n(void 0,t)},function(t){n(t)})),o}},{"./lib/loaders/file":10,"./lib/loaders/http":11,"native-promise-only":8}],10:[function(t,e,n){"use strict";e.exports.load=function(t,e,n){n(new TypeError("The 'file' scheme is not supported in the browser"))}},{}],11:[function(t,e,n){"use strict";var r=t("superagent"),o=["delete","get","head","patch","post","put"];e.exports.load=function(t,e,n){var i,s,a=t.split("#")[0],u=e.method?e.method.toLowerCase():"get";"undefined"!=typeof e.prepareRequest&&"function"!=typeof e.prepareRequest?i=new TypeError("options.prepareRequest must be a function"):"undefined"!=typeof e.method&&("string"!=typeof e.method?i=new TypeError("options.method must be a string"):-1===o.indexOf(e.method)&&(i=new TypeError("options.method must be one of the following: "+o.slice(0,o.length-1).join(", ")+" or "+o[o.length-1]))),i?n(i):(s=r["delete"===u?"del":u](a),e.prepareRequest&&e.prepareRequest(s),"function"==typeof s.buffer&&s.buffer(!0),s.end(function(t,e){n(t,e?e.text:e)}))}},{superagent:12}],12:[function(t,e,n){function r(){}function o(t){var e={}.toString.call(t);switch(e){case"[object File]":case"[object Blob]":case"[object FormData]":return!0;default:return!1}}function i(t){return t===Object(t)}function s(t){if(!i(t))return t;var e=[];for(var n in t)null!=t[n]&&e.push(encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e.join("&")}function a(t){for(var e,n,r={},o=t.split("&"),i=0,s=o.length;s>i;++i)n=o[i],e=n.split("="),r[decodeURIComponent(e[0])]=decodeURIComponent(e[1]);return r}function u(t){var e,n,r,o,i=t.split(/\r?\n/),s={};i.pop();for(var a=0,u=i.length;u>a;++a)n=i[a],e=n.indexOf(":"),r=n.slice(0,e).toLowerCase(),o=v(n.slice(e+1)),s[r]=o;return s}function c(t){return t.split(/ *; */).shift()}function h(t){return m(t.split(/ *; */),function(t,e){var n=e.split(/ *= */),r=n.shift(),o=n.shift();return r&&o&&(t[r]=o),t},{})}function f(t,e){e=e||{},this.req=t,this.xhr=this.req.xhr,this.text="HEAD"!=this.req.method&&(""===this.xhr.responseType||"text"===this.xhr.responseType)||"undefined"==typeof this.xhr.responseType?this.xhr.responseText:null,this.statusText=this.req.xhr.statusText,this.setStatusProperties(this.xhr.status),this.header=this.headers=u(this.xhr.getAllResponseHeaders()),this.header["content-type"]=this.xhr.getResponseHeader("content-type"),this.setHeaderProperties(this.header),this.body="HEAD"!=this.req.method?this.parseBody(this.text?this.text:this.xhr.response):null}function p(t,e){var n=this;y.call(this),this._query=this._query||[],this.method=t,this.url=e,this.header={},this._header={},this.on("end",function(){var t=null,e=null;try{e=new f(n)}catch(r){return t=new Error("Parser is unable to parse the response"),t.parse=!0,t.original=r,n.callback(t)}if(n.emit("response",e),t)return n.callback(t,e);if(e.status>=200&&e.status<300)return n.callback(t,e);var o=new Error(e.statusText||"Unsuccessful HTTP response");o.original=t,o.response=e,o.status=e.status,n.callback(o,e)})}function l(t,e){return"function"==typeof e?new p("GET",t).end(e):1==arguments.length?new p("GET",t):new p(t,e)}var d,y=t("emitter"),m=t("reduce");d="undefined"!=typeof window?window:"undefined"!=typeof self?self:this,l.getXHR=function(){if(!(!d.XMLHttpRequest||d.location&&"file:"==d.location.protocol&&d.ActiveXObject))return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(t){}return!1};var v="".trim?function(t){return t.trim()}:function(t){return t.replace(/(^\s*|\s*$)/g,"")};l.serializeObject=s,l.parseString=a,l.types={html:"text/html",json:"application/json",xml:"application/xml",urlencoded:"application/x-www-form-urlencoded",form:"application/x-www-form-urlencoded","form-data":"application/x-www-form-urlencoded"},l.serialize={"application/x-www-form-urlencoded":s,"application/json":JSON.stringify},l.parse={"application/x-www-form-urlencoded":a,"application/json":JSON.parse},f.prototype.get=function(t){return this.header[t.toLowerCase()]},f.prototype.setHeaderProperties=function(t){var e=this.header["content-type"]||"";this.type=c(e);var n=h(e);for(var r in n)this[r]=n[r]},f.prototype.parse=function(t){return this.parser=t,this},f.prototype.parseBody=function(t){var e=this.parser||l.parse[this.type];return e&&t&&(t.length||t instanceof Object)?e(t):null},f.prototype.setStatusProperties=function(t){1223===t&&(t=204);var e=t/100|0;this.status=this.statusCode=t,this.statusType=e,this.info=1==e,this.ok=2==e,this.clientError=4==e,this.serverError=5==e,this.error=4==e||5==e?this.toError():!1,this.accepted=202==t,this.noContent=204==t,this.badRequest=400==t,this.unauthorized=401==t,this.notAcceptable=406==t,this.notFound=404==t,this.forbidden=403==t},f.prototype.toError=function(){var t=this.req,e=t.method,n=t.url,r="cannot "+e+" "+n+" ("+this.status+")",o=new Error(r);return o.status=this.status,o.method=e,o.url=n,o},l.Response=f,y(p.prototype),p.prototype.use=function(t){return t(this),this},p.prototype.timeout=function(t){return this._timeout=t,this},p.prototype.clearTimeout=function(){return this._timeout=0,clearTimeout(this._timer),this},p.prototype.abort=function(){return this.aborted?void 0:(this.aborted=!0,this.xhr.abort(),this.clearTimeout(),this.emit("abort"),this)},p.prototype.set=function(t,e){if(i(t)){for(var n in t)this.set(n,t[n]);return this}return this._header[t.toLowerCase()]=e,this.header[t]=e,this},p.prototype.unset=function(t){return delete this._header[t.toLowerCase()],delete this.header[t],this},p.prototype.getHeader=function(t){return this._header[t.toLowerCase()]},p.prototype.type=function(t){return this.set("Content-Type",l.types[t]||t),this},p.prototype.accept=function(t){return this.set("Accept",l.types[t]||t),this},p.prototype.auth=function(t,e){var n=btoa(t+":"+e);return this.set("Authorization","Basic "+n),this},p.prototype.query=function(t){return"string"!=typeof t&&(t=s(t)),t&&this._query.push(t),this},p.prototype.field=function(t,e){return this._formData||(this._formData=new d.FormData),this._formData.append(t,e),this},p.prototype.attach=function(t,e,n){return this._formData||(this._formData=new d.FormData),this._formData.append(t,e,n),this},p.prototype.send=function(t){var e=i(t),n=this.getHeader("Content-Type");if(e&&i(this._data))for(var r in t)this._data[r]=t[r];else"string"==typeof t?(n||this.type("form"),n=this.getHeader("Content-Type"),"application/x-www-form-urlencoded"==n?this._data=this._data?this._data+"&"+t:t:this._data=(this._data||"")+t):this._data=t;return!e||o(t)?this:(n||this.type("json"),this)},p.prototype.callback=function(t,e){var n=this._callback;this.clearTimeout(),n(t,e)},p.prototype.crossDomainError=function(){var t=new Error("Origin is not allowed by Access-Control-Allow-Origin");t.crossDomain=!0,this.callback(t)},p.prototype.timeoutError=function(){var t=this._timeout,e=new Error("timeout of "+t+"ms exceeded");e.timeout=t,this.callback(e)},p.prototype.withCredentials=function(){return this._withCredentials=!0,this},p.prototype.end=function(t){var e=this,n=this.xhr=l.getXHR(),i=this._query.join("&"),s=this._timeout,a=this._formData||this._data;this._callback=t||r,n.onreadystatechange=function(){if(4==n.readyState){var t;try{t=n.status}catch(r){t=0}if(0==t){if(e.timedout)return e.timeoutError();if(e.aborted)return;return e.crossDomainError()}e.emit("end")}};var u=function(t){t.total>0&&(t.percent=t.loaded/t.total*100),e.emit("progress",t)};this.hasListeners("progress")&&(n.onprogress=u);try{n.upload&&this.hasListeners("progress")&&(n.upload.onprogress=u)}catch(c){}if(s&&!this._timer&&(this._timer=setTimeout(function(){e.timedout=!0,e.abort()},s)),i&&(i=l.serializeObject(i),this.url+=~this.url.indexOf("?")?"&"+i:"?"+i),n.open(this.method,this.url,!0),this._withCredentials&&(n.withCredentials=!0),"GET"!=this.method&&"HEAD"!=this.method&&"string"!=typeof a&&!o(a)){var h=this.getHeader("Content-Type"),f=l.serialize[h?h.split(";")[0]:""];f&&(a=f(a))}for(var p in this.header)null!=this.header[p]&&n.setRequestHeader(p,this.header[p]);return this.emit("request",this),n.send(a),this},p.prototype.then=function(t,e){return this.end(function(n,r){n?e(n):t(r)})},l.Request=p,l.get=function(t,e,n){var r=l("GET",t);return"function"==typeof e&&(n=e,e=null),e&&r.query(e),n&&r.end(n),r},l.head=function(t,e,n){var r=l("HEAD",t);return"function"==typeof e&&(n=e,e=null),e&&r.send(e),n&&r.end(n),r},l.del=function(t,e){var n=l("DELETE",t);return e&&n.end(e),n},l.patch=function(t,e,n){var r=l("PATCH",t);
return"function"==typeof e&&(n=e,e=null),e&&r.send(e),n&&r.end(n),r},l.post=function(t,e,n){var r=l("POST",t);return"function"==typeof e&&(n=e,e=null),e&&r.send(e),n&&r.end(n),r},l.put=function(t,e,n){var r=l("PUT",t);return"function"==typeof e&&(n=e,e=null),e&&r.send(e),n&&r.end(n),r},e.exports=l},{emitter:13,reduce:14}],13:[function(t,e,n){function r(t){return t?o(t):void 0}function o(t){for(var e in r.prototype)t[e]=r.prototype[e];return t}e.exports=r,r.prototype.on=r.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks[t]=this._callbacks[t]||[]).push(e),this},r.prototype.once=function(t,e){function n(){r.off(t,n),e.apply(this,arguments)}var r=this;return this._callbacks=this._callbacks||{},n.fn=e,this.on(t,n),this},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n=this._callbacks[t];if(!n)return this;if(1==arguments.length)return delete this._callbacks[t],this;for(var r,o=0;o<n.length;o++)if(r=n[o],r===e||r.fn===e){n.splice(o,1);break}return this},r.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),n=this._callbacks[t];if(n){n=n.slice(0);for(var r=0,o=n.length;o>r;++r)n[r].apply(this,e)}return this},r.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks[t]||[]},r.prototype.hasListeners=function(t){return!!this.listeners(t).length}},{}],14:[function(t,e,n){e.exports=function(t,e,n){for(var r=0,o=t.length,i=3==arguments.length?n:t[r++];o>r;)i=e.call(null,i,t[r],++r,t);return i}},{}],15:[function(t,e,n){function r(t){this.value=t}function o(t,e,n){var r=[],o=[],s=!0;return function a(t){function u(){if("object"==typeof p.node&&null!==p.node){p.keys&&p.node_===p.node||(p.keys=d(p.node)),p.isLeaf=0==p.keys.length;for(var e=0;e<o.length;e++)if(o[e].node_===t){p.circular=o[e];break}}else p.isLeaf=!0,p.keys=null;p.notLeaf=!p.isLeaf,p.notRoot=!p.isRoot}var c=n?i(t):t,h={},f=!0,p={node:c,node_:t,path:[].concat(r),parent:o[o.length-1],parents:o,key:r.slice(-1)[0],isRoot:0===r.length,level:r.length,circular:null,update:function(t,e){p.isRoot||(p.parent.node[p.key]=t),p.node=t,e&&(f=!1)},"delete":function(t){delete p.parent.node[p.key],t&&(f=!1)},remove:function(t){y(p.parent.node)?p.parent.node.splice(p.key,1):delete p.parent.node[p.key],t&&(f=!1)},keys:null,before:function(t){h.before=t},after:function(t){h.after=t},pre:function(t){h.pre=t},post:function(t){h.post=t},stop:function(){s=!1},block:function(){f=!1}};if(!s)return p;u();var l=e.call(p,p.node);return void 0!==l&&p.update&&p.update(l),h.before&&h.before.call(p,p.node),f?("object"!=typeof p.node||null===p.node||p.circular||(o.push(p),u(),m(p.keys,function(t,e){r.push(t),h.pre&&h.pre.call(p,p.node[t],t);var o=a(p.node[t]);n&&v.call(p.node,t)&&(p.node[t]=o.node),o.isLast=e==p.keys.length-1,o.isFirst=0==e,h.post&&h.post.call(p,o),r.pop()}),o.pop()),h.after&&h.after.call(p,p.node),p):p}(t).node}function i(t){if("object"==typeof t&&null!==t){var e;if(y(t))e=[];else if(a(t))e=new Date(t.getTime?t.getTime():t);else if(u(t))e=new RegExp(t);else if(c(t))e={message:t.message};else if(h(t))e=new Boolean(t);else if(f(t))e=new Number(t);else if(p(t))e=new String(t);else if(Object.create&&Object.getPrototypeOf)e=Object.create(Object.getPrototypeOf(t));else if(t.constructor===Object)e={};else{var n=t.constructor&&t.constructor.prototype||t.__proto__||{},r=function(){};r.prototype=n,e=new r}return m(d(t),function(n){e[n]=t[n]}),e}return t}function s(t){return Object.prototype.toString.call(t)}function a(t){return"[object Date]"===s(t)}function u(t){return"[object RegExp]"===s(t)}function c(t){return"[object Error]"===s(t)}function h(t){return"[object Boolean]"===s(t)}function f(t){return"[object Number]"===s(t)}function p(t){return"[object String]"===s(t)}var l=e.exports=function(t){return new r(t)};r.prototype.get=function(t){for(var e=this.value,n=0;n<t.length;n++){var r=t[n];if(!e||!v.call(e,r)){e=void 0;break}e=e[r]}return e},r.prototype.has=function(t){for(var e=this.value,n=0;n<t.length;n++){var r=t[n];if(!e||!v.call(e,r))return!1;e=e[r]}return!0},r.prototype.set=function(t,e){for(var n=this.value,r=0;r<t.length-1;r++){var o=t[r];v.call(n,o)||(n[o]={}),n=n[o]}return n[t[r]]=e,e},r.prototype.map=function(t){return o(this.value,t,!0)},r.prototype.forEach=function(t){return this.value=o(this.value,t,!1),this.value},r.prototype.reduce=function(t,e){var n=1===arguments.length,r=n?this.value:e;return this.forEach(function(e){this.isRoot&&n||(r=t.call(this,r,e))}),r},r.prototype.paths=function(){var t=[];return this.forEach(function(e){t.push(this.path)}),t},r.prototype.nodes=function(){var t=[];return this.forEach(function(e){t.push(this.node)}),t},r.prototype.clone=function(){var t=[],e=[];return function n(r){for(var o=0;o<t.length;o++)if(t[o]===r)return e[o];if("object"==typeof r&&null!==r){var s=i(r);return t.push(r),e.push(s),m(d(r),function(t){s[t]=n(r[t])}),t.pop(),e.pop(),s}return r}(this.value)};var d=Object.keys||function(t){var e=[];for(var n in t)e.push(n);return e},y=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},m=function(t,e){if(t.forEach)return t.forEach(e);for(var n=0;n<t.length;n++)e(t[n],n,t)};m(d(r.prototype),function(t){l[t]=function(e){var n=[].slice.call(arguments,1),o=new r(e);return o[t].apply(o,n)}});var v=Object.hasOwnProperty||function(t,e){return e in t}},{}]},{},[1])(1)});