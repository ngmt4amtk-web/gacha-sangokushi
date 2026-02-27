// ======== BATTLE SYSTEM ========
window.Game = window.Game || {};

Game.getStageEnemies = function(stageData, chapterData) {
  if (!stageData || !chapterData) return [];
  var tmpl = Game.ENEMY_TEMPLATES[stageData.enemyTemplate] || Game.ENEMY_TEMPLATES.yellowTurban;
  var count = stageData.enemyCount || 3;
  var diff = stageData.difficulty || 1;
  var ngMult = 1 + (Game.state.ngPlusLevel || 0) * 0.5;
  var enemies = [];

  for (var i = 0; i < count; i++) {
    var isBoss = stageData.isBoss && i === 0;
    var mult = isBoss ? diff * 1.8 * ngMult : diff * ngMult;
    var name = isBoss ? (stageData.bossName || '???') : tmpl.names[Math.floor(Math.random() * tmpl.names.length)];
    var atk = Math.floor((tmpl.atkRange[0] + Math.random() * (tmpl.atkRange[1] - tmpl.atkRange[0])) * mult);
    var hp = Math.floor((tmpl.hpRange[0] + Math.random() * (tmpl.hpRange[1] - tmpl.hpRange[0])) * mult);
    var def = Math.floor((tmpl.defRange[0] + Math.random() * (tmpl.defRange[1] - tmpl.defRange[0])) * mult);
    enemies.push({ name: name, atk: atk, hp: hp, maxHp: hp, def: def, isBoss: isBoss, alive: true });
  }
  return enemies;
};

Game.battleUnitHTML = function(unit, idx, isAlly) {
  var hpPct = (unit.currentHp || unit.hp) / (unit.maxHp || unit.hp) * 100;
  var avatar = isAlly && unit.id !== undefined ? '<img class="unit-avatar" src="' + Game.genAvatar(unit.id, 60) + '">' : '';
  return '<div class="battle-unit" id="' + (isAlly ? 'ally' : 'enemy') + '-' + idx + '">' +
    avatar +
    '<div class="unit-name">' + unit.name + '</div>' +
    '<div class="unit-hp-bar">' +
      '<div class="hp-fill ' + (isAlly ? 'ally' : 'enemy') + '" style="width:' + hpPct + '%"></div>' +
      '<div class="unit-hp-text">' + Math.max(0, Math.floor(unit.currentHp || unit.hp)) + '/' + (unit.maxHp || unit.hp) + '</div>' +
    '</div></div>';
};

Game.startBattle = function(stageId) {
  if (Game.isBattling) return;
  var data = Game.getStageData(stageId);
  if (!data) { alert('ステージデータが見つかりません'); return; }
  var g = Game.state;

  // Build team
  var activeBonds = Game.getActiveBonds ? Game.getActiveBonds(g.team.filter(function(id) { return id >= 0; })) : [];
  var teamChars = [];
  for (var i = 0; i < g.team.length; i++) {
    var id = g.team[i];
    if (id >= 0 && g.owned[id]) {
      var s = Game.getCharStats(id);
      var atkBonus = 0, hpBonus = 0, defBonus = 0;
      for (var b = 0; b < activeBonds.length; b++) {
        if (activeBonds[b].effect) {
          atkBonus += activeBonds[b].effect.atk || 0;
          hpBonus += activeBonds[b].effect.hp || 0;
          defBonus += activeBonds[b].effect.def || 0;
        }
      }
      var finalAtk = Math.floor(s.atk * (1 + atkBonus));
      var finalHp = Math.floor(s.hp * (1 + hpBonus));
      var finalDef = Math.floor(s.def * (1 + defBonus));
      teamChars.push({
        id: s.id, name: s.name, atk: finalAtk, hp: finalHp, def: finalDef, spd: s.spd,
        maxHp: finalHp, currentHp: finalHp, alive: true,
        skillName: s.skillName, skillDesc: s.skillDesc, skillMult: s.skillMult, skillTarget: s.skillTarget, rarity: s.rarity
      });
    }
  }
  if (teamChars.length === 0) { alert('編成が空です！武将をチームに編成してください'); return; }

  Game.isBattling = true;
  var enemies = Game.getStageEnemies(data.stage, data.chapter);

  var bondHTML = '';
  if (activeBonds.length > 0) {
    bondHTML = '<div style="font-size:11px;color:#ffd700;margin-top:3px">' +
      activeBonds.map(function(b) { return '[' + b.name + ']'; }).join(' ') + '</div>';
  }

  var overlay = document.getElementById('battle-overlay');
  overlay.innerHTML =
    '<div class="battle-header">' +
      '<h3>' + (data.stage.isBoss ? 'BOSS ' : '') + data.stage.name + '</h3>' +
      '<div style="font-size:13px;color:var(--text2)">第' + data.chapter.id + '章 ' + data.chapter.name + '</div>' +
      bondHTML +
    '</div>' +
    '<div class="battle-field">' +
      '<div class="battle-side"><div class="battle-side-label">味方</div>' +
        '<div id="ally-units">' + teamChars.map(function(c, i) { return Game.battleUnitHTML(c, i, true); }).join('') + '</div>' +
      '</div>' +
      '<div class="battle-side"><div class="battle-side-label">敵' + (data.stage.isBoss ? ' [BOSS]' : '') + '</div>' +
        '<div id="enemy-units">' + enemies.map(function(e, i) { return Game.battleUnitHTML(e, i, false); }).join('') + '</div>' +
      '</div>' +
      '<div class="battle-log" id="battle-log"></div>' +
      '<div id="battle-result-area"></div>' +
    '</div>';
  overlay.classList.add('show');
  Game.initAudio();
  Game.runBattle(teamChars, enemies, data.stage, data.chapter);
};

