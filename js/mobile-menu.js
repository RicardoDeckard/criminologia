/**
 * mobile-menu.js — Menú móvil con overlay y focus trap
 * Criminología · Cátedra De Luca · UBA
 *
 * Responsabilidades:
 * 1. Abrir y cerrar el menú de overlay en móvil
 * 2. Mantener el foco dentro del menú cuando está abierto (focus trap)
 * 3. Cerrar con la tecla Escape
 * 4. Devolver el foco al botón de apertura al cerrar
 * 5. Bloquear el scroll del body cuando el menú está abierto
 */

(function () {
  'use strict';

  const toggleBtn = document.getElementById('nav-menu-toggle');
  const overlay   = document.getElementById('nav-mobile-overlay');
  const closeBtn  = document.getElementById('nav-mobile-close');

  if (!toggleBtn || !overlay || !closeBtn) return;

  /* --------------------------------------------------------
     SELECTORES FOCUSABLES dentro del overlay
     -------------------------------------------------------- */
  const FOCUSABLE_SELECTORS = [
    'a[href]',
    'button:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ');

  /* --------------------------------------------------------
     ABRIR MENÚ
     -------------------------------------------------------- */
  function openMenu() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Foco al botón de cierre
    closeBtn.focus();
  }

  /* --------------------------------------------------------
     CERRAR MENÚ
     -------------------------------------------------------- */
  function closeMenu() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    // Devolver foco al botón de apertura
    toggleBtn.focus();
  }

  /* --------------------------------------------------------
     FOCUS TRAP — mantener el foco dentro del overlay
     -------------------------------------------------------- */
  function handleFocusTrap(e) {
    if (!overlay.classList.contains('is-open')) return;
    if (e.key !== 'Tab') return;

    const focusable = Array.from(overlay.querySelectorAll(FOCUSABLE_SELECTORS));
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      // Tab hacia atrás
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      // Tab hacia adelante
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  /* --------------------------------------------------------
     CERRAR CON ESCAPE
     -------------------------------------------------------- */
  function handleKeydown(e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeMenu();
    }
    handleFocusTrap(e);
  }

  /* --------------------------------------------------------
     EVENTOS
     -------------------------------------------------------- */
  toggleBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  document.addEventListener('keydown', handleKeydown);

  // Cerrar al hacer clic fuera del contenido del menú
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      closeMenu();
    }
  });

  // Cerrar al navegar a otra página (click en link del menú)
  const menuLinks = overlay.querySelectorAll('a');
  menuLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

})();
