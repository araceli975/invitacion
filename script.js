// script.js - Efectos Dinámicos para la Invitación de Graduación

// ============================================
// 1. CONFIGURACIÓN INICIAL Y DETECCIÓN
// ============================================

// Detectar dispositivo para optimizaciones
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isTablet = /iPad|Android|Tablet/i.test(navigator.userAgent);

// Configurar según dispositivo
if (isMobile) {
    document.body.classList.add('mobile-device');
    console.log('📱 Dispositivo móvil detectado - Optimizando efectos...');
}

if (isTablet) {
    document.body.classList.add('tablet-device');
}

// ============================================
// 2. PARTÍCULAS DORADAS INTERACTIVAS
// ============================================

function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        const particleConfig = isMobile ? getMobileParticles() : getDesktopParticles();
        particlesJS('particles-js', particleConfig);
        console.log('✨ Partículas inicializadas');
    } else {
        console.warn('⚠️ ParticlesJS no encontrado');
        // Crear partículas manualmente como fallback
        createFallbackParticles();
    }
}

function getDesktopParticles() {
    return {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#D4AF37"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 3,
                    size_min: 0.5,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#D4AF37",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    };
}

function getMobileParticles() {
    return {
        particles: {
            number: {
                value: 30,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#D4AF37"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.3,
                random: true
            },
            size: {
                value: 2,
                random: true
            },
            line_linked: {
                enable: false
            },
            move: {
                enable: true,
                speed: 0.5,
                direction: "none",
                random: true
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: false
                },
                onclick: {
                    enable: true,
                    mode: "push"
                }
            }
        }
    };
}

