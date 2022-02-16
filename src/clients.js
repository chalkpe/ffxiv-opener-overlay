export default [
  {
    code: 'en',
    language: 'English',
    you: 'You',
    patterns: [
      /(You) use (.+)\./,
      /(You) cast (.+)\./,
    ]
  },

  {
    code: 'ja',
    language: '日本語',
    you: null,
    patterns: [/(.+)の「(.+)」/]
  },

  {
    code: 'de',
    language: 'Deutsch',
    you: 'Du',
    patterns: [
      /(Du) setzt (.+) ein\./,
      /(Du) wirkst (.+)\./,
    ]
  },

  {
    code: 'fr',
    language: 'Français',
    you: 'Vous',
    patterns: [
      /(Vous) utilisez (.+)\./,
      /(Vous) lancez (.+)\./,
    ]
  },

  {
    code: 'ko',
    language: '한국어',
    you: null,
    patterns: [/(.+)[이가] (.+)[을를] 시전했습니다\./]
  }
]