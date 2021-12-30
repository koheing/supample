const permissions = {
  '/': {
    requireAuth: true,
    regex: /^\/$/,
  },
  '/profiles/:userId': {
    requireAuth: true,
    regex: /\/profiles\/[0-9a-zA-Z-]/,
  },
  '/signin': {
    requireAuth: false,
    regex: /\/signin/,
  },
  '/signup': {
    requireAuth: false,
    regex: /\/signup/,
  },
} as const

export type Path = keyof typeof permissions

export const requireAuth = (path: string): boolean => {
  for (const [_, { regex, requireAuth }] of Object.entries(permissions)) {
    if (!regex.test(path)) continue
    return requireAuth
  }

  return true
}
