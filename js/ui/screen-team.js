// ======== TEAM SCREEN ========
window.Game = window.Game || {};

Game.editingSlot = -1;
Game.editingWeaponSlot = -1;

// Bulk edit mode
Game.bulkEditMode = false;
Game.bulkEditPhase = 'char';
Game.bulkEditSelections = [];
Game.bulkEditWeapons = [-1,-1,-1,-1,-1];
Game.bulkEditCurrentWeaponSlot = 0;
Game.bulkEditFilter = null;

Game.renderTeam = function() {
  var g = Game.state;
  var el = document.getElementById('screen-team');
  var html = '';

  // Team power + auto-form button
  var power = Game.getTeamPower();
  var ownedCount = Object.keys(g.owned).length;
  html += '<div class="team-power" style="display:flex;align-items:center;justify-content:space-between">' +
    '<span>総戦力: ' + Game.formatNum(power) + '</span>' +
    (ownedCount > 0 ? '<div style="display:flex;gap:6px">' +
      '<button class="filter-btn active" style="font-size:12px;padding:6px 14px" onclick="Game.autoFormTeam()">⚡ オート</button>' +
      '<button class="filter-btn' + (Game.bulkEditMode ? ' active' : '') + '" style="font-size:12px;padding:6px 14px" onclick="Game.enterBulkEdit()">📋 一括編成</button>' +
    '</div>' : '') +
    '</div>';

  // Active bonds
  var teamIds = g.team.filter(function(id) { return id >= 0; });
  var bonds = Game.getActiveBonds ? Game.getActiveBonds(teamIds) : [];
  if (bonds.length > 0) {
    html += '<div style="text-align:center;margin-bottom:10px">';
    bonds.forEach(function(b) {
      html += '<div class="bond-badge">' + b.name + '</div>';
    });
    html += '</div>';
  }

  // Bulk edit mode
  if (Game.bulkEditMode) {
    html += Game.renderBulkEdit();
    el.innerHTML = html;
    return;
  }

  // Team slots
  for (var i = 0; i < 5; i++) {
    var charId = g.team[i];
    var wpnId = g.teamWeapons[i];
    var hasChar = charId >= 0 && g.owned[charId];
    var hasWpn = wpnId >= 0 && g.ownedWeapons[wpnId];
    var isEditing = Game.editingSlot === i;
    var isEditingWpn = Game.editingWeaponSlot === i;

    html += '<div class="team-row' + (isEditing || isEditingWpn ? ' editing' : '') + '">';
    html += '<div class="slot-num">' + (i + 1) + '</div>';

    // Character area
    if (hasChar) {
      var c = Game.getCharStats(charId);
      var rc = Game.rarityClass(c.rarity);
      var sigBadge = '';
      if (c.hasSignature && Game.SIGNATURE_ITEMS && Game.SIGNATURE_ITEMS[charId]) {
        sigBadge = '<div style="font-size:9px;color:#ffd700;background:rgba(255,215,0,0.15);border:1px solid rgba(255,215,0,0.4);border-radius:4px;padding:1px 4px;display:inline-block;margin-top:2px">' + Game.SIGNATURE_ITEMS[charId].name + '</div>';
      }
      html += '<div class="char-area filled" onclick="Game.toggleSlotEdit(' + i + ')">' +
        '<img class="slot-avatar" src="' + Game.genAvatar(charId, 88) + '"' + (c.hasSignature ? ' style="border:2px solid #ffd700;box-shadow:0 0 8px rgba(255,215,0,0.5)"' : '') + '>' +
        '<div class="slot-info">' +
          '<div class="slot-name" style="color:' + Game.RARITY_COLORS[c.rarity] + '">' + c.name + '</div>' +
          '<div class="slot-sub">' + Game.RARITY_NAMES[c.rarity] + ' ' + Game.TYPE_NAMES[c.type] + ' ' +
            Game.FACTION_NAMES[c.faction] + (c.totsu > 0 ? ' <span style="color:var(--gold)">' + c.totsu + '凸</span>' : '') + ' ATK:' + Game.formatNum(c.atk) + '</div>' +
          sigBadge +
        '</div></div>';
    } else {
      html += '<div class="char-area" onclick="Game.toggleSlotEdit(' + i + ')">' +
        '<div style="flex:1;text-align:center;color:var(--text2);font-size:12px">タップして武将を配置</div></div>';
    }

    // Weapon area
    if (hasChar) {
      if (hasWpn) {
        var w = Game.getWeaponStats(wpnId);
        html += '<div class="wpn-area filled" onclick="Game.toggleWeaponEdit(' + i + ')">' +
          '<div style="font-size:11px;line-height:1.3">' +
            '<div style="font-weight:bold;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:75px">' + w.name + '</div>' +
            '<div style="font-size:10px;color:var(--text2)">ATK+' + w.atk + '</div>' +
          '</div></div>';
      } else {
        html += '<div class="wpn-area" onclick="Game.toggleWeaponEdit(' + i + ')">' +
          '<div style="font-size:11px;color:var(--text2);text-align:center;width:100%">武器</div></div>';
      }
    } else {
      html += '<div class="wpn-area" style="opacity:0.3"><div style="font-size:11px;color:var(--text2);text-align:center;width:100%">--</div></div>';
    }

    // Remove button
    if (hasChar) {
      html += '<div class="remove-btn" onclick="Game.removeFromSlot(' + i + ')">x</div>';
    } else {
      html += '<div class="remove-btn" style="visibility:hidden">x</div>';
    }

    html += '</div>';

    // Character selection panel
    if (isEditing) {
      html += Game.renderCharSelect(i);
    }

    // Weapon selection panel
    if (isEditingWpn && hasChar) {
      html += Game.renderWeaponSelect(i);
    }
  }

  // Bond hints
  html += '<div class="section-title">絆ヒント</div>';
  html += '<div style="font-size:12px;color:var(--text2);margin-bottom:8px">条件を満たす武将を編成して戦闘すると絆を発見できます</div>';
  if (Game.BONDS) {
    var shown = 0;
    Game.BONDS.forEach(function(bond) {
      if (shown >= 5) return;
      if (Game.state.discoveredBonds[bond.id]) return;
      if (bond.isIF && (g.ngPlusLevel || 0) < 1) return;
      // Check if all heroes are owned
      var allOwned = true;
      for (var j = 0; j < bond.heroes.length; j++) {
        if (!g.owned[bond.heroes[j]]) { allOwned = false; break; }
      }
      if (!allOwned) return;
      var battleCount = g.bondBattleCounts[bond.id] || 0;
      html += '<div style="padding:6px 8px;margin:3px 0;background:rgba(255,255,255,0.03);border-radius:6px;font-size:12px">' +
        '<span style="color:var(--gold)">???</span> ' + (bond.hint || '未知の絆') +
        ' <span style="color:var(--text2)">(' + battleCount + '/20)</span></div>';
      shown++;
    });
    if (shown === 0) {
      html += '<div style="font-size:12px;color:var(--text2);padding:8px">現在発見可能な絆はありません</div>';
    }
  }

  el.innerHTML = html;
};

