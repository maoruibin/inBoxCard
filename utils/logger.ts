type Level = 'debug' | 'info' | 'warn' | 'error'

const getLevel = (): Level => {
  const v = (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_DEBUG) || (typeof localStorage !== 'undefined' ? localStorage.getItem('DEBUG') : '')
  return v === 'true' ? 'debug' : 'error'
}

export const log = {
  debug: (...args: any[]) => { if (getLevel() === 'debug') console.debug('[inBoxCard]', ...args) },
  info: (...args: any[]) => { if (getLevel() === 'debug') console.info('[inBoxCard]', ...args) },
  warn: (...args: any[]) => { console.warn('[inBoxCard]', ...args) },
  error: (...args: any[]) => { console.error('[inBoxCard]', ...args) }
}