const timer = document.querySelector('time');
const form = document.querySelector('form');
const buttonStart = document.querySelector('.start');
const buttonPause = document.getElementById('pause');
const buttonCancel = document.querySelector('.cancel');

form.addEventListener('submit', handleSubmit);
buttonStart.addEventListener('click', countdown);
buttonPause.addEventListener('click', countdown);
buttonCancel.addEventListener('click', handleCancel);

let timerOn = true;
let work = true;
let workTime = 0;
let breakTime = 0;
let time = workTime * 60;
let min = 0;
let sec = 0;
let interval = null;
let sound = new Audio("http://res.cloudinary.com/hbrwdfccc/video/upload/v1533820266/Bongos.mp3");

function handleSubmit(event) {
    event.preventDefault();
    const workValue = event.target.elements.work.value;
    const breakValue = event.target.elements.break.value;
    workTime = workValue;
    breakTime = breakValue;
    time = workTime * 60;
}

function countdown() {
    if (timerOn) {
        timerOn = false;
        buttonPause.textContent = 'Pause';
        interval = setInterval(() => {

            min = Math.floor(time / 60);
            sec = time % 60;

            min = min < 10 ? '0' + min : min;
            sec = sec < 10 ? '0' + sec : sec;

            timer.innerHTML = `${min}:${sec}`;

            time--;
            if (time < 0) {
                if (work) {
                    time = breakTime * 60;
                    work = false;
                    sound.play();
                    document.body.style.background = "linear-gradient(to right, rgb(0, 255, 251), rgb(0, 255, 98))";
                } else {
                    time = workTime * 60;
                    work = true;
                    sound.play();
                    document.body.style.background = "linear-gradient(to right, rgb(255, 200, 0), rgb(255, 0, 0))";
                }
            }
        }, 1000);

    } else {
        clearInterval(interval);
        timerOn = true;
        buttonPause.textContent = 'Start';
    }
}

function handleCancel() {
    clearInterval(interval);
    min = 0;
    sec = 0;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    timer.innerHTML = `${min}:${sec}`;
    time = workTime * 60;
    work = true;
    timerOn = true;
    form.reset()
    document.body.style.background = "linear-gradient(to right, rgb(255, 200, 0), rgb(255, 0, 0))";
}