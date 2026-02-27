// ======== GACHA ANIMATION ========
window.Game = window.Game || {};

// 5-tier bamboo scroll reveal animation
// N=fast, R=brief pause, SR=golden flash, SSR=crack+shatter, UR=rainbow+explosion

Game.showGachaAnimation = function(results, isWeapon) {
  if (Game.isGachaAnimating) return;
  Game.isGachaAnimating = true;

  if (results.length === 1) {
    Game.showSinglePullAnim(results[0], isWeapon);
  } else {
    Game.showMultiPullAnim(results, isWeapon);
  }
};

Game.showSinglePullAnim = function(result, isWeapon) {
  var overlay = document.getElementById('gacha-overlay');
  var charId = result.charId;
  var c = isWeapon ? Game.getWeapon(charId) : Game.getChar(charId);
  if (!c) { Game.isGachaAnimating = false; return; }
  var rarity = c.rarity;
  var rc = Game.rarityClass(rarity);

  overlay.innerHTML =
    '<div class="gacha-anim-container">' +
      '<div class="scroll-wrapper">' +
        '<div class="scroll-bg"></div>' +
        '<div class="scroll-seal" id="gacha-seal"></div>' +
        '<div class="scroll-glow" id="gacha-glow"></div>' +
      '</div>' +
      '<div class="gacha-reveal" id="gacha-reveal" style="display:none"></div>' +
      '<div class="gacha-skip" onclick="Game.skipGachaAnim()">SKIP</div>' +
    '</div>';
  overlay.classList.add('show');

  var seal = document.getElementById('gacha-seal');
  var glow = document.getElementById('gacha-glow');
  var reveal = document.getElementById('gacha-reveal');

  Game.gachaSkipped = false;

  async function animate() {
    // Phase 1: Scroll appears
    await Game.gachaWait(400);
    if (Game.gachaSkipped) return Game.finishSingleReveal(result, isWeapon, overlay);

    // Phase 2: Seal begins to crack based on rarity
    seal.classList.add('cracking');
    Game.playSound('pull');
    await Game.gachaWait(600);
    if (Game.gachaSkipped) return Game.finishSingleReveal(result, isWeapon, overlay);

    if (rarity >= 3) {
      // SR+: golden glow
      glow.classList.add('golden');
      Game.playSound('reach');
      await Game.gachaWait(500);
      if (Game.gachaSkipped) return Game.finishSingleReveal(result, isWeapon, overlay);
    }

    if (rarity >= 4) {
      // SSR+: crack effect + screen shake
      glow.classList.add('intense');
      seal.classList.add('shattering');
      overlay.querySelector('.gacha-anim-container').classList.add('shake');
      Game.playSound('kakutei');
      var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      Game.spawnParticles(cx, cy, '#ffd700', 30);
      await Game.gachaWait(600);
      if (Game.gachaSkipped) return Game.finishSingleReveal(result, isWeapon, overlay);
    }

    if (rarity >= 5) {
      // UR: rainbow explosion
      glow.classList.add('rainbow');
      Game.playSound('jackpot');
      var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      Game.spawnParticles(cx, cy, '#ff4081', 50);
      Game.spawnParticles(cx, cy, '#ffd700', 40);
      Game.spawnParticles(cx, cy, '#e040fb', 30);
      await Game.gachaWait(800);
      if (Game.gachaSkipped) return Game.finishSingleReveal(result, isWeapon, overlay);
    }

    // Phase 3: Reveal
    Game.finishSingleReveal(result, isWeapon, overlay);
  }

  animate();
};

