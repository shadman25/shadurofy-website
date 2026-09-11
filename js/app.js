const defaultProducts = [
 {id:1,name:"Premium Wellness Oil",category:"Wellness",price:499,description:"A demonstration product with a premium presentation and informative description.",initials:"WO",active:true},
 {id:2,name:"Daily Care Face Wash",category:"Personal Care",price:299,description:"A sample daily-care product used to demonstrate the catalogue experience.",initials:"FC",active:true},
 {id:3,name:"Herbal Care Serum",category:"Hair Care",price:599,description:"A dummy product entry for testing product cards and admin management.",initials:"HS",active:true},
 {id:4,name:"Advanced Care Cream",category:"Skin Care",price:449,description:"Example product content that can later be replaced with real company information.",initials:"AC",active:true},
 {id:5,name:"Daily Vitality Tablets",category:"Wellness",price:699,description:"Demo catalogue content for testing categories, search and filtering.",initials:"VT",active:true},
 {id:6,name:"Gentle Body Lotion",category:"Personal Care",price:349,description:"A sample product for the Shad-Urofy demonstration website.",initials:"BL",active:true}
];

function getProducts(){
  const saved=localStorage.getItem("shadurofy_products");
  if(!saved){localStorage.setItem("shadurofy_products",JSON.stringify(defaultProducts));return [...defaultProducts]}
  try{return JSON.parse(saved)}catch{return [...defaultProducts]}
}
function saveProducts(products){localStorage.setItem("shadurofy_products",JSON.stringify(products))}
function money(v){return "₹"+Number(v).toLocaleString("en-IN")}
function card(p){
 return `<article class="product-card"><div class="product-image">${escapeHtml(p.initials || p.name.slice(0,2).toUpperCase())}</div><div class="product-body"><span class="category">${escapeHtml(p.category)}</span><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.description)}</p><div class="price">${money(p.price)}</div></div></article>`;
}
function renderProducts(id,limit=null){
 const el=document.getElementById(id); if(!el)return;
 let products=getProducts().filter(p=>p.active!==false);
 if(limit)products=products.slice(0,limit);
 el.innerHTML=products.length?products.map(card).join(""):`<div class="empty">No products available.</div>`;
}
function initProductsPage(){
 const products=getProducts().filter(p=>p.active!==false), grid=document.getElementById("allProducts"), search=document.getElementById("searchInput"), filter=document.getElementById("categoryFilter");
 [...new Set(products.map(p=>p.category))].sort().forEach(c=>filter.insertAdjacentHTML("beforeend",`<option>${escapeHtml(c)}</option>`));
 function draw(){const q=search.value.toLowerCase().trim(), cat=filter.value; const out=products.filter(p=>(cat==="all"||p.category===cat)&&(`${p.name} ${p.description} ${p.category}`).toLowerCase().includes(q)); grid.innerHTML=out.length?out.map(card).join(""):`<div class="empty">No matching products found.</div>`}
 search.addEventListener("input",draw);filter.addEventListener("change",draw);draw();
}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
document.addEventListener("DOMContentLoaded",()=>{const b=document.querySelector(".menu-btn"),n=document.querySelector(".nav nav");if(b)b.addEventListener("click",()=>n.classList.toggle("open"));});