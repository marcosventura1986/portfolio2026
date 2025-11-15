#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PROJECTS_DIR = path.join(__dirname, '../content/projects');
const OUTPUT_DIR = path.join(__dirname, '../project');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function generateProjectPage(slug, data) {
  const pillarClass = data.pillar || 'graphic';
  const pillarLabel = pillarClass.charAt(0).toUpperCase() + pillarClass.slice(1);
  
  // Build gallery HTML
  let galleryHtml = '';
  if (data.gallery && data.gallery.length > 0) {
    galleryHtml = `
                <!-- Gallery -->
                <section class="project-gallery">
${data.gallery.map(item => `                    <figure>
                        <img src="${item.src}" alt="${item.caption || ''}" width="1200" height="800" loading="lazy">
                        <figcaption>${item.caption || ''}</figcaption>
                    </figure>`).join('\n')}
                </section>`;
  }
  
  // Build metrics HTML
  let metricsHtml = '';
  if (data.metrics && data.metrics.length > 0) {
    metricsHtml = `
                    <div class="project-metrics">
${data.metrics.map(m => `                        <div class="metric">
                            <span class="metric__value">${m.value}</span>
                            <span class="metric__label">${m.label}</span>
                        </div>`).join('\n')}
                    </div>`;
  }
  
  // Build testimonial HTML
  let testimonialHtml = '';
  if (data.testimonial && data.testimonial.quote) {
    testimonialHtml = `
                    <blockquote class="project-testimonial">
                        <p>"${data.testimonial.quote}"</p>
                        <footer>
                            <cite>
                                <strong>${data.testimonial.author || ''}</strong>
                                <span>${data.testimonial.role || ''}${data.testimonial.company ? ', ' + data.testimonial.company : ''}</span>
                            </cite>
                        </footer>
                    </blockquote>`;
  }
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title_en || slug} | Ventura Design</title>
    <meta name="description" content="${data.summary_en || ''}">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
    
    <!-- SEO & Meta -->
    <link rel="canonical" href="https://venturadesign.com/project/${slug}.html">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${data.title_en || slug}">
    <meta property="og:description" content="${data.summary_en || ''}">
    <meta property="og:image" content="${data.cover || ''}">
    <meta property="og:url" content="https://venturadesign.com/project/${slug}.html">
    <meta name="twitter:card" content="summary_large_image">
    
    <!-- Styles -->
    <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body>
    <!-- Skip to content -->
    <a href="#main" class="skip-link">Skip to content</a>
    
    <!-- Header -->
    <header class="header" role="banner">
        <div class="header__inner">
            <a href="../" class="header__logo" aria-label="Ventura Design home">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" fill="var(--text)"/>
                    <path d="M10 10L20 30L30 10" stroke="var(--bg)" stroke-width="2"/>
                </svg>
            </a>
            
            <nav class="nav" aria-label="Main navigation">
                <ul class="nav__list">
                    <li><a href="../#work">Work</a></li>
                    <li><a href="../#cases">Cases</a></li>
                    <li><a href="../#testimonials">Testimonials</a></li>
                    <li><a href="../#social">Social</a></li>
                    <li><a href="../#contact">Contact</a></li>
                </ul>
            </nav>
            
            <div class="header__actions">
                <button class="lang-toggle" aria-label="Change language" data-current="en">
                    <span>EN</span>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </button>
                
                <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
        
        <!-- Language dropdown -->
        <div class="lang-dropdown" hidden>
            <button data-lang="en">English</button>
            <button data-lang="pt-BR">Português (BR)</button>
        </div>
    </header>

    <!-- Mobile menu overlay -->
    <div class="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation" hidden>
        <nav>
            <ul>
                <li><a href="../#work">Work</a></li>
                <li><a href="../#cases">Cases</a></li>
                <li><a href="../#testimonials">Testimonials</a></li>
                <li><a href="../#social">Social</a></li>
                <li><a href="../#contact">Contact</a></li>
            </ul>
        </nav>
    </div>
    
    <!-- Global background shapes layer -->
    <div class="global-background">
        <svg class="background-layer" aria-hidden="true"></svg>
    </div>
    
    <main id="main" class="project-page">
        <!-- Hero -->
        <section class="project-hero">
            ${data.external_link ? `<a href="${data.external_link}" target="_blank" rel="noopener noreferrer" class="project-hero__link">` : ''}
            <div class="project-hero__image">
                <img src="${data.cover || ''}" alt="${data.title_en || ''}" width="1920" height="1080" loading="eager">
            </div>
            ${data.external_link ? `</a>` : ''}
        </section>
        
        <!-- Content -->
        <article class="project-content">
            <div class="container container--narrow">
                <!-- Title -->
                <header class="project-header">
                    <h1>${data.title_en || slug}</h1>
                    
                    <!-- Meta Bar -->
                    <div class="project-meta">
                        ${data.client ? `<div class="project-meta__item">
                            <span class="project-meta__label">Client</span>
                            <span class="project-meta__value">${data.client}</span>
                        </div>` : ''}
                        ${data.year ? `<div class="project-meta__item">
                            <span class="project-meta__label">Year</span>
                            <span class="project-meta__value">${data.year}</span>
                        </div>` : ''}
                        <div class="project-meta__item">
                            <span class="project-meta__label">Pillar</span>
                            <span class="project-meta__pill project-meta__pill--${pillarClass}">${pillarLabel}</span>
                        </div>
                        ${data.duration ? `<div class="project-meta__item">
                            <span class="project-meta__label">Duration</span>
                            <span class="project-meta__value">${data.duration}</span>
                        </div>` : ''}
                        ${data.role && data.role.length ? `<div class="project-meta__item">
                            <span class="project-meta__label">Role</span>
                            <span class="project-meta__value">${data.role.join(', ')}</span>
                        </div>` : ''}
                        ${data.tools && data.tools.length ? `<div class="project-meta__item">
                            <span class="project-meta__label">Tools</span>
                            <span class="project-meta__value">${data.tools.join(', ')}</span>
                        </div>` : ''}
                        ${data.external_link ? `<div class="project-meta__item">
                            <a href="${data.external_link}" target="_blank" rel="noopener noreferrer" class="btn btn--primary">
                                Visit Website →
                            </a>
                        </div>` : ''}
                    </div>
                </header>
                
                <!-- 30s Summary -->
                ${data.challenge_en || data.approach_en || data.outcome_en ? `<section class="project-summary">
                    <h2>30s Summary</h2>
                    <ul class="project-summary__list">
                        ${data.challenge_en ? `<li>
                            <strong>Challenge:</strong>
                            <span>${data.challenge_en}</span>
                        </li>` : ''}
                        ${data.approach_en ? `<li>
                            <strong>Approach:</strong>
                            <span>${data.approach_en}</span>
                        </li>` : ''}
                        ${data.outcome_en ? `<li>
                            <strong>Outcome:</strong>
                            <span>${data.outcome_en}</span>
                        </li>` : ''}
                    </ul>
                </section>` : ''}
                
                <!-- Body Content -->
                ${data.body_en ? `<section class="project-body">
                    ${data.body_en}
                </section>` : ''}
