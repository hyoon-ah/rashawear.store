const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
const KEYS={products:'rasha-admin-products',texts:'rasha-admin-texts'};
const defaultTexts={
 announcement:'Gratis ongkir Depok • Voucher 10% untuk member Timeless Club ✨',
 heroLine1:'Less Trend.',heroEmphasis:'Timeless.',
 heroDescription:'Modest wear yang tidak lekang waktu. Dirancang untuk dikenakan berulang, dipadankan selamanya. Bahan premium, potongan clean, warna earthy yang effortless.',
 heroButton:'Explore Timeless Edit',collectionTitle:'The Timeless Edit',
 collectionDescription:'8 essentials yang bisa kamu pakai 365 hari. Capsule wardrobe modest.',
 heroButton2:'Lihat Capsule',bundleTitle:'The Capsule — Bundle Hemat 20%',bundleDescription:'One set untuk timeless wardrobe kamu. Tidak perlu banyak, cukup yang tepat.',
 testimonialsTitle:'From The Journal',instagramTitle:'@rashawear_ — Timeless in Every Frame',checkoutTitle:'Checkout Dimana Aja',checkoutDescription:'Pilih marketplace favorit kamu — semua ready stock di Depok',
 newsletterTitle:'Join The Timeless Club',newsletterDescription:'Dapat early access koleksi timeless & voucher 10%',
 footerDescription:'We don\'t create trend. We create pieces that stay. Slow, timeless, modest — made in Depok for everyday.',footerLocation:'📍 Depok, Jawa Barat',footerHours:'🕘 09.00 - 21.00 WIB',footerEmail:'✉️ hello@rashawear.id',copyrightText:'© 2026 RASHAWEAR — Less Trend, More Timeless. Made in Depok.'
};
const originalProducts=[
{id:1,name:'Timeless Pashmina',price:89000,oldPrice:110000,cat:'hijab',badge:'Timeless',description:'Pashmina lembut dengan warna timeless yang mudah dipadukan untuk aktivitas sehari-hari.',stock:20,sizes:['All Size'],img:'images/pashmina-milo.jpg',colors:[{key:'milo',name:'Milo',hex:'#b89a7a',imgs:['images/pashmina-milo.jpg']},{key:'black',name:'Black',hex:'#1c1c1c',imgs:['images/pashmina-milo-black.jpg']},{key:'sage',name:'Sage',hex:'#9caf88',imgs:['images/pashmina-milo.jpg']},{key:'mocca',name:'Mocca',hex:'#7b5b45',imgs:['images/pashmina-milo.jpg']},{key:'cream',name:'Cream',hex:'#efe6d8',imgs:['images/pashmina-milo.jpg']}]},
{id:2,name:'Essential Paris',price:45000,cat:'hijab',badge:'Essential',img:'images/paris-black.jpg',colors:[{key:'black',name:'Black',hex:'#1c1c1c',stock:10,imgs:['images/paris-black.jpg']},{key:'navy',name:'Navy',hex:'#26364a',stock:10,imgs:['images/paris-black.jpg']},{key:'mocca',name:'Mocca',hex:'#7b5b45',stock:10,imgs:['images/paris-black.jpg']},{key:'taupe',name:'Taupe',hex:'#a69a8c',stock:10,imgs:['images/paris-black.jpg']}]},
{id:3,name:'Timeless Linen Dress',price:189000,oldPrice:229000,cat:'dress',badge:'Capsule',img:'images/dress-sage.jpg',colors:[{key:'sage',name:'Sage',hex:'#9caf88',stock:10,imgs:['images/dress-sage.jpg']},{key:'cream',name:'Cream',hex:'#efe6d8',stock:10,imgs:['images/dress-sage.jpg']},{key:'mocca',name:'Mocca',hex:'#7b5b45',stock:10,imgs:['images/dress-sage.jpg']},{key:'black',name:'Black',hex:'#1c1c1c',stock:10,imgs:['images/dress-sage.jpg']}]},
{id:4,name:'Essential Crinkle Top',price:95000,cat:'atasan',badge:'Timeless',img:'images/blouse-white.jpg',colors:[{key:'white',name:'White',hex:'#f7f5ef',stock:10,imgs:['images/blouse-white.jpg']},{key:'cream',name:'Cream',hex:'#efe6d8',stock:10,imgs:['images/blouse-white.jpg']},{key:'sage',name:'Sage',hex:'#9caf88',stock:10,imgs:['images/blouse-white.jpg']},{key:'black',name:'Black',hex:'#1c1c1c',stock:10,imgs:['images/blouse-white.jpg']}]},
{id:5,name:'The Timeless Set',price:165000,cat:'oneset',badge:'The Set',img:'images/oneset-cream.jpg',colors:[{key:'cream',name:'Cream',hex:'#efe6d8',stock:10,imgs:['images/oneset-cream.jpg']},{key:'milo',name:'Milo',hex:'#b89a7a',stock:10,imgs:['images/oneset-cream.jpg']},{key:'sage',name:'Sage',hex:'#9caf88',stock:10,imgs:['images/oneset-cream.jpg']}]},
{id:6,name:'Timeless Ceruty',price:55000,cat:'hijab',badge:'',img:'images/ceruty-pink.jpg',colors:[{key:'dustypink',name:'Dusty Pink',hex:'#d7a0a5',stock:10,imgs:['images/ceruty-pink.jpg']},{key:'milo',name:'Milo',hex:'#b89a7a',stock:10,imgs:['images/ceruty-pink.jpg']},{key:'sage',name:'Sage',hex:'#9caf88',stock:10,imgs:['images/ceruty-pink.jpg']},{key:'black',name:'Black',hex:'#1c1c1c',stock:10,imgs:['images/ceruty-pink.jpg']}]},
{id:7,name:'Essential Oversize Shirt',price:119000,cat:'atasan',badge:'',img:'images/kemeja-beige.jpg',colors:[{key:'beige',name:'Beige',hex:'#c7b39a',stock:10,imgs:['images/kemeja-beige.jpg']},{key:'white',name:'White',hex:'#f7f5ef',stock:10,imgs:['images/kemeja-beige.jpg']},{key:'black',name:'Black',hex:'#1c1c1c',stock:10,imgs:['images/kemeja-beige.jpg']}]},
{id:8,name:'Timeless A-Line Skirt',price:129000,cat:'oneset',badge:'Timeless',img:'images/skirt-mocca.jpg',colors:[{key:'mocca',name:'Mocca',hex:'#7b5b45',stock:10,imgs:['images/skirt-mocca.jpg']},{key:'black',name:'Black',hex:'#1c1c1c',stock:10,imgs:['images/skirt-mocca.jpg']},{key:'cream',name:'Cream',hex:'#efe6d8',stock:10,imgs:['images/skirt-mocca.jpg']}]}
];
const read=(key,fallback)=>{try{const v=localStorage.getItem(key);return v?JSON.parse(v):fallback}catch(e){return fallback}};
let products=read(KEYS.products,null);
if(!Array.isArray(products)){products=originalProducts.map(p=>({...p,description:p.description||'Produk RashaWear dengan desain timeless dan nyaman digunakan sehari-hari.',stock:p.stock||((p.colors||[]).reduce((n,c)=>n+Number(c.stock||0),0))||10,sizes:['S','M','L','XL'],colors:(p.colors||[{key:'default',name:'Default',hex:'#b89a7a',stock:10,imgs:[p.img]}]).map(c=>({...c,imgs:c.imgs||[p.img]}))}));}
products=products.map(p=>({...p,description:p.description||'Produk RashaWear dengan desain timeless dan nyaman digunakan sehari-hari.',stock:Number.isFinite(Number(p.stock))?Number(p.stock):10,sizes:Array.isArray(p.sizes)?p.sizes:['S','M','L','XL'],colors:Array.isArray(p.colors)&&p.colors.length?p.colors:[{key:'default',name:'Default',hex:'#b89a7a',imgs:[p.img]}]}));
let texts={...defaultTexts,...read(KEYS.texts,{})};
let pendingPhoto='';
let variantDraft=[];
let toastTimer;
const formatPrice=n=>'Rp '+Number(n||0).toLocaleString('id-ID');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function saveProducts(){localStorage.setItem(KEYS.products,JSON.stringify(products));}
function showToast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2400);}
function renderProducts(){
 const list=$('#productList');list.innerHTML='';
 $('#productCount').textContent=`${products.length} produk di katalog. Tekan Edit untuk mengubah detail.`;
 $('#emptyProducts').classList.toggle('hidden',products.length>0);
 products.forEach(p=>{
  const card=document.createElement('article');card.className='product-card';
  const image=p.img||'';
  card.innerHTML=`<img src="${esc(image)}" alt="" onerror="this.style.visibility='hidden'"><div><h3>${esc(p.name)}</h3><div class="price">${formatPrice(p.price)}</div><div class="meta">${esc(({hijab:'Hijab Essential',dress:'Timeless Dress',atasan:'Essential Top',oneset:'The Set'})[p.cat]||p.cat||'Tanpa kategori')}${p.badge?' · '+esc(p.badge):''}</div><div class="meta">Total stok: ${Number(p.stock)||0} · Ukuran: ${esc((p.sizes||[]).join(', ')||'Tidak diatur')}</div><div class="meta">Varian: ${esc((p.colors||[]).map(c=>`${c.name} (${Number(c.stock??p.stock)||0})`).join(', ')||'Belum diatur')}</div></div><div class="product-actions"><button class="mini-btn" data-edit="${p.id}">✎ Edit</button><button class="mini-btn delete" data-delete="${p.id}">Hapus</button></div>`;
  list.appendChild(card);
 });
 list.querySelectorAll('[data-edit]').forEach(b=>b.addEventListener('click',()=>openEdit(Number(b.dataset.edit))));
 list.querySelectorAll('[data-delete]').forEach(b=>b.addEventListener('click',()=>deleteProduct(Number(b.dataset.delete))));
}
function loadTextForm(){const f=$('#textForm');Object.entries(texts).forEach(([k,v])=>{if(f.elements[k])f.elements[k].value=v;});}
const siteImageFields=[['heroMainUpload','heroMainImage','heroMainPreview'],['heroDetailUpload','heroDetailImage','heroDetailPreview'],['bundleUpload','bundleImage','bundlePreview'],['insta1Upload','insta1Image','insta1Preview'],['insta2Upload','insta2Image','insta2Preview'],['insta3Upload','insta3Image','insta3Preview']];
function loadSiteImagePreviews(){siteImageFields.forEach(([input,key,preview])=>{const el=$('#'+preview);if(texts[key]){el.src=texts[key];el.classList.add('visible');}});}
siteImageFields.forEach(([input,key,preview])=>$('#'+input).addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;const status=$('#backupStatus');try{const data=await compressImage(file);texts[key]=data;localStorage.setItem(KEYS.texts,JSON.stringify(texts));const im=$('#'+preview);im.src=data;im.classList.add('visible');showToast('Foto bagian website berhasil diganti di browser ini.');}catch(err){showToast('Foto tidak tersimpan. Coba ukuran foto lebih kecil.');}finally{e.target.value='';}}));

