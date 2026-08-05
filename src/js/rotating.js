/**
 * 派币中心卡片 + 双轨道卡片动画
 * - PiRotatingCards 类
 * - 中心：呼吸缩放、点击爆裂动画
 * - 轨道：可拖拽、自动回归轨道
 */

import { playTone } from './audio.js';
import { createFireworks } from './fireworks.js';

export class PiRotatingCards {
  constructor() {
    this.container = document.querySelector('.pi-rotating-container');
    this.centerCard = document.querySelector('.pi-center-card');
    this.orbitCards = document.querySelectorAll('.pi-orbit-card');
    if (!this.container || !this.centerCard || this.orbitCards.length < 2) return;

    this.centerX = 0;
    this.centerY = 0;
    this.orbitRadius = 90;

    this.cards = [
      {
        element: this.orbitCards[0],
        angle: 0,
        speed: 0.015 + Math.random() * 0.01,
        baseSpeed: 0.015,
        offsetRadius: 0,
        isDragging: false,
        startX: 0,
        startY: 0,
        dragOffsetX: 0,
        dragOffsetY: 0,
        returnProgress: 0
      },
      {
        element: this.orbitCards[1],
        angle: Math.PI,
        speed: -(0.012 + Math.random() * 0.01),
        baseSpeed: -0.012,
        offsetRadius: 0,
        isDragging: false,
        startX: 0,
        startY: 0,
        dragOffsetX: 0,
        dragOffsetY: 0,
        returnProgress: 0
      }
    ];

    this.init();
  }

  init() {
    this.updateCenter();
    this.setupEventListeners();
    this.animate();
  }

  updateCenter() {
    const rect = this.container.getBoundingClientRect();
    this.centerX = rect.width / 2;
    this.centerY = rect.height / 2;
  }

