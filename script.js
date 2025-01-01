const pictures = document.querySelectorAll('.Picture');
var previousTouch = undefined;

function updateElementPosition(element, event) {
  var movementX, movementY;

  if (event.type === 'touchmove') {
    const touch = event.touches[0];
    movementX = previousTouch ? touch.clientX - previousTouch.clientX : 0;
    movementY = previousTouch ? touch.clientY - previousTouch.clientY : 0;
    previousTouch = touch;
  } else {
    movementX = event.movementX;
    movementY = event.movementY;
  }

  const elementY = parseInt(element.style.top || 0) + movementY;
  const elementX = parseInt(element.style.left || 0) + movementX;

  element.style.top = elementY + "px";
  element.style.left = elementX + "px";
}

function startDrag(element, event) {
  element.style.zIndex = 1000;
  const updateFunction = (event) => updateElementPosition(element, event);
  const stopFunction = () => stopDrag({ update: updateFunction, stop: stopFunction, element });
  document.addEventListener("mousemove", updateFunction);
  document.addEventListener("touchmove", updateFunction);
  document.addEventListener("mouseup", stopFunction);
  document.addEventListener("touchend", stopFunction);
}

function stopDrag(functions) {
  functions.element.style.zIndex = 1;
  previousTouch = undefined;
  document.removeEventListener("mousemove", functions.update);
  document.removeEventListener("touchmove", functions.update);
  document.removeEventListener("mouseup", functions.stop);
  document.removeEventListener("touchend", functions.stop);
}

const picturesArray = Array.from(pictures);
const lastPicture = picturesArray[picturesArray.length - 1];
picturesArray.unshift(lastPicture);
picturesArray.pop();

picturesArray.forEach((picture, index) => {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const centerY = windowHeight / 2;
  const centerX = windowWidth / 2;
  
  const randomOffset = Math.random() * 20 - 10;
  const randomRotate = (Math.random() * 10) - 5;
  
  picture.style.top = `${centerY + randomOffset}px`;
  picture.style.left = `${centerX + randomOffset}px`;
  picture.style.transform = `translate(-50%, -50%) rotate(${randomRotate}deg)`;
  picture.style.zIndex = picturesArray.length - index;
  
  const startFunction = (event) => startDrag(picture, event);
  picture.addEventListener("mousedown", startFunction);
  picture.addEventListener("touchstart", startFunction);
});

document.addEventListener('DOMContentLoaded', function () {
  const heroBtn = document.querySelector('.hero-btn');

  if (heroBtn) {
    heroBtn.addEventListener('click', function () {
      if (!$(this).parent().hasClass('active')) {
        $(this).parent().stop().addClass('active');
        setTimeout(function () {
          $(this).parent().removeClass('active');
          mostrarTextoAmor();
        }, 2500);
      }
    });
  }
});


function mostrarTextoAmor() {
  // Cambia la ubicación de la página actual a 'galeria.html'
  window.location.href = "galeria.html";
}

$(document).ready(function () {
  $('.Text').on('click', function () {
    if (!$(this).parent().hasClass('active')) {
      $(this).parent().stop().addClass('active');
      setTimeout(() => {
        $(this).parent().removeClass('active');
        mostrarCarta();
      }, 2500);
    }
  });

  function mostrarCarta() {
    window.location.href = 'indexDedicatoria.html';
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const btn = document.querySelector('.btn');
  const particlesContainer = document.querySelector('.particles-container');

  btn.addEventListener('click', function() {
    if (!this.classList.contains('active')) {
      this.classList.add('active');
      createParticles();
      setTimeout(() => {
        this.classList.remove('active');
        // Aquí normalmente navegarías a 'galeria.html'
        console.log("Navegando a la página de galería");
      }, 2500);
    }
  });

  function createParticles() {
    particlesContainer.innerHTML = '';
    for (let i = 0; i < 36; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particlesContainer.appendChild(particle);

      const size = Math.random() * 8 + 4;
      const destinationX = (Math.random() - 0.5) * 2 * 200;
      const destinationY = (Math.random() - 0.5) * 2 * 200;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.top = '50%';
      particle.style.left = '50%';

      anime({
        targets: particle,
        opacity: [1, 0],
        translateX: destinationX,
        translateY: destinationY,
        scale: [1, 0],
        easing: 'easeOutExpo',
        duration: 1500,
        delay: i * 20
      });
    }
  }
});




