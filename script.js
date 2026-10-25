document.documentElement.classList.add('js');
/* ========== DATA ========== */
/* Daftar warna: kode => [nama, kode warna hex] */
const C={
  milo:["Milo","#b89a7a"],black:["Black","#1c1c1c"],sage:["Sage","#9caf88"],mocca:["Mocca","#7b5b45"],
  cream:["Cream","#efe6d8"],navy:["Navy","#1f2a44"],taupe:["Taupe","#a8998a"],white:["White","#f7f5f0"],
  dustypink:["Dusty Pink","#d8a7a0"],beige:["Beige","#d9c7ad"]
};
/* mk(base, [kode warna...])
   Warna PERTAMA = foto utama produk:  images/<base>.jpg, <base>-2.jpg, <base>-3.jpg
   (foto-foto ini yang tampil & berganti otomatis di kartu produk)
   Warna lain (tampil di panel pilih warna):  images/<base>-<kode>.jpg
   Foto yang tidak ada otomatis dilewati. */
const mk=(base,keys)=>keys.map((k,i)=>({key:k,name:C[k][0],hex:C[k][1],
  imgs:i===0?[`images/${base}.jpg`,`images/${base}-2.jpg`,`images/${base}-3.jpg`]
            :[`images/${base}-${k}.jpg`,`images/${base}-${k}-2.jpg`,`images/${base}-${k}-3.jpg`]}));
const productsData=[
{id:1,name:"Timeless Pashmina",price:89000,oldPrice:110000,cat:"hijab",badge:"Timeless",img:"images/pashmina-milo.jpg",colors:mk("pashmina-milo",["milo","black","sage","mocca","cream"])},
{id:2,name:"Essential Paris",price:45000,cat:"hijab",badge:"Essential",img:"images/paris-black.jpg",colors:mk("paris-black",["black","navy","mocca","taupe"])},
{id:3,name:"Timeless Linen Dress",price:189000,oldPrice:229000,cat:"dress",badge:"Capsule",img:"images/dress-sage.jpg",colors:mk("dress-sage",["sage","cream","mocca","black"])},
{id:4,name:"Essential Crinkle Top",price:95000,cat:"atasan",badge:"Timeless",img:"images/blouse-white.jpg",colors:mk("blouse-white",["white","cream","sage","black"])},
{id:5,name:"The Timeless Set",price:165000,cat:"oneset",badge:"The Set",img:"images/oneset-cream.jpg",colors:mk("oneset-cream",["cream","milo","sage"])},
{id:6,name:"Timeless Ceruty",price:55000,cat:"hijab",badge:"",img:"images/ceruty-pink.jpg",colors:mk("ceruty-pink",["dustypink","milo","sage","black"])},
{id:7,name:"Essential Oversize Shirt",price:119000,cat:"atasan",badge:"",img:"images/kemeja-beige.jpg",colors:mk("kemeja-beige",["beige","white","black"])},
{id:8,name:"Timeless A-Line Skirt",price:129000,cat:"oneset",badge:"Timeless",img:"images/skirt-mocca.jpg",colors:mk("skirt-mocca",["mocca","black","cream"])},
];
const BUNDLE={id:999,name:"Timeless Capsule",price:199000,img:"images/bundle.jpg"};
const WA="6285196453720";
const AUTOPLAY_MS=3500; // jeda ganti foto otomatis di kartu (milidetik)

// Jika elemen tidak ada di HTML, pakai elemen kosong agar script tidak berhenti total
const $=s=>document.querySelector(s)||document.createElement('div');
const $$=s=>document.querySelectorAll(s);
const store={
  get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
};
try{
  const adminProducts=JSON.parse(localStorage.getItem('rasha-admin-products')||'null');
  if(Array.isArray(adminProducts)){
    productsData.splice(0,productsData.length,...adminProducts);
  }
}catch(e){}
productsData.forEach(p=>{p.description=p.description||'Produk RashaWear dengan desain timeless, bahan nyaman, dan mudah dipadukan untuk berbagai aktivitas.';p.stock=Number.isFinite(Number(p.stock))?Number(p.stock):10;p.sizes=Array.isArray(p.sizes)&&p.sizes.length?p.sizes:['S','M','L','XL'];if(!Array.isArray(p.colors)||!p.colors.length)p.colors=[{key:'default',name:'Default',hex:'#b89a7a',imgs:[p.img]}];});
let cart=store.get('rasha-cart',[]).map(c=>({...c,key:c.key||String(c.id)+'-',color:c.color||'',size:c.size||''}));
let wishlist=store.get('rasha-wish',[]);
let currentFilter='all';

