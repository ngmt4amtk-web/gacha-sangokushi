// ======== HOME SCREEN ========
window.Game = window.Game || {};

Game.renderHome = function() {
  var g = Game.state;
  var el = document.getElementById('screen-home');
  var ch = Game.getCurrentChapter();
  var chName = ch ? ch.name : '???';
  var chYear = ch ? ch.year : '';

  var teamAvatars = '';
  for (var i = 0; i < g.team.length; i++) {
    if (g.team[i] >= 0 && g.owned[g.team[i]]) {
      teamAvatars += '<img src="' + Game.genAvatar(g.team[i], 120) + '" style="width:50px;height:50px;border-radius:8px;border:2px solid rgba(255,215,0,0.3)">';
    } else {
      teamAvatars += '<div style="width:50px;height:50px;border-radius:8px;border:2px dashed rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:20px;color:var(--text2)">+</div>';
    }
  }

  // Active bonds
  var bondHTML = '';
  if (Game.getActiveBonds) {
    var teamIds = g.team.filter(function(id) { return id >= 0; });
    var bonds = Game.getActiveBonds(teamIds);
    if (bonds.length > 0) {
      bondHTML = bonds.map(function(b) { return '<span class="bond-badge">' + b.name + '</span>'; }).join(' ');
    }
  }

  // Login bonus
  var today = new Date().toDateString();
  var loginHTML = '';
  if (g.loginBonusDay !== today) {
    var bonus = 100 + Math.floor((g.currentChapter - 1) * 30);
    loginHTML = '<div style="background:linear-gradient(135deg,rgba(255,215,0,0.15),rgba(255,152,0,0.15));' +
      'border:1px solid rgba(255,215,0,0.4);border-radius:8px;padding:14px;text-align:center;margin-bottom:12px;cursor:pointer;animation:pulse 2s infinite" ' +
      'onclick="Game.claimLogin()"><div style="font-size:14px;font-weight:bold;color:var(--gold)">ログインボーナス</div>' +
      '<div style="font-size:18px;color:var(--gold);margin:6px 0">+' + bonus + ' メダル + 1 武将券</div></div>';
  }

  // NG+ indicator
  var ngHTML = g.ngPlusLevel > 0 ? '<div style="text-align:center;font-size:13px;color:#ff5722;font-weight:bold;margin:4px 0">覇道 ' + g.ngPlusLevel + '周目</div>' : '';

  el.innerHTML =
    '<div class="home-title">正史三国志</div>' +
    '<div class="home-subtitle">〜覇者の証〜</div>' +
    ngHTML +
    loginHTML +
    '<div class="stat-box">' +
      '<div style="font-size:13px;color:var(--text2);text-align:center;margin-bottom:6px">出陣中</div>' +
      '<div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap">' + teamAvatars + '</div>' +
      '<div class="team-power">戦力 ' + Game.formatNum(Game.getTeamPower()) + '</div>' +
      (bondHTML ? '<div style="text-align:center;margin-top:4px">' + bondHTML + '</div>' : '') +
    '</div>' +
    '<div class="stat-box">' +
      '<div style="font-size:15px;font-weight:bold;text-align:center;margin-bottom:8px">第' + g.currentChapter + '章 ' + chName + ' <span style="font-size:12px;color:var(--text2)">' + chYear + '</span></div>' +
      '<div style="text-align:center;font-size:13px;color:var(--text2)">現在: ' + g.currentStageId + '</div>' +
      '<div style="text-align:center;margin-top:8px"><button class="btn-primary btn-gold" style="display:inline-block;width:auto;padding:10px 30px" onclick="Game.switchScreen(\'battle\')">出陣</button></div>' +
    '</div>' +
    '<div class="stat-box">' +
      '<div class="stat-row"><div class="stat-label">メダル収入</div><div class="stat-val">+' + Game.getMedalRate() + '/秒</div></div>' +
      '<div class="stat-row"><div class="stat-label">総ガチャ回数</div><div class="stat-val">' + Game.formatNum(g.totalPulls) + '</div></div>' +
      '<div class="stat-row"><div class="stat-label">武将収集</div><div class="stat-val">' + Game.getOwnedCount() + '/' + (Game.CHARACTERS ? Game.CHARACTERS.length : '?') + '</div></div>' +
      '<div class="stat-row"><div class="stat-label">絆発見</div><div class="stat-val">' + Object.keys(g.discoveredBonds).length + '/' + (Game.BONDS ? Game.BONDS.length : '?') + '</div></div>' +
    '</div>' +
    '<div style="display:flex;gap:8px;margin-top:8px">' +
      '<button class="btn-primary" style="font-size:12px;padding:10px" onclick="Game.exportSaveUI()">セーブ出力</button>' +
      '<button class="btn-primary" style="font-size:12px;padding:10px" onclick="Game.importSaveUI()">セーブ読込</button>' +
      '<button class="btn-primary btn-danger" style="font-size:12px;padding:10px" onclick="Game.resetSave()">リセット</button>' +
    '</div>';
};

Game.claimLogin = function() {
  var g = Game.state;
  var today = new Date().toDateString();
  if (g.loginBonusDay === today) return;
  var bonus = 100 + Math.floor((g.currentChapter - 1) * 30);
  g.medals += bonus;
  g.heroTickets += 1;
  g.totalMedalsEarned += bonus;
  g.loginBonusClaimed = true;
  g.loginBonusDay = today;
  Game.saveGame();
  Game.playSound('medal');
  Game.renderAll();
};

Game.exportSaveUI = function() {
  var data = Game.exportSave();
  if (navigator.clipboard) {
    navigator.clipboard.writeText(data).then(function() { alert('クリップボードにコピーしました'); });
  } else {
    prompt('セーブデータ:', data);
  }
};

Game.importSaveUI = function() {
  var str = prompt('セーブデータを貼り付けてください:');
  if (str && Game.importSave(str)) {
    alert('読み込み成功');
    location.reload();
  } else if (str) {
    alert('読み込み失敗');
  }
};
