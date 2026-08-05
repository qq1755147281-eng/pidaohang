/**
 * 首页 4-banner 轮播
 * - 自动播放（2 秒切换）
 * - 左右箭头按钮
 * - 底部圆点指示器
 */

import { playAppSfx } from './audio.js';

export function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const dotsWrap = document.getElementById('carouselDots');
  if (!track) return;
  const dots = dotsWrap ? dotsWrap.querySelectorAll('.carousel-dot') : [];
  const arrows = document.querySelectorAll('.carousel-arrow');

  let carIdx = 0;
  const carTotal = 4;

  const go = (i) => {
    carIdx = (i + carTotal) % carTotal;
    track.style.transform = `translateX(-${carIdx * 25}%)`;
    dots.forEach((d, k) => d.classList.toggle('active', k === carIdx));
  };

  arrows.forEach(a => {
    a.addEventListener('click', () => {
      const dir = a.dataset.role === 'next' ? 1 : -1;
      playAppSfx('carousel-' + a.dataset.role);
      go(carIdx + dir);
      resetTimer();
    });
  });
  dots.forEach(d => {
    d.addEventListener('click', () => {
      playAppSfx('carousel-dot-' + d.dataset.i);
      go(parseInt(d.dataset.i));
      resetTimer();
    });
  });

  let carTimer = setInterval(() => go(carIdx + 1), 2000);
  function resetTimer() {
    clearInterval(carTimer);
    carTimer = setInterval(() => go(carIdx + 1), 2000);
  }
}