Game.renderCharSelect = function(slotIdx) {
  var g = Game.state;
  var html = '<div class="select-panel">';
  html += '<div class="select-panel-title">武将を選択</div>';

  // Filter by rarity
  html += '<div class="filter-bar">';
  var filters = ['全て', 'UR', 'SSR', 'SR', 'R', 'N'];
  filters.forEach(function(f) {
    var active = (!Game.teamFilter && f === '全て') || Game.teamFilter === f;
    html += '<button class="filter-btn' + (active ? ' active' : '') + '" onclick="Game.teamFilter=\'' + f + '\';if(\'' + f + '\'===\'全て\')Game.teamFilter=null;Game.renderTeam()">' + f + '</button>';
  });
  html += '</div>';

  html += '<div class="select-grid">';
  var chars = [];
  for (var id in g.owned) {
    var c = Game.getChar(parseInt(id));
    if (!c) continue;
    // Check if already in team (except current slot)
    var inTeam = false;
    for (var s = 0; s < 5; s++) {
      if (s !== slotIdx && g.team[s] === c.id) { inTeam = true; break; }
    }
    if (inTeam) continue;
    // Apply filter
    if (Game.teamFilter) {
      var rarityMap = { 'UR': 5, 'SSR': 4, 'SR': 3, 'R': 2, 'N': 1 };
      if (rarityMap[Game.teamFilter] && c.rarity !== rarityMap[Game.teamFilter]) continue;
    }
    chars.push(c);
  }
  // Sort by rarity desc, then atk desc
  chars.sort(function(a, b) { return b.rarity - a.rarity || b.atk - a.atk; });

  chars.forEach(function(c) {
    var rc = Game.rarityClass(c.rarity);
    var stats = Game.getCharStats(c.id);
    var owned = g.owned[c.id];
    html += '<div class="char-card ' + rc + '" style="width:80px;height:110px;background-image:url(' + Game.genAvatar(c.id, 160) + ')" ' +
      'onclick="Game.assignToSlot(' + slotIdx + ',' + c.id + ')">';
    if (owned && owned.totsu > 0) {
      html += '<div class="totsuki" style="color:var(--gold)">' + owned.totsu + '凸</div>';
    }
    html += '<div class="card-info"><div class="stars" style="font-size:8px">' + Game.RARITY_STARS[c.rarity] + '</div>' +
      '<div class="name" style="font-size:11px">' + c.name + '</div></div></div>';
  });

  if (chars.length === 0) {
    html += '<div style="padding:20px;text-align:center;color:var(--text2);font-size:13px">配置可能な武将がいません</div>';
  }

  html += '</div></div>';
  return html;
};

