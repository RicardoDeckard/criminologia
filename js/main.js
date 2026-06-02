/**
 * main.js — Punto de entrada principal
 * Criminología · Cátedra De Luca · UBA
 *
 * Coordina la carga de todos los módulos JavaScript.
 * El JavaScript es mejora progresiva: si falla, el sitio
 * funciona completamente en HTML y CSS puros.
 */

(function () {
  'use strict';

  /* --------------------------------------------------------
     CARGA DE MÓDULOS
     Los módulos están en archivos separados e incluidos
     en el HTML antes de este archivo. Este archivo los
     coordina y añade comportamientos globales.
     -------------------------------------------------------- */

  /* --------------------------------------------------------
     INICIALIZACIÓN GLOBAL
     -------------------------------------------------------- */
  function init() {
    // nav.js y mobile-menu.js se auto-inicializan con IIFE
    // Este archivo añade comportamientos que necesitan
    // coordinación entre módulos

    markCurrentPage();
    initScrollIndicator();
    initImageFallbacks();
  }

  /* --------------------------------------------------------
     MARCAR PÁGINA ACTUAL EN NAV
     Complementa nav.js con la clase visual correcta
     -------------------------------------------------------- */
  function markCurrentPage() {
    const path = window.location.pathname;
    const file = path.split('/').pop() || 'index.html';

    // Mapeo de archivos a clases del body para el sistema
    // de color de nav (nav-light = sobre hero oscuro)
    const lightPages = ['index.html', ''];

    if (lightPages.includes(file)) {
      document.body.classList.add('nav-light');
      document.body.classList.remove('nav-dark');
    } else {
      document.body.classList.add('nav-dark');
      document.body.classList.remove('nav-light');
    }
  }

  /* --------------------------------------------------------
     INDICADOR DE SCROLL — detener animación al hacer scroll
     -------------------------------------------------------- */
  function initScrollIndicator() {
    const scrollLine = document.querySelector('.hero-scroll-line');
    if (!scrollLine) return;

    let scrolled = false;

    function onScroll() {
      if (!scrolled && window.scrollY > 50) {
        scrolled = true;
        scrollLine.style.animationPlayState = 'paused';
        scrollLine.style.opacity = '0';
        scrollLine.style.transition = 'opacity 400ms ease';
        // Una vez detenido, no volver a escuchar
        window.removeEventListener('scroll', onScroll);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --------------------------------------------------------
     FALLBACKS DE IMÁGENES
     Si una imagen no carga, aplica un estado visual limpio
     -------------------------------------------------------- */
  function initImageFallbacks() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    images.forEach(function (img) {
      img.addEventListener('error', function () {
        // Imagen no disponible — aplicar fondo neutro
        img.style.backgroundColor = '#E8E4DC';
        img.style.minHeight = img.style.minHeight || '200px';
        img.removeAttribute('src');
        img.removeAttribute('srcset');
      });
    });
  }

  /* --------------------------------------------------------
     EJECUTAR AL CARGAR EL DOM
     -------------------------------------------------------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // El DOM ya está listo (script cargado defer/async o al final del body)
    init();
  }

})();
