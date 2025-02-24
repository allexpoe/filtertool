import { Condition, ItemClass, Influence, NumberRange, Color, ExtendedOperator, Mixin, Operator, Rarity, Shape, ExplicitMods } from '.'

export type RuleContent = {
  map: string[]
  rules: Rule[]
  set: (condition: Condition, value: string) => void
  clear: (condition: Condition) => void
  compile: () => string
}

export type Rule = {
  type: 'show' | 'hide'
  disabled: boolean
  content: RuleContent
  add: (...content: string[]) => Rule
  hide: () => Rule
  baseType: <T extends string>(...baseType: T[]) => Rule
  baseTypeExact: <T extends string>(...baseType: T[]) => Rule
  itemClass: (...itemClass: string[]) => Rule
  influence: (...influences: Influence[]) => Rule
  size: (size: number) => Rule
  effect: (color: Color, temp?: boolean) => Rule
  sound: (id: NumberRange<1, 17>, volume?: number, positional?: boolean) => Rule
  customSound: (path: string, volume?: number) => Rule
  icon: (color: Color, shape: Shape, size?: 0 | 1 | 2) => Rule
  text: (r: number, g: number, b: number, a?: number) => Rule
  border: (r: number, g: number, b: number, a?: number) => Rule
  background: (r: number, g: number, b: number, a?: number) => Rule
  hasExplicitMod: (operator: ExtendedOperator, ...mods: ExplicitMods[]) => Rule
  rarity: (operator: Operator, ...rarity: Rarity[]) => Rule
  socketGroup: (operator: Operator, ...socketGroup: string[]) => Rule
  sockets: (operator: Operator, ...sockets: (string | number)[]) => Rule
  hasEnchant: (...enchants: string[]) => Rule
  linkedSockets: (operator: Operator, linkedSockets: number) => Rule
  stackSize: (operator: Operator, stackSize: number) => Rule
  itemLevel: (operator: Operator, itemLevel: number) => Rule
  areaLevel: (operator: Operator, areaLevel: number) => Rule
  dropLevel: (operator: Operator, dropLevel: number) => Rule
  width: (operator: Operator, width: number) => Rule
  height: (operator: Operator, height: number) => Rule
  baseES: (operator: Operator, baseES: number) => Rule
  baseWard: (operator: Operator, baseWard: number) => Rule
  baseArmour: (operator: Operator, baseArmour: number) => Rule
  baseEvasion: (operator: Operator, baseEvasion: number) => Rule
  baseDefencePercentile: (operator: Operator, baseDefencePercentile: number) => Rule
  gemLevel: (operator: Operator, gemLevel: number) => Rule
  mapTier: (operator: Operator, mapTier: number) => Rule
  quality: (operator: Operator, quality: number) => Rule
  transGem: (transGem?: boolean) => Rule
  elderMap: (elderMap?: boolean) => Rule
  shapedMap: (shapedMap?: boolean) => Rule
  synthItem: (synthItem?: boolean) => Rule
  corrupted: (corrupted?: boolean) => Rule
  elder: (elder?: boolean) => Rule
  blightMap: (blightMap?: boolean) => Rule
  blightRavagedMap: (blightRavagedMap?: boolean) => Rule
  fractured: (fractured?: boolean) => Rule
  identified: (identified?: boolean) => Rule
  mirrored: (mirrored?: boolean) => Rule
  hasImplicitMod: (hasImplicitMod?: boolean) => Rule
  anyEnchant: (anyEnchant?: boolean) => Rule
  replica: (replica?: boolean) => Rule
  mixin: (mixin: Mixin) => Rule
  disable: (disable?: boolean) => Rule
  compile: () => string
}
