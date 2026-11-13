import { defineShikiSetup } from '@slidev/types'

// GitHub's themes keep comments dark enough to read on a projector.
export default defineShikiSetup(() => ({
  themes: {
    light: 'github-light',
    dark: 'github-dark',
  },
}))
