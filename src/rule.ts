import { Condition, Rule, RuleContent } from './types'
import { createTTSFile } from './scripts/createTTS'

const filterPath = process.env.FILTER_PATH
const soundsFolder = process.env.SOUNDS_FOLDER

/* Rule content
 * Serves as a proxy for accessing the map of conditions and their values,
 * so that you can use a rule() object as a container for several rules, where
 * transformations to that rule() object will apply to all rules it contains
 */
const content = (rules: Rule[]): RuleContent => {
  return {
    map: [],
    rules: rules,

    // Set condition in map. If acting as a container will set condition in all
    // contained rules
    set(condition, value) {
      if (this.rules.length > 0) {
        this.rules.map((r) => r.content.set(condition, value))
      } else {
        this.map.push(`${condition} ${value}`)
      }
    },

    clear(condition) {
      if (this.rules.length > 0) {
        this.rules.map((r) => r.content.clear(condition))
      } else {
        this.map = this.map.filter((c) => !c.includes(condition))
      }
    },

    // Compile map to a multiline .filter syntax string. If acting as a container
    // will compile all contained rules
    compile() {
      if (this.rules.length > 0) {
        return this.rules.map((r) => r.compile()).join('\n\n')
      } else {
        return this.map.join('\n')
      }
    },
  }
}

/* Rule object
 * Manages the methods used to set conditions in the rule content
 */
