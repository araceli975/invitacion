// ============================================
// CONFIGURACIÓN INICIAL
// ============================================

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// ============================================
// 1. PARTÍCULAS DORADAS
// ============================================

function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: isMobile ? 40 : 80,
                    density: { enable: true, value_area: 800 }
                },
                color: { value: "#D4AF37" },
                shape: { type: "circle" },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.1 }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 3, size_min: 0.5 }
                },
                line_linked: {
                    enable: !isMobile,
                    distance: 150,
                    color: "#D4AF37",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: isMobile ? 0.5 : 1,
                    direction: "none",
                    random: true
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: !isMobile,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    }
                }
            },
            retina_detect: true
        });
    }
}

// ============================================
// 2. EFECTOS DE BRILLANTINA
// ============================================

function createGlitter() {
    const container = document.querySelector('.glitter-container');
    if (!container) return;
    
    const count = isMobile ? 30 : 50;
    
    for (let i = 0; i < count; i++) {
        const glitter = document.createElement('div');
        glitter.className = 'glitter';
        
        // Posición
        glitter.style.left = Math.random() * 100 + 'vw';
        glitter.style.top = Math.random() * 100 + 'vh';
        
        // Tamaño
        const size = Math.random() * 4 + 2;
        glitter.style.width = size + 'px';
        glitter.style.height = size + 'px';
        
        // Color
        const golds = ['#D4AF37', '#FFD700', '#FFEC8B', '#F0E68C'];
        glitter.style.backgroundColor = golds[Math.floor(Math.random() * golds.length)];
        
        // Animación
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 5;
        glitter.style.animation = `glitterFall ${duration}s linear ${delay}s infinite`;
        
        container.appendChild(glitter);
    }
}

// ============================================
// 3. CONTADOR CON SEGUNDOS
// ============================================

class CountdownWithSeconds {
    constructor() {
        this.targetDate = new Date('December 20, 2025 17:00:00').getTime();
        this.interval = null;
        this.lastSeconds = null;
        this.init();
    }
    
    init() {
        this.update();
        this.start();
    }
    
    start() {
        this.interval = setInterval(() => this.update(), 1000);
    }
    
    update() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;
        
        if (distance < 0) {
            this.handleCountdownEnd();
            return;
        }
        
        // Cálculos
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Actualizar contador principal
        this.updateElement('cd-days', days);
        this.updateElement('cd-hours', hours, true);
        this.updateElement('cd-minutes', minutes, true);
        this.updateElement('cd-seconds', seconds, true);
        
        // Actualizar contador final
        this.updateElement('fd-days', days);
        this.updateElement('fd-hours', hours, true);
        this.updateElement('fd-minutes', minutes, true);
        this.updateElement('fd-seconds', seconds, true);
        
        // Efectos
        this.handleSecondsEffect(seconds);
        this.applyTimeEffects(days, hours, minutes);
    }
    
    updateElement(id, value, pad = false) {
        const element = document.getElementById(id);
        if (!element) return;
        
        const displayValue = pad ? String(value).padStart(2, '0') : value.toString();
        
        if (element.textContent !== displayValue) {
            element.textContent = displayValue;
            element.classList.add('updating');
            setTimeout(() => element.classList.remove('updating'), 300);
        }
    }
    
    handleSecondsEffect(currentSeconds) {
        if (this.lastSeconds !== null && this.lastSeconds !== currentSeconds) {
            // Efecto visual en segundos
            const secondElements = document.querySelectorAll('[id$="seconds"]');
            secondElements.forEach(el => {
                el.style.transform = 'scale(1.1)';
                setTimeout(() => el.style.transform = 'scale(1)', 150);
            });
            
            // Sonido de tick (opcional)
            if (!isMobile && currentSeconds === 0) {
                this.playTickSound();
            }
        }
        this.lastSeconds = currentSeconds;
    }
    
    playTickSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Silenciar error
        }
    }
    
    applyTimeEffects(days, hours, minutes) {
        const numbers = document.querySelectorAll('.time-number, .final-num');
        
        // Limpiar clases
        numbers.forEach(num => {
            num.classList.remove('urgent', 'warning', 'normal');
        });
        
        // Menos de 1 día
        if (days === 0 && hours < 24) {
            numbers.forEach(num => {
                num.classList.add('urgent');
                num.style.animation = 'pulse 0.5s infinite';
            });
        }
        // Menos de 7 días
        else if (days < 7) {
            numbers.forEach(num => {
                num.classList.add('warning');
                num.style.animation = 'pulse 2s infinite';
            });
        }
        // Normal
        else {
            numbers.forEach(num => {
                num.classList.add('normal');
                num.style.animation = '';
            });
        }
    }
    
    handleCountdownEnd() {
        clearInterval(this.interval);
        
        // Mostrar 00:00:00:00
        document.querySelectorAll('.time-number, .final-num').forEach(el => {
            el.textContent = '00';
            el.classList.add('celebrate');
            el.style.animation = 'celebrate 0.5s infinite';
        });
        
        // Cambiar textos
        document.querySelectorAll('.count-label, .final-count h3').forEach(el => {
            el.textContent = '¡El gran día ha llegado!';
        });
        
        // Efecto de celebración
        this.triggerCelebration();
    }
    
    triggerCelebration() {
        // Confeti
        createConfetti(200);
        
        // Efecto de brillo
        document.body.classList.add('celebrating');
        
        // Si la música está pausada, reproducirla
        if (window.musicPlayer && !window.musicPlayer.isPlaying) {
            setTimeout(() => {
                window.musicPlayer.togglePlay();
            }, 1000);
        }
    }
}

