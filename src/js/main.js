/**
 * 应用主入口
 * - 加载顺序：QR 库 → 主模块
 * - 启动所有功能模块
 */

import './qrcode-lib.js'; // 注入 window.qrcode
import { initPanelSwitcher } from './panels.js';
import { initCarousel } from './carousel.js';
import { initEcoModal } from './modal.js';
import { initPriceVoting, initRankVoting } from './voting.js';
import { PiRotatingCards } from './rotating.js';
import { initAppItemEffects, initFeaturedRow, initCampClickEffects } from './app-items.js';

function boot() {
  initPanelSwitcher();
  initCarousel();
  initFeaturedRow();
  initEcoModal();
  initAppItemEffects();
  initCampClickEffects();
  initPriceVoting();
  initRankVoting();

  // 派币旋转卡片（需要容器渲染完成后）
  setTimeout(() => {
    new PiRotatingCards();
  }, 500);

  // 注册 Service Worker（PWA）
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.warn('SW registration failed:', err);
      });
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
