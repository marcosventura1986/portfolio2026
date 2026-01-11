// =====================================================
// Ventura Design - Main JavaScript
// =====================================================

(function() {
  'use strict';

  // State Management
  const state = {
    currentLang: 'en',
    activeFilters: ['all'],
    projects: [],
    backgroundSeeds: {},
    scrollPosition: 0,
    isMenuOpen: false
  };

  // i18n Dictionary
  const i18n = {
    en: {
      'nav.work': 'Work',
      'nav.cases': 'Cases',
      'nav.testimonials': 'Testimonials',
      'nav.social': 'Social',
      'nav.contact': 'Contact',
      'hero.subtitle': 'I craft clean visuals, fast websites, and refined 3D explorations — minimal by design.',
      'hero.cta': 'Explore the work',
      'work.title': 'What I Do',
      'work.graphic.title': 'Graphic',
      'work.graphic.desc': 'Identity, systems, and visual narratives that stick.',
      'work.web.title': 'Web',
      'work.web.desc': 'Lean UX, clean UI, fast builds — aesthetics with purpose.',
      'work.3d.title': '3D',
      'work.3d.desc': 'Product, motion, and form studies — crisp and performant.',
      'work.cta': 'View projects',
      'cases.title': 'Featured Work',
      'filter.all': 'All',
      'filter.graphic': 'Graphic',
      'filter.web': 'Web',
      'filter.3d': '3D',
      'testimonials.title': 'What Clients Say',
      'testimonial1.quote': 'All About Nectar has been working with Marcos for the past two years. It has been a pleasure as all design jobs are completed quickly with high level of quality and creativity. It\'s rare the first draft is not on point and makes it all very easy.',
      'testimonial2.quote': 'I always liked the creative energy and positive attitude Marcus brought to his work. When the time came for me to bring my own business to life, he was the natural choice. He has a rare creativity that combines artistry with cutting edge technology, meaning the project is both beautiful, functional and powerful.',
      'social.title': 'Find Me Online',
      'contact.title': 'Got a project in mind? Let\'s talk.',
      'contact.cta': 'Start a conversation',
      'contact.schedule': 'Schedule a call',
      'footer.work': 'Work',
      'footer.studio': 'Studio',
      'footer.social': 'Social',
      'footer.graphic': 'Graphic',
      'footer.web': 'Web',
      'footer.3d': '3D',
      'footer.about': 'About',
      'footer.contact': 'Contact',
      'footer.privacy': 'Privacy',
      'project.back': 'Back to Work',
      'project.view': 'Read the process'
    },
    'pt-BR': {
      'nav.work': 'Trabalho',
      'nav.cases': 'Cases',
      'nav.testimonials': 'Depoimentos',
      'nav.social': 'Social',
      'nav.contact': 'Contato',
      'hero.subtitle': 'Crio visuais limpos, sites rápidos e explorações 3D refinadas — minimal por design.',
      'hero.cta': 'Explorar trabalhos',
      'work.title': 'O que faço',
      'work.graphic.title': 'Gráfico',
      'work.graphic.desc': 'Identidade, sistemas e narrativas visuais marcantes.',
      'work.web.title': 'Web',
      'work.web.desc': 'UX enxuta, UI limpa, builds rápidas — estética com propósito.',
      'work.3d.title': '3D',
      'work.3d.desc': 'Estudos de produto, movimento e forma — nítidos e performáticos.',
      'work.cta': 'Ver projetos',
      'cases.title': 'Trabalhos em Destaque',
      'filter.all': 'Todos',
      'filter.graphic': 'Gráfico',
      'filter.web': 'Web',
      'filter.3d': '3D',
      'testimonials.title': 'O que dizem os clientes',
      'testimonial1.quote': 'Ventura transformou nossa identidade de marca em algo verdadeiramente memorável. Rápido, profissional e criativo.',
      'testimonial2.quote': 'O trabalho 3D foi excepcional. Limpo, moderno e exatamente o que precisávamos para o lançamento do produto.',
      'social.title': 'Me encontre online',
      'contact.title': 'Tem um projeto em mente? Vamos conversar.',
      'contact.cta': 'Iniciar conversa',
      'contact.schedule': 'Agendar chamada',
      'footer.work': 'Trabalho',
      'footer.studio': 'Estúdio',
      'footer.social': 'Social',
      'footer.graphic': 'Gráfico',
      'footer.web': 'Web',
      'footer.3d': '3D',
      'footer.about': 'Sobre',
      'footer.contact': 'Contato',
      'footer.privacy': 'Privacidade',
      'project.back': 'Voltar aos trabalhos',
      'project.view': 'Ler o processo'
    }
  };

  // Initialize
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    loadLanguagePreference();
    setupEventListeners();
    setupScrollEffects();
    setupScrollReveal();
    loadProjects();
    initBackgroundLayers();
    checkForCMSReturn();
    setupFilterPersistence();
  }

  // Event Listeners
  function setupEventListeners() {
    // Language toggle
    const langToggle = document.querySelector('.lang-toggle');
    const langDropdown = document.querySelector('.lang-dropdown');
    
    if (langToggle) {
      langToggle.addEventListener('click', () => {
        langDropdown.hidden = !langDropdown.hidden;
      });

      langDropdown.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          const lang = btn.dataset.lang;
          changeLanguage(lang);
          langDropdown.hidden = true;
        });
      });
    }

    // Mobile menu
    const menuToggle = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', toggleMobileMenu);
      
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          closeMobileMenu();
        });
      });

      // Close on ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && state.isMenuOpen) {
          closeMobileMenu();
        }
      });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    // Filter controls
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', handleFilterClick);
    });

    // Pillar links
    document.querySelectorAll('.pillar__link').forEach(link => {
      link.addEventListener('click', handlePillarClick);
    });

    // Footer filter links
    document.querySelectorAll('[data-filter]').forEach(link => {
      link.addEventListener('click', handleFilterLink);
    });

    // Click outside to close dropdowns
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.lang-toggle') && !e.target.closest('.lang-dropdown')) {
        document.querySelector('.lang-dropdown').hidden = true;
      }
    });
  }

  // Language Functions
  function loadLanguagePreference() {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    changeLanguage(savedLang);
  }

  function changeLanguage(lang) {
    state.currentLang = lang;
    localStorage.setItem('preferredLang', lang);
    document.documentElement.lang = lang === 'pt-BR' ? 'pt' : 'en';
    
    // Update lang toggle text
    const langToggle = document.querySelector('.lang-toggle span');
    if (langToggle) {
      langToggle.textContent = lang === 'pt-BR' ? 'PT' : 'EN';
    }

    // Update all i18n elements
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
      const key = el.dataset.i18nKey;
      if (i18n[lang][key]) {
        el.textContent = i18n[lang][key];
      }
    });

    // Update hreflang links
    updateHreflangLinks(lang);
  }

  function updateHreflangLinks(lang) {
    const hreflangs = document.querySelectorAll('link[hreflang]');
    hreflangs.forEach(link => {
      const linkLang = link.getAttribute('hreflang');
      if (linkLang === 'en' && lang === 'en') {
        link.href = window.location.pathname;
      } else if (linkLang === 'pt-BR' && lang === 'pt-BR') {
        link.href = '/pt' + window.location.pathname;
      }
    });
  }

  // Mobile Menu
  function toggleMobileMenu() {
    state.isMenuOpen = !state.isMenuOpen;
    const menuToggle = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuToggle.classList.toggle('is-active');
    menuToggle.setAttribute('aria-expanded', state.isMenuOpen);
    mobileMenu.classList.toggle('is-open');
    
    // Lock body scroll
    document.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
    
    // Focus trap
    if (state.isMenuOpen) {
      trapFocus(mobileMenu);
    }
  }

  function closeMobileMenu() {
    state.isMenuOpen = false;
    const menuToggle = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (menuToggle) {
      menuToggle.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
    if (mobileMenu) {
      mobileMenu.classList.remove('is-open');
    }
    document.body.style.overflow = '';
  }

  function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    });

    firstFocusable.focus();
  }

  // Scroll Effects
  function setupScrollEffects() {
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', throttle(() => {
      const currentScroll = window.scrollY;
      
      // Header shrink
      if (currentScroll > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      
      lastScroll = currentScroll;
      state.scrollPosition = currentScroll;
    }, 100));
  }

  // Smooth Scroll
  function handleSmoothScroll(e) {
    const targetId = e.currentTarget.getAttribute('href');
    if (targetId === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const offset = 80; // Header height
      const targetPosition = target.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Scroll Reveal
  function setupScrollReveal() {
    const reveals = document.querySelectorAll('[data-reveal]');
    
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.revealDelay || 0;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay);
          
          // Only reveal once
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    reveals.forEach(el => observer.observe(el));
  }

  // Project Loading
  async function loadProjects() {
    try {
      const response = await fetch('/content/index.json');
      if (!response.ok) {
        // If index.json doesn't exist yet, create sample data
        state.projects = getSampleProjects();
      } else {
        state.projects = await response.json();
      }
      renderCatalogue();
    } catch (error) {
      console.error('Error loading projects:', error);
      state.projects = getSampleProjects();
      renderCatalogue();
    }
  }

  function getSampleProjects() {
    return [
      {
        slug: 'nectar',
        title_en: 'Nectar — Brand & Event System',
        title_pt: 'Nectar — Sistema de Marca e Eventos',
        pillar: 'graphic',
        year: 2025,
        client: 'Nectar',
        cover: '/static/uploads/nectar-cover.jpg',
        summary_en: 'A warm, modern identity for a honey-based skincare line.'
      },
      {
        slug: 'o-caviar-brand',
        title_en: 'O Caviar — Brand & Packaging',
        title_pt: 'O Caviar — Marca e Embalagem',
        pillar: 'graphic',
        year: 2025,
        client: 'O Caviar',
        cover: '/static/uploads/o-caviar-cover.jpg',
        summary_en: 'Luxury caviar brand with high-contrast typography.'
      },
      {
        slug: 'sumoqubes-brand',
        title_en: 'SumoQubes — IP Branding',
        title_pt: 'SumoQubes — Branding de IP',
        pillar: 'graphic',
        year: 2024,
        client: 'SumoQubes',
        cover: '/static/uploads/sumoqubes-cover.jpg',
        summary_en: 'Playful but clear identity for gaming IP.'
      }
    ];
  }

  function renderCatalogue(filter = 'all') {
    const catalogue = document.getElementById('catalogue');
    if (!catalogue) return;
    
    const filteredProjects = filter === 'all' 
      ? state.projects 
      : state.projects.filter(p => p.pillar === filter);
    
    catalogue.innerHTML = filteredProjects.map(project => `
      <article class="project-card" data-pillar="${project.pillar}" data-reveal>
        <a href="project/${project.slug}.html">
          <div class="project-card__image">
            <img src="${project.cover}" alt="${project.title_en}" loading="lazy">
          </div>
          <div class="project-card__content">
            <h3 class="project-card__title">${project['title_' + state.currentLang] || project.title_en}</h3>
            <div class="project-card__meta">
              <span>${project.client}</span>
              <span>${project.year}</span>
              <span class="pill pill--${project.pillar}">${project.pillar}</span>
            </div>
            <p class="project-card__desc">${project['summary_' + state.currentLang] || project.summary_en}</p>
            <span class="project-card__link">
              ${i18n[state.currentLang]['project.view']}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 8H12M12 8L8 4M12 8L8 12" stroke="currentColor" stroke-width="2"/>
              </svg>
            </span>
          </div>
        </a>
      </article>
    `).join('');
    
    // Re-setup scroll reveal for new elements
    setupScrollReveal();
  }

  // Filter Functions
  function handleFilterClick(e) {
    const filter = e.target.dataset.filter;
    setActiveFilter(filter);
    renderCatalogue(filter);
  }

  function handlePillarClick(e) {
    e.preventDefault();
    const filter = e.currentTarget.dataset.filter;
    setActiveFilter(filter);
    
    // Scroll to cases section
    const cases = document.getElementById('cases');
    if (cases) {
      const offset = 80;
      window.scrollTo({
        top: cases.offsetTop - offset,
        behavior: 'smooth'
      });
      
      setTimeout(() => renderCatalogue(filter), 500);
    }
  }

  function handleFilterLink(e) {
    if (e.currentTarget.href && e.currentTarget.href.includes('#')) {
      e.preventDefault();
      const filter = e.currentTarget.dataset.filter;
      setActiveFilter(filter);
      renderCatalogue(filter);
      
      // Scroll to cases
      const cases = document.getElementById('cases');
      if (cases) {
        window.scrollTo({
          top: cases.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  }

  function setActiveFilter(filter) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    // Save filter state
    sessionStorage.setItem('activeFilter', filter);
    state.activeFilters = [filter];
  }

  function setupFilterPersistence() {
    const savedFilter = sessionStorage.getItem('activeFilter');
    if (savedFilter) {
      setActiveFilter(savedFilter);
      renderCatalogue(savedFilter);
    }
  }

  // Background Layers
  function initBackgroundLayers() {
    const layer = document.querySelector('.global-background .background-layer');
    
    if (layer) {
      // Renderiza formas únicas e variadas
      renderGlobalBackgroundShapes(layer);
      
      // Adiciona animação de breathing
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animateShapesBreathing(layer);
      }
    }
  }

  function renderGlobalBackgroundShapes(layer) {
    // Define viewBox para usar coordenadas absolutas
    layer.setAttribute('viewBox', '0 0 1000 1000');
    layer.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    
    const shapes = generateGlobalShapes();
    layer.innerHTML = shapes;
    
    // Adiciona animação de breathing
    animateShapesBreathing(layer);
  }
  
  function animateShapesBreathing(layer) {
    const shapes = layer.querySelectorAll('circle, rect, polygon');
    
    shapes.forEach((shape, index) => {
      const breatheDuration = 3000 + Math.random() * 4000; // 3-7 seconds
      const rotateDuration = 120000 + Math.random() * 60000; // 120-180 seconds
      const delay = Math.random() * 2000; // Random delay 0-2s
      
      // For SVG elements, use transform-box to make transform-origin work correctly
      shape.style.transformBox = 'fill-box';
      shape.style.transformOrigin = '50% 50%';
      shape.style.animationComposition = 'add';
      
      // Create unique drift animation for this shape
      const driftDuration = 30000 + Math.random() * 20000; // 30-50 seconds for full drift cycle
      const driftDelay = Math.random() * 10000; // 0-10s random start
      const driftX = (Math.random() - 0.5) * 100; // -50 to 50px
      const driftY = (Math.random() - 0.5) * 100; // -50 to 50px
      
      // Create unique keyframe for this shape
      const animName = `drift-${index}`;
      const keyframes = `
        @keyframes ${animName} {
          0%, 100% { 
            translate: 0px 0px;
          }
          50% { 
            translate: ${driftX}px ${driftY}px;
          }
        }
      `;
      
      // Add keyframe to stylesheet if not already added
      if (!document.querySelector(`style[data-anim="${animName}"]`)) {
        const style = document.createElement('style');
        style.setAttribute('data-anim', animName);
        style.textContent = keyframes;
        document.head.appendChild(style);
      }
      
      // Apply all three animations - they will compose together
      shape.style.animation = `breathe ${breatheDuration}ms ease-in-out ${delay}ms infinite, rotate ${rotateDuration}ms linear infinite, ${animName} ${driftDuration}ms ease-in-out ${driftDelay}ms infinite`;
    });
  }

  function generateGlobalShapes() {
    // Todas as cores disponíveis para variedade
    const colors = [
      { fill: 'rgba(127, 255, 202, 0.04)', stroke: 'rgba(127, 255, 202, 0.85)' },      // mint outline brilhante
      { fill: 'rgba(255, 181, 221, 0.04)', stroke: 'rgba(255, 181, 221, 0.85)' },      // pink outline brilhante
      { fill: 'rgba(163, 0, 88, 0.04)', stroke: 'rgba(163, 0, 88, 0.85)' }             // magenta outline brilhante
    ];
    
    // Formas menores e mais discretas - grid 1000x1000
    const shapesConfig = [
      // Grandes discretas (80-120px) - poucas
      { x: 800, y: 150, size: 100, type: 0, colorIdx: 0, outline: true },
      { x: 450, y: 480, size: 110, type: 1, colorIdx: 0, outline: false },
      { x: 300, y: 880, size: 120, type: 0, colorIdx: 1, outline: false },
      
      // Médias (50-75px) - maioria
      { x: 150, y: 300, size: 70, type: 4, colorIdx: 1, outline: false },
      { x: 850, y: 320, size: 80, type: 3, colorIdx: 2, outline: false },
      { x: 750, y: 500, size: 65, type: 0, colorIdx: 1, outline: true },
      { x: 120, y: 680, size: 90, type: 2, colorIdx: 2, outline: true },
      { x: 550, y: 700, size: 70, type: 4, colorIdx: 0, outline: false },
      { x: 820, y: 720, size: 60, type: 3, colorIdx: 1, outline: false },
      { x: 700, y: 900, size: 75, type: 1, colorIdx: 2, outline: true },
      
      // Pequenas (30-45px) - detalhes
      { x: 520, y: 220, size: 35, type: 2, colorIdx: 2, outline: false },
      { x: 350, y: 420, size: 30, type: 1, colorIdx: 0, outline: true },
      { x: 680, y: 380, size: 40, type: 4, colorIdx: 1, outline: false },
      { x: 920, y: 550, size: 32, type: 0, colorIdx: 2, outline: true },
      { x: 250, y: 580, size: 28, type: 3, colorIdx: 0, outline: false },
      { x: 580, y: 820, size: 45, type: 2, colorIdx: 1, outline: false },
      { x: 80, y: 850, size: 35, type: 4, colorIdx: 0, outline: false },
    ];
    
    let shapes = '';
    
    shapesConfig.forEach((config) => {
      const color = colors[config.colorIdx];
      
      if (config.outline) {
        const opacity = 0.4 + Math.random() * 0.2;
        
        switch(config.type) {
          case 0: // Circle
            shapes += `<circle cx="${config.x}" cy="${config.y}" r="${config.size}" fill="none" stroke="${color.stroke}" stroke-width="1.5" opacity="${opacity}"/>`;
            break;
          case 1: // Square
            shapes += `<rect x="${config.x - config.size}" y="${config.y - config.size}" width="${config.size * 2}" height="${config.size * 2}" fill="none" stroke="${color.stroke}" stroke-width="1.5" opacity="${opacity}" rx="6"/>`;
            break;
          case 2: // Triangle
            const t = `${config.x},${config.y - config.size} ${config.x - config.size},${config.y + config.size} ${config.x + config.size},${config.y + config.size}`;
            shapes += `<polygon points="${t}" fill="none" stroke="${color.stroke}" stroke-width="1.5" opacity="${opacity}"/>`;
            break;
          case 3: // Diamond
            const d = `${config.x},${config.y - config.size} ${config.x + config.size},${config.y} ${config.x},${config.y + config.size} ${config.x - config.size},${config.y}`;
            shapes += `<polygon points="${d}" fill="none" stroke="${color.stroke}" stroke-width="1.5" opacity="${opacity}"/>`;
            break;
          case 4: // Pentagon
            const pent = [];
            for (let j = 0; j < 5; j++) {
              const angle = (Math.PI * 2 / 5) * j - Math.PI / 2;
              pent.push(`${config.x + config.size * Math.cos(angle)},${config.y + config.size * Math.sin(angle)}`);
            }
            shapes += `<polygon points="${pent.join(' ')}" fill="none" stroke="${color.stroke}" stroke-width="1.5" opacity="${opacity}"/>`;
            break;
        }
      } else {
        switch(config.type) {
          case 0: // Circle
            shapes += `<circle cx="${config.x}" cy="${config.y}" r="${config.size}" fill="${color.fill}"/>`;
            break;
          case 1: // Square
            shapes += `<rect x="${config.x - config.size}" y="${config.y - config.size}" width="${config.size * 2}" height="${config.size * 2}" fill="${color.fill}" rx="6"/>`;
            break;
          case 2: // Triangle
            const t = `${config.x},${config.y - config.size} ${config.x - config.size},${config.y + config.size} ${config.x + config.size},${config.y + config.size}`;
            shapes += `<polygon points="${t}" fill="${color.fill}"/>`;
            break;
          case 3: // Diamond
            const d = `${config.x},${config.y - config.size} ${config.x + config.size},${config.y} ${config.x},${config.y + config.size} ${config.x - config.size},${config.y}`;
            shapes += `<polygon points="${d}" fill="${color.fill}"/>`;
            break;
          case 4: // Pentagon
            const pent = [];
            for (let j = 0; j < 5; j++) {
              const angle = (Math.PI * 2 / 5) * j - Math.PI / 2;
              pent.push(`${config.x + config.size * Math.cos(angle)},${config.y + config.size * Math.sin(angle)}`);
            }
            shapes += `<polygon points="${pent.join(' ')}" fill="${color.fill}"/>`;
            break;
        }
      }
    });
    
    return shapes;
  }

  function animateBackgroundBreathing(layer) {
    const shapes = layer.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
      const duration = 6000 + Math.random() * 4000; // Duração lenta (6-10s)
      const delay = index * 200;
      
      // Breathing e rotação muito lenta
      const breathingIntensity = Math.random() < 0.3 ? 'breathe-rotate-subtle' : 
                                  Math.random() < 0.6 ? 'breathe-rotate-medium' : 'breathe-rotate-strong';
      
      shape.style.transformOrigin = 'center';
      shape.style.animation = `${breathingIntensity} ${duration}ms ease-in-out ${delay}ms infinite`;
    });
  }

  function setupBackgroundObserver(layer) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const shapes = entry.target.querySelectorAll('.shape');
        shapes.forEach(shape => {
          shape.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
        });
      });
    });
    
    observer.observe(layer);
  }

  // Toast Notifications
  function showToast(message, type = 'success') {
    const container = document.querySelector('.toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // CMS Return Check
  function checkForCMSReturn() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('cms') === 'success') {
      showToast('Project created successfully!', 'success');
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  // Utility Functions
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  // Add breathing and rotation animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes breathe {
      0%, 100% { 
        transform: scale(1);
      }
      50% { 
        transform: scale(1.05);
      }
    }
    
    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;
  document.head.appendChild(style);

})();

