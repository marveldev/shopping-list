if(!self.define){let e,s={};const i=(i,c)=>(i=new URL(i+".js",c).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(c,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let o={};const a=e=>i(e,r),t={module:{uri:r},exports:o,require:a};s[r]=Promise.all(c.map((e=>t[e]||a(e)))).then((e=>(n(...e),o)))}}define(["./workbox-f2bd007a"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/edit-icon.svg",revision:"f9cda5acdc0699190e4db57bc61344e7"},{url:"assets/icon-192x192.png",revision:"36d1f5401b1c7856e9e9d8f8089023db"},{url:"assets/icon-256x256.png",revision:"f62fb24b9a2922ecc85d4c9af805cd7b"},{url:"assets/icon-384x384.png",revision:"622c63336453751a298748bd2ac5c85b"},{url:"assets/icon-512x512.png",revision:"3378781f5397f525d6aacd3dbb79bc8a"},{url:"assets/trash-icon.svg",revision:"38ab097b612eeb7bfb9bedc344bfbce2"},{url:"dexie.min.js",revision:"1e4a91f5cf779986845a7281859d8355"},{url:"index.css",revision:"c760e5f18a3c0ac65ec6144282cc3195"},{url:"index.html",revision:"7caa660bdc3ea2427c18ca3ccad82975"},{url:"index.js",revision:"02b289ca70e552828492723fb5d96142"},{url:"manifest.json",revision:"ab4952fad1b71115f70515a549364aea"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
