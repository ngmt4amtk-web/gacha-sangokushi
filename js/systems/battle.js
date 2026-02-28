// ======== BATTLE SYSTEM ========
window.Game = window.Game || {};

Game.autoBattleActive = false;
Game.autoBattleStopRequested = false;
Game.autoBattleResults = { cleared: 0, medals: 0, tickets: 0 };

Game.startAutoBattle = function(startStageId) {
  if (Game.isBattling || Game.autoBattleActive) return;
  var teamCount = Game.state.team.filter(function(id) { return id >= 0 && Game.state.owned[id]; }).length;
  if (teamCount === 0) { alert('編成が空です！'); return; }
  Game.autoBattleActive = true;
  Game.autoBattleStopRequested = false;
  Game.autoBattleResults = { cleared: 0, medals: 0, tickets: 0 };
  Game.startBattle(startStageId);
};

Game.stopAutoBattle = function() {
  Game.autoBattleStopRequested = true;
};

Game.showAutoBattleSummary = function(reason) {
  Game.autoBattleActive = false;
  var r = Game.autoBattleResults;
  var overlay = document.getElementById('battle-overlay');
  overlay.innerHTML =
    '<div style="display:flex;align-items:center;justify-content:center;height:100%">' +
    '<div class="battle-result" style="background:rgba(0,0,0,0.95);border:2px solid var(--gold);max-width:320px;width:90%;padding:24px;border-radius:12px">' +
      '<h2 style="color:var(--gold);margin-bottom:12px">連戦結果</h2>' +
      '<div style="color:var(--text2);font-size:13px;margin-bottom:12px">' + reason + '</div>' +
      '<div style="font-size:16px;margin:8px 0">クリア: <span style="color:#4caf50;font-weight:bold">' + r.cleared + '</span> ステージ</div>' +
      '<div class="reward" style="font-size:15px">+' + Game.formatNum(r.medals) + ' メダル</div>' +
      '<div style="color:#42a5f5;font-size:14px;font-weight:bold;margin:4px 0">武将券 x' + r.tickets + ' GET!</div>' +
      '<button class="battle-close-btn" onclick="Game.closeBattle()">閉じる</button>' +
    '</div></div>';
  overlay.classList.add('show');
};


