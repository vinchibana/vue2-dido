(function (doc, win) {
  const docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    reCalc = function () {
      const clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 15 * (clientWidth / 320) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, reCalc, false);
  doc.addEventListener('DOMContentLoaded', reCalc, false);
})(document, window);
