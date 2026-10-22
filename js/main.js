(function () {
  'use strict';

  var P = 'img/certs/';
  var CERTS = [
    { t: 'AWS Certified Cloud Practitioner (CLF-C02)', by: 'TESDA Online Program', d: 'Oct 16, 2026', c: 'Cloud and AI', f: 'tesda-aws-cloud-practitioner.jpg' },
    { t: 'AWS Certified AI Practitioner (AIF-C01)', by: 'TESDA Online Program', d: 'Oct 16, 2026', c: 'Cloud and AI', f: 'tesda-aws-ai-practitioner.jpg' },
    { t: 'Fundamentals of Artificial Intelligence', by: 'TESDA Online Program', d: 'Oct 16, 2026', c: 'Cloud and AI', f: 'tesda-fundamentals-of-ai.jpg' },
    { t: 'Networking Basics', by: 'Cisco Networking Academy', d: 'Oct 16, 2026', c: 'Networking and IoT', f: 'cisco-networking-basics.jpg' },
    { t: 'Introduction to IoT and Digital Transformation', by: 'Cisco Networking Academy', d: 'Sep 28, 2026', c: 'Networking and IoT', f: 'cisco-iot-digital-transformation.jpg' },
    { t: 'Store data with variables in C#', by: 'Microsoft Learn', d: 'Sep 28, 2026', c: 'Programming', f: 'ms-c-sharp-variables.jpg' },
    { t: 'Perform basic operations on numbers in C#', by: 'Microsoft Learn', d: 'Sep 28, 2026', c: 'Programming', f: 'ms-c-sharp-numbers.jpg' },
    { t: 'Perform basic string formatting in C#', by: 'Microsoft Learn', d: 'Sep 28, 2026', c: 'Programming', f: 'ms-c-sharp-string-formatting.jpg' },
    { t: 'Write your first C# code', by: 'Microsoft Learn', d: 'Sep 28, 2026', c: 'Programming', f: 'ms-c-sharp-first-code.jpg' },
    { t: 'Microsoft Azure AI Fundamentals', by: 'TESDA Online Program', d: 'Sep 26, 2026', c: 'Cloud and AI', f: 'tesda-azure-ai-fundamentals.jpg' },
    { t: 'Microsoft Security, Compliance, and Identity Fundamentals', by: 'TESDA Online Program', d: 'Sep 26, 2026', c: 'Security', f: 'tesda-ms-security-fundamentals.jpg' },
    { t: 'AI Fundamentals: AI Automation Isn\u2019t Scary', by: 'UpskillTechPH Training Services', d: 'Sep 12, 2026', c: 'Cloud and AI', f: 'upskill-ai-fundamentals.jpg' },
    { t: 'IT Fundamentals: Intro to Information Systems', by: 'UpskillTechPH Training Services', d: 'Sep 11, 2026', c: 'Seminars', f: 'upskill-it-fundamentals.jpg' },
    { t: 'Integrating IoT in Capstone Project', by: 'Northeastern College, 10th IT Week', d: 'Aug 27, 2026', c: 'Networking and IoT', f: 'nc-iot-capstone.jpg' },
    { t: 'Programming Fundamentals', by: 'Northeastern College, 10th IT Week', d: 'Aug 27, 2026', c: 'Programming', f: 'nc-programming-fundametals.jfif' },
    { t: 'Video Editing Tips and Tricks', by: 'Northeastern College, 10th IT Week', d: 'Aug 27, 2026', c: 'Seminars', f: 'nc-video-editing.jfif' },
    { t: 'Introduction to ISO 9001 (Quality Management System Standards)', by: 'Adal Pilipinas, Cordillera Young Leaders Club', d: 'Jul 25, 2026', c: 'Seminars', f: 'adal-iso-9001.jfif' }
  ];

  var $ = function (id) { return document.getElementById(id); };
  var grid = $('certGrid'), filters = $('filters');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- certificates ---------- */
  var cats = ['All'];
  CERTS.forEach(function (c) { if (cats.indexOf(c.c) < 0) cats.push(c.c); });

  grid.innerHTML = CERTS.map(function (c, i) {
    return '<button type="button" class="cert reveal" data-cat="' + c.c + '" data-i="' + i + '" style="transition-delay:' + ((i % 3) * 80) + 'ms">' +
      '<div class="thumb"><img src="' + P + c.f + '" alt="Certificate: ' + c.t + '" loading="lazy" width="1400" height="990"></div>' +
      '<div class="info"><h3>' + c.t + '</h3><p>' + c.by + ' &middot; ' + c.d + '</p></div></button>';
  }).join('');

  filters.innerHTML = cats.map(function (n, i) {
    return '<button type="button" class="chip" aria-pressed="' + (i === 0) + '" data-cat="' + n + '">' + n + '</button>';
  }).join('');

  filters.addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    filters.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
    grid.querySelectorAll('.cert').forEach(function (card) {
      card.classList.toggle('hide', b.dataset.cat !== 'All' && card.dataset.cat !== b.dataset.cat);
    });
  });

  $('certCount').textContent = CERTS.length;

  /* ---------- lightbox ---------- */
  var box = $('lightbox');
  grid.addEventListener('click', function (e) {
    var card = e.target.closest('.cert'); if (!card) return;
    var c = CERTS[card.dataset.i];
    $('boxImg').src = P + c.f; $('boxImg').alt = 'Certificate: ' + c.t;
    $('boxCap').textContent = c.t + ' \u2013 ' + c.by + ', ' + c.d;
    if (box.showModal) box.showModal(); else box.setAttribute('open', '');
  });
  $('closeBox').addEventListener('click', function () { box.close(); });
  box.addEventListener('click', function (e) { if (e.target === box) box.close(); });

  /* ---------- scroll reveal ---------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- scroll progress, nav state, orb parallax, active link ---------- */
  var bar = $('progress'), nav = $('nav'), orb = $('orb'), ticking = false;
  var links = document.querySelectorAll('.menu a');
  var secs = Array.prototype.map.call(links, function (a) { return document.querySelector(a.getAttribute('href')); });

  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
    nav.classList.toggle('scrolled', y > 20);
    if (!reduce && y < window.innerHeight * 1.2) orb.style.transform = 'translate3d(0,' + (y * 0.25) + 'px,0)';
    var cur = -1;
    secs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = i; });
    links.forEach(function (a, i) { a.classList.toggle('active', i === cur); });
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var btn = $('menuBtn'), menu = $('menu');
  function setMenu(open) { menu.classList.toggle('open', open); btn.setAttribute('aria-expanded', open); }
  btn.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  $('year').textContent = new Date().getFullYear();
})();
