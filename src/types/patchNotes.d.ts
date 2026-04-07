export interface BattlePassPlusItem {
  item: string;
  qty: string;
}

export interface BattlePassReward {
  level: number;
  freeItem: string;
  freeQty: string | number;
  premiumItem: string;
  premiumQty: string | number;
}

export interface DungeonDetail {
  name: string;
  req: number;
  note: string;
}

export interface MaskOfAnnihilationDetail {
  name: string;
  fixed: string;
  random: string;
}