function createFallbackParticles() {
    const container = document.getElementById('particles-js');
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'fallback-particle';
        
        // Estilos
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = '#D4AF37';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        // Animación
        particle.style.animation = `fallbackFloat ${Math.random() * 10 + 5}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(particle);
    }
}

// ============================================
// 3. EFECTO DE BRILLANTINAS DINÁMICAS
// ============================================

function createGlitterEffect() {
    const container = document.querySelector('.glitter-container');
    if (!container) return;
    
    const glitterCount = isMobile ? 30 : 50;
    const colors = ['#D4AF37', '#FFD700', '#FFEC8B', '#F0E68C'];
    
    for (let i = 0; i < glitterCount; i++) {
        const glitter = document.createElement('div');
        glitter.className = 'glitter-particle';
        
        // Posición aleatoria
        glitter.style.left = Math.random() * 100 + 'vw';
        glitter.style.top = Math.random() * 100 + 'vh';
        
        // Tamaño aleatorio
        const size = Math.random() * 4 + 2;
        glitter.style.width = size + 'px';
        glitter.style.height = size + 'px';
        
        // Color aleatorio
        glitter.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        glitter.style.borderRadius = '50%';
        
        // Animación
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        glitter.style.animation = `glitterFloat ${duration}s ease-in-out ${delay}s infinite`;
        
        container.appendChild(glitter);
    }
    
    console.log('✨ Brillantinas creadas');
}

// ============================================
// 4. CONTADOR EN TIEMPO REAL
// ============================================

class CountdownTimer {
    constructor() {
        this.targetDate = new Date('December 20, 2025 17:00:00').getTime();
        this.elements = {
            days: ['cd-days', 'fd-days'],
            hours: ['cd-hours', 'fd-hours'],
            minutes: ['cd-minutes'],
            seconds: ['cd-seconds']
        };
        this.interval = null;
        this.init();
    }
    
    init() {
        this.update();
        this.start();
        console.log('⏰ Contador inicializado');
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
        
        // Actualizar elementos
        this.updateElement('days', days);
        this.updateElement('hours', hours, true);
        this.updateElement('minutes', minutes, true);
        this.updateElement('seconds', seconds, true);
        
        // Efectos especiales
        this.applySpecialEffects(days);
    }
    
    updateElement(type, value, pad = false) {
        const displayValue = pad ? String(value).padStart(2, '0') : value.toString();
        
        this.elements[type]?.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                if (element.textContent !== displayValue) {
                    element.textContent = displayValue;
                    this.animateUpdate(element);
                }
            }
        });
    }
    
    animateUpdate(element) {
        element.classList.add('counting-update');
        setTimeout(() => {
            element.classList.remove('counting-update');
        }, 300);
    }
    
    applySpecialEffects(days) {
        const numbers = document.querySelectorAll('.time-number, .final-num');
        
        // Limpiar clases anteriores
        numbers.forEach(num => {
            num.classList.remove('pulse-red', 'pulse-gold', 'urgent');
        });
        
        if (days < 7) {
            // Menos de 1 semana - efecto urgente
            numbers.forEach(num => {
                num.classList.add('pulse-red', 'urgent');
            });
            
            // Cambiar texto del label
            const label = document.querySelector('.count-label');
            if (label) {
                label.textContent = '¡Pronto! Solo faltan:';
                label.classList.add('urgent-text');
            }
        } else if (days < 30) {
            // Menos de 1 mes - efecto de anticipación
            numbers.forEach(num => {
                num.classList.add('pulse-gold');
            });
            
            const label = document.querySelector('.count-label');
            if (label) {
                label.textContent = 'Faltan solo:';
                label.classList.remove('urgent-text');
            }
        }
    }
    
    handleCountdownEnd() {
        clearInterval(this.interval);
        
        // Actualizar todos los números a 00
        Object.keys(this.elements).forEach(type => {
            this.elements[type].forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = '00';
                    element.classList.add('celebrate');
                }
            });
        });
        
        // Cambiar textos
        const labels = document.querySelectorAll('.count-label, .final-count h3');
        labels.forEach(label => {
            label.textContent = '¡El gran día ha llegado!';
            label.classList.add('celebrate-text');
        });
        
        const dateDisplay = document.querySelector('.date-display');
        if (dateDisplay) {
            dateDisplay.textContent = '¡Hoy celebramos juntos!';
        }
        
        // Activar efectos de celebración
        this.triggerCelebration();
        
        console.log('🎉 ¡El gran día ha llegado!');
    }
    
    triggerCelebration() {
        // Efecto de confeti
        createConfettiBurst(300);
        
        // Efecto de brillo
        document.body.classList.add('celebration-day');
        
        // Sonido de celebración (opcional)
        this.playCelebrationSound();
    }
    
    playCelebrationSound() {
        // Crear un sonido simple de celebración
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // Do
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // Mi
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // Sol
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log('Sonido de celebración no disponible');
        }
    }
}

// ============================================
// 5. EFECTOS DE CONFETI Y CELEBRACIÓN
// ============================================

function createConfettiBurst(amount = 100) {
    const container = document.querySelector('.confetti-overlay') || document.body;
    const symbols = ['✨', '⭐', '★', '✧', '✦', '❋', '🎓', '🎉', '❤️'];
    
    for (let i = 0; i < amount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-burst';
        confetti.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Posición inicial
        const startX = Math.random() * 100;
        confetti.style.left = startX + 'vw';
        confetti.style.top = '-50px';
        
        // Estilos
        confetti.style.position = 'absolute';
        confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
        confetti.style.color = getRandomGoldColor();
        confetti.style.opacity = '0';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.userSelect = 'none';
        
        // Animación
        const duration = Math.random() * 2 + 1;
        const delay = Math.random() * 0.5;
        const endX = (Math.random() - 0.5) * 100;
        
        confetti.style.animation = `
            confettiFall ${duration}s ease-in ${delay}s forwards,
            confettiSpin ${duration}s linear ${delay}s infinite
        `;
        
        // Variables CSS para controlar la animación
        confetti.style.setProperty('--start-x', startX + 'vw');
        confetti.style.setProperty('--end-x', (startX + endX) + 'vw');
        
        container.appendChild(confetti);
        
        // Remover después de la animación
        setTimeout(() => {
            confetti.remove();
        }, (duration + delay) * 1000);
    }
}

function getRandomGoldColor() {
    const golds = [
        '#D4AF37', // Oro principal
        '#FFD700', // Oro brillante
        '#FFEC8B', // Oro claro
        '#F0E68C', // Oro khaki
        '#B8860B', // Oro oscuro
        '#FFA500'  // Naranja dorado
    ];
    return golds[Math.floor(Math.random() * golds.length)];
}

// ============================================
// 6. EFECTOS DE MOUSE Y HOVER
// ============================================

function initMouseEffects() {
    // Seguimiento del mouse para efectos
    document.addEventListener('mousemove', handleMouseMove);
    
    // Efectos hover en elementos importantes
    initHoverEffects();
    
    // Efectos de clic
    initClickEffects();
}

function handleMouseMove(e) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // Mover formas de fondo
    document.querySelectorAll('.shape').forEach(shape => {
        const speed = parseFloat(shape.dataset.speed) || 0.02;
        shape.style.transform = `translate(${x * 50 * speed}px, ${y * 50 * speed}px)`;
    });
    
    // Efecto de parallax en elementos
    document.querySelectorAll('.parallax').forEach(element => {
        const depth = parseFloat(element.dataset.depth) || 0.5;
        const moveX = (x - 0.5) * depth * 20;
        const moveY = (y - 0.5) * depth * 20;
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    // Efecto de brillo en el título
    const title = document.querySelector('.magic-text');
    if (title) {
        const glow = 10 + (x * 30);
        title.style.textShadow = `0 0 ${glow}px rgba(212, 175, 55, 0.8)`;
    }
    
    // Efecto de iluminación en la foto
    const photo = document.querySelector('.photo-glow');
    if (photo) {
        const lightX = x * 100;
        const lightY = y * 100;
        photo.style.background = `radial-gradient(circle at ${lightX}% ${lightY}%, 
            rgba(212, 175, 55, 0.2) 0%, 
            rgba(212, 175, 55, 0.05) 40%,
            transparent 70%)`;
    }
}

function initHoverEffects() {
    // Efecto en tarjetas
    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.3)';
            
            // Efecto de brillo interno
            const glow = document.createElement('div');
            glow.className = 'card-glow-effect';
            card.appendChild(glow);
            
            // Efecto de sonido (opcional)
            playHoverSound();
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'none';
            
            // Remover brillo
            const glow = card.querySelector('.card-glow-effect');
            if (glow) glow.remove();
        });
    });
    
    // Efecto en la foto principal
    const mainPhoto = document.querySelector('.crisp-photo');
    if (mainPhoto) {
        mainPhoto.addEventListener('mouseenter', () => {
            mainPhoto.style.transform = 'scale(1.05)';
            mainPhoto.style.boxShadow = '0 0 40px var(--gold)';
            
            // Activar sparkles
            document.querySelectorAll('.sparkle').forEach(sparkle => {
                sparkle.style.animation = 'sparkleTwinkle 0.5s 3';
            });
        });
        
        mainPhoto.addEventListener('mouseleave', () => {
            mainPhoto.style.transform = 'scale(1)';
            mainPhoto.style.boxShadow = 'none';
        });
    }
}

function playHoverSound() {
    // Solo reproducir en dispositivos de escritorio
    if (isMobile) return;
    
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 523.25; // Do
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Silenciar error si el audio no está disponible
    }
}

function initClickEffects() {
    // Efecto de ripple al hacer clic
    document.addEventListener('click', function(e) {
        // Solo en elementos interactivos
        if (e.target.closest('.event-card, .time-block, .final-block')) {
            createRippleEffect(e);
            
            // Vibrar en móviles
            if (isMobile && navigator.vibrate) {
                navigator.vibrate(30);
            }
        }
    });
    
    // Scroll suave en la flecha
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function(e) {
            e.preventDefault();
            
            const nextSection = document.querySelector('.unified-celebration');
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Efecto visual
                this.style.animation = 'arrowClick 0.5s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
            }
        });
    }
}

function createRippleEffect(e) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    
    // Posición
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    // Estilos
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(212, 175, 55, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    e.target.appendChild(ripple);
    
    // Remover después de la animación
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ============================================
// 7. ANIMACIONES DE TEXTO Y APARICIÓN
// ============================================

function initTextAnimations() {
    // Efecto de escritura en el subtítulo
    const subtitle = document.querySelector('.invite-subtitle');
    if (subtitle) {
        typeWriter(subtitle, 50);
    }
    
    // Animación de aparición en secciones
    initScrollAnimations();
    
    // Efecto de parpadeo en "NEXUS"
    initBlinkEffect();
    
    // Efecto de latido en "corazón"
    initHeartbeatEffect();
}

function typeWriter(element, speed = 50) {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--gold)';
    element.style.whiteSpace = 'nowrap';
    element.style.overflow = 'hidden';
    element.style.display = 'inline-block';
    
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.style.borderRight = 'none';
            // Efecto de terminación
            element.classList.add('typing-complete');
        }
    }
    
    // Comenzar después de un pequeño delay
    setTimeout(type, 1000);
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Efecto escalonado para elementos en lista
                if (entry.target.classList.contains('stagger')) {
                    const index = Array.from(
                        document.querySelectorAll('.stagger')
                    ).indexOf(entry.target);
                    
                    setTimeout(() => {
                        entry.target.classList.add('stagger-animate');
                    }, index * 200);
                }
                
                // Crear confetti al ver el mensaje del corazón
                if (entry.target.classList.contains('heart-message')) {
                    createConfettiBurst(50);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos
    const elementsToAnimate = document.querySelectorAll(
        '.event-card, .message-text, .final-count, .secondary-photo'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

function initBlinkEffect() {
    const nexusText = document.querySelector('.blink-gold');
    if (!nexusText) return;
    
    setInterval(() => {
        nexusText.classList.toggle('blinking');
        
        setTimeout(() => {
            nexusText.classList.toggle('blinking');
        }, 500);
    }, 3000);
}

function initHeartbeatEffect() {
    const heartText = document.querySelector('.heartbeat');
    if (!heartText) return;
    
    setInterval(() => {
        heartText.classList.add('beating');
        
        setTimeout(() => {
            heartText.classList.remove('beating');
        }, 300);
    }, 4000);
}

// ============================================
// 8. EFECTOS DE IMAGEN Y CARGA
// ============================================

function initImageEffects() {
    const mainPhoto = document.querySelector('.crisp-photo');
    if (!mainPhoto) return;
    
    // Precargar imagen
    const img = new Image();
    img.src = mainPhoto.src;
    
    img.onload = function() {
        console.log('🖼️ Imagen principal cargada');
        mainPhoto.classList.add('loaded');
        document.querySelector('.photo-glow').classList.add('active');
        
        // Efecto de aparición
        setTimeout(() => {
            mainPhoto.style.opacity = '1';
            mainPhoto.style.transform = 'scale(1)';
        }, 100);
    };
    
    img.onerror = function() {
        console.warn('⚠️ Error al cargar la imagen principal');
        // Usar imagen de fallback
        mainPhoto.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMjUiIGN5PSIxMjUiIHI9IjEyMCIgZmlsbD0iIzBBMEEwQSIvPjx0ZXh0IHg9IjEyNSIgeT0iMTQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IiNEREFGMzciIHRleHQtYW5jaG9yPSJtaWRkbGUiPkE8L3RleHQ+PC9zdmc+';
        mainPhoto.classList.add('loaded');
    };
    
    // Efecto de carga
    mainPhoto.style.opacity = '0';
    mainPhoto.style.transform = 'scale(0.9)';
    mainPhoto.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
}

// ============================================
// 9. EFECTOS DE SONIDO AMBIENTAL
// ============================================

class SoundManager {
    constructor() {
        this.sounds = {};
        this.muted = false;
        this.enabled = !isMobile; // Deshabilitar en móviles por defecto
        this.init();
    }
    
    init() {
        if (!this.enabled) return;
        
        // Crear sonidos simples
        this.createSound('hover', 523.25, 0.1); // Do
        this.createSound('click', 659.25, 0.1); // Mi
        this.createSound('success', 783.99, 0.2); // Sol
        
        console.log('🔊 Gestor de sonidos inicializado');
    }
    
    createSound(name, frequency, duration) {
        this.sounds[name] = { frequency, duration };
    }
    
    play(name, volume = 0.1) {
        if (!this.enabled || this.muted || !this.sounds[name]) return;
        
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = this.sounds[name].frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, 
                audioContext.currentTime + this.sounds[name].duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + this.sounds[name].duration);
        } catch (e) {
            // Silenciar error
        }
    }
    
    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }
}

// ============================================
// 10. INICIALIZACIÓN PRINCIPAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando efectos de la invitación...');
    
    // 1. Inicializar partículas
    initParticles();
    
    // 2. Crear brillantinas
    createGlitterEffect();
    
    // 3. Iniciar contador
    const countdown = new CountdownTimer();
    
    // 4. Efectos de mouse
    initMouseEffects();
    
    // 5. Animaciones de texto
    initTextAnimations();
    
    // 6. Efectos de imagen
    initImageEffects();
    
    // 7. Gestor de sonidos
    const soundManager = new SoundManager();
    
    // 8. Efectos adicionales
    createFloatingHearts();
    initConfettiRain();
    
    // 9. Detectar conexión
    initConnectionMonitor();
    
    // 10. Efecto de bienvenida
    setTimeout(() => {
        showWelcomeEffect();
    }, 1500);
    
    console.log('✅ Todos los efectos inicializados correctamente');
});

// ============================================
// 11. EFECTOS ADICIONALES
// ============================================

function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts') || document.body;
    
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart-extra';
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

function initConfettiRain() {
    // Confeti continuo (menos en móviles)
    if (isMobile) return;
    
    setInterval(() => {
        createConfettiBurst(10);
    }, 5000);
}

function showWelcomeEffect() {
    // Efecto de bienvenida
    const welcomeText = document.querySelector('.invite-subtitle');
    if (welcomeText) {
        welcomeText.classList.add('welcome-highlight');
    }
    
    // Pequeño confeti inicial
    createConfettiBurst(30);
    
    // Efecto de brillo en el nombre
    const name = document.querySelector('.magic-text');
    if (name) {
        name.classList.add('welcome-glow');
        setTimeout(() => name.classList.remove('welcome-glow'), 2000);
    }
}

function initConnectionMonitor() {
    // Mostrar notificación cuando se pierde conexión
    window.addEventListener('offline', () => {
        showNotification('⚠️ Sin conexión - El contador funciona localmente');
    });
    
    window.addEventListener('online', () => {
        showNotification('✅ Conexión restablecida', 'success');
    });
}

function showNotification(message, type = 'info') {
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Estilos
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = type === 'success' ? 'rgba(46, 125, 50, 0.9)' : 'rgba(244, 67, 54, 0.9)';
    notification.style.color = 'white';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '10px';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '10px';
    notification.style.zIndex = '10000';
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100px)';
    notification.style.transition = 'opacity 0.3s, transform 0.3s';
    notification.style.backdropFilter = 'blur(10px)';
    
    document.body.appendChild(notification);
    
    // Mostrar
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// 12. ANIMACIONES CSS DINÁMICAS
// ============================================

// Agregar estilos CSS dinámicamente
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes glitterFloat {
        0%, 100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.3; }
        50% { transform: translateY(-20px) rotate(180deg) scale(1.3); opacity: 1; }
    }
    
    @keyframes confettiFall {
        0% { transform: translateY(-50px) translateX(var(--start-x)) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        100% { transform: translateY(100vh) translateX(var(--end-x)) rotate(720deg); opacity: 0; }
    }
    
    @keyframes confettiSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes floatHeart {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-50px) rotate(10deg); }
    }
    
    @keyframes fallbackFloat {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
        50% { transform: translateY(-30px) translateX(20px); opacity: 1; }
    }
    
    @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
    }
    
    @keyframes arrowClick {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(10px); }
    }
    
    .counting-update {
        animation: numberUpdate 0.3s ease;
    }
    
    @keyframes numberUpdate {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .pulse-red {
        animation: redPulse 1s infinite;
    }
    
    @keyframes redPulse {
        0%, 100% { color: #D4AF37; text-shadow: 0 0 10px #D4AF37; }
        50% { color: #ff4444; text-shadow: 0 0 20px #ff4444; }
    }
    
    .pulse-gold {
        animation: goldPulse 2s infinite;
    }
    
    @keyframes goldPulse {
        0%, 100% { text-shadow: 0 0 10px rgba(212, 175, 55, 0.5); }
        50% { text-shadow: 0 0 20px rgba(212, 175, 55, 0.8); }
    }
    
    .celebrate {
        animation: celebrate 0.5s ease-in-out 3;
    }
    
    @keyframes celebrate {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2) rotate(5deg); }
    }
    
    .blinking {
        animation: blink 0.5s ease;
    }
    
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
    }
    
    .beating {
        animation: heartbeat 0.3s ease;
    }
    
    @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .stagger-animate {
        animation-delay: calc(var(--stagger-index, 0) * 0.2s);
    }
    
    .typing-complete {
        position: relative;
    }
    
    .typing-complete::after {
        content: '';
        position: absolute;
        right: -10px;
        top: 0;
        height: 100%;
        width: 3px;
        background: var(--gold);
        animation: cursorBlink 1s infinite;
    }
    
    @keyframes cursorBlink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
    
    .welcome-highlight {
        animation: highlight 2s ease;
    }
    
    @keyframes highlight {
        0%, 100% { color: var(--white-light); }
        50% { color: var(--gold-light); }
    }
    
    .welcome-glow {
        animation: welcomeGlow 2s ease;
    }
    
    @keyframes welcomeGlow {
        0%, 100% { text-shadow: 0 0 20px rgba(212, 175, 55, 0.5); }
        50% { text-shadow: 0 0 40px rgba(212, 175, 55, 0.8), 0 0 60px rgba(255, 215, 0, 0.4); }
    }
    
    .urgent-text {
        animation: urgentText 1s infinite alternate;
    }
    
    @keyframes urgentText {
        from { color: var(--white-light); }
        to { color: #ff4444; }
    }
    
    .celebrate-text {
        animation: celebrateText 0.5s ease-in-out 3;
        color: var(--gold-light) !important;
    }
    
    @keyframes celebrateText {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    .celebration-day {
        animation: celebrationGlow 2s infinite alternate;
    }
    
    @keyframes celebrationGlow {
        from { background-color: var(--black); }
        to { background-color: rgba(20, 10, 0, 0.5); }
    }
    
    /* Estilos para móviles */
    .mobile-device .event-card:hover {
        transform: none !important;
    }
    
    .mobile-device .parallax {
        transform: none !important;
    }
`;

document.head.appendChild(dynamicStyles);

// ============================================
// 13. UTILIDADES Y HELPERS
// ============================================

// Formatear números con ceros a la izquierda
function padNumber(num, length = 2) {
    return String(num).padStart(length, '0');
}

// Generar un color dorado aleatorio
function randomGoldColor() {
    const hues = [40, 45, 50, 55]; // Tonalidades doradas
    const hue = hues[Math.floor(Math.random() * hues.length)];
    return `hsl(${hue}, 80%, 50%)`;
}

// Verificar si un elemento está en el viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Throttle para eventos de scroll/resize
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce para eventos de resize
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// ============================================
// 14. MANEJO DE ERRORES
// ============================================

// Capturar errores globales
window.addEventListener('error', function(e) {
    console.error('❌ Error en la aplicación:', e.error);
    
    // Mostrar mensaje amigable al usuario
    if (e.error.message.includes('particlesJS')) {
        console.log('⚠️ ParticlesJS falló - Usando efectos alternativos');
    }
});

// Capturar promesas no manejadas
window.addEventListener('unhandledrejection', function(e) {
    console.error('❌ Promesa no manejada:', e.reason);
});

// ============================================
// 15. EXPORTAR FUNCIONES PARA CONSOLA
// ============================================

// Hacer funciones disponibles para debugging
window.invitationEffects = {
    createConfettiBurst,
    getRandomGoldColor,
    showNotification,
    toggleSounds: () => {
        const soundManager = window.soundManager || new SoundManager();
        const muted = soundManager.toggleMute();
        showNotification(muted ? '🔇 Sonidos desactivados' : '🔊 Sonidos activados');
        return muted;
    },
    refreshCountdown: () => {
        if (window.countdownTimer) {
            window.countdownTimer.update();
        }
    },
    testEffects: () => {
        createConfettiBurst(100);
        showNotification('✨ Probando efectos', 'success');
    }
};

// Guardar referencia global del contador
window.countdownTimer = null;

console.log('🎓 Script de efectos cargado correctamente');
console.log('💡 Tip: Usa invitationEffects.testEffects() en la consola para probar');