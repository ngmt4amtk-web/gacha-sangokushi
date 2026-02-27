// ======== APP INIT ========
window.Game = window.Game || {};

Game.audioCtx = null;
Game.idleTimer = null;

Game.init = function() {
  // Load save
  var loaded = Game.loadGame();

  // Check for offline rewards
  if (loaded && !Game.state.firstPlay) {
    var rewards = Game.calcOfflineRewards();
    if (rewards) {
      Game.pendingExpedition = rewards;
    }
  }

  // Nav buttons
  var navBtns = document.querySelectorAll('.nav-btn');
  for (var i = 0; i < navBtns.length; i++) {
    navBtns[i].addEventListener('click', function() {
      Game.switchScreen(this.dataset.screen);
    });
  }

  // Close detail modal on overlay click
  document.getElementById('detail-modal').addEventListener('click', function(e) {
    if (e.target === this) Game.closeDetail();
  });

  // Init particles
  if (Game.initParticles) Game.initParticles();

  // First render
  Game.renderAll();

  // Show expedition report if pending
  if (Game.pendingExpedition) {
    setTimeout(function() { Game.showExpeditionReport(Game.pendingExpedition); }, 500);
  }

  // Welcome for first-time players
  if (Game.state.firstPlay) {
    Game.state.firstPlay = false;
    Game.saveGame();
    Game.showWelcome();
  }

  // Idle tick
  Game.idleTimer = setInterval(function() {
    Game.state.medals += Game.getMedalRate();
    Game.state.totalMedalsEarned += Game.getMedalRate();
    if (Game.currentScreen === 'home') Game.updateTopbar();
  }, 1000);

  // Auto-save
  setInterval(function() { Game.saveGame(); }, 30000);

  // Save on visibility change
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      Game.state.lastActive = Date.now();
      Game.saveGame();
    } else {
      // Check offline rewards on return
      var rewards = Game.calcOfflineRewards();
      if (rewards) {
        Game.showExpeditionReport(rewards);
      }
      Game.state.lastActive = Date.now();
    }
  });
};

Game.showWelcome = function() {
  var modal = document.getElementById('welcome-modal');
  modal.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%">' +
    '<div style="background:linear-gradient(135deg,var(--bg2),var(--bg3));border:1px solid rgba(255,215,0,0.3);' +
    'border-radius:16px;padding:30px;max-width:350px;text-align:center">' +
    '<h2 style="color:var(--gold);font-size:20px;margin-bottom:10px">正史三国志</h2>' +
    '<p style="font-size:14px;color:var(--gold);margin:4px 0">〜覇者の証〜</p>' +
    '<p style="font-size:12px;color:var(--text2);margin:12px 0">正史三国志と晋書の世界へようこそ。<br>歴史に名を刻んだ覇者たちを集め、天下を統一せよ。</p>' +
    '<div style="font-size:22px;color:var(--gold);font-weight:bold;margin:16px 0">初回ボーナス<br>武将券×3 + 1000メダル</div>' +
    '<button onclick="Game.state.medals+=1000;Game.saveGame();document.getElementById(\'welcome-modal\').style.display=\'none\';Game.renderAll()" ' +
    'style="padding:14px 40px;border:none;border-radius:8px;background:linear-gradient(135deg,#f57f17,#e65100);' +
    'color:#fff;font-size:16px;font-weight:bold;cursor:pointer;margin-top:12px">始める</button>' +
    '</div></div>';
  modal.style.display = 'flex';
};

// Start
document.addEventListener('DOMContentLoaded', Game.init);
