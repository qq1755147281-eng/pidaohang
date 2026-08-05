/**
 * 音效系统
 * - Web Audio API 生成器
 * - 18 种应用音效模板
 * - 4 个底部导航的差异化音效
 * - 通用点击 / 投票音效
 */

let _audioCtx = null;

export function getAudioCtx() {
  if (!_audioCtx) {
    try {
      _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      _audioCtx = null;
    }
  }
  if (_audioCtx && _audioCtx.state === 'suspended') {
    _audioCtx.resume();
  }
  return _audioCtx;
}

export function playTone(freq, { duration = 0.12, type = 'sine', volume = 0.18, sweepTo = null } = {}) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  if (sweepTo) osc.frequency.exponentialRampToValueAtTime(sweepTo, ctx.currentTime + duration);
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration + 0.02);
}

// 18 种不同风格的音效模板
const appSfxPatterns = [
  // 0: 上升三和弦（明亮）
  () => { playTone(523, { duration: 0.08, type: 'sine', volume: 0.18 }); setTimeout(() => playTone(659, { duration: 0.1, type: 'triangle', volume: 0.15 }), 55); setTimeout(() => playTone(784, { duration: 0.12, type: 'sine', volume: 0.14 }), 110); },
  // 1: 下降三和弦（稳重）
  () => { playTone(784, { duration: 0.08, type: 'sine', volume: 0.18 }); setTimeout(() => playTone(659, { duration: 0.1, type: 'triangle', volume: 0.15 }), 55); setTimeout(() => playTone(523, { duration: 0.14, type: 'sine', volume: 0.14 }), 110); },
  // 2: 上扫（未来感）
  () => { playTone(440, { duration: 0.1, type: 'sawtooth', volume: 0.12, sweepTo: 1200 }); setTimeout(() => playTone(880, { duration: 0.1, type: 'triangle', volume: 0.14 }), 60); },
  // 3: 下扫（厚实）
  () => { playTone(1100, { duration: 0.1, type: 'sawtooth', volume: 0.12, sweepTo: 300 }); setTimeout(() => playTone(440, { duration: 0.12, type: 'sine', volume: 0.14 }), 60); },
  // 4: 跳跃双音
  () => { playTone(660, { duration: 0.08, type: 'square', volume: 0.14 }); setTimeout(() => playTone(990, { duration: 0.08, type: 'square', volume: 0.14 }), 60); setTimeout(() => playTone(880, { duration: 0.12, type: 'sine', volume: 0.14 }), 120); },
  // 5: 晶莹水滴
  () => { playTone(1320, { duration: 0.06, type: 'sine', volume: 0.18, sweepTo: 880 }); setTimeout(() => playTone(1760, { duration: 0.08, type: 'sine', volume: 0.12 }), 80); },
  // 6: 8位跳跃
  () => { playTone(523, { duration: 0.07, type: 'square', volume: 0.14 }); setTimeout(() => playTone(784, { duration: 0.07, type: 'square', volume: 0.14 }), 50); setTimeout(() => playTone(1047, { duration: 0.1, type: 'square', volume: 0.14 }), 100); },
  // 7: 弹跳音
  () => { playTone(392, { duration: 0.07, type: 'sine', volume: 0.18 }); setTimeout(() => playTone(523, { duration: 0.07, type: 'sine', volume: 0.16 }), 45); setTimeout(() => playTone(659, { duration: 0.07, type: 'sine', volume: 0.14 }), 90); setTimeout(() => playTone(880, { duration: 0.14, type: 'triangle', volume: 0.14 }), 135); },
  // 8: 神秘低语
  () => { playTone(220, { duration: 0.12, type: 'sawtooth', volume: 0.12, sweepTo: 330 }); setTimeout(() => playTone(440, { duration: 0.14, type: 'triangle', volume: 0.12, sweepTo: 550 }), 80); },
  // 9: 胜利号角
  () => { playTone(523, { duration: 0.1, type: 'triangle', volume: 0.16 }); setTimeout(() => playTone(659, { duration: 0.1, type: 'triangle', volume: 0.16 }), 60); setTimeout(() => playTone(784, { duration: 0.1, type: 'triangle', volume: 0.16 }), 120); setTimeout(() => playTone(1047, { duration: 0.2, type: 'sine', volume: 0.16 }), 180); },
  // 10: 钟声余韵
  () => { playTone(880, { duration: 0.4, type: 'sine', volume: 0.16 }); setTimeout(() => playTone(1320, { duration: 0.35, type: 'sine', volume: 0.1 }), 30); },
  // 11: 电子双闪
  () => { playTone(880, { duration: 0.06, type: 'square', volume: 0.14 }); setTimeout(() => playTone(1760, { duration: 0.06, type: 'square', volume: 0.12 }), 70); setTimeout(() => playTone(1100, { duration: 0.12, type: 'triangle', volume: 0.14 }), 140); },
  // 12: 复古游戏
  () => { playTone(392, { duration: 0.07, type: 'square', volume: 0.14 }); setTimeout(() => playTone(523, { duration: 0.07, type: 'square', volume: 0.14 }), 50); setTimeout(() => playTone(659, { duration: 0.07, type: 'square', volume: 0.14 }), 100); setTimeout(() => playTone(880, { duration: 0.14, type: 'square', volume: 0.14 }), 150); },
  // 13: 琶音上行
  () => { [262, 330, 392, 523, 659].forEach((f, i) => setTimeout(() => playTone(f, { duration: 0.08, type: 'sine', volume: 0.14 }), i * 45)); },
  // 14: 琶音下行
  () => { [784, 659, 523, 392, 330].forEach((f, i) => setTimeout(() => playTone(f, { duration: 0.08, type: 'sine', volume: 0.14 }), i * 45)); },
  // 15: 风铃
  () => { [1047, 1318, 1568, 2093].forEach((f, i) => setTimeout(() => playTone(f, { duration: 0.18, type: 'sine', volume: 0.12, sweepTo: f * 0.7 }), i * 60)); },
  // 16: 弹指
  () => { playTone(2000, { duration: 0.04, type: 'triangle', volume: 0.16, sweepTo: 500 }); setTimeout(() => playTone(700, { duration: 0.1, type: 'sine', volume: 0.14 }), 40); },
  // 17: 火箭发射
  () => { playTone(150, { duration: 0.25, type: 'sawtooth', volume: 0.14, sweepTo: 800 }); setTimeout(() => playTone(1200, { duration: 0.12, type: 'sine', volume: 0.14 }), 180); }
];

