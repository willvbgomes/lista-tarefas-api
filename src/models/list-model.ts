import { randomUUID } from 'node:crypto'
import { Task } from './task-model'

export type List = {
  id: string
  title: string
  tasks: Task[]
  totalTasks: number
}

export let lists: List[] = []

export const getAllLists = () => lists

export const getListById = (id: string) =>
  lists.find((list: List) => list.id === id)

export const createNewList = (title: string) => {
  const newList: List = {
    id: randomUUID(),
    title,
    tasks: [],
    totalTasks: 0,
  }

  lists.push(newList)

  return newList
}

export const setNewTitle = (list: List, newTitle: string) => {
  list.title = newTitle

  return list
}

export const deleteList = (list: List) => {
  const listIndex = lists.indexOf(list)

  lists.splice(listIndex, 1)
}
