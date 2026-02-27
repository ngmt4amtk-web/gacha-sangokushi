// ======== PARTICLES ========
window.Game = window.Game || {};

Game.particles = [];
Game.particleCanvas = null;
Game.pCtx = null;

Game.initParticles = function() {
  Game.particleCanvas = document.getElementById('particles');
  if (!Game.particleCanvas) return;
  Game.pCtx = Game.particleCanvas.getContext('2d');
  Game.resizeParticleCanvas();
  window.addEventListener('resize', Game.resizeParticleCanvas);
  requestAnimationFrame(Game.particleLoop);
};

Game.resizeParticleCanvas = function() {
  if (!Game.particleCanvas) return;
  Game.particleCanvas.width = window.innerWidth;
  Game.particleCanvas.height = window.innerHeight;
};

Game.spawnParticles = function(x, y, color, count) {
  for (var i = 0; i < count; i++) {
    Game.particles.push({
      x: x, y: y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8 - 2,
      life: 1,
      decay: 0.01 + Math.random() * 0.02,
      size: 2 + Math.random() * 4,
      color: color
    });
  }
};

Game.updateParticles = function() {
  if (!Game.pCtx) return;
  Game.pCtx.clearRect(0, 0, Game.particleCanvas.width, Game.particleCanvas.height);
  Game.particles = Game.particles.filter(function(p) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.1;
    p.life -= p.decay;
    if (p.life <= 0) return false;
    Game.pCtx.globalAlpha = p.life;
    Game.pCtx.fillStyle = p.color;
    Game.pCtx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    return true;
  });
  Game.pCtx.globalAlpha = 1;
};

Game.particleLoop = function() {
  Game.updateParticles();
  requestAnimationFrame(Game.particleLoop);
};

Game.drawCrackEffect = function() {
  if (!Game.pCtx || !Game.particleCanvas) return;
  var cx = Game.particleCanvas.width / 2, cy = Game.particleCanvas.height / 2;
  Game.pCtx.save();
  Game.pCtx.strokeStyle = 'rgba(255,255,255,0.9)';
  Game.pCtx.lineWidth = 2;
  for (var i = 0; i < 10; i++) {
    var ang = (i / 10) * Math.PI * 2 + Math.random() * 0.5;
    var len = 80 + Math.random() * 120;
    Game.pCtx.beginPath(); Game.pCtx.moveTo(cx, cy);
    var x = cx, y = cy;
    for (var j = 0; j < 6; j++) {
      x += Math.cos(ang) * len / 6 + (Math.random() - 0.5) * 25;
      y += Math.sin(ang) * len / 6 + (Math.random() - 0.5) * 25;
      Game.pCtx.lineTo(x, y);
    }
    Game.pCtx.stroke();
  }
  Game.pCtx.restore();
  setTimeout(function() {
    if (Game.pCtx) Game.pCtx.clearRect(0, 0, Game.particleCanvas.width, Game.particleCanvas.height);
  }, 600);
};
