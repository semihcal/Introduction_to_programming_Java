import { defineAppSetup } from '@slidev/types'

// Browser-tab icon: none by default. If a logo.png exists, it becomes the icon.
//   public/logo.png                  -> every deck
//   lectures/<deck>/public/logo.png  -> that deck only (wins over the shared one)

// Found at build time; empty when the shared file does not exist.
const shared = Object.values(import.meta.glob('../../public/logo.png', {
  eager: true,
  query: '?url',
  import: 'default',
}))[0] as string | undefined

function setIcon(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.type = 'image/png'
  link.href = href
}

export default defineAppSetup(() => {
  if (typeof document === 'undefined')
    return

  if (shared)
    setIcon(shared)

  const own = `${import.meta.env.BASE_URL}logo.png`
  fetch(own, { method: 'HEAD' })
    .then((res) => {
      // Some hosts answer a missing file with the page itself, so also
      // check that what came back is an image.
      const type = res.headers.get('content-type') || ''
      if (res.ok && type.startsWith('image/'))
        setIcon(own)
    })
    .catch(() => {})
})
