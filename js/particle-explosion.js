// Particle Explosion System
class ParticleExplosion {
    constructor() {
        this.colors = [
            'particle-primary',
            'particle-secondary',
            'particle-accent'
        ];
        this.init();
    }

    init() {
        // Add particle effects to buttons and cards
        document.querySelectorAll('.btn, .card, .project-card').forEach(element => {
            element.classList.add('particle-trigger');

            element.addEventListener('mouseenter', (e) => {
                this.createExplosion(e.clientX, e.clientY, 15);
            });
        });
    }

    createExplosion(x, y, particleCount = 20) {
        for (let i = 0; i < particleCount; i++) {
            this.createParticle(x, y);
        }
    }

    createParticle(x, y) {
        const particle = document.createElement('div');
        const colorClass = this.colors[Math.floor(Math.random() * this.colors.length)];
        particle.className = `particle ${colorClass}`;

        // Random angle and velocity
        const angle = (Math.PI * 2 * Math.random());
        const velocity = 2 + Math.random() * 3;
        const distance = 30 + Math.random() * 40;

        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');

        document.body.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Initialize particle system
document.addEventListener('DOMContentLoaded', () => {
    new ParticleExplosion();
});
