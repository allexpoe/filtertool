import rule from '../../rule'

// Filter entry point exports a getFilter function to be called by the export script
export const getFilter = () => `
### Basic rule
# Apply rule conditions and finish with a .compile() to turn the rule into a valid .filter string
# By default rules are "Show" rules (you can use .hide() to turn it into a hide rule)
${rule().baseType('Opal Sceptre').linkedSockets('>', 4).sound(1).border(255, 0, 0).text(255, 0, 0).size(45).compile()}


### Rule groups
# You can have rules inside rules. Rules which contain rules are called rule groups.
# Everything applied to the rule group is applied to every single rule it contains.
# When using rule groups only compile the outermost rule group. Rules inside dont have to be compiled.
${rule(
  rule().baseType('Regal Orb').icon('White', 'Circle'),
  rule().baseType('Orb of Chance').icon('Cyan', 'Diamond'),
  rule().baseType('Orb of Binding').icon('Pink', 'Kite'),
  rule().baseType('Orb of Scouring').icon('Blue', 'Square'),
  rule().baseType('Orb of Alchemy').icon('Yellow', 'Pentagon'),
  rule().baseType('Orb of Alteration').icon('Red', 'UpsideDownHouse'),
  rule().baseType('Vaal Orb').icon('Brown', 'Star'),
  rule().baseType('Chaos Orb').icon('Grey', 'Diamond'),
  rule().baseType('Orb of Regret').icon('Green', 'Moon')
)
  .text(255, 255, 255)
  .background(0, 255, 255)
  .border(255, 255, 255)
  .size(45)
  .compile()}
`