Game.renderWeaponSelect = function(slotIdx) {
  var g = Game.state;
  var html = '<div class="select-panel">';
  html += '<div class="select-panel-title">武器を選択</div>';

  // "None" option
  html += '<div class="select-grid">';
  html += '<div class="wpn-select-item" onclick="Game.assignWeaponToSlot(' + slotIdx + ',-1)" style="cursor:pointer;padding:8px;margin:3px;background:rgba(255,255,255,0.05);border-radius:6px;font-size:12px;text-align:center">なし</div>';

  var weapons = [];
  for (var wid in g.ownedWeapons) {
    var w = Game.getWeapon(parseInt(wid));
    if (!w) continue;
    // Check if weapon is already assigned (except current slot)
    var assigned = false;
    for (var s = 0; s < 5; s++) {
      if (s !== slotIdx && g.teamWeapons[s] === w.id) { assigned = true; break; }
    }
    if (assigned) continue;
    weapons.push(w);
  }
  weapons.sort(function(a, b) { return b.rarity - a.rarity || b.atk - a.atk; });

  weapons.forEach(function(w) {
    var ws = Game.getWeaponStats(w.id);
    var rc = Game.rarityClass(w.rarity);
    html += '<div class="wpn-select-item ' + rc + '" onclick="Game.assignWeaponToSlot(' + slotIdx + ',' + w.id + ')" ' +
      'style="cursor:pointer;padding:8px;margin:3px;background:rgba(255,255,255,0.05);border:1px solid ' + Game.RARITY_COLORS[w.rarity] + ';border-radius:6px">' +
      '<div style="font-size:12px;font-weight:bold">' + w.name + (ws.totsu > 0 ? ' <span style="color:var(--gold);font-size:10px">' + ws.totsu + '凸</span>' : '') + '</div>' +
      '<div style="font-size:10px;color:var(--text2)">ATK+' + ws.atk + ' HP+' + ws.hp + ' DEF+' + ws.def + '</div>' +
      '</div>';
  });

  if (weapons.length === 0) {
    html += '<div style="padding:12px;text-align:center;color:var(--text2);font-size:12px">装備可能な武器がありません</div>';
  }

  html += '</div></div>';
  return html;
};

Game.toggleSlotEdit = function(idx) {
  Game.editingWeaponSlot = -1;
  Game.editingSlot = Game.editingSlot === idx ? -1 : idx;
  Game.teamFilter = null;
  Game.renderTeam();
};

Game.toggleWeaponEdit = function(idx) {
  Game.editingSlot = -1;
  Game.editingWeaponSlot = Game.editingWeaponSlot === idx ? -1 : idx;
  Game.renderTeam();
};

Game.assignToSlot = function(slotIdx, charId) {
  Game.state.team[slotIdx] = charId;
  Game.editingSlot = -1;
  Game.saveGame();
  Game.renderTeam();
  Game.updateTopbar();
};

Game.assignWeaponToSlot = function(slotIdx, weaponId) {
  Game.state.teamWeapons[slotIdx] = weaponId;
  Game.editingWeaponSlot = -1;
  Game.saveGame();
  Game.renderTeam();
};

Game.removeFromSlot = function(idx) {
  Game.state.team[idx] = -1;
  Game.state.teamWeapons[idx] = -1;
  Game.editingSlot = -1;
  Game.editingWeaponSlot = -1;
  Game.saveGame();
  Game.renderTeam();
  Game.updateTopbar();
};

