import db from './assets/database.json'

export default new Proxy(db, {
  get: (jobs, id) => id in jobs ? jobs[id] :
    new Proxy(jobs.find(j => j.id === id), {
      get: (job, key) => key in job ? job[key] :
        job.skills.pve.find(s => key === `${s.client}:${s.name}`)
    })
})