/* Shell for the static kit pages: cookie consent, Google Analytics behind that
   consent, Vercel Web Analytics and the chat widget. It mirrors the React
   versions (lib/consent.ts, components/CookieConsent.tsx, AnalyticsLoader.tsx,
   ChatWidget.tsx) and shares their localStorage key, so a choice made on one
   kind of page holds on the other. Keep the two in sync. */
(function () {
  "use strict";
  var KEY = "zoyare-consent";
  var YEAR = 365 * 24 * 60 * 60 * 1000;
  var gaId = (window.__ZOYARE && window.__ZOYARE.gaId) || "";
  var local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);

  function getConsent() {
    try {
      var p = JSON.parse(localStorage.getItem(KEY) || "null");
      if (!p || typeof p.analytics !== "boolean" || typeof p.marketing !== "boolean" || typeof p.timestamp !== "number") return null;
      if (Date.now() - p.timestamp > YEAR) return null;
      return p;
    } catch (e) { return null; }
  }
  function setConsent(analytics, marketing) {
    try { localStorage.setItem(KEY, JSON.stringify({ analytics: analytics, marketing: marketing, timestamp: Date.now() })); } catch (e) {}
    window.dispatchEvent(new Event("consent-changed"));
  }
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    for (var k in attrs) { if (k === "text") n.textContent = attrs[k]; else n.setAttribute(k, attrs[k]); }
    (children || []).forEach(function (c) { n.appendChild(c); });
    return n;
  }
  function track(event, params) { if (typeof window.gtag === "function") window.gtag("event", event, params || {}); }

  var css = [
    ".zs-banner{position:fixed;left:0;right:0;bottom:0;z-index:1000;padding:0 12px 12px;pointer-events:none;transform:translateY(100%);transition:transform .4s cubic-bezier(.22,1,.36,1)}",
    ".zs-banner.is-open{transform:none}",
    ".zs-banner__box{pointer-events:auto;max-width:768px;margin:0 auto;padding:16px;background:var(--p-bg,#f8f6f2);color:var(--p-ink,#1a1916);border:1px solid rgba(26,25,22,.16);border-radius:12px;box-shadow:0 12px 32px rgba(26,25,22,.14);font:400 13px/1.45 var(--font-text,system-ui,sans-serif)}",
    ".zs-banner__box p{margin:0 0 12px;color:var(--p-muted,#656460)}",
    ".zs-banner__row{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}",
    ".zs-banner__btns{display:flex;align-items:center;gap:8px;margin-left:auto}",
    ".zs-link{color:inherit;text-decoration:underline;text-underline-offset:3px}",
    ".zs-btn{min-height:40px;padding:0 12px;border:0;background:none;color:var(--p-ink,#1a1916);font:inherit;text-decoration:underline;text-underline-offset:4px;cursor:pointer;border-radius:8px}",
    ".zs-btn--main{padding:0 20px;background:var(--p-accent,#f15f0e);color:#111;font-weight:500;text-decoration:none;transition:transform .15s}",
    ".zs-btn--main:hover{transform:translateY(-1px)}.zs-btn--main:active{transform:none}",
    "@media(min-width:768px){.zs-banner{padding:0 16px 24px}.zs-banner__box{padding:24px 28px;font-size:14px}.zs-banner__box p{margin-bottom:16px}}",
    ".zs-chat-btn{position:fixed;right:24px;bottom:24px;z-index:900;width:48px;height:48px;display:grid;place-items:center;border:0;border-radius:12px;background:var(--p-accent,#f15f0e);color:#111;box-shadow:0 8px 24px rgba(26,25,22,.2);cursor:pointer;transition:transform .15s}",
    ".zs-chat-btn:hover{transform:translateY(-1px)}.zs-chat-btn:active{transform:none}",
    ".zs-chat{position:fixed;right:16px;left:16px;bottom:84px;z-index:900;display:none;flex-direction:column;max-height:480px;background:var(--p-bg,#f8f6f2);color:var(--p-ink,#1a1916);border:1px solid rgba(26,25,22,.16);border-radius:12px;box-shadow:0 24px 48px rgba(26,25,22,.22);font:400 14px/1.5 var(--font-text,system-ui,sans-serif);overflow:hidden}",
    ".zs-chat.is-open{display:flex}",
    "@media(min-width:640px){.zs-chat{left:auto;right:24px;width:384px}}",
    ".zs-chat__head{display:flex;align-items:center;gap:10px;padding:14px 18px;border-bottom:1px solid rgba(26,25,22,.12);font-weight:500}",
    ".zs-chat__dot{width:8px;height:8px;border-radius:50%;background:#34d399}",
    ".zs-chat__body{flex:1;overflow-y:auto;padding:16px 18px;display:flex;flex-direction:column;gap:12px}",
    ".zs-msg{max-width:85%;padding:8px 12px;border-radius:10px;background:var(--p-surface,#ebe9e5);align-self:flex-start;white-space:pre-wrap}",
    ".zs-msg--me{align-self:flex-end;background:var(--p-ink,#1a1916);color:var(--p-bg,#f8f6f2)}",
    ".zs-chat__form{display:flex;gap:8px;padding:10px 14px;border-top:1px solid rgba(26,25,22,.12)}",
    ".zs-chat__form input{flex:1;min-width:0;border:0;background:none;color:inherit;font:inherit;outline:none}",
    ".zs-chat__form button{border:0;background:none;color:var(--p-accent,#f15f0e);cursor:pointer;padding:6px;border-radius:6px}",
    ".zs-chat__form button:disabled{opacity:.3}",
    ".zs-chat-btn:focus-visible,.zs-btn:focus-visible,.zs-chat__form button:focus-visible{outline:2px solid var(--p-accent,#f15f0e);outline-offset:2px}",
    "@media(prefers-reduced-motion:reduce){.zs-banner,.zs-btn--main,.zs-chat-btn{transition:none}}"
  ].join("");
  document.head.appendChild(el("style", { text: css }));

  /* ---------------------------------------------------------- analytics */
  var gaLoaded = false;
  function loadGa() {
    var c = getConsent();
    if (!gaId || gaLoaded || !c || !c.analytics) return;
    gaLoaded = true;
    var ad = c.marketing ? "granted" : "denied";
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", { analytics_storage: "granted", ad_storage: ad, ad_user_data: ad, ad_personalization: ad });
    window.gtag("js", new Date());
    window.gtag("config", gaId, { page_path: location.pathname });
    document.head.appendChild(el("script", { src: "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(gaId), async: "" }));
  }
  window.addEventListener("consent-changed", loadGa);
  loadGa();

  // Vercel Web Analytics (cookieless, no consent needed); the script only exists on Vercel.
  if (!local) {
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    document.head.appendChild(el("script", { src: "/_vercel/insights/script.js", defer: "" }));
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="/estimate"]');
    if (a) track("estimate_click", { source: a.closest("header") ? "nav" : a.closest("footer") ? "footer" : "page" });
  });

  /* ---------------------------------------------------------- consent banner */
  var banner = null;
  function openBanner() {
    if (!banner) {
      var privacy = el("a", { class: "zs-link", href: "/privacy", text: "Privacy policy" });
      var text = el("p", { text: "We use Google Analytics to understand how visitors use our site. With your permission we also use advertising cookies, which let us measure whether our ads bring in the right people. No personal data is sold or shared. " });
      var reject = el("button", { class: "zs-btn", type: "button", text: "Reject" });
      var some = el("button", { class: "zs-btn", type: "button", text: "Analytics only" });
      var all = el("button", { class: "zs-btn zs-btn--main", type: "button", text: "Accept all" });
      reject.onclick = function () { decide(false, false); };
      some.onclick = function () { decide(true, false); };
      all.onclick = function () { decide(true, true); };
      banner = el("div", { class: "zs-banner", role: "dialog", "aria-label": "Cookie consent" }, [
        el("div", { class: "zs-banner__box" }, [text, el("div", { class: "zs-banner__row" }, [privacy, el("div", { class: "zs-banner__btns" }, [reject, some, all])])])
      ]);
      document.body.appendChild(banner);
    }
    requestAnimationFrame(function () { requestAnimationFrame(function () { banner.classList.add("is-open"); }); });
  }
  function decide(analytics, marketing) {
    setConsent(analytics, marketing);
    banner.classList.remove("is-open");
  }
  // As on the React pages: only ask when there is a tracker to consent to.
  if (gaId && !getConsent()) setTimeout(openBanner, 400);
  window.addEventListener("consent:reopen", function () { if (gaId) openBanner(); });

  /* ---------------------------------------------------------- chat widget */
  function chat() {
    var messages = [{ role: "assistant", content: "Hi! I'm the Zoyare assistant. Have a question about our services or want to know if Zoyare is the right fit for your project?" }];
    var busy = false;
    var body = el("div", { class: "zs-chat__body", "aria-live": "polite" });
    var input = el("input", { type: "text", placeholder: "Ask a question", "aria-label": "Message to Zoyare assistant" });
    var sendBtn = el("button", { type: "submit", "aria-label": "Send message" });
    sendBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 9h14M9 2l7 7-7 7" stroke="currentColor" stroke-width="1.5"/></svg>';
    var form = el("form", { class: "zs-chat__form" }, [input, sendBtn]);
    var panel = el("div", { class: "zs-chat", role: "dialog", "aria-label": "Zoyare assistant" }, [
      el("div", { class: "zs-chat__head" }, [el("span", { class: "zs-chat__dot" }), el("span", { text: "Zoyare assistant" })]), body, form
    ]);
    var btn = el("button", { class: "zs-chat-btn", type: "button", "aria-label": "Open chat", "aria-expanded": "false" });
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M2 3h16v11H11l-4 3v-3H2V3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';

    function render() {
      body.textContent = "";
      messages.forEach(function (m) { body.appendChild(el("div", { class: "zs-msg" + (m.role === "user" ? " zs-msg--me" : ""), text: m.content || "…" })); });
      body.scrollTop = body.scrollHeight;
    }
    btn.onclick = function () {
      var open = panel.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close chat" : "Open chat");
      if (open) { track("chat_opened"); render(); setTimeout(function () { input.focus(); }, 50); }
    };
    form.onsubmit = function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text || busy) return;
      messages.push({ role: "user", content: text });
      var history = messages.slice();
      var reply = { role: "assistant", content: "" };
      messages.push(reply);
      input.value = ""; busy = true; sendBtn.disabled = true; render();
      fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history }) })
        .then(function (res) {
          if (!res.ok || !res.body) throw new Error("chat");
          var reader = res.body.getReader(); var dec = new TextDecoder();
          return (function pump() {
            return reader.read().then(function (r) {
              if (r.done) return;
              reply.content += dec.decode(r.value, { stream: true }); render();
              return pump();
            });
          })();
        })
        .catch(function () { reply.content = "Something went wrong. Send an email to hello@zoyare.com."; })
        .then(function () { busy = false; sendBtn.disabled = false; render(); });
    };
    document.body.appendChild(panel);
    document.body.appendChild(btn);
  }
  // Deferred until the browser is idle, as on the React pages.
  if ("requestIdleCallback" in window) window.requestIdleCallback(chat, { timeout: 3000 }); else setTimeout(chat, 1500);
})();