Game.autoFormTeam = function() {
  var g = Game.state;

  // Get all owned characters with power
  var chars = [];
  for (var id in g.owned) {
    var cid = parseInt(id);
    var s = Game.getCharStats(cid);
    if (s) chars.push({ id: cid, power: s.atk + s.hp / 5 + s.def });
  }
  // Sort by power descending
  chars.sort(function(a, b) { return b.power - a.power; });

  // Assign top 5
  g.team = [-1, -1, -1, -1, -1];
  g.teamWeapons = [-1, -1, -1, -1, -1];
  for (var i = 0; i < Math.min(5, chars.length); i++) {
    g.team[i] = chars[i].id;
  }

  // Get all owned weapons with power
  var weapons = [];
  for (var wid in g.ownedWeapons) {
    var ws = Game.getWeaponStats(parseInt(wid));
    if (ws) weapons.push({ id: parseInt(wid), power: ws.atk + ws.hp / 5 + ws.def });
  }
  weapons.sort(function(a, b) { return b.power - a.power; });

  // Assign top weapons to filled slots
  var wIdx = 0;
  for (var i = 0; i < 5; i++) {
    if (g.team[i] >= 0 && wIdx < weapons.length) {
      g.teamWeapons[i] = weapons[wIdx].id;
      wIdx++;
    }
  }

  Game.editingSlot = -1;
  Game.editingWeaponSlot = -1;
  Game.saveGame();
  Game.renderTeam();
  Game.updateTopbar();
};

// ======== BULK EDIT MODE ========

Game.enterBulkEdit = function() {
  Game.bulkEditMode = true;
  Game.bulkEditPhase = 'char';
  Game.bulkEditSelections = [];
  Game.bulkEditWeapons = [-1,-1,-1,-1,-1];
  Game.bulkEditCurrentWeaponSlot = 0;
  Game.bulkEditFilter = null;
  Game.editingSlot = -1;
  Game.editingWeaponSlot = -1;
  Game.renderTeam();
};

Game.exitBulkEdit = function() {
  Game.bulkEditMode = false;
  Game.renderTeam();
};

Game.renderBulkEdit = function() {
  if (Game.bulkEditPhase === 'char') {
    return Game.renderBulkCharSelect();
  } else {
    return Game.renderBulkWeaponSelect();
  }
};

// ---- Bulk Character Select Phase ----

