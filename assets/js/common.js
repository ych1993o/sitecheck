// ===== Common JS for SiteCheck =====

// Render header
function renderHeader(activePage) {
    const header = `
    <header class="site-header">
        <div class="header-inner">
            <a href="/" class="logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #2563eb;">
                    <path d="M9 12l2 2 4-4"></path>
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                    <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"></path>
                    <path d="M12 21c0-1-1-3-3-3s-3 2-3 3 1 3 3 3 3-2 3-3"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span>SiteCheck</span>
            </a>
            <button class="mobile-menu-btn" onclick="toggleMenu()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>
            <ul class="nav-menu" id="navMenu">
                <li><a href="/" class="${activePage === 'home' ? 'active' : ''}">首页</a></li>
                <li><a href="/tools/http-status.html" class="${activePage === 'tools' ? 'active' : ''}">检测工具</a></li>
                <li><a href="/blog/index.html" class="${activePage === 'blog' ? 'active' : ''}">博客</a></li>
                <li><a href="/about.html" class="${activePage === 'about' ? 'active' : ''}">关于</a></li>
            </ul>
        </div>
    </header>`;
    document.getElementById('header').innerHTML = header;
}

// Render footer
function renderFooter() {
    const footer = `
    <footer class="site-footer">
        <div class="footer-inner">
            <div class="footer-brand">
                <div style="display:flex;align-items:center;gap:8px;font-size:18px;font-weight:700;color:#fff;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 12l2 2 4-4"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    SiteCheck
                </div>
                <p>免费的在线网站检测工具，提供 HTTP 状态检测、DNS 查询、SSL 证书检测、响应时间测试和 HTTP Headers 分析等功能。</p>
            </div>
            <div class="footer-col">
                <h4>检测工具</h4>
                <ul>
                    <li><a href="/tools/http-status.html">HTTP 状态检测</a></li>
                    <li><a href="/tools/dns-lookup.html">DNS 查询</a></li>
                    <li><a href="/tools/ssl-checker.html">SSL 证书检测</a></li>
                    <li><a href="/tools/response-time.html">响应时间检测</a></li>
                    <li><a href="/tools/http-headers.html">HTTP Headers</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>资源</h4>
                <ul>
                    <li><a href="/blog/index.html">博客</a></li>
                    <li><a href="/about.html">关于我们</a></li>
                    <li><a href="/contact.html">联系方式</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>法律</h4>
                <ul>
                    <li><a href="/privacy-policy.html">隐私政策</a></li>
                    <li><a href="/terms-of-service.html">服务条款</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; 2026 SiteCheck. All rights reserved.
        </div>
    </footer>`;
    document.getElementById('footer').innerHTML = footer;
}

// Toggle mobile menu
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('open');
}

// Show loading
function showLoading(containerId, msg = '正在检测...') {
    document.getElementById(containerId).innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>${msg}</p>
        </div>`;
}

// Show error
function showError(containerId, msg) {
    document.getElementById(containerId).innerHTML = `
        <div class="error-msg">${msg}</div>`;
}

// Clean domain input
function cleanDomain(input) {
    return input.trim()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/.*$/, '');
}

// Status code helper
function getStatusCodeClass(code) {
    if (code >= 200 && code < 300) return 'success';
    if (code >= 300 && code < 400) return 'info';
    if (code >= 400 && code < 500) return 'warning';
    if (code >= 500) return 'danger';
    return 'info';
}

// Format date
function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ===== AdSense placeholder (replace ca-pub-XXX with your ID after approval) =====
function renderAd(slot = 'auto') {
    return `
    <div class="ad-container">
        <!-- Google AdSense 广告位 - 审核通过后替换为实际广告代码 -->
        <!-- <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXX" data-ad-slot="${slot}" data-ad-format="auto" data-full-width-responsive="true"></ins> -->
        <div class="ad-placeholder">广告位（Google AdSense 审核通过后启用）</div>
    </div>`;
}

// Init page
function initPage(activePage) {
    renderHeader(activePage);
    renderFooter();
}
