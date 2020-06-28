Globals = {
    intervalId: null,
    inputBorderColor: null
};

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
}

function show(elId) {
    document.getElementById(elId).style.display = 'block';
}

function hide(elId) {
    document.getElementById(elId).style.display = 'none';
}

function showPinForString() {
    try {
        let pwdInput = document.getElementById('pwdInput');
        if (pwdInput.value.length === 0) {
            pwdInput.style.borderColor = '#ff0000';
            return;
        }

        hide('ihavepwd');
        show('igotpin');

        startTimer(getInitialTimeInSeconds(), document.getElementById('time'), pinTimeExpired);

        getPinForString(pwdInput.value).then(data => {
            try {
                document.getElementById('pinValue').innerText = data;
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

    startTimer(getInitialTimeInSeconds(), document.getElementById('time2'), pwdTimeExpired);

    getStringForPin(pinInput.value).then(data => {
        try {
            document.getElementById('pwdValue').innerText = data;
        } catch (error) {
            log('Error 2: ' + error);
        }
    });
}

function focusField(field) {
    field.style.borderColor = Globals.inputBorderColor;
}

async function getPinForString(string) {
    let url = 'http://127.0.0.1:10000/string'
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'text/plain'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: string // body data type must match "Content-Type" header
    });
    return response.text(); // parses JSON response into native JavaScript objects
}

async function getStringForPin(string) {
    let url = 'http://127.0.0.1:10000/pin'
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'text/plain'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: string // body data type must match "Content-Type" header
    });
    return response.text(); // parses JSON response into native JavaScript objects
}

function getInitialTimeInSeconds() {
    return 667;
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
    clearInterval(Globals.intervalId);
    document.getElementById('gotitPwd').value = 'Start over';
}

function pinTimeExpired() {
    hide('pinHint');
    show('timeExpired');

    log('clearing timer');
    clearInterval(Globals.intervalId);

    document.getElementById('gotitPin').value = 'Start over';
}

function gotItPin() {
    document.getElementById('pwdInput').value = '';

    show('ihavepwd');
    hide('igotpin');

    log('clearing timer');
    clearInterval(Globals.intervalId);
}

function gotItPwd() {
    document.getElementById('pinInput').value = '';

    show('ihavepin');
    hide('igotpwd');

    log('clearing timer');
    clearInterval(Globals.intervalId);
}

function startTimer(duration, display, timerEndFunction) {
    var timer = duration, minutes, seconds;

    let timerFunction = function () {
        try {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                timerEndFunction();
            }
        } catch (error) {
            console.log('error: ' + error);
        }
    };
    timerFunction();
    Globals.intervalId = setInterval(timerFunction, 1000);
}