Game.getStageEnemies = function(stageData, chapterData) {
  if (!stageData || !chapterData) return [];
  var tmpl = Game.ENEMY_TEMPLATES[stageData.enemyTemplate] || Game.ENEMY_TEMPLATES.yellowTurban;
  var count = stageData.enemyCount || 3;
  var diff = stageData.difficulty || 1;
  var ngMult = 1 + (Game.state.ngPlusLevel || 0) * 0.7;
  var enemies = [];

  for (var i = 0; i < count; i++) {
    var isBoss = stageData.isBoss && i === 0;
    var mult = isBoss ? diff * 2.5 * ngMult : diff * ngMult;
    var name = isBoss ? (stageData.bossName || '???') : tmpl.names[Math.floor(Math.random() * tmpl.names.length)];
    var atk = Math.floor((tmpl.atkRange[0] + Math.random() * (tmpl.atkRange[1] - tmpl.atkRange[0])) * mult);
    var hp = Math.floor((tmpl.hpRange[0] + Math.random() * (tmpl.hpRange[1] - tmpl.hpRange[0])) * mult);
    var def = Math.floor((tmpl.defRange[0] + Math.random() * (tmpl.defRange[1] - tmpl.defRange[0])) * mult);
    var enemy = { name: name, atk: atk, hp: hp, maxHp: hp, def: def, isBoss: isBoss, alive: true, buffs: [], debuffs: [], counterFlag: false, counterMult: 0 };
    if (isBoss && stageData.bossSpecial) enemy.bossSpecial = stageData.bossSpecial;
    enemies.push(enemy);
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
      // Signature item: transfer boost info
      var sigBoost = null;
      var charType = Game.getChar(id) ? Game.getChar(id).type : -1;
      if (s.hasSignature && Game.getSignatureBoost) {
        sigBoost = Game.getSignatureBoost(charType);
      }
      // 守タイプ with signature: DEF×1.5 + auto counter
      if (sigBoost && sigBoost.defMult) {
        finalDef = Math.floor(finalDef * sigBoost.defMult);
      }
      teamChars.push({
        id: s.id, name: s.name, atk: finalAtk, hp: finalHp, def: finalDef, spd: s.spd,
        maxHp: finalHp, currentHp: finalHp, alive: true,
        skillName: s.skillName, skillDesc: s.skillDesc, skillMult: s.skillMult,
        skillTarget: s.skillTarget, skillType: s.skillType, rarity: s.rarity,
        buffs: [], debuffs: [],
        counterFlag: !!(sigBoost && sigBoost.autoCounter),
        counterMult: sigBoost && sigBoost.autoCounter ? sigBoost.autoCounter : 0,
        hasSignature: !!s.hasSignature, sigBoost: sigBoost, charType: charType
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

  var autoBattleHeader = '';
  if (Game.autoBattleActive) {
    autoBattleHeader = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">' +
      '<div style="font-size:12px;color:#ff9800">連戦中 (' + (Game.autoBattleResults.cleared + 1) + '戦目)</div>' +
      '<button onclick="Game.stopAutoBattle()" style="background:#f44336;color:#fff;border:none;border-radius:6px;padding:4px 12px;font-size:12px;cursor:pointer">停止</button>' +
    '</div>';
  }

  var overlay = document.getElementById('battle-overlay');
  overlay.innerHTML =
    '<div class="battle-header">' +
      autoBattleHeader +
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

  // Buff/debuff effective stat helpers
  function getEffectiveAtk(unit) {
    var base = unit.atk;
    var mult = 1;
    (unit.buffs || []).forEach(function(b) { if (b.stat === 'atk') mult += b.amount; });
    (unit.debuffs || []).forEach(function(d) { if (d.stat === 'atk') mult -= d.amount; });
    return Math.max(1, Math.floor(base * Math.max(0.1, mult)));
  }
  function getEffectiveDef(unit) {
    var base = unit.def;
    var mult = 1;
    (unit.buffs || []).forEach(function(b) { if (b.stat === 'def') mult += b.amount; });
    (unit.debuffs || []).forEach(function(d) { if (d.stat === 'def') mult -= d.amount; });
    return Math.max(0, Math.floor(base * Math.max(0, mult)));
  }

  // Tick down buffs/debuffs at turn start
  function tickBuffsDebuffs() {
    var allCombatants = allies.concat(enemies);
    allCombatants.forEach(function(u) {
      if (u.buffs) {
        u.buffs.forEach(function(b) { b.turns--; });
        u.buffs = u.buffs.filter(function(b) { return b.turns > 0; });
      }
      if (u.debuffs) {
        u.debuffs.forEach(function(d) { d.turns--; });
        u.debuffs = u.debuffs.filter(function(d) { return d.turns > 0; });
      }
    });
  }

  // Parse buff/debuff from skill description
  function parseSkillEffects(desc) {
    var effects = [];
    // ATK UP: "攻撃力30%UP" or "攻撃25%UP" or "ATK15%UP"
    var atkUp = desc.match(/攻撃力?(\d+)%UP/i) || desc.match(/ATK(\d+)%UP/i);
    if (atkUp) effects.push({ stat: 'atk', amount: parseInt(atkUp[1]) / 100, isBuff: true });
    // DEF UP: "防御35%UP" or "DEF10%UP"
    var defUp = desc.match(/防御(\d+)%UP/i) || desc.match(/DEF(\d+)%UP/i);
    if (defUp) effects.push({ stat: 'def', amount: parseInt(defUp[1]) / 100, isBuff: true });
    // ATK DOWN: "攻撃力20%DOWN" or "攻撃20%DOWN"
    var atkDown = desc.match(/攻撃力?(\d+)%DOWN/i) || desc.match(/ATK(\d+)%DOWN/i);
    if (atkDown) effects.push({ stat: 'atk', amount: parseInt(atkDown[1]) / 100, isBuff: false });
    // DEF DOWN: "防御25%DOWN" or "DEF30%DOWN"
    var defDown = desc.match(/防御(\d+)%DOWN/i) || desc.match(/DEF(\d+)%DOWN/i);
    if (defDown) effects.push({ stat: 'def', amount: parseInt(defDown[1]) / 100, isBuff: false });
    // HP drain: "HP10%減"
    var hpDrain = desc.match(/HP(\d+)%減/);
    if (hpDrain) effects.push({ stat: 'hpDrain', amount: parseInt(hpDrain[1]) / 100 });
    // HP recovery: "HP(\d+)%回復"
    var hpHeal = desc.match(/HP(\d+)%回復/);
    if (hpHeal) effects.push({ stat: 'hpHeal', amount: parseInt(hpHeal[1]) / 100 });
    return effects;
  }

  // Sort by speed
  var allUnits = [];
  allies.forEach(function(a, i) { allUnits.push({ unit: a, idx: i, isAlly: true }); });
  enemies.forEach(function(e, i) { allUnits.push({ unit: e, idx: i, isAlly: false }); });

  async function runTurns() {
    while (true) {
      turn++;
      if (turn > 50) break;

      // Tick buffs/debuffs (skip turn 1)
      if (turn > 1) tickBuffsDebuffs();

      // Boss special abilities
      enemies.forEach(function(e) {
        if (e.isBoss && e.bossSpecial && e.alive) {
          var sp = e.bossSpecial;
          if (sp.type === 'atkBuff') {
            e.buffs.push({ stat: 'atk', amount: sp.amount, turns: 99 });
            addLog('<span style="color:#ff5722">' + e.name + 'の覇気が増す！（ATK+' + Math.round(sp.amount * 100) + '%）</span>', 'skill');
          }
          if (sp.type === 'defBuff' || sp.type2 === 'defBuff') {
            var amt = sp.type === 'defBuff' ? sp.amount : sp.amount2;
            e.buffs.push({ stat: 'def', amount: amt, turns: 99 });
            addLog('<span style="color:#42a5f5">' + e.name + 'が守りを固める！（DEF+' + Math.round(amt * 100) + '%）</span>', 'skill');
          }
          if (sp.type === 'counter' || sp.type2 === 'counter') {
            e.counterFlag = true;
            e.counterMult = sp.counterMult || 1.0;
          }
        }
      });

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
          // Signature boost: 智 type = 100% skill activation
          var skillChance = 0.3;
          if (unit.hasSignature && unit.sigBoost && unit.sigBoost.activation) {
            skillChance = unit.sigBoost.activation;
          }
          var useSkill = Math.random() < skillChance;
          var unitAtk = getEffectiveAtk(unit);

          if (useSkill && unit.skillName) {
            var skillMult = unit.skillMult || 1.2;
            // Signature boost: 武 type = skill mult ×2
            if (unit.hasSignature && unit.sigBoost && unit.sigBoost.multScale) {
              skillMult *= unit.sigBoost.multScale;
            }
            var sType = unit.skillType || 'damage';
            var sDesc = unit.skillDesc || '';

            // === HEAL ===
            if (sType === 'heal' || sDesc.indexOf('回復') >= 0) {
              var healAmt = Math.floor(unit.maxHp * 0.1 * skillMult);
              allies.forEach(function(al, ai) {
                if (al.alive) {
                  al.currentHp = Math.min(al.maxHp, al.currentHp + healAmt);
                  spawnDmgNum(document.getElementById('ally-' + ai), healAmt, 'heal');
                }
              });
              // Check for additional buff effects in heal skills
              var healEffects = parseSkillEffects(sDesc);
              healEffects.forEach(function(eff) {
                if (eff.isBuff) {
                  allies.forEach(function(al) {
                    if (al.alive) al.buffs.push({ stat: eff.stat, amount: eff.amount, turns: 3 });
                  });
                }
              });
              addLog(unit.name + 'の【' + unit.skillName + '】発動！ 味方全体' + healAmt + '回復！', 'heal');
              Game.playSound('medal');

            // === BUFF ===
            } else if (sType === 'buff') {
              var buffEffects = parseSkillEffects(sDesc);
              var buffTexts = [];
              buffEffects.forEach(function(eff) {
                if (eff.stat === 'hpDrain') {
                  // HP drain side effect (董卓、孫皓、馬謖)
                  allies.forEach(function(al, ai) {
                    if (al.alive) {
                      var drain = Math.floor(al.maxHp * eff.amount);
                      al.currentHp = Math.max(1, al.currentHp - drain);
                      spawnDmgNum(document.getElementById('ally-' + ai), drain, '');
                    }
                  });
                  buffTexts.push('HP' + Math.round(eff.amount * 100) + '%減');
                } else if (eff.isBuff) {
                  allies.forEach(function(al) {
                    if (al.alive) al.buffs.push({ stat: eff.stat, amount: eff.amount, turns: 3 });
                  });
                  var statName = eff.stat === 'atk' ? '攻撃力' : '防御力';
                  buffTexts.push(statName + Math.round(eff.amount * 100) + '%UP');
                }
              });
              // If skill is 馬謖 style (self-KO + team buff), handle the self-KO
              if (sDesc.indexOf('戦闘不能') >= 0) {
                unit.currentHp = 0;
                unit.alive = false;
                buffTexts.push('自身戦闘不能');
              }
              addLog(unit.name + 'の【' + unit.skillName + '】発動！ ' + buffTexts.join('、') + '(3ターン)！', 'skill');
              Game.playSound('medal');

            // === DEBUFF ===
            } else if (sType === 'debuff') {
              var debuffEffects = parseSkillEffects(sDesc);
              var debuffTexts = [];
              var debuffTargets = (unit.skillTarget === 'all_enemy' || unit.skillTarget === 'all' || sDesc.indexOf('敵全体') >= 0)
                ? livingEnemies : [target];
              debuffEffects.forEach(function(eff) {
                if (eff.isBuff) {
                  // Hybrid: buff allies too (司馬懿 etc)
                  allies.forEach(function(al) {
                    if (al.alive) al.buffs.push({ stat: eff.stat, amount: eff.amount, turns: 3 });
                  });
                  var bStatName = eff.stat === 'atk' ? '攻撃力' : '防御力';
                  debuffTexts.push('味方' + bStatName + Math.round(eff.amount * 100) + '%UP');
                } else if (eff.stat !== 'hpDrain' && eff.stat !== 'hpHeal') {
                  debuffTargets.forEach(function(t) {
                    t.debuffs.push({ stat: eff.stat, amount: eff.amount, turns: 3 });
                  });
                  var statName = eff.stat === 'atk' ? '攻撃力' : '防御力';
                  debuffTexts.push(statName + Math.round(eff.amount * 100) + '%DOWN');
                }
              });
              // Some debuffs also deal damage (陸遜 etc)
              if (sDesc.indexOf('ダメージ') >= 0) {
                var dmg = Math.floor(unitAtk * skillMult * 0.8);
                debuffTargets.forEach(function(t) {
                  var actualDmg = Math.max(1, dmg - getEffectiveDef(t) * 0.3);
                  t.hp -= actualDmg;
                  spawnDmgNum(document.getElementById('enemy-' + enemies.indexOf(t)), actualDmg, 'skill');
                });
                debuffTexts.push(dmg + 'ダメージ');
              }
              // Stun effect: "行動不能" (貂蝉)
              if (sDesc.indexOf('行動不能') >= 0) {
                debuffTargets.forEach(function(t) {
                  t.debuffs.push({ stat: 'stun', amount: 1, turns: 2 });
                });
                debuffTexts.push('行動不能');
              }
              var targetText = debuffTargets.length > 1 ? '敵全体' : target.name;
              addLog(unit.name + 'の【' + unit.skillName + '】発動！ ' + targetText + 'の' + debuffTexts.join('、') + '(3ターン)！', 'skill');
              Game.playSound('hit');

            // === COUNTER ===
            } else if (sType === 'counter') {
              unit.counterFlag = true;
              unit.counterMult = skillMult;
              // Counter skills may also buff DEF
              var counterEffects = parseSkillEffects(sDesc);
              counterEffects.forEach(function(eff) {
                if (eff.isBuff) {
                  unit.buffs.push({ stat: eff.stat, amount: eff.amount, turns: 3 });
                }
              });
              addLog(unit.name + 'の【' + unit.skillName + '】発動！ <span style="color:#ff9800">反撃態勢！</span>', 'skill');
              Game.playSound('medal');

            // === RANDOM (左慈) ===
            } else if (sType === 'random') {
              var roll = Math.random();
              if (roll < 0.33) {
                // ATK big buff
                allies.forEach(function(al) { if (al.alive) al.buffs.push({ stat: 'atk', amount: 0.5, turns: 3 }); });
                addLog(unit.name + 'の【' + unit.skillName + '】発動！ <span style="color:#ffd700">味方全体攻撃力50%UP！</span>', 'skill');
              } else if (roll < 0.66) {
                // Big heal
                var healAmt = Math.floor(unit.maxHp * 0.2 * skillMult);
                allies.forEach(function(al, ai) {
                  if (al.alive) {
                    al.currentHp = Math.min(al.maxHp, al.currentHp + healAmt);
                    spawnDmgNum(document.getElementById('ally-' + ai), healAmt, 'heal');
                  }
                });
                addLog(unit.name + 'の【' + unit.skillName + '】発動！ <span style="color:#4caf50">味方全体' + healAmt + '回復！</span>', 'heal');
              } else {
                // Enemy DEF big down
                livingEnemies.forEach(function(e) { e.debuffs.push({ stat: 'def', amount: 0.3, turns: 3 }); });
                addLog(unit.name + 'の【' + unit.skillName + '】発動！ <span style="color:#9c27b0">敵全体防御30%DOWN！</span>', 'skill');
              }
              Game.playSound('medal');

            // === MULTI TARGET DAMAGE ===
            } else if (unit.skillTarget === 'multi') {
              var targets = [];
              var pool = livingEnemies.slice();
              for (var ti = 0; ti < Math.min(2, pool.length); ti++) {
                var picked = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
                targets.push(picked);
              }
              targets.forEach(function(t) {
                var dmg = Math.floor(unitAtk * skillMult);
                var actualDmg = Math.max(1, dmg - getEffectiveDef(t) * 0.3);
                t.hp -= actualDmg;
                spawnDmgNum(document.getElementById('enemy-' + enemies.indexOf(t)), actualDmg, 'skill');
              });
              addLog(unit.name + 'の【' + unit.skillName + '】発動！ ' + targets.length + '体に' + Math.floor(unitAtk * skillMult) + 'ダメージ！', 'skill');
              Game.playSound('hit');

            // === ALL ENEMY DAMAGE ===
            } else if (unit.skillTarget === 'all_enemy' || sDesc.indexOf('敵全体') >= 0 || sDesc.indexOf('全体に') >= 0) {
              var dmg = Math.floor(unitAtk * skillMult * 0.8);
              livingEnemies.forEach(function(e) {
                var actualDmg = Math.max(1, dmg - getEffectiveDef(e) * 0.3);
                e.hp -= actualDmg;
                spawnDmgNum(document.getElementById('enemy-' + enemies.indexOf(e)), actualDmg, 'skill');
              });
              // Check for additional buff/debuff effects on damage skills
              var dmgEffects = parseSkillEffects(sDesc);
              dmgEffects.forEach(function(eff) {
                if (eff.isBuff) {
                  allies.forEach(function(al) { if (al.alive) al.buffs.push({ stat: eff.stat, amount: eff.amount, turns: 3 }); });
                } else if (!eff.isBuff && eff.stat !== 'hpDrain' && eff.stat !== 'hpHeal') {
                  livingEnemies.forEach(function(e) { e.debuffs.push({ stat: eff.stat, amount: eff.amount, turns: 3 }); });
                }
              });
              // Self-heal component (趙雲 etc)
              if (sDesc.indexOf('自己HP') >= 0 || sDesc.indexOf('自身HP') >= 0) {
                var selfHeal = Math.floor(unit.maxHp * 0.1);
                unit.currentHp = Math.min(unit.maxHp, unit.currentHp + selfHeal);
              }
              addLog(unit.name + 'の【' + unit.skillName + '】発動！ 全体に' + dmg + 'ダメージ！', 'skill');
              Game.playSound('hit');

            // === SINGLE TARGET DAMAGE (default) ===
            } else {
              var dmg = Math.floor(unitAtk * skillMult);
              var actualDmg = Math.max(1, dmg - getEffectiveDef(target) * 0.3);
              target.hp -= actualDmg;
              spawnDmgNum(document.getElementById('enemy-' + targetIdx), actualDmg, 'skill');
              // Self ATK buff on some single-target skills
              var singleEffects = parseSkillEffects(sDesc);
              singleEffects.forEach(function(eff) {
                if (eff.isBuff && (sDesc.indexOf('自身') >= 0 || sDesc.indexOf('自己') >= 0)) {
                  unit.buffs.push({ stat: eff.stat, amount: eff.amount, turns: 3 });
                }
              });
              // Self-heal component
              if (sDesc.indexOf('自己HP') >= 0 || sDesc.indexOf('自身HP') >= 0) {
                var selfHeal = Math.floor(unit.maxHp * 0.1 * skillMult);
                unit.currentHp = Math.min(unit.maxHp, unit.currentHp + selfHeal);
                spawnDmgNum(document.getElementById('ally-' + entry.idx), selfHeal, 'heal');
              }
              addLog(unit.name + 'の【' + unit.skillName + '】発動！ ' + target.name + 'に' + actualDmg + 'ダメージ！', 'skill');
              Game.playSound('hit');
            }
          } else {
            // Normal attack
            var critRate = 0.15;
            // Signature boost: 武 type = crit +30%
            if (unit.hasSignature && unit.sigBoost && unit.sigBoost.critBonus) {
              critRate += unit.sigBoost.critBonus;
            }
            var dmg = Math.floor(unitAtk * (0.85 + Math.random() * 0.3));
            var actualDmg = Math.max(1, dmg - getEffectiveDef(target) * 0.5);
            var isCrit = Math.random() < critRate;
            var finalDmg = isCrit ? Math.floor(actualDmg * 1.5) : actualDmg;
            target.hp -= finalDmg;
            spawnDmgNum(document.getElementById('enemy-' + targetIdx), finalDmg, isCrit ? 'crit' : '');
            if (isCrit) addLog(unit.name + 'の攻撃！ ' + target.name + 'に' + finalDmg + 'ダメージ！ <span style="color:#ff5722">会心！</span>', 'crit');
            else addLog(unit.name + 'の攻撃！ ' + target.name + 'に' + finalDmg + 'ダメージ！');
            Game.playSound('hit');

            // Signature boost: 速 type = double attack
            if (unit.hasSignature && unit.sigBoost && unit.sigBoost.doubleAttack) {
              var livingEnemies2 = enemies.filter(function(e) { return e.hp > 0; });
              if (livingEnemies2.length > 0) {
                var target2 = livingEnemies2[Math.floor(Math.random() * livingEnemies2.length)];
                var targetIdx2 = enemies.indexOf(target2);
                var dmg2 = Math.floor(unitAtk * (0.85 + Math.random() * 0.3));
                var actualDmg2 = Math.max(1, dmg2 - getEffectiveDef(target2) * 0.5);
                var isCrit2 = Math.random() < critRate;
                var finalDmg2 = isCrit2 ? Math.floor(actualDmg2 * 1.5) : actualDmg2;
                target2.hp -= finalDmg2;
                spawnDmgNum(document.getElementById('enemy-' + targetIdx2), finalDmg2, isCrit2 ? 'crit' : '');
                addLog(unit.name + 'の追撃！ ' + target2.name + 'に' + finalDmg2 + 'ダメージ！' + (isCrit2 ? ' <span style="color:#ff5722">会心！</span>' : ''));
              }
            }
          }

          var allyEl = document.getElementById('ally-' + entry.idx);
          if (allyEl) { allyEl.classList.add('attacking'); setTimeout(function(el) { el.classList.remove('attacking'); }.bind(null, allyEl), 300); }

        } else {
          // Enemy attacks
          // Check for stun debuff
          var isStunned = (unit.debuffs || []).some(function(d) { return d.stat === 'stun'; });
          if (isStunned) {
            addLog(unit.name + 'は行動不能！');
            await wait(200);
            continue;
          }

          var livingAllies = allies.filter(function(a) { return a.alive; });
          if (livingAllies.length === 0) break;
          var target = livingAllies[Math.floor(Math.random() * livingAllies.length)];
          var targetIdx = allies.indexOf(target);
          var enemyAtk = getEffectiveAtk(unit);
          var dmg = Math.floor(enemyAtk * (0.85 + Math.random() * 0.3));
          var actualDmg = Math.max(1, dmg - getEffectiveDef(target) * 0.5);
          target.currentHp -= actualDmg;
          spawnDmgNum(document.getElementById('ally-' + targetIdx), actualDmg, '');
          addLog(unit.name + 'の攻撃！ ' + target.name + 'に' + actualDmg + 'ダメージ！');
          Game.playSound('hit');

          // Counter-attack check
          if (target.counterFlag && target.alive && target.currentHp > 0) {
            var counterDmg = Math.floor(getEffectiveAtk(target) * target.counterMult);
            var counterActual = Math.max(1, counterDmg - getEffectiveDef(unit) * 0.3);
            unit.hp -= counterActual;
            spawnDmgNum(document.getElementById('enemy-' + enemies.indexOf(unit)), counterActual, 'skill');
            addLog('<span style="color:#ff9800">' + target.name + 'の反撃！</span> ' + unit.name + 'に' + counterActual + 'ダメージ！', 'skill');
          }

          if (target.currentHp <= 0) {
            target.currentHp = 0; target.alive = false;
            target.counterFlag = false;
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

        // Auto-battle: continue to next stage
        if (Game.autoBattleActive) {
          Game.autoBattleResults.cleared++;
          Game.autoBattleResults.medals += medalReward;
          Game.autoBattleResults.tickets += ticketReward;
          Game.isBattling = false;
          Game.saveGame();

          // Check if stopped, chapter boss cleared, or no more stages
          var nextInChapter = Game.getNextStageInChapter(stageData.id);
          if (Game.autoBattleStopRequested) {
            Game.autoBattleStopRequested = false;
            Game.showAutoBattleSummary('手動停止');
          } else if (!nextInChapter) {
            Game.showAutoBattleSummary('章クリア！');
          } else {
            // Brief pause then next battle
            await wait(300);
            document.getElementById('battle-overlay').classList.remove('show');
            setTimeout(function() { Game.startBattle(nextInChapter); }, 200);
          }
          return;
        }

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

        // Auto-battle: stop on loss
        if (Game.autoBattleActive) {
          Game.autoBattleResults.medals += consolation;
          Game.isBattling = false;
          Game.saveGame();
          Game.showAutoBattleSummary('敗北で連戦終了');
          return;
        }

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

Game.getNextStageInChapter = function(currentId) {
  var parts = currentId.split('-');
  var ch = parseInt(parts[0]), st = parseInt(parts[1]);
  var nextSt = ch + '-' + (st + 1);
  if (Game.getStageData(nextSt)) return nextSt;
  return null; // no more stages in this chapter
};