/* ========== THEME ========== */
const root=document.documentElement;
const themeBtn=$('#themeToggle');
function applyTheme(theme,animate){
  if(animate){root.classList.add('theme-anim');setTimeout(()=>root.classList.remove('theme-anim'),450);}
  root.setAttribute('data-theme',theme);
  themeBtn.setAttribute('aria-checked',theme==='dark');
  const meta=$('#themeColorMeta'); if(meta) meta.setAttribute('content',theme==='dark'?'#0f0f10':'#ffffff');
}
(function(){
  let t=root.getAttribute('data-theme');
  if(!t){
    try{t=localStorage.getItem('rasha-theme')}catch(e){}
    if(!t) t=(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light';
  }
  applyTheme(t,false);
})();
themeBtn.addEventListener('click',()=>{
  const next=root.getAttribute('data-theme')==='dark'?'light':'dark';
  applyTheme(next,true);
  try{localStorage.setItem('rasha-theme',next)}catch(e){}
  toast(next==='dark'?'Dark mode aktif 🌙':'Light mode aktif ☀️');
});
// ikuti perubahan tema sistem jika user belum memilih manual
try{
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change',e=>{
    if(!localStorage.getItem('rasha-theme')) applyTheme(e.matches?'dark':'light',true);
  });
}catch(e){}

/* ========== UTIL ========== */
const rp=n=>'Rp '+n.toLocaleString('id-ID');
let toastTimer;
function toast(msg){
  const t=$('#toast'); t.textContent=msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove('show'),2200);
}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const mq=q=>{try{return matchMedia(q).matches}catch(e){return false}};
const reduceMotion=mq('(prefers-reduced-motion: reduce)');
const canHover=mq('(hover: hover)');

/* ========== PRODUCTS ========== */
const productsEl=$('#products');
const badImgs=new Set(); // foto yang gagal dimuat (file belum ada) -> dilewati
function colorList(p,c){
  let l=c.imgs.filter(s=>!badImgs.has(s));
  if(!l.length) l=[p.img].filter(s=>!badImgs.has(s)); // warna tanpa foto -> pakai foto utama
  return l;
}
// kartu yang sedang terlihat di layar -> foto berganti otomatis
const cardIO='IntersectionObserver' in window
  ? new IntersectionObserver(es=>es.forEach(e=>{const f=e.target._view;if(f)f(e.isIntersecting)}),{threshold:.25})
  : null;

