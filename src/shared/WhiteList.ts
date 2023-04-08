export const whiteList: Record<string,'exact'|'startsWith'>= {
  '/': 'exact',
  '/item':'exact',
  '/welcome':'startsWith',
  'sign_in':'startsWith',
}