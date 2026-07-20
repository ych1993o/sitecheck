// ===== Common JS for SiteCheck =====

// ===== Translations =====
const translations = {
    zh: {
        nav_home: '首页',
        nav_tools: '检测工具',
        nav_blog: '博客',
        nav_about: '关于',
        footer_desc: '免费的在线网站检测工具，提供 HTTP 状态检测、DNS 查询、SSL 证书检测、响应时间测试和 HTTP Headers 分析等功能。',
        footer_tools: '检测工具',
        footer_resources: '资源',
        footer_legal: '法律',
        tool_http: 'HTTP 状态检测',
        tool_dns: 'DNS 查询',
        tool_ssl: 'SSL 证书检测',
        tool_response: '响应时间检测',
        tool_headers: 'HTTP Headers',
        tool_http_desc: '检测网站的 HTTP 状态码，了解网站是否正常在线访问，快速排查 404、500 等错误。',
        tool_dns_desc: '查询域名的 A、CNAME、MX、NS、TXT 等各种 DNS 记录，支持多类型解析查询。',
        tool_ssl_desc: '检测网站 HTTPS 证书状态，查看证书颁发机构、有效期和到期时间，确保网站安全。',
        tool_response_desc: '测量网站的加载响应时间，评估网站性能，帮助你优化用户体验。',
        tool_headers_desc: '查看网站的 HTTP 响应头信息，检测安全头配置（CSP、HSTS、X-Frame-Options 等）。',
        hero_title: '免费在线网站检测工具',
        hero_subtitle: '一站式网站诊断平台，提供 HTTP 状态、DNS 解析、SSL 证书、响应时间和 HTTP Headers 检测，帮助你快速排查网站问题。',
        footer_blog: '博客',
        footer_about_us: '关于我们',
        footer_contact: '联系方式',
        footer_privacy: '隐私政策',
        footer_terms: '服务条款',
        loading: '正在检测...',
        back_home: '返回首页',
        error_empty: '请输入要检测的网址。',
        error_fail: '检测失败：',
        error_retry: '。请确认网址可访问后重试。',
        latest_articles: '最新文章',
        ad_placeholder: '广告位（Google AdSense 审核通过后启用）',
        // Tool page titles and subtitles
        tool_http_title: 'HTTP 状态码检测',
        tool_http_subtitle: '输入网址，检测其 HTTP 状态码、响应时间、最终 URL 和重定向次数。',
        tool_dns_title: 'DNS 记录查询',
        tool_dns_subtitle: '输入域名并选择记录类型，查询其 DNS 解析记录（数据来源：Google Public DNS）。',
        tool_ssl_title: 'SSL 证书检测',
        tool_ssl_subtitle: '输入域名，检测其 SSL/HTTPS 证书的颁发机构、有效期与剩余天数（数据来源：crt.sh 证书透明度日志）。',
        tool_response_title: '网站响应时间测试',
        tool_response_subtitle: '输入网址，连续测试 3 次响应时间，查看平均值、最小值、最大值及柱状图对比。',
        tool_headers_title: 'HTTP Headers 分析',
        tool_headers_subtitle: '输入网址，查看其 HTTP 响应头信息，并检测关键安全头的配置情况。',
        btn_check: '开始检测',
        btn_check_ssl: '检测证书',
        btn_lookup: '查询',
        btn_test: '开始测试',
        btn_analyze: '分析',
        // Tool descriptions
        tool_http_description: 'HTTP 状态码是 Web 服务器在响应客户端请求时返回的三位数字代码，用于表示请求的处理结果。200 系列状态码表示请求成功，如 200 OK 表示正常返回内容，204 No Content 表示成功但无内容返回。300 系列表示重定向，如 301 表示永久跳转，302 表示临时跳转。400 系列表示客户端错误，最常见的 404 Not Found 表示请求的资源不存在，403 Forbidden 表示服务器拒绝访问。500 系列表示服务器内部错误，如 502 Bad Gateway 表示网关错误，503 Service Unavailable 表示服务暂时不可用。通过本工具，你可以快速检测任意网址的 HTTP 状态码，判断网站是否正常运行，排查访问故障。',
        tool_dns_description: 'DNS（域名系统）是互联网的"电话簿"，负责将人类可读的域名（如 example.com）翻译为计算机可识别的 IP 地址。A 记录是最基础的 DNS 记录类型，将域名指向一个 IPv4 地址。CNAME 记录将域名指向另一个域名，常用于 CDN 和子域名管理。MX 记录指定接收该域名的邮件服务器地址。NS 记录指定域名由哪些 DNS 服务器负责解析。TXT 记录通常用于域名验证、SPF 邮件安全配置等。通过本工具，你可以快速查询任意域名的各种 DNS 记录，排查域名解析问题。',
        tool_ssl_description: 'SSL/TLS 证书是网站实现 HTTPS 加密连接的基础，它确保用户与网站之间的数据传输经过加密，防止中间人攻击和信息窃取。证书由受信任的证书颁发机构（CA）签发，包含域名信息、有效期和公钥等。常见的证书类型包括域名验证证书（DV）、组织验证证书（OV）和扩展验证证书（EV）。证书通常有效期为 90 天到 1 年，过期后需要续签。通过本工具，你可以检测任意 HTTPS 网站的 SSL 证书状态，查看证书颁发机构、有效期、到期时间和加密协议等信息，确保你的网站和访问的网站安全可靠。',
        tool_response_description: '网站响应时间是指从用户发起请求到收到服务器第一个字节响应所经历的时间，通常称为 TTFB（Time to First Byte）。响应时间是衡量网站性能的核心指标之一。一般来说，200ms 以内为优秀，200-500ms 为良好，500ms-1s 为一般，超过 1s 则需要优化。影响响应时间的因素包括服务器地理位置、服务器性能、网络带宽、数据库查询效率、CDN 配置等。通过本工具，你可以测量任意网站的响应时间，评估网站性能，帮助定位加载缓慢的原因。',
        tool_headers_description: 'HTTP 响应头是服务器在返回网页内容时发送的一系列元数据，包含了服务器类型、内容编码、缓存策略和安全配置等重要信息。常见的安全相关响应头包括：Content-Security-Policy（CSP）用于限制页面可以加载的资源来源，防止 XSS 攻击；Strict-Transport-Security（HSTS）强制浏览器使用 HTTPS 连接；X-Frame-Options 控制页面是否可以被嵌入 iframe，防止点击劫持；X-Content-Type-Options 防止浏览器进行 MIME 类型嗅探。通过本工具，你可以查看任意网站的 HTTP 响应头信息，检测安全头配置是否完善，提升网站安全等级。',
        // Result labels
        label_http_status: 'HTTP 状态码',
        label_response_time: '响应时间',
        label_target_url: '目标 URL',
        label_final_url: '最终 URL',
        label_redirect_count: '重定向次数',
        label_query_domain: '查询域名',
        label_record_type: '记录类型',
        label_query_status: '查询状态',
        label_name: '名称',
        label_type: '类型',
        label_ttl: 'TTL（秒）',
        label_data: '数据',
        label_issuer: '颁发机构',
        label_valid_from: '生效时间',
        label_valid_to: '到期时间',
        label_days_remaining: '剩余天数',
        label_avg_time: '平均响应时间',
        label_fastest: '最快',
        label_slowest: '最慢',
        label_time_chart: '响应时间对比图',
        label_test_url: '测试 URL',
        label_test_count: '测试次数',
        label_each_time: '各次耗时',
        label_range: '波动范围',
        label_security_score: '安全头评分',
        label_security_check: '安全头检测结果',
        label_security_header: '安全头',
        label_status_col: '状态',
        label_value_col: '值',
        label_all_headers: '全部响应头（共 {count} 项）',
        label_recent_certs: '最近签发的证书',
        // Tool note texts
        http_status_note: '说明：状态码 2xx 表示成功，3xx 表示重定向，4xx 表示客户端错误，5xx 表示服务器错误。由于浏览器跨域限制，部分站点的重定向链可能无法完整追踪。',
        dns_note: '说明：TTL 为记录的缓存时间（单位：秒）。MX 记录数据格式为"优先级 邮件服务器"，TXT 记录包含引号文本，SOA 记录包含主域名服务器与管理员信息。',
        ssl_note: '证书透明度日志中共找到 {count} 条相关证书记录。以上展示的是最近签发的证书信息。剩余天数小于 30 天建议尽快续期。',
        response_note: '说明：响应时间受网络环境与服务器负载影响。绿色（<500ms）性能优秀，黄色（500-1500ms）一般，红色（>1500ms）较慢。由于通过 CORS 代理请求，实际耗时包含代理转发开销，仅供参考。',
        headers_note: '说明：绿色对勾表示该安全头已配置，红色叉号表示缺失。配置完整的安全头可有效提升网站安全性。部分响应头可能因 CORS 代理未暴露而无法显示。',
        dns_not_found: '未找到该域名的 <strong>{type}</strong> 记录。',
        ssl_not_configured: '未配置',
        // SSL status labels
        ssl_not_yet_valid: '尚未生效',
        ssl_expired: '已过期',
        ssl_expiring: '即将过期',
        ssl_valid: '有效',
        ssl_expired_days: '已过期 {days} 天',
        ssl_days_left: '{days} 天'
    },
    en: {
        nav_home: 'Home',
        nav_tools: 'Tools',
        nav_blog: 'Blog',
        nav_about: 'About',
        footer_desc: 'Free online website diagnostic tools, offering HTTP status check, DNS lookup, SSL certificate check, response time test, and HTTP Headers analysis.',
        footer_tools: 'Tools',
        footer_resources: 'Resources',
        footer_legal: 'Legal',
        tool_http: 'HTTP Status Check',
        tool_dns: 'DNS Lookup',
        tool_ssl: 'SSL Certificate Check',
        tool_response: 'Response Time',
        tool_headers: 'HTTP Headers',
        tool_http_desc: 'Check the HTTP status code of any website to see if it is accessible online, and quickly troubleshoot errors like 404, 500, etc.',
        tool_dns_desc: 'Query various DNS records (A, CNAME, MX, NS, TXT) for any domain with multi-type resolution lookup support.',
        tool_ssl_desc: 'Check the HTTPS certificate status of websites, view the issuing authority, validity period, and expiration date to ensure website security.',
        tool_response_desc: 'Measure website loading response time, evaluate performance, and help you optimize user experience.',
        tool_headers_desc: 'View HTTP response headers of websites and check security header configurations (CSP, HSTS, X-Frame-Options, etc.).',
        hero_title: 'Free Online Website Diagnostic Tools',
        hero_subtitle: 'An all-in-one website diagnostic platform offering HTTP status, DNS resolution, SSL certificate, response time, and HTTP Headers checks to help you quickly troubleshoot website issues.',
        footer_blog: 'Blog',
        footer_about_us: 'About Us',
        footer_contact: 'Contact',
        footer_privacy: 'Privacy Policy',
        footer_terms: 'Terms of Service',
        loading: 'Checking...',
        back_home: 'Back to Home',
        error_empty: 'Please enter a URL to check.',
        error_fail: 'Check failed:',
        error_retry: '. Please confirm the URL is accessible and try again.',
        latest_articles: 'Latest Articles',
        ad_placeholder: 'Ad Slot (Enable after Google AdSense approval)',
        // Tool page titles and subtitles
        tool_http_title: 'HTTP Status Code Checker',
        tool_http_subtitle: 'Enter a URL to check its HTTP status code, response time, final URL, and redirect count.',
        tool_dns_title: 'DNS Record Lookup',
        tool_dns_subtitle: 'Enter a domain and select a record type to query its DNS resolution records (Data source: Google Public DNS).',
        tool_ssl_title: 'SSL Certificate Checker',
        tool_ssl_subtitle: 'Enter a domain to check its SSL/HTTPS certificate issuer, validity period, and remaining days (Data source: crt.sh Certificate Transparency logs).',
        tool_response_title: 'Website Response Time Test',
        tool_response_subtitle: 'Enter a URL to run 3 consecutive response time tests, view average, min, max values and bar chart comparison.',
        tool_headers_title: 'HTTP Headers Analysis',
        tool_headers_subtitle: 'Enter a URL to view its HTTP response headers and check key security header configurations.',
        btn_check: 'Start Check',
        btn_check_ssl: 'Check Certificate',
        btn_lookup: 'Lookup',
        btn_test: 'Start Test',
        btn_analyze: 'Analyze',
        // Tool descriptions
        tool_http_description: 'HTTP status codes are three-digit numeric codes returned by web servers in response to client requests, indicating the result of the request processing. The 200 series indicates success, such as 200 OK for normal content return and 204 No Content for success with no content. The 300 series indicates redirects, such as 301 for permanent redirect and 302 for temporary redirect. The 400 series indicates client errors, with the most common 404 Not Found meaning the requested resource does not exist, and 403 Forbidden meaning the server refuses access. The 500 series indicates server internal errors, such as 502 Bad Gateway for gateway errors and 503 Service Unavailable for temporarily unavailable services. With this tool, you can quickly check the HTTP status code of any URL to determine if a website is running normally and troubleshoot access issues.',
        tool_dns_description: 'DNS (Domain Name System) is the Internet\'s "phone book," responsible for translating human-readable domain names (like example.com) into computer-recognizable IP addresses. A records are the most basic DNS record type, pointing a domain to an IPv4 address. CNAME records point a domain to another domain, commonly used for CDN and subdomain management. MX records specify the mail server addresses that receive email for the domain. NS records specify which DNS servers are responsible for resolving the domain. TXT records are typically used for domain verification, SPF email security configuration, and more. With this tool, you can quickly query various DNS records for any domain and troubleshoot DNS resolution issues.',
        tool_ssl_description: 'SSL/TLS certificates are the foundation for websites to implement HTTPS encrypted connections, ensuring that data transmission between users and websites is encrypted to prevent man-in-the-middle attacks and information theft. Certificates are issued by trusted Certificate Authorities (CAs) and contain domain information, validity period, and public key. Common certificate types include Domain Validation (DV), Organization Validation (OV), and Extended Validation (EV). Certificates typically have a validity period of 90 days to 1 year and need to be renewed upon expiration. With this tool, you can check the SSL certificate status of any HTTPS website, view the certificate issuer, validity period, expiration time, and encryption protocol information to ensure your website and the websites you visit are secure and reliable.',
        tool_response_description: 'Website response time is the elapsed time from when a user initiates a request to when the first byte of the server response is received, commonly known as TTFB (Time to First Byte). Response time is one of the core metrics for measuring website performance. Generally, under 200ms is excellent, 200-500ms is good, 500ms-1s is average, and over 1s needs optimization. Factors affecting response time include server geographic location, server performance, network bandwidth, database query efficiency, and CDN configuration. With this tool, you can measure the response time of any website, evaluate its performance, and help identify causes of slow loading.',
        tool_headers_description: 'HTTP response headers are a series of metadata sent by the server when returning web page content, containing important information such as server type, content encoding, caching policies, and security configurations. Common security-related response headers include: Content-Security-Policy (CSP) restricts the sources from which a page can load resources, preventing XSS attacks; Strict-Transport-Security (HSTS) forces browsers to use HTTPS connections; X-Frame-Options controls whether a page can be embedded in an iframe, preventing clickjacking; X-Content-Type-Options prevents browsers from MIME type sniffing. With this tool, you can view the HTTP response headers of any website, check whether security header configurations are complete, and improve your website security level.',
        // Result labels
        label_http_status: 'HTTP Status Code',
        label_response_time: 'Response Time',
        label_target_url: 'Target URL',
        label_final_url: 'Final URL',
        label_redirect_count: 'Redirect Count',
        label_query_domain: 'Query Domain',
        label_record_type: 'Record Type',
        label_query_status: 'Query Status',
        label_name: 'Name',
        label_type: 'Type',
        label_ttl: 'TTL (seconds)',
        label_data: 'Data',
        label_issuer: 'Issuer',
        label_valid_from: 'Valid From',
        label_valid_to: 'Valid To',
        label_days_remaining: 'Days Remaining',
        label_avg_time: 'Avg Response Time',
        label_fastest: 'Fastest',
        label_slowest: 'Slowest',
        label_time_chart: 'Response Time Comparison',
        label_test_url: 'Test URL',
        label_test_count: 'Test Count',
        label_each_time: 'Individual Times',
        label_range: 'Variance Range',
        label_security_score: 'Security Header Score',
        label_security_check: 'Security Header Check Results',
        label_security_header: 'Security Header',
        label_status_col: 'Status',
        label_value_col: 'Value',
        label_all_headers: 'All Response Headers ({count} items)',
        label_recent_certs: 'Recently Issued Certificates',
        // Tool note texts
        http_status_note: 'Note: 2xx status codes indicate success, 3xx indicate redirects, 4xx indicate client errors, and 5xx indicate server errors. Due to browser CORS restrictions, the redirect chain for some sites may not be fully trackable.',
        dns_note: 'Note: TTL is the cache time for the record (in seconds). MX record data format is "priority mail server", TXT records contain quoted text, and SOA records contain primary name server and administrator information.',
        ssl_note: 'Found <strong style="color:var(--gray-700);">{count}</strong> related certificate records in the Certificate Transparency logs. The above shows the most recently issued certificate. Renewal is recommended when remaining days are less than 30.',
        response_note: 'Note: Response times are affected by network conditions and server load. Green (<500ms) is excellent, yellow (500-1500ms) is average, red (>1500ms) is slow. Since requests go through a CORS proxy, actual time includes proxy forwarding overhead and is for reference only.',
        headers_note: 'Note: A green checkmark means the security header is configured, a red cross means it is missing. Configuring complete security headers can effectively improve website security. Some response headers may not be displayed due to CORS proxy not exposing them.',
        dns_not_found: 'No <strong>{type}</strong> record found for this domain.',
        ssl_not_configured: 'Not configured',
        // SSL status labels
        ssl_not_yet_valid: 'Not Yet Valid',
        ssl_expired: 'Expired',
        ssl_expiring: 'Expiring Soon',
        ssl_valid: 'Valid',
        ssl_expired_days: 'Expired {days} days ago',
        ssl_days_left: '{days} days'
    }
};

