// ================= CONFIGURAÇÕES =================
// Data do início do relacionamento ou data que deseja contar
const START_DATE = new Date("2025-08-06T00:00:00").getTime(); 

// Texto da Carta
const letterContent = `Meu amor,\n\nHoje o mundo inteiro deveria parar para celebrar, porque é o dia em que nasceu a pessoa mais incrível, generosa e linda que eu já conheci. Desde aquele mês de agosto de 2025, quando os nossos caminhos finalmente se cruzaram, a minha vida ganhou um sentido completamente novo. Eu descobri que o amor verdadeiro não é aquele que a gente idealiza nos livros, mas aquele que a gente constrói no dia a dia, nos sorrisos partilhados, nos abraços apertados e na certeza de ter encontrado o nosso lugar no mundo.\n\nSabe, antes de você chegar, meus dias seguiam um ritmo comum. Mas com você, cada detalhe ganhou uma nova intensidade, uma cor mais viva e um brilho que eu nunca imaginei encontrar. O som da sua risada virou a minha melodia favorita, o seu olhar se tornou o meu ponto de paz no meio de qualquer tempestade, e o aconchego do seu abraço virou o único refúgio onde eu sinto que nada de ruim pode me alcançar. Você tem essa capacidade mágica de transformar os momentos mais simples em memórias inesquecíveis.\n\nQuero aproveitar este dia tão único para te agradecer por ser exatamente quem você é. Obrigado por sua paciência, pelo seu apoio incondicional e por me incentivar a ser alguém melhor a cada dia. Obrigado por me ensinar o verdadeiro significado de cumplicidade e por me dar o privilégio de caminhar de mãos dadas com alguém tão especial. Este pequeno espaço digital é apenas uma tentativa singela de colocar em palavras um sentimento que transborda e que mal cabe no meu peito.\n\nOlho para tudo o que já vivemos até aqui e meu coração se enche de orgulho e gratidão. Mas, acima de tudo, olho para o futuro com uma certeza inabalável: eu quero passar cada próximo capítulo da minha vida ao seu lado. Quero estar aqui para te ver realizar todos os seus sonhos, para segurar a sua mão quando você precisar de força e para comemorar cada um dos seus aniversários, ano após ano, lembrando você do tamanho do meu amor.\n\nQue o seu novo ciclo seja repleto de luz, saúde, conquistas e de momentos felizes, de preferência, todos vividos bem pertinho de mim. Você merece o mundo inteiro, meu amor, mas saiba que o meu mundo já é completamente seu.\n\nFeliz aniversário, minha vida, meu porto seguro e meu eterno amor. Eu te amo infinitamente. ❤️`;
// ================= ESTADOS =================
let musicPlaying = false;
const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

// ================= INICIALIZAÇÃO =================
window.onload = () => {
    // Tela de loading de 2 segundos
    setTimeout(() => {
        document.getElementById("loading-screen").classList.add("hidden");
        document.getElementById("intro-screen").classList.remove("hidden");
        startBackgroundParticles('star');
    }, 2000);
};

// ================= BOTÃO COMEÇAR =================
document.getElementById("start-btn").addEventListener("click", () => {
    // Tocar música
    bgMusic.play();
    musicPlaying = true;
    musicToggle.classList.remove("hidden");

    // Trocar Telas
    document.getElementById("intro-screen").classList.add("hidden");
    const mainScreen = document.getElementById("main-screen");
    mainScreen.classList.remove("hidden");
    
    // Iniciar efeitos e fluxos
    startBackgroundParticles('heart');
    typeWriterEffect();
});

// ================= CONTROLE DE MÚSICA =================
musicToggle.addEventListener("click", () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = "🎵 Play";
    } else {
        bgMusic.play();
        musicToggle.innerHTML = "🎵 Pause";
    }
    musicPlaying = !musicPlaying;
});

// ================= EFEITO MÁQUINA DE ESCREVER =================
let i = 0;
function typeWriterEffect() {
    const textContainer = document.getElementById("typewriter-text");
    if (i < letterContent.length) {
        textContainer.innerHTML += letterContent.charAt(i) === '\n' ? '<br>' : letterContent.charAt(i);
        i++;
        setTimeout(typeWriterEffect, 50); // Velocidade da digitação
    } else {
        // Quando terminar a carta, mostra a galeria e o contador
        setTimeout(() => {
            document.getElementById("gallery-section").classList.remove("hidden");
            document.getElementById("counter-section").classList.remove("hidden");
            
            // Depois de 5 segundos vendo a galeria, mostra o botão especial
            setTimeout(() => {
                document.getElementById("special-btn-container").classList.remove("hidden");
            }, 5000);
        }, 1000);
    }
}

