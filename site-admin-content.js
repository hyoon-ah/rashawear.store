(function(){
  try{
    const t=JSON.parse(localStorage.getItem('rasha-admin-texts')||'null');
    if(!t)return;
    const set=(selector,value)=>{const el=document.querySelector(selector);if(el&&typeof value==='string')el.textContent=value;};
    set('.announce',t.announcement);
    const h=document.querySelector('.hero-text h1');
    if(h){const line=document.createTextNode(t.heroLine1||'');h.innerHTML='';h.append(line,document.createElement('br'));const em=document.createElement('em');em.textContent=t.heroEmphasis||'';h.append(em);}
    set('.hero-text>p',t.heroDescription);
    set('.hero-cta .btn.primary',t.heroButton);
    set('.hero-cta .btn.outline',t.heroButton2);
    set('#koleksi .section-head h2',t.collectionTitle);
    set('#koleksi .section-head .sub',t.collectionDescription);
    set('#bestseller .reveal h2',t.bundleTitle);
    set('#bestseller .reveal .sub',t.bundleDescription);
    set('#testimoni .h2',t.testimonialsTitle);
    set('.instagram .h2',t.instagramTitle);
    set('.checkout-marketplace .h2',t.checkoutTitle);
    set('.checkout-marketplace .sub',t.checkoutDescription);
    set('.footer-grid>div:last-child h4',t.newsletterTitle);
    set('.footer-grid>div:last-child .nl-text',t.newsletterDescription);
    set('.footer-grid>div:first-child>p:first-of-type',t.footerDescription);
    const info=document.querySelector('.footer-grid>div:first-child>p:nth-of-type(2)');
    if(info)info.textContent=[t.footerLocation,t.footerHours,t.footerEmail].filter(Boolean).join(' • ');
    set('.copyright',t.copyrightText);
    const images=[['.hero-card:not(.small) img',t.heroMainImage],['.hero-card.small img',t.heroDetailImage],['.bundle>img',t.bundleImage],['.insta-grid img:nth-child(1)',t.insta1Image],['.insta-grid img:nth-child(2)',t.insta2Image],['.insta-grid img:nth-child(3)',t.insta3Image]];
    images.forEach(([selector,src])=>{const el=document.querySelector(selector);if(el&&typeof src==='string'&&src.startsWith('data:image/'))el.src=src;});
  }catch(e){}
})();