const rule = (...rules: Rule[]): Rule => {
  return {
    type: 'show',
    disabled: false,
    content: content(rules),

    // Add content to the rule
    add(...content) {
      for (const item of content) {
        const [key, value] = item.split(/\s+/, 2) as [Condition, string]
        this.content.set(key, value)
      }
      return this
    },

    // Change rule type to hide and remove effects
    hide() {
      this.type = 'hide'
      this.content.clear('MinimapIcon')
      this.content.clear('PlayAlertSound')
      this.content.clear('PlayAlertSoundPositional')
      this.content.clear('CustomAlertSound')
      this.content.clear('CustomAlertSoundOptional')
      this.content.clear('PlayEffect')
      return this
    },

    baseType(...baseType) {
      this.content.set('BaseType', baseType.map((item) => `"${item}"`).join(' '))
      return this
    },

    baseTypeExact(...baseType) {
      this.content.set('BaseType', '== ' + baseType.map((item) => `"${item}"`).join(' '))
      return this
    },

    itemClass(...itemClass) {
      this.content.set('Class', itemClass.map((item) => `"${item}"`).join(' '))
      return this
    },

    itemClassExact(...itemClass) {
      this.content.set('Class', '== ' + itemClass.map((item) => `"${item}"`).join(' '))
      return this
    },

    influence(...influences) {
      this.content.set('HasInfluence', influences.map((influence) => `"${influence}"`).join(' '))
      return this
    },

    effect(color, temp = false) {
      this.content.set('PlayEffect', `${color} ${temp ? 'Temp' : ''}`)
      return this
    },

    // Style actions

    size(size) {
      this.content.set('SetFontSize', `${size}`)
      return this
    },

    sound(id, volume = 300, positional = true) {
      this.content.set(`PlayAlertSound${positional ? 'Positional' : ''}`, `${id} ${volume}`)
      return this
    },

    tts(path, volume = 300, generate = true) {
      const soundPath = `${filterPath}${soundsFolder}${path}`
      if(generate == true) {
        createTTSFile(soundPath)
      }
      this.content.set('CustomAlertSound', `"${soundPath}" ${volume}`)
      return this
    },

    customSound(path, volume = 300, generate = true) {
      this.content.set('CustomAlertSound', `"${soundsFolder}${path}" ${volume}`)
      return this
    },

    icon(color, shape, size = 2) {
      this.content.set('MinimapIcon', `${size} ${color} ${shape}`)
      return this
    },

    text(r, g, b, a) {
      this.content.set('SetTextColor', `${r} ${g} ${b} ${a !== undefined ? a : ''}`)
      return this
    },

    border(r, g, b, a) {
      this.content.set('SetBorderColor', `${r} ${g} ${b} ${a !== undefined ? a : ''}`)
      return this
    },

    background(r, g, b, a) {
      this.content.set('SetBackgroundColor', `${r} ${g} ${b} ${a !== undefined ? a : ''}`)
      return this
    },

    // Operator conditions

    hasExplicitMod(operator, ...mods) {
      this.content.set('HasExplicitMod', `${operator} ${mods.map((mod) => `"${mod}"`).join(' ')}`)
      return this
    },

    rarity(operator, ...rarity) {
      this.content.set('Rarity', `${operator} ${rarity.join(' ')}`)
      return this
    },

    socketGroup(operator, ...socketGroup) {
      this.content.set('SocketGroup', `${operator} ${socketGroup.map((s) => `"${s}"`).join(' ')}`)
      return this
    },

    hasEnchant(...enchants) {
      this.content.set('HasEnchantment', enchants.map((e) => `"${e}"`).join(' '))
      return this
    },

    sockets(operator, ...sockets) {
      this.content.set('Sockets', `${operator} ${sockets.join(' ')}`)
      return this
    },

    linkedSockets(operator, linkedSockets) {
      this.content.set('LinkedSockets', `${operator} ${linkedSockets}`)
      return this
    },

    stackSize(operator, stackSize) {
      this.content.set('StackSize', `${operator} ${stackSize}`)
      return this
    },

    itemLevel(operator, itemLevel) {
      this.content.set('ItemLevel', `${operator} ${itemLevel}`)
      return this
    },

    areaLevel(operator, areaLevel) {
      this.content.set('AreaLevel', `${operator} ${areaLevel}`)
      return this
    },

    dropLevel(operator, dropLevel) {
      this.content.set('DropLevel', `${operator} ${dropLevel}`)
      return this
    },

    width(operator, width) {
      this.content.set('Width', `${operator} ${width}`)
      return this
    },

    height(operator, height) {
      this.content.set('Height', `${operator} ${height}`)
      return this
    },

    baseArmour(operator, baseArmour) {
      this.content.set('BaseArmour', `${operator} ${baseArmour}`)
      return this
    },

    baseEvasion(operator, baseEvasion) {
      this.content.set('BaseEvasion', `${operator} ${baseEvasion}`)
      return this
    },

    baseES(operator, baseES) {
      this.content.set('BaseEnergyShield', `${operator} ${baseES}`)
      return this
    },

    baseWard(operator, baseWard) {
      this.content.set('BaseWard', `${operator} ${baseWard}`)
      return this
    },

    baseDefencePercentile(operator, baseDefencePercentile) {
      this.content.set('BaseDefencePercentile', `${operator} ${baseDefencePercentile}`)
      return this
    },

    gemLevel(operator, gemLevel) {
      this.content.set('GemLevel', `${operator} ${gemLevel}`)
      return this
    },

    mapTier(operator, mapTier) {
      this.content.set('MapTier', `${operator} ${mapTier}`)
      return this
    },

    quality(operator, quality) {
      this.content.set('Quality', `${operator} ${quality}`)
      return this
    },

    // Boolean conditions

    disable(disable) {
      // If there is no argument provided, the rule will be disabled. This is done instead of assigning
      // a default value to the argument in order to prevent the rule being disabled unintentionally by
      // passing an undefined value
      if (arguments.length === 0) {
        this.disabled = true
        return this
      }

      this.disabled = Boolean(disable)
      return this
    },

    transGem(transGem = true) {
      this.content.set('TransfiguredGem', `${transGem}`)
      return this
    },

    anyEnchant(anyEnchant = true) {
      this.content.set('AnyEnchantment', `${anyEnchant}`)
      return this
    },

    blightMap(blightMap = true) {
      this.content.set('BlightedMap', `${blightMap}`)
      return this
    },

    blightRavagedMap(blightRavagedMap = true) {
      this.content.set('UberBlightedMap', `${blightRavagedMap}`)
      return this
    },

    corrupted(corrupted = true) {
      this.content.set('Corrupted', `${corrupted}`)
      return this
    },

    elder(elder = true) {
      this.content.set('ElderItem', `${elder}`)
      return this
    },

    elderMap(elderMap = true) {
      this.content.set('ElderMap', `${elderMap}`)
      return this
    },

    synthItem(synthItem = true) {
      this.content.set('SynthesisedItem', `${synthItem}`)
      return this
    },

    shapedMap(shapedMap = true) {
      this.content.set('ShapedMap', `${shapedMap}`)
      return this
    },

    fractured(fractured = true) {
      this.content.set('FracturedItem', `${fractured}`)
      return this
    },

    identified(identified = true) {
      this.content.set('Identified', `${identified}`)
      return this
    },

    mirrored(mirrored = true) {
      this.content.set('Mirrored', `${mirrored}`)
      return this
    },

    hasImplicitMod(hasImplicitMod = true) {
      this.content.set('HasImplicitMod', `${hasImplicitMod}`)
      return this
    },

    replica(replica = true) {
      this.content.set('Replica', `${replica}`)
      return this
    },

    // Mixin - a function that will run for the rule
    mixin(mixin) {
      mixin(this)
      return this
    },

    // Compile the rule object to .filter syntax string.
    compile() {
      // If disabled dont compile to anything
      if (this.disabled) return ''

      if (rules.length > 0) {
        return this.content.compile()
      } else {
        return `${this.type === 'show' ? 'Show' : 'Hide'}\n${this.content.compile()}`
      }
    },
  }
}

export default rule
