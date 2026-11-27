const $=s=>document.querySelectorAll(s);
const burger=document.getElementById('burger'),links=document.getElementById('links');
const menu=o=>{links.classList.toggle('open',o);burger.setAttribute('aria-expanded',o)};
burger.addEventListener('click',()=>menu(!links.classList.contains('open')));
links.addEventListener('click',e=>{if(e.target.closest('a'))menu(false)});
const select=k=>$('[role=tab]').forEach(t=>{const on=t.id==='t-'+k;t.setAttribute('aria-selected',on);document.getElementById(t.getAttribute('aria-controls')).hidden=!on});
$('[role=tab]').forEach(t=>t.addEventListener('click',()=>select(t.id.slice(2))));
$('[data-tab]').forEach(a=>a.addEventListener('click',()=>select(a.dataset.tab)));
$('.subs button').forEach(b=>b.addEventListener('click',()=>{
  const p=b.closest('.p-shot');p.querySelectorAll('.subs button').forEach(x=>x.setAttribute('aria-pressed',x===b));
  const i=p.querySelector('img');i.src=`assets/img/${b.dataset.img}.webp`;i.alt=b.textContent+' screen';
}));
document.getElementById('yr').textContent=new Date().getFullYear();
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});
  $('.cards4 a,.show,.flow li,.dir article,.table').forEach(el=>{el.classList.add('rv');io.observe(el)});
}

// scroll story: the screen follows the step in the middle of the window
const steps=[...$('.steps li')],screens=[...$('.screens img')],meter=document.querySelector('.meter b');
const bar=document.querySelector('.progress');
const navLinks=[...links.querySelectorAll(':scope>a')];
let tick=false;
const onScroll=()=>{
  tick=false;
  const max=document.documentElement.scrollHeight-innerHeight;
  bar.style.transform=`scaleX(${max?scrollY/max:0})`;
  const mid=innerHeight/2;
  let on=0;steps.forEach((s,i)=>{if(s.getBoundingClientRect().top<mid)on=i});
  steps.forEach((s,i)=>s.classList.toggle('on',i===on));
  screens.forEach((s,i)=>s.classList.toggle('on',i===on));
  meter.style.width=`${(on+1)/steps.length*100}%`;
  navLinks.forEach(a=>{const r=document.querySelector(a.getAttribute('href')).getBoundingClientRect();a.classList.toggle('active',r.top<mid&&r.bottom>mid)});
};
addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});
onScroll();

// hero app launcher
const launch=document.querySelector('.launch'),opened=document.querySelector('.open'),back=document.querySelector('.back');
const show=on=>{opened.hidden=!on;back.hidden=!on;launch.hidden=on};
$('.app').forEach(a=>a.addEventListener('click',()=>{
  opened.querySelector('b').textContent=a.dataset.name+'.';
  opened.querySelector('span').textContent=a.dataset.cap.replace('&amp;','&');
  const i=opened.querySelector('img');i.src=`assets/img/${a.dataset.shot}.webp`;i.alt=a.dataset.name+' screen';
  show(true);back.focus({preventScroll:true});
}));
back.addEventListener('click',()=>show(false));
