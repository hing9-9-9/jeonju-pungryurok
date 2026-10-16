/**
 * Resolves public asset URLs with Vite's BASE_URL (supports GitHub Pages subpath deployment)
 */
export function assetUrl(path) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }
  const base = import.meta.env.BASE_URL || '/'
  const cleanPath = path.replace(/^\//, '')
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`
}
