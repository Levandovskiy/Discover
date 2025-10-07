const bask = document.querySelector("#cart-items-container");
const script = document.createElement("script");

script.src = bask ? "./js/blocks/basket.js" : "./js/main.js";
script.defer = true;
script.type = "module";
document.body.appendChild(script);

console.log("Supermain.js loaded");