// ===== Current language =====
let currentLang = 'zh';

// ===== Get current language from storage or browser =====
function getStoredLang() {
    const stored = localStorage.getItem('sitecheck-lang');
    if (stored && translations[stored]) {
        return stored;
    }
    const browserLang = navigator.language || navigator.userLanguage || '';
    return browserLang.startsWith('zh') ? 'zh' : 'en';
}

// ===== Switch language =====
function switchLang(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    localStorage.setItem('sitecheck-lang', lang);

    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Update .lang-btn active state
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// ===== Get translation by key =====
function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) || translations['zh'][key] || key;
}

// ===== Render header =====
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
                <li><a href="/" class="${activePage === 'home' ? 'active' : ''}" data-i18n="nav_home">${t('nav_home')}</a></li>
                <li><a href="/tools/http-status.html" class="${activePage === 'tools' ? 'active' : ''}" data-i18n="nav_tools">${t('nav_tools')}</a></li>
                <li><a href="/blog/index.html" class="${activePage === 'blog' ? 'active' : ''}" data-i18n="nav_blog">${t('nav_blog')}</a></li>
                <li><a href="/about.html" class="${activePage === 'about' ? 'active' : ''}" data-i18n="nav_about">${t('nav_about')}</a></li>
            </ul>
            <div class="lang-switch" style="display:flex;align-items:center;gap:4px;">
                <button class="lang-btn ${currentLang === 'zh' ? 'active' : ''}" data-lang="zh" onclick="switchLang('zh')">中文</button>
                <span style="color:#cbd5e1;">|</span>
                <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en" onclick="switchLang('en')">EN</button>
            </div>
        </div>
    </header>`;
    document.getElementById('header').innerHTML = header;
}

// ===== Render footer =====
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
                <p data-i18n="footer_desc">${t('footer_desc')}</p>
            </div>
            <div class="footer-col">
                <h4 data-i18n="footer_tools">${t('footer_tools')}</h4>
                <ul>
                    <li><a href="/tools/http-status.html" data-i18n="tool_http">${t('tool_http')}</a></li>
                    <li><a href="/tools/dns-lookup.html" data-i18n="tool_dns">${t('tool_dns')}</a></li>
                    <li><a href="/tools/ssl-checker.html" data-i18n="tool_ssl">${t('tool_ssl')}</a></li>
                    <li><a href="/tools/response-time.html" data-i18n="tool_response">${t('tool_response')}</a></li>
                    <li><a href="/tools/http-headers.html" data-i18n="tool_headers">${t('tool_headers')}</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4 data-i18n="footer_resources">${t('footer_resources')}</h4>
                <ul>
                    <li><a href="/blog/index.html" data-i18n="footer_blog">${t('footer_blog')}</a></li>
                    <li><a href="/about.html" data-i18n="footer_about_us">${t('footer_about_us')}</a></li>
                    <li><a href="/contact.html" data-i18n="footer_contact">${t('footer_contact')}</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4 data-i18n="footer_legal">${t('footer_legal')}</h4>
                <ul>
                    <li><a href="/privacy-policy.html" data-i18n="footer_privacy">${t('footer_privacy')}</a></li>
                    <li><a href="/terms-of-service.html" data-i18n="footer_terms">${t('footer_terms')}</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; 2026 SiteCheck. All rights reserved.
        </div>
    </footer>`;
    document.getElementById('footer').innerHTML = footer;
}

