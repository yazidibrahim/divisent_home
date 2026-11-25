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
