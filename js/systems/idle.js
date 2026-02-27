// ======== IDLE / OFFLINE SYSTEM ========
window.Game = window.Game || {};

// 100 medals/hr + 1 ticket/hr, 8hr cap
Game.calcOfflineRewards = function() {
  var g = Game.state;
  var now = Date.now();
  var elapsed = now - (g.lastActive || now);
  var hours = Math.min(elapsed / 3600000, 8); // Cap at 8 hours
  if (hours < 0.05) return null; // Less than 3 minutes, no reward

  var medalRate = 100 * (1 + (g.currentChapter - 1) * 0.3);
  var medals = Math.floor(medalRate * hours);
  var tickets = Math.floor(hours);
  var ngBonus = (g.ngPlusLevel || 0) * 0.2;
  medals = Math.floor(medals * (1 + ngBonus));

  return {
    medals: medals,
    tickets: Math.max(0, tickets),
    hours: hours,
    elapsed: elapsed
  };
};

Game.showExpeditionReport = function(rewards) {
  if (!rewards) return;
  var g = Game.state;
  g.medals += rewards.medals;
  g.heroTickets += rewards.tickets;
  g.totalMedalsEarned += rewards.medals;
  g.lastActive = Date.now();
  Game.saveGame();

  var modal = document.getElementById('expedition-modal');
  if (!modal) return;

  var teamAvatars = '';
  for (var i = 0; i < g.team.length; i++) {
    if (g.team[i] >= 0 && g.owned[g.team[i]]) {
      teamAvatars += '<img src="' + Game.genAvatar(g.team[i], 100) + '" style="width:50px;height:50px;border-radius:8px;border:2px solid rgba(255,215,0,0.3)">';
    }
  }

  var hours = Math.floor(rewards.hours);
  var mins = Math.floor((rewards.hours - hours) * 60);
  var timeText = hours > 0 ? hours + '時間' + mins + '分' : mins + '分';

  // Generate a little report
  var reports = [
    '部隊は各地で武勲を上げた。',
    '街道を巡回し、賊を退けた。',
    '周辺の村を守り、民の信頼を得た。',
    '山賊の砦を攻略し、略奪品を奪還した。',
    '商隊の護衛を務め、報酬を得た。',
  ];
  var report = reports[Math.floor(Math.random() * reports.length)];

  modal.innerHTML =
    '<div class="expedition-content">' +
      '<div class="expedition-title">遠征報告</div>' +
      '<div style="font-size:13px;color:var(--text2);margin-bottom:10px">留守中 ' + timeText + '</div>' +
      '<div class="expedition-team">' + teamAvatars + '</div>' +
      '<div class="expedition-report-text">' + report + '</div>' +
      '<div class="expedition-reward">+' + Game.formatNum(rewards.medals) + ' メダル</div>' +
      (rewards.tickets > 0 ? '<div class="expedition-ticket">+' + rewards.tickets + ' 武将券</div>' : '') +
      '<button class="btn-primary btn-gold" style="margin-top:16px;display:inline-block;width:auto;padding:12px 40px" ' +
        'onclick="document.getElementById(\'expedition-modal\').classList.remove(\'show\');Game.playSound(\'expedition\');Game.renderAll()">受け取る</button>' +
    '</div>';
  modal.classList.add('show');
  Game.playSound('expedition');
};
