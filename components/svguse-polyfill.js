if (window.addEventListener) {
    window.addEventListener('load', function () {
        var base,
            bcr,
            cloudLink = '',
            cache = {},
            hash,
            i,
            onload,
            request = false,
            url,
            uses = document.getElementsByTagName('use'),
            xhr;
        if (XMLHttpRequest) {
            request = new XMLHttpRequest();
            if ('withCredentials' in request) {
                request = XMLHttpRequest;
            } else {
                request = XDomainRequest ? XDomainRequest : false;
            }
        }
        if (!request) {
            return;
        }
        onload = function () {
            var body = document.body,
                x = document.createElement('x');
            x.innerHTML = xhr.responseText;
            body.insertBefore(x.firstChild, body.firstChild);
        };
        for (i = 0; i < uses.length; i += 1) {
            try {
                bcr = uses[i].getBoundingClientRect();
            } catch (ignore) {bcr = false;}
            if (bcr && bcr.width === 0 && bcr.height === 0) {
                url = uses[i].getAttribute('xlink:href').split('#');
                base = url[0];
                hash = url[1];
                if (cloudLink && !base.length && hash && !document.getElementById(hash)) {
                    base = cloudLink;
                }
                if (base.length) {
                    uses[i].setAttribute('xlink:href', '#' + hash);
                    cache[base] = cache[base] || new request();
                    xhr = cache[base];
                    if (!xhr.onload) {
                        xhr.onload = onload;
                        xhr.open('GET', base);
                        xhr.send();
                    }
                }
            }
        }
    }, false);
}