function resetPhotoPreview(src=''){const img=$('#photoPreview'),placeholder=$('#previewPlaceholder');if(src){img.src=src;img.classList.add('visible');placeholder.style.display='none';}else{img.removeAttribute('src');img.classList.remove('visible');placeholder.style.display='block';}}
function openEdit(id=null){
 const p=id===null?null:products.find(x=>x.id===id);
 const f=$('#productForm');f.reset();f.elements.id.value=p?p.id:'';f.elements.name.value=p?.name||'';f.elements.price.value=p?.price||'';f.elements.oldPrice.value=p?.oldPrice||'';f.elements.cat.value=p?.cat||'hijab';f.elements.badge.value=p?.badge||'';f.elements.description.value=p?.description||'';f.elements.stock.value=p?.stock??10;f.elements.sizes.value=(p?.sizes||['S','M','L','XL']).join(', ');
 variantDraft=(p?.colors||[]).map((c,i)=>({...c,name:c.name||`Warna ${i+1}`,hex:c.hex||'#b89a7a',stock:Number(c.stock??(i===0?(p?.stock??10):0)),imgs:Array.isArray(c.imgs)?[...c.imgs]:(p?.img?[p.img]:[])}));
 if(!variantDraft.length)variantDraft=[{key:'default',name:'Default',hex:'#b89a7a',stock:Number(p?.stock??10),imgs:p?.img?[p.img]:[]}];
 pendingPhoto='';$('#formError').textContent='';$('#dialogTitle').textContent=p?'Edit produk':'Tambah produk';
 resetPhotoPreview(p?.img||'');renderVariantRows();$('#productDialog').showModal();
}
function updateDraftTotal(){const field=$('#productForm').elements.stock;if(field)field.value=variantDraft.reduce((sum,c)=>sum+Math.max(0,Number(c.stock)||0),0);}
function renderVariantRows(){
 const root=$('#variantList');root.innerHTML='';
 variantDraft.forEach((v,i)=>{
  const row=document.createElement('section');row.className='variant-row';
  row.innerHTML=`<div class="variant-row-head"><b>Varian ${i+1}</b><button type="button" class="mini-btn delete" data-remove-variant="${i}" ${variantDraft.length===1?'disabled':''}>Hapus warna</button></div>
  <div class="variant-fields"><label>Nama warna<input data-v-name="${i}" value="${esc(v.name)}" maxlength="40" placeholder="Contoh: Milo"></label><label>Kode warna<input data-v-hex="${i}" value="${esc(v.hex)}" type="color" aria-label="Pilih kode warna"></label><label>Stok warna ini<input data-v-stock="${i}" value="${Math.max(0,Number(v.stock)||0)}" type="number" min="0" step="1" inputmode="numeric"></label></div>
  <label class="variant-upload">Foto untuk warna ${esc(v.name||i+1)} <input type="file" data-v-photos="${i}" accept="image/*" multiple><small>Pilih 1 atau beberapa foto. Foto ini hanya untuk warna ini.</small></label>
  <div class="variant-photos">${(v.imgs||[]).map((src,j)=>`<div class="variant-thumb"><img src="${esc(src)}" alt="Foto ${esc(v.name)} ${j+1}"><button type="button" data-remove-photo="${i}:${j}" aria-label="Hapus foto">×</button></div>`).join('') || '<span class="small">Belum ada foto untuk warna ini.</span>'}</div>`;
  root.appendChild(row);
 });
 root.querySelectorAll('[data-v-name]').forEach(el=>el.addEventListener('input',e=>{const i=Number(e.target.dataset.vName);variantDraft[i].name=e.target.value;const lab=e.target.closest('.variant-row').querySelector('.variant-upload');lab.childNodes[0].textContent=`Foto untuk warna ${e.target.value||i+1} `;}));
 root.querySelectorAll('[data-v-hex]').forEach(el=>el.addEventListener('input',e=>variantDraft[Number(e.target.dataset.vHex)].hex=e.target.value));
 root.querySelectorAll('[data-v-stock]').forEach(el=>el.addEventListener('input',e=>{variantDraft[Number(e.target.dataset.vStock)].stock=Math.max(0,Number(e.target.value)||0);updateDraftTotal();}));
 root.querySelectorAll('[data-remove-variant]').forEach(el=>el.addEventListener('click',()=>{variantDraft.splice(Number(el.dataset.removeVariant),1);if(!variantDraft.length)variantDraft.push({key:'default',name:'Default',hex:'#b89a7a',stock:0,imgs:[]});renderVariantRows();}));
 root.querySelectorAll('[data-v-photos]').forEach(el=>el.addEventListener('change',async e=>{const i=Number(e.target.dataset.vPhotos),files=Array.from(e.target.files||[]);if(!files.length)return;$('#formError').textContent=`Memproses ${files.length} foto…`;try{for(const file of files){const data=await compressImage(file);variantDraft[i].imgs.push(data);}renderVariantRows();$('#formError').textContent='Foto varian siap disimpan.';}catch(err){$('#formError').textContent=err.message;}e.target.value='';}));
 root.querySelectorAll('[data-remove-photo]').forEach(el=>el.addEventListener('click',()=>{const [i,j]=el.dataset.removePhoto.split(':').map(Number);variantDraft[i].imgs.splice(j,1);renderVariantRows();}));
 updateDraftTotal();
}

