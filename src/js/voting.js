/**
 * 投票 / 点赞系统
 * - 价格面板：5 个派别（GCV、交易所、变现者、节点者、生态者）的 👍 / 👎
 * - 排行榜：20 个生态的 👍 / 👎 + 烟花
 */

import { playTone, playLikeSound, playDislikeSound } from './audio.js';
import { createFireworks } from './fireworks.js';

function formatNum(n) {
  if (n >= 100000000) return (n / 100000000).toFixed(1) + '亿';
  if (n >= 10000) return (n / 10000).toFixed(0) + '万';
  return n.toLocaleString('en-US');
}

export function initPriceVoting() {
  const camps = document.querySelectorAll('.camp');
  camps.forEach(camp => {
    const likeBtn = camp.querySelector('.vote-btn.like');
    const dislikeBtn = camp.querySelector('.vote-btn.dislike');
    if (!likeBtn || !dislikeBtn) return;
    const likeCount = likeBtn.querySelector('.count');
    const dislikeCount = dislikeBtn.querySelector('.count');
    const supporterNum = camp.querySelector('.camp-supporters .num');
    let likes = parseInt(likeCount.textContent.replace(/,/g, '')) || 0;
    let dislikes = parseInt(dislikeCount.textContent.replace(/,/g, '')) || 0;
    let baseSupporters = parseInt(supporterNum.dataset.base) || likes;
    let state = 'none';

    const flashCard = () => {
      camp.classList.remove('flash');
      void camp.offsetWidth;
      camp.classList.add('flash');
    };

    const refresh = () => {
      likeCount.textContent = formatNum(likes);
      dislikeCount.textContent = formatNum(dislikes);
      supporterNum.textContent = formatNum(baseSupporters + likes);
      likeBtn.classList.toggle('liked', state === 'like');
      dislikeBtn.classList.toggle('disliked', state === 'dislike');
    };

    likeBtn.addEventListener('click', () => {
      if (state === 'like') {
        likes--; state = 'none';
        playTone(520, { duration: 0.08, type: 'sine', volume: 0.16 });
      } else {
        if (state === 'dislike') dislikes--;
        likes++; state = 'like';
        playLikeSound();
        flashCard();
      }
      refresh();
    });

    dislikeBtn.addEventListener('click', () => {
      if (state === 'dislike') {
        dislikes--; state = 'none';
        playTone(420, { duration: 0.08, type: 'sine', volume: 0.14 });
      } else {
        if (state === 'like') likes--;
        dislikes++; state = 'dislike';
        playDislikeSound();
        flashCard();
      }
      refresh();
    });
  });
}

export function initRankVoting() {
  const rankVoteBtns = document.querySelectorAll('.rank-vote-btn');
  rankVoteBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const isLike = this.classList.contains('like');
      const countEl = this.querySelector('.vote-count');
      const item = this.closest('.rank-top-item');
      const rect = this.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      if (isLike) {
        playLikeSound();
        createFireworks(x, y, true);
        if (navigator.vibrate) navigator.vibrate(30);
        this.classList.toggle('liked');
        if (this.classList.contains('liked')) {
          countEl.textContent = (parseInt(countEl.textContent.replace(/,/g, '')) + 1).toLocaleString();
        } else {
          countEl.textContent = (parseInt(countEl.textContent.replace(/,/g, '')) - 1).toLocaleString();
        }
      } else {
        playDislikeSound();
        createFireworks(x, y, false);
        if (navigator.vibrate) navigator.vibrate([20, 10, 20]);
        this.classList.toggle('disliked');
        if (this.classList.contains('disliked')) {
          countEl.textContent = (parseInt(countEl.textContent.replace(/,/g, '')) + 1).toLocaleString();
        } else {
          countEl.textContent = (parseInt(countEl.textContent.replace(/,/g, '')) - 1).toLocaleString();
        }
      }

      item.style.transform = 'scale(1.02)';
      setTimeout(() => item.style.transform = '', 200);
    });
  });
}
