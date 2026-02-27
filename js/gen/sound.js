// ======== SOUND SYSTEM ========
window.Game = window.Game || {};

Game.initAudio = function() {
  if (!Game.audioCtx) Game.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
};

Game.playSound = function(type) {
  if (!Game.state || !Game.state.soundOn) return;
  try {
    Game.initAudio();
    var ctx = Game.audioCtx, now = ctx.currentTime;

    if (type === 'pull') {
      var osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(400, now); osc.frequency.linearRampToValueAtTime(800, now + 0.3);
      gain.gain.setValueAtTime(0.15, now); gain.gain.linearRampToValueAtTime(0, now + 0.4);
      osc.start(now); osc.stop(now + 0.4);
    }
    else if (type === 'reveal_n') {
      var osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(300, now);
      gain.gain.setValueAtTime(0.1, now); gain.gain.linearRampToValueAtTime(0, now + 0.2);
      osc.start(now); osc.stop(now + 0.2);
    }
    else if (type === 'reveal_r') {
      var osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination); osc.type = 'triangle';
      osc.frequency.setValueAtTime(500, now); osc.frequency.linearRampToValueAtTime(600, now + 0.3);
      gain.gain.setValueAtTime(0.12, now); gain.gain.linearRampToValueAtTime(0, now + 0.3);
      osc.start(now); osc.stop(now + 0.3);
    }
    else if (type === 'reveal_sr') {
      [600,800,1000].forEach(function(f, i) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination); o.type = 'triangle';
        o.frequency.setValueAtTime(f, now + i * 0.1);
        g.gain.setValueAtTime(0.1, now + i * 0.1); g.gain.linearRampToValueAtTime(0, now + i * 0.1 + 0.2);
        o.start(now + i * 0.1); o.stop(now + i * 0.1 + 0.2);
      });
    }
    else if (type === 'reveal_ssr' || type === 'reveal_ur') {
      [500,650,800,1050,1300].forEach(function(f, i) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination); o.type = i < 3 ? 'triangle' : 'sine';
        o.frequency.setValueAtTime(f, now + i * 0.08);
        g.gain.setValueAtTime(0.12, now + i * 0.08); g.gain.linearRampToValueAtTime(0, now + i * 0.08 + 0.3);
        o.start(now + i * 0.08); o.stop(now + i * 0.08 + 0.3);
      });
    }
    else if (type === 'click') {
      var osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now); gain.gain.linearRampToValueAtTime(0, now + 0.05);
      osc.start(now); osc.stop(now + 0.05);
    }
    else if (type === 'win') {
      [523,659,784,1047].forEach(function(f, i) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination); o.type = 'triangle';
        o.frequency.setValueAtTime(f, now + i * 0.15);
        g.gain.setValueAtTime(0.1, now + i * 0.15); g.gain.linearRampToValueAtTime(0, now + i * 0.15 + 0.3);
        o.start(now + i * 0.15); o.stop(now + i * 0.15 + 0.3);
      });
    }
    else if (type === 'lose') {
      [400,350,300,250].forEach(function(f, i) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination); o.type = 'sawtooth';
        o.frequency.setValueAtTime(f, now + i * 0.2);
        g.gain.setValueAtTime(0.08, now + i * 0.2); g.gain.linearRampToValueAtTime(0, now + i * 0.2 + 0.3);
        o.start(now + i * 0.2); o.stop(now + i * 0.2 + 0.3);
      });
    }
    else if (type === 'hit') {
      var osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination); osc.type = 'square';
      osc.frequency.setValueAtTime(150, now); osc.frequency.linearRampToValueAtTime(80, now + 0.1);
      gain.gain.setValueAtTime(0.08, now); gain.gain.linearRampToValueAtTime(0, now + 0.1);
      osc.start(now); osc.stop(now + 0.1);
    }
    else if (type === 'medal') {
      var osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination); osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now); osc.frequency.linearRampToValueAtTime(1600, now + 0.1);
      gain.gain.setValueAtTime(0.04, now); gain.gain.linearRampToValueAtTime(0, now + 0.15);
      osc.start(now); osc.stop(now + 0.15);
    }
    else if (type === 'reach') {
      [440,554,659].forEach(function(f, i) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination); o.type = 'triangle';
        o.frequency.setValueAtTime(f, now + i * 0.12);
        g.gain.setValueAtTime(0.12, now + i * 0.12); g.gain.linearRampToValueAtTime(0, now + i * 0.12 + 0.25);
        o.start(now + i * 0.12); o.stop(now + i * 0.12 + 0.25);
      });
    }
    else if (type === 'kakutei') {
      [523,659,784,1047,1319].forEach(function(f, i) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination); o.type = i < 3 ? 'triangle' : 'sine';
        o.frequency.setValueAtTime(f, now + i * 0.07);
        g.gain.setValueAtTime(0.15, now + i * 0.07); g.gain.linearRampToValueAtTime(0, now + i * 0.07 + 0.4);
        o.start(now + i * 0.07); o.stop(now + i * 0.07 + 0.4);
      });
    }
    else if (type === 'jackpot') {
      [523,659,784,1047,784,1047,1319,1568].forEach(function(f, i) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination); o.type = 'triangle';
        o.frequency.setValueAtTime(f, now + i * 0.1);
        g.gain.setValueAtTime(0.1, now + i * 0.1); g.gain.linearRampToValueAtTime(0, now + i * 0.1 + 0.2);
        o.start(now + i * 0.1); o.stop(now + i * 0.1 + 0.2);
      });
    }
    else if (type === 'combo') {
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination); o.type = 'sine';
      o.frequency.setValueAtTime(880, now); o.frequency.linearRampToValueAtTime(1320, now + 0.08);
      g.gain.setValueAtTime(0.06, now); g.gain.linearRampToValueAtTime(0, now + 0.12);
      o.start(now); o.stop(now + 0.12);
    }
    else if (type === 'ticket') {
      [659,784,1047].forEach(function(f, i) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination); o.type = 'sine';
        o.frequency.setValueAtTime(f, now + i * 0.08);
        g.gain.setValueAtTime(0.08, now + i * 0.08); g.gain.linearRampToValueAtTime(0, now + i * 0.08 + 0.15);
        o.start(now + i * 0.08); o.stop(now + i * 0.08 + 0.15);
      });
    }
    else if (type === 'bond_discover') {
      [392,494,587,784,988].forEach(function(f, i) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination); o.type = 'sine';
        o.frequency.setValueAtTime(f, now + i * 0.12);
        g.gain.setValueAtTime(0.1, now + i * 0.12); g.gain.linearRampToValueAtTime(0, now + i * 0.12 + 0.4);
        o.start(now + i * 0.12); o.stop(now + i * 0.12 + 0.4);
      });
    }
    else if (type === 'chapter_clear') {
      [523,659,784,1047,1319,1568].forEach(function(f, i) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination); o.type = 'triangle';
        o.frequency.setValueAtTime(f, now + i * 0.15);
        g.gain.setValueAtTime(0.12, now + i * 0.15); g.gain.linearRampToValueAtTime(0, now + i * 0.15 + 0.5);
        o.start(now + i * 0.15); o.stop(now + i * 0.15 + 0.5);
      });
    }
    else if (type === 'scroll_open') {
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination); o.type = 'sine';
      o.frequency.setValueAtTime(600, now); o.frequency.linearRampToValueAtTime(900, now + 0.2);
      g.gain.setValueAtTime(0.08, now); g.gain.linearRampToValueAtTime(0, now + 0.3);
      o.start(now); o.stop(now + 0.3);
    }
    else if (type === 'expedition') {
      [440,523,659,784].forEach(function(f, i) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination); o.type = 'triangle';
        o.frequency.setValueAtTime(f, now + i * 0.2);
        g.gain.setValueAtTime(0.08, now + i * 0.2); g.gain.linearRampToValueAtTime(0, now + i * 0.2 + 0.4);
        o.start(now + i * 0.2); o.stop(now + i * 0.2 + 0.4);
      });
    }
  } catch(e) {}
};