function buildCard(p,i){
  const div=document.createElement('div');
  div.className='product';
  div.style.setProperty('--i',i);
  const on=wishlist.includes(p.id);
  div.innerHTML=`<div class="img-wrap">
<div class="slider" role="group" aria-roledescription="carousel" aria-label="Foto ${esc(p.name)}"><div class="track"></div></div>
<button type="button" class="gal-btn prev" aria-label="Foto sebelumnya">‹</button>
<button type="button" class="gal-btn next" aria-label="Foto berikutnya">›</button>
<div class="dots"></div>
${p.badge?`<span class="badge">${esc(p.badge)}</span>`:''}
<button class="wish${on?' on':''}" aria-label="Wishlist" onclick="toggleWish(${p.id},this)">${on?'♥':'♡'}</button>
</div>
<div class="product-info"><h4>${esc(p.name)}</h4><p class="product-description">${esc(p.description||'')}</p>
<div class="meta"><div><span class="price">${rp(p.price)}</span>${p.oldPrice?`<span class="old">${rp(p.oldPrice)}</span>`:''}</div><span>${Number(p.stock)>0?`Stok ${Number(p.stock)}`:'Stok habis'}</span></div>
<button type="button" class="btn primary add">+ Add to Bag</button></div>`;

  const q=s=>div.querySelector(s);
  const slider=q('.slider'),track=q('.track'),dots=q('.dots'),prev=q('.prev'),next=q('.next');
  let idx=0,list=[],timer=null,inView=!cardIO,paused=false;

  // jalankan / hentikan pergantian foto otomatis
  function sync(){
    clearInterval(timer); timer=null;
    if(inView&&!paused&&!reduceMotion&&list.length>1){
      timer=setInterval(()=>{
        if(!div.isConnected){clearInterval(timer);timer=null;if(cardIO)cardIO.unobserve(div);return;}
        if(!document.hidden) go(idx+1);
      },AUTOPLAY_MS+(i%4)*350); // tiap kartu sedikit beda waktu supaya tidak serempak
    }
  }
  function show(){
    const n=list.length;
    idx=Math.max(0,Math.min(idx,n-1));
    track.style.transform=`translateX(${-idx*100}%)`;
    [...track.children].forEach((im,k)=>im.setAttribute('aria-hidden',k===idx?'false':'true'));
    [...dots.children].forEach((d,k)=>{d.classList.toggle('on',k===idx);d.setAttribute('aria-current',k===idx?'true':'false')});
    prev.hidden=next.hidden=dots.hidden=!(n>1);
  }
  function go(n){ if(list.length<2) return; idx=(n+list.length)%list.length; show(); }
  function paint(){
    let l=colorList(p,p.colors[0]),final=false;
    if(!l.length){l=['images/hero-main.jpg'];final=true;} // semua foto tidak ada
    list=l; track.innerHTML=''; dots.innerHTML='';
    l.forEach((src,k)=>{
      const im=document.createElement('img');
      im.src=src; im.draggable=false;
      im.alt=`${p.name}${l.length>1?` (${k+1}/${l.length})`:''}`;
      if(k===0) im.loading='lazy';
      if(!final) im.onerror=()=>{badImgs.add(src);paint();};
      track.appendChild(im);
      const d=document.createElement('button');
      d.type='button'; d.className='dot'; d.setAttribute('aria-label',`Foto ${k+1}`);
      d.onclick=()=>{go(k);sync();}; dots.appendChild(d);
    });
    show(); sync();
  }
  prev.onclick=()=>{go(idx-1);sync();};
  next.onclick=()=>{go(idx+1);sync();};

  // geser jari di HP
  let sx=null,resume=null;
  slider.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;paused=true;sync();clearTimeout(resume)},{passive:true});
  slider.addEventListener('touchend',e=>{
    if(sx!==null){
      const dx=e.changedTouches[0].clientX-sx; sx=null;
      if(Math.abs(dx)>40) go(idx+(dx<0?1:-1));
    }
    clearTimeout(resume); resume=setTimeout(()=>{paused=false;sync();},4000);
  });
  // jeda saat kursor di atas kartu / tombol difokus
  if(canHover){
    div.addEventListener('mouseenter',()=>{paused=true;sync();});
    div.addEventListener('mouseleave',()=>{paused=false;sync();});
  }
  div.addEventListener('focusin',()=>{paused=true;sync();});
  div.addEventListener('focusout',()=>{paused=false;sync();});

  q('.add').textContent=Number(p.stock)>0?'+ Pilih varian':'Stok habis';q('.add').disabled=Number(p.stock)<=0;q('.add').onclick=e=>openSheet(p,e.currentTarget);
  div._view=v=>{inView=v;sync();};
  paint();
  if(cardIO) cardIO.observe(div);
  return div;
}
function render(filter='all'){
  currentFilter=filter;
  productsEl.innerHTML='';
  productsData.filter(p=>filter==='all'||p.cat===filter).forEach((p,i)=>productsEl.appendChild(buildCard(p,i)));
}

/* ========== PANEL PILIH WARNA (muncul saat klik Add to Bag) ========== */
const sheetOv=document.createElement('div');
sheetOv.className='sheet-overlay';
const sheetEl=document.createElement('div');
sheetEl.className='sheet';
sheetEl.setAttribute('role','dialog');
sheetEl.setAttribute('aria-modal','true');
sheetEl.setAttribute('aria-labelledby','sheetTitle');
sheetEl.setAttribute('aria-hidden','true');
sheetEl.innerHTML=`<button type="button" class="sheet-close" aria-label="Tutup">✕</button>
<div class="sheet-body"><div class="sheet-gallery"><img class="sheet-img" alt=""><button type="button" class="sheet-photo-prev" aria-label="Foto sebelumnya">‹</button><button type="button" class="sheet-photo-next" aria-label="Foto berikutnya">›</button><div class="sheet-photo-count"></div></div>
<div class="sheet-info"><h3 id="sheetTitle"></h3><div class="sheet-price"></div><p class="sheet-description"></p><p class="sheet-stock"></p>
<p class="sheet-label">Pilih warna: <b>-</b></p>
<div class="sheet-colors" role="radiogroup" aria-label="Pilih warna"></div>
<p class="sheet-label">Pilih ukuran: <b class="picked-size">-</b></p><div class="sheet-sizes" role="group" aria-label="Pilih ukuran"></div>
<button type="button" class="btn primary full sheet-add" disabled>Pilih warna dan ukuran</button></div></div>`;
document.body.append(sheetOv,sheetEl);
const sq=s=>sheetEl.querySelector(s);
let sheetP=null,sheetC=-1,sheetS='',sheetFrom=null,sheetPhotoIndex=0;