Game.runBattle = function(allies, enemies, stageData, chapterData) {
  var log = document.getElementById('battle-log');
  var turn = 0;

  function addLog(text, cls) {
    var p = document.createElement('p');
    p.innerHTML = text;
    if (cls) p.className = cls;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
  }

  function updateUnits() {
    allies.forEach(function(a, i) {
      var el = document.getElementById('ally-' + i);
      if (!el) return;
      var pct = Math.max(0, a.currentHp / a.maxHp * 100);
      el.querySelector('.hp-fill').style.width = pct + '%';
      el.querySelector('.unit-hp-text').textContent = Math.max(0, Math.floor(a.currentHp)) + '/' + a.maxHp;
      el.classList.toggle('dead', !a.alive);
    });
    enemies.forEach(function(e, i) {
      var el = document.getElementById('enemy-' + i);
      if (!el) return;
      var pct = Math.max(0, e.hp / e.maxHp * 100);
      el.querySelector('.hp-fill').style.width = pct + '%';
      el.querySelector('.unit-hp-text').textContent = Math.max(0, Math.floor(e.hp)) + '/' + e.maxHp;
      el.classList.toggle('dead', e.hp <= 0);
    });
  }

  function wait(ms) {
    return new Promise(function(r) { setTimeout(r, ms / (Game.state.battleSpeed || 1)); });
  }

  function spawnDmgNum(unitEl, amount, type) {
    if (!unitEl) return;
    var container = unitEl.closest('.battle-field');
    if (!container) return;
    var rect = unitEl.getBoundingClientRect();
    var contRect = container.getBoundingClientRect();
    var el = document.createElement('div');
    el.className = 'dmg-num' + (type ? ' ' + type : '');
    el.textContent = type === 'heal' ? '+' + amount : amount;
    el.style.left = (rect.left - contRect.left + rect.width * 0.5 + (Math.random() - 0.5) * 40) + 'px';
    el.style.top = (rect.top - contRect.top - 5) + 'px';
    container.style.position = 'relative';
    container.appendChild(el);
    setTimeout(function() { el.remove(); }, 800);
  }

  // Sort by speed
  var allUnits = [];
  allies.forEach(function(a, i) { allUnits.push({ unit: a, idx: i, isAlly: true }); });
  enemies.forEach(function(e, i) { allUnits.push({ unit: e, idx: i, isAlly: false }); });

  async function runTurns() {
    while (true) {
      turn++;
      if (turn > 50) break;
      addLog('--- ターン ' + turn + ' ---');
      await wait(200);

      // Sort by speed each turn
      allUnits.sort(function(a, b) { return (b.unit.spd || 50) - (a.unit.spd || 50); });

      for (var u = 0; u < allUnits.length; u++) {
        var entry = allUnits[u];
        var unit = entry.unit;
        if (entry.isAlly && !unit.alive) continue;
        if (!entry.isAlly && unit.hp <= 0) continue;

        if (entry.isAlly) {
          // Ally attacks
          var livingEnemies = enemies.filter(function(e) { return e.hp > 0; });
          if (livingEnemies.length === 0) break;
          var target = livingEnemies[Math.floor(Math.random() * livingEnemies.length)];
          var targetIdx = enemies.indexOf(target);
          var useSkill = Math.random() < 0.3;

          if (useSkill && unit.skillName) {
            var skillMult = unit.skillMult || 1.2;
            if (unit.skillDesc && unit.skillDesc.indexOf('回復') >= 0) {
              var healAmt = Math.floor(unit.maxHp * 0.1 * skillMult);
              allies.forEach(function(al, ai) {
                if (al.alive) {
                  al.currentHp = Math.min(al.maxHp, al.currentHp + healAmt);
                  spawnDmgNum(document.getElementById('ally-' + ai), healAmt, 'heal');
                }
              });
              addLog(unit.name + 'の【' + unit.skillName + '】発動！ 味方全体' + healAmt + '回復！', 'heal');
              Game.playSound('medal');
            } else if (unit.skillTarget === 'all_enemy' || (unit.skillDesc && unit.skillDesc.indexOf('全体') >= 0)) {
              var dmg = Math.floor(unit.atk * skillMult * 0.8);
              livingEnemies.forEach(function(e) {
                var actualDmg = Math.max(1, dmg - e.def * 0.3);
                e.hp -= actualDmg;
                spawnDmgNum(document.getElementById('enemy-' + enemies.indexOf(e)), actualDmg, 'skill');
              });
              addLog(unit.name + 'の【' + unit.skillName + '】発動！ 全体に' + dmg + 'ダメージ！', 'skill');
              Game.playSound('hit');
            } else {
              var dmg = Math.floor(unit.atk * skillMult);
              var actualDmg = Math.max(1, dmg - target.def * 0.3);
              target.hp -= actualDmg;
              spawnDmgNum(document.getElementById('enemy-' + targetIdx), actualDmg, 'skill');
              addLog(unit.name + 'の【' + unit.skillName + '】発動！ ' + target.name + 'に' + actualDmg + 'ダメージ！', 'skill');
              Game.playSound('hit');
            }
          } else {
            var dmg = Math.floor(unit.atk * (0.85 + Math.random() * 0.3));
            var actualDmg = Math.max(1, dmg - target.def * 0.5);
            var isCrit = Math.random() < 0.15;
            var finalDmg = isCrit ? Math.floor(actualDmg * 1.5) : actualDmg;
            target.hp -= finalDmg;
            spawnDmgNum(document.getElementById('enemy-' + targetIdx), finalDmg, isCrit ? 'crit' : '');
            if (isCrit) addLog(unit.name + 'の攻撃！ ' + target.name + 'に' + finalDmg + 'ダメージ！ <span style="color:#ff5722">会心！</span>', 'crit');
            else addLog(unit.name + 'の攻撃！ ' + target.name + 'に' + finalDmg + 'ダメージ！');
            Game.playSound('hit');
          }

          var allyEl = document.getElementById('ally-' + entry.idx);
          if (allyEl) { allyEl.classList.add('attacking'); setTimeout(function(el) { el.classList.remove('attacking'); }.bind(null, allyEl), 300); }

        } else {
          // Enemy attacks
          var livingAllies = allies.filter(function(a) { return a.alive; });
          if (livingAllies.length === 0) break;
          var target = livingAllies[Math.floor(Math.random() * livingAllies.length)];
          var targetIdx = allies.indexOf(target);
          var dmg = Math.floor(unit.atk * (0.85 + Math.random() * 0.3));
          var actualDmg = Math.max(1, dmg - target.def * 0.5);
          target.currentHp -= actualDmg;
          spawnDmgNum(document.getElementById('ally-' + targetIdx), actualDmg, '');
          addLog(unit.name + 'の攻撃！ ' + target.name + 'に' + actualDmg + 'ダメージ！');
          Game.playSound('hit');

          if (target.currentHp <= 0) {
            target.currentHp = 0; target.alive = false;
            addLog(target.name + 'が戦闘不能！', 'crit');
          }
        }

        updateUnits();
        await wait(200);

        if (enemies.every(function(e) { return e.hp <= 0; })) break;
        if (allies.every(function(a) { return !a.alive; })) break;
      }

      // Check win/lose
      if (enemies.every(function(e) { return e.hp <= 0; })) {
        await wait(500);
        var g = Game.state;
        var rewards = stageData.rewards || { medals: 50, tickets: 1 };
        var ngMult = 1 + (g.ngPlusLevel || 0) * 0.3;
        var medalReward = Math.floor(rewards.medals * ngMult);
        var ticketReward = rewards.tickets || 1;

        g.medals += medalReward;
        g.heroTickets += ticketReward;
        g.totalMedalsEarned += medalReward;
        g.clearedStages[stageData.id] = true;
        g.totalStageClears = (g.totalStageClears || 0) + 1;

        // Bond battle count increment
        if (Game.incrementBondBattleCounts) Game.incrementBondBattleCounts();

        // Auto-advance stage
        Game.advanceStage(stageData.id);

        // Check chapter unlock / NG+
        if (Game.checkProgression) Game.checkProgression();

        Game.playSound('win');
        var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
        Game.spawnParticles(cx, cy, '#ffd700', 40);
        Game.spawnParticles(cx, cy, '#4caf50', 20);

        var nextStageId = Game.getNextStageId(stageData.id);
        var nextBtn = nextStageId ?
          '<button class="battle-close-btn" style="background:linear-gradient(135deg,#4caf50,#388e3c);margin-top:6px" ' +
          'onclick="Game.closeBattle();setTimeout(function(){Game.startBattle(\'' + nextStageId + '\')},300)">次のステージへ</button>' : '';

        document.getElementById('battle-result-area').innerHTML =
          '<div class="battle-result win">' +
            '<h2>勝利！</h2>' +
            '<div class="reward">+' + Game.formatNum(medalReward) + ' メダル</div>' +
            '<div style="color:#42a5f5;font-size:15px;font-weight:bold;margin:4px 0">武将券 x' + ticketReward + ' GET!</div>' +
            (stageData.storyAfter ? '<div style="font-size:12px;color:var(--text2);margin:8px 0;line-height:1.5">' + stageData.storyAfter + '</div>' : '') +
            '<button class="battle-close-btn" onclick="Game.closeBattle()">閉じる</button>' +
            nextBtn +
          '</div>';
        Game.saveGame();
        Game.isBattling = false;
        return;
      }

      if (allies.every(function(a) { return !a.alive; })) {
        await wait(500);
        var consolation = Math.floor((stageData.rewards ? stageData.rewards.medals : 20) * 0.3);
        Game.state.medals += consolation;
        Game.state.totalMedalsEarned += consolation;
        Game.playSound('lose');

        document.getElementById('battle-result-area').innerHTML =
          '<div class="battle-result lose">' +
            '<h2>敗北...</h2>' +
            '<div style="font-size:13px;color:var(--text2);margin:8px 0">武将を強化して再挑戦しよう！</div>' +
            '<div class="reward" style="font-size:14px">+' + consolation + ' メダル (慰め)</div>' +
            '<button class="battle-close-btn" onclick="Game.closeBattle()">閉じる</button>' +
          '</div>';
        Game.saveGame();
        Game.isBattling = false;
        return;
      }

      await wait(200);
    }
  }

  runTurns();
};

Game.closeBattle = function() {
  document.getElementById('battle-overlay').classList.remove('show');
  Game.isBattling = false;
  Game.renderAll();
};

Game.getNextStageId = function(currentId) {
  var parts = currentId.split('-');
  var ch = parseInt(parts[0]), st = parseInt(parts[1]);
  var nextSt = ch + '-' + (st + 1);
  if (Game.getStageData(nextSt)) return nextSt;
  var nextCh = (ch + 1) + '-1';
  if (Game.getStageData(nextCh) && Game.state.currentChapter >= ch + 1) return nextCh;
  return null;
};

Game.advanceStage = function(clearedId) {
  var g = Game.state;
  var next = Game.getNextStageId(clearedId);
  if (next) {
    g.currentStageId = next;
  }
};
