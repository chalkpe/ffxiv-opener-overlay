import db from './assets/database.json'

// export default new Proxy(db, {
//   get: (jobs, id) => id in jobs ? jobs[id] :
//     new Proxy(jobs.find(j => j.id === id), {
//       get: (job, key) => key in job ? job[key] :
//         job.skills.pve.find(s => key === `${s.client}:${s.name}`)
//     })
// })

// Chrome 45...

const entries = job => job.skills.pve.map(s => ({ [`${s.client}:${s.name}`]: s }))
export default Object.assign({}, ...db.map(job => ({ [job.id]: Object.assign({}, job, ...entries(job)) })))