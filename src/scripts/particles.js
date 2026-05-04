class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    // A11y & Performance fallback
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Fallback if reduced motion is requested
    if (prefersReducedMotion) {
      console.log('ParticleSystem: prefers-reduced-motion enabled. Using static fallback.');
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = isMobile ? 40 : 80; // Reduce for mobile
    this.animationFrameId = null;
    this.lastTime = 0;
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    this.initParticles();
    this.animate();
  }

  resize() {
    this.width = this.canvas.parentElement.clientWidth;
    this.height = this.canvas.parentElement.clientHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5 - 0.2, // slight upward drift
      alpha: Math.random() * 0.5 + 0.1
    };
  }

  update() {
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.width || p.y < 0 || p.y > this.height) {
        this.particles[i] = this.createParticle();
        this.particles[i].y = this.height + 10; // Reset to bottom
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      // GenYou Lab brand color (Green/Olive tone)
      this.ctx.fillStyle = `rgba(164, 180, 148, ${p.alpha})`; 
      this.ctx.fill();
    }
  }

  animate(currentTime = 0) {
    // Simple FPS throttle check can be added here if needed
    // const deltaTime = currentTime - this.lastTime;
    
    this.update();
    this.draw();
    
    this.lastTime = currentTime;
    this.animationFrameId = requestAnimationFrame((t) => this.animate(t));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem('hero-canvas');
});
