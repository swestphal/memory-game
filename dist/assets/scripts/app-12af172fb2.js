!function(e){var t={};function n(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";!function(){var e=document.getElementById("card-click-counter"),t=document.getElementById("card-star-rating"),n=document.getElementById("card-timer"),i=document.getElementById("field-table"),a=document.getElementById("game-restart"),r=document.getElementById("game-level-hint"),o=document.getElementById("game-level-input"),l=document.getElementById("game-level"),d=document.getElementById("field"),c=document.getElementById("myAudio"),s=document.getElementsByClassName("modal__close"),m=document.getElementById("modal-congrat-moves"),u=document.getElementById("modal-congrat-time"),f=document.getElementById("header-info"),v=document.getElementById("modal-show-hitlist"),g=9,p=!0,h=0,E=0,y=!1,I=!1,L=void 0,C=void 0,b=void 0,x=void 0,T=0,B=void 0,M=void 0,k=void 0,S=!1,w=[];function O(){document.addEventListener("DOMContentLoaded",F,!1),h=0,E=0,y=!1,I=!1,x=999,S=!1,w=[];for(var a=document.getElementById("field-table");a.firstChild;)a.removeChild(a.firstChild);r.classList.remove("show"),N(),q(),D(),clearInterval(L),n.innerText="00:00:00",d.addEventListener("click",j),e.innerText=0,t.innerText="***",function(){g%2!=0&&(p=!0);if(1==p){p=!0,w.push({matchingPair:999,isOpen:!1,isMatching:!1,isClickable:!1,img:"odd"})}for(var e=0;e<Math.floor(g/2);e++){var t={matchingPair:e,isOpen:!1,isMatching:!1,isClickable:!0,img:"dog"+J(e+1)};w.push(t),w.push(t)}!function(){var e=w.length;for(;e>0;){var t=Math.floor(Math.random()*e),n=w[--e];w[e]=w[t],w[t]=n}!function(){for(var e=0;e<Math.sqrt(g);e++){for(var t=document.createElement("tr"),n=0;n<Math.sqrt(g);n++){var a=document.createElement("div"),r=document.createElement("td");r.className="field-table__card";var o=Math.sqrt(g)*e+n,l=document.createElement("IMG");0==w[o].isClickable?l.setAttribute("src","../../assets/images/pool/1x/odd.png"):l.setAttribute("src","../../assets/images/pool/1x/paws.png"),l.setAttribute("alt","Train your Brain"),l.dataset.id=o,a.appendChild(l),a.classList.add("front");var d=document.createElement("div");d.classList.add("field-table__flipContainer"),d.appendChild(a),r.appendChild(d),t.appendChild(r)}i.appendChild(t)}}()}()}()}function A(){try{return localStorage.setItem("test","hitlist"),localStorage.removeItem("test"),!0}catch(e){return!1}}function _(){if(A())return JSON.parse(localStorage.getItem("hitlist"))}function z(e){if(A()){var t=_();null==t?t=[e]:t.push(e),t.length>6&&t.shift(),function(e){if(A())localStorage.setItem("hitlist",JSON.stringify(e))}(t)}}function q(){!function(e){for(;e.firstChild;)e.removeChild(e.firstChild)}(v);var e=document.createDocumentFragment(),t=document.createElement("ul"),n=_();if(n){for(var i=n.length-1;i>=0;i--){var a=document.createElement("li"),r=i+1+") "+n[i].fieldSize+" fields with "+n[i].moves+" moves in "+n[i].time;a.innerText=r,e.appendChild(a)}t.appendChild(e),v.appendChild(t)}else{var o=document.createElement("p");o.innerText="Sorry, but there are no games saved.",v.appendChild(o)}}function P(e,t){var n=document.getElementById(e);null==e&&(n=document.getElementById(t.target.parentElement.dataset.modalTarget)),N(),n.classList.add("fade-in")}function N(){for(var e=document.querySelectorAll(".fade-in"),t=0;t<e.length;t++)e[t].classList.remove("fade-in")}function D(){clearInterval(L)}function j(){d.removeEventListener("click",j),C=new Date,L=setInterval(function(){var e=(new Date).getTime()-C.getTime();B=Math.floor(e/36e5),e-=36e5*B,M=Math.floor(e/6e4),e-=1e3*M*60,k=Math.floor(e/1e3),n.innerText=J(B)+":"+J(M)+":"+J(k)}.bind(this),1e3)}function G(){if(y||0==h){i.classList.remove(l.innerText);var e=[{name:"terrier",size:9},{name:"bernese",size:16},{name:"puppy",size:4}];T++,e[T%=3].size%2==0&&(p=!1),l.innerText=e[T].name,g=e[T].size,i.classList.add(l.innerText),O()}else r.classList.add("show"),setTimeout(function(){r.classList.remove("show")},4e3)}function J(e){return(e=e.toString()).length<=1?"0"+e:e}function F(){d.addEventListener("click",j),d.addEventListener("click",function(n){var i,a,r,o;1!=I&&(a=(i=n).target.dataset.id,y||"img"==i.target.nodeName.toLowerCase()&&a&&a!=x&&1==w[a].isClickable&&(e.innerText=1+h++,function(){var e=h/g*100-100;switch(!0){case e<=25:b=3;break;case e<=50:b=2;break;case e<=90:b=1;break;default:b=0}t.innerText=function(e){for(var t="",n=0;n<e;n++)t+="*";return t}(b)}(),r=a,o=i.target.parentElement.parentElement,1==S?(I=!0,H(o,r),w[x].matchingPair==w[r].matchingPair?(setTimeout(function(){w[x].isMatching=!0,w[r].isMatching=!0;for(var e=document.querySelectorAll(".open"),t=0;t<e.length;t++)e[t].classList.remove("open"),e[t].classList.add("matching");x=999,I=!1},1e3),S=!1,++E>=Math.floor(g/2)&&(y=!0,D(),function(){P("modal-congrat");var e="";M>=1&&(e=M+" minutes and "),e+=k+" seconds.",m.innerText=h,u.innerText=e,z({fieldSize:g,moves:h,time:e}),q()}())):(setTimeout(function(){999!=x&&(w[x].isOpen=!1),w[r].isOpen=!1;for(var e=document.querySelectorAll(".open"),t=0;t<e.length;t++)e[t].classList.remove("open");x=999,I=!1},1500),S=!1)):(w[r].isOpen=!0,H(o,r),x=r,S=!0)))}),o.addEventListener("click",G),a.addEventListener("click",O);for(var n=0;n<s.length;n++)s[n].addEventListener("click",function(e){e.target.parentElement.parentElement.classList.remove("fade-in")},!1);f.addEventListener("click",function(e){P(null,e)})}function H(e,t){c.volume=.3,c.play(),e.parentElement.classList.add("open");var n=document.createElement("div");n.classList.add("back");var i=document.createElement("IMG");i.src="../../assets/images/pool/1x/"+w[t].img+".png",i.setAttribute("alt","Train your Brain"),n.appendChild(i),e.appendChild(n)}O()}()}]);