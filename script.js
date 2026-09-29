(function(){
  // hamburger
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  burger.addEventListener('click', function(){
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.addEventListener('click', function(e){
    if(e.target.tagName === 'A'){ menu.classList.remove('open'); burger.setAttribute('aria-expanded','false'); }
  });

  // scroll reveal
  var els = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, {threshold:.14});
    els.forEach(function(el,i){ el.style.transitionDelay = (i%3*0.08)+'s'; io.observe(el); });
  } else {
    els.forEach(function(el){ el.classList.add('in'); });
  }

  // active nav on scroll
  var links = document.querySelectorAll('nav.menu a');
  var secs = [];
  links.forEach(function(a){
    var t = document.querySelector(a.getAttribute('href'));
    if(t) secs.push({a:a, t:t});
  });
  window.addEventListener('scroll', function(){
    var y = window.scrollY + 140, cur = secs[0];
    secs.forEach(function(s){ if(s.t.offsetTop <= y) cur = s; });
    links.forEach(function(a){ a.classList.remove('active'); });
    if(cur) cur.a.classList.add('active');
  }, {passive:true});
})();
