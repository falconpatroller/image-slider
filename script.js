const slides = Array.from(document.querySelectorAll('.slide'));
const dotsContainer = document.getElementById('dots');
const caption = document.getElementById('caption');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playPauseBtn = document.getElementById('playPauseBtn');

let currentIndex = 0;
let autoplay = false;
let autoplayTimer = null;
const autoplayDelay = 3500;

function buildDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to image ${index + 1}`);
    dot.addEventListener('click', () => {
      showSlide(index);
      restartAutoplay();
    });
    dotsContainer.appendChild(dot);
  });
}

function updateUi() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentIndex);
  });

  const dots = Array.from(document.querySelectorAll('.dot'));
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
    dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
  });

  caption.textContent = `Image ${currentIndex + 1} of ${slides.length}`;
}

function showSlide(index) {
  currentIndex = (index + slides.length) % slides.length;
  updateUi();
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

function startAutoplay() {
  autoplay = true;
  playPauseBtn.textContent = 'Pause';
  playPauseBtn.setAttribute('aria-pressed', 'true');
  autoplayTimer = window.setInterval(nextSlide, autoplayDelay);
}

function stopAutoplay() {
  autoplay = false;
  playPauseBtn.textContent = 'Auto Play';
  playPauseBtn.setAttribute('aria-pressed', 'false');
  window.clearInterval(autoplayTimer);
  autoplayTimer = null;
}

function restartAutoplay() {
  if (!autoplay) return;
  stopAutoplay();
  startAutoplay();
}

prevBtn.addEventListener('click', () => {
  prevSlide();
  restartAutoplay();
});

nextBtn.addEventListener('click', () => {
  nextSlide();
  restartAutoplay();
});

playPauseBtn.addEventListener('click', () => {
  if (autoplay) {
    stopAutoplay();
  } else {
    startAutoplay();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    prevSlide();
    restartAutoplay();
  }
  if (event.key === 'ArrowRight') {
    nextSlide();
    restartAutoplay();
  }
});

buildDots();
updateUi();
