import { randomUUID } from 'node:crypto'
import { List } from './list-model'

export type Task = {
  id: string
  description: string
  isCompleted: boolean
}

export const getAllTasks = (list: List) => list.tasks

export const getTaskById = (list: List, id: string) =>
  list.tasks.find((task: Task) => task.id === id)

export const createNewTask = (list: List, body: Pick<Task, 'description'>) => {
  const { description } = body

  const newTask: Task = {
    id: randomUUID(),
    description,
    isCompleted: false,
  }

  list.tasks.push(newTask)
  list.totalTasks++

  return newTask
}

export const toggleTask = (task: Task) => {
  const status = task.isCompleted

  task.isCompleted = !status

  return task
}

export const deleteTask = (list: List, task: Task) => {
  const taskIndex = list.tasks.indexOf(task)

  list.tasks.splice(taskIndex, 1)
  list.totalTasks--
}
