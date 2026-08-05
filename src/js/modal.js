/**
 * 生态弹窗（Eco Modal）
 * - 显示生态信息（名称、描述、邀请码、二维码）
 * - 支持「进入生态」「返回首页」按钮
 * - 集成 QR 码渲染
 */

import { playTone } from './audio.js';
import { renderQrCode } from './qrcode.js';

let ecoMask, ecoIcon, ecoTitle, ecoDesc1, ecoDesc2, ecoDesc3;
let ecoCode, ecoCodeBox, ecoImageBox;
let ecoRectUmap, ecoRectParty, ecoQrUmap, ecoQrParty;
let ecoEnter, ecoBack, ecoClose, ecoCopyBtn;
let currentEcoUrl = '';

function hideEcoModal() {
  if (ecoMask) ecoMask.classList.remove('active');
}

function bindEventListeners() {
  if (ecoClose) ecoClose.addEventListener('click', hideEcoModal);
  if (ecoMask) ecoMask.addEventListener('click', (e) => { if (e.target === ecoMask) hideEcoModal(); });

  if (ecoEnter) ecoEnter.addEventListener('click', () => {
    const modal = document.querySelector('.eco-modal');
    if (modal && modal.classList.contains('coming-soon')) return;
    playTone(1040, { duration: 0.07, type: 'sine', volume: 0.22 });
    setTimeout(() => playTone(1320, { duration: 0.08, type: 'triangle', volume: 0.2 }), 50);
    setTimeout(() => playTone(1760, { duration: 0.14, type: 'sine', volume: 0.18 }), 110);
    if (currentEcoUrl && currentEcoUrl !== '#' && currentEcoUrl.startsWith('http')) {
      try {
        const url = new URL(currentEcoUrl);
        window.open(url.toString(), '_blank', 'noopener,noreferrer');
      } catch (e) {
        console.warn('Invalid URL:', currentEcoUrl);
      }
    }
    setTimeout(hideEcoModal, 160);
  });

  if (ecoBack) ecoBack.addEventListener('click', () => {
    playTone(520, { duration: 0.1, type: 'sine', volume: 0.18 });
    setTimeout(() => playTone(360, { duration: 0.14, type: 'triangle', volume: 0.15 }), 70);
    setTimeout(hideEcoModal, 120);
  });

  if (ecoCopyBtn) ecoCopyBtn.addEventListener('click', () => {
    const code = ecoCode.textContent;
    if (code && code !== '敬请期待' && code !== '暂无') {
      navigator.clipboard.writeText(code).then(() => {
        playTone(880, { duration: 0.06, type: 'sine', volume: 0.2 });
        setTimeout(() => playTone(1100, { duration: 0.08, type: 'sine', volume: 0.18 }), 50);
        ecoCopyBtn.textContent = '已复制';
        ecoCopyBtn.classList.add('copied');
        setTimeout(() => {
          ecoCopyBtn.textContent = '复制';
          ecoCopyBtn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        console.warn('Failed to copy');
      });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && ecoMask && ecoMask.classList.contains('active')) hideEcoModal();
  });
}

function openEcoModal(item, idx) {
  const icon = item.dataset.icon || '';
  const isComingSoon = item.dataset.comingsoon === 'true';
  const url = item.dataset.url || '#';

  if (isComingSoon) {
    playTone(360, { duration: 0.12, type: 'triangle', volume: 0.18, sweepTo: 200 });
    setTimeout(() => playTone(240, { duration: 0.18, type: 'sine', volume: 0.14, sweepTo: 160 }), 70);
  } else {
    const freqs = [880, 960, 1040, 1120, 1200, 1280, 1360, 1440];
    const f = freqs[idx % freqs.length];
    playTone(f, { duration: 0.08, type: 'sine', volume: 0.22 });
    setTimeout(() => playTone(f * 1.5, { duration: 0.12, type: 'triangle', volume: 0.18 }), 55);
  }

  ecoIcon.textContent = icon;
  ecoIcon.className = 'eco-modal-icon' + (icon === 'π' ? ' has-pi' : '');
  ecoTitle.textContent = item.dataset.eco || '';
  ecoDesc1.textContent = item.dataset.desc1 || '';
  ecoDesc2.textContent = item.dataset.desc2 || '';
  const d3 = item.dataset.desc3 || '';
  ecoDesc3.textContent = d3;
  ecoDesc3.style.display = d3 ? '' : 'none';

  const modal = document.querySelector('.eco-modal');
  const imageKey = item.dataset.image || '';
  const noEnter = item.dataset.noenter === 'true';

  if (imageKey === 'umap' || imageKey === 'party') {
    ecoCodeBox.style.display = 'none';
    ecoImageBox.style.display = '';
    ecoRectUmap.style.display = (imageKey === 'umap') ? 'flex' : 'none';
    ecoRectParty.style.display = (imageKey === 'party') ? 'flex' : 'none';
    if (imageKey === 'umap') {
      const umapUrl = 'https://wechat.shanhexiao.com/h5/#/pages/registerPage/yang?parentUserId=oJoMX5alQ9zIfOueSZyePfoLmV1M&mapId=1';
      renderQrCode(ecoQrUmap, umapUrl, false);
    } else if (imageKey === 'party') {
      window.__partyQrFallback = function () {
        const partyUrl = 'https://weixin.qq.com/party-dating';
        renderQrCode(ecoQrParty, partyUrl, true);
      };
      const partyImg = document.getElementById('ecoQrPartyImg');
      if (partyImg) {
        partyImg.style.display = 'block';
        partyImg.src = 'party-qr.png?' + Date.now();
      }
    }
    if (modal) modal.classList.add('show-qr');
  } else {
    ecoCodeBox.style.display = '';
    ecoImageBox.style.display = 'none';
    ecoRectUmap.style.display = 'none';
    ecoRectParty.style.display = 'none';
    if (modal) modal.classList.toggle('show-qr', noEnter);
  }

  if (isComingSoon) {
    if (imageKey) {
      if (modal) modal.classList.remove('coming-soon');
    } else {
      if (modal) modal.classList.add('coming-soon');
    }
    ecoCode.textContent = '敬请期待';
    ecoCode.classList.add('none');
    currentEcoUrl = '#';
  } else {
    ecoCode.textContent = item.dataset.code || '暂无';
    ecoCode.classList.toggle('none', !item.dataset.code || item.dataset.code === '敬请期待');
    currentEcoUrl = url;
    if (modal) modal.classList.remove('coming-soon');
  }
  ecoMask.classList.add('active');
}

export function initEcoModal() {
  ecoMask = document.getElementById('ecoModalMask');
  ecoIcon = document.getElementById('ecoModalIcon');
  ecoTitle = document.getElementById('ecoModalTitle');
  ecoDesc1 = document.getElementById('ecoModalDesc1');
  ecoDesc2 = document.getElementById('ecoModalDesc2');
  ecoDesc3 = document.getElementById('ecoModalDesc3');
  ecoCode = document.getElementById('ecoModalCode');
  ecoCodeBox = document.getElementById('ecoCodeBox');
  ecoImageBox = document.getElementById('ecoImageBox');
  ecoRectUmap = document.getElementById('ecoRectUmap');
  ecoRectParty = document.getElementById('ecoRectParty');
  ecoQrUmap = document.getElementById('ecoQrUmap');
  ecoQrParty = document.getElementById('ecoQrParty');
  ecoEnter = document.getElementById('ecoModalEnter');
  ecoBack = document.getElementById('ecoModalBack');
  ecoClose = document.getElementById('ecoModalClose');
  ecoCopyBtn = document.getElementById('ecoCopyBtn');

  if (!ecoMask) return;
  bindEventListeners();

  document.querySelectorAll('.app-item').forEach((item, idx) => {
    item.addEventListener('click', () => openEcoModal(item, idx));
  });
}
