!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.JsonRefs=t()}}(function(){var t;return function e(t,n,r){function o(s,a){if(!n[s]){if(!t[s]){var h="function"==typeof require&&require;if(!a&&h)return h(s,!0);if(i)return i(s,!0);var f=new Error("Cannot find module '"+s+"'");throw f.code="MODULE_NOT_FOUND",f}var u=n[s]={exports:{}};t[s][0].call(u.exports,function(e){var n=t[s][1][e];return o(n?n:e)},u,u.exports,e,t,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(t,e,n){(function(n){"use strict";function r(t,e){var n=l[t],r=Promise.resolve(),o=-1===t.indexOf(":")?void 0:t.split(":")[0];return h.isUndefined(n)?-1!==p.indexOf(o)||h.isUndefined(o)?(r=f.load(t,e),r=e.processContent?r.then(function(n){return e.processContent(n,t)}):r.then(JSON.parse),r=r.then(function(e){return l[t]=e,e})):r=r.then(function(){return Promise.reject(new Error("Unsupported remote reference scheme: "+o))}):r=r.then(function(){return n}),r=r.then(function(t){return h.cloneDeep(t)})}function o(t,e){var n=g(t);return y(e)&&(e=-1===e.indexOf("#")?"#":e.substring(e.indexOf("#"))),m(n.concat(g(e))).replace(/\/\$ref/g,"")}function i(t,e){function n(t){".."===t?o.pop():"."!==t&&o.push(t)}var r="#"!==e.charAt(0)&&-1===e.indexOf(":"),o=[],i=(e.indexOf("#")>-1?e.split("#")[0]:e).split("/");return t&&(t.indexOf("#")>-1&&(t=t.substring(0,t.indexOf("#"))),t.length>1&&"/"===t[t.length-1]&&(t=t.substring(0,t.length-1)),t.split("#")[0].split("/").forEach(n)),r?i.forEach(n):o=i,o.join("/")}function s(t,e,n){function r(t){var e=t.slice(0,t.lastIndexOf("allOf")),o=n[m(e)];return h.isUndefined(o)?e.indexOf("allOf")>-1?r(e):void 0:m(e)}function i(t){var e=[],o=t.map(function(){var t,o=m(this.path),i=n[o];this.circular&&(e.push(o),h.isUndefined(i)&&(t=r(this.path),i=n[t]),h.isUndefined(i)||(i.circular=!0),0===a?this.update({}):this.update(u(this.node).map(function(){this.circular&&this.parent.update({})})))});return h.each(e,function(t){var e,n=[],r=g(t),i=u(o).get(r);for(e=0;a>e;e++)n.push.apply(n,r),u(o).set(n,h.cloneDeep(i))}),o}function s(t,e){var r=o(e,"#"),i=t=-1===t.indexOf("#")?"#":t.substring(t.indexOf("#")),s=g(i),a=!f.has(s),h=f.get(s),u=g(e),c=u.slice(0,u.length-1),l=n[r]||{ref:t};a?l.missing=!0:0===c.length?(f.value===h&&(h={},l.circular=!0),f.value=h):(f.get(c)===h&&(h={},l.circular=!0),f.set(c,h)),n[r]=l}var a=h.isUndefined(e.depth)?1:e.depth,f=u(t);return h.each(v(t),function(t,e){y(t)||s(t,e)}),h.isUndefined(e.location)||h.each(n,function(t){var n=t.ref;0===n.indexOf(e.location)&&(n=n.substring(e.location.length),"/"===n.charAt(0)&&(n=n.substring(1))),t.ref=n}),{metadata:n,resolved:i(f)}}function a(t,e,n,f,l){function p(t,e,r,i,s){var a,c=r+("#"===i?"":i),p=o(n,t),d=l[p]||{},m=g(t);h.isUndefined(s)?(d.circular=!0,a=f[r].ref):(a=u(s).get(g(i)),h.isUndefined(a)?d.missing=!0:a.$ref?a=a.$ref:m.pop()),0===m.length?j.value=a:j.set(m,a),d.ref=c,l[p]=d}function d(){return{metadata:l,resolved:j.value}}var m,w,b=Promise.resolve(),j=u(t),x=c.parse(""+t.id);return null!==x.protocol&&(delete x.hash,w=c.format(x)),h.each(v(t),function(s,u){y(s)&&(b=b.then(function(){var c=i(e.location,s),d=s.split("#"),v="#"+(d[1]||"");return h.isUndefined(f[c])?(m=function(t){var r=d[0],m=h.cloneDeep(e),y=o(n,u);return r=r.substring(0,r.lastIndexOf("/")+1),m.location=i(e.location,r),h.isError(t)?void(l[y]={err:t,missing:!0,ref:s}):(f[c]={ref:n},a(t,m,y,f,l).then(function(t){return delete f[c],p(u,s,c,v,t.resolved),t}))},w===c?m(t):r(c,e).then(function(t){return t},function(t){return t}).then(m)):void p(u,s,c,v)}))}),b=b.then(function(){s(j.value,e,l)}).then(d,d)}"undefined"==typeof Promise&&t("native-promise-only");var h=t("./lib/utils"),f="undefined"!=typeof window?window.PathLoader:"undefined"!=typeof n?n.PathLoader:null,u="undefined"!=typeof window?window.traverse:"undefined"!=typeof n?n.traverse:null,c=t("url"),l={},p=["file","http","https"];e.exports.clearCache=function(){l={}};var d=e.exports.isJsonReference=function(t){return h.isPlainObject(t)&&h.isString(t.$ref)},m=e.exports.pathToPointer=function(t){if(h.isUndefined(t))throw new Error("path is required");if(!h.isArray(t))throw new Error("path must be an array");var e="#";return t.length>0&&(e+="/"+t.map(function(t){return t.replace(/~/g,"~0").replace(/\//g,"~1")}).join("/")),e},v=e.exports.findRefs=function(t){if(h.isUndefined(t))throw new Error("json is required");if(!h.isPlainObject(t))throw new Error("json must be an object");return u(t).reduce(function(t){var e=this.node;return"$ref"===this.key&&d(this.parent.node)&&(t[m(this.path)]=e),t},{})},y=e.exports.isRemotePointer=function(t){if(h.isUndefined(t))throw new Error("ptr is required");if(!h.isString(t))throw new Error("ptr must be a string");return""!==t&&"#"!==t.charAt(0)},g=e.exports.pathFromPointer=function(t){if(h.isUndefined(t))throw new Error("ptr is required");if(!h.isString(t))throw new Error("ptr must be a string");var e=[],n=["","#","#/"];return y(t)?e=t:-1===n.indexOf(t)&&"#"===t.charAt(0)&&(e=t.substring(t.indexOf("/")).split("/").reduce(function(t,e){return""!==e&&t.push(e.replace(/~0/g,"~").replace(/~1/g,"/")),t},[])),e};e.exports.resolveRefs=function(t,e,n){var r=Promise.resolve();return 2===arguments.length&&h.isFunction(e)&&(n=e,e={}),h.isUndefined(e)&&(e={}),r=r.then(function(){if(h.isUndefined(t))throw new Error("json is required");if(!h.isPlainObject(t))throw new Error("json must be an object");if(!h.isPlainObject(e))throw new Error("options must be an object");if(!h.isUndefined(n)&&!h.isFunction(n))throw new Error("done must be a function");if(!h.isUndefined(e.processContent)&&!h.isFunction(e.processContent))throw new Error("options.processContent must be a function");if(!h.isUndefined(e.prepareRequest)&&!h.isFunction(e.prepareRequest))throw new Error("options.prepareRequest must be a function");if(!h.isUndefined(e.location)&&!h.isString(e.location))throw new Error("options.location must be a string");if(!h.isUndefined(e.depth)&&!h.isNumber(e.depth))throw new Error("options.depth must be a number");if(!h.isUndefined(e.depth)&&e.depth<0)throw new Error("options.depth must be greater or equal to zero")}),t=u(t).clone(),e=u(e).clone(),r=r.then(function(){return a(t,e,"#",{},{})}).then(function(t){return s(t.resolved,e,t.metadata)}),!h.isUndefined(n)&&h.isFunction(n)&&(r=r.then(function(t){n(void 0,t.resolved,t.metadata)},function(t){n(t)})),r}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./lib/utils":2,"native-promise-only":8,url:7}],2:[function(t,e,n){(function(t){"use strict";function n(t,e){return Object.prototype.toString.call(t)==="[object "+e+"]"}var r="undefined"!=typeof window?window.traverse:"undefined"!=typeof t?t.traverse:null;e.exports.cloneDeep=function(t){return r(t).clone()};var o=e.exports.isArray=function(t){return n(t,"Array")};e.exports.isError=function(t){return n(t,"Error")},e.exports.isFunction=function(t){return n(t,"Function")},e.exports.isNumber=function(t){return n(t,"Number")};var i=e.exports.isPlainObject=function(t){return n(t,"Object")};e.exports.isString=function(t){return n(t,"String")},e.exports.isUndefined=function(t){return"undefined"==typeof t},e.exports.each=function(t,e){o(t)?t.forEach(e):i(t)&&Object.keys(t).forEach(function(n){e(t[n],n)})}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],3:[function(e,n,r){(function(e){!function(o){function i(t){throw RangeError(T[t])}function s(t,e){for(var n=t.length,r=[];n--;)r[n]=e(t[n]);return r}function a(t,e){var n=t.split("@"),r="";n.length>1&&(r=n[0]+"@",t=n[1]),t=t.replace(N,".");var o=t.split("."),i=s(o,e).join(".");return r+i}function h(t){for(var e,n,r=[],o=0,i=t.length;i>o;)e=t.charCodeAt(o++),e>=55296&&56319>=e&&i>o?(n=t.charCodeAt(o++),56320==(64512&n)?r.push(((1023&e)<<10)+(1023&n)+65536):(r.push(e),o--)):r.push(e);return r}function f(t){return s(t,function(t){var e="";return t>65535&&(t-=65536,e+=k(t>>>10&1023|55296),t=56320|1023&t),e+=k(t)}).join("")}function u(t){return 10>t-48?t-22:26>t-65?t-65:26>t-97?t-97:O}function c(t,e){return t+22+75*(26>t)-((0!=e)<<5)}function l(t,e,n){var r=0;for(t=n?S(t/q):t>>1,t+=S(t/e);t>F*U>>1;r+=O)t=S(t/F);return S(r+(F+1)*t/(t+A))}function p(t){var e,n,r,o,s,a,h,c,p,d,m=[],v=t.length,y=0,g=P,w=C;for(n=t.lastIndexOf(I),0>n&&(n=0),r=0;n>r;++r)t.charCodeAt(r)>=128&&i("not-basic"),m.push(t.charCodeAt(r));for(o=n>0?n+1:0;v>o;){for(s=y,a=1,h=O;o>=v&&i("invalid-input"),c=u(t.charCodeAt(o++)),(c>=O||c>S((x-y)/a))&&i("overflow"),y+=c*a,p=w>=h?E:h>=w+U?U:h-w,!(p>c);h+=O)d=O-p,a>S(x/d)&&i("overflow"),a*=d;e=m.length+1,w=l(y-s,e,0==s),S(y/e)>x-g&&i("overflow"),g+=S(y/e),y%=e,m.splice(y++,0,g)}return f(m)}function d(t){var e,n,r,o,s,a,f,u,p,d,m,v,y,g,w,b=[];for(t=h(t),v=t.length,e=P,n=0,s=C,a=0;v>a;++a)m=t[a],128>m&&b.push(k(m));for(r=o=b.length,o&&b.push(I);v>r;){for(f=x,a=0;v>a;++a)m=t[a],m>=e&&f>m&&(f=m);for(y=r+1,f-e>S((x-n)/y)&&i("overflow"),n+=(f-e)*y,e=f,a=0;v>a;++a)if(m=t[a],e>m&&++n>x&&i("overflow"),m==e){for(u=n,p=O;d=s>=p?E:p>=s+U?U:p-s,!(d>u);p+=O)w=u-d,g=O-d,b.push(k(c(d+w%g,0))),u=S(w/g);b.push(k(c(u,0))),s=l(n,y,r==o),n=0,++r}++n,++e}return b.join("")}function m(t){return a(t,function(t){return _.test(t)?p(t.slice(4).toLowerCase()):t})}function v(t){return a(t,function(t){return R.test(t)?"xn--"+d(t):t})}var y="object"==typeof r&&r&&!r.nodeType&&r,g="object"==typeof n&&n&&!n.nodeType&&n,w="object"==typeof e&&e;(w.global===w||w.window===w||w.self===w)&&(o=w);var b,j,x=2147483647,O=36,E=1,U=26,A=38,q=700,C=72,P=128,I="-",_=/^xn--/,R=/[^\x20-\x7E]/,N=/[\x2E\u3002\uFF0E\uFF61]/g,T={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},F=O-E,S=Math.floor,k=String.fromCharCode;if(b={version:"1.3.2",ucs2:{decode:h,encode:f},decode:p,encode:d,toASCII:v,toUnicode:m},"function"==typeof t&&"object"==typeof t.amd&&t.amd)t("punycode",function(){return b});else if(y&&g)if(n.exports==y)g.exports=b;else for(j in b)b.hasOwnProperty(j)&&(y[j]=b[j]);else o.punycode=b}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],4:[function(t,e,n){"use strict";function r(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.exports=function(t,e,n,i){e=e||"&",n=n||"=";var s={};if("string"!=typeof t||0===t.length)return s;var a=/\+/g;t=t.split(e);var h=1e3;i&&"number"==typeof i.maxKeys&&(h=i.maxKeys);var f=t.length;h>0&&f>h&&(f=h);for(var u=0;f>u;++u){var c,l,p,d,m=t[u].replace(a,"%20"),v=m.indexOf(n);v>=0?(c=m.substr(0,v),l=m.substr(v+1)):(c=m,l=""),p=decodeURIComponent(c),d=decodeURIComponent(l),r(s,p)?o(s[p])?s[p].push(d):s[p]=[s[p],d]:s[p]=d}return s};var o=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},{}],5:[function(t,e,n){"use strict";function r(t,e){if(t.map)return t.map(e);for(var n=[],r=0;r<t.length;r++)n.push(e(t[r],r));return n}var o=function(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}};e.exports=function(t,e,n,a){return e=e||"&",n=n||"=",null===t&&(t=void 0),"object"==typeof t?r(s(t),function(s){var a=encodeURIComponent(o(s))+n;return i(t[s])?r(t[s],function(t){return a+encodeURIComponent(o(t))}).join(e):a+encodeURIComponent(o(t[s]))}).join(e):a?encodeURIComponent(o(a))+n+encodeURIComponent(o(t)):""};var i=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},s=Object.keys||function(t){var e=[];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.push(n);return e}},{}],6:[function(t,e,n){"use strict";n.decode=n.parse=t("./decode"),n.encode=n.stringify=t("./encode")},{"./decode":4,"./encode":5}],7:[function(t,e,n){function r(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function o(t,e,n){if(t&&f(t)&&t instanceof r)return t;var o=new r;return o.parse(t,e,n),o}function i(t){return h(t)&&(t=o(t)),t instanceof r?t.format():r.prototype.format.call(t)}function s(t,e){return o(t,!1,!0).resolve(e)}function a(t,e){return t?o(t,!1,!0).resolveObject(e):e}function h(t){return"string"==typeof t}function f(t){return"object"==typeof t&&null!==t}function u(t){return null===t}function c(t){return null==t}var l=t("punycode");n.parse=o,n.resolve=s,n.resolveObject=a,n.format=i,n.Url=r;var p=/^([a-z0-9.+-]+:)/i,d=/:[0-9]*$/,m=["<",">",'"',"`"," ","\r","\n","	"],v=["{","}","|","\\","^","`"].concat(m),y=["'"].concat(v),g=["%","/","?",";","#"].concat(y),w=["/","?","#"],b=255,j=/^[a-z0-9A-Z_-]{0,63}$/,x=/^([a-z0-9A-Z_-]{0,63})(.*)$/,O={javascript:!0,"javascript:":!0},E={javascript:!0,"javascript:":!0},U={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},A=t("querystring");r.prototype.parse=function(t,e,n){if(!h(t))throw new TypeError("Parameter 'url' must be a string, not "+typeof t);var r=t;r=r.trim();var o=p.exec(r);if(o){o=o[0];var i=o.toLowerCase();this.protocol=i,r=r.substr(o.length)}if(n||o||r.match(/^\/\/[^@\/]+@[^@\/]+/)){var s="//"===r.substr(0,2);!s||o&&E[o]||(r=r.substr(2),this.slashes=!0)}if(!E[o]&&(s||o&&!U[o])){for(var a=-1,f=0;f<w.length;f++){var u=r.indexOf(w[f]);-1!==u&&(-1===a||a>u)&&(a=u)}var c,d;d=-1===a?r.lastIndexOf("@"):r.lastIndexOf("@",a),-1!==d&&(c=r.slice(0,d),r=r.slice(d+1),this.auth=decodeURIComponent(c)),a=-1;for(var f=0;f<g.length;f++){var u=r.indexOf(g[f]);-1!==u&&(-1===a||a>u)&&(a=u)}-1===a&&(a=r.length),this.host=r.slice(0,a),r=r.slice(a),this.parseHost(),this.hostname=this.hostname||"";var m="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!m)for(var v=this.hostname.split(/\./),f=0,q=v.length;q>f;f++){var C=v[f];if(C&&!C.match(j)){for(var P="",I=0,_=C.length;_>I;I++)P+=C.charCodeAt(I)>127?"x":C[I];if(!P.match(j)){var R=v.slice(0,f),N=v.slice(f+1),T=C.match(x);T&&(R.push(T[1]),N.unshift(T[2])),N.length&&(r="/"+N.join(".")+r),this.hostname=R.join(".");break}}}if(this.hostname.length>b?this.hostname="":this.hostname=this.hostname.toLowerCase(),!m){for(var F=this.hostname.split("."),S=[],f=0;f<F.length;++f){var k=F[f];S.push(k.match(/[^A-Za-z0-9_-]/)?"xn--"+l.encode(k):k)}this.hostname=S.join(".")}var $=this.port?":"+this.port:"",D=this.hostname||"";this.host=D+$,this.href+=this.host,m&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==r[0]&&(r="/"+r))}if(!O[i])for(var f=0,q=y.length;q>f;f++){var L=y[f],z=encodeURIComponent(L);z===L&&(z=escape(L)),r=r.split(L).join(z)}var J=r.indexOf("#");-1!==J&&(this.hash=r.substr(J),r=r.slice(0,J));var Z=r.indexOf("?");if(-1!==Z?(this.search=r.substr(Z),this.query=r.substr(Z+1),e&&(this.query=A.parse(this.query)),r=r.slice(0,Z)):e&&(this.search="",this.query={}),r&&(this.pathname=r),U[i]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var $=this.pathname||"",k=this.search||"";this.path=$+k}return this.href=this.format(),this},r.prototype.format=function(){var t=this.auth||"";t&&(t=encodeURIComponent(t),t=t.replace(/%3A/i,":"),t+="@");var e=this.protocol||"",n=this.pathname||"",r=this.hash||"",o=!1,i="";this.host?o=t+this.host:this.hostname&&(o=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(o+=":"+this.port)),this.query&&f(this.query)&&Object.keys(this.query).length&&(i=A.stringify(this.query));var s=this.search||i&&"?"+i||"";return e&&":"!==e.substr(-1)&&(e+=":"),this.slashes||(!e||U[e])&&o!==!1?(o="//"+(o||""),n&&"/"!==n.charAt(0)&&(n="/"+n)):o||(o=""),r&&"#"!==r.charAt(0)&&(r="#"+r),s&&"?"!==s.charAt(0)&&(s="?"+s),n=n.replace(/[?#]/g,function(t){return encodeURIComponent(t)}),s=s.replace("#","%23"),e+o+n+s+r},r.prototype.resolve=function(t){return this.resolveObject(o(t,!1,!0)).format()},r.prototype.resolveObject=function(t){if(h(t)){var e=new r;e.parse(t,!1,!0),t=e}var n=new r;if(Object.keys(this).forEach(function(t){n[t]=this[t]},this),n.hash=t.hash,""===t.href)return n.href=n.format(),n;if(t.slashes&&!t.protocol)return Object.keys(t).forEach(function(e){"protocol"!==e&&(n[e]=t[e])}),U[n.protocol]&&n.hostname&&!n.pathname&&(n.path=n.pathname="/"),n.href=n.format(),n;if(t.protocol&&t.protocol!==n.protocol){if(!U[t.protocol])return Object.keys(t).forEach(function(e){n[e]=t[e]}),n.href=n.format(),n;if(n.protocol=t.protocol,t.host||E[t.protocol])n.pathname=t.pathname;else{for(var o=(t.pathname||"").split("/");o.length&&!(t.host=o.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==o[0]&&o.unshift(""),o.length<2&&o.unshift(""),n.pathname=o.join("/")}if(n.search=t.search,n.query=t.query,n.host=t.host||"",n.auth=t.auth,n.hostname=t.hostname||t.host,n.port=t.port,n.pathname||n.search){var i=n.pathname||"",s=n.search||"";n.path=i+s}return n.slashes=n.slashes||t.slashes,n.href=n.format(),n}var a=n.pathname&&"/"===n.pathname.charAt(0),f=t.host||t.pathname&&"/"===t.pathname.charAt(0),l=f||a||n.host&&t.pathname,p=l,d=n.pathname&&n.pathname.split("/")||[],o=t.pathname&&t.pathname.split("/")||[],m=n.protocol&&!U[n.protocol];if(m&&(n.hostname="",n.port=null,n.host&&(""===d[0]?d[0]=n.host:d.unshift(n.host)),n.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===o[0]?o[0]=t.host:o.unshift(t.host)),t.host=null),l=l&&(""===o[0]||""===d[0])),f)n.host=t.host||""===t.host?t.host:n.host,n.hostname=t.hostname||""===t.hostname?t.hostname:n.hostname,n.search=t.search,n.query=t.query,d=o;else if(o.length)d||(d=[]),d.pop(),d=d.concat(o),n.search=t.search,n.query=t.query;else if(!c(t.search)){if(m){n.hostname=n.host=d.shift();var v=n.host&&n.host.indexOf("@")>0?n.host.split("@"):!1;v&&(n.auth=v.shift(),n.host=n.hostname=v.shift())}return n.search=t.search,n.query=t.query,u(n.pathname)&&u(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.href=n.format(),n}if(!d.length)return n.pathname=null,n.search?n.path="/"+n.search:n.path=null,n.href=n.format(),n;for(var y=d.slice(-1)[0],g=(n.host||t.host)&&("."===y||".."===y)||""===y,w=0,b=d.length;b>=0;b--)y=d[b],"."==y?d.splice(b,1):".."===y?(d.splice(b,1),w++):w&&(d.splice(b,1),w--);if(!l&&!p)for(;w--;w)d.unshift("..");!l||""===d[0]||d[0]&&"/"===d[0].charAt(0)||d.unshift(""),g&&"/"!==d.join("/").substr(-1)&&d.push("");var j=""===d[0]||d[0]&&"/"===d[0].charAt(0);if(m){n.hostname=n.host=j?"":d.length?d.shift():"";var v=n.host&&n.host.indexOf("@")>0?n.host.split("@"):!1;v&&(n.auth=v.shift(),n.host=n.hostname=v.shift())}return l=l||n.host&&d.length,l&&!j&&d.unshift(""),d.length?n.pathname=d.join("/"):(n.pathname=null,n.path=null),u(n.pathname)&&u(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.auth=t.auth||n.auth,n.slashes=n.slashes||t.slashes,n.href=n.format(),n},r.prototype.parseHost=function(){var t=this.host,e=d.exec(t);e&&(e=e[0],":"!==e&&(this.port=e.substr(1)),t=t.substr(0,t.length-e.length)),t&&(this.hostname=t)}},{punycode:3,querystring:6}],8:[function(e,n,r){(function(e){!function(e,r,o){r[e]=r[e]||o(),"undefined"!=typeof n&&n.exports?n.exports=r[e]:"function"==typeof t&&t.amd&&t(function(){return r[e]})}("Promise","undefined"!=typeof e?e:this,function(){"use strict";function t(t,e){l.add(t,e),c||(c=d(l.drain))}function e(t){var e,n=typeof t;return null==t||"object"!=n&&"function"!=n||(e=t.then),"function"==typeof e?e:!1}function n(){for(var t=0;t<this.chain.length;t++)r(this,1===this.state?this.chain[t].success:this.chain[t].failure,this.chain[t]);this.chain.length=0}function r(t,n,r){var o,i;try{n===!1?r.reject(t.msg):(o=n===!0?t.msg:n.call(void 0,t.msg),o===r.promise?r.reject(TypeError("Promise-chain cycle")):(i=e(o))?i.call(o,r.resolve,r.reject):r.resolve(o))}catch(s){r.reject(s)}}function o(r){var s,h=this;if(!h.triggered){h.triggered=!0,h.def&&(h=h.def);try{(s=e(r))?t(function(){var t=new a(h);try{s.call(r,function(){o.apply(t,arguments)},function(){i.apply(t,arguments)})}catch(e){i.call(t,e)}}):(h.msg=r,h.state=1,h.chain.length>0&&t(n,h))}catch(f){i.call(new a(h),f)}}}function i(e){var r=this;r.triggered||(r.triggered=!0,r.def&&(r=r.def),r.msg=e,r.state=2,r.chain.length>0&&t(n,r))}function s(t,e,n,r){for(var o=0;o<e.length;o++)!function(o){t.resolve(e[o]).then(function(t){n(o,t)},r)}(o)}function a(t){this.def=t,this.triggered=!1}function h(t){this.promise=t,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function f(e){if("function"!=typeof e)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var r=new h(this);this.then=function(e,o){var i={success:"function"==typeof e?e:!0,failure:"function"==typeof o?o:!1};return i.promise=new this.constructor(function(t,e){if("function"!=typeof t||"function"!=typeof e)throw TypeError("Not a function");i.resolve=t,i.reject=e}),r.chain.push(i),0!==r.state&&t(n,r),i.promise},this["catch"]=function(t){return this.then(void 0,t)};try{e.call(void 0,function(t){o.call(r,t)},function(t){i.call(r,t)})}catch(s){i.call(r,s)}}var u,c,l,p=Object.prototype.toString,d="undefined"!=typeof setImmediate?function(t){return setImmediate(t)}:setTimeout;try{Object.defineProperty({},"x",{}),u=function(t,e,n,r){return Object.defineProperty(t,e,{value:n,writable:!0,configurable:r!==!1})}}catch(m){u=function(t,e,n){return t[e]=n,t}}l=function(){function t(t,e){this.fn=t,this.self=e,this.next=void 0}var e,n,r;return{add:function(o,i){r=new t(o,i),n?n.next=r:e=r,n=r,r=void 0},drain:function(){var t=e;for(e=n=c=void 0;t;)t.fn.call(t.self),t=t.next}}}();var v=u({},"constructor",f,!1);return f.prototype=v,u(v,"__NPO__",0,!1),u(f,"resolve",function(t){var e=this;return t&&"object"==typeof t&&1===t.__NPO__?t:new e(function(e,n){if("function"!=typeof e||"function"!=typeof n)throw TypeError("Not a function");e(t)})}),u(f,"reject",function(t){return new this(function(e,n){if("function"!=typeof e||"function"!=typeof n)throw TypeError("Not a function");n(t)})}),u(f,"all",function(t){var e=this;return"[object Array]"!=p.call(t)?e.reject(TypeError("Not an array")):0===t.length?e.resolve([]):new e(function(n,r){if("function"!=typeof n||"function"!=typeof r)throw TypeError("Not a function");var o=t.length,i=Array(o),a=0;s(e,t,function(t,e){i[t]=e,++a===o&&n(i)},r)})}),u(f,"race",function(t){var e=this;return"[object Array]"!=p.call(t)?e.reject(TypeError("Not an array")):new e(function(n,r){if("function"!=typeof n||"function"!=typeof r)throw TypeError("Not a function");s(e,t,function(t,e){n(e)},r)})}),f})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)});