function setSheetImg(p,c){
  const im=sq('.sheet-img');
  let photos=colorList(p,c||p.colors[0]);
  if(!photos.length)photos=[p.img||'images/hero-main.jpg'];
  sheetPhotoIndex=Math.max(0,Math.min(sheetPhotoIndex,photos.length-1));
  im.onerror=()=>{if(im.src.endsWith('hero-main.jpg'))return;badImgs.add(im.getAttribute('src'));photos=colorList(p,c||p.colors[0]);if(photos.length){sheetPhotoIndex=0;im.src=photos[0];}};
  im.src=photos[sheetPhotoIndex]||p.img||'images/hero-main.jpg';
  im.alt=c?`${p.name} - ${c.name}`:p.name;
  sq('.sheet-photo-prev').hidden=sq('.sheet-photo-next').hidden=photos.length<2;
  sq('.sheet-photo-count').textContent=photos.length>1?`${sheetPhotoIndex+1} / ${photos.length}`:'';
}
sq('.sheet-photo-prev').addEventListener('click',()=>{const c=sheetC>=0?sheetP.colors[sheetC]:sheetP.colors[0];const photos=colorList(sheetP,c);if(photos.length>1){sheetPhotoIndex=(sheetPhotoIndex+photos.length-1)%photos.length;setSheetImg(sheetP,c);}});
sq('.sheet-photo-next').addEventListener('click',()=>{const c=sheetC>=0?sheetP.colors[sheetC]:sheetP.colors[0];const photos=colorList(sheetP,c);if(photos.length>1){sheetPhotoIndex=(sheetPhotoIndex+1)%photos.length;setSheetImg(sheetP,c);}});

