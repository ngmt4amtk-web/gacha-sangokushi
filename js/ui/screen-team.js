// ======== TEAM SCREEN ========
window.Game = window.Game || {};

Game.editingSlot = -1;
Game.editingWeaponSlot = -1;

Game.renderTeam = function() {
  var g = Game.state;
  var el = document.getElementById('screen-team');
  var html = '';

  // Team power + auto-form button
  var power = Game.getTeamPower();
  var ownedCount = Object.keys(g.owned).length;
  html += '<div class="team-power" style="display:flex;align-items:center;justify-content:space-between">' +
    '<span>総戦力: ' + Game.formatNum(power) + '</span>' +
    (ownedCount > 0 ? '<button class="filter-btn active" style="font-size:12px;padding:6px 14px" onclick="Game.autoFormTeam()">⚡ オート編成</button>' : '') +
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
            Game.FACTION_NAMES[c.faction] + ' ATK:' + Game.formatNum(c.atk) + '</div>' +
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
    html += '<div class="char-card ' + rc + '" style="width:80px;height:110px;background-image:url(' + Game.genAvatar(c.id, 160) + ')" ' +
      'onclick="Game.assignToSlot(' + slotIdx + ',' + c.id + ')">' +
      '<div class="card-info"><div class="stars" style="font-size:8px">' + Game.RARITY_STARS[c.rarity] + '</div>' +
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
      '<div style="font-size:12px;font-weight:bold">' + w.name + '</div>' +
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
