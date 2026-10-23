/* 共享 i18n 小工具：每个页面自己定义 I18N 字典，然后调 initSite(I18N)。
 *
 * 为什么不用 document.all 扫节点：IE8/HTA 里它是 truthy，但现代浏览器把它实现成
 * IsHTMLDDA（typeof 和布尔值都是假），document.all ? n : 0 会直接取 0、整页文案空白。
 * 面板(HTA)继续用 document.all 没问题，网页一律用 querySelectorAll。
 */
var SITE = { lang: 'zh', dict: null };

function detectLang() {
  var n = (navigator.language || navigator.userLanguage || 'zh').toLowerCase();
  return n.indexOf('zh') === 0 ? 'zh' : 'en';
}

function initSite(dict) {
  SITE.dict = dict;
  SITE.lang = detectLang();
  applyLang();
}

function applyLang() {
  var dict = SITE.dict;
  if (!dict) return;
  var t = dict[SITE.lang] || dict.zh;
  var list = document.querySelectorAll('[data-k]');
  for (var i = 0; i < list.length; i++) {
    var k = list[i].getAttribute('data-k');
    if (t[k] !== undefined) list[i].innerHTML = t[k];
  }
  document.documentElement.lang = SITE.lang === 'zh' ? 'zh-CN' : 'en';
  if (t.page_title) document.title = t.page_title;

  var btns = document.querySelectorAll('[data-lang]');
  for (var j = 0; j < btns.length; j++) {
    btns[j].className = btns[j].getAttribute('data-lang') === SITE.lang ? 'on' : '';
  }
}

function setLang(l) {
  SITE.lang = l;
  applyLang();
}
