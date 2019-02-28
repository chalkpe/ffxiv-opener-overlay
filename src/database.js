import db from './assets/database.json'

const alias = (o, [k, a, b]) => (o[k][a] = o[k][b] = o[k][a] || o[k][b], o)
const assign = entries => Object.assign({}, ...entries.map(([k, v]) => ({ [k]: v })))
const map = (arr, key, mapper = x => x) => assign(arr.map(item => [item[key], mapper(item)]))

const aliases = [
  ['소환사', '트라이디재스터', '트라이디제스터']
]

export default aliases.reduce(alias,
  map(db, 'name', job => map(job.skills.pve, 'name')))