Game.finishSingleReveal = function(result, isWeapon, overlay) {
  var charId = result.charId;
  var c = isWeapon ? Game.getWeapon(charId) : Game.getChar(charId);
  if (!c) { Game.endGachaAnim(overlay); return; }
  var rarity = c.rarity;
  var rc = Game.rarityClass(rarity);
  var soundMap = { 1: 'reveal_n', 2: 'reveal_r', 3: 'reveal_sr', 4: 'reveal_ssr', 5: 'reveal_ur' };
  Game.playSound(soundMap[rarity] || 'reveal_n');

  var avatarSrc = isWeapon ? Game.genWeaponIcon(charId, 300) : Game.genAvatar(charId, 360);
  var name = c.name;
  var stars = Game.RARITY_STARS[rarity];

  overlay.innerHTML =
    '<div class="gacha-anim-container">' +
      '<div class="gacha-reveal-card ' + rc + '">' +
        '<div class="reveal-flash ' + rc + '"></div>' +
        '<img class="reveal-avatar" src="' + avatarSrc + '">' +
        '<div class="reveal-stars">' + stars + '</div>' +
        '<div class="reveal-name">' + name + '</div>' +
        '<div class="reveal-rarity">' + Game.RARITY_NAMES[rarity] + '</div>' +
        (result.isNew ? '<div class="reveal-new">NEW!</div>' : '<div class="reveal-dupe">凸+1</div>') +
      '</div>' +
      '<button class="gacha-done-btn" onclick="Game.endGachaAnim()">OK</button>' +
    '</div>';

  if (rarity >= 4) {
    var cx = window.innerWidth / 2, cy = window.innerHeight / 3;
    Game.spawnParticles(cx, cy, rarity >= 5 ? '#ff4081' : '#ffd700', 25);
  }
};

