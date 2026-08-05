/**
 * 底部导航 + 面板切换
 * - 4 个底部按钮：home / rank / price / contact
 * - contact-link 锚点跳转
 */

import { playBottomSfx } from './audio.js';

export function initPanelSwitcher() {
  const bottomBtns = document.querySelectorAll('.bottom-bar .btn');
  const panels = document.querySelectorAll('.panel');
  const main = document.querySelector('.main');
  if (!bottomBtns.length || !panels.length) return;

  const switchTo = (target) => {
    playBottomSfx(target);
    bottomBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.target === target);
      b.classList.toggle('primary', b.dataset.target === target);
    });
    panels.forEach(p => p.classList.toggle('active', p.dataset.panel === target));
    if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
  };

  bottomBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTo(btn.dataset.target);
    });
  });

  document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchTo('contact');
    });
  });
}
