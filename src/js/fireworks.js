/**
 * 烟花/粒子爆炸效果
 * - createFireworks: 主点击烟花
 * - createCampExplosion: 价格卡片点击爆炸
 */

const FIREWORK_COLORS = ['#a855f7', '#c084fc', '#fbbf24', '#f59e0b'];

export function createFireworks(x, y, colors = FIREWORK_COLORS) {
  const container = document.body;
  for (let i = 0; i < 12; i++) {
    const fw = document.createElement('div');
    fw.className = 'firework';
    fw.style.left = x + 'px';
    fw.style.top = y + 'px';
    fw.style.background = colors[i % colors.length];
    fw.style.animationDelay = (i * 0.04) + 's';
    fw.style.transform = `scale(${0.5 + Math.random() * 0.5}) translateY(0) rotate(${i * 30}deg)`;
    fw.style.setProperty('--tx', (Math.random() - 0.5) * 80 + 'px');
    fw.style.setProperty('--ty', -40 - Math.random() * 40 + 'px');
    container.appendChild(fw);
    setTimeout(() => fw.remove(), 800);
  }
}

const CAMP_COLORS = [
  ['#a855f7', '#c084fc', '#6c2b9e'],
  ['#22c55e', '#4ade80', '#16a34a'],
  ['#fbbf24', '#f59e0b', '#fcd34d'],
  ['#f43f5e', '#f97316', '#fb923c']
];

export function createCampExplosion(x, y, campIndex) {
  const colorSet = CAMP_COLORS[campIndex % CAMP_COLORS.length];
  const container = document.body;
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2;
    const length = 30 + Math.random() * 40;
    const particle = document.createElement('div');
    particle.className = 'camp-click-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.background = colorSet[i % colorSet.length];
    particle.style.setProperty('--angle', angle + 'rad');
    particle.style.setProperty('--length', length + 'px');
    particle.style.transform = `translate(${Math.cos(angle) * length}px, ${Math.sin(angle) * length}px) scale(0)`;
    particle.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
    particle.style.opacity = '1';
    container.appendChild(particle);
    requestAnimationFrame(() => {
      particle.style.transform = `translate(${Math.cos(angle) * length}px, ${Math.sin(angle) * length}px) scale(1)`;
      particle.style.opacity = '0';
    });
    setTimeout(() => particle.remove(), 700);
  }
}