function updateSheetUI(){
  const c=sheetC>=0?sheetP.colors[sheetC]:null;
  const selectedStock=Number(c?.stock??sheetP?.stock??0);
  sq('.sheet-label b').textContent=c?c.name:'-';
  sq('.sheet-stock').textContent=selectedStock>0?`Stok warna ${c?.name||''}: ${selectedStock}`:'Stok warna ini habis';
  const sizeRequired=(sheetP?.sizes||[]).length>0;
  sq('.picked-size').textContent=sheetS||'-';
  const add=sq('.sheet-add');
  add.disabled=!c||(sizeRequired&&!sheetS)||selectedStock<=0;
  add.textContent=selectedStock<=0?'Stok warna habis':(c&&(!sizeRequired||sheetS)?'Tambah ke Bag':'Pilih warna dan ukuran');
}
function pickColor(k){
  sheetC=k;
  [...sq('.sheet-colors').children].forEach((b,j)=>{b.classList.toggle('on',j===k);b.setAttribute('aria-checked',String(j===k))});
  setSheetImg(sheetP,sheetP.colors[k]);
  updateSheetUI();
}
function openSheet(p,from){
  sheetP=p; sheetC=-1; sheetS=''; sheetPhotoIndex=0; sheetFrom=from||null;
  sq('#sheetTitle').textContent=p.name;
  sq('.sheet-description').textContent=p.description||'Deskripsi produk belum ditambahkan.';
  sq('.sheet-stock').textContent=Number(p.stock)>0?`Stok tersedia: ${p.stock}`:'Stok sedang habis';
  sq('.sheet-price').innerHTML=`${rp(p.price)}${p.oldPrice?` <s>${rp(p.oldPrice)}</s>`:''}`;
  const box=sq('.sheet-colors'); box.innerHTML='';
  p.colors.forEach((c,k)=>{
    const b=document.createElement('button');
    b.type='button'; b.className='color-opt';
    b.setAttribute('role','radio'); b.setAttribute('aria-checked','false');
    b.style.setProperty('--sw',c.hex);
    b.innerHTML=`<i></i>${esc(c.name)}`;
    b.onclick=()=>{sheetPhotoIndex=0;pickColor(k);};
    box.appendChild(b);
  });
  const sizeBox=sq('.sheet-sizes');sizeBox.innerHTML='';
  (p.sizes||[]).forEach(size=>{const b=document.createElement('button');b.type='button';b.className='size-opt';b.textContent=size;b.onclick=()=>{sheetS=size;[...sizeBox.children].forEach(x=>x.classList.toggle('on',x===b));updateSheetUI();};sizeBox.appendChild(b);});
  setSheetImg(p,null);
  updateSheetUI();
  if(p.colors.length===1) pickColor(0);
  sheetEl.classList.add('open'); sheetOv.classList.add('show');
  sheetEl.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  (box.querySelector('.color-opt')||sq('.sheet-close')).focus({preventScroll:true});
}
function closeSheet(restoreFocus=true){
  if(!sheetEl.classList.contains('open')) return;
  sheetEl.classList.remove('open'); sheetOv.classList.remove('show');
  sheetEl.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  if(restoreFocus&&sheetFrom&&sheetFrom.isConnected) sheetFrom.focus({preventScroll:true});
}
sq('.sheet-close').onclick=()=>closeSheet();
sheetOv.onclick=()=>closeSheet();
sq('.sheet-add').onclick=()=>{
  if(!sheetP||sheetC<0) return;
  const p=sheetP,c=p.colors[sheetC],img=sq('.sheet-img').getAttribute('src');
  closeSheet(false);
  addToCart(p.id,c.name,img,sheetS);
};
// Tab tidak keluar dari panel saat terbuka
sheetEl.addEventListener('keydown',e=>{
  if(e.key!=='Tab') return;
  const f=[...sheetEl.querySelectorAll('button:not([disabled])')];
  if(!f.length) return;
  const a=f[0],z=f[f.length-1];
  if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus();}
  else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus();}
});

/* ========== CART ========== */
function addToCart(id,color,img,size=''){
  const p=id===BUNDLE.id?BUNDLE:productsData.find(x=>x.id===id);
  if(!p) return;
  color=color||'';
  // produk yang sama dengan warna berbeda = item terpisah di bag
  const key=id+'-'+color.toLowerCase().replace(/[^a-z0-9]/g,'')+'-'+String(size).toLowerCase().replace(/[^a-z0-9]/g,'');
  const found=cart.find(c=>c.key===key);
  const variant=p.colors?.find(v=>String(v.name).toLowerCase()===String(color).toLowerCase());
  const available=Number(variant?.stock??p.stock);
  if(available<=0){toast('Stok varian ini habis');return;}
  if(found&&found.qty>=available){toast('Jumlah di bag sudah mencapai stok tersedia');return;}
  if(found) found.qty++; else cart.push({key,id:p.id,name:p.name,color,size,price:p.price,img:img||p.img,qty:1});
  updateCart(); openDrawer();
  const b=$('#cartBtn'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
  toast(color?`${p.name} (${color}) masuk bag ✨`:'Ditambahkan ke bag ✨');
}
function addBundle(){addToCart(BUNDLE.id)}
function toggleWish(id,btn){
  const i=wishlist.indexOf(id);
  if(i>-1){wishlist.splice(i,1);toast('Dihapus dari wishlist');} else {wishlist.push(id);toast('Disimpan ke wishlist ♥');}
  store.set('rasha-wish',wishlist);
  $('#wishCount').textContent=wishlist.length;
  if(btn){const on=wishlist.includes(id);btn.classList.toggle('on',on);btn.textContent=on?'♥':'♡';}
}
function updateCart(){
  const count=cart.reduce((a,b)=>a+b.qty,0);
  $('#cartCount').textContent=count;
  $('#drawerCount').textContent=count;
  const body=$('#drawerBody'); let total=0;
  body.innerHTML=cart.map(item=>{
    total+=item.price*item.qty;
    return `<div class="cart-item"><img src="${item.img}" alt="${esc(item.name)}" onerror="this.onerror=null;this.src='images/hero-main.jpg'"><div><strong>${esc(item.name)}</strong>${item.color?`<small class="variant">Warna: ${esc(item.color)}</small>`:''}${item.size?`<small class="variant">Ukuran: ${esc(item.size)}</small>`:''}<small>${rp(item.price)}</small><div class="qty"><button onclick="changeQty('${item.key}',-1)" aria-label="Kurangi">−</button><span>${item.qty}</span><button onclick="changeQty('${item.key}',1)" aria-label="Tambah">+</button></div></div></div>`;
  }).join('');
  if(!cart.length) body.innerHTML='<p class="empty">Timeless bag masih kosong ✨</p>';
  $('#subtotal').textContent=rp(total);
  store.set('rasha-cart',cart);
}
function changeQty(key,d){
  const it=cart.find(c=>c.key===key); if(!it) return;
  it.qty+=d; if(it.qty<=0) cart=cart.filter(c=>c.key!==key);
  updateCart();
}
function openDrawer(){$('#drawer').classList.add('open');$('#drawer').setAttribute('aria-hidden','false');$('#overlay').classList.add('show');document.body.style.overflow='hidden'}
function closeDrawer(){$('#drawer').classList.remove('open');$('#drawer').setAttribute('aria-hidden','true');$('#overlay').classList.remove('show');document.body.style.overflow=''}
$('#cartBtn').onclick=openDrawer; $('#closeDrawer').onclick=closeDrawer; $('#overlay').onclick=closeDrawer;
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeSheet();closeDrawer();closeNav();}});

