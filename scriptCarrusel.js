var radius = 240; 
var autoRotate = true; 
var rotateSpeed = -60; 
var imgWidth = 120; 
var imgHeight = 170; 

var bgMusicURL = './Un Amor Asi.mp3';
var bgMusicControls = true; 

setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid]; 

ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {
  if(tY > 180) tY = 180;
  if(tY < 0) tY = 0;
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = (yes?'running':'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

if (bgMusicURL) {
  const musicContainer = document.getElementById('music-container') || document.createElement('div');
  musicContainer.id = 'music-container';
  
  const audioElement = document.createElement('audio');
  audioElement.src = bgMusicURL;
  audioElement.controls = bgMusicControls;
  audioElement.autoplay = true;
  audioElement.loop = true;
  
  const visualizer = document.createElement('div');
  visualizer.className = 'music-visualizer';
  
  for (let i = 0; i < 8; i++) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    visualizer.appendChild(bar);
  }
  
  musicContainer.innerHTML = '';
  musicContainer.appendChild(audioElement);
  musicContainer.appendChild(visualizer);
  
  if (!document.getElementById('music-container')) {
    document.body.appendChild(musicContainer);
  }
}

document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX,
      sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
        nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};

document.onmousewheel = function(e) {
  e = e || window.event;
  var d = e.wheelDelta / 20 || -e.detail;
  radius += d;
  init(1);
};


document.addEventListener('DOMContentLoaded', () => {
  // Configuración de los fireworks de corazones
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["heart"],
    colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
  };

  // Función para lanzar los fireworks cada cierto tiempo
  function launchFireworks() {
    confetti({
      ...defaults,
      particleCount: 50,
      scalar: 2,
    });
    confetti({
      ...defaults,
      particleCount: 25,
      scalar: 3,
    });
    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 4,
    });
  }

  // Lanzar fireworks iniciales
  launchFireworks();

  // Lanzar fireworks cada 2.5 segundos
  setInterval(launchFireworks, 5500);
});

function createHearts() {
  const heartsContainer = document.getElementById('heart-background');
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heartsContainer.appendChild(heart);
  }
}

createHearts();

const images = document.querySelectorAll('#spin-container img');
images.forEach(img => {
  img.addEventListener('mouseover', () => {
    img.style.transform = 'scale(1.2) rotateY(20deg)';
    img.style.boxShadow = '0 0 15pxrgb(133, 80, 233)';
    img.style.filter = 'brightness(1.2)';
  });
  img.addEventListener('mouseout', () => {
    img.style.transform = '';
    img.style.boxShadow = '';
    img.style.filter = '';
  });
});

const headerText = document.getElementById('header-text');
setInterval(() => {
  headerText.style.transform = 'scale(1.1)';
  setTimeout(() => {
    headerText.style.transform = 'scale(1)';
  }, 500);
}, 1000);