export function playAppSfx(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
  const idx = Math.abs(hash) % appSfxPatterns.length;
  appSfxPatterns[idx]();
}

export function playBottomSfx(target) {
  if (target === 'home') {
    playTone(440, { duration: 0.08, type: 'sine', volume: 0.18 });
    setTimeout(() => playTone(660, { duration: 0.1, type: 'triangle', volume: 0.15 }), 50);
  } else if (target === 'rank') {
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => playTone(f, { duration: 0.1, type: 'triangle', volume: 0.16 }), i * 55));
  } else if (target === 'price') {
    playTone(880, { duration: 0.08, type: 'sine', volume: 0.18, sweepTo: 1320 });
    setTimeout(() => playTone(1320, { duration: 0.14, type: 'sine', volume: 0.14 }), 60);
  } else if (target === 'contact') {
    playTone(660, { duration: 0.1, type: 'sine', volume: 0.18 });
    setTimeout(() => playTone(880, { duration: 0.16, type: 'sine', volume: 0.15 }), 70);
  } else {
    playCardSound();
  }
}

export function playCardSound() {
  playTone(520, { duration: 0.08, type: 'sine', volume: 0.18 });
  setTimeout(() => playTone(660, { duration: 0.1, type: 'triangle', volume: 0.15 }), 50);
  setTimeout(() => playTone(880, { duration: 0.12, type: 'sine', volume: 0.12 }), 100);
}

export function playLikeSound() {
  playTone(880, { duration: 0.09, type: 'sine', volume: 0.22 });
  setTimeout(() => playTone(1320, { duration: 0.13, type: 'triangle', volume: 0.18 }), 60);
}

export function playDislikeSound() {
  playTone(220, { duration: 0.12, type: 'square', volume: 0.16, sweepTo: 110 });
  setTimeout(() => playTone(140, { duration: 0.16, type: 'sawtooth', volume: 0.14, sweepTo: 80 }), 50);
}

const campSounds = [
  () => { playTone(660, { duration: 0.08, type: 'sine', volume: 0.2 }); setTimeout(() => playTone(880, { duration: 0.1, type: 'sine', volume: 0.18 }), 60); setTimeout(() => playTone(1100, { duration: 0.12, type: 'triangle', volume: 0.15 }), 120); },
  () => { playTone(520, { duration: 0.08, type: 'triangle', volume: 0.2 }); setTimeout(() => playTone(659, { duration: 0.1, type: 'sine', volume: 0.18 }), 50); setTimeout(() => playTone(784, { duration: 0.12, type: 'triangle', volume: 0.15 }), 100); },
  () => { playTone(440, { duration: 0.08, type: 'sawtooth', volume: 0.22 }); setTimeout(() => playTone(554, { duration: 0.1, type: 'sine', volume: 0.18 }), 50); setTimeout(() => playTone(659, { duration: 0.12, type: 'sine', volume: 0.15 }), 100); },
  () => { playTone(659, { duration: 0.08, type: 'sine', volume: 0.2 }); setTimeout(() => playTone(880, { duration: 0.1, type: 'triangle', volume: 0.18 }), 60); setTimeout(() => playTone(1047, { duration: 0.14, type: 'sine', volume: 0.14 }), 120); }
];

export function playCampSound(index) {
  campSounds[index % campSounds.length]();
}
