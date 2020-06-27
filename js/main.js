Globals = {
    intervalId: null,
    inputBorderColor: null
};

function main(){
    let ihavepin = document.getElementById('ihavepin');
    let ihavepwd = document.getElementById('ihavepwd');
    
    //addEventListeners(ihavepin, ihavepwd);
    //addEventListeners(ihavepwd, ihavepin);

    function addEventListeners(sourceEl, targetEl){
        sourceEl.addEventListener("mouseover", function( event ) {   
            targetEl.style.opacity = 0.4;
        });
        sourceEl.addEventListener("mouseout", function( event ) {   
            targetEl.style.opacity = 1.0;
        });
    }
    
    document.getElementById('time').innerText = getInitialTimeString();
    
    let pwdInput = document.getElementById('pwdInput');
    Globals.inputBorderColor = pwdInput.style.borderColor;
}

function show(elId){
    document.getElementById(elId).style.display = 'block';
}

function hide(elId){
    document.getElementById(elId).style.display = 'none';
}

function toggleDisplay(el){
    if(el.style.display === 'block' || el.style.display === ''){
        el.style.display = 'none';
    }else if(el.style.display === 'none'){
        el.style.display = 'block';
    }
    
    let pinValueEl = document.getElementById('pinValue');
    let pinValue = getPinForString();
    pinValue.innerText = pinValue;
}

function showPinForString(string){
    let pwdInput = document.getElementById('pwdInput');
    if(pwdInput.value.length === 0){
        pwdInput.style.borderColor = '#ff0000';
        return;
    }
    
    hide('ihavepwd');
    show('igotpin');
    
    startTimer(getInitialTimeInSeconds(), document.getElementById('time'));
}

function showPwdForPin(pin){
    let pinInput = document.getElementById('pinInput');
    if(pinInput.value.length === 0){
        pinInput.style.borderColor = '#ff0000';
        return;
    }
    
    let ihavepwd = document.getElementById('ihavepwd');
    let igotpin = document.getElementById('igotpin');
    toggleDisplay(ihavepwd);
    toggleDisplay(igotpin);
}

function focusField(field){
    field.style.borderColor = Globals.inputBorderColor;
}

function getPinForString(){
    return '1234';
}

function getInitialTimeInSeconds(){
    return 10;
}

function getInitialTimeString(){
    let time = getInitialTimeInSeconds();
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    
    let minutesString = minutes.toString();
    let secondsString = seconds.toString();
    
    if(minutesString.length === 1){
        minutesString = '0' + minutesString;
    }
    if(secondsString.length === 1){
        secondsString = '0' + secondsString;
    }
    
    return minutesString + ':' + secondsString;
}
function timeExpired(){
    hide('pinHint');
    show('timeExpired');
    clearInterval(Globals.intervalId);
    
    document.getElementById('gotit').value = 'Start over';
}

function gotIt(){
    let ihavepwd = document.getElementById('ihavepwd');
    let igotpin = document.getElementById('igotpin');
    let pinHint = document.getElementById('pinHint');
    let timeExpired = document.getElementById('timeExpired');

    toggleDisplay(pinHint);
    toggleDisplay(timeExpired);
    toggleDisplay(ihavepwd);
    toggleDisplay(igotpin);
    
    clearInterval(Globals.intervalId);
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    
    let timerFunction = function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timeExpired();
        }
    };
    timerFunction();
    Globals.intervalId = setInterval(timerFunction, 1000);
}