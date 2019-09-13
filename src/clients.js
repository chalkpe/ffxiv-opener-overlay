export default [
  {
    code: 'na',
    language: 'English',
    pattern: /(You) cast (.+)\./,
    identify: (_, match) => match === 'You'
  }, {
    code: 'jp',
    language: '日本語',
    pattern: /(.+)の「(.+)」/,
    identify: (me, match) => me === match
  }, {
    code: 'de',
    language: 'Deutsch',
    pattern: /(Du) wirkst (.+)./,
    identify: (_, match) => match === 'Du'
  }, {
    code: 'fr',
    language: 'Français',
    pattern: /(Vous) lancez (.+)\./,
    identify: (_, match) => match === 'Vous'
  }, {
    code: 'kr',
    language: '한국어',
    pattern: /(.+)[이가] (.+)[을를] 시전했습니다\./,
    identify: (me, match) => me === match
  }
]