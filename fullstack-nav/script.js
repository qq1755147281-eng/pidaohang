/* ===================== 全栈导航 · 交互逻辑 ===================== */
(function(){
  'use strict';

  /* ---------- 数据：分类与工具 ---------- */
  const CATEGORIES = [
    { id:'all',     name:'全部',    icon:'🌐' },
    { id:'ai',      name:'AI 编程', icon:'🤖' },
    { id:'code',    name:'代码托管', icon:'📂' },
    { id:'doc',     name:'开发文档', icon:'📘' },
    { id:'cloud',   name:'云服务',   icon:'☁️' },
    { id:'design',  name:'设计资源', icon:'🎨' },
    { id:'learn',   name:'学习平台', icon:'🎓' },
    { id:'community',name:'技术社区',icon:'💬' },
    { id:'tools',   name:'效率工具', icon:'⚡' }
  ];

  const TOOLS = [
    // AI 编程
    { name:'GitHub Copilot',    cat:'ai', url:'https://github.com/features/copilot', desc:'AI 结对编程助手，代码补全与生成', tags:['AI','IDE','付费'], color:'#6c2b9e', featured:true },
    { name:'ChatGPT',           cat:'ai', url:'https://chat.openai.com',         desc:'OpenAI 对话式 AI，编程问答利器',     tags:['AI','对话'],         color:'#10a37f' },
    { name:'Claude',            cat:'ai', url:'https://claude.ai',              desc:'Anthropic 出品的 AI 助手，长文本强',   tags:['AI','对话'],         color:'#cc785c' },
    { name:'通义灵码',           cat:'ai', url:'https://lingma.aliyun.com',      desc:'阿里云免费 AI 编码助手',               tags:['AI','免费','中文'],  color:'#ff6a00' },
    { name:'Cursor',            cat:'ai', url:'https://cursor.com',             desc:'AI 优先的代码编辑器',                 tags:['AI','编辑器'],       color:'#000000' },
    { name:'Codeium',           cat:'ai', url:'https://codeium.com',            desc:'免费的 AI 代码补全工具',               tags:['AI','免费'],         color:'#09b6a2' },

    // 代码托管
    { name:'GitHub',            cat:'code',url:'https://github.com',            desc:'全球最大代码托管与协作平台',          tags:['Git','开源','社交'], color:'#181717', featured:true },
    { name:'GitLab',            cat:'code',url:'https://gitlab.com',            desc:'一体化 DevOps 平台',                 tags:['Git','CI/CD'],       color:'#fc6d26' },
    { name:'Gitee',             cat:'code',url:'https://gitee.com',             desc:'国内代码托管，速度快',                tags:['Git','中文'],        color:'#c71d23' },
    { name:'Bitbucket',         cat:'code',url:'https://bitbucket.org',         desc:'Atlassian 出品的代码托管',            tags:['Git','企业'],        color:'#0052cc' },
    { name:'Codeberg',          cat:'code',url:'https://codeberg.org',          desc:'非营利的开源代码托管',                tags:['Git','免费'],        color:'#2185d0' },

    // 开发文档
    { name:'MDN Web Docs',      cat:'doc',url:'https://developer.mozilla.org',  desc:'Web 开发权威文档',                   tags:['前端','HTML','CSS'], color:'#000000', featured:true },
    { name:'DevDocs',           cat:'doc',url:'https://devdocs.io',             desc:'聚合多语言 API 文档',                tags:['API','聚合'],        color:'#477dca' },
    { name:'W3School',          cat:'doc',url:'https://www.w3school.com.cn',    desc:'中文 Web 入门教程',                  tags:['中文','入门'],       color:'#04aa6d' },
    { name:'Vue 官方文档',       cat:'doc',url:'https://cn.vuejs.org',           desc:'Vue 3 中文文档',                     tags:['Vue','中文'],        color:'#42b883' },
    { name:'React 官方文档',     cat:'doc',url:'https://zh-hans.react.dev',      desc:'React 19 中文文档',                  tags:['React','中文'],      color:'#149eca' },
    { name:'Node.js 文档',      cat:'doc',url:'https://nodejs.org/zh-cn',       desc:'Node.js 中文官方文档',               tags:['Node','中文'],       color:'#3c873a' },

    // 云服务
    { name:'阿里云',            cat:'cloud',url:'https://www.aliyun.com',       desc:'国内领先云服务',                     tags:['云','中文'],         color:'#ff6a00', featured:true },
    { name:'腾讯云',            cat:'cloud',url:'https://cloud.tencent.com',    desc:'腾讯云服务平台',                     tags:['云','中文'],         color:'#0052d9' },
    { name:'华为云',            cat:'cloud',url:'https://www.huaweicloud.com',  desc:'华为云服务平台',                     tags:['云','企业'],         color:'#c7000b' },
    { name:'AWS',               cat:'cloud',url:'https://aws.amazon.com',       desc:'亚马逊云全球服务',                   tags:['云','全球'],         color:'#ff9900' },
    { name:'Vercel',            cat:'cloud',url:'https://vercel.com',           desc:'前端优先的部署平台',                 tags:['部署','前端'],       color:'#000000' },
    { name:'Netlify',           cat:'cloud',url:'https://www.netlify.com',      desc:'静态网站托管与 CI',                 tags:['部署','免费'],       color:'#00ad9f' },

    // 设计资源
    { name:'Figma',             cat:'design',url:'https://www.figma.com',       desc:'云端协作设计工具',                   tags:['UI','协作'],         color:'#a259ff', featured:true },
    { name:'Dribbble',          cat:'design',url:'https://dribbble.com',        desc:'设计师灵感社区',                     tags:['灵感','社区'],       color:'#ea4c89' },
    { name:'Behance',           cat:'design',url:'https://www.behance.net',     desc:'Adobe 旗下作品集社区',                tags:['灵感','作品集'],     color:'#1769ff' },
    { name:'Iconify',           cat:'design',url:'https://iconify.design',      desc:'海量开源图标库',                     tags:['图标','开源'],       color:'#1769aa' },
    { name:'Unsplash',          cat:'design',url:'https://unsplash.com',        desc:'高质量免费图片',                     tags:['图片','免费'],       color:'#111111' },

    // 学习平台
    { name:'慕课网',            cat:'learn',url:'https://www.imooc.com',        desc:'国内在线编程学习平台',               tags:['中文','视频'],       color:'#f20d0d', featured:true },
    { name:'极客时间',          cat:'learn',url:'https://time.geekbang.org',    desc:'技术进阶学习平台',                   tags:['中文','音频'],       color:'#ffc629' },
    { name:'Coursera',          cat:'learn',url:'https://www.coursera.org',     desc:'全球顶尖大学课程',                   tags:['课程','英文'],       color:'#0056d2' },
    { name:'freeCodeCamp',      cat:'learn',url:'https://www.freecodecamp.org',desc:'免费编程学习社区',                   tags:['免费','英文'],       color:'#006400' },
    { name:'中国大学 MOOC',     cat:'learn',url:'https://www.icourse163.org',   desc:'国内高校精品课程',                   tags:['中文','大学'],       color:'#b91518' },

    // 技术社区
    { name:'掘金',              cat:'community',url:'https://juejin.cn',       desc:'国内技术社区与博客',                 tags:['中文','博客'],       color:'#1e80ff', featured:true },
    { name:'思否 SegmentFault', cat:'community',url:'https://segmentfault.com', desc:'中文问答社区',                        tags:['中文','问答'],       color:'#009a61' },
    { name:'CSDN',              cat:'community',url:'https://www.csdn.net',     desc:'老牌中文技术社区',                   tags:['中文','博客'],       color:'#fc5531' },
    { name:'Stack Overflow',    cat:'community',url:'https://stackoverflow.com',desc:'全球最大程序员问答社区',             tags:['问答','英文'],       color:'#f48024' },
    { name:'V2EX',              cat:'community',url:'https://www.v2ex.com',     desc:'创意工作者讨论社区',                 tags:['中文','讨论'],       color:'#000000' },
    { name:'GitHub Discussions',cat:'community',url:'https://github.com',       desc:'开源项目讨论区',                     tags:['英文','开源'],       color:'#181717' },

    // 效率工具
    { name:'VS Code',           cat:'tools',url:'https://code.visualstudio.com',desc:'轻量级跨平台代码编辑器',            tags:['编辑器','免费'],     color:'#007acc', featured:true },
    { name:'WebStorm',          cat:'tools',url:'https://www.jetbrains.com/webstorm/',desc:'JetBrains 出品的 Web IDE',      tags:['IDE','付费'],        color:'#000000' },
    { name:'Postman',           cat:'tools',url:'https://www.postman.com',     desc:'API 调试与协作工具',                 tags:['API','调试'],        color:'#ff6c37' },
    { name:'Notion',            cat:'tools',url:'https://www.notion.so',       desc:'一体化工作空间',                     tags:['笔记','协作'],       color:'#000000' },
    { name:'Fig',               cat:'tools',url:'https://www.fig.io',          desc:'AI 终端自动补全',                    tags:['终端','AI'],         color:'#7c3aed' },
    { name:'Hoppscotch',        cat:'tools',url:'https://hoppscotch.io',       desc:'开源 API 调试工具',                  tags:['API','免费'],        color:'#10ad96' },
    { name:'Excalidraw',        cat:'tools',url:'https://excalidraw.com',      desc:'手绘风白板工具',                     tags:['白板','协作'],       color:'#6c2b9e' }
  ];

  const QUICK_TAGS = ['AI','免费','中文','IDE','API','Git','前端','部署'];

  /* ---------- DOM 引用 ---------- */
  const $ = sel => document.querySelector(sel);
  const tabsEl = $('#tabs');
  const panelsEl = $('#panels');
  const searchInput = $('#searchInput');
  const searchClear = $('#searchClear');
  const quickTagsEl = $('#quickTags');
  const resultCountEl = $('#resultCount');
  const statTotal = $('#statTotal');
  const statCats = $('#statCats');
  const backTop = $('#backTop');
  const mainEl = $('.main');
  const themeToggle = $('#themeToggle');

  let state = { cat:'all', q:'' };

  /* ---------- 工具函数 ---------- */
  function escapeHTML(s){
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function highlight(text, q){
    if(!q) return escapeHTML(text);
    const safe = escapeHTML(text);
    const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + ')','ig');
    return safe.replace(re,'<mark style="background:#ffc629;color:#5a1f87;padding:0 2px;border-radius:3px;">$1</mark>');
  }

  /* ---------- 渲染：分类 Tab ---------- */
  function renderTabs(){
    tabsEl.innerHTML = CATEGORIES.map(c =>
      `<div class="tab${state.cat===c.id?' active':''}" data-cat="${c.id}">${c.icon} ${c.name}</div>`
    ).join('');
    tabsEl.querySelectorAll('.tab').forEach(el => {
      el.addEventListener('click', () => {
        state.cat = el.dataset.cat;
        renderTabs(); renderPanels();
        // 滚动到导航区
        $('#navSection').scrollIntoView({behavior:'smooth', block:'start'});
      });
    });
  }

  /* ---------- 渲染：快捷标签 ---------- */
  function renderQuickTags(){
    quickTagsEl.innerHTML = QUICK_TAGS.map(t => `<span class="quick-tag" data-tag="${escapeHTML(t)}">#${escapeHTML(t)}</span>`).join('');
    quickTagsEl.querySelectorAll('.quick-tag').forEach(el => {
      el.addEventListener('click', () => {
        searchInput.value = el.dataset.tag;
        state.q = el.dataset.tag.toLowerCase();
        searchClear.classList.add('visible');
        renderPanels();
      });
    });
  }

  /* ---------- 过滤 ---------- */
  function filterTools(){
    const q = state.q.trim().toLowerCase();
    return TOOLS.filter(t => {
      if(state.cat !== 'all' && t.cat !== state.cat) return false;
      if(!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    });
  }

  /* ---------- 渲染：工具网格 ---------- */
  function renderPanels(){
    const list = filterTools();
    resultCountEl.textContent = list.length ? `共 ${list.length} 个结果` : '无匹配结果';
    if(!list.length){
      panelsEl.innerHTML = `
        <div class="tools-grid">
          <div class="empty-state">
            <div class="icon">🔍</div>
            <h4>没找到相关工具</h4>
            <p>试试更换关键词或切换分类</p>
          </div>
        </div>`;
      return;
    }
    const q = state.q.trim();
    const html = list.map(t => `
      <a class="tool-card${t.featured?' featured':''}" href="${escapeHTML(t.url)}" target="_blank" rel="noopener" data-name="${escapeHTML(t.name)}">
        <div class="tool-head">
          <div class="tool-icon" style="background:${t.color}">${escapeHTML(t.name.charAt(0))}</div>
          <div class="tool-name">${highlight(t.name, q)}</div>
        </div>
        <div class="tool-desc">${highlight(t.desc, q)}</div>
        <div class="tool-tags">
          ${t.tags.map(tg => `<span class="tool-tag">${highlight(tg, q)}</span>`).join('')}
        </div>
      </a>
    `).join('');
    panelsEl.innerHTML = `<div class="tools-grid">${html}</div>`;
  }

  /* ---------- 搜索 ---------- */
  let searchTimer;
  searchInput.addEventListener('input', e => {
    clearTimeout(searchTimer);
    const v = e.target.value;
    searchClear.classList.toggle('visible', !!v);
    searchTimer = setTimeout(() => {
      state.q = v;
      renderPanels();
    }, 120);
  });
  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    state.q = '';
    searchClear.classList.remove('visible');
    renderPanels();
    searchInput.focus();
  });

  /* ---------- 轮播 ---------- */
  let curSlide = 0;
  const totalSlides = 4;
  const track = $('#carouselTrack');
  const dotsEl = $('#carouselDots');
  let autoTimer;

  function renderDots(){
    dotsEl.innerHTML = Array.from({length:totalSlides}, (_,i) =>
      `<span class="carousel-dot${i===curSlide?' active':''}" data-i="${i}"></span>`
    ).join('');
    dotsEl.querySelectorAll('.carousel-dot').forEach(d => {
      d.addEventListener('click', () => goTo(parseInt(d.dataset.i,10)));
    });
  }
  function goTo(i){
    curSlide = (i + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${curSlide * 25}%)`;
    renderDots();
  }
  function startAuto(){ autoTimer = setInterval(() => goTo(curSlide + 1), 4500); }
  function stopAuto(){ clearInterval(autoTimer); }

  document.querySelectorAll('.carousel-arrow').forEach(a => {
    a.addEventListener('click', () => {
      stopAuto(); goTo(curSlide + parseInt(a.dataset.dir,10)); startAuto();
    });
  });
  // 鼠标悬停暂停
  const carousel = $('.home-carousel');
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  /* ---------- 回到顶部 ---------- */
  mainEl.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', mainEl.scrollTop > 400);
  });
  backTop.addEventListener('click', () => {
    mainEl.scrollTo({top:0, behavior:'smooth'});
  });

  /* ---------- 主题切换 ---------- */
  const savedTheme = localStorage.getItem('fsnav-theme') || 'light';
  if(savedTheme === 'dark') document.documentElement.dataset.theme = 'dark';
  themeToggle.addEventListener('click', () => {
    const cur = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    if(cur === 'dark') document.documentElement.dataset.theme = 'dark';
    else delete document.documentElement.dataset.theme;
    localStorage.setItem('fsnav-theme', cur);
  });

  /* ---------- 初始化 ---------- */
  function init(){
    statTotal.textContent = TOOLS.length;
    statCats.textContent = CATEGORIES.length - 1; // 排除"全部"
    renderTabs();
    renderQuickTags();
    renderPanels();
    renderDots();
    startAuto();
  }
  init();
})();
