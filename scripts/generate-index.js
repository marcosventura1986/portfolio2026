#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PROJECTS_DIR = path.join(__dirname, '../content/projects');
const INDEX_FILE = path.join(__dirname, '../content/index.json');

console.log('🔨 Generating index.json...');

const files = fs.readdirSync(PROJECTS_DIR)
  .filter(file => file.endsWith('.json'))
  .sort();

const projects = files.map(file => {
  const filePath = path.join(PROJECTS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const project = JSON.parse(content);
  
  const slug = file.replace('.json', '');
  
  return {
    slug: slug,
    title_en: project.title_en,
    title_pt: project.title_pt || project.title_en,
    pillar: project.pillar,
    year: project.year,
    client: project.client,
    cover: project.cover,
    summary_en: project.summary_en,
    summary_pt: project.summary_pt || project.summary_en,
    published: project.published !== false
  };
})
.filter(project => project.published)
.sort((a, b) => b.year - a.year);

fs.writeFileSync(INDEX_FILE, JSON.stringify(projects, null, 2));

console.log(`✅ Generated index.json with ${projects.length} projects`);