// ================= CARROSSEL DE IMAGENS =================
let slideIndex = 0;
let autoSlideInterval = setInterval(() => moveSlide(1), 3000); // Passa a cada 3s

function moveSlide(n) {
    const track = document.getElementById("carousel-track");
    const slides = document.querySelectorAll(".carousel-slide");
    
    if(slides.length === 0) return;

    slideIndex += n;
    
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    
    track.style.transform = `translateX(-${slideIndex * 100}%)`;
    
    // Reinicia o timer manual se o usuário clicar
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => moveSlide(1), 3000);
}

// ================= CONTADOR DE TEMPO =================
setInterval(() => {
    const now = new Date().getTime();
    const distance = now - START_DATE;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}, 1000);

// ================= BOTÃO SURPRESA FINAL =================
document.getElementById("special-btn").addEventListener("click", () => {
    document.getElementById("main-screen").classList.add("hidden");
    document.getElementById("final-screen").classList.remove("hidden");
    
    // Inicia Fogos de Artifício (Canvas)
    startFireworks();
    
    // Troca partículas para Pétalas
    startBackgroundParticles('petal');

    // Revela mensagens gradualmente
    const lines = document.querySelectorAll(".final-text");
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.remove("hidden");
            line.style.opacity = 1;
        }, index * 2500); // 2.5s entre cada frase
    });

   // 131: Revela o botão do WhatsApp
// 132: 
    setTimeout(() => {
        const btn = document.getElementById("close-modal"); // 133
        if (btn) { // 134
            btn.classList.remove("hidden"); // 135
        }
    }, lines.length * 2500 + 1000);
});

// ================= GERADOR DE PARTÍCULAS (CSS) =================
let particleInterval;
function startBackgroundParticles(type) {
    clearInterval(particleInterval);
    const container = document.getElementById("particles-container");
    container.innerHTML = ''; // Limpa os antigos
    
    particleInterval = setInterval(() => {
        const p = document.createElement("div");
        p.classList.add("particle", type);
        
        if(type === 'star') p.innerHTML = '✦';
        if(type === 'heart') p.innerHTML = '❤️';
        
        // Posição e duração aleatórias
        p.style.left = Math.random() * 100 + "vw";
        p.style.animationDuration = (Math.random() * 3 + 3) + "s";
        p.style.fontSize = (Math.random() * 15 + 10) + "px";
        
        container.appendChild(p);
        
        // Remove após a animação
        setTimeout(() => p.remove(), 6000);
    }, type === 'petal' ? 150 : 300); // Pétalas caem mais rápido
}

// ================= FOGOS DE ARTIFÍCIO (CANVAS PURO) =================
function startFireworks() {
    const canvas = document.getElementById("fireworks-canvas");
    if (!canvas) return; // Segurança caso o canvas não exista
    
    canvas.classList.remove("hidden");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const colors = ['#FFD700', '#ff4d4d', '#ffffff', '#ffb3b3'];

    function createExplosion(x, y) {
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: x, y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
    }

    function animateFireworks() {
        ctx.fillStyle = "rgba(10, 10, 10, 0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.15;
            p.life -= 0.02;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.life})`;
            ctx.fill();

            if (p.life <= 0) particles.splice(index, 1);
        });

        if(Math.random() < 0.05) {
            createExplosion(Math.random() * canvas.width, Math.random() * (canvas.height/2));
        }
        requestAnimationFrame(animateFireworks);
    }
    animateFireworks();
}

// Auxiliar para cor
function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
}

// ================= BOTÃO WHATSAPP =================
const btnWhatsApp = document.getElementById('close-modal');

if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', () => {
        const seuNumero = "5527992373337"; 
        const mensagem = "Meu amor, eu também te amo infinitamente! ❤️";
        const url = `https://wa.me/${seuNumero}?text=${encodeURIComponent(mensagem)}`;
        
        window.open(url, '_blank');
    });
}