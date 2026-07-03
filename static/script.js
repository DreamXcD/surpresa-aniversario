// ================= CONFIGURAÇÕES =================
// Data do início da amizade ou data especial para vocês (Ano-Mês-Dia)
const START_DATE = new Date("2023-06-27T00:00:00").getTime(); 

// Texto da Carta (Surpresa de Amizade para a Dafne)
const letterContent = `Querida Dafne,\n\nVocê provavelmente não estava esperando por isso hoje, mas eu achei que um dia comum era o momento perfeito para fazer uma surpresa e te lembrar do quanto a sua amizade é especial para mim.\n\nDesde que os nossos caminhos se cruzaram, minha vida ganhou muito mais risadas, conversas aleatórias maravilhosas e aquela leveza que só uma conexão verdadeira consegue trazer. Sabe, ter você como amiga é ter a certeza de que nunca falta assunto, apoio ou um conselho sincero quando preciso.\n\nVocê tem esse dom único de deixar qualquer ambiente mais leve e de transformar momentos simples em histórias incríveis para lembrar depois. O mundo é um lugar muito melhor, mais divertido e iluminado com você por perto!\n\nFiz esse pequeno espaço digital só para te agradecer pela parceria de sempre, pela sua paciência e por ser exatamente quem você é: autêntica, generosa e uma amiga nota mil. Olho para tudo o que já compartilhamos e só sinto gratidão por ter você na minha vida.\n\nQue a gente continue colecionando boas memórias, risadas e conquistas por muito tempo. Obrigado por tudo, Dafne! Você é incrível! ✨💛`;

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
    
    // Iniciar efeitos visuais de amizade
    startBackgroundParticles('friendship');
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
        setTimeout(typeWriterEffect, 40); // Velocidade de digitação fluida
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
let autoSlideInterval = setInterval(() => moveSlide(1), 3000);

function moveSlide(n) {
    const track = document.getElementById("carousel-track");
    const slides = document.querySelectorAll(".carousel-slide");
    
    if(slides.length === 0) return;

    slideIndex += n;
    
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    
    track.style.transform = `translateX(-${slideIndex * 100}%)`;
    
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
    
    // Inicia Fogos de Artifício
    startFireworks();
    
    // Troca partículas para Estrelas/Brilhos de Celebração
    startBackgroundParticles('celebration');

    // Revela mensagens gradualmente
    const lines = document.querySelectorAll(".final-text");
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.remove("hidden");
            line.style.opacity = 1;
        }, index * 2500);
    });

    setTimeout(() => {
        const btn = document.getElementById("close-modal");
        if (btn) {
            btn.classList.remove("hidden");
        }
    }, lines.length * 2500 + 1000);
});

// ================= GERADOR DE PARTÍCULAS (CSS) =================
let particleInterval;
function startBackgroundParticles(type) {
    clearInterval(particleInterval);
    const container = document.getElementById("particles-container");
    container.innerHTML = ''; 
    
    particleInterval = setInterval(() => {
        const p = document.createElement("div");
        p.classList.add("particle", type);
        
        // Efeitos visuais adaptados para surpresa de amizade
        if(type === 'star') p.innerHTML = '✦';
        if(type === 'friendship') p.innerHTML = '✨';
        if(type === 'celebration') {
            const emojis = ['✨', '💛', '🌟', '🚀'];
            p.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        }
        
        p.style.left = Math.random() * 100 + "vw";
        p.style.animationDuration = (Math.random() * 3 + 3) + "s";
        p.style.fontSize = (Math.random() * 15 + 12) + "px";
        
        container.appendChild(p);
        
        setTimeout(() => p.remove(), 6000);
    }, type === 'celebration' ? 180 : 300);
}

// ================= FOGOS DE ARTIFÍCIO (CANVAS PURO) =================
function startFireworks() {
    const canvas = document.getElementById("fireworks-canvas");
    if (!canvas) return; 
    
    canvas.classList.remove("hidden");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    // Paleta de cores moderna e vibrante
    const colors = ['#00FFFF', '#FFD700', '#9933FF', '#00FF66', '#FF9900'];

    function createExplosion(x, y) {
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: x, y: y,
                vx: (Math.random() - 0.5) * 12,
                vy: (Math.random() - 0.5) * 12,
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
            ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.life})`;
            ctx.fill();

            if (p.life <= 0) particles.splice(index, 1);
        });

        if(Math.random() < 0.06) {
            createExplosion(Math.random() * canvas.width, Math.random() * (canvas.height / 2));
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
        const mensagem = "Oii! Amei a surpresa do site! Você é incrível, muito obrigada pela amizade! ✨💛";
        const url = `https://wa.me/${seuNumero}?text=${encodeURIComponent(mensagem)}`;
        
        window.open(url, '_blank');
    });
}