// Click anywhere to rearrange shapes
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
  
  const layer = document.querySelector('.background-layer');
  if (!layer) return;
  
  const shapes = layer.querySelectorAll('circle, rect, polygon');
  shapes.forEach(function(shape, i) {
    const newX = 100 + Math.random() * 800;
    const newY = 100 + Math.random() * 800;
    
    let currentX, currentY;
    if (shape.tagName === 'circle') {
      currentX = parseFloat(shape.getAttribute('cx'));
      currentY = parseFloat(shape.getAttribute('cy'));
    } else if (shape.tagName === 'rect') {
      currentX = parseFloat(shape.getAttribute('x'));
      currentY = parseFloat(shape.getAttribute('y'));
    } else if (shape.tagName === 'polygon') {
      const pts = shape.getAttribute('points').split(' ')[0].split(',');
      currentX = parseFloat(pts[0]);
      currentY = parseFloat(pts[1]);
    }
    
    const duration = 1500;
    const startTime = Date.now();
    
    const animate = function() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      const x = currentX + (newX - currentX) * eased;
      const y = currentY + (newY - currentY) * eased;
      
      if (shape.tagName === 'circle') {
        shape.setAttribute('cx', x);
        shape.setAttribute('cy', y);
      } else if (shape.tagName === 'rect') {
        shape.setAttribute('x', x);
        shape.setAttribute('y', y);
      } else if (shape.tagName === 'polygon') {
        const pts = shape.getAttribute('points').split(' ');
        const dx = x - parseFloat(pts[0].split(',')[0]);
        const dy = y - parseFloat(pts[0].split(',')[1]);
        const newPts = pts.map(function(p) {
          const xy = p.split(',');
          return (parseFloat(xy[0]) + dx) + ',' + (parseFloat(xy[1]) + dy);
        }).join(' ');
        shape.setAttribute('points', newPts);
      }
      
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    setTimeout(function() { requestAnimationFrame(animate); }, i * 30);
  });
});
