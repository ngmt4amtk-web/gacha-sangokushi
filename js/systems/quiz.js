// ======== QUIZ SYSTEM ========
window.Game = window.Game || {};

Game.QUIZ_SESSION_LIMIT = 5;

// Get quiz pool excluding recently asked questions
Game.getQuizPool = function(chapterId) {
  var allQ = (Game.QUIZ_QUESTIONS && Game.QUIZ_QUESTIONS[chapterId]) || [];
  var history = (Game.state.quizHistory && Game.state.quizHistory[chapterId]) || [];

  var recentIds = {};
  for (var s = 0; s < history.length; s++) {
    var session = history[s];
    for (var i = 0; i < session.length; i++) {
      recentIds[session[i]] = true;
    }
  }

  var pool = [];
  for (var i = 0; i < allQ.length; i++) {
    if (!recentIds[allQ[i].id]) pool.push(allQ[i]);
  }

  // If pool too small, reset history
  if (pool.length < 10) {
    pool = allQ.slice();
    Game.state.quizHistory[chapterId] = [];
  }

  return pool;
};

// Select 10 random questions
Game.selectQuizQuestions = function(chapterId) {
  var pool = Game.getQuizPool(chapterId);
  // Fisher-Yates shuffle
  for (var i = pool.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
  }
  return pool.slice(0, 10);
};

// Shuffle choices and adjust answer index
Game.shuffleChoices = function(question) {
  var indexed = [];
  for (var i = 0; i < question.choices.length; i++) {
    indexed.push({ text: question.choices[i], isAnswer: i === question.answer });
  }
  // Fisher-Yates
  for (var i = indexed.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = indexed[i]; indexed[i] = indexed[j]; indexed[j] = tmp;
  }
  var newAnswer = 0;
  var newChoices = [];
  for (var i = 0; i < indexed.length; i++) {
    newChoices.push(indexed[i].text);
    if (indexed[i].isAnswer) newAnswer = i;
  }
  return {
    q: question.q,
    choices: newChoices,
    answer: newAnswer,
    id: question.id,
    source: question.source || ''
  };
};

// Calculate reward tickets from score (correct answers = pulls)
Game.calcQuizReward = function(correct) {
  return correct;
};

// Chapter-specific gacha pull (exact chapter match, generous rates)
Game.doChapterGacha = function(chapterId, forceUR) {
  var rarity;
  if (forceUR) {
    rarity = 5; // Guaranteed UR from perfect quiz
  } else {
    var roll = Math.random();
    if (roll < 0.03) rarity = 5;       // UR 3%
    else if (roll < 0.15) rarity = 4;  // SSR 12%
    else if (roll < 0.50) rarity = 3;  // SR 35%
    else if (roll < 0.85) rarity = 2;  // R 35%
    else rarity = 1;                    // N 15%
  }

  // Exact chapter match
  var pool = Game.CHARACTERS.filter(function(c) {
    return c && c.chapter === chapterId && c.rarity === rarity;
  });
  if (pool.length === 0) {
    // Fallback: any rarity in this chapter
    pool = Game.CHARACTERS.filter(function(c) { return c && c.chapter === chapterId; });
  }
  if (pool.length === 0) {
    // Emergency fallback
    pool = Game.CHARACTERS.filter(function(c) { return c && c.rarity <= 2; });
  }

  var picked = pool[Math.floor(Math.random() * pool.length)];
  return Game.processGachaPull(picked.id);
};

// Run chapter gacha rewards and show animation
Game.runChapterGachaReward = function(chapterId, ticketCount) {
  if (ticketCount <= 0) {
    Game.quizSession = null;
    Game.renderQuiz();
    return;
  }
  Game.initAudio();
  var results = [];
  var perfectClear = ticketCount >= 10;
  for (var i = 0; i < ticketCount; i++) {
    results.push(Game.doChapterGacha(chapterId, perfectClear && i === 0));
  }
  Game.showGachaAnimation(results, false);
  Game.saveGame();
};

// Record quiz session history
Game.recordQuizSession = function(chapterId, questionIds) {
  if (!Game.state.quizHistory) Game.state.quizHistory = {};
  if (!Game.state.quizHistory[chapterId]) {
    Game.state.quizHistory[chapterId] = [];
  }
  Game.state.quizHistory[chapterId].push(questionIds);
  if (Game.state.quizHistory[chapterId].length > Game.QUIZ_SESSION_LIMIT) {
    Game.state.quizHistory[chapterId].shift();
  }
};