  setupEventListeners() {
    this.centerCard.addEventListener('click', () => this.playCenterSound());

    this.cards.forEach((card, index) => {
      card.element.addEventListener('mousedown', (e) => this.onDragStart(e, index));
      card.element.addEventListener('touchstart', (e) => this.onTouchStart(e, index), { passive: true });
    });

    document.addEventListener('mousemove', (e) => this.onDragMove(e));
    document.addEventListener('mouseup', () => this.onDragEnd());
    document.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: true });
    document.addEventListener('touchend', () => this.onDragEnd());

    window.addEventListener('resize', () => this.updateCenter());

    this.cards.forEach((card, index) => {
      card.element.addEventListener('click', () => this.playOrbitSound(index));
    });
  }

  onDragStart(e, index) {
    const card = this.cards[index];
    if (card.isDragging) return;
    card.isDragging = true;
    card.element.classList.add('dragging');
    const rect = this.container.getBoundingClientRect();
    card.startX = e.clientX - rect.left;
    card.startY = e.clientY - rect.top;
    const currentStyle = window.getComputedStyle(card.element);
    card.dragOffsetX = parseFloat(currentStyle.left) || 0;
    card.dragOffsetY = parseFloat(currentStyle.top) || 0;
  }

  onTouchStart(e, index) {
    const touch = e.touches[0];
    this.onDragStart({ clientX: touch.clientX, clientY: touch.clientY }, index);
  }

  onDragMove(e) {
    this.cards.forEach(card => {
      if (card.isDragging) {
        const rect = this.container.getBoundingClientRect();
        const x = e.clientX - rect.left - card.startX + card.dragOffsetX;
        const y = e.clientY - rect.top - card.startY + card.dragOffsetY;
        card.element.style.left = x + 'px';
        card.element.style.top = y + 'px';
        card.element.style.transform = 'scale(1.1)';
      }
    });
  }

  onTouchMove(e) {
    const touch = e.touches[0];
    this.onDragMove({ clientX: touch.clientX, clientY: touch.clientY });
  }

  onDragEnd() {
    this.cards.forEach(card => {
      if (card.isDragging) {
        card.isDragging = false;
        card.element.classList.remove('dragging');
        card.returnProgress = 0;
      }
    });
  }

  animate() {
    const halfWidth = 42.5;
    const halfHeight = 42.5;

    this.cards.forEach((card, index) => {
      if (!card.isDragging) {
        if (card.returnProgress < 1) {
          card.returnProgress += 0.08;
          const currentLeft = parseFloat(card.element.style.left) || 0;
          const currentTop = parseFloat(card.element.style.top) || 0;
          const targetX = this.centerX - halfWidth + Math.cos(card.angle) * (this.orbitRadius + card.offsetRadius);
          const targetY = this.centerY - halfHeight + Math.sin(card.angle) * (this.orbitRadius + card.offsetRadius) * 0.4;
          const easeProgress = 1 - Math.pow(1 - card.returnProgress, 3);
          const x = currentLeft + (targetX - currentLeft) * easeProgress;
          const y = currentTop + (targetY - currentTop) * easeProgress;
          card.element.style.left = x + 'px';
          card.element.style.top = y + 'px';
          card.element.style.transform = `scale(${1 + (1 - easeProgress) * 0.1})`;
        } else {
          card.angle += card.speed;
          card.speed += (Math.random() - 0.5) * 0.002;
          card.speed = Math.max(-0.03, Math.min(0.03, card.speed));
          card.offsetRadius = Math.sin(Date.now() * 0.002 + index) * 15;
          const x = this.centerX - halfWidth + Math.cos(card.angle) * (this.orbitRadius + card.offsetRadius);
          const y = this.centerY - halfHeight + Math.sin(card.angle) * (this.orbitRadius + card.offsetRadius) * 0.4;
          card.element.style.left = x + 'px';
          card.element.style.top = y + 'px';
          card.element.style.transform = 'scale(1)';
        }
      }
    });

    requestAnimationFrame(() => this.animate());
  }

  playCenterSound() {
    playTone(880, { duration: 0.1, type: 'sine', volume: 0.2 });
    setTimeout(() => playTone(1100, { duration: 0.12, type: 'sine', volume: 0.18 }), 80);
    setTimeout(() => playTone(1320, { duration: 0.15, type: 'triangle', volume: 0.15 }), 160);

    const rect = this.centerCard.getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();
    createFireworks(
      rect.left - containerRect.left + rect.width / 2,
      rect.top - containerRect.top + rect.height / 2,
      ['#a855f7', '#c084fc', '#6c2b9e']
    );

    this.centerCard.classList.remove('click-burst');
    void this.centerCard.offsetWidth;
    this.centerCard.classList.add('click-burst');
    setTimeout(() => this.centerCard.classList.remove('click-burst'), 1300);
  }

  playOrbitSound(index) {
    if (this.cards[index].isDragging) return;
    const cardWidth = 85;
    const cardHeight = 85;
    const centerX = parseFloat(this.cards[index].element.style.left) + cardWidth / 2;
    const centerY = parseFloat(this.cards[index].element.style.top) + cardHeight / 2;

    if (index === 0) {
      playTone(520, { duration: 0.08, type: 'triangle', volume: 0.2 });
      setTimeout(() => playTone(659, { duration: 0.1, type: 'sine', volume: 0.18 }), 60);
      setTimeout(() => playTone(784, { duration: 0.12, type: 'triangle', volume: 0.15 }), 120);
      createFireworks(centerX, centerY, ['#fbbf24', '#f59e0b', '#fcd34d']);
    } else {
      playTone(659, { duration: 0.08, type: 'sawtooth', volume: 0.22 });
      setTimeout(() => playTone(880, { duration: 0.1, type: 'sine', volume: 0.18 }), 60);
      setTimeout(() => playTone(1047, { duration: 0.14, type: 'sine', volume: 0.14 }), 120);
      createFireworks(centerX, centerY, ['#ec4899', '#db2777', '#f472b6']);
    }
  }
}
