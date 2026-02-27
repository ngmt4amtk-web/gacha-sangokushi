// ======== GAME STATE ========
window.Game = window.Game || {};

Game.SAVE_KEY = 'sangoku_v2_save';
Game.SAVE_VERSION = 13;

Game.RARITY_NAMES = { 1:'N', 2:'R', 3:'SR', 4:'SSR', 5:'UR' };
Game.RARITY_STARS = { 1:'★', 2:'★★', 3:'★★★', 4:'★★★★', 5:'★★★★★' };
Game.RARITY_COLORS = { 1:'var(--n)', 2:'var(--r)', 3:'var(--sr)', 4:'var(--ssr)', 5:'var(--ur)' };
Game.TYPE_NAMES = ['武','智','速','守'];
Game.FACTION_NAMES = ['蜀','魏','呉','群'];
Game.FACTION_COLORS = ['#d32f2f','#1565c0','#2e7d32','#616161'];

Game.defaultState = function() {
  return {
    saveVersion: Game.SAVE_VERSION,
    medals: 0,
    heroTickets: 3,
    currentChapter: 1,
    currentStageId: '1-1',
    clearedStages: {},
    ngPlusLevel: 0,
    team: [-1,-1,-1,-1,-1],
    teamWeapons: [-1,-1,-1,-1,-1],
    owned: {},
    ownedWeapons: {},
    totalPulls: 0,
    pity: 0,
    weaponPulls: 0,
    weaponPity: 0,
    discoveredBonds: {},
    bondBattleCounts: {},
    lastActive: Date.now(),
    lastSave: Date.now(),
    viewedCharLore: {},
    newFlags: {},
    newWeaponFlags: {},
    loginBonusClaimed: false,
    loginBonusDay: '',
    ssrPulled: 0,
    totalMedalsEarned: 0,
    battleSpeed: 1,
    soundOn: true,
    totalStageClears: 0,
    gachaTab: 'hero',
    firstPlay: true,
    quizHistory: {},
    ownedSignatures: {},
  };
};

Game.state = Game.defaultState();