Game.renderBulkCharSelect = function() {
  var g = Game.state;
  var html = '';

  // Slot preview row
  html += '<div class="bulk-slots-preview">';
  for (var i = 0; i < 5; i++) {
    var selId = Game.bulkEditSelections[i];
    if (selId !== undefined) {
      var c = Game.getCharStats(selId);
      html += '<div class="bulk-slot filled" onclick="Game.bulkRemoveChar(' + i + ')">' +
        '<img src="' + Game.genAvatar(selId, 88) + '" class="bulk-slot-avatar"' +
        (c.hasSignature ? ' style="border:2px solid #ffd700"' : '') + '>' +
        '<div class="bulk-slot-num">' + (i + 1) + '</div>' +
        '<div class="bulk-slot-name">' + c.name + '</div>' +
        (c.totsu > 0 ? '<div class="bulk-slot-totsu">' + c.totsu + '凸</div>' : '') +
        '</div>';
    } else {
      html += '<div class="bulk-slot empty">' +
        '<div class="bulk-slot-num" style="color:var(--text2)">' + (i + 1) + '</div>' +
        '</div>';
    }
  }
  html += '</div>';

  // Guide text
  var remaining = 5 - Game.bulkEditSelections.length;
  html += '<div class="bulk-guide">武将をタップして編成' +
    (remaining > 0 ? '（あと' + remaining + '人）' : '（5人選択済み）') + '</div>';

  // Filter bar
  html += '<div class="filter-bar">';
  var filters = ['全て', 'UR', 'SSR', 'SR', 'R', 'N'];
  filters.forEach(function(f) {
    var active = (!Game.bulkEditFilter && f === '全て') || Game.bulkEditFilter === f;
    html += '<button class="filter-btn' + (active ? ' active' : '') + '" ' +
      'onclick="Game.bulkEditFilter=\'' + f + '\';if(\'' + f + '\'===\'全て\')Game.bulkEditFilter=null;Game.renderTeam()">' + f + '</button>';
  });
  html += '</div>';

  // Character grid
  html += '<div class="bulk-char-grid">';
  var chars = [];
  for (var id in g.owned) {
    var c = Game.getChar(parseInt(id));
    if (!c) continue;
    if (Game.bulkEditFilter) {
      var rarityMap = { 'UR': 5, 'SSR': 4, 'SR': 3, 'R': 2, 'N': 1 };
      if (rarityMap[Game.bulkEditFilter] && c.rarity !== rarityMap[Game.bulkEditFilter]) continue;
    }
    chars.push(c);
  }
  chars.sort(function(a, b) { return b.rarity - a.rarity || b.atk - a.atk; });

  chars.forEach(function(c) {
    var rc = Game.rarityClass(c.rarity);
    var selIdx = Game.bulkEditSelections.indexOf(c.id);
    var isSelected = selIdx >= 0;
    var owned = g.owned[c.id];

    html += '<div class="char-card ' + rc + (isSelected ? ' bulk-selected' : '') + '" style="width:80px;height:110px;background-image:url(' + Game.genAvatar(c.id, 160) + ')" ' +
      'onclick="Game.bulkToggleChar(' + c.id + ')">';
    if (owned && owned.totsu > 0) {
      html += '<div class="totsuki" style="color:var(--gold)">' + owned.totsu + '凸</div>';
    }
    if (isSelected) {
      html += '<div class="bulk-check-overlay">' + (selIdx + 1) + '</div>';
    }
    html += '<div class="card-info"><div class="stars" style="font-size:8px">' + Game.RARITY_STARS[c.rarity] + '</div>' +
      '<div class="name" style="font-size:11px">' + c.name + '</div></div></div>';
  });

  if (chars.length === 0) {
    html += '<div style="padding:20px;text-align:center;color:var(--text2)">所持武将がいません</div>';
  }
  html += '</div>';

  // Bond hints for current selection
  if (Game.BONDS && Game.bulkEditSelections.length > 0) {
    var selSet = {};
    Game.bulkEditSelections.forEach(function(id) { selSet[id] = true; });
    var activeBulk = [];
    var potentialBulk = [];
    Game.BONDS.forEach(function(bond) {
      if (bond.isIF && (g.ngPlusLevel || 0) < 1) return;
      var inTeam = 0;
      var allOwned = true;
      for (var j = 0; j < bond.heroes.length; j++) {
        if (selSet[bond.heroes[j]]) inTeam++;
        if (!g.owned[bond.heroes[j]]) allOwned = false;
      }
      if (inTeam >= bond.minRequired) {
        activeBulk.push(bond);
      } else if (allOwned && inTeam >= bond.minRequired - 2 && inTeam > 0) {
        var missing = [];
        for (var k = 0; k < bond.heroes.length; k++) {
          if (!selSet[bond.heroes[k]]) {
            var mc = Game.getChar(bond.heroes[k]);
            if (mc) missing.push(mc.name);
          }
        }
        potentialBulk.push({ bond: bond, missing: missing });
      }
    });
    if (activeBulk.length > 0 || potentialBulk.length > 0) {
      html += '<div style="margin:10px 0 6px;padding:0 4px">';
      html += '<div style="font-size:13px;font-weight:bold;color:var(--gold);margin-bottom:6px">絆</div>';
      activeBulk.forEach(function(b) {
        var fx = [];
        if (b.effect.atk) fx.push('ATK+' + Math.round(b.effect.atk * 100) + '%');
        if (b.effect.hp) fx.push('HP+' + Math.round(b.effect.hp * 100) + '%');
        if (b.effect.def) fx.push('DEF+' + Math.round(b.effect.def * 100) + '%');
        html += '<div style="padding:5px 8px;margin:3px 0;background:rgba(255,215,0,0.08);border:1px solid rgba(255,215,0,0.25);border-radius:6px;font-size:12px">' +
          '<span style="color:var(--gold)">✓ ' + b.name + '</span> <span style="color:var(--text2)">' + fx.join(' ') + '</span></div>';
      });
      potentialBulk.slice(0, 5).forEach(function(p) {
        html += '<div style="padding:5px 8px;margin:3px 0;background:rgba(255,255,255,0.03);border-radius:6px;font-size:12px">' +
          '<span style="color:var(--text2)">△ ' + p.bond.name + '</span> <span style="font-size:11px;color:var(--text2)">あと: ' + p.missing.slice(0, 3).join(', ') + '</span></div>';
      });
      html += '</div>';
    }
  }

  // Bottom actions
  html += '<div class="bulk-actions">';
  html += '<button class="filter-btn" style="padding:10px 20px;font-size:14px" onclick="Game.exitBulkEdit()">キャンセル</button>';
  var canProceed = Game.bulkEditSelections.length > 0;
  html += '<button class="filter-btn active" style="padding:10px 20px;font-size:14px' + (!canProceed ? ';opacity:0.4' : '') + '"' +
    (!canProceed ? ' disabled' : '') + ' onclick="Game.bulkGoToWeapons()">武器選択へ →</button>';
  html += '</div>';

  return html;
};

