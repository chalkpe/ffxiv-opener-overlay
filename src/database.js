import database from './assets/database.json'

// export default new Proxy(db, {
//   get: (jobs, id) => id in jobs ? jobs[id] :
//     new Proxy(jobs.find(j => j.id === id), {
//       get: (job, key) => key in job ? job[key] :
//         job.skills.pve.find(s => key === `${s.client}:${s.name}`)
//     })
// })

// Chrome 45...

const o = entries => Object.assign({}, ...entries)
const skills = j => j.skills.pve.map(s => ({ [`${s.client}:${s.name}`]: s }))
export default o(database.map(job => ({ [job.id]: o([job, ...skills(job)]) })))