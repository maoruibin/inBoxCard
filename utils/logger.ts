export const log = {
  debug: (...args: any[]) => { console.debug('[inBoxCard]', ...args) },
  info: (...args: any[]) => { console.info('[inBoxCard]', ...args) },
  warn: (...args: any[]) => { console.warn('[inBoxCard]', ...args) },
  error: (...args: any[]) => { console.error('[inBoxCard]', ...args) }
}