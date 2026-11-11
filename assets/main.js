const burger=document.getElementById('burger'),links=document.getElementById('links');
burger.addEventListener('click',()=>{const o=links.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
links.addEventListener('click',e=>{if(e.target.tagName==='A'){links.classList.remove('open');burger.setAttribute('aria-expanded',false)}});
document.getElementById('yr').textContent=new Date().getFullYear();
const els=document.querySelectorAll('.card,.modules article,.rules article,.col,.show,.flow,.ledger');
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  els.forEach(el=>{el.classList.add('rv');io.observe(el)});
}
