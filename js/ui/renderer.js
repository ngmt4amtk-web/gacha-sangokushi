// ======== SCREEN RENDERER ========
window.Game = window.Game || {};

Game.currentScreen = 'home';
Game.isGachaAnimating = false;
Game.isBattling = false;

Game.switchScreen = function(name) {
  if (Game.isGachaAnimating || Game.isBattling) return;
  Game.currentScreen = name;
  var screens = document.querySelectorAll('.screen');
  for (var i = 0; i < screens.length; i++) {
    screens[i].classList.toggle('active', screens[i].id === 'screen-' + name);
  }
  var btns = document.querySelectorAll('.nav-btn');
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.toggle('active', btns[i].dataset.screen === name);
  }
  Game.renderScreen(name);
};

Game.renderAll = function() {
  Game.updateTopbar();
  Game.renderScreen(Game.currentScreen);
};

Game.updateTopbar = function() {
  var g = Game.state;
  document.getElementById('medal-display').textContent = Game.formatNum(g.medals);
  document.getElementById('medal-rate-display').textContent = '+' + Game.getMedalRate() + '/s';
  document.getElementById('ticket-display').textContent = g.heroTickets;
  var ch = Game.getCurrentChapter();
  var chapterText = ch ? '第' + ch.id + '章' : '';
  var ngText = g.ngPlusLevel > 0 ? ' 覇道' + g.ngPlusLevel + '周目' : '';
  document.getElementById('chapter-display').textContent = chapterText + ngText;
  document.getElementById('stage-display').textContent = g.currentStageId;
};

Game.renderScreen = function(name) {
  switch(name) {
    case 'home': if (Game.renderHome) Game.renderHome(); break;
    case 'gacha': if (Game.renderGacha) Game.renderGacha(); break;
    case 'team': if (Game.renderTeam) Game.renderTeam(); break;
    case 'battle': if (Game.renderBattle) Game.renderBattle(); break;
    case 'story': if (Game.renderStory) Game.renderStory(); break;
    case 'encyclopedia': if (Game.renderEncyclopedia) Game.renderEncyclopedia(); break;
    case 'quiz': if (Game.renderQuiz) Game.renderQuiz(); break;
  }
};

