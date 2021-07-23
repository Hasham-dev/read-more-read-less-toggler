import { css } from 'styled-components'

export const BREAKPOINTS = {
  small: 375,
  mobile: 576,
  tablet: 768,
  desktop: 992,
  giant: 1200
}

// iterate through the sizes and create a media template
const mediaqueries = Object.keys(BREAKPOINTS).reduce((accumulator, label) => {
  const size = BREAKPOINTS[label]
  accumulator[label] = (...args) => css`
    @media (max-width: ${size}px) {
      ${css(...args)};
    }
  `
  return accumulator
}, {})

export default mediaqueries
