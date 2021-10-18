export { default as Nav } from '../../components/Nav.vue'
export { default as FootersBottom } from '../../components/Footers/Bottom.vue'
export { default as FootersFloating } from '../../components/Footers/Floating.vue'
export { default as HomeSection1 } from '../../components/Home/Section1.vue'
export { default as HomeSection2 } from '../../components/Home/Section2.vue'
export { default as LogosQuaiRound } from '../../components/Logos/QuaiRound.vue'

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
