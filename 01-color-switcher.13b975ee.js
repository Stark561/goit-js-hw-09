const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),a=document.body;let o;t.addEventListener("click",(()=>{o=setInterval((()=>{const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;a.style.backgroundColor=t}),1e3),t.disabled=!0})),e.addEventListener("click",(()=>{clearInterval(o),t.disabled=!1}));
//# sourceMappingURL=01-color-switcher.13b975ee.js.map