// ============================================
// 4. EFECTO DE CONFETI
// ============================================

function createConfetti(count = 100) {
    const container = document.querySelector('.confetti-overlay') || document.body;
    const symbols = ['✨', '⭐', '★', '✧', '✦'];
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Posición
        confetti.style.position = 'absolute';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        
        // Estilo
        confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
        confetti.style.color = getRandomGoldColor();
        confetti.style.opacity = '0';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        // Animación
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 0.5;
        confetti.style.animation = `fallConfetti ${duration}s linear ${delay}s forwards`;
        
        container.appendChild(confetti);
        
        // Remover
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, (duration + delay) * 1000);
    }
}

function getRandomGoldColor() {
    const golds = ['#D4AF37', '#FFD700', '#FFEC8B', '#F0E68C', '#B8860B'];
    return golds[Math.floor(Math.random() * golds.length)];
}

// ============================================
// 5. REPRODUCTOR DE MÚSICA
// ============================================

class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('backgroundMusic');
        this.playBtn = document.getElementById('playMusic');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.isPlaying = false;
        this.userInteracted = false;
        
        this.init();
    }
    
    init() {
        // Configurar volumen
        this.audio.volume = 0.5;
        this.volumeSlider.value = 0.5;
        
        // Eventos
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
        
        // Permitir audio después de interacción
        document.addEventListener('click', () => this.enableAudio(), { once: true });
        
        // Actualizar UI
        this.audio.addEventListener('play', () => this.updateUI(true));
        this.audio.addEventListener('pause', () => this.updateUI(false));
        
        // Cargar preferencias
        this.loadPreferences();
    }
    
    enableAudio() {
        this.userInteracted = true;
    }
    
    togglePlay() {
        if (!this.userInteracted) {
            this.enableAudio();
        }
        
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play().catch(error => {
                console.log('Error al reproducir:', error);
            });
        }
    }
    
    setVolume(value) {
        this.audio.volume = parseFloat(value);
        localStorage.setItem('musicVolume', value);
    }
    
    updateUI(playing) {
        this.isPlaying = playing;
        const icon = this.playBtn.querySelector('i');
        
        if (playing) {
            icon.className = 'fas fa-pause';
            this.playBtn.classList.add('playing');
            localStorage.setItem('musicAutoPlay', 'true');
        } else {
            icon.className = 'fas fa-play';
            this.playBtn.classList.remove('playing');
        }
    }
    
    loadPreferences() {
        const savedVolume = localStorage.getItem('musicVolume');
        if (savedVolume) {
            this.audio.volume = parseFloat(savedVolume);
            this.volumeSlider.value = savedVolume;
        }
    }
}

// ============================================
// 6. ANIMACIONES DE SCROLL
// ============================================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Confeti suave al ver el mensaje
                if (entry.target.classList.contains('heart-message')) {
                    setTimeout(() => createConfetti(50), 500);
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Observar elementos
    const elements = document.querySelectorAll('.event-card, .message-card, .final-count');
    elements.forEach(el => observer.observe(el));
}

// ============================================
// 7. EFECTOS DE MOUSE
// ============================================

