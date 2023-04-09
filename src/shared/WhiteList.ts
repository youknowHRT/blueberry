export const whiteList: Record<string,'exact'|'startsWith'>= {
  '/': 'exact',
  '/item':'exact',
  '/welcome':'startsWith',
  '/login':'startsWith',
}