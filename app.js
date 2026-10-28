import { projects } from './projects.js';

const themeButton = document.querySelector('.theme-toggle');
const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
};
let savedTheme;
try { savedTheme = localStorage.getItem('kass-theme'); } catch { /* Theme works without storage. */ }
setTheme(savedTheme === 'dark' ? 'dark' : 'light');
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(theme);
  try { localStorage.setItem('kass-theme', theme); } catch { /* Optional persistence. */ }
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('open', expanded);
  menuButton.setAttribute('aria-expanded', String(expanded));
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); } });

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let visible = 0;
    document.querySelectorAll('.project').forEach(project => {
      project.hidden = filter !== 'all' && !project.dataset.categories.split(' ').includes(filter);
      if (!project.hidden) visible++;
    });
    document.querySelectorAll('[data-filter]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    document.querySelector('#filter-status').textContent = `${visible} project${visible === 1 ? '' : 's'} shown.`;
  });
});

const dialog = document.querySelector('#project-dialog');
const content = document.querySelector('#dialog-content');
let lastTrigger;
function appendText(tag, text, className) {
  const element = document.createElement(tag);
  element.textContent = text;
  if (className) element.className = className;
  content.append(element);
  return element;
}
document.querySelectorAll('[data-project]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const project = projects[trigger.dataset.project];
    if (!project) return;
    lastTrigger = trigger;
    content.replaceChildren();
    appendText('p', project.category, 'eyebrow');
    const heading = appendText('h2', project.title); heading.id = 'dialog-title';
    appendText('p', project.role);
    if (project.image) {
      const image = document.createElement('img');
      image.src = project.image; image.alt = project.alt;
      content.append(image);
    }
    appendText('h3', 'Overview');
    appendText('p', project.overview);
    if (project.process) {
      appendText('h3', 'My contribution & process');
      const list = document.createElement('ol');
      project.process.forEach(step => { const item = document.createElement('li'); item.textContent = step; list.append(item); });
      content.append(list);
    }
    appendText('h3', project.process ? 'Design into implementation' : 'A closer look');
    appendText('p', project.outcome);
    appendText('h3', 'Focus');
    appendText('p', project.tags, 'detail-tags');
    if (project.link) {
      const link = appendText('a', project.linkText, 'button primary');
      link.href = project.link; link.target = '_blank'; link.rel = 'noopener noreferrer';
    }
    dialog.showModal();
    dialog.scrollTop = 0;
    document.querySelector('.dialog-close').focus();
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => {
  if (e.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) dialog.close();
  }
});
dialog.addEventListener('close', () => lastTrigger?.focus());

document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('khinnyatikyaw@gmail.com');
    status.textContent = 'Email copied.';
  } catch { status.textContent = 'Please use the email link to get in touch.'; }
});
document.querySelector('#year').textContent = new Date().getFullYear();
