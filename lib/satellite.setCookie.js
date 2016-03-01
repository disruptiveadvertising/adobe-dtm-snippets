/*
 * This script redefines the _satellite.setCookie function to allow you to set cookies
 * on the root domain.  In this function, set the "cdp" value to the number of domain
 * periods you want to set the cookie under.  If you want it under the root domain of
 * www.domain.com, it will be 2 for domain.com.  If you want it under the root domain of
 * www.domain.co.uk, it will be 3 for domain.co.uk.
 *
 * To use this, add it to a page top rule.  It can either be added to a custom condition
 * or as a sequential JS third party script.  To override the defaults, you can set a data
 * element with the name "dtmCookieDomainPeriods" with the number of cookie domain periods
 * you wish the site to use.
 */
_satellite.setCookie = function(e, t, i) {
    var a, cdp = 2, h = window.location.hostname, d = h.split('.'), dom = [], n = document;
    if(_satellite.getVar('dtmCookieDomainPeriods')){
      cdp = parseInt(_satellite.getVar('dtmCookieDomainPeriods'))
    }
    if(h.match(/\.co\.|\.com\.|\.ae\.org|\.(id|net|org)\.au|\.(cn|eu|gb|hu|jpn|kr|no)\.com/ig)){
      cdp = 3;
    }
    if (i) {
      var r = new Date;
      r.setTime(r.getTime() + 24 * i * 60 * 60 * 1e3);
      a = "; expires=" + r.toGMTString();
    }
    else
      a = "";
    for(var j=d.length-1; j>=d.length-cdp; j--){
      dom.unshift(d[j]);
    }
    n.cookie = e + "=" + t + a + "; domain=."+dom.join(".")+"; path=/"
};