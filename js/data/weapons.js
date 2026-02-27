// ======== WEAPON DATABASE ========
window.Game = window.Game || {};

Game.WEAPON_TYPE_NAMES = ['槍','剣','扇','弓','盾'];

Game.WEAPONS = [
  // SSR ★4 (6)
  { id:0, name:'青龍偃月刀', rarity:4, weaponType:1, atk:80, hp:0, def:20, skillName:'武聖の一撃', skillDesc:'攻撃時15%追加ダメージ' },
  { id:1, name:'方天画戟', rarity:4, weaponType:0, atk:100, hp:0, def:0, skillName:'天下無双', skillDesc:'攻撃力+100,会心率UP' },
  { id:2, name:'七星宝刀', rarity:4, weaponType:1, atk:60, hp:0, def:30, skillName:'暗殺の刃', skillDesc:'先制攻撃時ダメ2倍' },
  { id:3, name:'倚天の剣', rarity:4, weaponType:1, atk:70, hp:200, def:0, skillName:'天の加護', skillDesc:'味方全体HP+200' },
  { id:4, name:'丈八蛇矛', rarity:4, weaponType:0, atk:90, hp:0, def:10, skillName:'乱舞', skillDesc:'全体攻撃ダメ+20%' },
  { id:5, name:'諸葛亮の羽扇', rarity:4, weaponType:2, atk:50, hp:300, def:20, skillName:'臥龍の風', skillDesc:'スキル発動率+15%' },
  // SR ★3 (8)
  { id:6, name:'古錠刀', rarity:3, weaponType:1, atk:40, hp:100, def:10, skillName:'呉の秘刀', skillDesc:'攻撃時10%追加' },
  { id:7, name:'麒麟弓', rarity:3, weaponType:3, atk:45, hp:0, def:15, skillName:'遠射', skillDesc:'先制攻撃+10%' },
  { id:8, name:'鳳凰槍', rarity:3, weaponType:0, atk:50, hp:50, def:0, skillName:'炎撃', skillDesc:'攻撃時火傷付与' },
  { id:9, name:'龍泉剣', rarity:3, weaponType:1, atk:35, hp:150, def:10, skillName:'龍気', skillDesc:'HP回復効果UP' },
  { id:10, name:'双股剣', rarity:3, weaponType:1, atk:45, hp:0, def:20, skillName:'二刀流', skillDesc:'2回攻撃確率UP' },
  { id:11, name:'氷刃', rarity:3, weaponType:1, atk:40, hp:0, def:25, skillName:'凍結', skillDesc:'敵速度DOWN' },
  { id:12, name:'雷光弓', rarity:3, weaponType:3, atk:50, hp:0, def:10, skillName:'落雷', skillDesc:'全体微ダメ' },
  { id:13, name:'護国盾', rarity:3, weaponType:4, atk:10, hp:200, def:40, skillName:'鉄壁', skillDesc:'味方DEF+10%' },
  // R ★2 (8)
  { id:14, name:'鉄剣', rarity:2, weaponType:1, atk:20, hp:0, def:10, skillName:'斬撃', skillDesc:'通常攻撃+5%' },
  { id:15, name:'長槍', rarity:2, weaponType:0, atk:25, hp:0, def:5, skillName:'突撃', skillDesc:'先制+5%' },
  { id:16, name:'大弓', rarity:2, weaponType:3, atk:22, hp:0, def:8, skillName:'狙撃', skillDesc:'会心+3%' },
  { id:17, name:'鉄扇', rarity:2, weaponType:2, atk:15, hp:50, def:10, skillName:'風圧', skillDesc:'スキル+3%' },
  { id:18, name:'戦斧', rarity:2, weaponType:0, atk:30, hp:0, def:0, skillName:'豪撃', skillDesc:'ATK+30' },
  { id:19, name:'短刀', rarity:2, weaponType:1, atk:18, hp:0, def:12, skillName:'急所', skillDesc:'会心+5%' },
  { id:20, name:'飛刀', rarity:2, weaponType:1, atk:20, hp:0, def:5, skillName:'投擲', skillDesc:'遠距離攻撃' },
  { id:21, name:'鎖鎌', rarity:2, weaponType:0, atk:22, hp:0, def:8, skillName:'絡め', skillDesc:'敵ATK-3%' },
  // N ★1 (8)
  { id:22, name:'木剣', rarity:1, weaponType:1, atk:8, hp:0, def:3, skillName:'素振り', skillDesc:'ATK微UP' },
  { id:23, name:'竹槍', rarity:1, weaponType:0, atk:10, hp:0, def:2, skillName:'突き', skillDesc:'ATK微UP' },
  { id:24, name:'練習弓', rarity:1, weaponType:3, atk:7, hp:0, def:4, skillName:'的当て', skillDesc:'命中微UP' },
  { id:25, name:'布扇', rarity:1, weaponType:2, atk:5, hp:20, def:3, skillName:'扇ぎ', skillDesc:'HP微UP' },
  { id:26, name:'木棍', rarity:1, weaponType:0, atk:9, hp:10, def:2, skillName:'打撃', skillDesc:'ATK微UP' },
  { id:27, name:'投石', rarity:1, weaponType:3, atk:8, hp:0, def:3, skillName:'投石', skillDesc:'遠距離微ダメ' },
  { id:28, name:'木盾', rarity:1, weaponType:4, atk:2, hp:30, def:8, skillName:'防御', skillDesc:'DEF微UP' },
  { id:29, name:'鈍刀', rarity:1, weaponType:1, atk:6, hp:0, def:5, skillName:'鈍い斬撃', skillDesc:'DEF微UP' },
];
