/**
 * 应用点击效果 & 精选第一行克隆
 * - 通用 app-item 点击：烟花 + 应用音效
 * - 精选第一行：克隆热门生态排名前三到 .featured-row
 */

import { createFireworks, createCampExplosion } from './fireworks.js';
import { playAppSfx, playCampSound } from './audio.js';

export function initAppItemEffects() {
  document.querySelectorAll('.app-item').forEach(item => {
    item.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      createFireworks(x, y);
      playAppSfx(this.dataset.eco || 'app');
    });
  });
}

export function initFeaturedRow() {
  const row = document.getElementById('featuredRow');
  if (!row) return;
  const featuredEcos = ['派元宇宙土地', '派孵化器', '派宠物'];
  const featuredTags = ['热门生态排名第一', '热门生态排名二', '热门生态排名三'];
  featuredEcos.forEach((name, i) => {
    const orig = document.querySelector('.app-item[data-eco="' + name + '"]');
    if (!orig) return;
    const clone = orig.cloneNode(true);
    clone.classList.add('featured-card');
    clone.removeAttribute('data-idx');
    const nameEl = clone.querySelector('.app-name');
    if (nameEl) nameEl.textContent = name;
    let tag = clone.querySelector('.featured-tag');
    if (!tag) {
      tag = document.createElement('div');
      tag.className = 'featured-tag';
      clone.appendChild(tag);
    }
    tag.textContent = featuredTags[i] || '';
    // 复用原始 app-item 的弹窗逻辑
    clone.addEventListener('click', () => orig.click());
    row.appendChild(clone);
  });
}

export function initCampClickEffects() {
  const camps = document.querySelectorAll('.camp');
  camps.forEach((camp, index) => {
    camp.addEventListener('click', function () {
      const rect = this.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const isClockwise = index % 2 === 0;
      this.classList.add(isClockwise ? 'float-right' : 'float-left');
      setTimeout(() => {
        this.classList.remove('float-right', 'float-left');
      }, 800);
      createCampExplosion(centerX, centerY, index);
      playCampSound(index);
    });
  });
}
