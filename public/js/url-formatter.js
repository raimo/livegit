(function (doc) {

"use strict";

var REGEX_RAW_URL  = /^(https?):\/\/(?:gist|raw)\.github(?:usercontent)?\.com\/([^\/]+\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,
    REGEX_REPO_URL = /^(https?):\/\/github\.com\/(.+?)\/(.+?)\/(?:blob|raw)\/(.+?\/.+)/i;

var devEl  = doc.getElementById('url-dev'),
    urlEl  = doc.getElementById('url');

urlEl.addEventListener('input', function () {
    var url = urlEl.value.trim();

    if (REGEX_RAW_URL.test(url)) {
        urlEl.classList.remove('invalid');
        urlEl.classList.add('valid');

        devEl.value  = encodeURI(url.replace(REGEX_RAW_URL, '$1://livegit.herokuapp.com/$2/$3.livegit'));
    } else if (REGEX_REPO_URL.test(url)) {
        urlEl.classList.remove('invalid');
        urlEl.classList.add('valid');

        devEl.value  = encodeURI(url.replace(REGEX_REPO_URL, '$1://livegit.herokuapp.com/$2/$3/$4.livegit'));
    } else {
        urlEl.classList.remove('valid');

        if (url.length) {
            urlEl.classList.add('invalid');
        } else {
            urlEl.classList.remove('invalid');
        }

        devEl.value  = '';
    }
}, false);

devEl.addEventListener('focus', onFocus);

function onFocus(e) {
    setTimeout(function () {
        e.target.select();
    }, 1);
}

}(document));