Game.bulkToggleChar = function(charId) {
  var idx = Game.bulkEditSelections.indexOf(charId);
  if (idx >= 0) {
    Game.bulkEditSelections.splice(idx, 1);
  } else if (Game.bulkEditSelections.length < 5) {
    Game.bulkEditSelections.push(charId);
  }
  Game.renderTeam();
};

Game.bulkRemoveChar = function(slotIdx) {
  if (slotIdx < Game.bulkEditSelections.length) {
    Game.bulkEditSelections.splice(slotIdx, 1);
    Game.renderTeam();
  }
};

Game.bulkGoToWeapons = function() {
  Game.bulkEditPhase = 'weapon';
  Game.bulkEditWeapons = [-1,-1,-1,-1,-1];
  Game.bulkEditCurrentWeaponSlot = 0;
  Game.renderTeam();
};

// ---- Bulk Weapon Select Phase ----

Game.renderBulkWeaponSelect = function() {
  var g = Game.state;
  var html = '';

  // Character + weapon slot preview
  html += '<div class="bulk-weapon-preview">';
  for (var i = 0; i < 5; i++) {
    var charId = Game.bulkEditSelections[i];
    if (charId !== undefined) {
      var c = Game.getCharStats(charId);
      var wpnId = Game.bulkEditWeapons[i];
      var hasWpn = wpnId >= 0 && g.ownedWeapons[wpnId];
      var isActive = Game.bulkEditCurrentWeaponSlot === i;

      html += '<div class="bulk-wpn-slot' + (isActive ? ' active' : '') + '" onclick="Game.bulkSelectWeaponSlot(' + i + ')">';
      html += '<img src="' + Game.genAvatar(charId, 88) + '" class="bulk-slot-avatar"' +
        (c.hasSignature ? ' style="border:2px solid #ffd700"' : '') + '>';
      html += '<div class="bulk-wpn-name">' + c.name + '</div>';
      if (c.totsu > 0) {
        html += '<div style="font-size:9px;color:var(--gold)">' + c.totsu + '凸</div>';
      }
      if (hasWpn) {
        var w = Game.getWeaponStats(wpnId);
        html += '<div class="bulk-wpn-weapon" style="color:' + Game.RARITY_COLORS[Game.getWeapon(wpnId).rarity] + '">' + w.name + '</div>';
      } else {
        html += '<div class="bulk-wpn-weapon" style="color:var(--text2)">武器なし</div>';
      }
      html += '</div>';
    } else {
      html += '<div class="bulk-wpn-slot empty"><div style="font-size:10px;color:var(--text2)">--</div></div>';
    }
  }
  html += '</div>';

  // Auto equip button
  html += '<div style="text-align:center;margin:8px 0">';
  html += '<button class="filter-btn active" style="font-size:12px;padding:6px 14px" onclick="Game.bulkAutoWeapons()">⚡ 自動装備</button>';
  html += '</div>';

  // Weapon select guide
  var activeChar = Game.bulkEditSelections[Game.bulkEditCurrentWeaponSlot];
  if (activeChar !== undefined) {
    var ac = Game.getChar(activeChar);
    html += '<div class="bulk-guide">' + ac.name + ' の武器を選択</div>';
  }

  // Weapon grid
  html += '<div class="bulk-weapon-grid">';
  html += '<div class="wpn-select-item" onclick="Game.bulkAssignWeapon(-1)" ' +
    'style="cursor:pointer;padding:8px;margin:3px;background:rgba(255,255,255,0.05);border-radius:6px;font-size:12px;text-align:center;display:inline-block">なし</div>';

  var weapons = [];
  for (var wid in g.ownedWeapons) {
    var w = Game.getWeapon(parseInt(wid));
    if (!w) continue;
    var assigned = false;
    for (var s = 0; s < 5; s++) {
      if (s !== Game.bulkEditCurrentWeaponSlot && Game.bulkEditWeapons[s] === w.id) {
        assigned = true; break;
      }
    }
    if (assigned) continue;
    weapons.push(w);
  }
  weapons.sort(function(a, b) { return b.rarity - a.rarity || b.atk - a.atk; });

  weapons.forEach(function(w) {
    var ws = Game.getWeaponStats(w.id);
    var ow = g.ownedWeapons[w.id];
    var isSelected = Game.bulkEditWeapons[Game.bulkEditCurrentWeaponSlot] === w.id;
    html += '<div class="wpn-select-item' + (isSelected ? ' bulk-wpn-selected' : '') + '" ' +
      'onclick="Game.bulkAssignWeapon(' + w.id + ')" ' +
      'style="cursor:pointer;padding:8px;margin:3px;background:rgba(255,255,255,0.05);border:1px solid ' +
      Game.RARITY_COLORS[w.rarity] + ';border-radius:6px;display:inline-block;text-align:center;min-width:100px">' +
      '<div style="font-size:12px;font-weight:bold">' + w.name +
      (ow && ow.totsu > 0 ? ' <span style="color:var(--gold);font-size:10px">' + ow.totsu + '凸</span>' : '') + '</div>' +
      '<div style="font-size:10px;color:var(--text2)">ATK+' + ws.atk + ' HP+' + ws.hp + ' DEF+' + ws.def + '</div>' +
      '</div>';
  });

  if (weapons.length === 0) {
    html += '<div style="padding:12px;text-align:center;color:var(--text2);font-size:12px">装備可能な武器がありません</div>';
  }
  html += '</div>';

  // Bottom actions
  html += '<div class="bulk-actions">';
  html += '<button class="filter-btn" style="padding:10px 20px;font-size:14px" onclick="Game.bulkBackToChars()">← 武将選択</button>';
  html += '<button class="filter-btn active" style="padding:10px 20px;font-size:14px" onclick="Game.bulkConfirm()">編成確定 ✓</button>';
  html += '</div>';

  return html;
};