Game.showMultiPullAnim = function(results, isWeapon) {
  var overlay = document.getElementById('gacha-overlay');

  // Determine max rarity for pre-animation
  var maxRarity = 1;
  results.forEach(function(r) {
    var c = isWeapon ? Game.getWeapon(r.charId) : Game.getChar(r.charId);
    if (c && c.rarity > maxRarity) maxRarity = c.rarity;
  });

  // Sort for reveal: low rarity first, high rarity last (dramatic)
  var sorted = results.slice().sort(function(a, b) {
    var ra = (isWeapon ? Game.getWeapon(a.charId) : Game.getChar(a.charId)) || { rarity: 1 };
    var rb = (isWeapon ? Game.getWeapon(b.charId) : Game.getChar(b.charId)) || { rarity: 1 };
    return ra.rarity - rb.rarity;
  });

  // Build card-back grid
  var cardsHTML = '';
  for (var i = 0; i < sorted.length; i++) {
    cardsHTML += '<div class="multi-card-slot" id="multi-card-' + i + '">' +
      '<div class="multi-card-back"></div>' +
      '</div>';
  }

  overlay.innerHTML =
    '<div class="gacha-anim-container">' +
      '<div class="multi-scroll-intro" id="multi-intro">' +
        '<div class="scroll-wrapper small">' +
          '<div class="scroll-bg"></div>' +
          '<div class="scroll-seal" id="multi-seal"></div>' +
          '<div class="scroll-glow" id="multi-glow"></div>' +
        '</div>' +
      '</div>' +
      '<div class="multi-grid" id="multi-grid" style="display:none">' + cardsHTML + '</div>' +
      '<div class="gacha-skip" onclick="Game.skipGachaAnim()">SKIP</div>' +
      '<button class="gacha-done-btn" id="multi-done" style="display:none" onclick="Game.endGachaAnim()">OK</button>' +
    '</div>';
  overlay.classList.add('show');

  Game.gachaSkipped = false;

  async function animate() {
    var seal = document.getElementById('multi-seal');
    var glow = document.getElementById('multi-glow');
    var intro = document.getElementById('multi-intro');
    var grid = document.getElementById('multi-grid');

    // Phase 1: Scroll intro
    await Game.gachaWait(300);
    if (Game.gachaSkipped) return Game.finishMultiReveal(sorted, isWeapon, overlay);

    seal.classList.add('cracking');
    Game.playSound('pull');
    await Game.gachaWait(400);
    if (Game.gachaSkipped) return Game.finishMultiReveal(sorted, isWeapon, overlay);

    if (maxRarity >= 3) {
      glow.classList.add('golden');
      Game.playSound('reach');
      await Game.gachaWait(400);
      if (Game.gachaSkipped) return Game.finishMultiReveal(sorted, isWeapon, overlay);
    }
    if (maxRarity >= 4) {
      glow.classList.add('intense');
      Game.playSound('kakutei');
      await Game.gachaWait(400);
      if (Game.gachaSkipped) return Game.finishMultiReveal(sorted, isWeapon, overlay);
    }
    if (maxRarity >= 5) {
      glow.classList.add('rainbow');
      Game.playSound('jackpot');
      Game.spawnParticles(window.innerWidth / 2, window.innerHeight / 2, '#ff4081', 40);
      await Game.gachaWait(500);
      if (Game.gachaSkipped) return Game.finishMultiReveal(sorted, isWeapon, overlay);
    }

    // Phase 2: Switch to card grid
    intro.style.display = 'none';
    grid.style.display = 'flex';

    // Phase 3: Flip cards one by one
    for (var i = 0; i < sorted.length; i++) {
      if (Game.gachaSkipped) return Game.finishMultiReveal(sorted, isWeapon, overlay);
      var slot = document.getElementById('multi-card-' + i);
      if (!slot) continue;
      var r = sorted[i];
      var c = isWeapon ? Game.getWeapon(r.charId) : Game.getChar(r.charId);
      if (!c) continue;
      var rc = Game.rarityClass(c.rarity);
      var avatarSrc = isWeapon ? Game.genWeaponIcon(r.charId, 160) : Game.genAvatar(r.charId, 160);
      var soundMap = { 1: 'reveal_n', 2: 'reveal_r', 3: 'reveal_sr', 4: 'reveal_ssr', 5: 'reveal_ur' };
      Game.playSound(soundMap[c.rarity] || 'reveal_n');

      slot.innerHTML =
        '<div class="multi-card-face ' + rc + '" style="background-image:url(' + avatarSrc + ')">' +
          '<div class="multi-card-info">' +
            '<div class="multi-card-stars">' + Game.RARITY_STARS[c.rarity] + '</div>' +
            '<div class="multi-card-name">' + c.name + '</div>' +
            (r.isNew ? '<div class="multi-card-new">NEW</div>' : '') +
          '</div>' +
        '</div>';
      slot.classList.add('revealed');

      if (c.rarity >= 4) {
        var rect = slot.getBoundingClientRect();
        Game.spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, c.rarity >= 5 ? '#ff4081' : '#ffd700', 12);
      }

      await Game.gachaWait(c.rarity >= 4 ? 500 : 200);
    }

    // Show done button
    document.getElementById('multi-done').style.display = 'block';
  }

  animate();
};

Game.finishMultiReveal = function(sorted, isWeapon, overlay) {
  // Instant reveal all cards
  var cardsHTML = '';
  sorted.forEach(function(r) {
    var c = isWeapon ? Game.getWeapon(r.charId) : Game.getChar(r.charId);
    if (!c) return;
    var rc = Game.rarityClass(c.rarity);
    var avatarSrc = isWeapon ? Game.genWeaponIcon(r.charId, 160) : Game.genAvatar(r.charId, 160);
    cardsHTML += '<div class="multi-card-slot revealed">' +
      '<div class="multi-card-face ' + rc + '" style="background-image:url(' + avatarSrc + ')">' +
        '<div class="multi-card-info">' +
          '<div class="multi-card-stars">' + Game.RARITY_STARS[c.rarity] + '</div>' +
          '<div class="multi-card-name">' + c.name + '</div>' +
          (r.isNew ? '<div class="multi-card-new">NEW</div>' : '') +
        '</div>' +
      '</div></div>';
  });

  overlay.innerHTML =
    '<div class="gacha-anim-container">' +
      '<div class="multi-grid" style="display:flex">' + cardsHTML + '</div>' +
      '<button class="gacha-done-btn" onclick="Game.endGachaAnim()">OK</button>' +
    '</div>';
};