function compressImage(file){
 return new Promise((resolve,reject)=>{
  if(!file.type.startsWith('image/'))return reject(new Error('File harus berupa foto.'));
  const reader=new FileReader();reader.onerror=()=>reject(new Error('Foto tidak bisa dibaca.'));
  reader.onload=()=>{const img=new Image();img.onerror=()=>reject(new Error('Foto tidak bisa dibuka.'));
   img.onload=()=>{const max=850,scale=Math.min(1,max/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext('2d').drawImage(img,0,0,c.width,c.height);resolve(c.toDataURL('image/jpeg',.68));};
   img.src=reader.result;
  };reader.readAsDataURL(file);
 });
}
async function deleteProduct(id){const p=products.find(x=>x.id===id);if(!p)return;if(!confirm(`Hapus "${p.name}" dari katalog pada browser ini?`))return;products=products.filter(x=>x.id!==id);saveProducts();renderProducts();showToast('Produk dihapus dari data lokal.');}
function applyTexts(){
 const setText=(sel,val)=>{const el=$(sel);if(el)el.textContent=val;};
 setText('.announce',texts.announcement);
 const h1=$('.hero-text h1');if(h1)h1.innerHTML=`${esc(texts.heroLine1).replace(/\n/g,'<br>')}<br><em>${esc(texts.heroEmphasis)}</em>`;
 setText('.hero-text>p',texts.heroDescription);
 setText('.hero-cta .btn.primary',texts.heroButton);
 setText('.hero-cta .btn.outline',texts.heroButton2);
 setText('#koleksi .section-head h2',texts.collectionTitle);
 setText('#koleksi .section-head .sub',texts.collectionDescription);
 setText('#bestseller .reveal h2',texts.bundleTitle);
 setText('#bestseller .reveal .sub',texts.bundleDescription);
 setText('#testimoni .h2',texts.testimonialsTitle);
 setText('.instagram .h2',texts.instagramTitle);
 setText('.checkout-marketplace .h2',texts.checkoutTitle);
 setText('.checkout-marketplace .sub',texts.checkoutDescription);
 setText('.footer-grid>div:last-child h4',texts.newsletterTitle);
 setText('.footer-grid>div:last-child .nl-text',texts.newsletterDescription);
 setText('.footer-grid>div:first-child>p:first-of-type',texts.footerDescription);
 const footInfo=$('.footer-grid>div:first-child>p:nth-of-type(2)');if(footInfo)footInfo.innerHTML=[texts.footerLocation,texts.footerHours,texts.footerEmail].map(esc).join('<br>');
 setText('.copyright',texts.copyrightText);
}
$$('.tab').forEach(btn=>btn.addEventListener('click',()=>{
 $$('.tab').forEach(b=>b.classList.toggle('active',b===btn));
 $$('.panel').forEach(p=>p.classList.toggle('active',p.id===`panel-${btn.dataset.tab}`));
}));
$('#addProduct').addEventListener('click',()=>openEdit());
$('#addVariant').addEventListener('click',()=>{variantDraft.push({key:'color-'+Date.now(),name:'Warna baru',hex:'#b89a7a',stock:0,imgs:[]});renderVariantRows();});
$('#closeDialog').addEventListener('click',()=>$('#productDialog').close());
$('#cancelDialog').addEventListener('click',()=>$('#productDialog').close());
$('#photoInput').addEventListener('change',async e=>{
 const file=e.target.files?.[0];if(!file)return;
 $('#formError').textContent='Memproses foto…';
 try{pendingPhoto=await compressImage(file);resetPhotoPreview(pendingPhoto);$('#formError').textContent='Foto siap disimpan.';}
 catch(err){$('#formError').textContent=err.message;pendingPhoto='';}
});
$('#productForm').addEventListener('submit',e=>{
 e.preventDefault();const f=e.currentTarget;const id=f.elements.id.value?Number(f.elements.id.value):Date.now();
 const old=products.find(p=>p.id===id);let img=pendingPhoto||old?.img||'';
 if(f.elements.removePhoto.checked)img='';
 const colors=variantDraft.map((c,i)=>({key:(c.name||`warna-${i+1}`).toLowerCase().replace(/[^a-z0-9]+/g,'-')||('color-'+i),name:(c.name||`Warna ${i+1}`).trim(),hex:/^#[0-9a-fA-F]{6}$/.test(c.hex)?c.hex:'#b89a7a',stock:Math.max(0,Number(c.stock)||0),imgs:(c.imgs||[]).filter(Boolean)}));
 if(!colors.length){$('#formError').textContent='Tambahkan minimal satu warna/varian.';return;}
 if(!img)img=colors.flatMap(c=>c.imgs)[0]||'';
 if(!img){$('#formError').textContent='Tambahkan minimal satu foto pada salah satu warna atau foto utama.';return;}
 const totalStock=colors.reduce((sum,c)=>sum+c.stock,0);
 const product={id,name:f.elements.name.value.trim(),price:Number(f.elements.price.value),cat:f.elements.cat.value,badge:f.elements.badge.value.trim(),description:f.elements.description.value.trim(),stock:totalStock,sizes:f.elements.sizes.value.split(',').map(x=>x.trim()).filter(Boolean),img:img||colors.flatMap(c=>c.imgs)[0]||'',colors};
 const oldPrice=Number(f.elements.oldPrice.value);if(oldPrice>0)product.oldPrice=oldPrice;
 if(old)products=products.map(p=>p.id===id?product:p);else products.unshift(product);
 try{saveProducts();$('#productDialog').close();renderProducts();showToast('Produk, galeri foto tiap warna, ukuran, dan stok varian disimpan.');}
 catch(err){$('#formError').textContent='Penyimpanan penuh. Coba foto yang lebih kecil atau hapus beberapa foto.';}
});
$('#textForm').addEventListener('submit',e=>{
 e.preventDefault();const f=e.currentTarget;Object.keys(defaultTexts).forEach(k=>texts[k]=f.elements[k].value.trim());
 try{localStorage.setItem(KEYS.texts,JSON.stringify(texts));showToast('Tulisan disimpan di browser ini.');}
 catch(err){showToast('Tidak bisa menyimpan data.');}
});
$('#exportBtn').addEventListener('click',()=>{
 const payload={format:'rashawear-admin-demo-v1',exportedAt:new Date().toISOString(),products,texts};
 const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='rashawear-cadangan.json';a.click();URL.revokeObjectURL(url);$('#backupStatus').textContent='File cadangan berhasil dibuat.';
});
$('#importFile').addEventListener('change',async e=>{
 const file=e.target.files?.[0];if(!file)return;
 try{const data=JSON.parse(await file.text());if(data.format!=='rashawear-admin-demo-v1'||!Array.isArray(data.products)||!data.texts)throw new Error('Format file tidak sesuai.');
  if(!confirm('Data produk dan tulisan di browser ini akan diganti. Lanjutkan?'))return;
  products=data.products;texts={...defaultTexts,...data.texts};saveProducts();localStorage.setItem(KEYS.texts,JSON.stringify(texts));renderProducts();loadTextForm();loadSiteImagePreviews();$('#backupStatus').textContent='Cadangan berhasil diimpor.';showToast('Cadangan berhasil diimpor.');
 }catch(err){$('#backupStatus').textContent='Gagal mengimpor: '+err.message;}finally{e.target.value='';}
});
renderProducts();loadTextForm();loadSiteImagePreviews();
