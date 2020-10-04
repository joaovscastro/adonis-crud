'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/NewTaskMail')

const TaskHook = (exports = module.exports = {})

TaskHook.sendNewTaskMail = async (taskInstace) => {
  if (!taskInstace.user_id && !taskInstace.dirty.user_id) return

  const { email, username } = await taskInstace.user().fetch()
  const file = await taskInstace.file().fetch()

  const { title } = taskInstace

  Kue.dispatch(Job.key, { email, username, file, title }, { attempts: 3 })
}
