/**
 * SiteCheck API - Cloudflare Worker
 *
 * 提供网站检测相关的后端 API 接口：
 *   GET /api/http-status?url=xxx   - 检测 URL 的 HTTP 状态码、响应头与响应时间
 *   GET /api/ssl-check?domain=xxx  - 使用 connect() 检测 SSL/TLS 证书状态
 *   GET /api/dns-lookup?domain=xxx&type=xxx - DNS 记录查询
 *   GET /api/headers?url=xxx       - 返回 URL 的 HTTP 响应头
 *
 * 所有接口均返回 JSON，并处理 CORS（允许所有来源）。
 */

import { connect } from "cloudflare:sockets";

// ===== 工具函数 =====

/** 构建统一 JSON 响应，并附加 CORS 头 */
function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Max-Age": "86400",
        },
    });
}

/** 返回错误 JSON */
function errorResponse(message, status = 400, code = "ERROR") {
    return jsonResponse({ success: false, error: message, code }, status);
}

/** 处理 CORS 预检请求 */
function handleCors() {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Max-Age": "86400",
        },
    });
}

/** 从请求中获取查询参数 */
function getParam(url, name) {
    const value = url.searchParams.get(name);
    return value ? value.trim() : null;
}

/** 规范化 URL：若未带协议则补上 https:// */
function normalizeUrl(input) {
    if (!input) return null;
    let url = input.trim();
    if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
    }
    return url;
}

