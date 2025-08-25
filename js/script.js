function countdown() {
  const eventDate = new Date("Nov 26, 2025 22:00:00").getTime();
  const now = new Date().getTime();
  const timeLeft = eventDate - now;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const formatTime = (time) => String(time).padStart(2, "0");

  document.getElementById("days").innerText = formatTime(days);
  document.getElementById("hours").innerText = formatTime(hours);
  document.getElementById("minutes").innerText = formatTime(minutes);
  document.getElementById("seconds").innerText = formatTime(seconds);

  if (timeLeft < 0) {
    clearInterval(countdownInterval);
    document.querySelector(".countdown").innerHTML =
      "<h2>A ultima aventura começou! O Volume 1 de Stranger Things 5 está disponivel!</h2>";
  }
}

const countdownInterval = setInterval(countdown, 1000);
countdown();

// Scroll suave
document.querySelectorAll('.side-nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Marcar o círculo ativo conforme rolagem
const sections = document.querySelectorAll('.page01, .page02, .page03');
const dots = document.querySelectorAll('.nav-dot');

window.addEventListener('scroll', () => {
  let current = "";

  sections.forEach(sec => {
    const sectionTop = sec.offsetTop;
    const sectionHeight = sec.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = sec.getAttribute("id");
    }
  });

  dots.forEach(dot => {
    dot.classList.remove("active");
    if (dot.getAttribute("href") === "#" + current) {
      dot.classList.add("active");
    }
  });
});

// ---- Partículas "Mundo Invertido" ----
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

// Criar partículas
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1; // tamanho
    this.speedX = (Math.random() - 0.5) * 0.3; // movimento horizontal
    this.speedY = (Math.random() - 0.5) * 0.3; // movimento vertical
    this.opacity = Math.random() * 0.5 + 0.3; // transparência
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Reaparecer nas bordas
    if (this.x < 0 || this.x > canvas.width) this.x = Math.random() * canvas.width;
    if (this.y < 0 || this.y > canvas.height) this.y = Math.random() * canvas.height;
  }
  draw() {
    ctx.fillStyle = `rgba(200, 200, 200, ${this.opacity})`; // poeira acinzentada
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Inicializar partículas
function initParticles() {
  particlesArray = [];
  const numberOfParticles = 120; // quantidade de partículas
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

// Animar
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Ajustar ao redimensionar a tela
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// Trocar fundo com setas
// --- Alterar background ---
const backgrounds = [
  "url('images/img-background.jpg')",
  "url('images/img-background2.jpg')",
  "url('images/img-background3.jpg')",
  "url('images/img-background4.jpg')",
  "url('images/img-background5.jpg')",
  "url('images/img-background6.jpg')",
  "url('images/img-background7.jpg')",
  "url('images/img-background8.jpg')",
  "url('images/img-background9.jpg')"
];

let currentBg = 0;

document.getElementById("change-bg").addEventListener("click", () => {
  currentBg = (currentBg + 1) % backgrounds.length; // alterna entre as imagens
  document.body.style.backgroundImage = backgrounds[currentBg];
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
});