Game.endGachaAnim = function() {
  // Check for pending signature item reveals
  if (Game.pendingSignatureReveals && Game.pendingSignatureReveals.length > 0) {
    var sigId = Game.pendingSignatureReveals.shift();
    Game.showSignatureReveal(sigId);
    return;
  }
  var overlay = document.getElementById('gacha-overlay');
  overlay.classList.remove('show');
  overlay.innerHTML = '';
  Game.isGachaAnimating = false;
  Game.gachaSkipped = false;

  // Quiz gacha: auto-return to quiz chapter select
  if (Game.quizGachaChapterId) {
    Game.quizGachaChapterId = null;
    Game.quizSession = null;
    Game.switchScreen('quiz');
    return;
  }

  Game.renderAll();
};

Game.showSignatureReveal = function(charId) {
  var overlay = document.getElementById('gacha-overlay');
  var c = Game.getChar(charId);
  var sig = Game.SIGNATURE_ITEMS ? Game.SIGNATURE_ITEMS[charId] : null;
  if (!c || !sig) { Game.endGachaAnim(); return; }

  Game.playSound('jackpot');
  var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  Game.spawnParticles(cx, cy, '#ffd700', 60);
  Game.spawnParticles(cx, cy, '#ff6f00', 40);

  var avatarSrc = Game.genAvatar(charId, 360);
  var rarityMult = Game.getSignatureMultiplier(c.rarity);
  var boostDesc = '';
  switch(c.type) {
    case 0: boostDesc = 'スキル倍率2倍 / 会心率+30%'; break;
    case 1: boostDesc = 'スキル毎ターン確定発動'; break;
    case 2: boostDesc = '2回攻撃 / SPD×1.5'; break;
    case 3: boostDesc = 'DEF×1.5 / 自動反撃50%'; break;
  }

  overlay.innerHTML =
    '<div class="gacha-anim-container">' +
      '<div style="text-align:center;padding:20px">' +
        '<div style="font-size:24px;color:#ffd700;font-weight:bold;text-shadow:0 0 20px #ff6f00;margin-bottom:16px;animation:pulse 0.8s infinite">★ 専用装備 獲得 ★</div>' +
        '<img class="reveal-avatar" src="' + avatarSrc + '" style="width:120px;height:120px;border-radius:50%;border:3px solid #ffd700;box-shadow:0 0 30px rgba(255,215,0,0.6)">' +
        '<div style="font-size:20px;color:#fff;margin-top:12px">' + c.name + '</div>' +
        '<div style="font-size:22px;color:#ffd700;font-weight:bold;margin:8px 0">' + sig.name + '</div>' +
        '<div style="font-size:13px;color:var(--text2);max-width:280px;margin:0 auto;line-height:1.5">' + sig.lore + '</div>' +
        '<div style="margin-top:12px;padding:8px 12px;background:rgba(255,215,0,0.1);border:1px solid rgba(255,215,0,0.3);border-radius:8px;display:inline-block">' +
          '<div style="font-size:12px;color:#ffd700">全ステータス ×' + rarityMult.toFixed(1) + '</div>' +
          '<div style="font-size:12px;color:#ff6f00;margin-top:2px">' + boostDesc + '</div>' +
        '</div>' +
      '</div>' +
      '<button class="gacha-done-btn" style="margin-top:16px" onclick="Game.endGachaAnim()">OK</button>' +
    '</div>';
};

Game.skipGachaAnim = function() {
  Game.gachaSkipped = true;
};

Game.gachaWait = function(ms) {
  return new Promise(function(resolve) { setTimeout(resolve, ms); });
};
