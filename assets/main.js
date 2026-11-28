const $=s=>[...document.querySelectorAll(s)];
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const burger=document.getElementById('burger'),links=document.getElementById('links');
const menu=o=>{links.classList.toggle('open',o);burger.setAttribute('aria-expanded',o)};
burger.addEventListener('click',()=>menu(!links.classList.contains('open')));
links.addEventListener('click',e=>{if(e.target.closest('a'))menu(false)});
document.getElementById('yr').textContent=new Date().getFullYear();

// closer look tabs
$('[role=tab]').forEach(t=>t.addEventListener('click',()=>$('[role=tab]').forEach(x=>{const on=x===t;x.setAttribute('aria-selected',on);document.getElementById(x.getAttribute('aria-controls')).hidden=!on})));
$('.subs button').forEach(b=>b.addEventListener('click',()=>{
  const p=b.closest('.p-shot');p.querySelectorAll('.subs button').forEach(x=>x.setAttribute('aria-pressed',x===b));
  const i=p.querySelector('img');i.src=`assets/img/${b.dataset.img}.webp`;i.alt=b.textContent+' screen';
}));

// app launcher
const launch=document.querySelector('.launch'),opened=document.querySelector('.open'),back=document.querySelector('.back');
const show=on=>{opened.hidden=!on;back.hidden=!on;launch.hidden=on};
$('.app').forEach(a=>a.addEventListener('click',()=>{
  opened.querySelector('b').textContent=a.dataset.name+'.';
  opened.querySelector('span').textContent=a.dataset.cap.replace('&amp;','&');
  const i=opened.querySelector('img');i.src=`assets/img/${a.dataset.shot}.webp`;i.alt=a.dataset.name+' screen';
  show(true);back.focus({preventScroll:true});
}));
back.addEventListener('click',()=>show(false));

// highlights arrows
const rail=document.querySelector('.rail');
$('[data-rail]').forEach(b=>b.addEventListener('click',()=>rail.scrollBy({left:b.dataset.rail*(rail.querySelector('article').offsetWidth+20),behavior:calm?'auto':'smooth'})));

// statement: split into words so they can light up
const say=document.querySelector('[data-words]');
say.innerHTML=say.textContent.trim().split(/\s+/).map(w=>`<span>${w}</span>`).join(' ');
const words=[...say.children];

// scroll-driven effects
const bar=document.body.appendChild(Object.assign(document.createElement('div'),{className:'progress'}));
const hero=document.querySelector('.reveal-device'),steps=$('.steps li'),screens=$('.screens img'),meter=document.querySelector('.meter b');
const phones=$('.phone'),navLinks=$('#links a');
const clamp=v=>Math.min(1,Math.max(0,v));
let tick=false;
const onScroll=()=>{
  tick=false;
  const h=innerHeight,max=document.documentElement.scrollHeight-h;
  bar.style.transform=`scaleX(${max?scrollY/max:0})`;
  if(!calm){
    const k=clamp((h-hero.getBoundingClientRect().top)/(h*.85));
    hero.firstElementChild.style.setProperty('--tilt',`${14*(1-k)}deg`);
    hero.firstElementChild.style.setProperty('--zoom',.88+.12*k);
    const r=say.getBoundingClientRect(),p=clamp((h*.85-r.top)/(r.height+h*.3));
    words.forEach((w,i)=>w.classList.toggle('lit',i<p*words.length));
    const row=document.querySelector('.phones').getBoundingClientRect(),q=clamp((h-row.top)/h);
    phones.forEach((el,i)=>el.style.setProperty('--y',`${(1-q)*(i===1?30:90)}px`));
  }
  let on=0;steps.forEach((s,i)=>{if(s.getBoundingClientRect().top<h/2)on=i});
  steps.forEach((s,i)=>s.classList.toggle('on',i===on));
  screens.forEach((s,i)=>s.classList.toggle('on',i===on));
  meter.style.width=`${(on+1)/steps.length*100}%`;
  navLinks.forEach(a=>{const r=document.querySelector(a.getAttribute('href')).getBoundingClientRect();a.classList.toggle('active',r.top<h/2&&r.bottom>h/2)});
};
const queue=()=>{if(!tick){tick=true;requestAnimationFrame(onScroll)}};
addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);onScroll();

if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});
  $('.sec h2,.sec .sub,.device,.bento article,.dir article,.four div,#gst .slab').forEach(el=>{el.classList.add('rv');io.observe(el)});
}