Game.bulkSelectWeaponSlot = function(idx) {
  if (idx < Game.bulkEditSelections.length) {
    Game.bulkEditCurrentWeaponSlot = idx;
    Game.renderTeam();
  }
};

Game.bulkAssignWeapon = function(wpnId) {
  Game.bulkEditWeapons[Game.bulkEditCurrentWeaponSlot] = wpnId;
  // Move to next unassigned slot
  var next = Game.bulkEditCurrentWeaponSlot + 1;
  while (next < Game.bulkEditSelections.length && Game.bulkEditWeapons[next] >= 0) {
    next++;
  }
  if (next < Game.bulkEditSelections.length) {
    Game.bulkEditCurrentWeaponSlot = next;
  }
  Game.renderTeam();
};

Game.bulkAutoWeapons = function() {
  var g = Game.state;
  var weapons = [];
  for (var wid in g.ownedWeapons) {
    var ws = Game.getWeaponStats(parseInt(wid));
    if (ws) weapons.push({ id: parseInt(wid), power: ws.atk + ws.hp / 5 + ws.def });
  }
  weapons.sort(function(a, b) { return b.power - a.power; });

  Game.bulkEditWeapons = [-1,-1,-1,-1,-1];
  var wIdx = 0;
  for (var i = 0; i < Game.bulkEditSelections.length; i++) {
    if (wIdx < weapons.length) {
      Game.bulkEditWeapons[i] = weapons[wIdx].id;
      wIdx++;
    }
  }
  Game.renderTeam();
};

Game.bulkBackToChars = function() {
  Game.bulkEditPhase = 'char';
  Game.renderTeam();
};

Game.bulkConfirm = function() {
  var g = Game.state;
  g.team = [-1,-1,-1,-1,-1];
  g.teamWeapons = [-1,-1,-1,-1,-1];

  for (var i = 0; i < Game.bulkEditSelections.length; i++) {
    g.team[i] = Game.bulkEditSelections[i];
    g.teamWeapons[i] = Game.bulkEditWeapons[i];
  }

  Game.bulkEditMode = false;
  Game.saveGame();
  Game.renderTeam();
  Game.updateTopbar();
};
