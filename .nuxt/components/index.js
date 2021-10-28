export { default as Nav } from '../../components/Nav.vue'
export { default as LogosQuaiRound } from '../../components/Logos/QuaiRound.vue'
export { default as HomeSection1 } from '../../components/Home/Section1.vue'
export { default as HomeSection2 } from '../../components/Home/Section2.vue'
export { default as FootersBottom } from '../../components/Footers/Bottom.vue'
export { default as FootersFloating } from '../../components/Footers/Floating.vue'
export { default as NetworkPrime } from '../../components/Network/Prime.vue'
export { default as NetworkRegion1 } from '../../components/Network/Region-1.vue'
export { default as NetworkRegion2 } from '../../components/Network/Region-2.vue'
export { default as NetworkRegion3 } from '../../components/Network/Region-3.vue'
export { default as NetworkZone11 } from '../../components/Network/Zone-1-1.vue'
export { default as NetworkZone12 } from '../../components/Network/Zone-1-2.vue'
export { default as NetworkZone13 } from '../../components/Network/Zone-1-3.vue'
export { default as NetworkZone21 } from '../../components/Network/Zone-2-1.vue'
export { default as NetworkZone22 } from '../../components/Network/Zone-2-2.vue'
export { default as NetworkZone23 } from '../../components/Network/Zone-2-3.vue'
export { default as NetworkZone31 } from '../../components/Network/Zone-3-1.vue'
export { default as NetworkZone32 } from '../../components/Network/Zone-3-2.vue'
export { default as NetworkZone33 } from '../../components/Network/Zone-3-3.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