// Detail modal
Game.showDetail = function(charId) {
  var c = Game.getCharStats(charId);
  if (!c) return;
  var rc = Game.rarityClass(c.rarity);
  var owned = Game.state.owned[charId];
  var maxStat = 1000;
  var bonds = Game.BONDS ? Game.BONDS.filter(function(b) { return b.heroes.indexOf(charId) >= 0; }) : [];

  var html = '<button class="modal-close" onclick="Game.closeDetail()">&times;</button>';
  html += '<img class="detail-avatar" src="' + Game.genAvatar(charId, 360) + '">';
  html += '<div class="detail-stars">' + Game.RARITY_STARS[c.rarity] + '</div>';
  html += '<div class="detail-name">' + c.name + '</div>';
  html += '<div class="detail-title">' + c.title + ' | ' + Game.FACTION_NAMES[c.faction] + ' | ' + Game.TYPE_NAMES[c.type] + '</div>';
  if (owned) html += '<div style="text-align:center;font-size:14px;margin:6px 0">' + c.totsu + '凸 (' + c.count + '体)</div>';

  html += '<div class="detail-stats">';
  html += Game.statBar('ATK', c.atk, maxStat, 'atk');
  html += Game.statBar('HP', c.hp, maxStat * 10, 'hp');
  html += Game.statBar('DEF', c.def, maxStat, 'def');
  html += '</div>';

  html += '<div class="detail-skill"><div class="skill-name">' + c.skillName + '</div><div class="skill-desc">' + c.skillDesc + '</div></div>';

  if (c.voiceLine) {
    html += '<div style="font-style:italic;color:var(--gold);text-align:center;margin:10px 0;font-size:14px">「' + c.voiceLine + '」</div>';
  }

  // Lore
  if (c.lore) {
    html += '<div class="detail-lore">';
    html += '<div class="lore-tab-bar">';
    html += '<button class="lore-tab active" onclick="Game.showLore(\'history\',' + charId + ')">正史</button>';
    html += '<button class="lore-tab" onclick="Game.showLore(\'novel\',' + charId + ')">演義</button>';
    html += '<button class="lore-tab" onclick="Game.showLore(\'diff\',' + charId + ')">違い</button>';
    html += '</div>';
    html += '<div class="lore-text" id="lore-text">' + (c.lore.history || '') + '</div>';
    html += '</div>';
  }

  // Signature item
  if (Game.SIGNATURE_ITEMS && Game.SIGNATURE_ITEMS[charId]) {
    var sig = Game.SIGNATURE_ITEMS[charId];
    var hasSig = !!(Game.state.ownedSignatures && Game.state.ownedSignatures[charId]);
    html += '<div class="section-title">専用装備</div>';
    if (hasSig) {
      var rarityMult = Game.getSignatureMultiplier(c.rarity);
      var ch = Game.getChar(charId);
      var boostText = '';
      if (ch) {
        switch(ch.type) {
          case 0: boostText = 'スキル倍率×2.0 / 会心率+30%'; break;
          case 1: boostText = 'スキル毎ターン確定発動'; break;
          case 2: boostText = '2回攻撃 / SPD×1.5'; break;
          case 3: boostText = 'DEF×1.5 / 自動反撃50%'; break;
        }
      }
      html += '<div style="background:rgba(255,215,0,0.1);border:1px solid rgba(255,215,0,0.3);border-radius:8px;padding:10px;margin:8px 0">' +
        '<div style="font-size:16px;color:#ffd700;font-weight:bold">' + sig.name + '</div>' +
        '<div style="font-size:12px;color:var(--text2);margin-top:4px;line-height:1.5">' + sig.lore + '</div>' +
        '<div style="font-size:13px;color:#ff6f00;margin-top:6px">全ステータス ×' + rarityMult.toFixed(1) + '</div>' +
        '<div style="font-size:13px;color:#ffd700;margin-top:2px">' + boostText + '</div>' +
        '</div>';
    } else {
      html += '<div style="background:rgba(100,100,100,0.2);border:1px solid rgba(100,100,100,0.3);border-radius:8px;padding:10px;margin:8px 0;text-align:center">' +
        '<div style="font-size:14px;color:var(--text2)">??? 未入手</div>' +
        '<div style="font-size:11px;color:var(--text2);margin-top:4px">武器鍛造ガチャから超低確率で出現</div>' +
        '</div>';
    }
  }

  // Bonds
  if (bonds.length > 0) {
    html += '<div class="section-title">関連する絆</div>';
    bonds.forEach(function(b) {
      var discovered = Game.state.discoveredBonds[b.id];
      if (discovered) {
        html += '<div class="bond-badge">' + b.name + '</div>';
      } else {
        html += '<div class="bond-badge undiscovered">??? ' + (b.hint || '') + '</div>';
      }
    });
  }

  document.getElementById('detail-content').innerHTML = html;
  document.getElementById('detail-modal').classList.add('show');
};

Game.closeDetail = function() {
  document.getElementById('detail-modal').classList.remove('show');
};

Game.showLore = function(type, charId) {
  var c = Game.getChar(charId);
  if (!c || !c.lore) return;
  document.getElementById('lore-text').textContent = c.lore[type] || '';
  var tabs = document.querySelectorAll('.lore-tab');
  tabs[0].classList.toggle('active', type === 'history');
  tabs[1].classList.toggle('active', type === 'novel');
  tabs[2].classList.toggle('active', type === 'diff');
};

Game.statBar = function(label, val, max, cls) {
  var pct = Math.min(100, val / max * 100);
  return '<div class="stat-bar-row">' +
    '<div class="stat-bar-label">' + label + '</div>' +
    '<div class="stat-bar-bg"><div class="stat-bar-fill ' + cls + '" style="width:' + pct + '%"></div></div>' +
    '<div class="stat-bar-val">' + Game.formatNum(val) + '</div></div>';
};