// ===== Toggle mobile menu =====
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('open');
}

// ===== Show loading =====
function showLoading(containerId, msg) {
    if (!msg) msg = t('loading');
    document.getElementById(containerId).innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>${msg}</p>
        </div>`;
}

// ===== Show error =====
function showError(containerId, msg) {
    document.getElementById(containerId).innerHTML = `
        <div class="error-msg">${msg}</div>`;
}

// ===== Clean domain input =====
function cleanDomain(input) {
    return input.trim()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/.*$/, '');
}

// ===== Status code helper =====
function getStatusCodeClass(code) {
    if (code >= 200 && code < 300) return 'success';
    if (code >= 300 && code < 400) return 'info';
    if (code >= 400 && code < 500) return 'warning';
    if (code >= 500) return 'danger';
    return 'info';
}

// ===== Format date =====
function formatDate(date) {
    const d = new Date(date);
    if (currentLang === 'en') {
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ===== AdSense placeholder (replace ca-pub-XXX with your ID after approval) =====
function renderAd(slot = 'auto') {
    return `
    <div class="ad-container">
        <!-- Google AdSense 广告位 - 审核通过后替换为实际广告代码 -->
        <!-- <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXX" data-ad-slot="${slot}" data-ad-format="auto" data-full-width-responsive="true"></ins> -->
        <div class="ad-placeholder" data-i18n="ad_placeholder">${t('ad_placeholder')}</div>
    </div>`;
}

// ===== Inject language switch styles =====
(function injectLangStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .lang-switch { display: flex; align-items: center; gap: 4px; margin-left: 8px; }
        .lang-btn { background: none; border: none; color: #94a3b8; font-size: 14px; cursor: pointer; padding: 4px 8px; border-radius: 4px; transition: all 0.2s; }
        .lang-btn.active { color: #2563eb; background: #eff6ff; font-weight: 600; }
    `;
    document.head.appendChild(style);
})();

// ===== Init page =====
function initPage(activePage) {
    currentLang = getStoredLang();
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
    renderHeader(activePage);
    renderFooter();
}