${galleryHtml}
                ${metricsHtml || testimonialHtml ? `
                <!-- Impact -->
                <section class="project-impact">
                    ${metricsHtml ? `<h2>Impact</h2>${metricsHtml}` : ''}${testimonialHtml}
                </section>` : ''}
                
                <!-- Navigation -->
                <nav class="project-nav" aria-label="Project navigation">
                    <a href="../#cases" class="btn btn--secondary">← Back to Work</a>
                </nav>
            </div>
        </article>
    </main>
    
    <!-- Footer -->
    <footer class="footer" role="contentinfo">
        <div class="container">
            <div class="footer__grid">
                <div class="footer__col">
                    <h4>Work</h4>
                    <ul>
                        <li><a href="../#cases">Graphic</a></li>
                        <li><a href="../#cases">Web</a></li>
                        <li><a href="../#cases">3D</a></li>
                    </ul>
                </div>
                <div class="footer__col footer__col--social">
                    <ul>
                        <li><a href="https://behance.net/venturadesign" aria-label="Behance">
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                                <rect x="8" y="12" width="6" height="8" stroke="currentColor" stroke-width="1.5"/>
                                <circle cx="20" cy="16" r="4" stroke="currentColor" stroke-width="1.5"/>
                            </svg>
                        </a></li>
                        <li><a href="https://artstation.com/venturadesign" aria-label="ArtStation">
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                                <path d="M8 22L16 8L24 22H8Z" stroke="currentColor" stroke-width="1.5"/>
                            </svg>
                        </a></li>
                        <li><a href="https://vimeo.com/venturadesign" aria-label="Vimeo">
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                                <path d="M8 16L12 20L16 12L20 18L24 14" stroke="currentColor" stroke-width="1.5"/>
                            </svg>
                        </a></li>
                        <li><a href="https://linkedin.com/in/venturadesign" aria-label="LinkedIn">
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                                <rect x="8" y="12" width="4" height="12" stroke="currentColor" stroke-width="1.5"/>
                                <path d="M16 16C16 14 17 12 20 12C23 12 24 14 24 16V24" stroke="currentColor" stroke-width="1.5"/>
                            </svg>
                        </a></li>
                        <li><a href="https://instagram.com/venturadesign" aria-label="Instagram">
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                                <rect x="8" y="8" width="16" height="16" rx="4" stroke="currentColor" stroke-width="1.5"/>
                                <circle cx="16" cy="16" r="4" stroke="currentColor" stroke-width="1.5"/>
                            </svg>
                        </a></li>
                    </ul>
                </div>
                <div class="footer__col">
                    <h4>Studio</h4>
                    <ul>
                        <li><a href="../#hero">About</a></li>
                        <li><a href="../#contact">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer__bottom">
                <svg width="24" height="24" viewBox="0 0 40 40" fill="none" class="footer__logo">
                    <rect width="24" height="24" fill="var(--text-dim)"/>
                    <path d="M6 6L12 18L18 6" stroke="var(--bg)" stroke-width="1.5"/>
                </svg>
                <p>&copy; 2025 Ventura Design. All rights reserved.</p>
            </div>
        </div>
    </footer>
    
    <!-- Scripts -->
    <script src="../assets/js/main.js"></script>
