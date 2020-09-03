Globals = {
    intervalId: null,
    inputBorderColor: null,
    fetchAjaxOptions: {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'text/plain',
            'X-Requested-With': 'XMLHttpRequest'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }
};

function addAutoResize() {
    document.querySelectorAll('[data-autoresize]').forEach(function (element) {
        element.style.boxSizing = 'border-box';
        var offset = element.offsetHeight - element.clientHeight;
        element.addEventListener('input', function (event) {
            event.target.style.height = 'auto';
            event.target.style.height = event.target.scrollHeight + offset + 'px';
        });
        element.removeAttribute('data-autoresize');
    });
}

function getBackendHost() {
    let host = window.location.host;
    console.log('host: ' + host);
    switch (host) {
        case 'localhost':
        case 'localhost:8080':
        case '127.0.0.1':
        case '127.0.0.1:8080':
            return 'http://127.0.0.1:9999';
        case 'stt.sasu.net':
            return 'https://backend.stt.sasu.net';
        case 'stage.stt.sasu.net':
            return 'https://stage.backend.stt.sasu.net';
        default:
            return 'http://127.0.0.1:9999'
    }
}

function log(string) {
    console.log(string);
}

function main() {
    log('main started');
    let ihavepin = document.getElementById('ihavepin');
    let ihavepwd = document.getElementById('ihavepwd');

    //addEventListeners(ihavepin, ihavepwd);
    //addEventListeners(ihavepwd, ihavepin);

    function addEventListeners(sourceEl, targetEl) {
        sourceEl.addEventListener("mouseover", function (event) {
            targetEl.style.opacity = 0.4;
        });
        sourceEl.addEventListener("mouseout", function (event) {
            targetEl.style.opacity = 1.0;
        });
    }

    document.getElementById('time').innerText = getInitialTimeString();

    let pwdInput = document.getElementById('pwdInput');
    Globals.inputBorderColor = pwdInput.style.borderColor;

    document.getElementById('pinInput').addEventListener('keyup', function onEvent(e) {
        if (e.keyCode === 13) {
            showPwdForPin();
        }
    });

    document.getElementById('pwdInput').addEventListener('keyup', function onEvent(e) {
        if (e.keyCode === 13) {
            showPinForString();
        }
    });

    addAutoResize();
}

function showPinForString() {
    try {
        let pwdInput = document.getElementById('pwdInput');
        if (pwdInput.value.length === 0) {
            pwdInput.style.borderColor = '#ff0000';
            return;
        }

        hide('timeExpired');
        hide('ihavepwd');
        show('igotpin');
        show('pinHint');

        startTimer(getInitialTimeInSeconds(), document.getElementById('time'), pinTimeExpired);

        getPinForString(pwdInput.value).then(response => {
            try {
                if (response.status !== 200) {
                    log.error('getPinForString error with status code ' + response.status);
                } else {
                    response.text().then(data => {
                        document.getElementById('pinValue').innerText = data;
                    });
                }
            } catch (error) {
                log('Error 2: ' + error);
            }
        });
    } catch (error) {
        log('Error: ' + error);
    }
}

function showPwdForPin(pin) {
    let pinInput = document.getElementById('pinInput');
    if (pinInput.value.length === 0) {
        pinInput.style.borderColor = '#ff0000';
        return;
    }

    hide('ihavepin');
    show('igotpwd');

    //startTimer(getInitialTimeInSeconds(), document.getElementById('time2'), pwdTimeExpired);

    getStringForPin(pinInput.value).then(response => {
        try {
            if (response.status === 204) {
                let pwdValueSpan = document.getElementById('pwdValue');
                pwdValueSpan.style.color = 'red';
                pwdValueSpan.innerText= 'No text found with given PIN';
                hide('stringStart');
            } else {
                response.text().then(data => {
                    showTextInOverlay(data);
                    //document.getElementById('pwdValue').innerText = data;
                });
            }
        } catch (error) {
            log('Error 2: ' + error);
        }
    });
}

function focusField(field) {
    field.style.borderColor = Globals.inputBorderColor;
}

async function getPinForString(string) {
    let url = getBackendHost() + '/string';
    let initOptions = Object.assign({
        body: string
    }, Globals.fetchAjaxOptions);
    const response = await fetch(url, initOptions);
    return response; // parses JSON response into native JavaScript objects
}

async function getStringForPin(string) {
    let url = getBackendHost() + '/pin';
    let initOptions = Object.assign({
        body: string
    }, Globals.fetchAjaxOptions);
    const response = await fetch(url, initOptions);
    return response; // parses JSON response into native JavaScript objects
}

function getInitialTimeInSeconds() {
    return 300;
}

function getInitialTimeString() {
    let time = getInitialTimeInSeconds();
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    let minutesString = minutes.toString();
    let secondsString = seconds.toString();

    if (minutesString.length === 1) {
        minutesString = '0' + minutesString;
    }
    if (secondsString.length === 1) {
        secondsString = '0' + secondsString;
    }

    return minutesString + ':' + secondsString;
}

function pwdTimeExpired() {
    document.getElementById('stringStart').innerText = 'Your string has expired';
    document.getElementById('pwdValue').innerText = '';
    hide('pwdHint');
    document.getElementById('gotitPwd').value = 'Start over';
}

function pinTimeExpired() {
    hide('pinHint');
    show('timeExpired');

    document.getElementById('gotitPin').value = 'Start over';
}

function gotItPin() {
    document.getElementById('pwdInput').value = '';

    show('ihavepwd');
    hide('igotpin');

    clearInterval(Globals.intervalId);
}

function gotItPwd() {
    document.getElementById('pinInput').value = '';

    show('ihavepin');
    hide('igotpwd');

    show('pwdHint');

    show('stringStart');

    clearInterval(Globals.intervalId);
}
