/**
 * nav.js — Comportamiento de la navegación global
 * Criminología · Cátedra De Luca · UBA
 *
 * Responsabilidades:
 * 1. Añadir clase .is-scrolled cuando el usuario baja más de 100px
 * 2. Marcar el ítem de navegación activo según la URL actual
 */

(function () {
  'use strict';

  const nav = document.getElementById('nav-global');
  if (!nav) return;

  /* --------------------------------------------------------
     1. COMPORTAMIENTO EN SCROLL
     -------------------------------------------------------- */
  const SCROLL_THRESHOLD = 100;
  let ticking = false;

  function updateNavState() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateNavState);
      ticking = true;
    }
  }, { passive: true });

  // Ejecutar al cargar por si la página se carga con scroll
  updateNavState();

  /* --------------------------------------------------------
     2. MARCAR ÍTEM ACTIVO SEGÚN URL
     -------------------------------------------------------- */
  const currentPath = window.location.pathname;
  const currentFile = currentPath.split('/').pop() || 'index.html';

  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile-links a');

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;

    // Extraer el nombre del archivo del href
    const linkFile = href.split('/').pop();

    // Marcar como activo si coincide con la página actual
    if (linkFile === currentFile ||
        (currentFile === '' && linkFile === 'index.html') ||
        (currentFile === 'index.html' && linkFile === 'index.html')) {
      link.classList.add('nav-active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // En la página de inicio, la navegación tiene texto claro
  // esto está manejado por la clase .nav-light en el body
  // No se necesita JS adicional para eso

})();