/** 规范化域名：去除协议、路径、www 前缀 */
function normalizeDomain(input) {
    if (!input) return null;
    let domain = input.trim()
        .replace(/^https?:\/\//i, "")
        .replace(/^www\./i, "")
        .replace(/\/.*$/, "")
        .replace(/:\d+$/, "");
    return domain || null;
}

/** 校验域名格式 */
function isValidDomain(domain) {
    if (!domain) return false;
    // 基本域名格式校验
    const regex = /^(?=.{1,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;
    return regex.test(domain);
}

// ===== API 接口实现 =====

/**
 * GET /api/http-status?url=xxx
 * 检测 URL 的 HTTP 状态码、响应头与响应时间
 */
async function handleHttpStatus(request, url) {
    const rawUrl = getParam(url, "url");
    if (!rawUrl) {
        return errorResponse("缺少必要参数 url", 400, "MISSING_PARAM");
    }

    const targetUrl = normalizeUrl(rawUrl);
    let parsedUrl;
    try {
        parsedUrl = new URL(targetUrl);
    } catch {
        return errorResponse("无效的 URL 格式", 400, "INVALID_URL");
    }

    if (!/^https?:$/.test(parsedUrl.protocol)) {
        return errorResponse("仅支持 http 和 https 协议", 400, "INVALID_PROTOCOL");
    }

    const startTime = Date.now();
    try {
        const response = await fetch(targetUrl, {
            method: "GET",
            redirect: "follow",
            headers: {
                "User-Agent": "SiteCheck/1.0 (+https://212128.xyz)",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            },
        });
        const responseTime = Date.now() - startTime;

        // 收集响应头
        const headers = {};
        response.headers.forEach((value, key) => {
            headers[key] = value;
        });

        return jsonResponse({
            success: true,
            data: {
                url: targetUrl,
                status: response.status,
                statusText: response.statusText,
                ok: response.ok,
                redirected: response.redirected,
                finalUrl: response.url,
                responseTimeMs: responseTime,
                headers,
            },
        });
    } catch (err) {
        const responseTime = Date.now() - startTime;
        return jsonResponse({
            success: false,
            data: {
                url: targetUrl,
                status: 0,
                responseTimeMs: responseTime,
            },
            error: `请求失败：${err.message || "无法连接到目标服务器"}`,
            code: "REQUEST_FAILED",
        }, 200);
    }
}

/**
 * GET /api/headers?url=xxx
 * 返回 URL 的 HTTP 响应头
 */
async function handleHeaders(request, url) {
    const rawUrl = getParam(url, "url");
    if (!rawUrl) {
        return errorResponse("缺少必要参数 url", 400, "MISSING_PARAM");
    }

    const targetUrl = normalizeUrl(rawUrl);
    let parsedUrl;
    try {
        parsedUrl = new URL(targetUrl);
    } catch {
        return errorResponse("无效的 URL 格式", 400, "INVALID_URL");
    }

    if (!/^https?:$/.test(parsedUrl.protocol)) {
        return errorResponse("仅支持 http 和 https 协议", 400, "INVALID_PROTOCOL");
    }

    const startTime = Date.now();
    try {
        const response = await fetch(targetUrl, {
            method: "GET",
            redirect: "manual",
            headers: {
                "User-Agent": "SiteCheck/1.0 (+https://212128.xyz)",
                "Accept": "*/*",
            },
        });
        const responseTime = Date.now() - startTime;

        const headers = {};
        response.headers.forEach((value, key) => {
            headers[key] = value;
        });

        // 安全头分析
        const securityHeaders = analyzeSecurityHeaders(headers);

        return jsonResponse({
            success: true,
            data: {
                url: targetUrl,
                status: response.status,
                statusText: response.statusText,
                responseTimeMs: responseTime,
                headers,
                securityHeaders,
            },
        });
    } catch (err) {
        return errorResponse(`获取响应头失败：${err.message || "无法连接到目标服务器"}`, 200, "REQUEST_FAILED");
    }
}

/** 分析常见安全响应头 */
function analyzeSecurityHeaders(headers) {
    const checks = [
        { name: "strict-transport-security", label: "HSTS", recommended: true },
        { name: "content-security-policy", label: "Content-Security-Policy", recommended: true },
        { name: "x-frame-options", label: "X-Frame-Options", recommended: true },
        { name: "x-content-type-options", label: "X-Content-Type-Options", recommended: true },
        { name: "referrer-policy", label: "Referrer-Policy", recommended: true },
        { name: "permissions-policy", label: "Permissions-Policy", recommended: false },
        { name: "x-xss-protection", label: "X-XSS-Protection", recommended: false },
    ];

    return checks.map((c) => {
        const value = headers[c.name] || headers[c.name.toLowerCase()];
        return {
            name: c.label,
            header: c.name,
            present: !!value,
            value: value || null,
            recommended: c.recommended,
            status: value ? "present" : (c.recommended ? "missing" : "optional"),
        };
    });
}

/**
 * GET /api/ssl-check?domain=xxx
 * 使用 connect() 检测 SSL/TLS 证书状态
 */
async function handleSslCheck(request, url) {
    const rawDomain = getParam(url, "domain");
    if (!rawDomain) {
        return errorResponse("缺少必要参数 domain", 400, "MISSING_PARAM");
    }

    const domain = normalizeDomain(rawDomain);
    if (!isValidDomain(domain)) {
        return errorResponse("无效的域名格式", 400, "INVALID_DOMAIN");
    }

    const port = 443;
    const startTime = Date.now();
    let socket;
    let tlsOk = false;
    let connectError = null;

    try {
        // 使用 connect() 建立 TCP 连接并升级为 TLS
        socket = connect({ hostname: domain, port }, {
            secureTransport: "on",
            allowHalfOpen: false,
        });

        // 写入一个 TLS ClientHello 触发握手（发送一个 HTTP HEAD 请求行）
        const writer = socket.writable.getWriter();
        const encoder = new TextEncoder();
        await writer.write(encoder.encode(
            `HEAD / HTTP/1.1\r\nHost: ${domain}\r\nUser-Agent: SiteCheck/1.0\r\nConnection: close\r\n\r\n`
        ));
        writer.releaseLock();

        // 读取响应以确认 TLS 握手成功
        const reader = socket.readable.getReader();
        const decoder = new TextDecoder();
        let received = "";
        let bytesReceived = 0;
        try {
            while (bytesReceived < 1024) {
                const { done, value } = await reader.read();
                if (done) break;
                received += decoder.decode(value, { stream: true });
                bytesReceived += value.byteLength;
                if (received.includes("\r\n")) break;
            }
        } catch (readErr) {
            // 读取阶段出错不一定是 TLS 失败，部分服务器会直接关闭连接
        }
        reader.releaseLock();

        // 只要写入握手数据未抛出异常，即视为 TLS 连接可建立
        tlsOk = true;
    } catch (err) {
        connectError = err.message || String(err);
        tlsOk = false;
    } finally {
        if (socket) {
            try { socket.close(); } catch (e) { /* ignore */ }
        }
    }

    const elapsed = Date.now() - startTime;

    // 同时通过 fetch 获取证书的更多上下文信息（如是否可访问 HTTPS）
    let httpsAccessible = false;
    let httpsStatus = null;
    let certInfo = {};
    try {
        const resp = await fetch(`https://${domain}/`, {
            method: "GET",
            redirect: "manual",
            headers: { "User-Agent": "SiteCheck/1.0 (+https://212128.xyz)" },
        });
        httpsAccessible = true;
        httpsStatus = resp.status;
        // Cloudflare 会在 cf 标头中暴露部分信息
        certInfo = {
            cfTlsVersion: resp.headers.get("cf-tls-version") || null,
            cfTlsCipher: resp.headers.get("cf-tls-cipher") || null,
        };
    } catch (e) {
        httpsAccessible = false;
    }

    // 综合判断
    const sslEnabled = tlsOk && httpsAccessible;

    return jsonResponse({
        success: true,
        data: {
            domain,
            port,
            sslEnabled,
            tlsConnection: tlsOk,
            httpsAccessible,
            httpsStatus,
            responseTimeMs: elapsed,
            tlsVersion: certInfo.cfTlsVersion || null,
            tlsCipher: certInfo.cfTlsCipher || null,
            error: connectError,
            note: sslEnabled
                ? "SSL/TLS 证书有效，HTTPS 连接正常。"
                : "无法建立 SSL/TLS 连接，证书可能无效、过期或目标端口未开放 HTTPS 服务。",
        },
    });
}

/**
 * GET /api/dns-lookup?domain=xxx&type=xxx
 * DNS 记录查询（通过 Cloudflare DNS-over-HTTPS）
 */
async function handleDnsLookup(request, url) {
    const rawDomain = getParam(url, "domain");
    if (!rawDomain) {
        return errorResponse("缺少必要参数 domain", 400, "MISSING_PARAM");
    }

    const domain = normalizeDomain(rawDomain);
    if (!isValidDomain(domain)) {
        return errorResponse("无效的域名格式", 400, "INVALID_DOMAIN");
    }

    const rawType = (getParam(url, "type") || "A").toUpperCase();
    const allowedTypes = ["A", "AAAA", "CNAME", "MX", "NS", "TXT", "SOA", "SRV", "CAA", "PTR"];
    if (!allowedTypes.includes(rawType)) {
        return errorResponse(`不支持的记录类型：${rawType}，支持类型：${allowedTypes.join(", ")}`, 400, "INVALID_TYPE");
    }

    const startTime = Date.now();
    try {
        // 使用 Cloudflare DNS-over-HTTPS 接口查询
        const dohUrl = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${rawType}`;
        const resp = await fetch(dohUrl, {
            headers: {
                "Accept": "application/dns-json",
                "User-Agent": "SiteCheck/1.0 (+https://212128.xyz)",
            },
        });

        if (!resp.ok) {
            return errorResponse(`DNS 查询失败：上游返回 ${resp.status}`, 502, "UPSTREAM_ERROR");
        }

        const data = await resp.json();
        const elapsed = Date.now() - startTime;

        const records = (data.Answer || []).map((ans) => ({
            name: ans.name,
            type: rtypeToString(ans.type),
            ttl: ans.TTL,
            data: ans.data,
        }));

        return jsonResponse({
            success: true,
            data: {
                domain,
                type: rawType,
                status: data.Status,
                statusText: rcodeToString(data.Status),
                records,
                recordCount: records.length,
                responseTimeMs: elapsed,
            },
        });
    } catch (err) {
        return errorResponse(`DNS 查询失败：${err.message || "未知错误"}`, 200, "QUERY_FAILED");
    }
}

/** DNS 记录类型数字转字符串 */
function rtypeToString(type) {
    const map = {
        1: "A", 2: "NS", 5: "CNAME", 6: "SOA", 12: "PTR",
        15: "MX", 16: "TXT", 28: "AAAA", 33: "SRV", 257: "CAA",
    };
    return map[type] || `TYPE${type}`;
}

/** DNS RCODE 数字转字符串 */
function rcodeToString(code) {
    const map = {
        0: "NOERROR", 1: "FORMERR", 2: "SERVFAIL",
        3: "NXDOMAIN", 5: "REFUSED",
    };
    return map[code] || `RCODE${code}`;
}

// ===== 路由 =====

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;
        const method = request.method;

        // CORS 预检
        if (method === "OPTIONS") {
            return handleCors();
        }

        // 仅允许 GET
        if (method !== "GET") {
            return errorResponse("仅支持 GET 请求", 405, "METHOD_NOT_ALLOWED");
        }

        // 路由分发
        try {
            if (path === "/api/http-status") {
                return await handleHttpStatus(request, url);
            }
            if (path === "/api/ssl-check") {
                return await handleSslCheck(request, url);
            }
            if (path === "/api/dns-lookup") {
                return await handleDnsLookup(request, url);
            }
            if (path === "/api/headers") {
                return await handleHeaders(request, url);
            }

            // 根路径返回 API 信息
            if (path === "/" || path === "/api" || path === "/api/") {
                return jsonResponse({
                    success: true,
                    name: "SiteCheck API",
                    version: "1.0.0",
                    endpoints: [
                        "GET /api/http-status?url=xxx",
                        "GET /api/ssl-check?domain=xxx",
                        "GET /api/dns-lookup?domain=xxx&type=xxx",
                        "GET /api/headers?url=xxx",
                    ],
                });
            }

            return errorResponse("未找到该接口", 404, "NOT_FOUND");
        } catch (err) {
            return errorResponse(`服务器内部错误：${err.message || "未知错误"}`, 500, "INTERNAL_ERROR");
        }
    },
};