function initMouseEffects() {
    // Seguimiento de formas
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.querySelectorAll('.shape').forEach(shape => {
            const speed = 0.02;
            shape.style.transform = `translate(${x * 50 * speed}px, ${y * 50 * speed}px)`;
        });
    });
    
    // Hover en foto
    const photo = document.querySelector('.crisp-photo');
    if (photo) {
        photo.addEventListener('mouseenter', () => {
            document.querySelectorAll('.sparkle').forEach(sparkle => {
                sparkle.style.animation = 'sparkleTwinkle 0.5s 3';
            });
        });
    }
    
    // Scroll suave
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            document.querySelector('.unified-celebration').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}

// ============================================
// ============================================
// 8. ANIMACIONES ADICIONALES
// ============================================

function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    if (!container) return;
    
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤';
        
        // Estilos
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.color = '#D4AF37';
        heart.style.opacity = Math.random() * 0.2 + 0.1;
        heart.style.zIndex = '1';
        heart.style.pointerEvents = 'none';
        heart.style.userSelect = 'none';
        
        // Animación
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        heart.style.animation = `floatHeart ${duration}s ease-in-out ${delay}s infinite`;
        
        container.appendChild(heart);
    }
}

// ============================================
// 9. EFECTOS DE CARGA
// ============================================

function initImageLoading() {
    const mainPhoto = document.querySelector('.crisp-photo');
    if (!mainPhoto) return;
    
    // Precargar imagen
    const img = new Image();
    img.src = mainPhoto.src;
    
    img.onload = function() {
        mainPhoto.style.opacity = '1';
        mainPhoto.style.transform = 'scale(1)';
    };
    
    img.onerror = function() {
        console.log('Imagen no encontrada');
        mainPhoto.style.opacity = '1';
    };
    
    // Estado inicial
    mainPhoto.style.opacity = '0';
    mainPhoto.style.transform = 'scale(0.9)';
    mainPhoto.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
}

// ============================================
// 10. INICIALIZACIÓN PRINCIPAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando invitación de graduación...');
    
    // 1. Partículas
    initParticles();
    
    // 2. Brillantinas
    createGlitter();
    
    // 3. Contador con segundos
    window.countdown = new CountdownWithSeconds();
    
    // 4. Reproductor de música
    window.musicPlayer = new MusicPlayer();
    
    // 5. Efectos de scroll
    initScrollAnimations();
    
    // 6. Efectos de mouse
    initMouseEffects();
    
    // 7. Corazones flotantes
    createFloatingHearts();
    
    // 8. Carga de imagen
    initImageLoading();
    
    // 9. Efecto de bienvenida
    setTimeout(() => {
        createConfetti(30);
    }, 2000);
    
    console.log('✅ Invitación lista');
});

// ============================================
// 11. ANIMACIONES CSS DINÁMICAS
// ============================================

// Agregar estilos CSS adicionales
const dynamicStyles = `
    @keyframes fallConfetti {
        0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes celebrate {
        0%, 100% { transform: scale(1); color: #D4AF37; }
        50% { transform: scale(1.1); color: #FFD700; }
    }
    
    .urgent {
        color: #ff4444 !important;
        text-shadow: 0 0 10px #ff4444 !important;
    }
    
    .warning {
        color: #ffaa00 !important;
        text-shadow: 0 0 10px #ffaa00 !important;
    }
    
    .normal {
        color: #D4AF37 !important;
    }
    
    .celebrating {
        animation: celebrationGlow 2s infinite alternate;
    }
    
    @keyframes celebrationGlow {
        from { background-color: #000000; }
        to { background-color: #111111; }
    }
    
    .animated {
        animation: fadeInUp 0.8s ease forwards;
        opacity: 0;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Insertar estilos en el documento
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// ============================================
// 12. FUNCIONES DE DEBUG Y CONTROL
// ============================================

// Hacer funciones disponibles para debugging
window.invitationControls = {
    playMusic: () => window.musicPlayer.togglePlay(),
    pauseMusic: () => window.musicPlayer.audio.pause(),
    setVolume: (vol) => window.musicPlayer.setVolume(vol),
    testConfetti: () => createConfetti(100),
    refreshCountdown: () => window.countdown.update(),
    showTimeLeft: () => {
        const now = new Date().getTime();
        const target = new Date('December 20, 2025 17:00:00').getTime();
        const distance = target - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        console.log(`⏰ Faltan: ${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
};

console.log('💡 Usa invitationControls en la consola para controlar efectos');