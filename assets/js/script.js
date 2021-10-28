var playFlag = true;
var muteFlag = true;
var speedFlag = true;
var fullscreenFlag = true;
var videoVolume = 100;
var currentVolume;

var timer = null;
var interval = 1000;

function playVideo(el) {
    const videoEl = document.querySelector('video');
    const videoTimer = document.querySelector('.video-timer');
    const progressBar = document.querySelector('.progress-bar');
    const progressBarInner = document.querySelector('.progress-bar-inner');
    
    if (playFlag) {
        timer = setInterval(function() {
            const currentTime = Math.round(videoEl.currentTime);
            let sec = currentTime % 60;
            let min = parseInt(currentTime / 60) % 60;
            let hour = parseInt(currentTime / 360);

            if (sec < 10) {
                sec = '0' + sec;
            }

            if (min < 10) {
                min = '0' + min;
            }

            if (hour < 10) {
                hour = '0' + hour;
            }

            videoTimer.innerHTML = hour + ':' + min + ':' + sec;
            progressBarInner.style.width = (currentTime * progressBar.clientWidth / Math.round(videoEl.duration)) + 'px';
        }, interval);

        videoEl.play();
        playFlag = false;
        el.src = './assets/images/pause.svg';
    }
    else {
        videoEl.pause();
        playFlag = true;
        el.src = './assets/images/play.svg';
        clearInterval(timer);
    }
}

function muteVideo(el) {
    const videoEl = document.querySelector('video');
    const volumeBarInner = document.querySelector('#current-volume');

    if (muteFlag) {
        videoVolume = videoEl.volume;
        videoEl.volume = 0;
        el.src = './assets/images/volume-mute.svg';
        muteFlag = false;
        currentVolume = volumeBarInner.style.width;
        volumeBarInner.style.width = 0;
    }
    else {
        videoEl.volume = videoVolume;
        el.src = './assets/images/volume-high.svg';
        muteFlag = true;
        volumeBarInner.style.width = currentVolume;
    }
}

function changeVolume(e) {
    const videoEl = document.querySelector('video');
    const arrowPositionX = e.clientX;
    const volumeBar = document.querySelector('.volume-bar');
    const volumeBarInner = document.querySelector('#current-volume');
    const volumeStarPosition = volumeBarInner.getBoundingClientRect().left;
    volumeBarInner.style.width = (arrowPositionX - volumeStarPosition) + 'px';

    const vol = volumeBarInner.clientWidth / volumeBar.clientWidth;
    videoVolume = vol;
    videoEl.volume = vol;
    
    if (!muteFlag) {
        document.querySelector('.volume-icon').src = './assets/images/volume-high.svg';
        muteFlag = false;
    }
}

function changeSpeed(el, speed) {
    const videoEl = document.querySelector('video');
    videoEl.playbackRate = speed;

    const speedArray = document.getElementsByClassName('speed-value');
    for (let i = 0; i < speedArray.length; i++) {
        speedArray[i].classList.remove('active');
    }

    el.classList.add('active');
}

function changeSpeedView() {
    if (speedFlag) {
        document.querySelector('.change-speed').style.display = 'block';
        speedFlag = false;
    }
    else {
        document.querySelector('.change-speed').style.display = 'none';
        speedFlag = true;
    }
}

function playExactSecond(e) {
    const videoEl = document.querySelector('video');
    const arrowPositionX = e.clientX;
    const progressBar = document.querySelector('.progress-bar');
    const progressBarInner = document.querySelector('.progress-bar-inner');
    const videoStartPosition = progressBarInner.getBoundingClientRect().left;
    progressBarInner.style.width = (arrowPositionX - videoStartPosition) + 'px';
    
    const currentTime = videoEl.duration * progressBarInner.clientWidth / progressBar.clientWidth;
    videoEl.currentTime = currentTime;
}

function fullScreen(el) {
    if (fullscreenFlag) {
        document.querySelector('.video').requestFullscreen();
        document.querySelector('#fullscreen').classList.add('fullscreen');
        document.querySelector('.expand-icon').src = './assets/images/fullscreen.png';
        fullscreenFlag = false;
    }
    else {
        document.querySelector('#fullscreen').classList.remove('fullscreen');
        document.exitFullscreen();
        document.querySelector('.expand-icon').src = './assets/images/expand-outline.svg';
        fullscreenFlag = true;
    }
}


