
const langMap = {
  English: 'en',
  Japanese: 'ja',
  German: 'de',
  French: 'fr',
  Korean: 'ko'
}

export default {
  fetch: (region) => import(`./assets/actions/${region}.json`).then((module) => Array.from(module)),
  getLanguage: () => window.callOverlayHandler({ call: 'getLanguage' }).then((msg) => langMap[msg.language])
}