/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-audio-canvas-cssanimations-csstransforms-emoji-localstorage-requestanimationframe !*/
!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,a,i,s;for(var u in g)if(g.hasOwnProperty(u)){if(e=[],n=g[u],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],s=i.split("."),1===s.length?Modernizr[s[0]]=o:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=o),x.push((o?"":"no-")+s.join("-"))}}function a(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):T?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function i(e,n){return!!~(""+e).indexOf(n)}function s(){var e=n.body;return e||(e=a(T?"svg":"body"),e.fake=!0),e}function u(e,t,r,o){var i,u,l,f,d="modernizr",c=a("div"),p=s();if(parseInt(r,10))for(;r--;)l=a("div"),l.id=o?o[r]:d+(r+1),c.appendChild(l);return i=a("style"),i.type="text/css",i.id="s"+d,(p.fake?p:c).appendChild(i),p.appendChild(c),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(n.createTextNode(e)),c.id=d,p.fake&&(p.style.background="",p.style.overflow="hidden",f=C.style.overflow,C.style.overflow="hidden",C.appendChild(p)),u=t(c,e),p.fake?(p.parentNode.removeChild(p),C.style.overflow=f,C.offsetHeight):c.parentNode.removeChild(c),!!u}function l(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function f(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(l(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var a=[];o--;)a.push("("+l(n[o])+":"+r+")");return a=a.join(" or "),u("@supports ("+a+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function d(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function c(e,n,o,s){function u(){c&&(delete P.style,delete P.modElem)}if(s=r(s,"undefined")?!1:s,!r(o,"undefined")){var l=f(e,o);if(!r(l,"undefined"))return l}for(var c,p,m,v,y,g=["modernizr","tspan"];!P.style;)c=!0,P.modElem=a(g.shift()),P.style=P.modElem.style;for(m=e.length,p=0;m>p;p++)if(v=e[p],y=P.style[v],i(v,"-")&&(v=d(v)),P.style[v]!==t){if(s||r(o,"undefined"))return u(),"pfx"==n?v:!0;try{P.style[v]=o}catch(h){}if(P.style[v]!=y)return u(),"pfx"==n?v:!0}return u(),!1}function p(e,n){return function(){return e.apply(n,arguments)}}function m(e,n,t){var o;for(var a in e)if(e[a]in n)return t===!1?e[a]:(o=n[e[a]],r(o,"function")?p(o,t||n):o);return!1}function v(e,n,t,o,a){var i=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+S.join(i+" ")+i).split(" ");return r(n,"string")||r(n,"undefined")?c(s,n,o,a):(s=(e+" "+z.join(i+" ")+i).split(" "),m(s,n,t))}function y(e,n,r){return v(e,t,t,n,r)}var g=[],h={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){g.push({name:e,fn:n,options:t})},addAsyncTest:function(e){g.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=h,Modernizr=new Modernizr;var x=[],C=n.documentElement,T="svg"===C.nodeName.toLowerCase();Modernizr.addTest("audio",function(){var e=a("audio"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/,""),n.opus=e.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(t){}return n}),Modernizr.addTest("canvas",function(){var e=a("canvas");return!(!e.getContext||!e.getContext("2d"))}),Modernizr.addTest("canvastext",function(){return Modernizr.canvas===!1?!1:"function"==typeof a("canvas").getContext("2d").fillText}),Modernizr.addTest("emoji",function(){if(!Modernizr.canvastext)return!1;var n=e.devicePixelRatio||1,t=12*n,r=a("canvas"),o=r.getContext("2d");return o.fillStyle="#f00",o.textBaseline="top",o.font="32px Arial",o.fillText("🐨",0,0),0!==o.getImageData(t,t,1,1).data[0]});var w="Moz O ms Webkit",S=h._config.usePrefixes?w.split(" "):[];h._cssomPrefixes=S;var _={elem:a("modernizr")};Modernizr._q.push(function(){delete _.elem});var P={style:_.elem.style};Modernizr._q.unshift(function(){delete P.style});var z=h._config.usePrefixes?w.toLowerCase().split(" "):[];h._domPrefixes=z,h.testAllProps=v;var A=function(n){var r,o=prefixes.length,a=e.CSSRule;if("undefined"==typeof a)return t;if(!n)return!1;if(n=n.replace(/^@/,""),r=n.replace(/-/g,"_").toUpperCase()+"_RULE",r in a)return"@"+n;for(var i=0;o>i;i++){var s=prefixes[i],u=s.toUpperCase()+"_"+r;if(u in a)return"@-"+s.toLowerCase()+"-"+n}return!1};h.atRule=A;var E=h.prefixed=function(e,n,t){return 0===e.indexOf("@")?A(e):(-1!=e.indexOf("-")&&(e=d(e)),n?v(e,n,t):v(e,"pfx"))};Modernizr.addTest("requestanimationframe",!!E("requestAnimationFrame",e),{aliases:["raf"]}),h.testAllProps=y,Modernizr.addTest("cssanimations",y("animationName","a",!0)),Modernizr.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&y("transform","scale(1)",!0)}),Modernizr.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(n){return!1}}),o(),delete h.addTest,delete h.addAsyncTest;for(var b=0;b<Modernizr._q.length;b++)Modernizr._q[b]();e.Modernizr=Modernizr}(window,document);