</body>
</html>`;

  return html;
}

// Main execution
console.log('🔨 Generating project pages from JSON...');

// Clean up old generated files (keep manually created ones by checking against JSON files)
const existingHtmlFiles = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.html'));
const jsonFiles = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.json'));
const jsonSlugs = jsonFiles.map(f => f.replace('.json', ''));

existingHtmlFiles.forEach(htmlFile => {
  const slug = htmlFile.replace('.html', '');
  // Only delete if corresponding JSON doesn't exist or is unpublished
  const jsonPath = path.join(PROJECTS_DIR, `${slug}.json`);
  if (fs.existsSync(jsonPath)) {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    if (data.published === false) {
      fs.unlinkSync(path.join(OUTPUT_DIR, htmlFile));
      console.log(`🗑️  Deleted ${htmlFile} (unpublished)`);
    }
  }
});

const files = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.json'));

files.forEach(file => {
  const slug = file.replace('.json', '');
  const data = JSON.parse(fs.readFileSync(path.join(PROJECTS_DIR, file), 'utf8'));
  
  // Skip unpublished
  if (data.published === false) {
    console.log(`⏭️  Skipped ${slug} (unpublished)`);
    return;
  }
  
  const html = generateProjectPage(slug, data);
  fs.writeFileSync(path.join(OUTPUT_DIR, `${slug}.html`), html);
  console.log(`✅ Generated ${slug}.html`);
});

console.log('✨ Done!');
