/**
 * 永久代码生成二维码（不依赖任何图片资源）
 * - 封装 qrcode-generator 库
 * - 支持带中心 logo 渲染（多元派对相亲等场景）
 *
 * 用法：renderQrCode(container, text, withCenterLogo)
 * - container: DOM 元素
 * - text: 要编码的文字（URL）
 * - withCenterLogo: true 时画中心 π+红心 装饰
 */

export function renderQrCode(container, text, withCenterLogo) {
  if (!container) return;
  container.innerHTML = '';
  if (!text) return;

  if (typeof qrcode === 'undefined') {
    container.innerHTML = '<div style="padding:10px;font-size:10px;color:#666;text-align:center;">二维码库加载失败<br>请检查网络</div>';
    return;
  }

  try {
    const qr = qrcode(0, withCenterLogo ? 'H' : 'M');
    qr.addData(text);
    qr.make();

    const n = qr.getModuleCount();
    const boxSize = 130;
    const cellSize = Math.max(2, Math.floor(boxSize / n));
    const size = n * cellSize;

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    canvas.style.display = 'block';
    canvas.style.background = '#fff';
    canvas.style.width = boxSize + 'px';
    canvas.style.height = boxSize + 'px';
    canvas.style.imageRendering = 'pixelated';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#000';
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (qr.isDark(i, j)) ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }

    if (withCenterLogo) {
      const cx = size / 2;
      const cy = size / 2;
      const r = size * 0.15;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2 * cellSize / 8;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      const heartY = cy - r * 0.42;
      const heartSize = r * 0.34;
      const hx = cx;
      const hy = heartY;
      const hs = heartSize;
      const heartGrad = ctx.createLinearGradient(hx - hs, hy, hx + hs, hy + hs);
      heartGrad.addColorStop(0, '#fb7185');
      heartGrad.addColorStop(0.5, '#ef4444');
      heartGrad.addColorStop(1, '#dc2626');
      ctx.fillStyle = heartGrad;
      ctx.beginPath();
      ctx.moveTo(hx, hy + hs * 0.75);
      ctx.bezierCurveTo(hx - hs * 1.15, hy - hs * 0.15, hx - hs * 0.55, hy - hs * 0.95, hx, hy - hs * 0.25);
      ctx.bezierCurveTo(hx + hs * 0.55, hy - hs * 0.95, hx + hs * 1.15, hy - hs * 0.15, hx, hy + hs * 0.75);
      ctx.fill();

      const piGrad = ctx.createLinearGradient(cx - r, cy, cx + r, cy + r);
      piGrad.addColorStop(0, '#7c3aed');
      piGrad.addColorStop(0.3, '#a855f7');
      piGrad.addColorStop(0.5, '#ec4899');
      piGrad.addColorStop(0.7, '#f97316');
      piGrad.addColorStop(1, '#eab308');
      ctx.fillStyle = piGrad;
      ctx.font = '900 ' + (r * 1.15) + 'px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('π', cx, cy + r * 0.32);
    }
  } catch (e) {
    container.innerHTML = '<div style="padding:10px;font-size:11px;color:#000;word-break:break-all;text-align:center;">' + text + '</div>';
  }
}
