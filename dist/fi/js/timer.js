function startTimer(duration, display, timerEndFunction) {
    var timer = duration, minutes, seconds;

    let timerFunction = function () {
        try {
            //log('timer: ' + timer);

            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                log('timerFunction end reached');
                timerEndFunction();
                clearInterval(Globals.intervalId);
            }
        } catch (error) {
            log('error: ' + error);
        }
    };
    timerFunction();
    Globals.intervalId = setInterval(timerFunction, 1000);
}