$('#checkoutWA').onclick=()=>{
  if(cart.length===0) return toast('Bag kamu masih kosong');
  let msg='Halo RashaWear Timeless! Aku mau order:\n';
  cart.forEach(c=>msg+=`- ${c.name}${c.color?` (Warna: ${c.color})`:''}${c.size?` (Ukuran: ${c.size})`:''} x${c.qty} (${rp(c.price)})\n`);
  msg+=`\nTotal: ${$('#subtotal').textContent}\n\nTimeless Wardrobe`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,'_blank','noopener');
};

/* ========== FILTER ========== */
$$('.chip').forEach(ch=>ch.onclick=()=>{
  $$('.chip').forEach(c=>c.classList.remove('active'));
  ch.classList.add('active'); render(ch.dataset.filter);
});

/* ========== NAV ========== */
const nav=$('#nav'),ham=$('#hamburger');
function closeNav(){nav.classList.remove('open');ham.setAttribute('aria-expanded','false');ham.textContent='☰'}
ham.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  ham.setAttribute('aria-expanded',open); ham.textContent=open?'✕':'☰';
});
$$('.nav a').forEach(a=>a.addEventListener('click',closeNav));

/* ========== NEWSLETTER ========== */
function subscribe(){
  const input=$('#emailInput'),e=input.value.trim();
  if(!/^\S+@\S+\.\S+$/.test(e)) return toast('Masukkan email yang valid');
  toast('Welcome to Timeless Club! Voucher dikirim ke '+e); input.value='';
}

/* ========== SCROLL EFFECTS ========== */
const header=$('#header'),progress=$('#scrollProgress'),toTop=$('#toTop');
function onScroll(){
  const y=window.scrollY,h=document.documentElement.scrollHeight-innerHeight;
  header.classList.toggle('scrolled',y>10);
  progress.style.width=(h>0?(y/h)*100:0)+'%';
  toTop.classList.toggle('show',y>600);
}
addEventListener('scroll',onScroll,{passive:true}); onScroll();
toTop.onclick=()=>scrollTo({top:0,behavior:'smooth'});

// reveal on scroll
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  $$('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%3)*80+'ms';io.observe(el)});
} else $$('.reveal').forEach(el=>el.classList.add('in'));

// highlight menu aktif
if('IntersectionObserver' in window){
  const links=[...$$('.nav a')];
  const so=new IntersectionObserver(es=>es.forEach(en=>{
    if(en.isIntersecting) links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+en.target.id));
  }),{rootMargin:'-45% 0px -50% 0px'});
  ['home','koleksi','bestseller','testimoni'].forEach(id=>{const s=document.getElementById(id);if(s)so.observe(s)});
}

/* ========== INIT ========== */
$('#wishCount').textContent=wishlist.length;
render(); updateCart();