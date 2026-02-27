// ======== BATTLE ANIMATION HELPERS ========
window.Game = window.Game || {};

// Flash effect on unit
Game.flashUnit = function(unitEl, color) {
  if (!unitEl) return;
  unitEl.style.boxShadow = '0 0 20px ' + color;
  setTimeout(function() { unitEl.style.boxShadow = ''; }, 300);
};

// Shake a single element
Game.shakeElement = function(el) {
  if (!el) return;
  el.classList.add('shake-unit');
  setTimeout(function() { el.classList.remove('shake-unit'); }, 300);
};

// Screen shake for battle
Game.battleScreenShake = function() {
  var overlay = document.getElementById('battle-overlay');
  if (!overlay) return;
  overlay.classList.add('screen-shake');
  setTimeout(function() { overlay.classList.remove('screen-shake'); }, 200);
};

// Skill name flash
Game.showSkillFlash = function(name, color) {
  var overlay = document.getElementById('battle-overlay');
  if (!overlay) return;
  var el = document.createElement('div');
  el.className = 'skill-flash';
  el.textContent = name;
  el.style.color = color || '#ffd700';
  overlay.appendChild(el);
  setTimeout(function() { el.remove(); }, 1200);
};

// Victory/defeat screen effects
Game.playVictoryEffect = function() {
  var cx = window.innerWidth / 2;
  var cy = window.innerHeight / 2;
  Game.spawnParticles(cx, cy, '#ffd700', 50);
  Game.spawnParticles(cx, cy, '#4caf50', 30);
  setTimeout(function() {
    Game.spawnParticles(cx - 50, cy - 30, '#ffd700', 20);
    Game.spawnParticles(cx + 50, cy - 30, '#ff9800', 20);
  }, 300);
};

Game.playDefeatEffect = function() {
  var cx = window.innerWidth / 2;
  var cy = window.innerHeight / 2;
  Game.spawnParticles(cx, cy, '#f44336', 20);
  Game.spawnParticles(cx, cy, '#9e9e9e', 15);
};
